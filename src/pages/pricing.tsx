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
// Gated in the app: the company library and developer access (the API, MCP and CLI), from Starter
// up, and RFP responses, the RFP add-on. Everything in EVERY_PLAN is on every plan, Free included, so
// it is listed once rather than presented as something a higher tier buys.
const DEV = translate({id: 'pricing.plan.developer', message: 'Developer: API, MCP, CLI'});
const LIBRARY = translate({id: 'pricing.plan.library', message: 'Company library, with citations'});
// Connected drives, per provider. Microsoft (SharePoint and OneDrive) is live in the app; Google
// Drive waits on Google's app approval. Flip GOOGLE_DRIVE to 'available' when it is live.
const GOOGLE_DRIVE: 'soon' | 'available' = 'soon';
const DRIVES = GOOGLE_DRIVE === 'available'
  ? translate({id: 'pricing.plan.drives.all', message: 'SharePoint, OneDrive and Google Drive'})
  : translate({id: 'pricing.plan.drives.ms', message: 'SharePoint and OneDrive (Google Drive coming soon)'});
const SYNC = translate({id: 'pricing.plan.sync.soon', message: 'Automatic folder sync (coming soon)'});

const PLANS = [
  {
    name: translate({id: 'pricing.plan.free.name', message: 'Free'}),
    price: '$0',
    rate: translate({id: 'pricing.plan.free.rate', message: 'No card needed'}),
    blurb: translate({id: 'pricing.plan.free.blurb', message: 'For trying it out, or the quiet months of a seasonal business.'}),
    features: [
      translate({id: 'pricing.plan.users.one', message: '1 user'}),
      translate({id: 'pricing.plan.free.sends', message: '3 sent deals a month'}),
    ],
    cta: translate({id: 'common.cta.startFree', message: 'Start free'}),
    pick: false,
  },
  {
    name: 'Starter',
    price: '$9',
    rate: translate({id: 'pricing.plan.starter.rate', message: '50 sent deals/month included, then $0.50/deal'}),
    blurb: translate({id: 'pricing.plan.starter.blurb', message: 'For a small business sending quotes and contracts to its customers.'}),
    features: [
      translate({id: 'pricing.plan.users.one', message: '1 user'}),
      translate({id: 'pricing.plan.starter.sends', message: '50 sent deals a month'}),
      LIBRARY,
      DEV,
    ],
    cta: translate({id: 'pricing.plan.starter.cta', message: 'Start Starter'}),
    pick: true,
  },
  {
    name: 'Pro',
    price: '$19',
    rate: translate({id: 'pricing.plan.pro.rate', message: '200 sent deals/month included, then $0.25/deal'}),
    blurb: translate({id: 'pricing.plan.pro.blurb', message: 'For small teams sending proposals every week.'}),
    features: [
      translate({id: 'pricing.plan.users.five', message: 'Up to 5 users'}),
      translate({id: 'pricing.plan.pro.sends', message: '200 sent deals a month'}),
      LIBRARY,
      DEV,
      DRIVES,
    ],
    cta: translate({id: 'pricing.plan.pro.cta', message: 'Start Pro'}),
    pick: false,
  },
  {
    name: 'Team',
    price: '$49',
    rate: translate({id: 'pricing.plan.team.rate', message: '1,000 sent deals/month included, then $0.10/deal'}),
    blurb: translate({id: 'pricing.plan.team.blurb', message: 'For growing businesses that run on proposals.'}),
    features: [
      translate({id: 'pricing.plan.users.unlimited', message: 'Unlimited users'}),
      translate({id: 'pricing.plan.team.sends', message: '1,000 sent deals a month'}),
      LIBRARY,
      DEV,
      DRIVES,
      SYNC,
    ],
    cta: translate({id: 'pricing.plan.team.cta', message: 'Start Team'}),
    pick: false,
  },
];

