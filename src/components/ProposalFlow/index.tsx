import React, {useCallback, useEffect, useRef, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

/**
 * The core product, shown working: notes from a site visit go in, "Draft with AI" turns them into a
 * priced proposal, the customer signs on the line, and the PDF is sealed. The third sibling of
 * RfpMatrix and AgentSession, built the same way: code rather than a video, so it follows the
 * theme, stays sharp and translates.
 *
 * It is the home page's own example -- Maya Torres of Harbor & Vine Weddings, DD-2026-0042,
 * $18,000 + $6,400 less the 10% first-year discount = $21,960, sealed as 8H0dmfuGIn1Q -- and the
 * document strings reuse the home page's translation ids, so the two can never disagree. The
 * notes are the app's own notes placeholder, with the figures the proposal then carries.
 *
 * Layout never moves: every state is rendered from the first frame and only fades in; the notes
 * are typed over an invisible copy of their finished text, so the panel has its height first.
 * Plays once on reaching the viewport, holds the end, and offers Replay. Reduced motion gets the
 * end state at once.
 */

// [hold in ms] for each step. The step index drives everything below.
const HOLD = [
  500, // 0 an empty notes box
  3600, // 1 notes typed
  600, // 2 Draft with AI pressed
  650, // 3 the sheet: masthead and meta
  550, // 4 customer and scope
  380, // 5 first line item
  380, // 6 second line item
  500, // 7 the discount
  1000, // 8 the total
  2100, // 9 the customer signs
  800, // 10 SIGNED and the date
  900, // 11 sealed
];
const LAST = HOLD.length; // 12: done
const TYPE_STEP = 1;
const TYPE_MS = 3000;
const SIGN_STEP = 9;

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
}

