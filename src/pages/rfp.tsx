import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import RfpMatrix from '@site/src/components/RfpMatrix';
// Shares the landing page's primitives so the two cannot drift apart.
import styles from './index.module.css';
import own from './rfp.module.css';

const SIGNUP = 'https://app.dealdesk.studio/login?signup=1';

// The order a responder actually works in, so the numbering is earned. Every claim here is
// something the RFP responses mode does today; the labels in quotes are the app's own.
const STAGES = [
  {
    h: translate({id: 'rfp.stage.upload.h', message: 'Upload the document'}),
    p: translate({
      id: 'rfp.stage.upload.p',
      message:
        'An RFP, an RFI or a customer’s own form: a PDF with selectable text, a Word .docx, or pasted text, up to about 100 pages. A long document takes a few minutes to read.',
    }),
  },
  {
    h: translate({id: 'rfp.stage.matrix.h', message: 'Get the compliance matrix'}),
    p: translate({
      id: 'rfp.stage.matrix.p',
      message:
        'Every discrete requirement as a numbered list, with the document’s own references such as L.4, the section it sits in, what kind it is (a question, a requirement, a form field or an instruction) and whether it is required.',
    }),
  },
  {
    h: translate({id: 'rfp.stage.eval.h', message: 'See how it will be scored'}),
    p: translate({
      id: 'rfp.stage.eval.p',
      message:
        'Evaluator’s read finds the evaluation criteria in the document and shows, on each requirement, how it is scored, quoting the document’s own words.',
    }),
  },
  {
    h: translate({id: 'rfp.stage.draft.h', message: 'Draft every answer from what you already know'}),
    p: translate({
      id: 'rfp.stage.draft.p',
      message:
        'Put past proposals, capability statements and résumés in What we know, your firm’s library. Draft all writes every answer in the background from it, and each draft cites the passages it used as [1], [2].',
    }),
  },
  {
    h: translate({id: 'rfp.stage.check.h', message: 'Read the checks in the margin'}),
    p: translate({
      id: 'rfp.stage.check.p',
      message:
        'Each answer is checked by fixed rules, not by the AI grading its own work: the requirement echoed back, vague claims, superlatives with nothing behind them, filler, recency windows such as “within the last three years”, and acronyms not spelled out on first use. Where a real fact is missing, the draft says “Needs a fact from you” instead of making one up.',
    }),
  },
  {
    h: translate({id: 'rfp.stage.ask.h', message: 'Answer the few open items'}),
    p: translate({
      id: 'rfp.stage.ask.p',
      message:
        'A short set of questions asks only for the missing facts. Type or dictate each one, then Save and redraft. Your answers are saved to What we know, so the next RFP already has them.',
    }),
  },
  {
    h: translate({id: 'rfp.stage.export.h', message: 'Export it'}),
    p: translate({
      id: 'rfp.stage.export.p',
      message:
        'Download the compliance matrix as a CSV. If the document came as a Word file, download the customer’s original with your answers written in.',
    }),
  },
];

const NOTES = [
  {
    name: translate({id: 'rfp.note.review.name', message: 'You review every answer'}),
    desc: translate({
      id: 'rfp.note.review.desc',
      message:
        'Drafts are written by AI and can be wrong. The checks point at the weak spots, but you read and approve each answer before it goes out.',
    }),
  },
  {
    name: translate({id: 'rfp.note.text.name', message: 'Text, not scans'}),
    desc: translate({
      id: 'rfp.note.text.desc',
      message:
        'A PDF needs selectable text. If yours is a scan, paste the text in instead.',
    }),
  },
  {
    name: translate({id: 'rfp.note.library.name', message: 'A library, not a data room'}),
    desc: translate({
      id: 'rfp.note.library.desc',
      message:
        'What we know is one place to drop documents and a list of what is there. Everyone on your account shares it, and answers you approve are added to it.',
    }),
  },
  {
    name: translate({id: 'rfp.note.deal.name', message: 'Tied to the deal'}),
    desc: translate({
      id: 'rfp.note.deal.desc',
      message: 'Link a response to one of your deals, so you can find it from the deal.',
    }),
  },
];

