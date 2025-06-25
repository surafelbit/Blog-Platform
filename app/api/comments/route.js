import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const { author, postId, content } = body;

    if (!content || typeof postId !== "number") {
      return NextResponse.json(
        { error: "Missing content or invalid postId" },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        author: author?.trim() || "Anonymous",
        postId,
        content,
      },
    });

    return NextResponse.json(
      { message: "Comment added successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment", details: error.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
