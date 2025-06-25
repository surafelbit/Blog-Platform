// app/api/posts/route.js
import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { cloudinary } from "@/lib/cloudinary";
function withCORSHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
export async function OPTIONS() {
  return withCORSHeaders(new NextResponse(null, { status: 200 }));
}
// GET all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch posts",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
export async function POST(request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const blog = formData.get("blog");
    const catagory = formData.get("catagory");
    const nickname = formData.get("nickname");
    const file = formData.get("image");

    if (!title || !blog || !catagory) {
      return withCORSHeaders(
        NextResponse.json(
          {
            error:
              "All fields (title, blog, catagory, nickname, image) are required",
          },
          { status: 400 }
        )
      );
    }
    let imageUrl = null;

    if (file && typeof file === "object") {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blog-posts" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(buffer);
      });

      imageUrl = uploadRes.secure_url;
    }

    // const arrayBuffer = await file.arrayBuffer();
    // const buffer = Buffer.from(arrayBuffer);

    // const uploadRes = await new Promise((resolve, reject) => {
    //   cloudinary.uploader
    //     .upload_stream({ folder: "blog-posts" }, (error, result) => {
    //       if (error) return reject(error);
    //       resolve(result);
    //     })
    //     .end(buffer);
    // });

    const newPost = await prisma.post.create({
      data: {
        title,
        blog,
        catagory,
        image: imageUrl,
        nickname: nickname || undefined,
      },
    });

    return withCORSHeaders(
      NextResponse.json(
        { message: "Post created successfully", post: newPost },
        { status: 201 }
      )
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return withCORSHeaders(
      NextResponse.json(
        { error: "Failed to create post", details: error.message },
        { status: 500 }
      )
    );
  }
}
