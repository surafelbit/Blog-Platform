import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
const allowedOrigins = [
  "http://localhost:3000", // user frontend local
  "http://localhost:3001", // admin frontend local
  "https://admin.example.com", // admin prod
  "https://user.example.com", // user prod
];
function withCORSHeaders(response) {
  const origin = req.headers.get("origin");
  if (allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }
  // Optional: else don't set, or set some default (not recommended)
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, DELETE"
  );
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function OPTIONS() {
  return withCORSHeaders(new NextResponse(null, { status: 200 }));
}
export async function GET() {
  try {
    const report = await prisma.report.findMany();
    return withCORSHeaders(NextResponse.json(report, { status: 200 }));
  } catch (error) {
    return withCORSHeaders(
      NextResponse.json(
        {
          error: "Failed to fetch posts",
          details: error.message,
        },
        { status: 500 }
      )
    );
  }
}
export async function POST(req) {
  try {
    const { reason, type, postId, reporter } = await req.json();

    console.log(reason, type, postId, reporter);
    if (!type || !postId) {
      return withCORSHeaders(
        NextResponse.json({ error: "Missing Fields" }, { status: 404 })
      );
    }
    const report = await prisma.report.create({
      data: {
        reason: reason,
        type: type,
        Post: { connect: { id: parseInt(postId) } },
        reporter: reporter,
      },
    });
    return withCORSHeaders(
      NextResponse.json({ message: "POST CREATED", report: report })
    );
  } catch (error) {
    console.log(error);
    return withCORSHeaders(
      NextResponse.json({ error: "Error Occured", details: error.message })
    );
  }
}
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return withCORSHeaders(
        NextResponse.json({ error: "Missing report id" }, { status: 400 })
      );
    }

    // If id is string but your prisma id is Int, parse it accordingly:
    // const reportId = parseInt(id);
    const post = await prisma.post.delete({
      where: {
        id: parseInt(id), // or parseInt(id) if id is Int in schema
      },
    });

    return withCORSHeaders(
      NextResponse.json({ message: "Report deleted successfully", post })
    );
  } catch (error) {
    console.log(error);
    return withCORSHeaders(
      NextResponse.json({
        error: "Failed to delete report",
        details: error.message,
      })
    );
  }
}
