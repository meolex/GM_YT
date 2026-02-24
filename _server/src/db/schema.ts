import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const playerTable = pgTable("players", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
});