export default function Rfp(): React.ReactElement {
  return (
    <Layout
      title={translate({id: 'rfp.meta.title', message: 'Answering RFPs'})}
      description={translate({
        id: 'rfp.meta.description',
        message:
          'Upload an RFP, an RFI or a customer’s own form. Deal Desk breaks it into every requirement, drafts answers from what your firm already knows, and checks them the way an evaluator would.',
      })}>
      <header className={`${styles.masthead} ${styles.mastShort}`}>
        <div className={styles.sheet}>
          <div className={own.heroGrid}>
            <div>
              <h1 className={styles.title}>
                <Translate id="rfp.title">Answer the RFP from what your firm already knows.</Translate>
              </h1>
              <div className={styles.rule} />
              <p className={styles.lede}>
                <Translate id="rfp.lede">
                  Upload an RFP, an RFI or a customer’s own form. Deal Desk breaks it into every
                  requirement, drafts each answer from your past proposals and résumés, checks it
                  the way an evaluator would, and asks you only for the facts it is missing.
                </Translate>
              </p>
              <div className={styles.actions}>
                <Link className={styles.go} to={SIGNUP}>
                  <Translate id="common.cta.startFree">Start free</Translate>
                </Link>
                <Link className={styles.alt} to="/pricing">
                  <Translate id="common.cta.seePricing">See pricing</Translate>
                </Link>
              </div>
              <p className={styles.terms} style={{marginTop: '1.1rem'}}>
                <Translate id="rfp.hero.terms">
                  The RFP responder is an add-on to any paid plan: $49 a month.
                </Translate>
              </p>
            </div>
            <div className={own.demo}>
              <RfpMatrix />
            </div>
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="rfp.stages.heading">In the order you work</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="rfp.stages.note">
                From the document landing in your inbox to the matrix you submit with it.
              </Translate>
            </p>
          </div>
          <div className={styles.steps}>
            {STAGES.map((s) => (
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

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="rfp.notes.heading">Worth knowing first</Translate>
            </h2>
          </div>
          <div className={styles.items}>
            {NOTES.map((n) => (
              <div key={n.name} className={styles.item}>
                <div className={styles.itemName}>{n.name}</div>
                <div className={styles.itemDesc}>{n.desc}</div>
                <div className={styles.itemCol} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="rfp.price.heading">Price</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="rfp.price.note">An add-on to Starter, Pro or Team.</Translate>
            </p>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.itemName}>
                <Translate id="pricing.addon.name">RFP responder</Translate>
              </div>
              <div className={styles.itemDesc}>
                <Translate id="rfp.price.desc">
                  5 documents a month included, then $10 each. A document counts only once it has
                  been read successfully. Design partners have it included.
                </Translate>{' '}
                <Link to="/pricing">
                  <Translate id="rfp.price.plans">See the plans</Translate>
                </Link>
              </div>
              <div className={styles.itemCol}>
                <Translate id="pricing.addon.price">+$49/month</Translate>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.close}>
        <div className={styles.sheet}>
          <h2 className={styles.closeH}>
            <Translate id="rfp.close.heading">Bring the next RFP.</Translate>
          </h2>
          <p className={styles.closeP}>
            <Translate id="rfp.close.note">
              Create your account, choose a paid plan, and add the RFP responder when the next
              document arrives.
            </Translate>
          </p>
          <div className={styles.closeActions}>
            <Link className={styles.go} to={SIGNUP}>
              <Translate id="common.cta.startFree">Start free</Translate>
            </Link>
            <Link className={styles.alt} to="/help/responding-to-rfps">
              <Translate id="rfp.close.guide">Read the step-by-step guide</Translate>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
