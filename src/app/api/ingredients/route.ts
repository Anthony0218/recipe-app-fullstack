import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db/connection";
import { ingredientsSchema, recipesSchema } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const { recipeId, ingredientName, amount, uom } = await request.json();

  try {
    await db.insert(ingredientsSchema).values({
      recipeId: recipeId,
      ingredientName: ingredientName,
      amount: amount,
      uom: uom,
    });

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
  const { ingredientId } = await request.json();
  try {
    await db
      .delete(ingredientsSchema)
      .where(eq(ingredientsSchema.ingredientId, ingredientId));

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 402,
      headers: { "Content-Type": "application/json" },
    });
  }
}
