"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Recipecard = {
  id: number;
  name: string;
  duration: number;
};

export default function Recipecard({ id, name, duration }: Recipecard) {
  const router = useRouter();
  const [edit, setEditing] = useState(false);
  const [newName, setNewname] = useState(name);
  const [newDuration, setNewduration] = useState(String(duration));

  const deleteRecipe = async () => {
    const response = await fetch("/api/recipes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipeId: id,
      }),
    });
    if (!response.ok) {
      throw new Error(`status code is ${response.status}`);
    }

    router.push("/recipes");
    router.refresh();
  };

  const editRecipe = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch("/api/recipes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipeId: id,
        newName: newName,
        newDuration: Number(newDuration),
      }),
    });
    if (!response.ok) {
      throw new Error(`status code is ${response.status}`);
    }
    setEditing(false);
    setNewname(newName);
    setNewduration(newDuration);
    router.refresh();
  };
  return (
    <>
      <div className="border-2 border-black rounded m-2 p-2  bg-gray-300 hover:bg-gray-400 ">
        {edit ? (
          <form className="flex justify-center" onSubmit={(e) => editRecipe(e)}>
            <input
              className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
              type="text"
              value={newName}
              onChange={(e) => setNewname(e.target.value)}
            />
            <input
              className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
              type="text"
              value={newDuration}
              onChange={(e) => setNewduration(e.target.value)}
            />
            <button className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400">
              save
            </button>
          </form>
        ) : (
          <>
            <div className="flex justify-center ">
              recipe #{id}: <b>{name}</b>
              {"("}
              {duration}min{")"}
              <button
                className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={() => setEditing(true)}
              >
                edit
              </button>
              <button
                className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={deleteRecipe}
              >
                delete
              </button>
              <br />
            </div>
          </>
        )}
      </div>
    </>
  );
}
