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

export async function OPTIONS() {
  return withCORSHeaders(new NextResponse(null, { status: 204 }));
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const all = searchParams.get("all");
    const postId = searchParams.get("postid");

    if (all === "true") {
      await prisma.report.deleteMany();
      return withCORSHeaders(
        NextResponse.json({ message: "All reports deleted" }, { status: 200 })
      );
    }

    if (id) {
      await prisma.report.delete({
        where: { id },
      });
      return withCORSHeaders(
        NextResponse.json({ message: "Report deleted" }, { status: 200 })
      );
    }

    if (postId) {
      await prisma.report.deleteMany({
        where: { postid: parseInt(postId, 10) },
      });
      return withCORSHeaders(
        NextResponse.json(
          { message: "Post reports deleted" },
          { status: 200 }
        )
      );
    }

    return withCORSHeaders(
      NextResponse.json({ error: "No report identifier provided" }, { status: 404 })
    );
  } catch (error) {
    return withCORSHeaders(
      NextResponse.json({ message: "Something went wrong", error: String(error) }, { status: 400 })
    );
  }
}
