import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { db } from "./db";
import { adminUsers, passwordResetTokens } from "@shared/schema";
import { eq, and, gt } from "drizzle-orm";

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

export async function getAdminById(id: string) {
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.id, id));
  return user || null;
}

export async function changeAdminPassword(userId: string, currentPassword: string, newPassword: string) {
  const user = await getAdminById(userId);
  if (!user) return { success: false, error: "User not found" };

  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) return { success: false, error: "Current password is incorrect" };

  const newHash = await bcrypt.hash(newPassword, 10);
  await db.update(adminUsers).set({ passwordHash: newHash }).where(eq(adminUsers.id, userId));
  return { success: true };
}

export async function updateAdminEmail(userId: string, email: string) {
  const [updated] = await db.update(adminUsers).set({ email }).where(eq(adminUsers.id, userId)).returning();
  return updated;
}

export async function createPasswordResetToken(email: string) {
  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
  if (!user) return null;

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await db.insert(passwordResetTokens).values({
    userId: user.id,
    token,
    expiresAt,
  });

  return { token, user };
}

export async function resetPasswordWithToken(token: string, newPassword: string) {
  const [resetToken] = await db.select().from(passwordResetTokens).where(
    and(
      eq(passwordResetTokens.token, token),
      gt(passwordResetTokens.expiresAt, new Date())
    )
  );

  if (!resetToken || resetToken.usedAt) {
    return { success: false, error: "Invalid or expired reset link" };
  }

  const newHash = await bcrypt.hash(newPassword, 10);
  await db.update(adminUsers).set({ passwordHash: newHash }).where(eq(adminUsers.id, resetToken.userId));
  await db.update(passwordResetTokens).set({ usedAt: new Date() }).where(eq(passwordResetTokens.id, resetToken.id));

  return { success: true };
}
