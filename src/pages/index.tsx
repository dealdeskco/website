import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import RfpMatrix from '@site/src/components/RfpMatrix';
import styles from './index.module.css';

const APP = 'https://app.dealdesk.studio';
const SIGNUP = `${APP}/login?signup=1`;

const Tick = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2.5 8.5l4 4 7-9" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** The INPUT, shown behind the output. The hero now reads left-to-right as the product's
 *  whole claim — a conversation becomes a signed document — rather than asking the visitor
 *  to infer the input from a finished PDF. Same job in both panels on purpose: the courtyard
 *  the customer describes here is the one priced and signed on the right. */
function CallTranscript() {
  return (
    <div className={styles.transcript} aria-hidden="true">
      <div className={styles.trTitle}><Translate id="home.transcript.title">Call transcript</Translate></div>
      <div className={styles.trTabs}>
        <span className={styles.trTabOn}><Translate id="home.transcript.tab.transcript">Transcript</Translate></span>
        <span><Translate id="home.transcript.tab.summary">Summary</Translate></span>
        <span><Translate id="home.transcript.tab.actions">Action items</Translate></span>
      </div>
      <div className={styles.trLines}>
        {[
          {t: '00:12', who: translate({id: 'home.transcript.customer', message: 'Customer'}), them: true,
           q: translate({id: 'home.transcript.line1', message: 'We\u2019re redoing the courtyard before the spring bookings. Can you take the planting and the lighting?'})},
          {t: '01:40', who: translate({id: 'home.transcript.you', message: 'You'}), them: false,
           q: translate({id: 'home.transcript.line2', message: 'Yes \u2014 phase one design and installation, plus irrigation and path lighting.'})},
          {t: '03:05', who: translate({id: 'home.transcript.customer', message: 'Customer'}), them: true,
           q: translate({id: 'home.transcript.line3', message: 'Looks good. Please send the proposal.'})},
        ].map((l) => (
          <div key={l.t} className={styles.trLine}>
            <span className={l.them ? styles.trDotThem : styles.trDotYou} />
            <div>
              <div className={styles.trWho}><b>{l.t}</b>{l.who}</div>
              <p>{l.q}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Hand-drawn rather than a glyph: a typeset arrow would sit on the baseline of nothing.
 *  Signature ink, because this IS the product's one action. */
function FlowArrow() {
  return (
    <svg className={styles.flowArrow} viewBox="0 0 120 54" aria-hidden="true">
      <path d="M4 6C10 34 34 48 92 44" fill="none" stroke="currentColor" strokeWidth="5"
            strokeLinecap="round" />
      <path d="M74 32l20 12-22 9" fill="none" stroke="currentColor" strokeWidth="5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The thing the product makes, shown rather than described — a visitor should see the output
 *  before reading about the input. Hand-built, not a screenshot: sharp at any density, follows
 *  the theme, and cannot go stale when the app changes.
 *  Its signature is ALREADY DRAWN. The one that animates is at the foot of the page, and two
 *  competing marks would spend that moment twice. */
function ProposalDoc() {
  return (
    <div className={styles.paperDoc} aria-hidden="true">
      <div className={styles.docTop}>
        <span>Harbor &amp; Vine Weddings</span>
        <span>DD-2026-0042</span>
      </div>
      <div className={styles.docBody}>
        <div className={styles.docHead}>
          <div>
            <div className={styles.docMark} />
            <div className={styles.docTitle}><Translate id="home.doc.title">PROPOSAL</Translate></div>
          </div>
          <div className={styles.docMeta}>
            <div><Translate id="home.doc.date">Date</Translate><b><Translate id="home.doc.dateValue">Oct 7, 2026</Translate></b></div>
            <div><Translate id="home.doc.validUntil">Valid until</Translate><b><Translate id="home.doc.validUntilValue">Nov 6, 2026</Translate></b></div>
            <div><Translate id="home.doc.preparedBy">Prepared by</Translate><b>M. Okafor</b></div>
          </div>
        </div>
        <div className={styles.docRule} />
        <div className={styles.docLabel}><Translate id="home.doc.commercialTerms">Commercial terms</Translate></div>
        <table className={styles.docTable}>
          <tbody>
            <tr><td><Translate id="home.doc.line1">{'Design & installation — Phase 1'}</Translate></td><td>$18,000</td></tr>
            <tr><td><Translate id="home.doc.line2">{'Irrigation & lighting'}</Translate></td><td>$6,400</td></tr>
            <tr className={styles.off}><td><Translate id="home.doc.discount">First-year discount (10%)</Translate></td><td>−$2,440</td></tr>
            <tr className={styles.sum}><td><Translate id="home.doc.total">Total</Translate></td><td>$21,960</td></tr>
          </tbody>
        </table>
        <div className={styles.docLabel} style={{marginTop: '14px'}}><Translate id="home.doc.acceptance">Acceptance</Translate></div>
        <div className={styles.docSign}>
          <div>
            <div className={styles.docSignLine}>
              <svg className={styles.docInk} viewBox="0 0 120 26">
                <path d="M4 21c4-12 8-18 11-17 3 1 2 11-1 15-3 4-6 3-5-2 2-11 11-18 18-17 5 1 5 6 1 10-4 4-8 5-10 3-2-2 3-6 9-7 13-3 22 5 33 3 8-1 13-5 17-10-5 8-11 13-20 14" />
              </svg>
            </div>
            <small>Maya Torres · <Translate id="home.doc.owner">Owner</Translate></small>
          </div>
          <div style={{alignSelf: 'end'}}>
            <span className={styles.docStamp}><Translate id="home.doc.signed">SIGNED</Translate></span>
            <small><Translate id="home.doc.dateValue">Oct 7, 2026</Translate></small>
          </div>
        </div>
        <div className={styles.docSealed}>
          <span className={styles.docSealDot} />
          <Translate id="home.doc.sealed">Sealed · verify</Translate> 8H0dmfuGIn1Q
        </div>
      </div>
    </div>
  );
}

/** The only motion on the page: the signature draws itself once, when it is reached. */
function SignatureBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const [signed, setSigned] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || signed) return;
    if (typeof IntersectionObserver === 'undefined') return setSigned(true);
    // A throttled or backgrounded tab can defer the observer indefinitely, leaving a blank line
    // where the signature should be. A scroll listener is the belt to the observer's braces --
    // the same pairing the app needed after rAF alone dropped the first canvas stroke.
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) setSigned(true);
    };
    const t = window.setTimeout(check, 1200);
    window.addEventListener('scroll', check, {passive: true});
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
      window.removeEventListener('scroll', check);
      io.disconnect();
    };
  }, [signed]);

  return (
    <div className={styles.signWell} ref={ref} data-signed={signed ? 'true' : 'false'}>
      <svg className={styles.signInk} viewBox="0 0 300 74" aria-hidden="true">
        <path d="M8 56c14-28 23-40 30-39s4 22-3 33c-6 10-13 7-11-6 3-20 21-39 34-39 10 0 10 10 4 20-5 9-14 14-18 10-5-5 3-14 14-18 18-6 30 2 38 2 6 0 10-3 14-9 3-5 8-5 9 2 1 8-3 16-8 20-4 4-8 2-7-4 2-9 13-19 26-19 11 0 15 7 21 7 5 0 9-3 13-8M196 46c18-6 39-10 58-9" />
      </svg>
      <div className={styles.signLine} />
      <div className={styles.signCap}><Translate id="home.close.signatureCaption">Authorised signature</Translate></div>
    </div>
  );
}