const EVERY_PLAN = [
  translate({id: 'pricing.everyPlan.documents', message: 'Quotes, proposals and contracts'}),
  translate({id: 'pricing.everyPlan.ai', message: 'AI drafting from your notes'}),
  translate({id: 'pricing.everyPlan.sign', message: 'eSignature and PDF export'}),
  translate({id: 'pricing.everyPlan.branding', message: 'Your own branding and terms'}),
  translate({id: 'pricing.everyPlan.spanish', message: 'Documents in English or Spanish'}),
];

const BILLING = [
  {
    name: translate({id: 'pricing.billing.send.name', message: 'Counted on send'}),
    desc: translate({id: 'pricing.billing.send.desc', message: 'A deal counts when it goes out for signature, not when it is generated. Drafts, edits and regenerations are free.'}),
    col: translate({id: 'pricing.billing.send.col', message: 'On send'}),
  },
  {
    name: translate({id: 'pricing.billing.resets.name', message: 'Allowance resets monthly'}),
    desc: translate({id: 'pricing.billing.resets.desc', message: 'Included deals reset at the start of each billing month. On a paid plan, sends beyond the allowance bill at your plan rate; on Free, you choose a plan to keep sending.'}),
    col: translate({id: 'pricing.billing.resets.col', message: 'Monthly'}),
  },
  {
    name: translate({id: 'pricing.billing.once.name', message: 'Counted once per deal'}),
    desc: translate({id: 'pricing.billing.once.desc', message: 'Usage is recorded against the deal itself, so resending or correcting one never counts a second time.'}),
    col: translate({id: 'pricing.billing.once.col', message: 'Once'}),
  },
  {
    name: translate({id: 'pricing.billing.change.name', message: 'Change plans any time'}),
    desc: translate({id: 'pricing.billing.change.desc', message: 'Upgrades take effect immediately. Downgrades take effect at the end of the month you have already paid for.'}),
    col: translate({id: 'pricing.billing.change.col', message: 'Any time'}),
  },
  {
    name: translate({id: 'pricing.billing.cancel.name', message: 'Cancel any time'}),
    desc: translate({id: 'pricing.billing.cancel.desc', message: 'No contract and no cancellation fee. Your plan stays active to the end of the billing month you have already paid for, then your account is on Free.'}),
    col: translate({id: 'pricing.billing.cancel.col', message: 'Any time'}),
  },
];

const FAQ = [
  {
    q: translate({id: 'pricing.faq.counts.q', message: 'What counts as a sent deal?'}),
    a: translate({id: 'pricing.faq.counts.a', message: 'A deal counts once you send a proposal, order form or agreement out for signature — or mark it sent or signed. Drafting from notes, editing, regenerating and previewing the PDF never count. You can build a quote twenty times and it counts once.'}),
  },
  {
    q: translate({id: 'pricing.faq.over.q', message: 'What happens if I go over my included deals?'}),
    a: translate({id: 'pricing.faq.over.a', message: 'On a paid plan, nothing stops working: each additional sent deal is billed at your plan rate — $0.50 on Starter, $0.25 on Pro, $0.10 on Team — on your next invoice. On Free, you choose a plan to keep sending; drafting stays free.'}),
  },
  {
    q: translate({id: 'pricing.faq.twice.q', message: 'Do I get charged twice if I resend the same deal?'}),
    a: translate({id: 'pricing.faq.twice.a', message: 'No. Usage is recorded against the deal, not the action, so a given deal is counted at most once ever. Correcting a typo and resending costs nothing extra.'}),
  },
  {
    q: translate({id: 'pricing.faq.library.q', message: 'Which plans include the company library?'}),
    a: translate({id: 'pricing.faq.library.a', message: 'Every paid plan, from Starter: What we know, the facts you teach Deal Desk, and search with citations, in the app and from your AI agent. The RFP responder add-on adds RFP responses on top; it is not needed for the library.'}),
  },
  {
    q: translate({id: 'pricing.faq.drives.q', message: 'Does Deal Desk work with SharePoint or Google Drive?'}),
    a: translate({id: 'pricing.faq.drives.a', message: 'On Pro and Team. Add past proposals and RFPs straight from SharePoint, OneDrive or Google Drive, and every signed document is saved to the folder you choose, in a folder for each customer. Deal Desk only opens the files your team picks. Team will also keep a folder in sync, so the library updates itself when someone edits a file.'}),
  },
  {
    q: translate({id: 'pricing.faq.match.q', message: 'Which bids will bid matching find?'}),
    a: translate({id: 'pricing.faq.match.a', message: 'Bid matching is coming soon, as part of the RFP responder add-on. US federal notices come first, including contracts coming up for rebid, then state and local portals that publish their bids openly, then international tenders. You will also be able to forward the bid emails you already get from any portal, and Deal Desk will match those too.'}),
  },
  {
    q: translate({id: 'pricing.faq.switch.q', message: 'Can I switch plans later?'}),
    a: translate({id: 'pricing.faq.switch.a', message: 'Yes, in either direction. Upgrades take effect immediately, and the prorated difference for the rest of the month is charged then. Downgrades take effect at the end of the month you have already paid for.'}),
  },
  {
    q: translate({id: 'pricing.faq.contract.q', message: 'Is there a contract?'}),
    a: translate({id: 'pricing.faq.contract.a', message: 'No contract, no setup fee, no minimum term. Cancel whenever you like: your plan stays active through the end of the billing month you have already paid for, then your account is on Free.'}),
  },
  {
    q: translate({id: 'pricing.faq.branding.q', message: 'Do proposals carry my branding?'}),
    a: translate({id: 'pricing.faq.branding.a', message: 'Yes, on every plan, Free included. Your logo, your colour, your signatory and your terms language, on the document and on the email that delivers it. Your customer sees your business, not ours.'}),
  },
];

