import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookmakerSchema, insertBonusSchema, insertGuideSchema, insertFaqSchema } from "@shared/schema";
import { z } from "zod";
import { 
  isAdminAuthenticated, 
  verifyAdminCredentials, 
  createAdminUser, 
  getAdminSession,
  getAllAdminUsers,
  deleteAdminUser,
  countAdminUsers,
  getAdminByUsername
} from "./admin-auth";
import { getSession } from "./replit_integrations/auth";
import multer from "multer";
import path from "path";
import fs from "fs";

// Setup multer for file uploads
const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "public", "logos");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const uploadLogo = multer({
  storage: logoStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === "image/svg+xml";
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed (jpg, png, gif, svg, webp)"));
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup session middleware for admin auth
  app.set("trust proxy", 1);
  app.use(getSession());
  
  // Admin Authentication Routes
  
  // Login
  app.post("/api/admin/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
      
      const user = await verifyAdminCredentials(username, password);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      req.session.adminUserId = user.id;
      req.session.adminUsername = user.username;
      
      res.json({ 
        success: true, 
        user: { id: user.id, username: user.username, role: user.role } 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Logout
  app.post("/api/admin/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  // Get current session
  app.get("/api/admin/auth/session", (req, res) => {
    const session = getAdminSession(req);
    if (session) {
      res.json({ authenticated: true, user: session });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Setup initial admin (only works if no admins exist)
  app.post("/api/admin/auth/setup", async (req, res) => {
    try {
      const count = await countAdminUsers();
      if (count > 0) {
        return res.status(403).json({ error: "Admin already exists. Login to create more users." });
      }
      
      const { username, password, email } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
      if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
      }
      
      const user = await createAdminUser(username, password, email);
      
      req.session.adminUserId = user.id;
      req.session.adminUsername = user.username;
      
      res.status(201).json({ 
        success: true, 
        user: { id: user.id, username: user.username, role: user.role } 
      });
    } catch (error: any) {
      if (error?.code === "23505") {
        return res.status(400).json({ error: "Username already exists" });
      }
      console.error("Setup error:", error);
      res.status(500).json({ error: "Setup failed" });
    }
  });

  // Check if setup is needed
  app.get("/api/admin/auth/needs-setup", async (req, res) => {
    try {
      const count = await countAdminUsers();
      res.json({ needsSetup: count === 0 });
    } catch (error) {
      console.error("Check setup error:", error);
      res.status(500).json({ error: "Failed to check setup status" });
    }
  });

  // Create new admin user (requires auth)
  app.post("/api/admin/users", isAdminAuthenticated, async (req, res) => {
    try {
      const { username, password, email } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
      if (password.length < 8) {
        return res.status(400).json({ error: "Password must be at least 8 characters" });
      }
      
      const existing = await getAdminByUsername(username);
      if (existing) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      const user = await createAdminUser(username, password, email);
      res.status(201).json({ 
        id: user.id, 
        username: user.username, 
        email: user.email,
        role: user.role 
      });
    } catch (error) {
      console.error("Create admin error:", error);
      res.status(500).json({ error: "Failed to create admin user" });
    }
  });

  // List admin users (requires auth)
  app.get("/api/admin/users", isAdminAuthenticated, async (req, res) => {
    try {
      const users = await getAllAdminUsers();
      res.json(users);
    } catch (error) {
      console.error("List admins error:", error);
      res.status(500).json({ error: "Failed to list admin users" });
    }
  });

  // Delete admin user (requires auth)
  app.delete("/api/admin/users/:id", isAdminAuthenticated, async (req, res) => {
    try {
      const count = await countAdminUsers();
      if (count <= 1) {
        return res.status(400).json({ error: "Cannot delete the last admin user" });
      }
      await deleteAdminUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Delete admin error:", error);
      res.status(500).json({ error: "Failed to delete admin user" });
    }
  });

  // Logo Upload Routes
  
  // Upload logo file
  app.post("/api/admin/upload/logo", isAdminAuthenticated, uploadLogo.single("logo"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const logoPath = `/logos/${req.file.filename}`;
      res.json({ 
        success: true, 
        logoPath,
        filename: req.file.filename,
        originalName: req.file.originalname
      });
    } catch (error: any) {
      console.error("Logo upload error:", error);
      res.status(500).json({ error: error.message || "Upload failed" });
    }
  });

  // List available logos
  app.get("/api/admin/logos", isAdminAuthenticated, async (req, res) => {
    try {
      const logosDir = path.join(process.cwd(), "public", "logos");
      if (!fs.existsSync(logosDir)) {
        return res.json({ logos: [] });
      }
      const files = fs.readdirSync(logosDir);
      const logos = files
        .filter(f => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(f))
        .map(f => ({
          filename: f,
          path: `/logos/${f}`,
        }));
      res.json({ logos });
    } catch (error) {
      console.error("List logos error:", error);
      res.status(500).json({ error: "Failed to list logos" });
    }
  });

  // Delete logo file
  app.delete("/api/admin/logos/:filename", isAdminAuthenticated, async (req, res) => {
    try {
      const filename = req.params.filename;
      const filePath = path.join(process.cwd(), "public", "logos", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "File not found" });
      }
    } catch (error) {
      console.error("Delete logo error:", error);
      res.status(500).json({ error: "Failed to delete logo" });
    }
  });

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
  app.post("/api/admin/bookmakers", isAdminAuthenticated, async (req, res) => {
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

  app.put("/api/admin/bookmakers/:id", isAdminAuthenticated, async (req, res) => {
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

  app.delete("/api/admin/bookmakers/:id", isAdminAuthenticated, async (req, res) => {
    try {
      await storage.deleteBookmaker(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting bookmaker:", error);
      res.status(500).json({ error: "Failed to delete bookmaker" });
    }
  });

  // Admin Bonuses
  app.post("/api/admin/bonuses", isAdminAuthenticated, async (req, res) => {
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

  app.put("/api/admin/bonuses/:id", isAdminAuthenticated, async (req, res) => {
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

  app.delete("/api/admin/bonuses/:id", isAdminAuthenticated, async (req, res) => {
    try {
      await storage.deleteBonus(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting bonus:", error);
      res.status(500).json({ error: "Failed to delete bonus" });
    }
  });

  // Admin Guides
  app.get("/api/admin/guides", isAdminAuthenticated, async (req, res) => {
    try {
      const guides = await storage.getAllGuides();
      res.json(guides);
    } catch (error) {
      console.error("Error fetching guides:", error);
      res.status(500).json({ error: "Failed to fetch guides" });
    }
  });

  app.post("/api/admin/guides", isAdminAuthenticated, async (req, res) => {
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

  app.put("/api/admin/guides/:id", isAdminAuthenticated, async (req, res) => {
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

  app.delete("/api/admin/guides/:id", isAdminAuthenticated, async (req, res) => {
    try {
      await storage.deleteGuide(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting guide:", error);
      res.status(500).json({ error: "Failed to delete guide" });
    }
  });

  // Admin FAQs
  app.post("/api/admin/faqs", isAdminAuthenticated, async (req, res) => {
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

  app.put("/api/admin/faqs/:id", isAdminAuthenticated, async (req, res) => {
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

  app.delete("/api/admin/faqs/:id", isAdminAuthenticated, async (req, res) => {
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
