"use client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function Submitrecipes() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const router = useRouter();
  const submitRecipe = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        duration: Number(duration),
      }),
    });
    if (!response.ok) {
      throw new Error(`status code is ${response.status}`);
    }
    setName("");
    setDuration("");
    router.push("/recipes");
    router.refresh();
  };
  return (
    <>
      <h1 className="flex justify-center font-bold">submit recipe</h1>
      <form onSubmit={(e) => submitRecipe(e)} className="flex justify-center">
        <input
          className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
          type="text"
          placeholder="name of the recipe"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400"
          type="text"
          placeholder="duration of the recipe"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
          }}
        />
        <button className="border-2 border-black m-2 p-2 rounded bg-gray-300 hover:bg-gray-400">
          submit
        </button>
      </form>
    </>
  );
}
