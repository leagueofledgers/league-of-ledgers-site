import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { sendInquiryToHubSpot } from "./hubspot";

export const runtime = "nodejs";

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
    console.error("Inquiry email notification was skipped because Resend is not configured.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
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
      console.error(`Resend rejected the inquiry email notification (HTTP ${response.status}).`);
      return false;
    }

    return true;
  } catch {
    console.error("Inquiry email notification request failed.");
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const inquiryId = randomUUID();
    const [notificationSent, hubspotSynced] = await Promise.all([
      sendInquiryNotification({ id: inquiryId, name, email, message }),
      sendInquiryToHubSpot({ name, email, message }),
    ]);

    if (!notificationSent && !hubspotSynced) {
      return NextResponse.json({ error: "Unable to send your inquiry right now. Please try again later." }, { status: 502 });
    }
    // Either successful destination retains the inquiry; do not prompt duplicate resubmissions.
    return NextResponse.json({ ok: true, notificationSent, hubspotSynced });
  } catch {
    return NextResponse.json({ error: "Unable to send your inquiry right now." }, { status: 500 });
  }
}
