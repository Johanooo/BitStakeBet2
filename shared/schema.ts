import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, real, index, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Re-export auth models
export * from "./models/auth";

// Enums
export const kycLevelEnum = pgEnum("kyc_level", ["NO_KYC", "LIGHT_KYC", "FULL_KYC", "UNKNOWN"]);
export const bonusTypeEnum = pgEnum("bonus_type", ["DEPOSIT_MATCH", "FREE_BET", "CASHBACK", "RAKEBACK", "OTHER"]);
export const bonusStatusEnum = pgEnum("bonus_status", ["ACTIVE", "EXPIRED", "UNVERIFIED"]);

// Coins table
export const coins = pgTable("coins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  symbol: text("symbol").notNull().unique(),
  iconUrl: text("icon_url"),
});

export const insertCoinSchema = createInsertSchema(coins).omit({ id: true });
export type InsertCoin = z.infer<typeof insertCoinSchema>;
export type Coin = typeof coins.$inferSelect;

// Regions table
export const regions = pgTable("regions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
});

export const insertRegionSchema = createInsertSchema(regions).omit({ id: true });
export type InsertRegion = z.infer<typeof insertRegionSchema>;
export type Region = typeof regions.$inferSelect;

// Bookmakers table
export const bookmakers = pgTable("bookmakers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  domain: text("domain"),
  description: text("description"),
  shortDescription: text("short_description"),
  foundedYear: integer("founded_year"),
  logoPath: text("logo_path"),
  licenseName: text("license_name"),
  licenseJurisdiction: text("license_jurisdiction"),
  licenseUrl: text("license_url"),
  kycLevel: kycLevelEnum("kyc_level").default("UNKNOWN"),
  sportsbook: boolean("sportsbook").default(false),
  casino: boolean("casino").default(false),
  esports: boolean("esports").default(false),
  affiliateUrl: text("affiliate_url"),
  refCode: text("ref_code"),
  trustScoreOverride: real("trust_score_override"),
  payoutSpeed: text("payout_speed"),
  minDeposit: text("min_deposit"),
  maxPayout: text("max_payout"),
  supportEmail: text("support_email"),
  supportLiveChat: boolean("support_live_chat").default(false),
  pros: text("pros").array(),
  cons: text("cons").array(),
  featured: boolean("featured").default(false),
  sortOrder: integer("sort_order").default(999),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("bookmaker_slug_idx").on(table.slug),
  index("bookmaker_featured_idx").on(table.featured),
]);

export const insertBookmakerSchema = createInsertSchema(bookmakers).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertBookmaker = z.infer<typeof insertBookmakerSchema>;
export type Bookmaker = typeof bookmakers.$inferSelect;

// Bookmaker-Coin join table
export const bookmakerCoins = pgTable("bookmaker_coins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookmakerId: varchar("bookmaker_id").notNull().references(() => bookmakers.id, { onDelete: "cascade" }),
  coinId: varchar("coin_id").notNull().references(() => coins.id, { onDelete: "cascade" }),
});

// Bookmaker-Region (restricted) join table
export const bookmakerRestrictedRegions = pgTable("bookmaker_restricted_regions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookmakerId: varchar("bookmaker_id").notNull().references(() => bookmakers.id, { onDelete: "cascade" }),
  regionId: varchar("region_id").notNull().references(() => regions.id, { onDelete: "cascade" }),
});

// Bonuses table
export const bonuses = pgTable("bonuses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  bookmakerId: varchar("bookmaker_id").notNull().references(() => bookmakers.id, { onDelete: "cascade" }),
  type: bonusTypeEnum("type").default("OTHER"),
  headline: text("headline").notNull(),
  description: text("description"),
  maxValueUsd: integer("max_value_usd"),
  wageringRequirementText: text("wagering_requirement_text"),
  minDepositText: text("min_deposit_text"),
  expiryText: text("expiry_text"),
  promoCode: text("promo_code"),
  sourceUrl: text("source_url"),
  status: bonusStatusEnum("status").default("UNVERIFIED"),
  lastVerifiedAt: timestamp("last_verified_at"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("bonus_bookmaker_idx").on(table.bookmakerId),
  index("bonus_status_idx").on(table.status),
]);

