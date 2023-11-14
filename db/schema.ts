import { integer, serial, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const recipesSchema = pgTable("recipes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  duration: integer("duration").notNull(),
});

export const ingredientsSchema = pgTable("ingredients", {
  ingredientId: serial("ingredientId").primaryKey(),
  recipeId: integer("recipeId"),
  ingredientName: varchar("ingredientName", { length: 256 }).notNull(),
  amount: integer("amount").notNull(),
  uom: varchar("unit of measurement", { length: 256 }).notNull(),
});
