"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const calendarUrl = "https://calendar.app.google/NKgF1z3srrzwcJ1NA";
const careerFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdu7s-53cJIMluJk_icludzpZmeA4RiZ9L2vPlLDnu38_Z6ow/viewform?usp=publish-editor";

const services = [
  ["01", "Monthly Bookkeeping & Financial Close", "Keep your books accurate, reconciled, and up to date. Receive monthly Profit & Loss, Balance Sheet, and Cash Flow Statements typically within 5–7 business days after month-end, subject to timely receipt of complete records."],
  ["02", "Accounts Payable & Receivable", "Gain visibility into customer invoices, vendor bills, and aging balances. Standard bookkeeping includes AR/AP reconciliation; hands-on bill, invoice, scheduling, and collections support is separately scoped and remains subject to your approval."],
  ["03", "Job Costing & Profitability Analysis", "Organize labor, materials, subcontractor costs, and other direct job expenses so you can evaluate profitability by job, project, or service line. Advanced and technician-level reporting depends on reliable source data and agreed scope."],
  ["04", "Balance Sheet Reconciliation & Asset Tracking", "Maintain accurate records of loans, credit cards, fixed assets, and other balance sheet accounts. Track asset purchases and prepare depreciation schedules or adjusting entries based on approved accounting policies."],
  ["05", "Field-Service Software Reconciliation", "Keep QuickBooks aligned with existing ServiceTitan, Housecall Pro, or Jobber data. We review supported invoices, payments, deposits, and sync discrepancies; new setup, migration, mapping redesign, and major troubleshooting are separately scoped."],
  ["06", "1099 Compliance & CPA Support", "Stay prepared for year-end with organized vendor records, 1099 tracking, TIN collection and verification support, reconciled statements, and CPA-ready reports. Form preparation or filing coordination is available under an agreed scope."],
] as const;

const pricingPlans = [
  { name: "Apprentice", price: "$599", description: "For owner-operators getting their books dialed in.", volume: "Typically 1–3 trucks under ~$750K revenue" },
  { name: "Journeyman", price: "$999", description: "For established shops running multiple crews who need business clarity.", volume: "Typically 4–6 trucks doing $750K–$2M revenue", popular: true },
  { name: "Master", price: "$1,499", description: "For operations that want full command of their numbers.", volume: "Typically 7+ trucks doing $2M+ revenue" },
];

const pricingFeatures = [
  ["Transaction categorization", "Monthly", "Weekly", "Weekly"],
  ["Bank & credit card reconciliation", "Monthly", "Monthly", "Monthly"],
  ["Receipt / document organization", "Included", "Included", "Included"],
  ["Existing FSM reconciliation", "Included", "Included", "Included"],
  ["AR/AP balance reconciliation", "Included", "Included", "Included"],
  ["1099 tracking", "Included", "Included", "Included"],
  ["Dedicated bookkeeper", "Included", "Included", "Included"],
  ["Monthly financial statements", "Standard", "Enhanced", "Enhanced"],
  ["Month-end close", "Included", "Included", "Included"],
  ["Basic job-costing reporting", "Add-on", "Included*", "Included*"],
  ["Detailed job profitability", "Add-on", "Add-on", "Included*"],
  ["KPI reporting", "Basic", "Enhanced", "Advanced"],
  ["Financial review meeting", "Quarterly", "Quarterly", "Monthly"],
  ["Payroll processing support", "Add-on", "Add-on", "Add-on"],
  ["Hands-on AP/AR management", "Add-on", "Add-on", "Add-on"],
] as const;

