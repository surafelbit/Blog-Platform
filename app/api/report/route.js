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
  return response;
}

// GET reports
export async function GET() {
  try {
    const report = await prisma.report.findMany();
    return withCORSHeaders(NextResponse.json(report, { status: 200 }));
  } catch (error) {
    return withCORSHeaders(
      NextResponse.json(
        { error: "Failed to fetch reports", details: error.message },
        { status: 500 }
      )
    );
  }
}

// POST new report
export async function POST(req) {
  try {
    const { reason, type, postId, reporter } = await req.json();

    if (!type || !postId) {
      return withCORSHeaders(
        NextResponse.json({ error: "Missing Fields" }, { status: 400 })
      );
    }

    const report = await prisma.report.create({
      data: {
        reason,
        type,
        Post: { connect: { id: parseInt(postId) } },
        reporter,
      },
    });

    return withCORSHeaders(
      NextResponse.json({ message: "Report created", report }, { status: 201 })
    );
  } catch (error) {
    console.log(error);
    return withCORSHeaders(
      NextResponse.json(
        { error: "Error Occurred", details: error.message },
        { status: 500 }
      )
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const all = searchParams.get("all");

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
    if (!id) {
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
