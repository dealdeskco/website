import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
// Shares the landing page's primitives so the two cannot drift apart. This page carried its own
// card kit -- rounded plan cards, a "MOST POPULAR" ribbon, an inverted closing slab -- which
// read as a different site from the one it links out of. Pricing is a rate card now, which is
// also the shape the product's own documents take.
import styles from './index.module.css';

const APP = 'https://app.dealdesk.studio';
const SIGNUP = `${APP}/login?signup=1`;

// Mirrors plans.mjs in the application, which is the billing source of truth. If a price changes
// there it must change here -- they are two systems and nothing enforces agreement between them.
const PLANS = [
  {
    name: 'Pay per deal',
    blurb: 'No subscription. Start here and move up when the volume says so.',
    seats: '1 user',
    monthly: '$0',
    included: '—',
    perDeal: '$9',
  },
  {
    name: 'Pro',
    blurb: 'For a business sending a handful of proposals a week.',
    seats: 'Up to 5',
    monthly: '$49',
    included: '10 deals',
    perDeal: '$5',
  },
  {
    name: 'Team',
    blurb: 'For a crew where more than one person quotes work.',
    seats: 'Unlimited',
    monthly: '$149',
    included: '50 deals',
    perDeal: '$3',
  },
];

const INCLUDED = [
  {
    name: 'Unlimited drafting',
    desc: 'Draft, edit, regenerate and preview as often as you like. None of it is billable.',
    col: 'Every plan',
  },
  {
    name: 'Drafting from notes, transcripts or dictation',
    desc: 'Paste what you already have, or speak it. There is no template to pick first.',
    col: 'Every plan',
  },
  {
    name: 'Signing in person or by link',
    desc: 'Hand over your phone, or send a single-use link that expires in 72 hours.',
    col: 'Every plan',
  },
  {
    name: 'Sealed PDF with Certificate of Completion',
    desc: 'An audit trail, how the signer was identified, and a seal anyone can verify.',
    col: 'Every plan',
  },
  {
    name: 'Full company branding',
    desc: 'Your logo, colour, signatory and terms language, on the document and the email.',
    col: 'Pro and Team',
  },
  {
    name: 'Email from your own business identity',
    desc: 'The proposal arrives from you, not from us.',
    col: 'Pro and Team',
  },
  {
    name: 'Shared deal history',
    desc: 'Everyone who quotes work sees the same record of what was sent and agreed.',
    col: 'Team',
  },
  {
    name: 'DocuSign envelopes',
    desc: 'For a contested or high-value deal, send a full envelope instead. It is built in.',
    col: 'Team',
  },
];

const BILLING = [
  {
    name: 'Charged on send',
    desc: 'A deal counts when it goes out for signature, not when it is generated. Drafts, edits and regenerations are free.',
    col: 'On send',
  },
  {
    name: 'Allowance resets monthly',
    desc: 'Included deals reset at the start of each billing month. Sends beyond the allowance bill at your plan rate.',
    col: 'Monthly',
  },
  {
    name: 'Charged once per deal',
    desc: 'Usage is recorded against the deal itself, so resending or correcting one never bills you a second time.',
    col: 'Once',
  },
  {
    name: 'Cancel any time',
    desc: 'No contract and no cancellation fee. Your plan runs to the end of the month you have already paid for.',
    col: 'Any time',
  },
];

const FAQ = [
  {
    q: 'What counts as a sent deal?',
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
      <header className={`${styles.masthead} ${styles.mastShort}`}>
        <div className={styles.sheet}>
          <span className={styles.eyebrow}>Pricing</span>
          <h1 className={styles.title}>Pay when deals go out.</h1>
          <div className={styles.rule} />
          <p className={styles.lede}>
            Drafting is free and stays free. You are charged once a proposal actually leaves for
            signature, and never for building, editing or previewing one.
          </p>
          <div className={styles.actions}>
            <Link className={styles.go} to={SIGNUP}>Start free</Link>
            <Link className={styles.alt} to="/how-it-works">See how it works</Link>
          </div>
        </div>
      </header>

      {/* A rate card: figures tabular and right-aligned, ruled under the last row. */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Plans</h2>
            <p className={styles.note}>
              No contract and no setup fee. Switch in either direction at any time.
            </p>
          </div>
          <table className={styles.priceTable}>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Users</th>
                <th>Monthly</th>
                <th>Included</th>
                <th>Then each</th>
              </tr>
            </thead>
            <tbody>
              {PLANS.map((p) => (
                <tr key={p.name}>
                  <td className={styles.planCell}>
                    {p.name}
                    <small>{p.blurb}</small>
                  </td>
                  <td className={styles.seats}>{p.seats}</td>
                  <td className={styles.figure}>{p.monthly}<span>/mo</span></td>
                  <td className={styles.seats}>{p.included}</td>
                  <td className={styles.figure}>{p.perDeal}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.terms} style={{marginTop: '1.1rem'}}>Prices in USD. Taxes may apply.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>What you get</h2>
            <p className={styles.note}>
              Everything that matters for getting a signature is on every plan.
            </p>
          </div>
          <div className={styles.items}>
            {INCLUDED.map((i) => (
              <div key={i.name} className={styles.item}>
                <div className={styles.itemName}>{i.name}</div>
                <div className={styles.itemDesc}>{i.desc}</div>
                <div className={styles.itemCol}>{i.col}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>How billing works</h2>
            <p className={styles.note}>
              Usage-based and predictable. You are never charged for work in progress.
            </p>
          </div>
          <div className={styles.items}>
            {BILLING.map((b) => (
              <div key={b.name} className={styles.item}>
                <div className={styles.itemName}>{b.name}</div>
                <div className={styles.itemDesc}>{b.desc}</div>
                <div className={styles.itemCol}>{b.col}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plain question-and-answer rows. An accordion hides the answers behind a click for no
          reason on a page whose whole job is to remove doubt before someone enters a card. */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Questions</h2>
            <p className={styles.note}>
              The ones worth answering before you put a card in, not after.
            </p>
          </div>
          <div className={styles.items}>
            {FAQ.map((f) => (
              <div key={f.q} className={styles.item}>
                <div className={styles.itemName}>{f.q}</div>
                <div className={styles.itemDesc}>{f.a}</div>
                <div className={styles.itemCol} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.close}>
        <div className={styles.sheet}>
          <h2 className={styles.closeH}>Quote the next job today.</h2>
          <p className={styles.closeP}>
            Drafting costs nothing, and there is no card to start.
          </p>
          <div className={styles.closeActions}>
            <Link className={styles.go} to={SIGNUP}>Start free</Link>
            <Link className={styles.alt} to="/contact">Talk to us</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
