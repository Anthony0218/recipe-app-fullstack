CREATE TABLE IF NOT EXISTS "ingredients" (
	"ingredientId" serial PRIMARY KEY NOT NULL,
	"recipeId" integer NOT NULL,
	"ingredientName" varchar(256),
	"amount" integer NOT NULL,
	"unit of measurement" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"duration" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_recipeId_recipes_id_fk" FOREIGN KEY ("recipeId") REFERENCES "recipes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