export default function Pricing(): React.ReactElement {
  return (
    <Layout
      title={translate({id: 'pricing.meta.title', message: 'Pricing'})}
      description={translate({
        id: 'pricing.meta.description',
        message:
          'Drafting is free and stays free. Send three deals a month at no cost. Need more? Plans start at $9.',
      })}>
      <header className={`${styles.masthead} ${styles.mastShort}`}>
        <div className={styles.sheet}>
          <span className={styles.eyebrow}><Translate id="pricing.eyebrow">Pricing</Translate></span>
          <h1 className={styles.title}><Translate id="pricing.title">Free to start.</Translate></h1>
          <div className={styles.rule} />
          <p className={styles.lede}>
            <Translate id="pricing.lede">
              Drafting is free and stays free. Send three deals a month at no cost. Need more? Plans
              start at $9.
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
                <div className={styles.planFig}>
                  <b>{p.price}</b>
                  <span><Translate id="pricing.plan.perMonth">/month</Translate></span>
                </div>
                <div className={styles.planRate}>{p.rate}</div>
                <p className={styles.planBlurb}>{p.blurb}</p>
                <ul className={styles.planList}>
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
            <Translate id="pricing.plans.terms">Prices in USD. Taxes may apply.</Translate>{' '}
            <Translate id="pricing.plans.enterprise">Need single sign-on, a security review or custom terms?</Translate>{' '}
            <Link to="/contact"><Translate id="pricing.plans.enterprise.link">Talk to us</Translate></Link>
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}><Translate id="pricing.everyPlan.heading">On every plan</Translate></h2>
            <p className={styles.note}>
              <Translate id="pricing.everyPlan.note">
                Plans differ in users, sent deals, the company library, developer access and
                connected drives. Everything else is on all of them, Free included.
              </Translate>
            </p>
          </div>
          <ul className={styles.planList}>
            {EVERY_PLAN.map((f) => (
              <li key={f}><Tick />{f}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Line items on the rate card rather than plan features buried in a list: they are what a
          paid plan buys besides more sends and users. */}
      <section className={styles.section} id="developer">
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}><Translate id="pricing.developer.heading">From Starter up</Translate></h2>
            <p className={styles.note}>
              <Translate id="pricing.developer.note">
                Every paid plan, in the app and from your AI agent.
              </Translate>
            </p>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.itemName}>{LIBRARY}</div>
              <div className={styles.itemDesc}>
                <Translate id="pricing.library.desc">
                  What we know: your past proposals, capability statements and the facts you teach
                  Deal Desk, searched with citations. Drafts in the app and from your agent are
                  written from it, so they carry your real facts instead of invented ones.
                </Translate>
              </div>
              <div className={styles.itemCol}>
                <Translate id="pricing.developer.col">Starter, Pro, Team</Translate>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemName}>{DEV}</div>
              <div className={styles.itemDesc}>
                <Translate id="pricing.developer.desc">
                  Connect your AI agent to Deal Desk with an API key: a remote MCP server, a REST
                  API and the dealdesk command line tool. Drafting through an agent is free; a
                  proposal it sends for signature counts as a sent deal, as in the app. From $9,
                  your agent drafts from your company’s real library, with citations; only the RFP
                  tools need the RFP responder add-on.
                </Translate>{' '}
                <Link to="/agents">
                  <Translate id="pricing.developer.link">How it works</Translate>
                </Link>{' '}
                <Link to="/docs/developers">
                  <Translate id="pricing.developer.docs">Developer docs</Translate>
                </Link>
              </div>
              <div className={styles.itemCol}>
                <Translate id="pricing.developer.col">Starter, Pro, Team</Translate>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="drives">
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}><Translate id="pricing.drives.heading">From Pro up</Translate></h2>
            <p className={styles.note}>
              <Translate id="pricing.drives.note">
                For teams whose documents already live in a shared drive.
              </Translate>
            </p>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.itemName}>{DRIVES}</div>
              <div className={styles.itemDesc}>
                <Translate id="pricing.drives.desc">
                  Add past proposals, capability statements and RFPs straight from SharePoint,
                  OneDrive or Google Drive. Every signed document is saved back to the folder you
                  choose, in a folder for each customer. Deal Desk only opens the files your team
                  picks.
                </Translate>
              </div>
              <div className={styles.itemCol}>
                <Translate id="pricing.drives.col">Pro, Team</Translate>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemName}>{SYNC}</div>
              <div className={styles.itemDesc}>
                <Translate id="pricing.sync.desc">
                  Point the company library at a folder and Deal Desk keeps up with it: new files are
                  added and edited ones re-read, without anyone picking them again.
                </Translate>
              </div>
              <div className={styles.itemCol}>
                <Translate id="pricing.sync.col">Team</Translate>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}><Translate id="pricing.addon.heading">Add-on</Translate></h2>
            <p className={styles.note}>
              <Translate id="pricing.addon.note">
                For businesses that answer requests for proposals. Available on any paid plan.
              </Translate>
            </p>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.itemName}>
                <Translate id="pricing.addon.name">RFP responder</Translate>
              </div>
              <div className={styles.itemDesc}>
                <Translate id="pricing.addon.desc">
                  Upload an RFP, an RFI or a customer's own form. Deal Desk breaks it into every
                  requirement, drafts answers from what your company already knows, and checks them
                  the way an evaluator would.
                </Translate>{' '}
                <Translate id="pricing.addon.usage">
                  5 documents a month included, then $10 each. Design partners have it included.
                </Translate>{' '}
                <Link to="/rfp">
                  <Translate id="pricing.addon.link">How it works</Translate>
                </Link>
              </div>
              <div className={styles.itemCol}>
                <Translate id="pricing.addon.price">+$49/month</Translate>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemName}>
                <Translate id="pricing.addon.match.name">Bid matching (coming soon)</Translate>
              </div>
              <div className={styles.itemDesc}>
                <Translate id="pricing.addon.match.desc">
                  Deal Desk watches new federal, state and local, and international bid notices, and
                  shows you the ones that fit the work your company has actually done, with the
                  reason. Get the best matches by email if you like, and start a response in one
                  click.
                </Translate>
              </div>
              <div className={styles.itemCol}>
                <Translate id="pricing.addon.match.col">Included in RFP responder</Translate>
              </div>
            </div>
          </div>
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
