# League of Ledgers

Next.js landing page for League of Ledgers, ready for Vercel deployment.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set `DATABASE_URL` to enable inquiry storage in Neon. In Vercel, the Neon integration provides `League_DATABASE_URL`; the inquiry route accepts that key as well as `DATABASE_URL`.

Inquiry email alerts use the Resend integration variables `Messaging_RESEND_API_KEY` and `Messaging_RESEND_EMAIL_DOMAIN`. Vercel already provides these values through the connected Resend integration. For local development, set them in `.env.local` to enable email alerts; `INQUIRY_NOTIFICATION_EMAIL` optionally overrides the default recipient, `marcus@leagueofledgers.com`. The sending domain must be verified in Resend.