const CAPS = [
  {
    t: translate({id: 'home.caps.1.t', message: 'Professional proposals'}),
    d: translate({id: 'home.caps.1.d', message: 'Branded, accurate, ready to send.'}),
    icon: 'M4 2h9l5 5v13a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1zm9 1.5V7h3.5M6.5 11h9M6.5 14h9M6.5 17h5',
  },
  {
    t: translate({id: 'home.caps.2.t', message: 'Built-in pricing'}),
    d: translate({id: 'home.caps.2.d', message: 'Turn scope into line items in seconds.'}),
    icon: 'M11 1v20M15.5 5.5H8.75a3.25 3.25 0 000 6.5h4.5a3.25 3.25 0 010 6.5H6',
  },
  {
    t: translate({id: 'home.caps.3.t', message: 'Customer signature'}),
    d: translate({id: 'home.caps.3.d', message: 'Sign on the spot from any device.'}),
    icon: 'M2 17c4-10 6-13 8-12s1 8-1 11c-2 3-4 2-3-2 2-7 7-12 11-12 3 0 3 4 1 7M14 19h7',
  },
  {
    t: translate({id: 'home.caps.4.t', message: 'Sealed PDF'}),
    d: translate({id: 'home.caps.4.d', message: 'Tamper-evident, with an audit trail.'}),
    icon: 'M11 1l8 3v7c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V4l8-3zM7.5 11l2.5 2.5L15 8.5',
  },
];

