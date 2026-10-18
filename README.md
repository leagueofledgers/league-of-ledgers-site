# League of Ledgers

Next.js landing page for League of Ledgers, ready for Vercel deployment.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and configure the email and HubSpot destinations. The inquiry route no longer uses Neon or requires a database connection. Existing Neon records and the attached resource are retained.

Inquiry email alerts use the Resend integration variables `Messaging_RESEND_API_KEY` and `Messaging_RESEND_EMAIL_DOMAIN`. Vercel already provides these values through the connected Resend integration. For local development, set them in `.env.local` to enable email alerts; `INQUIRY_NOTIFICATION_EMAIL` optionally overrides the default recipient, `marcus@leagueofledgers.com`. The sending domain must be verified in Resend.

## HubSpot inquiry forwarding

On submission, the route attempts the email notification and HubSpot form submission independently. The default destination is the verified published form `3a13f728-8b6b-4561-b5ea-7807f8ea9c87` in portal `247697012`, mapping the complete name to `website_inquiry_name`, email to `email`, and inquiry text to `message`. The form has these three required fields and uses the Lead lifecycle stage. Optional overrides are `HUBSPOT_PORTAL_ID`, `HUBSPOT_INQUIRY_FORM_ID`, `HUBSPOT_INQUIRY_NAME_FIELD`, and `HUBSPOT_INQUIRY_MESSAGE_FIELD`. The form must accept those fields and `email`; confirm additional required fields and consent settings before enabling. This uses HubSpot's public Forms submission endpoint without an API key. No marketing subscription consent is asserted.

Each destination times out after eight seconds; a failure does not prevent the other attempt. If either succeeds, the visitor receives success to avoid duplicate submissions. If both fail, the route returns HTTP 502. The response includes `hubspotSynced`, and failures are logged without contact details. There is no automatic retry or historical backfill. Publication of the website code and controlled live delivery verification are required before claiming the full flow is verified.
