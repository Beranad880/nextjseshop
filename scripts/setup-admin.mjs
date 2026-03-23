#!/usr/bin/env node
/**
 * Setup script for admin account in MongoDB.
 * Run: node scripts/setup-admin.mjs
 *
 * Required environment variable:
 *   MONGODB_URI — connection string to your MongoDB database
 *
 * Optional (reads from .env.local automatically):
 *   You can create .env.local with MONGODB_URI before running this script.
 */

import { createInterface } from "readline";
import { randomBytes } from "crypto";
import { readFileSync } from "fs";
import { resolve } from "path";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Load .env.local manually
try {
  const envFile = readFileSync(resolve(process.cwd(), ".env.local"), "utf-8");
  for (const line of envFile.split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  }
} catch {
  // .env.local not found, continue with existing env
}

const rl = createInterface({ input: process.stdin, output: process.stdout });
const question = (q) => new Promise((resolve) => rl.question(q, resolve));

console.log("\n=== Admin Setup ===\n");

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Chyba: MONGODB_URI není nastaveno v .env.local nebo prostředí.");
  process.exit(1);
}

const username = (await question("Uživatelské jméno [admin]: ")).trim() || "admin";
const password = await question("Heslo: ");

if (password.length < 8) {
  console.error("\nHeslo musí mít alespoň 8 znaků.");
  rl.close();
  process.exit(1);
}

const passwordHash = await bcrypt.hash(password, 12);

console.log("\nPřipojuji se k MongoDB...");
await mongoose.connect(MONGODB_URI);

// Define inline schema (avoid TS imports in .mjs)
const Admin = mongoose.models.Admin || mongoose.model("Admin", new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true }));

const existing = await Admin.findOne({ username });
if (existing) {
  const overwrite = (await question(`Admin "${username}" již existuje. Přepsat heslo? (a/N): `)).trim().toLowerCase();
  if (overwrite !== "a") {
    console.log("Zrušeno.");
    await mongoose.disconnect();
    rl.close();
    process.exit(0);
  }
  await Admin.updateOne({ username }, { passwordHash });
  console.log(`\nHeslo pro "${username}" bylo aktualizováno.`);
} else {
  await Admin.create({ username, passwordHash });
  console.log(`\nAdmin "${username}" byl vytvořen.`);
}

// Generate SESSION_SECRET hint if not set
if (!process.env.SESSION_SECRET) {
  const secret = randomBytes(32).toString("base64");
  console.log("\nPřidej do .env.local:");
  console.log(`SESSION_SECRET=${secret}`);
}

await mongoose.disconnect();
rl.close();
