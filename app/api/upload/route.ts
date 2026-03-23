import { NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 400 });
  }

  await dbConnect();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const db = mongoose.connection.db!;
  const bucket = new GridFSBucket(db, { bucketName: "images" });

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${Date.now()}.${ext}`;

  const uploadStream = bucket.openUploadStream(filename, {
    metadata: { contentType: file.type },
  });

  await new Promise<void>((resolve, reject) => {
    uploadStream.on("finish", resolve);
    uploadStream.on("error", reject);
    uploadStream.end(buffer);
  });

  return NextResponse.json({ url: `/api/images/${uploadStream.id}` });
}
