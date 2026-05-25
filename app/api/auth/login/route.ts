import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import dbConnect from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Vyplňte všechna pole" }, { status: 400 });
  }

  // 1. Check environment variables if defined
  const envUsername = process.env.ADMIN_USERNAME;
  const envPassword = process.env.ADMIN_PASSWORD;

  if (envUsername && envPassword) {
    if (username === envUsername && password === envPassword) {
      await createSession();
      return NextResponse.json({ success: true });
    }
  }

  // 2. Fallback to MongoDB
  await dbConnect();
  const admin = await Admin.findOne({ username });

  if (!admin) {
    return NextResponse.json({ error: "Neplatné přihlašovací údaje" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Neplatné přihlašovací údaje" }, { status: 401 });
  }

  await createSession();
  return NextResponse.json({ success: true });
}