const addOns = [
  ["Accounts Payable & Receivable Management", "Vendor bill and customer invoice entry, aging monitoring, payment scheduling support, and follow-up. Payment execution stays with the client."],
  ["Payroll Processing & Reconciliation", "Payroll preparation support, register review, journal entries, and reconciliation between the payroll platform, QuickBooks, and field-service data. Tax filings and remittances follow the provider or agreed scope."],
  ["Cleanup & Catch-Up Bookkeeping", "Correct historical transactions, reconcile outstanding accounts, and restore reliable financial records before ongoing monthly work begins."],
  ["FSM Integration Setup & Cleanup", "Configure supported connections, review account mappings, resolve sync discrepancies, and reconcile historical transactions for ServiceTitan, Housecall Pro, Jobber, or another supported platform."],
  ["Advanced Job Costing", "Analyze profitability by job, labor category, equipment, or service line using the operational and financial data available in the agreed systems."],
  ["1099 Preparation & Filing Support", "Review vendor records, validate available tax information, and prepare or coordinate required forms under a separately agreed scope."],
] as const;

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);
  const openModal = () => {
    setMenuOpen(false);
    setSubmitted(false);
    setFormError("");
    setIsSubmitting(false);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSubmitted(false);
    setFormError("");
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!modalOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [modalOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setFormError("");
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        setFormError(result?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError("We couldn’t send your inquiry. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}>
          <img className="brand-logo" src="/league-of-ledgers-logo.jpg" alt="" aria-hidden="true" />
          <span>League of <b>Ledgers</b></span>
        </a>
        <button type="button" className="menu-toggle" aria-controls="primary-navigation" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
        <nav id="primary-navigation" className={menuOpen ? "nav-links is-open" : "nav-links"}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#packages" onClick={closeMenu}>Packages</a>
          <a href="#proof" onClick={closeMenu}>Why us</a>
          <a href="#case-studies" onClick={closeMenu}>Case Study</a>
          <a href={careerFormUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Career</a>
          <button type="button" className="button button-small button-gold" onClick={openModal}>Book a Free Discovery Call <Mark type="arrow" /></button>
        </nav>
      </header>

      <section className="hero section-pad" id="top">
        <div className="hero-copy reveal-up">
          <div className="eyebrow"><span className="live-dot" /> Bookkeeping for HVAC, MEP &amp; Home-Service Contractors</div>
          <h1>Numbers that <em>move</em> your business forward.</h1>
          <p className="hero-lede">Clear books. Better decisions. More room to focus on the work that built your business.</p>
          <div className="hero-actions">
            <button type="button" className="button button-dark" onClick={openModal}>Book a Free Discovery Call <Mark type="arrow" /></button>
            <a className="text-link" href="#services">See how we help <Mark type="arrow" /></a>
          </div>
          <div className="hero-metrics">
            <div><strong>Monthly</strong><span>Books reconciled</span></div>
            <div><strong>5–7</strong><span>Business-day close*</span></div>
            <div><strong>Built for</strong><span>HVAC, plumbing &amp; electrical</span></div>
          </div>
          <p className="metric-note">* Typically after month-end records are complete.</p>
        </div>
        <div className="hero-visual reveal-up delay-1" aria-label="Example financial dashboard">
          <div className="visual-topline"><span>EXAMPLE FINANCIAL DASHBOARD</span><span className="status"><i /> Illustrative data — not a live client account</span></div>
          <div className="visual-heading"><div><span className="mini-label">ILLUSTRATIVE MONTHLY VIEW</span><strong>Example period</strong></div><span className="trend">Example trend <Mark type="arrow" /></span></div>
          <div className="chart-area">
            <div className="chart-grid"><i /><i /><i /><i /></div>
            <svg viewBox="0 0 520 190" role="img" aria-label="Upward financial performance chart" preserveAspectRatio="none">
              <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#ffcf45" stopOpacity=".34" /><stop offset="100%" stopColor="#ffcf45" stopOpacity="0" /></linearGradient></defs>
              <path d="M0 166 C30 154 42 160 68 143 S108 132 130 140 S172 116 192 121 S220 100 242 112 S283 81 305 95 S341 72 365 80 S405 54 424 62 S470 35 520 18 V190 H0Z" fill="url(#chartFill)" />
              <path d="M0 166 C30 154 42 160 68 143 S108 132 130 140 S172 116 192 121 S220 100 242 112 S283 81 305 95 S341 72 365 80 S405 54 424 62 S470 35 520 18" fill="none" stroke="#ffcf45" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <span className="chart-tooltip">$84,240 <small>illustrative net revenue</small></span>
          </div>
          <div className="visual-cards"><div><span>Illustrative cash position</span><strong>$126,840</strong><b className="positive">Example movement</b></div><div><span>Example open items</span><strong>08</strong><b className="neutral">Example status</b></div></div>
          <div className="visual-footer"><span><Mark type="check" /> Reconciled sample</span><span><Mark type="check" /> Reports preview</span><span><Mark type="check" /> CPA-friendly format</span></div>
        </div>
      </section>

      <section className="signal-strip"><div><span className="signal-number">01</span><span><b>Built for the trades.</b><small>Seasonal swings, job costing, and field-service reality.</small></span></div><div><span className="signal-number">02</span><span><b>Human-led. Tech-enabled.</b><small>Your tools stay. Your books get smarter.</small></span></div><div><span className="signal-number">03</span><span><b>Decisions, not data dumps.</b><small>Reports that tell you what to do next.</small></span></div></section>

      <section className="intro section-pad" id="proof"><div className="section-kicker">01 / The difference</div><div className="intro-grid"><h2>Financial clarity should feel like a <em>competitive advantage.</em></h2><div><p>Most contractors do not need another spreadsheet. They need a calm, capable partner who understands how money moves through a service business.</p><p>We turn transactions into a clear operating picture, so you can price smarter, protect margin, and grow without guessing.</p><a className="text-link" href="#packages">Find your level of support <Mark type="arrow" /></a></div></div></section>

      <section className="services section-pad" id="services"><div className="section-heading"><div><div className="section-kicker">02 / What we do</div><h2>The back office, <em>handled.</em></h2></div><p>From daily transactions to year-end prep, your financial operations stay clear, current, and ready for the next decision.</p></div><div className="service-grid">{services.map(([number, title, text]) => <article className="service-item" key={number}><span className="service-number">{number}</span><h3>{title}</h3><p>{text}</p><span className="service-arrow"><Mark type="arrow" /></span></article>)}</div></section>

      <section className="industries section-pad"><div className="section-heading"><div><div className="section-kicker">03 / Trade fluency</div><h2>We speak <em>your</em> language.</h2></div><p>Specialized books for the teams doing essential work in the real world.</p></div><div className="industry-grid"><article><span className="industry-icon">↯</span><h3>HVAC</h3><p>Specialized bookkeeping for HVAC contractors, including maintenance agreements, equipment and labor costs, ServiceTitan reconciliation, and seasonal cash-flow reporting.</p></article><article><span className="industry-icon">⌁</span><h3>Plumbing</h3><p>Organized bookkeeping for plumbing businesses, covering materials, subcontractors, project expenses, and accounts receivable management.</p></article><article><span className="industry-icon">＋</span><h3>Electrical</h3><p>Financial reporting for electrical contractors, including project costs, multi-crew labor expenses, materials, and operational profitability.</p></article></div></section>

      <section className="packages section-pad" id="packages">
        <div className="pricing-heading">
          <div className="section-kicker">04 / Monthly bookkeeping</div>
          <h2>Pricing</h2>
          <p>Starting monthly plans for contractors who want consistent books and clear next steps.</p>
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
                {values.map((value, index) => <td key={`${feature}-${index}`} className={value.startsWith("Included") ? "included" : value === "Add-on" ? "add-on" : value ? "" : "not-included"}>{value || "—"}</td>)}
              </tr>)}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row" />
                {pricingPlans.map((plan) => <td key={plan.name}>
                  <strong className="plan-price">From {plan.price}<small>/mo</small></strong>
                  <button type="button" className="button button-gold audit-button" onClick={openModal}>Book a Free Discovery Call <Mark type="arrow" /></button>
                </td>)}
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="pricing-footnote">* Job-costing coverage is subject to source-data quality, system capabilities, and agreed reporting scope.</p>
        <p className="pricing-note"><Mark type="check" /> Starting prices reflect transaction volume, account complexity, connected systems, reporting requirements, and the condition of your existing books. Final pricing is confirmed after an initial review. <span>·</span> No hourly billing.</p>
        <div className="addons">
          <div className="addons-heading"><h3>Optional services, scoped to your operation</h3><p>Not every shop needs these services every month. We’ll scope the right combination based on volume, systems, data quality, and the level of ownership you want to retain.</p></div>
          <div className="addons-grid">{addOns.map(([title, description]) => <article key={title}><h4>{title}</h4><p>{description}</p></article>)}</div>
        </div>
      </section>

      <section className="software section-pad"><div className="section-kicker">05 / Fits your stack</div><h2>Already fluent in <em>your tools.</em></h2><p>Keep the systems you rely on. We make the numbers inside them work harder. Active connections and export-based reconciliation depend on your current setup and agreed scope.</p><div className="software-list">{software.map((item) => <span key={item}><Mark type="grid" /> {item}</span>)}</div></section>

      <section className="case-studies section-pad" id="case-studies" aria-labelledby="case-studies-title">
        <div className="case-studies-content">
          <div className="section-kicker">06 / Client work</div>
          <h2 id="case-studies-title">Case Study</h2>
          <article className="case-study-card">
            <div className="case-study-meta"><span className="case-study-type">Bookkeeping cleanup</span><span>Tulsa, Oklahoma</span></div>
            <h3>Vendor-record cleanup for an HVAC contractor</h3>
            <p className="case-study-lede">League of Ledgers reviewed more than $140K in supplier activity in QuickBooks Online, addressing missing vendor bills, inconsistent coding, and stale open items for a residential and commercial HVAC contractor.</p>
            <div className="case-study-stats" aria-label="Case study highlights">
              <div><strong>$140K+</strong><span>supplier activity reviewed</span></div>
              <div><strong>229</strong><span>statement items reviewed</span></div>
              <div><strong>61</strong><span>missing invoices recorded</span></div>
            </div>
            <div className="case-study-details">
              <div><h4>The challenge</h4><p>Vendor bills, open payables, and bank activity did not consistently match supplier statements. Some invoices were missing, while older bills remained open after payment and coding varied between entries.</p></div>
              <div><h4>The approach</h4><p>League of Ledgers compared supplier statements with QuickBooks Online, documented the client’s chart of accounts, and set a consistent bill-entry format. Unclear charges and operational fixes were routed for client or office-admin follow-up.</p></div>
              <div><h4>The work completed</h4><p>Recorded 61 invoices missing from QuickBooks, standardized 19 backlog bills and two vendor credits, and separated 43 invoices from a merged PDF for entry. A financing overpayment was recorded to receivables rather than revenue.</p></div>
            </div>
            <p className="case-study-note">The contractor’s name is withheld. Vendor names and account-level details are omitted; figures summarize records provided for this engagement.</p>
          </article>
        </div>
      </section>

      <section className="cta-section section-pad"><div className="cta-inner"><div className="section-kicker">07 / Your next clear move</div><h2>Ready to stop guessing?</h2><p>Bring us the messy books, the seasonal swings, and the big next step. We’ll bring clarity.</p><button type="button" className="button button-gold" onClick={openModal}>Book a Free Discovery Call <Mark type="arrow" /></button></div></section>

      <footer><a className="brand" href="#top"><img className="brand-logo" src="/league-of-ledgers-logo.jpg" alt="" aria-hidden="true" /><span>League of <b>Ledgers</b></span></a><span>© 2026 League of Ledgers</span><a href="mailto:marcus@leagueofledgers.com">marcus@leagueofledgers.com</a></footer>

      {modalOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description"><button type="button" ref={closeButtonRef} className="modal-close" aria-label="Close booking form" onClick={closeModal}>×</button>{submitted ? <div className="success-state"><span className="success-icon">✓</span><h2 id="modal-title">Message received.</h2><p id="modal-description">We’ll be in touch shortly. You can also choose a time directly on our calendar.</p><a className="button button-dark" href={calendarUrl} target="_blank" rel="noreferrer">Open calendar <Mark type="arrow" /></a></div> : <><div className="section-kicker">Free discovery call</div><h2 id="modal-title">Book a Free Discovery Call.</h2><p id="modal-description">Share a few details and we’ll shape the right next conversation.</p><form onSubmit={handleSubmit}><label htmlFor="inquiry-name">Name<input id="inquiry-name" required autoComplete="name" name="name" placeholder="Your name" /></label><label htmlFor="inquiry-email">Work email<input id="inquiry-email" required autoComplete="email" type="email" name="email" placeholder="you@company.com" /></label><label htmlFor="inquiry-message">What do you need help with?<textarea id="inquiry-message" required name="message" placeholder="A quick note about your books or next step" rows={3} /></label>{formError && <p className="form-error" role="alert" aria-live="assertive">{formError}</p>}<button className="button button-gold full-width" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>{isSubmitting ? "Sending…" : <>Send inquiry <Mark type="arrow" /></>}</button></form></>}</div></div>}
    </main>
  );
}
