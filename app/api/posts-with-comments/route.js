import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        comments: {
          orderBy: { date: "asc" },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts with comments:", error);
    return NextResponse.json(
      { error: "Failed to load posts and comments", details: error.message },
      { status: 500 }
    );
  }
}
