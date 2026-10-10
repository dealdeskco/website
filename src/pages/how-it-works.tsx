import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
// Shares the landing page's primitives so the two cannot drift apart.
import styles from './index.module.css';

const SIGNUP = 'https://app.dealdesk.studio/login?signup=1';

const STAGES = [
  {
    h: translate({id: 'howItWorks.stage.1.h', message: 'Start from the conversation'}),
    p: translate({id: 'howItWorks.stage.1.p', message: 'Paste call notes, a meeting transcript or an email thread. Or press the microphone and describe the job out loud while it is still fresh — on the drive back, if you like. There is no template to pick and no form to complete first, and dictation works on a phone with nothing to install.'}),
    col: translate({id: 'howItWorks.stage.1.col', message: 'about a minute'}),
  },
  {
    h: translate({id: 'howItWorks.stage.2.h', message: 'Read a real draft, not a blank page'}),
    p: translate({id: 'howItWorks.stage.2.p', message: 'Scope, line items, quantities, discounts, payment terms and both signature blocks, filled in and sitting on your letterhead. Multi-year pricing with per-year discounts, your own assumptions and conditions, and site photos or mockups inline. Everything is editable and nothing is locked.'}),
    col: translate({id: 'howItWorks.stage.2.col', message: 'a few minutes'}),
  },
  {
    h: translate({id: 'howItWorks.stage.3.h', message: 'Get a signature while they are still interested'}),
    p: translate({id: 'howItWorks.stage.3.p', message: 'Hand over your phone and take the signature in the room, or email a single-use link so they can sign on their own device. Remote links expire in 72 hours and can sit behind a one-time code sent to the signer’s own email.'}),
    col: translate({id: 'howItWorks.stage.3.col', message: 'same visit'}),
  },
  {
    h: translate({id: 'howItWorks.stage.4.h', message: 'Keep something you can rely on'}),
    p: translate({id: 'howItWorks.stage.4.p', message: 'The finished PDF carries a Certificate of Completion and a cryptographic seal: who signed, when, from where, how they were identified, and the stroke dynamics of the signature. Anyone can verify a copy is unmodified without trusting us.'}),
    col: translate({id: 'howItWorks.stage.4.col', message: 'permanent'}),
  },
];

const LIMITS = [
  {
    name: translate({id: 'howItWorks.limit.1.name', message: 'Not a lawyer'}),
    desc: translate({id: 'howItWorks.limit.1.desc', message: 'The terms language is yours to set, and the default wording is a starting point for a proposal — not reviewed contract language for a regulated or high-value engagement.'}),
  },
  {
    name: translate({id: 'howItWorks.limit.2.name', message: 'In person is not a neutral third party'}),
    desc: translate({id: 'howItWorks.limit.2.desc', message: 'Signing on your device proves possession of your session, and the certificate says exactly that. For a high-value or likely-contested agreement, consider a neutral third-party e-signature service.'}),
  },
  {
    name: translate({id: 'howItWorks.limit.3.name', message: 'The draft still needs you'}),
    desc: translate({id: 'howItWorks.limit.3.desc', message: 'It reads your notes well, but it does not know what you quoted the neighbour last month. Every number is editable, and required fields are checked before you can export.'}),
  },
];

export default function HowItWorks(): React.ReactElement {
  return (
    <Layout
      title={translate({id: 'howItWorks.meta.title', message: 'How it works'})}
      description={translate({
        id: 'howItWorks.meta.description',
        message:
          'From a conversation to a signed, sealed proposal in one sitting. Each step, and the honest limits.',
      })}>
      <header className={styles.masthead}>
        <div className={styles.sheet}>
          <div className={styles.mastGrid}>
            <h1 className={styles.title}>
              <Translate id="howItWorks.title">From a conversation to a signed document.</Translate>
            </h1>
            <dl className={styles.meta}>
              <div className={styles.metaRow}><dt><Translate id="howItWorks.meta.stages">Stages</Translate></dt><dd><b><Translate id="howItWorks.meta.stagesValue">Four</Translate></b></dd></div>
              <div className={styles.metaRow}><dt><Translate id="howItWorks.meta.time">Typical time</Translate></dt><dd><b><Translate id="howItWorks.meta.timeValue">One sitting</Translate></b></dd></div>
              <div className={styles.metaRow}><dt><Translate id="howItWorks.meta.signatures">Signatures</Translate></dt><dd><b><Translate id="howItWorks.meta.signaturesValue">In person or remote</Translate></b></dd></div>
            </dl>
          </div>
          <div className={styles.rule} />
        </div>
      </header>

      <section className={styles.intro}>
        <div className={styles.sheet}>
          <p className={styles.lede}>
            <Translate id="howItWorks.lede">
              Deal Desk does not try to replace your judgement about the price. It removes the ninety
              minutes of typing between deciding the price and the customer seeing it.
            </Translate>
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
            <h2 className={styles.h2}><Translate id="howItWorks.limits.heading">What this is not</Translate></h2>
            <p className={styles.note}>
              <Translate id="howItWorks.limits.note">
                Worth saying plainly, because the alternative is finding out at the wrong moment.
              </Translate>
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
          <h2 className={styles.closeH}><Translate id="howItWorks.close.heading">Try it on the last job you quoted.</Translate></h2>
          <p className={styles.closeP}>
            <Translate id="howItWorks.close.note">
              Paste the notes you already have and see what comes back. Drafting is free.
            </Translate>
          </p>
          <div className={styles.closeActions}>
            <Link className={styles.go} to={SIGNUP}><Translate id="common.cta.startFree">Start free</Translate></Link>
            <Link className={styles.alt} to="/pricing"><Translate id="common.cta.seePricing">See pricing</Translate></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
