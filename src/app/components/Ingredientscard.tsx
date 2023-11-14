"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ingredientcard = {
  id: number;
  ingredients: {
    ingredientId: number;
    recipeId: number | null;
    ingredientName: string;
    amount: number;
    uom: string;
  }[];
};

export default function Ingredientcard({ id, ingredients }: ingredientcard) {
  const [ingredientName, setIngredientname] = useState("");
  const [amount, setAmount] = useState("");
  const [uom, setUom] = useState("");
  const router = useRouter();
  const submitIngredient = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("/api/ingredients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipeId: id,
        ingredientName: ingredientName,
        amount: Number(amount),
        uom: uom,
      }),
    });
    if (!response.ok) {
      throw new Error(`status code is ${response.status}`);
    }
    setIngredientname("");
    setAmount("");
    setUom("");
    router.refresh();
  };

  const deleteIngredient = async (ingredientId: number) => {
    const response = await fetch("/api/ingredients", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ingredientId: ingredientId,
      }),
    });
    if (!response.ok) {
      throw new Error(`status code is ${response.status}`);
    }
    router.refresh();
  };
  return (
    <>
      <div className="border-2 border-black rounded p-2 m-2 bg-gray-300 hover:bg-gray-400">
        <div className="flex justify-center ">ingredients:</div>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient.ingredientId} className="flex justify-center">
              <b>{ingredient.ingredientName}: </b>
              {ingredient.amount}
              {"["}
              {ingredient.uom} {"]"}
              <button
                onClick={() => deleteIngredient(ingredient.ingredientId)}
                className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                delete
              </button>
            </li>
          ))}
        </ul>
        <h1 className="flex justify-center font-bold">submit ingredients</h1>
        <form
          onSubmit={(e) => submitIngredient(e)}
          className="flex justify-center"
        >
          <input
            className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
            type="text"
            placeholder="name of the ingredient"
            value={ingredientName}
            onChange={(e) => {
              setIngredientname(e.target.value);
            }}
          />
          <input
            className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
            type="text"
            placeholder="amount of the ingredient"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <input
            className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
            type="text"
            placeholder="Unit of measurement"
            value={uom}
            onChange={(e) => {
              setUom(e.target.value);
            }}
          />
          <button className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400">
            submit
          </button>
        </form>
      </div>
    </>
  );
}
