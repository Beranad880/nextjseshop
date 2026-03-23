#!/usr/bin/env node
/**
 * Setup script for admin credentials.
 * Run: node scripts/setup-admin.mjs
 *
 * This generates the values you need to add to your .env.local (or Railway Variables):
 *   ADMIN_USERNAME
 *   ADMIN_PASSWORD_HASH
 *   SESSION_SECRET
 */

import { createInterface } from "readline";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const question = (q) => new Promise((resolve) => rl.question(q, resolve));

console.log("\n=== Admin Setup ===\n");

const username = (await question("Uživatelské jméno [admin]: ")).trim() || "admin";
const password = await question("Heslo: ");

if (password.length < 8) {
  console.error("\nHeslo musí mít alespoň 8 znaků.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
const secret = randomBytes(32).toString("base64");

console.log("\n=== Přidej tyto proměnné do .env.local nebo Railway Variables ===\n");
console.log(`ADMIN_USERNAME=${username}`);
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log(`SESSION_SECRET=${secret}`);
console.log("\n");

rl.close();
