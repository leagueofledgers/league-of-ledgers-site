import { NextResponse } from "next/server";
import { Pool } from "pg";

export const runtime = "nodejs";

const databaseUrl = process.env.DATABASE_URL || process.env.League_DATABASE_URL;
const pool = new Pool({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });
const resendApiKey = process.env.Messaging_RESEND_API_KEY;
const resendEmailDomain = process.env.Messaging_RESEND_EMAIL_DOMAIN?.trim().replace(/^@+/, "");
const notificationEmail = process.env.INQUIRY_NOTIFICATION_EMAIL?.trim() || "marcus@leagueofledgers.com";

async function sendInquiryNotification({
  id,
  name,
  email,
  message,
}: {
  id: string;
  name: string;
  email: string;
  message: string;
}) {
  if (!resendApiKey || !resendEmailDomain) {
    console.error("Inquiry was saved, but its email notification was skipped because Resend is not configured.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `inquiry-${id}`,
      },
      body: JSON.stringify({
        from: `League of Ledgers <inquiries@${resendEmailDomain}>`,
        to: [notificationEmail],
        subject: `New discovery call inquiry from ${name.replace(/[\r\n]+/g, " ").slice(0, 120)}`,
        text: [
          "A new inquiry was submitted on the League of Ledgers website.",
          "",
          `Name: ${name}`,
          `Work email: ${email}`,
          "",
          "What they need help with:",
          message,
          "",
          `Inquiry ID: ${id}`,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error(`Inquiry was saved, but Resend rejected its email notification (HTTP ${response.status}).`);
      return false;
    }

    return true;
  } catch {
    console.error("Inquiry was saved, but its Resend email notification request failed.");
    return false;
  }
}

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
    const result = await pool.query<{ id: string }>(
      "INSERT INTO inquiries (name, email, message) VALUES ($1, $2, $3) RETURNING id",
      [name, email, message],
    );
    const inquiryId = result.rows[0].id;
    const notificationSent = await sendInquiryNotification({ id: inquiryId, name, email, message });

    return NextResponse.json({ ok: true, notificationSent });
  } catch {
    return NextResponse.json({ error: "Unable to save your inquiry right now." }, { status: 500 });
  }
}
