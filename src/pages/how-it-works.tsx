import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
// Reuses the landing page's primitives on purpose: one set of section, card and button styles
// means the two pages cannot drift apart visually.
import styles from './index.module.css';

const APP = 'https://app.dealdesk.studio';
const SIGNUP = `${APP}/login?signup=1`;

const STAGES = [
  {
    n: '01',
    t: 'Start from the conversation',
    d: 'Paste call notes, a meeting transcript, or an email thread. Or press the microphone and describe the job out loud while it is still fresh — on the drive back, if you like.',
    detail: [
      'No template to pick and no form to complete first',
      'Dictation works on a phone, in the browser, with no app to install',
      'Messy input is the point — half-sentences and crossed-out numbers are fine',
    ],
  },
  {
    n: '02',
    t: 'Read a real draft, not a blank page',
    d: 'Scope, line items, quantities, discounts, payment terms, both signature blocks — filled in and sitting on your letterhead. Everything is editable; nothing is locked.',
    detail: [
      'Multi-year pricing with per-year discounts',
      'Scope of work, assumptions and conditions in your own words',
      'Attach screenshots, site photos or mockups inline',
    ],
  },
  {
    n: '03',
    t: 'Get a signature while they are still interested',
    d: 'Hand over your phone and take the signature in the room, or email a single-use link so they can sign on their own device. Both produce the same sealed document.',
    detail: [
      'Full-screen signature pad — finger, stylus or mouse',
      'Single-use remote links that expire in 72 hours',
      'Optional one-time code to the signer’s own email',
    ],
  },
  {
    n: '04',
    t: 'Keep something you can rely on',
    d: 'The finished PDF carries a Certificate of Completion and a cryptographic seal, so months later you can still prove exactly what was agreed and by whom.',
    detail: [
      'Who signed, when, from where, and how they were identified',
      'Stroke dynamics of the signature, not just a bitmap',
      'Public verification — anyone can check a copy is unmodified',
    ],
  },
];

export default function HowItWorks(): React.ReactElement {
  return (
    <Layout
      title="How it works"
      description="From a conversation to a signed, sealed proposal in one sitting. Here is each step.">
      <header className={styles.hero} style={{paddingBottom: '2rem'}}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>How it works</span>
          <h1 className={styles.h1} style={{maxWidth: '18em'}}>
            From a conversation to a{' '}
            <span className={styles.grad}>signed document</span>, in one sitting.
          </h1>
          <p className={styles.lede}>
            Deal Desk does not try to replace your judgement about the price. It removes the ninety
            minutes of typing between deciding the price and the customer seeing it.
          </p>
        </div>
      </header>

      <section className={styles.section} style={{paddingTop: '1rem'}}>
        <div className={styles.container}>
          <div className={styles.stageList}>
            {STAGES.map((s) => (
              <div key={s.n} className={styles.stage}>
                <div className={styles.stageLeft}>
                  <span className={styles.stepN}>{s.n}</span>
                  <h2 className={styles.stageH}>{s.t}</h2>
                  <p className={styles.body}>{s.d}</p>
                </div>
                <ul className={styles.stageDetail}>
                  {s.detail.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Honest limits</span>
            <h2 className={styles.h2}>What this is not.</h2>
            <p className={styles.sectionSub}>
              Worth saying plainly, because the alternative is finding out at the wrong moment.
            </p>
          </div>
          <div className={styles.cards}>
            <div className={styles.card}>
              <h3 className={styles.h3}>Not a replacement for a lawyer</h3>
              <p className={styles.bodySm}>
                The terms language is yours to set, and the default wording is a starting point for a
                proposal — not a reviewed contract for a regulated or high-value engagement.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.h3}>An in-person signature is not an envelope</h3>
              <p className={styles.bodySm}>
                Signing on your device proves possession of your session, and the certificate says
                exactly that. For a contested or high-value deal, send a DocuSign envelope instead —
                it is built in.
              </p>
            </div>
            <div className={styles.card}>
              <h3 className={styles.h3}>The draft still needs you</h3>
              <p className={styles.bodySm}>
                It reads your notes well, but it does not know what you quoted the neighbour last
                month. Every number is editable, and required fields are checked before you can
                export.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2 className={styles.ctaH}>Try it on the last job you quoted.</h2>
          <p className={styles.ctaP}>
            Paste the notes you already have and see what comes back. Drafting is free.
          </p>
          <div className={styles.ctaRowCenter}>
            <Link className={styles.btnPrimaryLg} to={SIGNUP}>Start free</Link>
            <Link className={styles.btnOnDark} to="/pricing">See pricing</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
