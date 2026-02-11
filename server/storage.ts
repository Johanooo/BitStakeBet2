import { 
  bookmakers, bonuses, guides, faqs, coins, regions, 
  bookmakerCoins, bookmakerRestrictedRegions, seoMetadata,
  type Bookmaker, type InsertBookmaker,
  type Bonus, type InsertBonus,
  type Guide, type InsertGuide,
  type Faq, type InsertFaq,
  type Coin, type InsertCoin,
  type Region, type InsertRegion,
  type SeoMetadata, type InsertSeoMetadata,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc, ilike, sql, gte, lte, gt, lt, ne } from "drizzle-orm";

export interface IStorage {
  // Bookmakers
  getAllBookmakers(): Promise<Bookmaker[]>;
  getBookmakerBySlug(slug: string): Promise<Bookmaker | undefined>;
  getBookmakerById(id: string): Promise<Bookmaker | undefined>;
  createBookmaker(data: InsertBookmaker): Promise<Bookmaker>;
  updateBookmaker(id: string, data: Partial<InsertBookmaker>): Promise<Bookmaker | undefined>;
  shiftBookmakerPositions(excludeId: string, oldPosition: number, newPosition: number): Promise<void>;
  deleteBookmaker(id: string): Promise<boolean>;
  getFeaturedBookmakers(limit?: number): Promise<Bookmaker[]>;
  
  // Bonuses
  getAllBonuses(): Promise<(Bonus & { bookmaker: Bookmaker })[]>;
  getBonusesByBookmaker(bookmakerId: string): Promise<Bonus[]>;
  getBonusById(id: string): Promise<Bonus | undefined>;
  createBonus(data: InsertBonus): Promise<Bonus>;
  updateBonus(id: string, data: Partial<InsertBonus>): Promise<Bonus | undefined>;
  deleteBonus(id: string): Promise<boolean>;
  getFeaturedBonuses(limit?: number): Promise<(Bonus & { bookmaker: Bookmaker })[]>;
  
  // Guides
  getAllGuides(): Promise<Guide[]>;
  getPublishedGuides(): Promise<Guide[]>;
  getGuideBySlug(slug: string): Promise<Guide | undefined>;
  getGuideById(id: string): Promise<Guide | undefined>;
  createGuide(data: InsertGuide): Promise<Guide>;
  updateGuide(id: string, data: Partial<InsertGuide>): Promise<Guide | undefined>;
  deleteGuide(id: string): Promise<boolean>;
  
  // FAQs
  getAllFaqs(): Promise<Faq[]>;
  getFaqsByBookmaker(bookmakerId: string): Promise<Faq[]>;
  getFaqsByGuide(guideId: string): Promise<Faq[]>;
  createFaq(data: InsertFaq): Promise<Faq>;
  updateFaq(id: string, data: Partial<InsertFaq>): Promise<Faq | undefined>;
  deleteFaq(id: string): Promise<boolean>;
  
  // Coins
  getAllCoins(): Promise<Coin[]>;
  createCoin(data: InsertCoin): Promise<Coin>;
  
  // Regions
  getAllRegions(): Promise<Region[]>;
  createRegion(data: InsertRegion): Promise<Region>;
  
  // SEO
  getSeoByPath(path: string): Promise<SeoMetadata | undefined>;
  upsertSeo(data: InsertSeoMetadata): Promise<SeoMetadata>;
}

export class DatabaseStorage implements IStorage {
  // Bookmakers
  async getAllBookmakers(): Promise<Bookmaker[]> {
    return db.select().from(bookmakers).orderBy(asc(bookmakers.sortOrder), desc(bookmakers.trustScoreOverride));
  }

  async getBookmakerBySlug(slug: string): Promise<Bookmaker | undefined> {
    const [result] = await db.select().from(bookmakers).where(eq(bookmakers.slug, slug));
    return result;
  }

  async getBookmakerById(id: string): Promise<Bookmaker | undefined> {
    const [result] = await db.select().from(bookmakers).where(eq(bookmakers.id, id));
    return result;
  }

  async createBookmaker(data: InsertBookmaker): Promise<Bookmaker> {
    const [result] = await db.insert(bookmakers).values(data).returning();
    return result;
  }

