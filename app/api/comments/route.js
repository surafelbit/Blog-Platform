import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// CORS helper
function withCORSHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { author, postId, content } = body;

    if (!content || typeof postId !== "number") {
      return withCORSHeaders(
        NextResponse.json(
          { error: "Missing content or invalid postId" },
          { status: 400 }
        )
      );
    }

    const newComment = await prisma.comment.create({
      data: {
        author: author?.trim() || "Anonymous",
        postId,
        content,
      },
    });

    return withCORSHeaders(
      NextResponse.json(
        { message: "Comment added successfully", comment: newComment },
        { status: 201 }
      )
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    return withCORSHeaders(
      NextResponse.json(
        { error: "Failed to create comment", details: error.message },
        { status: 500 }
      )
    );
  }
}

export async function OPTIONS() {
  return withCORSHeaders(new NextResponse(null, { status: 200 }));
}
