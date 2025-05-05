import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blogs.findUnique({
      where: {
        id: params.id,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        seo: true,
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
    const { seo } = await request.json();

    const updatedBlog = await prisma.blogs.update({
      where: {
        id: params.id,
      },
      data: {
        seo,
      },
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
