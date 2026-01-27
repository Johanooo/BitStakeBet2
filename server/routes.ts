import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { insertBookmakerSchema, insertBonusSchema, insertGuideSchema, insertFaqSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup authentication
  await setupAuth(app);
  registerAuthRoutes(app);

  // Public API Routes

  // Bookmakers
  app.get("/api/bookmakers", async (req, res) => {
    try {
      const { featured, limit } = req.query;
      let bookmakers;
      
      if (featured === "true") {
        bookmakers = await storage.getFeaturedBookmakers(limit ? parseInt(limit as string) : 10);
      } else {
        bookmakers = await storage.getAllBookmakers();
      }
      
      res.json(bookmakers);
    } catch (error) {
      console.error("Error fetching bookmakers:", error);
      res.status(500).json({ error: "Failed to fetch bookmakers" });
    }
  });

  app.get("/api/bookmakers/:slug", async (req, res) => {
    try {
      const bookmaker = await storage.getBookmakerBySlug(req.params.slug);
      if (!bookmaker) {
        return res.status(404).json({ error: "Bookmaker not found" });
      }
      res.json(bookmaker);
    } catch (error) {
      console.error("Error fetching bookmaker:", error);
      res.status(500).json({ error: "Failed to fetch bookmaker" });
    }
  });

  app.get("/api/bookmakers/:slug/bonuses", async (req, res) => {
    try {
      const bookmaker = await storage.getBookmakerBySlug(req.params.slug);
      if (!bookmaker) {
        return res.status(404).json({ error: "Bookmaker not found" });
      }
      const bonuses = await storage.getBonusesByBookmaker(bookmaker.id);
      res.json(bonuses);
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      res.status(500).json({ error: "Failed to fetch bonuses" });
    }
  });

  app.get("/api/bookmakers/:slug/faqs", async (req, res) => {
    try {
      const bookmaker = await storage.getBookmakerBySlug(req.params.slug);
      if (!bookmaker) {
        return res.status(404).json({ error: "Bookmaker not found" });
      }
      const faqs = await storage.getFaqsByBookmaker(bookmaker.id);
      res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  // Bonuses
  app.get("/api/bonuses", async (req, res) => {
    try {
      const { featured, limit } = req.query;
      let bonuses;
      
      if (featured === "true") {
        bonuses = await storage.getFeaturedBonuses(limit ? parseInt(limit as string) : 6);
      } else {
        bonuses = await storage.getAllBonuses();
      }
      
      res.json(bonuses);
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      res.status(500).json({ error: "Failed to fetch bonuses" });
    }
  });

  // Guides
  app.get("/api/guides", async (req, res) => {
    try {
      const guides = await storage.getPublishedGuides();
      res.json(guides);
    } catch (error) {
      console.error("Error fetching guides:", error);
      res.status(500).json({ error: "Failed to fetch guides" });
    }
  });

  app.get("/api/guides/:slug", async (req, res) => {
    try {
      const guide = await storage.getGuideBySlug(req.params.slug);
      if (!guide) {
        return res.status(404).json({ error: "Guide not found" });
      }
      const faqs = await storage.getFaqsByGuide(guide.id);
      res.json({ ...guide, faqs });
    } catch (error) {
      console.error("Error fetching guide:", error);
      res.status(500).json({ error: "Failed to fetch guide" });
    }
  });

  // FAQs
  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getAllFaqs();
      res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ error: "Failed to fetch FAQs" });
    }
  });

  // Coins
  app.get("/api/coins", async (req, res) => {
    try {
      const coins = await storage.getAllCoins();
      res.json(coins);
    } catch (error) {
      console.error("Error fetching coins:", error);
      res.status(500).json({ error: "Failed to fetch coins" });
    }
  });

  // Admin API Routes (Protected)

  // Admin Bookmakers
  app.post("/api/admin/bookmakers", isAuthenticated, async (req, res) => {
    try {
      const data = insertBookmakerSchema.parse(req.body);
      const bookmaker = await storage.createBookmaker(data);
      res.status(201).json(bookmaker);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating bookmaker:", error);
      res.status(500).json({ error: "Failed to create bookmaker" });
    }
  });

  app.put("/api/admin/bookmakers/:id", isAuthenticated, async (req, res) => {
    try {
      const data = insertBookmakerSchema.partial().parse(req.body);
      const bookmaker = await storage.updateBookmaker(req.params.id, data);
      if (!bookmaker) {
        return res.status(404).json({ error: "Bookmaker not found" });
      }
      res.json(bookmaker);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating bookmaker:", error);
      res.status(500).json({ error: "Failed to update bookmaker" });
    }
  });

  app.delete("/api/admin/bookmakers/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteBookmaker(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting bookmaker:", error);
      res.status(500).json({ error: "Failed to delete bookmaker" });
    }
  });

  // Admin Bonuses
  app.post("/api/admin/bonuses", isAuthenticated, async (req, res) => {
    try {
      const data = insertBonusSchema.parse(req.body);
      const bonus = await storage.createBonus(data);
      res.status(201).json(bonus);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating bonus:", error);
      res.status(500).json({ error: "Failed to create bonus" });
    }
  });

  app.put("/api/admin/bonuses/:id", isAuthenticated, async (req, res) => {
    try {
      const data = insertBonusSchema.partial().parse(req.body);
      const bonus = await storage.updateBonus(req.params.id, data);
      if (!bonus) {
        return res.status(404).json({ error: "Bonus not found" });
      }
      res.json(bonus);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating bonus:", error);
      res.status(500).json({ error: "Failed to update bonus" });
    }
  });

  app.delete("/api/admin/bonuses/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteBonus(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting bonus:", error);
      res.status(500).json({ error: "Failed to delete bonus" });
    }
  });

  // Admin Guides
  app.get("/api/admin/guides", isAuthenticated, async (req, res) => {
    try {
      const guides = await storage.getAllGuides();
      res.json(guides);
    } catch (error) {
      console.error("Error fetching guides:", error);
      res.status(500).json({ error: "Failed to fetch guides" });
    }
  });

  app.post("/api/admin/guides", isAuthenticated, async (req, res) => {
    try {
      const data = insertGuideSchema.parse(req.body);
      const guide = await storage.createGuide(data);
      res.status(201).json(guide);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating guide:", error);
      res.status(500).json({ error: "Failed to create guide" });
    }
  });

  app.put("/api/admin/guides/:id", isAuthenticated, async (req, res) => {
    try {
      const data = insertGuideSchema.partial().parse(req.body);
      const guide = await storage.updateGuide(req.params.id, data);
      if (!guide) {
        return res.status(404).json({ error: "Guide not found" });
      }
      res.json(guide);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating guide:", error);
      res.status(500).json({ error: "Failed to update guide" });
    }
  });

  app.delete("/api/admin/guides/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteGuide(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting guide:", error);
      res.status(500).json({ error: "Failed to delete guide" });
    }
  });

  // Admin FAQs
  app.post("/api/admin/faqs", isAuthenticated, async (req, res) => {
    try {
      const data = insertFaqSchema.parse(req.body);
      const faq = await storage.createFaq(data);
      res.status(201).json(faq);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error creating FAQ:", error);
      res.status(500).json({ error: "Failed to create FAQ" });
    }
  });

  app.put("/api/admin/faqs/:id", isAuthenticated, async (req, res) => {
    try {
      const data = insertFaqSchema.partial().parse(req.body);
      const faq = await storage.updateFaq(req.params.id, data);
      if (!faq) {
        return res.status(404).json({ error: "FAQ not found" });
      }
      res.json(faq);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid data", details: error.errors });
      }
      console.error("Error updating FAQ:", error);
      res.status(500).json({ error: "Failed to update FAQ" });
    }
  });

  app.delete("/api/admin/faqs/:id", isAuthenticated, async (req, res) => {
    try {
      await storage.deleteFaq(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      res.status(500).json({ error: "Failed to delete FAQ" });
    }
  });

  return httpServer;
}
