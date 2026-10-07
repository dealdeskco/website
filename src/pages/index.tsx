import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const APP = 'https://app.dealdesk.studio';
const SIGNUP = `${APP}/login?signup=1`;

/** The only motion on the page: the signature draws itself once, when it is reached. */
function SignatureBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || signed) return;
    if (typeof IntersectionObserver === 'undefined') return setSigned(true);
    // A throttled or backgrounded tab can defer the observer indefinitely. If the block is already
    // on screen by geometry, sign it rather than leaving a blank line forever.
    const t = window.setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) setSigned(true);
    }, 1200);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSigned(true);
          io.disconnect();
        }
      },
      {threshold: 0.6},
    );
    io.observe(el);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [signed]);

  return (
    <div className={styles.signWell} ref={ref} data-signed={signed ? 'true' : 'false'}>
      <svg className={styles.signInk} viewBox="0 0 300 74" aria-hidden="true">
        <path d="M8 56c14-28 23-40 30-39s4 22-3 33c-6 10-13 7-11-6 3-20 21-39 34-39 10 0 10 10 4 20-5 9-14 14-18 10-5-5 3-14 14-18 18-6 30 2 38 2 6 0 10-3 14-9 3-5 8-5 9 2 1 8-3 16-8 20-4 4-8 2-7-4 2-9 13-19 26-19 11 0 15 7 21 7 5 0 9-3 13-8M196 46c18-6 39-10 58-9" />
      </svg>
      <div className={styles.signLine} />
      <div className={styles.signCap}>Authorised signature</div>
    </div>
  );
}

const ITEMS = [
  {
    name: 'Draft from a conversation',
    desc: 'Paste call notes, a transcript or an email thread. Or hold the microphone and describe the job out loud on the drive back. Scope, line items, discounts and terms come back filled in.',
    col: 'every plan',
  },
  {
    name: 'Your letterhead',
    desc: 'Your logo, your colour, your signatory, your terms language — on the document and on the email that delivers it. Your customer sees your business, not ours.',
    col: 'every plan',
  },
  {
    name: 'Signature in the room',
    desc: 'Tap the signature line and the pad fills the screen, the way a card terminal does. Finger, stylus or mouse.',
    col: 'every plan',
  },
  {
    name: 'Signature from anywhere',
    desc: 'A single-use link that expires in 72 hours. Your customer signs on their own device, optionally behind a one-time code sent to their email.',
    col: 'every plan',
  },
  {
    name: 'Certificate of Completion',
    desc: 'Who signed, when, from where, how they were identified, and the stroke dynamics of the signature — not just a picture of it. Printed on its own page.',
    col: 'every plan',
  },
  {
    name: 'Cryptographic seal',
    desc: 'The finished PDF is signed with an Ed25519 key. Anyone can check a copy is byte-for-byte the original against the published public key.',
    col: 'every plan',
  },
  {
    name: 'DocuSign envelopes',
    desc: 'For a high-value or likely-contested agreement, send a real envelope instead. The two interlock so a document cannot be executed twice.',
    col: 'Team',
  },
];

