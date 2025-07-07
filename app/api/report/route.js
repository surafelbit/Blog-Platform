import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { error } from "console";
function withCORSHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
export async function GET(req) {
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
    if (!reason || !type || !reporter || !postId) {
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
