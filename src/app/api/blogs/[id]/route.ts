import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.foodBlogs.findUnique({
      where: {
        id: params.id,
      },
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

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch blog",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedBlog = await prisma.foodBlogs.update({
      where: {
        id: params.id,
      },
      data: body,
    });
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      {
        error: "Failed to update blog",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
