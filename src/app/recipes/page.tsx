import Link from "next/link";
import db from "../../../db/connection";
import { recipesSchema } from "../../../db/schema";
import Recipecard from "../components/Recipecard";

export default async function recipes() {
  const recipes = await db
    .select()
    .from(recipesSchema)
    .orderBy(recipesSchema.name);

  return (
    <>
      <h1 className="flex justify-center font-bold">All recipes</h1>
      <div className="flex justify-center">
        <Link href="/recipes/submit-recipes">
          <button className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400">
            submit your recipe
          </button>
        </Link>
      </div>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className="flex justify-center items-center">
            <Recipecard {...recipe} />
            <Link href={`/recipes/${recipe.id}`}>
              ={">"}
              <button className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400">
                show more
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
