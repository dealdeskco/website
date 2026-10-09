import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
// Shares the landing page's primitives so the two cannot drift apart. This page carried its own
// card kit -- rounded plan cards, a "MOST POPULAR" ribbon, an inverted closing slab -- which
// read as a different site from the one it links out of. Pricing is a rate card now, which is
// also the shape the product's own documents take.
import styles from './index.module.css';

const Tick = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M2.5 8.5l4 4 7-9" fill="none" stroke="currentColor" strokeWidth="2.4"
          strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const APP = 'https://app.dealdesk.studio';
const SIGNUP = `${APP}/login?signup=1`;

// Mirrors plans.mjs in the application, which is the billing source of truth. If a price changes
// there it must change here -- they are two systems and nothing enforces agreement between them.
const PLANS = [
  {
    name: translate({id: 'common.plan.payPerDeal', message: 'Pay per deal'}),
    price: '$0',
    cadence: translate({id: 'pricing.plan.perMonth', message: '/month'}),
    rate: translate({id: 'pricing.plan.payPerDeal.rate', message: '$9 per deal sent'}),
    blurb: translate({id: 'pricing.plan.payPerDeal.blurb', message: 'No subscription. You are charged when a proposal goes out for signature — drafts and regenerations are always free.'}),
    lead: null,
    features: [
      translate({id: 'pricing.plan.payPerDeal.feature.1', message: '1 user'}),
      translate({id: 'pricing.plan.payPerDeal.feature.2', message: 'Drafting from notes, transcripts or dictation'}),
      translate({id: 'pricing.plan.payPerDeal.feature.3', message: 'Branded PDF export'}),
      translate({id: 'pricing.plan.payPerDeal.feature.4', message: 'Signing in person on any device'}),
      translate({id: 'pricing.plan.payPerDeal.feature.5', message: 'Sealed PDF with Certificate of Completion'}),
    ],
    cta: translate({id: 'pricing.plan.payPerDeal.cta', message: 'Start free'}),
    pick: false,
  },
  {
    name: 'Pro',
    price: '$49',
    cadence: translate({id: 'pricing.plan.perMonth', message: '/month'}),
    rate: translate({id: 'pricing.plan.pro.rate', message: '10 deals included, then $5 each'}),
    blurb: translate({id: 'pricing.plan.pro.blurb', message: 'For a business sending proposals every week.'}),
    lead: translate({id: 'pricing.plan.pro.lead', message: 'Everything in Pay per deal, plus:'}),
    features: [
      translate({id: 'pricing.plan.pro.feature.1', message: 'Up to 5 users'}),
      translate({id: 'pricing.plan.pro.feature.2', message: 'Full company branding'}),
      translate({id: 'pricing.plan.pro.feature.3', message: 'Editable Terms & Assumptions'}),
      translate({id: 'pricing.plan.pro.feature.4', message: 'Remote signing links with one-time codes'}),
      translate({id: 'pricing.plan.pro.feature.5', message: 'Email from your own business identity'}),
    ],
    cta: translate({id: 'pricing.plan.pro.cta', message: 'Start Pro'}),
    pick: true,
  },
  {
    name: 'Team',
    price: '$149',
    cadence: translate({id: 'pricing.plan.perMonth', message: '/month'}),
    rate: translate({id: 'pricing.plan.team.rate', message: '50 deals included, then $3 each'}),
    blurb: translate({id: 'pricing.plan.team.blurb', message: 'For a crew where more than one person quotes work.'}),
    lead: translate({id: 'pricing.plan.team.lead', message: 'Everything in Pro, plus:'}),
    features: [
      translate({id: 'pricing.plan.team.feature.1', message: 'Unlimited users'}),
      translate({id: 'pricing.plan.team.feature.2', message: 'Shared deal history across the team'}),
      translate({id: 'pricing.plan.team.feature.3', message: 'DocuSign envelopes for contested deals'}),
      translate({id: 'pricing.plan.team.feature.4', message: 'Priority support'}),
    ],
    cta: translate({id: 'pricing.plan.team.cta', message: 'Start Team'}),
    pick: false,
  },
];

const BILLING = [
  {
    name: translate({id: 'pricing.billing.1.name', message: 'Charged on send'}),
    desc: translate({id: 'pricing.billing.1.desc', message: 'A deal counts when it goes out for signature, not when it is generated. Drafts, edits and regenerations are free.'}),
    col: translate({id: 'pricing.billing.1.col', message: 'On send'}),
  },
  {
    name: translate({id: 'pricing.billing.2.name', message: 'Allowance resets monthly'}),
    desc: translate({id: 'pricing.billing.2.desc', message: 'Included deals reset at the start of each billing month. Sends beyond the allowance bill at your plan rate.'}),
    col: translate({id: 'pricing.billing.2.col', message: 'Monthly'}),
  },
  {
    name: translate({id: 'pricing.billing.3.name', message: 'Charged once per deal'}),
    desc: translate({id: 'pricing.billing.3.desc', message: 'Usage is recorded against the deal itself, so resending or correcting one never bills you a second time.'}),
    col: translate({id: 'pricing.billing.3.col', message: 'Once'}),
  },
  {
    name: translate({id: 'pricing.billing.4.name', message: 'Cancel any time'}),
    desc: translate({id: 'pricing.billing.4.desc', message: 'No contract and no cancellation fee. Your plan runs to the end of the month you have already paid for.'}),
    col: translate({id: 'pricing.billing.4.col', message: 'Any time'}),
  },
];

