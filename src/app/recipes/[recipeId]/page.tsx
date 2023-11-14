import { eq } from "drizzle-orm";
import { ingredientsSchema, recipesSchema } from "../../../../db/schema";
import recipes from "../page";
import db from "../../../../db/connection";
import Recipecard from "@/app/components/Recipecard";
import { redirect } from "next/navigation";
import Ingredientcard from "@/app/components/Ingredientscard";

type Context = {
  params: { recipeId: string };
};

export default async function recipe({ params: { recipeId } }: Context) {
  const ingredients = await db.select().from(ingredientsSchema);
  const rightIngredients = ingredients.filter(
    (ingredient) => ingredient.recipeId === Number(recipeId)
  );
  if (rightIngredients === undefined) {
    throw new Error("unknown ingredients");
  }
  const recipes = await db.select().from(recipesSchema);
  const rightRecipe = recipes.find((recipe) => recipe.id === Number(recipeId));
  if (rightRecipe === undefined) {
    redirect("/recipes");
  }

  return (
    <div className="border-2 border-black rounded  ">
      <Recipecard {...rightRecipe} />
      <Ingredientcard id={rightRecipe.id} ingredients={rightIngredients} />
    </div>
  );
}
