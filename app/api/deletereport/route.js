import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

const allowedOrigin = "*";

function withCORSHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", allowedOrigin);
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

// Handle preflight requests
export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  response.headers.set("Access-Control-Allow-Credentials", "true"); // Add this if needed

  return response;
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const all = searchParams.get("all");
    const postId = searchParams.get("postid");
    if (all == "true") {
      const result = await prisma.report.deleteMany();
      return withCORSHeaders(
        NextResponse.json({ message: "All messages deleted" }, { status: 200 })
      );
    }
    if (id) {
      const result = await prisma.report.delete({
        where: { id: id },
      });
      return withCORSHeaders(
        NextResponse.json({ message: "Report Deleted" }, { status: 200 })
      );
    }
    if (postId) {
      const result = await prisma.report.deleteMany({
        where: { postid: parseInt(postId) },
      });
      return withCORSHeaders(
        NextResponse.json(
          { message: "Post's reports have been deleted" },
          { status: 200 }
        )
      );
    }
    if (!id && postId) {
      return NextResponse.json(
        { error: "No report found by that id" },
        { status: 404 }
      );
    }
  } catch (error) {
    return withCORSHeaders(
      NextResponse.json({ message: "error", error: error }, { status: 400 })
    );
  }
}
