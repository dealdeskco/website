import React, {useCallback, useEffect, useRef, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

/**
 * The RFP responder, shown working: a sample RFP lands on the desk, is read into a compliance
 * matrix, drafted from the firm's library, checked in the margin, and finished by one short
 * question. Code-built rather than a video so it follows the theme, stays sharp, translates, and
 * cannot go stale silently when the app's labels change -- the labels here are the app's own.
 *
 * Layout never moves: every state that will ever appear is rendered from the first frame and
 * only fades in, so the sheet's height is fixed before anything plays. States that replace each
 * other (the drop zone and the header; the question and the footer; a draft and its redraft)
 * share one grid cell, so the cell is as tall as its tallest state.
 *
 * Plays once when it scrolls into view, holds the end state, and offers a Replay. Reduced motion
 * gets the end state immediately.
 */

// [hold in ms] for each step. The step index drives everything below.
const HOLD = [
  500, // 0 empty drop zone
  700, // 1 file lands
  1000, // 2 reading
  280, 280, 280, 280, 280, 280, // 3-8 rows appear
  1000, // 9 evaluator's read
  350, // 10 Draft all pressed
  380, 380, 380, 380, 380, 380, // 11-16 rows drafted
  1100, // 17 L.3 flagged
  600, // 18 question appears
  1900, // 19 typing
  650, // 20 Save and redraft
  800, // 21 L.3 answered
  220, 220, 220, 220, 220, // 22-26 the rest marked answered after review
];
const LAST = HOLD.length; // 27: done
const TYPE_MS = 1700;
const FLAGGED = 2; // L.3

type Row = {
  ref: string;
  req: string;
  draft: string;
  scored?: string;
};

function rows(): Row[] {
  return [
    {
      ref: 'L.1',
      req: translate({id: 'rfp.demo.l1.req', message: 'Describe your approach to evaluating program outcomes.'}),
      draft: translate({
        id: 'rfp.demo.l1.draft',
        message:
          'A mixed-methods design: outcome indicators agreed with program staff in month one, quarterly dashboards, and a final impact report.',
      }),
      scored: translate({id: 'rfp.demo.l1.scored', message: 'Technical approach, 40% of the score (M.2)'}),
    },
    {
      ref: 'L.2',
      req: translate({
        id: 'rfp.demo.l2.req',
        message: 'Identify the project manager and summarize relevant experience.',
      }),
      draft: translate({
        id: 'rfp.demo.l2.draft',
        message: 'Dana Whitfield, PMP, has led eleven county program evaluations since 2016.',
      }),
    },
    {
      ref: 'L.3',
      req: translate({
        id: 'rfp.demo.l3.req',
        message:
          'Provide two references for similar engagements completed within the last three years, including contract value.',
      }),
      draft: translate({
        id: 'rfp.demo.l3.draft',
        message: 'Lakeshore Transit Authority ridership study, $310,000, completed August 2024.',
      }),
      scored: translate({id: 'rfp.demo.l3.scored', message: 'Past performance, 30% of the score (M.2)'}),
    },
    {
      ref: 'L.4',
      req: translate({id: 'rfp.demo.l4.req', message: 'Describe your quality assurance process for deliverables.'}),
      draft: translate({
        id: 'rfp.demo.l4.draft',
        message:
          'Every deliverable gets an analyst peer check, then sign-off by the project manager against the acceptance criteria.',
      }),
    },
    {
      ref: 'L.5',
      req: translate({
        id: 'rfp.demo.l5.req',
        message: 'State whether your firm carries professional liability insurance of at least $1,000,000.',
      }),
      draft: translate({
        id: 'rfp.demo.l5.draft',
        message: 'Yes. Professional liability coverage of $2,000,000 per claim; certificate attached.',
      }),
    },
    {
      ref: 'L.6',
      req: translate({id: 'rfp.demo.l6.req', message: 'Provide résumés for key personnel.'}),
      draft: translate({
        id: 'rfp.demo.l6.draft',
        message: 'Résumés for Dana Whitfield and two senior analysts are in Appendix B.',
      }),
    },
  ];
}

// Citation marks per row: the passages in "What we know" each draft was written from.
const CITES = ['[1][2]', '[2]', '[1]', '[1]', '[4]', '[2][4]'];
// The order rows are marked Answered after review, L.3 having been answered by the interview.
const REVIEW_ORDER = [0, 1, 3, 4, 5];

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

export default function RfpMatrix(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  const R = rows();
  const answer = translate({
    id: 'rfp.demo.answer',
    message: 'Ridgeview Housing evaluation, $240,000, Mar–Nov 2025',
  });
  const redraft = translate({
    id: 'rfp.demo.l3.redraft',
    message:
      'Lakeshore Transit Authority ridership study, $310,000, completed August 2024; Ridgeview Housing evaluation, $240,000, March to November 2025.',
  });

  // Start when reached. IntersectionObserver alone can be deferred indefinitely in a throttled
  // tab, so a geometry check on scroll and once after load is the fallback.
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
    if (reduced) {
      setStep(LAST);
      setTyped(answer.length);
    }
  }, [reduced, answer.length]);

  // The timeline.
  useEffect(() => {
    if (!started || reduced || step >= LAST) return;
    const t = window.setTimeout(() => setStep((s) => s + 1), HOLD[step]);
    return () => window.clearTimeout(t);
  }, [started, reduced, step]);

  // Typing, during step 19.
  useEffect(() => {
    if (reduced) return;
    if (step < 19) {
      setTyped(0);
      return;
    }
    if (step > 19) {
      setTyped(answer.length);
      return;
    }
    const each = Math.max(18, Math.floor(TYPE_MS / answer.length));
    const t = window.setInterval(() => {
      setTyped((n) => {
        if (n >= answer.length) {
          window.clearInterval(t);
          return n;
        }
        return n + 1;
      });
    }, each);
    return () => window.clearInterval(t);
  }, [step, reduced, answer.length]);

  const replay = useCallback(() => {
    setTyped(0);
    setStep(0);
    setStarted(true);
  }, []);

  // ---- derived state ----
  const fileIn = step >= 1;
  const headerIn = step >= 2;
  const shown = Math.max(0, Math.min(6, step - 2));
  const evalIn = step >= 9;
  const drafting = step >= 10 && step < 17;
  const draftedCount = Math.max(0, Math.min(6, step - 10));
  const flagged = step >= 17 && step < 21;
  const l3Answered = step >= 21;
  const reviewed = Math.max(0, Math.min(5, step - 21));
  const answeredSet = new Set<number>();
  if (l3Answered) answeredSet.add(FLAGGED);
  REVIEW_ORDER.slice(0, reviewed).forEach((i) => answeredSet.add(i));
  const done = step >= LAST;


  const statusOf = (i: number) => {
    if (answeredSet.has(i)) return 'answered';
    if (i < draftedCount) return 'drafted';
    return 'open';
  };
  const STATUS = {
    open: translate({id: 'rfp.demo.status.open', message: 'Open'}),
    drafted: translate({id: 'rfp.demo.status.drafted', message: 'Drafted'}),
    answered: translate({id: 'rfp.demo.status.answered', message: 'Answered'}),
  };
  const required = translate({id: 'rfp.demo.required', message: 'Required'});

  return (
    <figure className={styles.figure}>
      <div
        ref={ref}
        className={styles.sheet}
        role="img"
        aria-label={translate({
          id: 'rfp.demo.aria',
          message:
            'A sample RFP is read into six requirements, drafted from the firm’s library with citations, one missing fact is flagged and answered, and the compliance matrix and filled document are ready to download.',
        })}>
        <div aria-hidden="true">
          {/* ---- head: the drop zone, replaced by the document's own header ---- */}
          <div className={styles.stack}>
            <div className={styles.drop} data-on={!headerIn}>
              <span className={styles.dropText}>
                {translate({id: 'rfp.demo.drop', message: 'Upload the document you need to answer'})}
              </span>
              <span className={styles.file} data-on={fileIn}>
                <FileIcon />
                RFP-2026-014.pdf
              </span>
            </div>
            <div className={styles.head} data-on={headerIn}>
              <div className={styles.headTop}>
                <span className={styles.fileName}>
                  <FileIcon />
                  RFP-2026-014.pdf
                </span>
                <span className={styles.draftAll} data-pressed={drafting}>
                  {translate({id: 'rfp.demo.draftAll', message: 'Draft all'})}
                </span>
              </div>
              <div className={styles.docTitle}>
                {translate({id: 'rfp.demo.title', message: 'Program evaluation services'})}
              </div>
              <div className={styles.docSub}>
                {translate({id: 'rfp.demo.sub', message: 'RFP 2026-014, Sample County'})}
              </div>
              <div className={styles.stack}>
                <div className={styles.headLine} data-on={headerIn && !evalIn}>
                  {shown < 6
                    ? translate({id: 'rfp.demo.reading', message: 'Reading…'})
                    : translate({id: 'rfp.demo.found', message: '6 requirements'})}
                </div>
                <div className={styles.headLine} data-on={evalIn}>
                  <b>{translate({id: 'rfp.demo.evalRead', message: 'Evaluator’s read'})}</b>{' '}
                  {translate({
                    id: 'rfp.demo.evalCriteria',
                    message: 'Technical approach 40%, past performance 30%, price 30% (M.2)',
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ---- the compliance matrix ---- */}
          <div className={styles.cols}>
            <span>{translate({id: 'rfp.demo.col.ref', message: 'Ref'})}</span>
            <span>{translate({id: 'rfp.demo.col.req', message: 'Requirement'})}</span>
            <span className={styles.right}>{translate({id: 'rfp.demo.col.status', message: 'Status'})}</span>
          </div>
          <ol className={styles.rows}>
            {R.map((r, i) => {
              const st = statusOf(i);
              const isFlagRow = i === FLAGGED;
              return (
                <li key={r.ref} className={styles.row} data-on={i < shown}>
                  <div className={styles.ref}>{r.ref}</div>
                  <div className={styles.body}>
                    <div className={styles.reqText}>{r.req}</div>
                    {r.scored && (
                      <div className={styles.scored} data-on={evalIn}>
                        {translate({id: 'rfp.demo.howScored', message: 'How this is scored:'})} {r.scored}
                      </div>
                    )}
                    {/* The first draft and its margin note share a cell with the redraft that
                        replaces them, so the row is sized for whichever is taller. */}
                    <div className={styles.stack}>
                      <div data-on={i < draftedCount && !(isFlagRow && l3Answered)}>
                        <div className={styles.draft}>
                          {r.draft} <span className={styles.cite}>{CITES[i]}</span>
                        </div>
                        {isFlagRow && (
                          <div className={styles.margin} data-on={flagged}>
                            <b>{translate({id: 'rfp.demo.needsFact', message: 'Needs a fact from you'})}</b>{' '}
                            {translate({
                              id: 'rfp.demo.needsFactWhat',
                              message: 'a second reference within three years',
                            })}
                          </div>
                        )}
                      </div>
                      {isFlagRow && (
                        <div className={styles.draft} data-on={l3Answered}>
                          {redraft} <span className={styles.cite}>[1][3]</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.status} data-st={i < shown ? st : 'none'}>
                    {STATUS[st]}
                    <span className={styles.req}>{required}</span>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* ---- the bottom: prompt, question, then the tally and the exports ---- */}
          <div className={`${styles.stack} ${styles.bottom}`}>
            <div className={styles.prompt} data-on={step === 17}>
              {translate({id: 'rfp.demo.prompt', message: 'Answer 1 open item in a few questions'})}
            </div>
            <div className={styles.question} data-on={step >= 18} data-done={l3Answered}>
              <div className={styles.qLabel}>
                {translate({id: 'rfp.demo.qLabel', message: 'A few questions'})}
              </div>
              <div className={styles.qText}>
                {translate({
                  id: 'rfp.demo.qText',
                  message:
                    'L.3 asks for two references from the last three years. What is a second engagement, with its contract value and dates?',
                })}
              </div>
              <div className={styles.qRow}>
                <div className={styles.input}>
                  {typed === 0 ? (
                    <span className={styles.placeholder}>
                      {translate({id: 'rfp.demo.typeHere', message: 'Type it here'})}
                    </span>
                  ) : (
                    answer.slice(0, typed)
                  )}
                  <span className={styles.caret} data-on={step === 19} />
                </div>
                <span className={styles.save} data-pressed={step === 20}>
                  {translate({id: 'rfp.demo.save', message: 'Save and redraft'})}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.tally} data-on={l3Answered}>
            <span className={styles.count}>
              {translate(
                {id: 'rfp.demo.tally', message: '{n} of 6 answered'},
                {n: String(answeredSet.size)},
              )}
            </span>
            <span className={styles.exports} data-on={done}>
              <span className={styles.export}>
                {translate({id: 'rfp.demo.exportMatrix', message: '⤓ Compliance matrix'})}
              </span>
              <span className={styles.export}>
                {translate({id: 'rfp.demo.exportFilled', message: '⤓ Filled document'})}
              </span>
            </span>
          </div>
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span>
          {translate({
            id: 'rfp.demo.caption',
            message: 'A sample document. The county, the firm and every figure are fictional.',
          })}
        </span>
        <button
          type="button"
          className={styles.replay}
          onClick={replay}
          data-on={done && !reduced}
          tabIndex={done && !reduced ? 0 : -1}
          aria-hidden={!(done && !reduced)}>
          {translate({id: 'rfp.demo.replay', message: 'Replay'})}
        </button>
      </figcaption>
    </figure>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.fileIcon}>
      <path
        d="M4 1.5h5.5L13 5v9a.5.5 0 01-.5.5h-8.5A.5.5 0 013.5 14V2a.5.5 0 01.5-.5zM9.5 1.5V5H13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