export const insertBonusSchema = createInsertSchema(bonuses).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertBonus = z.infer<typeof insertBonusSchema>;
export type Bonus = typeof bonuses.$inferSelect;

// Guides table
export const guides = pgTable("guides", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("guide_slug_idx").on(table.slug),
  index("guide_published_idx").on(table.published),
]);

export const insertGuideSchema = createInsertSchema(guides).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertGuide = z.infer<typeof insertGuideSchema>;
export type Guide = typeof guides.$inferSelect;

// FAQs table
export const faqs = pgTable("faqs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category"),
  bookmakerId: varchar("bookmaker_id").references(() => bookmakers.id, { onDelete: "cascade" }),
  guideId: varchar("guide_id").references(() => guides.id, { onDelete: "cascade" }),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFaqSchema = createInsertSchema(faqs).omit({ id: true, createdAt: true });
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;

// SEO Metadata table
export const seoMetadata = pgTable("seo_metadata", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pagePath: text("page_path").notNull().unique(),
  title: text("title"),
  description: text("description"),
  ogImage: text("og_image"),
  noIndex: boolean("no_index").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSeoMetadataSchema = createInsertSchema(seoMetadata).omit({ id: true, updatedAt: true });
export type InsertSeoMetadata = z.infer<typeof insertSeoMetadataSchema>;
export type SeoMetadata = typeof seoMetadata.$inferSelect;

// Admin Users table (for traditional username/password auth)
export const adminUsers = pgTable("admin_users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  email: text("email"),
  role: text("role").default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
  lastLoginAt: timestamp("last_login_at"),
});

export const insertAdminUserSchema = createInsertSchema(adminUsers).omit({ id: true, createdAt: true, lastLoginAt: true, passwordHash: true }).extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsers.$inferSelect;

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => adminUsers.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

// Relations
export const bookmakerRelations = relations(bookmakers, ({ many }) => ({
  bonuses: many(bonuses),
  coins: many(bookmakerCoins),
  restrictedRegions: many(bookmakerRestrictedRegions),
  faqs: many(faqs),
}));

export const bonusRelations = relations(bonuses, ({ one }) => ({
  bookmaker: one(bookmakers, {
    fields: [bonuses.bookmakerId],
    references: [bookmakers.id],
  }),
}));

export const bookmakerCoinRelations = relations(bookmakerCoins, ({ one }) => ({
  bookmaker: one(bookmakers, {
    fields: [bookmakerCoins.bookmakerId],
    references: [bookmakers.id],
  }),
  coin: one(coins, {
    fields: [bookmakerCoins.coinId],
    references: [coins.id],
  }),
}));

export const bookmakerRegionRelations = relations(bookmakerRestrictedRegions, ({ one }) => ({
  bookmaker: one(bookmakers, {
    fields: [bookmakerRestrictedRegions.bookmakerId],
    references: [bookmakers.id],
  }),
  region: one(regions, {
    fields: [bookmakerRestrictedRegions.regionId],
    references: [regions.id],
  }),
}));

export const guideRelations = relations(guides, ({ many }) => ({
  faqs: many(faqs),
}));

export const faqRelations = relations(faqs, ({ one }) => ({
  bookmaker: one(bookmakers, {
    fields: [faqs.bookmakerId],
    references: [bookmakers.id],
  }),
  guide: one(guides, {
    fields: [faqs.guideId],
    references: [guides.id],
  }),
}));

// Extended types with relations
export type BookmakerWithRelations = Bookmaker & {
  bonuses?: Bonus[];
  coins?: { coin: Coin }[];
  restrictedRegions?: { region: Region }[];
  faqs?: Faq[];
};

export type BonusWithBookmaker = Bonus & {
  bookmaker: Bookmaker;
};

export type GuideWithFaqs = Guide & {
  faqs?: Faq[];
};