export default function ProposalFlow(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  const notes = translate({
    id: 'flow.notes',
    message:
      'Walked the courtyard with Maya Torres (owner, Harbor & Vine Weddings). Ceremony lawn redesign, phase one: design + install $18k, irrigation and path lighting $6.4k. 10% off if signed this month. She wants the proposal by Friday.',
  });

  // Start when reached. IntersectionObserver alone can be deferred indefinitely in a throttled
  // tab, so a geometry check on scroll and once after load is the fallback, as in RfpMatrix.
  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 && r.bottom > 0) setStarted(true);
    };
    const t = window.setTimeout(check, 900);
    window.addEventListener('scroll', check, {passive: true});
    let io: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setStarted(true);
        },
        {threshold: 0.35},
      );
      io.observe(el);
    }
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', check);
      io?.disconnect();
    };
  }, [started]);

  // Reduced motion: the finished state, no sequence.
  useEffect(() => {
    if (reduced) setStep(LAST);
  }, [reduced]);

  // The timeline.
  useEffect(() => {
    if (!started || reduced || step >= LAST) return;
    const t = window.setTimeout(() => setStep((s) => s + 1), HOLD[step]);
    return () => window.clearTimeout(t);
  }, [started, reduced, step]);

  // Typing, during the notes step.
  useEffect(() => {
    setTyped(0);
    if (!started || reduced || step !== TYPE_STEP) return;
    const each = Math.max(10, Math.floor(TYPE_MS / notes.length));
    const t = window.setInterval(() => {
      setTyped((n) => {
        if (n >= notes.length) {
          window.clearInterval(t);
          return n;
        }
        return n + 1;
      });
    }, each);
    return () => window.clearInterval(t);
  }, [step, started, reduced, notes.length]);

  const replay = useCallback(() => {
    setTyped(0);
    setStep(0);
    setStarted(true);
  }, []);

  // ---- derived state ----
  const on = (s: number) => step >= s;
  const notesN = step < TYPE_STEP ? 0 : step > TYPE_STEP ? notes.length : typed;
  const done = step >= LAST;
  // The four stages, as the page names them, and the time the page claims for each.
  const STAGES = [
    {t: translate({id: 'home.flow.1.t', message: 'Capture'}), col: translate({id: 'howItWorks.stage.1.col', message: 'about a minute'}), at: 2},
    {t: translate({id: 'home.flow.2.t', message: 'Generate'}), col: translate({id: 'howItWorks.stage.2.col', message: 'a few minutes'}), at: 8},
    {t: translate({id: 'home.flow.3.t', message: 'Send & sign'}), col: translate({id: 'howItWorks.stage.3.col', message: 'same visit'}), at: 10},
    {t: translate({id: 'home.flow.4.t', message: 'Seal'}), col: translate({id: 'howItWorks.stage.4.col', message: 'permanent'}), at: 11},
  ];
  const current = STAGES.findIndex((s) => step < s.at);

  return (
    <figure className={styles.figure}>
      <div
        ref={ref}
        className={styles.stage}
        role="img"
        aria-label={translate({
          id: 'flow.aria',
          message:
            'Notes from a site visit with Maya Torres of Harbor & Vine Weddings become a proposal: design and installation, phase 1, $18,000; irrigation and lighting, $6,400; a 10% first-year discount of $2,440; total $21,960. Maya Torres signs it, and the PDF is sealed with verification id 8H0dmfuGIn1Q.',
        })}>
        <div className={styles.grid} aria-hidden="true">
          {/* ---- the notes, and the stages they go through ---- */}
          <div className={styles.left}>
            <div className={styles.notes}>
              <div className={styles.notesTitle}>{translate({id: 'flow.notesTitle', message: 'Draft from notes'})}</div>
              <div className={styles.box}>
                <span className={styles.stack}>
                  <span className={styles.ghost}>{notes}</span>
                  <span>
                    {notesN === 0 ? (
                      <span className={styles.placeholder}>{translate({id: 'flow.notesPlaceholder', message: 'Paste or dictate your notes'})}</span>
                    ) : (
                      notes.slice(0, notesN)
                    )}
                    <span className={styles.caret} data-on={step <= TYPE_STEP} />
                  </span>
                </span>
              </div>
              <div className={styles.notesFoot}>
                <span className={styles.mic} aria-hidden="true">
                  <svg viewBox="0 0 16 16"><path d="M8 1.5a2 2 0 012 2v4a2 2 0 01-4 0v-4a2 2 0 012-2zM4 7.5a4 4 0 008 0M8 11.5v3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>
                </span>
                <span className={styles.draftBtn} data-pressed={step === 2}>
                  {translate({id: 'flow.draftWithAI', message: '✨ Draft with AI'})}
                </span>
              </div>
            </div>
            <ol className={styles.stages}>
              {STAGES.map((s, i) => (
                <li key={s.t} data-st={step >= s.at ? 'done' : i === current && step > 0 ? 'now' : 'todo'}>
                  <span className={styles.tick}>
                    <svg viewBox="0 0 16 16"><path d="M2.5 8.5l4 4 7-9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className={styles.stageName}>{s.t}</span>
                  <span className={styles.stageCol}>{s.col}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* ---- the proposal, as the home page shows it ---- */}
          <div className={styles.sheet} data-on={on(3)}>
            <div className={styles.docTop}>
              <span>Harbor &amp; Vine Weddings</span>
              <span>DD-2026-0042</span>
            </div>
            <div className={styles.docBody}>
              <div className={styles.docHead}>
                <div>
                  <div className={styles.docMark} />
                  <div className={styles.docTitle}>{translate({id: 'home.doc.title', message: 'PROPOSAL'})}</div>
                </div>
                <div className={styles.docMeta}>
                  <div>{translate({id: 'home.doc.date', message: 'Date'})}<b>{translate({id: 'home.doc.dateValue', message: 'Oct 7, 2026'})}</b></div>
                  <div>{translate({id: 'home.doc.validUntil', message: 'Valid until'})}<b>{translate({id: 'home.doc.validUntilValue', message: 'Nov 6, 2026'})}</b></div>
                  <div>{translate({id: 'home.doc.preparedBy', message: 'Prepared by'})}<b>M. Okafor</b></div>
                </div>
              </div>
              <div className={styles.docRule} />
              <dl className={styles.who} data-on={on(4)}>
                <div>
                  <dt>{translate({id: 'flow.doc.customer', message: 'Customer'})}</dt>
                  <dd>Harbor &amp; Vine Weddings<span>Maya Torres</span></dd>
                </div>
                <div>
                  <dt>{translate({id: 'flow.doc.scope', message: 'Scope'})}</dt>
                  <dd>{translate({id: 'flow.doc.scopeValue', message: 'Courtyard and ceremony-lawn redesign, phase one: design, installation, irrigation and path lighting.'})}</dd>
                </div>
              </dl>
              <div className={styles.docLabel} data-on={on(5)}>{translate({id: 'home.doc.commercialTerms', message: 'Commercial terms'})}</div>
              <table className={styles.items}>
                <tbody>
                  <tr data-on={on(5)}>
                    <td>{translate({id: 'home.doc.line1', message: 'Design & installation — Phase 1'})}</td>
                    <td>$18,000</td>
                  </tr>
                  <tr data-on={on(6)}>
                    <td>{translate({id: 'home.doc.line2', message: 'Irrigation & lighting'})}</td>
                    <td>$6,400</td>
                  </tr>
                  <tr className={styles.off} data-on={on(7)}>
                    <td>{translate({id: 'home.doc.discount', message: 'First-year discount (10%)'})}</td>
                    <td>−$2,440</td>
                  </tr>
                  <tr className={styles.sum} data-on={on(8)}>
                    <td>{translate({id: 'home.doc.total', message: 'Total'})}</td>
                    <td>$21,960</td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.docLabel} data-on={on(8)} style={{marginTop: '14px'}}>
                {translate({id: 'home.doc.acceptance', message: 'Acceptance'})}
              </div>
              <div className={styles.sign} data-on={on(8)}>
                <div>
                  <div className={styles.signLine}>
                    <svg className={styles.ink} viewBox="0 0 120 26" preserveAspectRatio="xMinYMax meet" data-signed={on(SIGN_STEP)}>
                      <path pathLength={1} d="M4 21c4-12 8-18 11-17 3 1 2 11-1 15-3 4-6 3-5-2 2-11 11-18 18-17 5 1 5 6 1 10-4 4-8 5-10 3-2-2 3-6 9-7 13-3 22 5 33 3 8-1 13-5 17-10-5 8-11 13-20 14" />
                    </svg>
                  </div>
                  <small>Maya Torres, {translate({id: 'home.doc.owner', message: 'Owner'})}</small>
                </div>
                <div className={styles.signedCell} data-on={on(10)}>
                  <span className={styles.stamp}>{translate({id: 'home.doc.signed', message: 'SIGNED'})}</span>
                  <small>{translate({id: 'home.doc.dateValue', message: 'Oct 7, 2026'})}</small>
                </div>
              </div>
              <div className={styles.sealed} data-on={on(11)}>
                <span className={styles.sealLine}>
                  <span className={styles.sealDot} />
                  {translate({id: 'home.doc.sealed', message: 'Sealed · verify'})} 8H0dmfuGIn1Q
                </span>
                <span className={styles.pdf}>
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 1.5h5.5L13 5v9a.5.5 0 01-.5.5h-8.5A.5.5 0 013.5 14V2a.5.5 0 01.5-.5zM9.5 1.5V5H13" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
                  DD-2026-0042.pdf
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span>
          {translate({
            id: 'flow.caption',
            message: 'A sample job. The business, the customer and every figure are fictional.',
          })}
        </span>
        <button
          type="button"
          className={styles.replay}
          onClick={replay}
          data-on={done && !reduced}
          tabIndex={done && !reduced ? 0 : -1}
          aria-hidden={!(done && !reduced)}>
          {translate({id: 'flow.replay', message: 'Replay'})}
        </button>
      </figcaption>
    </figure>
  );
}
