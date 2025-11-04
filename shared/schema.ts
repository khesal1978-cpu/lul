import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const chatMessageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

export const ttsRequestSchema = z.object({
  text: z.string().min(1, "Text cannot be empty"),
});

export type TTSRequest = z.infer<typeof ttsRequestSchema>;