const FLOW = [
  {t: translate({id: 'home.flow.1.t', message: 'Capture'}), d: translate({id: 'home.flow.1.d', message: 'Call, transcript or notes.'})},
  {t: translate({id: 'home.flow.2.t', message: 'Generate'}), d: translate({id: 'home.flow.2.d', message: 'Scope, pricing and proposal.'})},
  {t: translate({id: 'home.flow.3.t', message: 'Send & sign'}), d: translate({id: 'home.flow.3.d', message: 'Customer signs in minutes.'})},
  {t: translate({id: 'home.flow.4.t', message: 'Seal'}), d: translate({id: 'home.flow.4.d', message: 'Receive a certified PDF.'})},
];

const ITEMS = [
  {
    name: translate({id: 'home.included.1.name', message: 'Draft from a conversation'}),
    desc: translate({id: 'home.included.1.desc', message: 'Paste call notes, a transcript or an email thread. Or hold the microphone and describe the job out loud on the drive back. Scope, line items, discounts and terms come back filled in.'}),
    col: translate({id: 'home.included.col.everyPlan', message: 'every plan'}),
  },
  {
    name: translate({id: 'home.included.2.name', message: 'Your letterhead'}),
    desc: translate({id: 'home.included.2.desc', message: 'Your logo, your colour, your signatory, your terms language — on the document and on the email that delivers it. Your customer sees your business, not ours.'}),
    col: translate({id: 'home.included.col.everyPlan', message: 'every plan'}),
  },
  {
    name: translate({id: 'home.included.3.name', message: 'Signature in the room'}),
    desc: translate({id: 'home.included.3.desc', message: 'Tap the signature line and the pad fills the screen, the way a card terminal does. Finger, stylus or mouse.'}),
    col: translate({id: 'home.included.col.everyPlan', message: 'every plan'}),
  },
  {
    name: translate({id: 'home.included.4.name', message: 'Signature from anywhere'}),
    desc: translate({id: 'home.included.4.desc', message: 'A single-use link that expires in 72 hours. Your customer signs on their own device, optionally behind a one-time code sent to their email.'}),
    col: translate({id: 'home.included.col.everyPlan', message: 'every plan'}),
  },
  {
    name: translate({id: 'home.included.5.name', message: 'Certificate of Completion'}),
    desc: translate({id: 'home.included.5.desc', message: 'Who signed, when, from where, how they were identified, and the stroke dynamics of the signature — not just a picture of it. Printed on its own page.'}),
    col: translate({id: 'home.included.col.everyPlan', message: 'every plan'}),
  },
  {
    name: translate({id: 'home.included.6.name', message: 'Cryptographic seal'}),
    desc: translate({id: 'home.included.6.desc', message: 'The finished PDF is signed with an Ed25519 key. Anyone can check a copy is byte-for-byte the original against the published public key.'}),
    col: translate({id: 'home.included.col.everyPlan', message: 'every plan'}),
  },
];

const STEPS = [
  {
    h: translate({id: 'home.steps.1.h', message: 'Talk, paste or dictate'}),
    p: translate({id: 'home.steps.1.p', message: 'No template to choose and no form to complete first. Half-sentences, crossed-out numbers and "roughly 18k for phase one" are exactly what it expects.'}),
  },
  {
    h: translate({id: 'home.steps.2.h', message: 'Read a real draft'}),
    p: translate({id: 'home.steps.2.p', message: 'Priced, on your letterhead, with both signature blocks in place. Everything is editable and nothing is locked. Required fields are checked before you can export.'}),
  },
  {
    h: translate({id: 'home.steps.3.h', message: 'Take the signature'}),
    p: translate({id: 'home.steps.3.p', message: 'In the room on your phone, or by a single-use link to theirs. Either way you get a sealed PDF with an audit record behind it.'}),
  },
];

