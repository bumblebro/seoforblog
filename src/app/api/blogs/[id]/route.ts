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
    return NextResponse.json({ error: "Error fetching blog" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { seo } = await request.json();

    // Ensure the SEO object has all required fields
    const updatedSeo = {
      ...seo,
      primaryKeywordsNew: seo.primaryKeywordsNew || [],
      secondaryKeywordsNew: seo.secondaryKeywordsNew || [],
    };

    const updatedBlog = await prisma.blogs.update({
      where: {
        id: params.id,
      },
      data: {
        seo: updatedSeo,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Error updating blog" }, { status: 500 });
  }
}
