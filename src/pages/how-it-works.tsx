import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
// Shares the landing page's primitives so the two cannot drift apart.
import styles from './index.module.css';

const SIGNUP = 'https://app.dealdesk.studio/login?signup=1';

const STAGES = [
  {
    h: 'Start from the conversation',
    p: 'Paste call notes, a meeting transcript or an email thread. Or press the microphone and describe the job out loud while it is still fresh — on the drive back, if you like. There is no template to pick and no form to complete first, and dictation works on a phone with nothing to install.',
    col: 'about a minute',
  },
  {
    h: 'Read a real draft, not a blank page',
    p: 'Scope, line items, quantities, discounts, payment terms and both signature blocks, filled in and sitting on your letterhead. Multi-year pricing with per-year discounts, your own assumptions and conditions, and site photos or mockups inline. Everything is editable and nothing is locked.',
    col: 'a few minutes',
  },
  {
    h: 'Get a signature while they are still interested',
    p: 'Hand over your phone and take the signature in the room, or email a single-use link so they can sign on their own device. Remote links expire in 72 hours and can sit behind a one-time code sent to the signer’s own email.',
    col: 'same visit',
  },
  {
    h: 'Keep something you can rely on',
    p: 'The finished PDF carries a Certificate of Completion and a cryptographic seal: who signed, when, from where, how they were identified, and the stroke dynamics of the signature. Anyone can verify a copy is unmodified without trusting us.',
    col: 'permanent',
  },
];

const LIMITS = [
  {
    name: 'Not a lawyer',
    desc: 'The terms language is yours to set, and the default wording is a starting point for a proposal — not reviewed contract language for a regulated or high-value engagement.',
  },
  {
    name: 'In person is not an envelope',
    desc: 'Signing on your device proves possession of your session, and the certificate says exactly that. For a contested or high-value deal, send a DocuSign envelope instead. It is built in.',
  },
  {
    name: 'The draft still needs you',
    desc: 'It reads your notes well, but it does not know what you quoted the neighbour last month. Every number is editable, and required fields are checked before you can export.',
  },
];

export default function HowItWorks(): React.ReactElement {
  return (
    <Layout
      title="How it works"
      description="From a conversation to a signed, sealed proposal in one sitting. Each step, and the honest limits.">
      <header className={styles.masthead}>
        <div className={styles.sheet}>
          <div className={styles.mastGrid}>
            <h1 className={styles.title}>From a conversation to a signed document.</h1>
            <dl className={styles.meta}>
              <div className={styles.metaRow}><dt>Stages</dt><dd><b>Four</b></dd></div>
              <div className={styles.metaRow}><dt>Typical time</dt><dd><b>One sitting</b></dd></div>
              <div className={styles.metaRow}><dt>Signatures</dt><dd><b>In person or remote</b></dd></div>
            </dl>
          </div>
          <div className={styles.rule} />
        </div>
      </header>

      <section className={styles.intro}>
        <div className={styles.sheet}>
          <p className={styles.lede}>
            Deal Desk does not try to replace your judgement about the price. It removes the ninety
            minutes of typing between deciding the price and the customer seeing it.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.steps}>
            {STAGES.map((s) => (
              <div key={s.h} className={styles.step}>
                <div>
                  <h2 className={styles.stepH}>{s.h}</h2>
                  <p className={styles.stepP}>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>What this is not</h2>
            <p className={styles.note}>
              Worth saying plainly, because the alternative is finding out at the wrong moment.
            </p>
          </div>
          <div className={styles.items}>
            {LIMITS.map((l) => (
              <div key={l.name} className={styles.item}>
                <div className={styles.itemName}>{l.name}</div>
                <div className={styles.itemDesc}>{l.desc}</div>
                <div className={styles.itemCol} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.close}>
        <div className={styles.sheet}>
          <h2 className={styles.closeH}>Try it on the last job you quoted.</h2>
          <p className={styles.closeP}>
            Paste the notes you already have and see what comes back. Drafting is free.
          </p>
          <div className={styles.closeActions}>
            <Link className={styles.go} to={SIGNUP}>Start free</Link>
            <Link className={styles.alt} to="/pricing">See pricing</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