  async updateBookmaker(id: string, data: Partial<InsertBookmaker>): Promise<Bookmaker | undefined> {
    const [result] = await db.update(bookmakers)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(bookmakers.id, id))
      .returning();
    return result;
  }

  async shiftBookmakerPositions(excludeId: string, oldPosition: number, newPosition: number): Promise<void> {
    if (newPosition < oldPosition) {
      await db.update(bookmakers)
        .set({ sortOrder: sql`${bookmakers.sortOrder} + 1` })
        .where(and(
          ne(bookmakers.id, excludeId),
          gte(bookmakers.sortOrder, newPosition),
          lt(bookmakers.sortOrder, oldPosition)
        ));
    } else if (newPosition > oldPosition) {
      await db.update(bookmakers)
        .set({ sortOrder: sql`${bookmakers.sortOrder} - 1` })
        .where(and(
          ne(bookmakers.id, excludeId),
          gt(bookmakers.sortOrder, oldPosition),
          lte(bookmakers.sortOrder, newPosition)
        ));
    }
  }

  async deleteBookmaker(id: string): Promise<boolean> {
    const result = await db.delete(bookmakers).where(eq(bookmakers.id, id));
    return true;
  }

  async getFeaturedBookmakers(limit = 10): Promise<Bookmaker[]> {
    return db.select().from(bookmakers)
      .where(eq(bookmakers.featured, true))
      .orderBy(asc(bookmakers.sortOrder), desc(bookmakers.trustScoreOverride))
      .limit(limit);
  }

  // Bonuses
  async getAllBonuses(): Promise<(Bonus & { bookmaker: Bookmaker })[]> {
    const results = await db.select()
      .from(bonuses)
      .leftJoin(bookmakers, eq(bonuses.bookmakerId, bookmakers.id))
      .orderBy(desc(bonuses.featured), desc(bonuses.maxValueUsd));
    
    return results.map(r => ({
      ...r.bonuses,
      bookmaker: r.bookmakers!,
    }));
  }

  async getBonusesByBookmaker(bookmakerId: string): Promise<Bonus[]> {
    return db.select().from(bonuses)
      .where(eq(bonuses.bookmakerId, bookmakerId))
      .orderBy(desc(bonuses.featured));
  }

  async getBonusById(id: string): Promise<Bonus | undefined> {
    const [result] = await db.select().from(bonuses).where(eq(bonuses.id, id));
    return result;
  }

  async createBonus(data: InsertBonus): Promise<Bonus> {
    const [result] = await db.insert(bonuses).values(data).returning();
    return result;
  }

  async updateBonus(id: string, data: Partial<InsertBonus>): Promise<Bonus | undefined> {
    const [result] = await db.update(bonuses)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(bonuses.id, id))
      .returning();
    return result;
  }

  async deleteBonus(id: string): Promise<boolean> {
    await db.delete(bonuses).where(eq(bonuses.id, id));
    return true;
  }

  async getFeaturedBonuses(limit = 6): Promise<(Bonus & { bookmaker: Bookmaker })[]> {
    const results = await db.select()
      .from(bonuses)
      .leftJoin(bookmakers, eq(bonuses.bookmakerId, bookmakers.id))
      .where(eq(bonuses.status, "ACTIVE"))
      .orderBy(desc(bonuses.featured), desc(bonuses.maxValueUsd))
      .limit(limit);
    
    return results.map(r => ({
      ...r.bonuses,
      bookmaker: r.bookmakers!,
    }));
  }

  // Guides
  async getAllGuides(): Promise<Guide[]> {
    return db.select().from(guides).orderBy(desc(guides.updatedAt));
  }

  async getPublishedGuides(): Promise<Guide[]> {
    return db.select().from(guides)
      .where(eq(guides.published, true))
      .orderBy(desc(guides.updatedAt));
  }

  async getGuideBySlug(slug: string): Promise<Guide | undefined> {
    const [result] = await db.select().from(guides).where(eq(guides.slug, slug));
    return result;
  }

  async getGuideById(id: string): Promise<Guide | undefined> {
    const [result] = await db.select().from(guides).where(eq(guides.id, id));
    return result;
  }

  async createGuide(data: InsertGuide): Promise<Guide> {
    const [result] = await db.insert(guides).values(data).returning();
    return result;
  }

  async updateGuide(id: string, data: Partial<InsertGuide>): Promise<Guide | undefined> {
    const [result] = await db.update(guides)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(guides.id, id))
      .returning();
    return result;
  }

  async deleteGuide(id: string): Promise<boolean> {
    await db.delete(guides).where(eq(guides.id, id));
    return true;
  }

  // FAQs
  async getAllFaqs(): Promise<Faq[]> {
    return db.select().from(faqs).orderBy(asc(faqs.sortOrder));
  }

  async getFaqsByBookmaker(bookmakerId: string): Promise<Faq[]> {
    return db.select().from(faqs)
      .where(eq(faqs.bookmakerId, bookmakerId))
      .orderBy(asc(faqs.sortOrder));
  }

  async getFaqsByGuide(guideId: string): Promise<Faq[]> {
    return db.select().from(faqs)
      .where(eq(faqs.guideId, guideId))
      .orderBy(asc(faqs.sortOrder));
  }

  async createFaq(data: InsertFaq): Promise<Faq> {
    const [result] = await db.insert(faqs).values(data).returning();
    return result;
  }

  async updateFaq(id: string, data: Partial<InsertFaq>): Promise<Faq | undefined> {
    const [result] = await db.update(faqs)
      .set(data)
      .where(eq(faqs.id, id))
      .returning();
    return result;
  }

  async deleteFaq(id: string): Promise<boolean> {
    await db.delete(faqs).where(eq(faqs.id, id));
    return true;
  }

  // Coins
  async getAllCoins(): Promise<Coin[]> {
    return db.select().from(coins);
  }

  async createCoin(data: InsertCoin): Promise<Coin> {
    const [result] = await db.insert(coins).values(data).returning();
    return result;
  }

  // Regions
  async getAllRegions(): Promise<Region[]> {
    return db.select().from(regions);
  }

  async createRegion(data: InsertRegion): Promise<Region> {
    const [result] = await db.insert(regions).values(data).returning();
    return result;
  }

  // SEO
  async getSeoByPath(path: string): Promise<SeoMetadata | undefined> {
    const [result] = await db.select().from(seoMetadata).where(eq(seoMetadata.pagePath, path));
    return result;
  }

  async upsertSeo(data: InsertSeoMetadata): Promise<SeoMetadata> {
    const [result] = await db.insert(seoMetadata)
      .values(data)
      .onConflictDoUpdate({
        target: seoMetadata.pagePath,
        set: { ...data, updatedAt: new Date() },
      })
      .returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
