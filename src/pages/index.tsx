import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

const APP = 'https://app.dealdesk.studio';
const SIGNUP = `${APP}/login?signup=1`;

/** The document mock in the hero. Deliberately hand-built rather than a screenshot: it stays
 *  sharp at any density, re-colours with the theme, and never goes stale when the app changes. */
function ProposalMock() {
  return (
    <div className={styles.mock} aria-hidden="true">
      <div className={styles.mockBar}>
        <span /><span /><span />
        <em>PROPOSAL · DD-2026-0042</em>
      </div>
      <div className={styles.mockBody}>
        <div className={styles.mockHead}>
          <div>
            <div className={styles.mockLogo} />
            <div className={styles.mockH1}>PROPOSAL</div>
          </div>
          <div className={styles.mockMeta}>
            <div><span>CUSTOMER</span><b>Harbor &amp; Vine</b></div>
            <div><span>DATE</span><b>Oct 7, 2026</b></div>
            <div><span>VALID UNTIL</span><b>Nov 6, 2026</b></div>
          </div>
        </div>
        <div className={styles.mockRule} />
        <div className={styles.mockSection}>COMMERCIAL TERMS</div>
        <table className={styles.mockTable}>
          <tbody>
            <tr><td>Design &amp; installation — Phase 1</td><td>$18,000</td></tr>
            <tr><td>Irrigation &amp; lighting</td><td>$6,400</td></tr>
            <tr className={styles.mockDisc}><td>First-year discount (10%)</td><td>−$2,440</td></tr>
            <tr className={styles.mockTotal}><td>Total</td><td>$21,960</td></tr>
          </tbody>
        </table>
        <div className={styles.mockSection}>ACCEPTANCE</div>
        <div className={styles.mockSign}>
          <div>
            <div className={styles.mockSigLine}>
              <svg viewBox="0 0 150 40" className={styles.mockInk}><path d="M4 30C14 10 22 34 32 18s16 16 26 2 18 14 28-2 16 10 26-4 18 6 26-6" /></svg>
            </div>
            <small>Maya Torres · Owner</small>
          </div>
          <div>
            <div className={styles.mockSigLine} />
            <small>Signature</small>
          </div>
        </div>
        <div className={styles.mockSealed}>
          <span className={styles.mockSealDot} />
          Sealed · verification id <code>8H0dmfuGIn1Q</code>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  {
    n: '01',
    t: 'Talk, paste, or dictate',
    d: 'Drop in call notes, a meeting transcript, or just describe the job out loud. No forms to fill in first — the messy version is the input.',
  },
  {
    n: '02',
    t: 'Get a priced draft',
    d: 'Scope, line items, discounts, terms and both signature blocks come back filled in and on your letterhead. Change anything you like.',
  },
  {
    n: '03',
    t: 'Get it signed',
    d: 'Hand them your phone and take a signature on the spot, or email a single-use signing link. You get a sealed PDF either way.',
  },
];

const FEATURES = [
  {
    t: 'Your brand, not ours',
    d: 'Your logo, your colour, your signatory, your terms language. The proposal looks like it came from your business, and so does the email that delivers it.',
  },
  {
    t: 'Sign in the room',
    d: 'Tap the signature line and the pad fills the screen, the way a card terminal does. Finger, stylus or mouse. The deal closes before you leave the driveway.',
  },
  {
    t: 'Or sign from anywhere',
    d: 'Send a single-use link that expires in 72 hours. Your customer signs on their own device, optionally behind a one-time code sent to their email.',
  },
  {
    t: 'Every signature is evidenced',
    d: 'A Certificate of Completion records who signed, when, from where, how they were identified, and even the stroke dynamics of the signature itself.',
  },
  {
    t: 'Tamper-evident by default',
    d: 'The finished PDF is sealed with an Ed25519 signature. Anyone can verify a copy is byte-for-byte the original — without taking our word for it.',
  },
  {
    t: 'Pay when you get paid',
    d: 'Drafting is free and unlimited. You are charged only when a deal is actually sent. No seat minimums, no annual contract, no setup call.',
  },
];

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Proposals that close themselves"
      description={siteConfig.tagline as string}>
      {/* ---------------- hero ---------------- */}
      <header className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Conversations in. Deals out.</span>
              <h1 className={styles.h1}>
                The proposal is written<br />
                <span className={styles.grad}>before you get back to the truck.</span>
              </h1>
              <p className={styles.lede}>
                Deal Desk turns a call, a transcript, or a few scribbled notes into a priced,
                branded proposal your customer can sign on the spot. Built for the people who
                actually quote the work — not for a sales ops department.
              </p>
              <div className={styles.ctaRow}>
                <Link className={styles.btnPrimary} to={SIGNUP}>Start free — no card</Link>
                <Link className={styles.btnGhost} to="/how-it-works">See how it works</Link>
              </div>
              <p className={styles.heroNote}>
                Free to draft, forever. You pay <b>$9</b> only when you send a deal.
              </p>
            </div>
            <div className={styles.heroArt}>
              <ProposalMock />
            </div>
          </div>
        </div>
      </header>

      {/* ---------------- the problem ---------------- */}
      <section className={styles.strip}>
        <div className={styles.container}>
          <div className={styles.stripGrid}>
            <div>
              <h2 className={styles.h2}>Quoting is where good weeks go to die.</h2>
              <p className={styles.body}>
                You had the conversation. You know the scope, the price, and roughly what they will
                push back on. Then the proposal sits in a half-finished document for four days
                while the customer cools off and calls someone else.
              </p>
              <p className={styles.body}>
                The bottleneck was never the deciding. It was the typing.
              </p>
            </div>
            <ul className={styles.painList}>
              <li><b>Three days</b> is the average gap between a site visit and a sent quote.</li>
              <li><b>Every re-type</b> is a chance to get a number wrong in a document that binds you.</li>
              <li><b>Momentum decays.</b> The proposal you send today beats the better one you send Friday.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- how it works ---------------- */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>How it works</span>
            <h2 className={styles.h2}>Three steps, one sitting.</h2>
          </div>
          <div className={styles.steps}>
            {STEPS.map((s) => (
              <div key={s.n} className={styles.step}>
                <span className={styles.stepN}>{s.n}</span>
                <h3 className={styles.h3}>{s.t}</h3>
                <p className={styles.bodySm}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- features ---------------- */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>What you get</span>
            <h2 className={styles.h2}>A real document, properly executed.</h2>
            <p className={styles.sectionSub}>
              Not a shared link that expires, and not a PDF with a typed name at the bottom.
            </p>
          </div>
          <div className={styles.cards}>
            {FEATURES.map((f) => (
              <div key={f.t} className={styles.card}>
                <h3 className={styles.h3}>{f.t}</h3>
                <p className={styles.bodySm}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- trust / seal ---------------- */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.splitGrid}>
            <div>
              <span className={styles.kicker}>Evidence, not vibes</span>
              <h2 className={styles.h2}>You can prove what was signed.</h2>
              <p className={styles.body}>
                Every sealed proposal carries a Certificate of Completion on its own page: who
                signed, when, from what address, how their identity was established, and the
                stroke dynamics of the signature. Then the whole file is signed with an Ed25519
                key.
              </p>
              <p className={styles.body}>
                Anyone holding a copy can check it against the published public key and confirm it
                is byte-for-byte the original. Change a single character and verification fails.
              </p>
              <p className={styles.bodySm}>
                We also tell you plainly what this is <em>not</em>: a signature witnessed on your
                own phone proves possession of your session, and the certificate says exactly
                that rather than dressing it up.
              </p>
            </div>
            <div className={styles.verifyCard}>
              <div className={styles.verifyHead}>Verify a document</div>
              <dl className={styles.verifyRows}>
                <dt>Document</dt><dd>DD-2026-0042</dd>
                <dt>Sealed</dt><dd>Oct 7, 2026</dd>
                <dt>Algorithm</dt><dd>ed25519</dd>
                <dt>SHA-256</dt><dd className={styles.hash}>8494c5e6…1f567c0c</dd>
              </dl>
              <div className={styles.verifyOk}>
                <span className={styles.tick}>✓</span> Match — byte-for-byte the sealed document.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- pricing teaser ---------------- */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>Pricing</span>
            <h2 className={styles.h2}>Free until it earns its keep.</h2>
            <p className={styles.sectionSub}>
              Draft as many proposals as you like. You are charged when a deal is <b>sent</b> —
              never when it is drafted, previewed or regenerated.
            </p>
          </div>
          <div className={styles.priceRow}>
            <div className={styles.priceCard}>
              <div className={styles.priceName}>Pay per deal</div>
              <div className={styles.priceBig}>$9<span>/ sent deal</span></div>
              <p className={styles.bodySm}>No monthly fee. One user. Start here.</p>
            </div>
            <div className={`${styles.priceCard} ${styles.priceFeatured}`}>
              <span className={styles.priceTag}>Most popular</span>
              <div className={styles.priceName}>Pro</div>
              <div className={styles.priceBig}>$49<span>/ month</span></div>
              <p className={styles.bodySm}>10 deals included, then $5 each. Up to 5 users.</p>
            </div>
            <div className={styles.priceCard}>
              <div className={styles.priceName}>Team</div>
              <div className={styles.priceBig}>$149<span>/ month</span></div>
              <p className={styles.bodySm}>50 deals included, then $3 each. Unlimited users.</p>
            </div>
          </div>
          <div className={styles.center}>
            <Link className={styles.btnGhost} to="/pricing">Full pricing &amp; what counts as a send →</Link>
          </div>
        </div>
      </section>

      {/* ---------------- final CTA ---------------- */}
      <section className={styles.finalCta}>
        <div className={styles.container}>
          <h2 className={styles.ctaH}>Send the next one the same day.</h2>
          <p className={styles.ctaP}>
            Set up your letterhead once. Every proposal after that is a conversation away.
          </p>
          <div className={styles.ctaRowCenter}>
            <Link className={styles.btnPrimaryLg} to={SIGNUP}>Start free</Link>
            <Link className={styles.btnOnDark} to="/contact">Talk to us</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
