import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const blogs = await prisma.foodBlogs.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        seo: true,
        recipedescription: true,
        instructions: true,
        recipedetails: true,
        faq: true,
        equipments: true,
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch blogs",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
