import { NextResponse } from "next/server";
import { GridFSBucket, ObjectId } from "mongodb";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return NextResponse.json({ error: "Invalid image ID" }, { status: 400 });
  }

  await dbConnect();

  const db = mongoose.connection.db!;
  const bucket = new GridFSBucket(db, { bucketName: "images" });

  const files = await bucket.find({ _id: objectId }).toArray();
  if (!files.length) {
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }

  const file = files[0];
  const downloadStream = bucket.openDownloadStream(objectId);

  const chunks: Buffer[] = [];
  for await (const chunk of downloadStream) {
    chunks.push(Buffer.from(chunk));
  }
  const buffer = Buffer.concat(chunks);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": (file.metadata?.contentType as string) ?? "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
