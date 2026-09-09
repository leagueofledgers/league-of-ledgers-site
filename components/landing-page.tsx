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

const packages = [
  { name: "The Foundation", price: "$1,200", cadence: "15–20 hours / week", description: "A dependable monthly close for a business ready to get its numbers under control.", features: ["Bank and card categorization", "Income and COGS class tracking", "Monthly reconciliations", "Monthly accounting check-in"] },
  { name: "The Operational Engine", price: "$2,800", cadence: "About 30 hours / week", description: "The hands-on back office that keeps your operation moving and your decisions informed.", popular: true, features: ["Everything in Foundation", "Full AP and vendor reconciliation", "Full AR, invoicing, and aging", "Weekly card reconciliation"] },
  { name: "CFO-Ready Back Office", price: "$4,800", cadence: "40 hours / week", description: "A fully supported finance function for contractors ready to scale with clarity.", features: ["Everything in Operational Engine", "Loans, vehicles, and fixed assets", "Three-way PO matching", "Weekly controller review"] },
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
          <span className="brand-mark">L<span>O</span>L</span>
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

      <section className="packages section-pad" id="packages"><div className="section-heading"><div><div className="section-kicker">04 / Choose your support</div><h2>Scale with <em>intention.</em></h2></div><p>Flexible plans with senior oversight and a monthly check-in call built in.</p></div><div className="package-grid">{packages.map((item) => <article className={item.popular ? "package popular" : "package"} key={item.name}>{item.popular && <span className="popular-label">Most popular</span>}<span className="package-name">{item.name}</span><strong className="package-price">{item.price}<small>/mo</small></strong><span className="package-cadence">{item.cadence}</span><p>{item.description}</p><ul>{item.features.map((feature) => <li key={feature}><Mark type="check" /> {feature}</li>)}</ul><button className={item.popular ? "button button-dark full-width" : "button button-outline full-width"} onClick={() => setModalOpen(true)}>Explore this plan <Mark type="arrow" /></button></article>)}</div></section>

      <section className="proof section-pad"><div className="quote-mark">“</div><blockquote>League of Ledgers cleaned up two years of messy books in under three weeks. Our CPA was shocked at how clean the records were.</blockquote><div className="quote-byline"><span>JT</span><span>HVAC company owner, Texas</span></div><div className="proof-foot"><span className="section-kicker">05 / Trusted in the field</span><div className="proof-pulse"><i style={{ width: `${pulse}%` }} /><span>Operations pulse / {pulse}% clear</span></div></div></section>

      <section className="software section-pad"><div className="section-kicker">06 / Fits your stack</div><h2>Already fluent in <em>your tools.</em></h2><p>Keep the systems you rely on. We make the numbers inside them work harder.</p><div className="software-list">{software.map((item) => <span key={item}><Mark type="grid" /> {item}</span>)}</div></section>

      <section className="cta-section section-pad"><div className="cta-inner"><div className="section-kicker">07 / Your next clear move</div><h2>Ready to stop guessing?</h2><p>Bring us the messy books, the seasonal swings, and the big next step. We’ll bring clarity.</p><button className="button button-gold" onClick={() => setModalOpen(true)}>Book a free discovery call <Mark type="arrow" /></button></div></section>

      <footer><a className="brand" href="#top"><span className="brand-mark">L<span>O</span>L</span><span>League of <b>Ledgers</b></span></a><span>© 2026 League of Ledgers</span><a href="mailto:marco@leagueofledgers.com">marco@leagueofledgers.com</a></footer>

      {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalOpen(false); }}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" aria-label="Close booking form" onClick={() => setModalOpen(false)}>×</button>{submitted ? <div className="success-state"><span className="success-icon">✓</span><h2>Message received.</h2><p>We’ll be in touch shortly. You can also choose a time directly on our calendar.</p><a className="button button-dark" href={calendarUrl} target="_blank" rel="noreferrer">Open calendar <Mark type="arrow" /></a></div> : <><div className="section-kicker">Start here</div><h2 id="modal-title">Tell us what you’re building.</h2><p>Share a few details and we’ll shape the right next conversation.</p><form onSubmit={async (event) => { event.preventDefault(); setFormError(""); const form = event.currentTarget; const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) }); if (response.ok) { setSubmitted(true); } else { const result = await response.json().catch(() => null); setFormError(result?.error ?? "Something went wrong. Please try again."); } }}><label>Name<input required name="name" placeholder="Your name" /></label><label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label><label>What do you need help with?<textarea required name="message" placeholder="A quick note about your books or next step" rows={3} /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button button-gold full-width" type="submit">Send inquiry <Mark type="arrow" /></button></form></>}</div></div>}
    </main>
  );
}
