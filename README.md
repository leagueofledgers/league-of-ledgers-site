# League of Ledgers

Next.js landing page for League of Ledgers, ready for Vercel deployment.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and set `DATABASE_URL` to enable inquiry storage in Neon. In Vercel, the Neon integration provides `League_DATABASE_URL`; the inquiry route accepts that key as well as `DATABASE_URL`.
