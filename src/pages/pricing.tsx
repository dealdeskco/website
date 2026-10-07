import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './pricing.module.css';

const APP = 'https://app.dealdesk.studio';
const SIGNUP = `${APP}/login?signup=1`;

// Mirrors plans.mjs in the application, which is the billing source of truth. If a price changes
// there it must change here -- they are two systems and nothing enforces agreement between them.
const PLANS = [
  {
    id: 'payg',
    name: 'Pay per deal',
    price: '$0',
    cadence: 'per month',
    per: '$9 per sent deal',
    blurb: 'No subscription. Start here and move up when the volume says so.',
    seats: '1 user',
    features: [
      'Unlimited drafting, editing and regenerating',
      'AI drafting from notes, transcripts or dictation',
      'Branded PDF export',
      'Sign in person on any device',
      'Sealed PDF with Certificate of Completion',
    ],
    cta: 'Start free',
    featured: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$49',
    cadence: 'per month',
    per: '10 deals included, then $5 each',
    blurb: 'For a business sending a handful of proposals a week.',
    seats: 'Up to 5 users',
    features: [
      'Everything in Pay per deal',
      'Full company branding — logo, colour, signatory',
      'Editable Terms & Assumptions language',
      'Remote signing links with one-time codes',
      'Email delivery from your own business identity',
    ],
    cta: 'Start free',
    featured: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: '$149',
    cadence: 'per month',
    per: '50 deals included, then $3 each',
    blurb: 'For a crew where more than one person quotes work.',
    seats: 'Unlimited users',
    features: [
      'Everything in Pro',
      'Unlimited teammates',
      'Shared deal history across the team',
      'DocuSign envelopes for contested or high-value deals',
      'Priority support',
    ],
    cta: 'Start free',
    featured: false,
  },
];

const FAQ = [
  {
    q: 'What counts as a "sent deal"?',
    a: 'A deal counts once you send a proposal, order form or agreement out for signature — or mark it sent or signed. Drafting from notes, editing, regenerating and previewing the PDF never count. You can build a quote twenty times and pay nothing.',
  },
  {
    q: 'What happens if I go over my included deals?',
    a: 'Nothing stops working. Each extra deal that month is billed at your plan rate — $5 on Pro, $3 on Team — and appears on your next invoice.',
  },
  {
    q: 'Do I get charged twice if I resend the same deal?',
    a: 'No. Usage is recorded against the deal, not the action, so a given deal is charged at most once ever. Correcting a typo and resending costs nothing extra.',
  },
  {
    q: 'Can I switch plans later?',
    a: 'Yes, in either direction, and the change takes effect immediately. Start per-deal and move to Pro when the volume justifies it.',
  },
  {
    q: 'Is there a contract?',
    a: 'No contract, no setup fee, no minimum term. Cancel whenever you like and your plan stays active through the end of the billing month you have already paid for.',
  },
  {
    q: 'Do proposals carry my branding?',
    a: 'Yes. Your logo, your colour, your signatory and your terms language, on the document and on the email that delivers it. Your customer sees your business, not ours.',
  },
];

export default function Pricing(): React.ReactElement {
  return (
    <Layout
      title="Pricing"
      description="Draft as much as you like. Pay only when a deal is sent — $9 per deal, or $49/month for 10 included.">
      <header className={styles.head}>
        <div className={styles.container}>
          <span className={styles.kicker}>Pricing</span>
          <h1 className={styles.h1}>
            Pay when deals go out.<br />
            <span className={styles.grad}>Draft all you want.</span>
          </h1>
          <p className={styles.lede}>
            Start with no subscription and pay only for proposals you actually send for signature.
            Move onto a plan once your volume makes it worthwhile.
          </p>
        </div>
      </header>

      <section className={styles.plansSection}>
        <div className={styles.container}>
          <div className={styles.plans}>
            {PLANS.map((p) => (
              <div key={p.id} className={`${styles.plan} ${p.featured ? styles.featured : ''}`}>
                {p.featured && <span className={styles.tag}>Most popular</span>}
                <div className={styles.planName}>{p.name}</div>
                <div className={styles.planPrice}>
                  {p.price}<span>/{p.cadence.replace('per ', '')}</span>
                </div>
                <div className={styles.planPer}>{p.per}</div>
                <p className={styles.planBlurb}>{p.blurb}</p>
                <div className={styles.planSeats}>{p.seats}</div>
                <Link className={p.featured ? styles.btnPrimary : styles.btnGhost} to={SIGNUP}>
                  {p.cta}
                </Link>
                <ul className={styles.featureList}>
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={styles.fine}>Prices in USD. Taxes may apply.</p>
        </div>
      </section>

      <section className={styles.howSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>How billing works</h2>
            <p className={styles.sectionSub}>
              Usage-based and predictable. You are never charged for work in progress.
            </p>
          </div>
          <div className={styles.howGrid}>
            <div className={styles.how}>
              <h3>Charged on send</h3>
              <p>A deal counts when it goes out for signature — not when it is generated. Drafts, edits and regenerations are free.</p>
            </div>
            <div className={styles.how}>
              <h3>Allowance resets monthly</h3>
              <p>Included deals reset at the start of each billing month. Sends beyond the allowance bill at your plan rate.</p>
            </div>
            <div className={styles.how}>
              <h3>Charged once per deal</h3>
              <p>Usage is recorded against the deal itself, so resending or correcting one never bills you a second time.</p>
            </div>
            <div className={styles.how}>
              <h3>Cancel any time</h3>
              <p>No contracts, no cancellation fee. Your plan runs to the end of the month you have paid for.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Questions</h2>
          </div>
          <div className={styles.faq}>
            {FAQ.map((f) => (
              <details key={f.q} className={styles.faqItem}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaH}>Close more. Type less.</h2>
          <p className={styles.ctaP}>Your first proposal is a few minutes away.</p>
          <Link className={styles.btnOnDark} to={SIGNUP}>Create your free account</Link>
        </div>
      </section>
    </Layout>
  );
}
