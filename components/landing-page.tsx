"use client";

import { useEffect, useState } from "react";

const calendarUrl = "https://calendar.app.google/NKgF1z3srrzwcJ1NA";

const services = [
  ["01", "Monthly close", "P&L, balance sheet, and cash flow delivered within 5–7 business days."],
  ["02", "AP / AR command", "Keep bills, invoices, vendors, and aging visible from one clean system."],
  ["03", "Job costing", "See profitability by project, technician, and service line, not just total revenue."],
  ["04", "Balance sheet", "Track loans, vehicles, fixed assets, and depreciation with confidence."],
  ["05", "Field integrations", "Reconcile ServiceTitan, Housecall Pro, and operational data into QuickBooks."],
  ["06", "1099 + tax support", "Give your CPA audit-ready reports, TIN matching, and a reconciled general ledger."],
];

const pricingPlans = [
  { name: "Apprentice", price: "$600", description: "For owner-operators getting their books dialed in.", volume: "Typically 1–3 trucks under ~$750K revenue" },
  { name: "Journeyman", price: "$1,000", description: "For established shops running multiple crews who need business clarity.", volume: "Typically 4–6 trucks doing $750K–$2M revenue", popular: true },
  { name: "Master", price: "$1,650", description: "For operations that want full command of their numbers.", volume: "Typically 7+ trucks doing $2M+ revenue" },
];

const pricingFeatures = [
  ["Transaction Categorization", "Monthly", "Weekly", "Weekly"],
  ["Reconciliation", "Monthly", "Monthly", "Monthly"],
  ["Receipt / Doc Capture", "✓", "✓", "✓"],
  ["FSM Sync (ServiceTitan / Housecall Pro / Jobber)", "✓", "✓", "✓"],
  ["1099 Tracking", "✓", "✓", "✓"],
  ["Dedicated Bookkeeper", "✓", "✓", "✓"],
  ["Financial Statements", "Standard Financial Reports", "Custom Financial Reports + KPI and benchmarking", "Custom Financial Reports + KPI and benchmarking + Video Walkthrough"],
  ["Live Review Call", "Quarterly", "Quarterly", "Monthly"],
  ["Job Costing", "", "", "✓"],
];

const addOns = [
  ["Accounts Payable", "We manage vendor bills and payments so nothing slips."],
  ["Payroll Support", "Payroll setup and processing."],
  ["Cleanup / Catch-Up", "Behind or messy? We get you current and accurate."],
  ["New Integration Setup", "ServiceTitan, Housecall Pro, Jobber, or other FSMs synced to your books."],
];

const software = ["QuickBooks Online", "ServiceTitan", "Housecall Pro", "Gusto", "ADP Payroll", "Xero", "Slack", "Google Workspace"];