export default function Home(): React.ReactElement {
  return (
    <Layout
      title={translate({id: 'home.meta.title', message: 'From conversation to signed document'})}
      description={translate({
        id: 'home.meta.description',
        message:
          'Deal Desk turns a call, a transcript or a few notes into a priced, branded proposal your customer can sign on the spot.',
      })}>
      {/* ---------------- masthead: the head of a proposal ---------------- */}
      <header className={styles.masthead}>
        <div className={styles.sheet}>
          <div className={styles.coverGrid}>
            <div>
              <span className={styles.eyebrow}><Translate id="home.hero.eyebrow">Call. Scope. Price. Sign.</Translate></span>
              {/* Three lines at full size, which the longer phrasing could not manage beside two
                  panels of art. Dropping the articles also makes it read more like the product's
                  own vernacular: a job moving through stages, not a sentence about one. */}
              <h1 className={styles.title}>
                <Translate
                  id="home.hero.title"
                  values={{
                    signed: (
                      <span className={styles.sig}>
                        <Translate id="home.hero.title.signed">signed document</Translate>
                      </span>
                    ),
                  }}>
                  {'From conversation, to {signed}, in one sitting.'}
                </Translate>
              </h1>
              <div className={styles.rule} />
              <p className={styles.lede}>
                <Translate id="home.hero.lede">
                  Turn a call, a transcript or a few notes into a priced proposal your customer
                  can sign — and get back a sealed PDF with evidence of the agreement.
                </Translate>
              </p>
              <div className={styles.actions}>
                <Link className={styles.go} to={SIGNUP}><Translate id="common.cta.startFree">Start free</Translate></Link>
                <Link className={styles.alt} to="/how-it-works"><Translate id="common.cta.seeHowItWorks">See how it works</Translate></Link>
              </div>
              <ul className={styles.assurances}>
                {[
                  translate({id: 'home.hero.assurance.noCard', message: 'No credit card'}),
                  translate({id: 'home.hero.assurance.freeToDraft', message: 'Free to draft'}),
                  translate({id: 'home.hero.assurance.minutes', message: 'Ready in minutes'}),
                ].map((a) => (
                  <li key={a}><Tick />{a}</li>
                ))}
              </ul>
            </div>
            <div className={styles.coverArt}>
              <div className={styles.coverStage}>
                <CallTranscript />
                <FlowArrow />
                <div className={styles.coverDoc}>
                  <ProposalDoc />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.caps}>
            {CAPS.map((c) => (
              <div key={c.t} className={styles.cap}>
                <svg viewBox="0 0 22 22" aria-hidden="true">
                  <path d={c.icon} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h2 className={styles.capH}>{c.t}</h2>
                <p className={styles.capP}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ---------------- the sequence ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}><Translate id="home.flow.heading">A faster way to close</Translate></h2>
            <p className={styles.note}>
              <Translate id="home.flow.note">
                Everything between a call and a sealed PDF, without the busywork.
              </Translate>
            </p>
          </div>
          <div className={styles.flow}>
            {FLOW.map((f, i) => (
              <div key={f.t} className={styles.flowStep}>
                <span className={styles.flowN}>{i + 1}</span>
                <div>
                  <div className={styles.flowH}>{f.t}</div>
                  <p className={styles.flowP}>{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}><Translate id="home.steps.heading">Three steps, one sitting</Translate></h2>
            <p className={styles.note}>
              <Translate id="home.steps.note">
                The part that takes the time is re-typing what you already decided.
              </Translate>
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
            <h2 className={styles.h2}><Translate id="home.included.heading">What is included</Translate></h2>
            <p className={styles.note}>
              <Translate id="home.included.note">
                A real document, properly executed. Not a link that expires.
              </Translate>
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

      {/* ---------------- the RFP responder ----------------
          The add-on gets its own section rather than a line item: it is a different job (answering
          someone else's document, not writing your own) for a different buyer, and the demo shows
          that faster than a description can. */}
      <section className={styles.section} id="rfp">
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="home.rfp.heading">Answer the RFP from what you already know</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="home.rfp.note">
                For consulting firms, and anyone who answers RFPs, RFIs and customer forms.
              </Translate>
            </p>
          </div>
          <div className={styles.rfpGrid}>
            <div>
              <p className={styles.body}>
                <Translate id="home.rfp.p1">
                  Upload the document. Deal Desk breaks it into every requirement, keeps the
                  document’s own numbering, and finds how each one will be scored. The result is
                  the compliance matrix: every requirement in one list, with nothing left to find.
                </Translate>
              </p>
              <p className={styles.body}>
                <Translate id="home.rfp.p2">
                  Then it drafts every answer from your past proposals, capability statements and
                  résumés, and cites the passages it used. Where a draft is missing a fact, it says
                  so instead of making one up, and a few short questions fill the gaps. Your answers
                  are kept, so the next RFP already knows them.
                </Translate>
              </p>
              <p className={styles.body}>
                <Link to="/rfp">
                  <Translate id="home.rfp.link">How the RFP responder works</Translate>
                </Link>
              </p>
              <p className={styles.terms}>
                <Translate id="home.rfp.terms">An add-on to any paid plan: $49 a month.</Translate>
              </p>
            </div>
            <RfpMatrix />
          </div>
        </div>
      </section>

      {/* ---------------- evidence ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}><Translate id="home.evidence.heading">You can prove what was signed</Translate></h2>
          </div>
          <div className={styles.evidence}>
            <div>
              <p className={styles.body}>
                <Translate id="home.evidence.p1">
                  Every sealed proposal carries a Certificate of Completion and an Ed25519
                  signature. Anyone can check a copy against the published key. Change one
                  character and it fails.
                </Translate>
              </p>
              <p className={styles.body}>
                <Translate id="home.evidence.p2">
                  And we say what it is not: a signature taken on your own phone proves possession
                  of your session, and the certificate says so. For a deal likely to be contested,
                  consider a neutral third-party e-signature service.
                </Translate>
              </p>
            </div>
            <div className={styles.receipt}>
              <div className={styles.receiptHead}>dealdesk.studio/verify/8H0dmfuGIn1Q</div>
              <dl className={styles.receiptRows}>
                <div className={styles.receiptRow}><dt><Translate id="home.receipt.document">Document</Translate></dt><dd>DD-2026-0042</dd></div>
                <div className={styles.receiptRow}><dt><Translate id="home.receipt.sealed">Sealed</Translate></dt><dd>2026-10-07</dd></div>
                <div className={styles.receiptRow}><dt><Translate id="home.receipt.algorithm">Algorithm</Translate></dt><dd>ed25519</dd></div>
                <div className={styles.receiptRow}><dt>SHA-256</dt><dd>8494c5e6…1f567c0c</dd></div>
              </dl>
              <p className={styles.verdict}>
                <svg className={styles.tick} viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M2 8.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <Translate id="home.receipt.verdict">Byte-for-byte the sealed document</Translate>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- price, as a table ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}><Translate id="home.price.heading">Draft free. Pay only when you send</Translate></h2>
            <p className={styles.note}>
              <Translate id="home.price.note">
                Counted when a deal goes out, never when it is drafted. Once per deal, however
                many times you fix it. Free covers three a month.
              </Translate>
            </p>
          </div>
          <table className={styles.priceTable}>
            <thead>
              <tr>
                <th scope="col"><Translate id="home.price.col.plan">Plan</Translate></th>
                <th scope="col"><Translate id="home.price.col.monthly">Monthly</Translate></th>
                <th scope="col"><Translate id="home.price.col.extra">Each extra sent deal</Translate></th>
                <th scope="col"><Translate id="home.price.col.users">Users</Translate></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.planCell}>
                  <Translate id="home.price.free.name">Free</Translate>
                  <small><Translate id="home.price.free.sub">3 sent deals a month, no card</Translate></small>
                </td>
                <td className={styles.figure}>$0</td>
                <td className={styles.figure}>—</td>
                <td className={styles.seats}>1</td>
              </tr>
              <tr>
                <td className={styles.planCell}>Starter<small><Translate id="home.price.starter.sub">50 sent deals included each month</Translate></small></td>
                <td className={styles.figure}>$9</td>
                <td className={styles.figure}>$0.50<span><Translate id="home.price.after50">after 50</Translate></span></td>
                <td className={styles.seats}>1</td>
              </tr>
              <tr>
                <td className={styles.planCell}>Pro<small><Translate id="home.price.pro.sub">200 sent deals included each month</Translate></small></td>
                <td className={styles.figure}>$19</td>
                <td className={styles.figure}>$0.25<span><Translate id="home.price.after200">after 200</Translate></span></td>
                <td className={styles.seats}>5</td>
              </tr>
              <tr>
                <td className={styles.planCell}>Team<small><Translate id="home.price.team.sub">1,000 sent deals included each month</Translate></small></td>
                <td className={styles.figure}>$49</td>
                <td className={styles.figure}>$0.10<span><Translate id="home.price.after1000">after 1,000</Translate></span></td>
                <td className={styles.seats}><Translate id="home.price.unlimited">Unlimited</Translate></td>
              </tr>
            </tbody>
          </table>
          <p className={styles.terms} style={{marginTop: '1rem'}}>
            <Translate id="home.price.terms">Prices in USD, taxes may apply.</Translate>{' '}
            <Link to="/pricing">
              <Translate id="home.price.fullPricing">Full pricing and what counts as a send</Translate>
            </Link>
          </p>
        </div>
      </section>

      {/* ---------------- close: a signature block ---------------- */}
      <section className={styles.close}>
        <div className={styles.sheet}>
          <h2 className={styles.closeH}><Translate id="home.close.heading">Send the next one the same day.</Translate></h2>
          <p className={styles.closeP}>
            <Translate id="home.close.note">
              Set up your letterhead once. Every proposal after that is a conversation away.
            </Translate>
          </p>
          <div className={styles.signRow}>
            <SignatureBlock />
            <div className={styles.closeActions}>
              <Link className={styles.go} to={SIGNUP}><Translate id="common.cta.startFree">Start free</Translate></Link>
              <Link className={styles.alt} to="/contact"><Translate id="common.cta.talkToUs">Talk to us</Translate></Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
