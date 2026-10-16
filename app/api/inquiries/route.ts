import { NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";

const databaseUrl = process.env.DATABASE_URL || process.env.League_DATABASE_URL;
const pool = new Pool({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });

export async function POST(request: Request) {
  if (!databaseUrl) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    await pool.query(`CREATE TABLE IF NOT EXISTS inquiries (id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW())`);
    await pool.query("INSERT INTO inquiries (name, email, message) VALUES ($1, $2, $3)", [name, email, message]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to save your inquiry right now." }, { status: 500 });
  }
}
