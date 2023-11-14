import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db/connection";
import { ingredientsSchema, recipesSchema } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  console.log("hey");
  const { name, duration } = await request.json();
  try {
    await db.insert(recipesSchema).values({ name: name, duration: duration });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 402,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request: NextRequest) {
  const { recipeId } = await request.json();
  try {
    await db.delete(recipesSchema).where(eq(recipesSchema.id, recipeId));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 402,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(request: NextRequest) {
  const { recipeId, newName, newDuration } = await request.json();

  try {
    await db
      .update(recipesSchema)
      .set({ name: newName, duration: newDuration })
      .where(eq(recipesSchema.id, recipeId));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 402,
      headers: { "Content-Type": "application/json" },
    });
  }
}
