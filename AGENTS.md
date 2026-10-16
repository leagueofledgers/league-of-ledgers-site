<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Development history

## 2026-10-16 — Comprehensive website content and service-alignment revision

The published League of Ledgers site was audited against the intended U.S. bookkeeping positioning for HVAC, MEP, and home-service contractors. The earlier implementation had strong visual branding but mixed service names, package coverage, and add-on boundaries: job costing appeared broader than the tiers supported, existing field-service reconciliation was not clearly separated from new integration work, AP/AR and payroll language could imply more operational ownership than intended, and the page used a broad money-back guarantee, historical performance numbers, a client testimonial, and a dashboard presented as live without visible qualification.

This session preserved the existing layout, color system, logo, navigation, inquiry modal, calendar link, PostgreSQL inquiry route, package names, and base prices while replacing the content architecture. The six service cards now cover Monthly Bookkeeping & Financial Close; Accounts Payable & Receivable; Job Costing & Profitability Analysis; Balance Sheet Reconciliation & Asset Tracking; Field-Service Software Reconciliation; and 1099 Compliance & CPA Support. Each description now distinguishes standard bookkeeping from separately scoped transaction management, advanced reporting, setup, migration, filing, and approval responsibilities. The pricing comparison was expanded so the Apprentice ($600/month), Journeyman ($1,000/month), and Master ($1,650/month) tiers show consistent month-end close, statements, existing FSM reconciliation, AR/AP reconciliation, 1099 tracking, bookkeeper coverage, review cadence, and the different levels of job-costing and KPI reporting. Optional work now has six clearly scoped add-ons for AP/AR management, payroll reconciliation, cleanup, FSM setup/cleanup, advanced job costing, and 1099 preparation or filing support.

Unsupported or potentially misleading trust signals were revised rather than replaced with new unverified claims. The 90-day money-back guarantee, 100% audit-ready wording, and 20+ client statistic were removed. The hero now uses descriptive service language with a qualified 5–7 business-day close reference. The proof section is explicitly an illustrative League of Ledgers practice statement rather than a client testimonial, and the dashboard is labeled as illustrative data that is not a live client account. Primary calls to action are standardized to “Book a Free Discovery Call,” including the header, hero, plan actions, final CTA, and dialog heading. Typography overrides increase the readability of dense service, industry, pricing, add-on, dashboard, footer, and mobile copy while keeping the established visual hierarchy and responsive behavior.

The source was validated with `npm run build` on Next.js 16.3.4, including TypeScript checking, static page generation, and the dynamic inquiry route. The local page returned HTTP 200 and was visually reviewed at wide desktop (1440×900) and mobile (390×844) sizes. The pricing table remains horizontally scrollable on small screens so the tier comparison stays readable. Verified commit `2223a4f` was pushed to the linked repository, and the requested Vercel production URL now serves the revised copy; a cache-busting browser read confirmed the same content after the initial browser cache showed the prior version.