const STEPS = [
  {
    h: 'Talk, paste or dictate',
    p: 'No template to choose and no form to complete first. Half-sentences, crossed-out numbers and "roughly 18k for phase one" are exactly what it expects.',
  },
  {
    h: 'Read a real draft',
    p: 'Priced, on your letterhead, with both signature blocks in place. Everything is editable and nothing is locked. Required fields are checked before you can export.',
  },
  {
    h: 'Take the signature',
    p: 'In the room on your phone, or by a single-use link to theirs. Either way you get a sealed PDF with an audit record behind it.',
  },
];

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Quote the job before you leave it"
      description="Deal Desk turns a call, a transcript or a few notes into a priced, branded proposal your customer can sign on the spot.">
      {/* ---------------- masthead: the head of a proposal ---------------- */}
      <header className={styles.masthead}>
        <div className={styles.sheet}>
          <div className={styles.mastGrid}>
            <h1 className={styles.title}>Quote the job before you leave it.</h1>
            <dl className={styles.meta}>
              <div className={styles.metaRow}><dt>Prepared for</dt><dd><b>People who quote work</b></dd></div>
              <div className={styles.metaRow}><dt>Drafting</dt><dd><b>Free, unlimited</b></dd></div>
              <div className={styles.metaRow}><dt>Per deal sent</dt><dd><b>$9.00</b></dd></div>
              <div className={styles.metaRow}><dt>Card required</dt><dd><b>No</b></dd></div>
            </dl>
          </div>
          <div className={styles.rule} />
        </div>
      </header>

      <section className={styles.intro}>
        <div className={styles.sheet}>
          <div className={styles.introGrid}>
            <div>
              <p className={styles.lede}>
                You worked out the price standing in their garden. Then the proposal sat in a
                half-finished document for four days while the customer cooled off and rang
                somebody else. Deal Desk writes it from the conversation you already had, so the
                quote goes out the same day.
              </p>
              <div className={styles.actions}>
                <Link className={styles.go} to={SIGNUP}>Start free</Link>
                <Link className={styles.alt} to="/how-it-works">See how it works</Link>
              </div>
            </div>
            <p className={styles.terms}>
              Built for the person who does the work and quotes it — the landscaper, the trainer,
              the planner, the one-person consultancy. <b>Not</b> for a sales ops department.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- the sequence ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Three steps, one sitting</h2>
            <p className={styles.note}>
              Most of a quote is re-typing what you already decided. That part is the part that goes.
            </p>
          </div>
          <div className={styles.steps}>
            {STEPS.map((s) => (
              <div key={s.h} className={styles.step}>
                <div>
                  <h3 className={styles.stepH}>{s.h}</h3>
                  <p className={styles.stepP}>{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- what you get, as line items ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>What is included</h2>
            <p className={styles.note}>
              A real document, properly executed — not a shared link that expires, and not a PDF
              with a typed name at the bottom.
            </p>
          </div>
          <div className={styles.items}>
            {ITEMS.map((it) => (
              <div key={it.name} className={styles.item}>
                <div className={styles.itemName}>{it.name}</div>
                <div className={styles.itemDesc}>{it.desc}</div>
                <div className={styles.itemCol}>{it.col}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- evidence ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>You can prove what was signed</h2>
          </div>
          <div className={styles.evidence}>
            <div>
              <p className={styles.body}>
                Every sealed proposal carries a Certificate of Completion on its own page, and the
                file itself is signed with an Ed25519 key. Anyone holding a copy can check it
                against the published public key and confirm it is byte-for-byte the original.
                Change one character and verification fails.
              </p>
              <p className={styles.body}>
                We also say plainly what it is not. A signature witnessed on your own phone proves
                possession of your session, and the certificate records exactly that rather than
                implying something stronger. For an agreement likely to be contested, send a
                DocuSign envelope instead.
              </p>
            </div>
            <div className={styles.receipt}>
              <div className={styles.receiptHead}>dealdesk.studio/verify/8H0dmfuGIn1Q</div>
              <dl className={styles.receiptRows}>
                <div className={styles.receiptRow}><dt>Document</dt><dd>DD-2026-0042</dd></div>
                <div className={styles.receiptRow}><dt>Sealed</dt><dd>2026-10-07</dd></div>
                <div className={styles.receiptRow}><dt>Algorithm</dt><dd>ed25519</dd></div>
                <div className={styles.receiptRow}><dt>SHA-256</dt><dd>8494c5e6…1f567c0c</dd></div>
              </dl>
              <p className={styles.verdict}>
                <svg className={styles.tick} viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M2 8.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Byte-for-byte the sealed document
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- price, as a table ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>Draft free. Pay only when you send</h2>
            <p className={styles.note}>
              A deal costs money when it goes out for signature — never when it is drafted,
              previewed or redone. A given deal is charged once, however many times you correct it.
            </p>
          </div>
          <table className={styles.priceTable}>
            <thead>
              <tr>
                <th scope="col">Plan</th>
                <th scope="col">Monthly</th>
                <th scope="col">Per deal sent</th>
                <th scope="col">Users</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.planCell}>Pay per deal<small>No subscription. Start here.</small></td>
                <td className={styles.figure}>$0</td>
                <td className={styles.figure}>$9</td>
                <td>1</td>
              </tr>
              <tr>
                <td className={styles.planCell}>Pro<small>10 deals included each month</small></td>
                <td className={styles.figure}>$49</td>
                <td className={styles.figure}>$5<span>after 10</span></td>
                <td>5</td>
              </tr>
              <tr>
                <td className={styles.planCell}>Team<small>50 deals included each month</small></td>
                <td className={styles.figure}>$149</td>
                <td className={styles.figure}>$3<span>after 50</span></td>
                <td>Unlimited</td>
              </tr>
            </tbody>
          </table>
          <p className={styles.terms} style={{marginTop: '1rem'}}>
            Prices in USD, taxes may apply. <Link to="/pricing">Full pricing and what counts as a send</Link>
          </p>
        </div>
      </section>

      {/* ---------------- close: a signature block ---------------- */}
      <section className={styles.close}>
        <div className={styles.sheet}>
          <h2 className={styles.closeH}>Send the next one the same day.</h2>
          <p className={styles.closeP}>
            Set up your letterhead once. Every proposal after that is a conversation away.
          </p>
          <div className={styles.signRow}>
            <SignatureBlock />
            <div className={styles.closeActions}>
              <Link className={styles.go} to={SIGNUP}>Start free</Link>
              <Link className={styles.alt} to="/contact">Talk to us</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