function Mark({ type }: { type: "spark" | "arrow" | "grid" | "check" }) {
  if (type === "arrow") return <span className="line-icon">↗</span>;
  if (type === "check") return <span className="line-icon">✓</span>;
  if (type === "grid") return <span className="line-icon grid-icon">▦</span>;
  return <span className="line-icon">✦</span>;
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [pulse, setPulse] = useState(20);

  useEffect(() => {
    const interval = window.setInterval(() => setPulse((current) => (current >= 78 ? 20 : current + 2)), 2200);
    return () => window.clearInterval(interval);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}>
          <img className="brand-logo" src="/league-of-ledgers-logo.svg" alt="" aria-hidden="true" />
          <span>League of <b>Ledgers</b></span>
        </a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#packages" onClick={closeMenu}>Packages</a>
          <a href="#proof" onClick={closeMenu}>Why us</a>
          <button className="button button-small button-gold" onClick={() => { closeMenu(); setModalOpen(true); }}>Start a conversation <Mark type="arrow" /></button>
        </nav>
      </header>

      <section className="hero section-pad" id="top">
        <div className="hero-copy reveal-up">
          <div className="eyebrow"><span className="live-dot" /> Bookkeeping for HVAC + MEP pros</div>
          <h1>Numbers that <em>move</em> your business forward.</h1>
          <p className="hero-lede">Clear books. Better decisions. More room to focus on the work that built your business.</p>
          <div className="hero-actions">
            <button className="button button-dark" onClick={() => setModalOpen(true)}>Book a free discovery call <Mark type="arrow" /></button>
            <a className="text-link" href="#services">See how we help <Mark type="arrow" /></a>
          </div>
          <div className="hero-metrics">
            <div><strong>100%</strong><span>Audit-ready ledgers</span></div>
            <div><strong>5–7</strong><span>Day month-end close</span></div>
            <div><strong>20+</strong><span>Trade clients served</span></div>
          </div>
        </div>
        <div className="hero-visual reveal-up delay-1" aria-label="Live bookkeeping operations dashboard preview">
          <div className="visual-topline"><span>LIVE OPERATIONS VIEW</span><span className="status"><i /> Synced just now</span></div>
          <div className="visual-heading"><div><span className="mini-label">MONTHLY CLOSE</span><strong>May 2026</strong></div><span className="trend">+18.4% <Mark type="arrow" /></span></div>
          <div className="chart-area">
            <div className="chart-grid"><i /><i /><i /><i /></div>
            <svg viewBox="0 0 520 190" role="img" aria-label="Upward financial performance chart" preserveAspectRatio="none">
              <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#ffcf45" stopOpacity=".34" /><stop offset="100%" stopColor="#ffcf45" stopOpacity="0" /></linearGradient></defs>
              <path d="M0 166 C30 154 42 160 68 143 S108 132 130 140 S172 116 192 121 S220 100 242 112 S283 81 305 95 S341 72 365 80 S405 54 424 62 S470 35 520 18 V190 H0Z" fill="url(#chartFill)" />
              <path d="M0 166 C30 154 42 160 68 143 S108 132 130 140 S172 116 192 121 S220 100 242 112 S283 81 305 95 S341 72 365 80 S405 54 424 62 S470 35 520 18" fill="none" stroke="#ffcf45" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <span className="chart-tooltip">$84,240 <small>net revenue</small></span>
          </div>
          <div className="visual-cards"><div><span>Cash position</span><strong>$126,840</strong><b className="positive">+12.8%</b></div><div><span>Open items</span><strong>08</strong><b className="neutral">On track</b></div></div>
          <div className="visual-footer"><span><Mark type="check" /> Bank reconciled</span><span><Mark type="check" /> Reports ready</span><span><Mark type="check" /> CPA friendly</span></div>
        </div>
      </section>

      <section className="signal-strip"><div><span className="signal-number">01</span><span><b>Built for the trades.</b><small>Seasonal swings, job costing, and field-service reality.</small></span></div><div><span className="signal-number">02</span><span><b>Human-led. Tech-enabled.</b><small>Your tools stay. Your books get smarter.</small></span></div><div><span className="signal-number">03</span><span><b>Decisions, not data dumps.</b><small>Reports that tell you what to do next.</small></span></div></section>

      <section className="intro section-pad" id="proof"><div className="section-kicker">01 / The difference</div><div className="intro-grid"><h2>Financial clarity should feel like a <em>competitive advantage.</em></h2><div><p>Most contractors do not need another spreadsheet. They need a calm, capable partner who understands how money moves through a service business.</p><p>We turn transactions into a clear operating picture, so you can price smarter, protect margin, and grow without guessing.</p><a className="text-link" href="#packages">Find your level of support <Mark type="arrow" /></a></div></div></section>

      <section className="services section-pad" id="services"><div className="section-heading"><div><div className="section-kicker">02 / What we do</div><h2>The back office, <em>handled.</em></h2></div><p>From daily transactions to year-end prep, your financial operations stay clear, current, and ready for the next decision.</p></div><div className="service-grid">{services.map(([number, title, text]) => <article className="service-item" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{text}</p><span className="service-arrow"><Mark type="arrow" /></span></article>)}</div></section>

      <section className="industries section-pad"><div className="section-heading"><div><div className="section-kicker">03 / Trade fluency</div><h2>We speak <em>your</em> language.</h2></div><p>Specialized books for the teams doing essential work in the real world.</p></div><div className="industry-grid"><article><span className="industry-icon">↯</span><h3>HVAC</h3><p>Seasonal revenue, equipment job costing, maintenance contracts, and ServiceTitan reconciliation.</p></article><article><span className="industry-icon">⌁</span><h3>Plumbing</h3><p>Materials versus labor, subcontractor management, and AP / AR that keeps projects flowing.</p></article><article><span className="industry-icon">＋</span><h3>Electrical</h3><p>Project costing, multi-crew payroll, permit tracking, and monthly reporting that holds up.</p></article></div></section>

      <section className="packages section-pad" id="packages">
        <div className="pricing-heading">
          <div className="section-kicker">04 / Monthly bookkeeping</div>
          <h2>Pricing</h2>
          <p>Flat monthly plans, built to grow with you.</p>
        </div>
        <div className="pricing-scroll">
          <table className="pricing-table">
            <thead>
              <tr>
                <th className="feature-heading" scope="col"><strong>Features</strong><span>Compare our plans</span></th>
                {pricingPlans.map((plan) => <th className={plan.popular ? "plan-heading popular-plan" : "plan-heading"} scope="col" key={plan.name}>
                  {plan.popular && <span className="plan-ribbon">Most popular</span>}
                  <strong>{plan.name}</strong>
                  <span className="plan-description">{plan.description}</span>
                  <em>{plan.volume}</em>
                </th>)}
              </tr>
            </thead>
            <tbody>
              {pricingFeatures.map(([feature, ...values]) => <tr key={feature}>
                <th scope="row">{feature}</th>
                {values.map((value, index) => <td key={`${feature}-${index}`} className={value === "✓" ? "included" : value ? "" : "not-included"}>{value || "—"}</td>)}
              </tr>)}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" />
                {pricingPlans.map((plan) => <td key={plan.name}>
                  <strong className="plan-price">From {plan.price}<small>/mo</small></strong>
                  <button className="button button-gold audit-button" onClick={() => setModalOpen(true)}>Book a Profit Lead Audit</button>
                </td>)}
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="pricing-guarantee"><Mark type="check" /> 90-day money-back guarantee on recurring services <span>·</span> No hourly billing</p>
        <div className="addons">
          <div className="addons-heading"><h3>Add-ons not every shop needs</h3><p>Priced separately based on volume and complexity. We’ll scope it during your diagnostic.</p></div>
          <div className="addons-grid">{addOns.map(([title, description]) => <article key={title}><h4>{title}</h4><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="proof section-pad"><div className="quote-mark">“</div><blockquote>League of Ledgers cleaned up two years of messy books in under three weeks. Our CPA was shocked at how clean the records were.</blockquote><div className="quote-byline"><span>JT</span><span>HVAC company owner, Texas</span></div><div className="proof-foot"><span className="section-kicker">05 / Trusted in the field</span><div className="proof-pulse"><i style={{ width: `${pulse}%` }} /><span>Operations pulse / {pulse}% clear</span></div></div></section>

      <section className="software section-pad"><div className="section-kicker">06 / Fits your stack</div><h2>Already fluent in <em>your tools.</em></h2><p>Keep the systems you rely on. We make the numbers inside them work harder.</p><div className="software-list">{software.map((item) => <span key={item}><Mark type="grid" /> {item}</span>)}</div></section>

      <section className="cta-section section-pad"><div className="cta-inner"><div className="section-kicker">07 / Your next clear move</div><h2>Ready to stop guessing?</h2><p>Bring us the messy books, the seasonal swings, and the big next step. We’ll bring clarity.</p><button className="button button-gold" onClick={() => setModalOpen(true)}>Book a free discovery call <Mark type="arrow" /></button></div></section>

      <footer><a className="brand" href="#top"><img className="brand-logo" src="/league-of-ledgers-logo.svg" alt="" aria-hidden="true" /><span>League of <b>Ledgers</b></span></a><span>© 2026 League of Ledgers</span><a href="mailto:hello@leagueofledgers.com">hello@leagueofledgers.com</a></footer>

      {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false); }}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" aria-label="Close booking form" onClick={() => setModalOpen(false)}>×</button>{submitted ? <div className="success-state"><span className="success-icon">✓</span><h2>Message received.</h2><p>We’ll be in touch shortly. You can also choose a time directly on our calendar.</p><a className="button button-dark" href={calendarUrl} target="_blank" rel="noreferrer">Open calendar <Mark type="arrow" /></a></div> : <><div className="section-kicker">Start here</div><h2 id="modal-title">Tell us what you’re building.</h2><p>Share a few details and we’ll shape the right next conversation.</p><form onSubmit={async (event) => { event.preventDefault(); setFormError(""); const form = event.currentTarget; const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) }); if (response.ok) { setSubmitted(true); } else { const result = await response.json().catch(() => null); setFormError(result?.error ?? "Something went wrong. Please try again."); } }}><label>Name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label><label>What do you need help with?<textarea required name="message" placeholder="A quick note about your books or next step" rows={3} /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button button-gold full-width" type="submit">Send inquiry <Mark type="arrow" /></button></form></>}</div></div>}
    </main>
  );
}
