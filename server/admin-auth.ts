import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { db } from "./db";
import { adminUsers } from "@shared/schema";
import { eq } from "drizzle-orm";

declare module "express-session" {
  interface SessionData {
    adminUserId?: string;
    adminUsername?: string;
  }
}

export async function createAdminUser(username: string, password: string, email?: string) {
  const passwordHash = await bcrypt.hash(password, 10);
  const [user] = await db.insert(adminUsers).values({
    username,
    passwordHash,
    email,
  }).returning();
  return user;
}

export async function verifyAdminCredentials(username: string, password: string) {
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
  if (!user) {
    return null;
  }
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return null;
  }
  await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, user.id));
  return user;
}

export async function getAdminByUsername(username: string) {
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
  return user || null;
}

export async function getAllAdminUsers() {
  return db.select({
    id: adminUsers.id,
    username: adminUsers.username,
    email: adminUsers.email,
    role: adminUsers.role,
    createdAt: adminUsers.createdAt,
    lastLoginAt: adminUsers.lastLoginAt,
  }).from(adminUsers);
}

export async function deleteAdminUser(id: string) {
  await db.delete(adminUsers).where(eq(adminUsers.id, id));
}

export async function countAdminUsers() {
  const users = await db.select().from(adminUsers);
  return users.length;
}

export function isAdminAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session?.adminUserId) {
    return next();
  }
  return res.status(401).json({ error: "Unauthorized" });
}

export function getAdminSession(req: Request) {
  if (req.session?.adminUserId) {
    return {
      id: req.session.adminUserId,
      username: req.session.adminUsername,
    };
  }
  return null;
}