const FAQ = [
  {
    q: translate({id: 'pricing.faq.1.q', message: 'What counts as a sent deal?'}),
    a: translate({id: 'pricing.faq.1.a', message: 'A deal counts once you send a proposal, order form or agreement out for signature — or mark it sent or signed. Drafting from notes, editing, regenerating and previewing the PDF never count. You can build a quote twenty times and pay nothing.'}),
  },
  {
    q: translate({id: 'pricing.faq.2.q', message: 'What happens if I go over my included deals?'}),
    a: translate({id: 'pricing.faq.2.a', message: 'Nothing stops working. Each extra deal that month is billed at your plan rate — $5 on Pro, $3 on Team — and appears on your next invoice.'}),
  },
  {
    q: translate({id: 'pricing.faq.3.q', message: 'Do I get charged twice if I resend the same deal?'}),
    a: translate({id: 'pricing.faq.3.a', message: 'No. Usage is recorded against the deal, not the action, so a given deal is charged at most once ever. Correcting a typo and resending costs nothing extra.'}),
  },
  {
    q: translate({id: 'pricing.faq.4.q', message: 'Can I switch plans later?'}),
    a: translate({id: 'pricing.faq.4.a', message: 'Yes, in either direction, and the change takes effect immediately. Start per-deal and move to Pro when the volume justifies it.'}),
  },
  {
    q: translate({id: 'pricing.faq.5.q', message: 'Is there a contract?'}),
    a: translate({id: 'pricing.faq.5.a', message: 'No contract, no setup fee, no minimum term. Cancel whenever you like and your plan stays active through the end of the billing month you have already paid for.'}),
  },
  {
    q: translate({id: 'pricing.faq.6.q', message: 'Do proposals carry my branding?'}),
    a: translate({id: 'pricing.faq.6.a', message: 'Yes. Your logo, your colour, your signatory and your terms language, on the document and on the email that delivers it. Your customer sees your business, not ours.'}),
  },
];

export default function Pricing(): React.ReactElement {
  return (
    <Layout
      title={translate({id: 'pricing.meta.title', message: 'Pricing'})}
      description={translate({
        id: 'pricing.meta.description',
        message:
          'Draft as much as you like. Pay only when a deal is sent — $9 per deal, or $49/month for 10 included.',
      })}>
      <header className={`${styles.masthead} ${styles.mastShort}`}>
        <div className={styles.sheet}>
          <span className={styles.eyebrow}><Translate id="pricing.eyebrow">Pricing</Translate></span>
          <h1 className={styles.title}><Translate id="pricing.title">Pay when deals go out.</Translate></h1>
          <div className={styles.rule} />
          <p className={styles.lede}>
            <Translate id="pricing.lede">
              Drafting is free and stays free. You are charged once a proposal actually leaves for
              signature, and never for building, editing or previewing one.
            </Translate>
          </p>
          <div className={styles.actions}>
            <Link className={styles.go} to={SIGNUP}><Translate id="common.cta.startFree">Start free</Translate></Link>
            <Link className={styles.alt} to="/how-it-works"><Translate id="common.cta.seeHowItWorks">See how it works</Translate></Link>
          </div>
        </div>
      </header>

      {/* A rate card: figures tabular and right-aligned, ruled under the last row. */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}><Translate id="pricing.plans.heading">Plans</Translate></h2>
            <p className={styles.note}>
              <Translate id="pricing.plans.note">
                No contract and no setup fee. Switch in either direction at any time.
              </Translate>
            </p>
          </div>
          <div className={styles.plans}>
            {PLANS.map((p) => (
              <div key={p.name} className={`${styles.plan} ${p.pick ? styles.planPick : ''}`}>
                {p.pick && <span className={styles.planBadge}><Translate id="pricing.plans.mostPopular">Most popular</Translate></span>}
                <h3 className={styles.planName}>{p.name}</h3>
                <div className={styles.planFig}><b>{p.price}</b><span>{p.cadence}</span></div>
                <div className={styles.planRate}>{p.rate}</div>
                <p className={styles.planBlurb}>{p.blurb}</p>
                <ul className={styles.planList}>
                  {p.lead && <li className={styles.planLead}>{p.lead}</li>}
                  {p.features.map((f) => (
                    <li key={f}><Tick />{f}</li>
                  ))}
                </ul>
                <Link className={`${p.pick ? styles.go : styles.alt} ${styles.planCta}`} to={SIGNUP}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className={styles.terms} style={{marginTop: '1.1rem'}}>
            <Translate id="pricing.plans.terms">Prices in USD. Taxes may apply.</Translate>
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}><Translate id="pricing.billing.heading">How billing works</Translate></h2>
            <p className={styles.note}>
              <Translate id="pricing.billing.note">
                Usage-based and predictable. You are never charged for work in progress.
              </Translate>
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
            <h2 className={styles.h2}><Translate id="pricing.faq.heading">Questions</Translate></h2>
            <p className={styles.note}>
              <Translate id="pricing.faq.note">
                The ones worth answering before you put a card in, not after.
              </Translate>
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
          <h2 className={styles.closeH}><Translate id="pricing.close.heading">Quote the next job today.</Translate></h2>
          <p className={styles.closeP}>
            <Translate id="pricing.close.note">
              Drafting costs nothing, and there is no card to start.
            </Translate>
          </p>
          <div className={styles.closeActions}>
            <Link className={styles.go} to={SIGNUP}><Translate id="common.cta.startFree">Start free</Translate></Link>
            <Link className={styles.alt} to="/contact"><Translate id="common.cta.talkToUs">Talk to us</Translate></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
