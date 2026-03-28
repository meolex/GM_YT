import { relations } from "drizzle-orm";
import { integer, jsonb, pgEnum, pgTable, real, timestamp, varchar } from "drizzle-orm/pg-core";

export const playersTable = pgTable("players", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
  position: jsonb("position").$type<{ x: number; y: number; z: number; heading: number }>(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const playersRelations = relations(playersTable, ({ one }) => ({
  appearance: one(playerApperanceTable),
}));

export const sexEnum = pgEnum("sex", ["male", "female"]);

export const playerApperanceTable = pgTable("player_appearance", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  playerId: integer("player_id")
    .notNull()
    .references(() => playersTable.id, { onDelete: "cascade" })
    .unique(),

  // Head blend
  sex: sexEnum("sex").notNull(),
  mother: integer("mother").notNull(),
  father: integer("father").notNull(),
  similarity: real("similarity").notNull(),
  skinTone: real("skin_tone").notNull(),

  // Head overlay
  blemishes: integer("blemishes").notNull(),
  eyebrows: integer("eyebrows").notNull(),
  ageing: integer("ageing").notNull(),
  makeup: integer("makeup").notNull(),
  complexion: integer("complexion").notNull(),
  sunDamage: integer("sun_damage").notNull(),
  lipstick: integer("lipstick").notNull(),
  molesFreckles: integer("moles_freckles").notNull(),

  // Face features
  noseWidth: real("nose_width").notNull(),
  noseHeight: real("nose_height").notNull(),
  noseLength: real("nose_length").notNull(),
  noseBridge: real("nose_bridge").notNull(),
  noseTip: real("nose_tip").notNull(),
  noseBridgeShift: real("nose_bridge_shift").notNull(),
  browHeight: real("brow_height").notNull(),
  browWidth: real("brow_width").notNull(),
  cheekboneHeight: real("cheekbone_height").notNull(),
  cheekboneWidth: real("cheekbone_width").notNull(),
  cheeksWidth: real("cheeks_width").notNull(),
  eyes: real("eyes").notNull(),
  lips: real("lips").notNull(),
  jawWidth: real("jaw_width").notNull(),
  jawHeight: real("jaw_height").notNull(),
  chinLength: real("chin_length").notNull(),
  chinPosition: real("chin_position").notNull(),
  chinWidth: real("chin_width").notNull(),
  chinShape: real("chin_shape").notNull(),
  neckWidth: real("neck_width").notNull(),

  // Colors
  hairStyle: integer("hair_style").notNull(),
  facialHair: integer("facial_hair").notNull(),
  eyeColor: integer("eye_color").notNull(),
  hairColor: integer("hair_color").notNull(),
  beardColor: integer("beard_color").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const playerAppearanceRelations = relations(playerApperanceTable, ({ one }) => ({
  player: one(playersTable, {
    references: [playersTable.id],
    fields: [playerApperanceTable.playerId],
  }),
}));
