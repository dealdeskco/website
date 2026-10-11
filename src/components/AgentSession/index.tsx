import React, {useCallback, useEffect, useRef, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

/**
 * Deal Desk inside an AI agent, shown working: Claude Code is connected to the Deal Desk MCP
 * server with one command, asked for a proposal in plain words, looks the company up in its
 * library, has Deal Desk draft the proposal, and the finished sheet comes out beside the terminal.
 * The sibling of RfpMatrix, and built the same way: code rather than a video, so it follows the
 * theme, stays sharp, translates, and the commands and tool names are the product's real ones.
 *
 * Commands, tool names and the URL are never translated -- they are what a person types. The
 * request, the replies and the proposal are.
 *
 * Layout never moves: every line that will ever appear is rendered from the first frame and only
 * fades in, and a line being typed sits over an invisible copy of its finished text, so it has its
 * full height before the first character lands.
 *
 * Plays once when it scrolls into view, holds the end state, and offers a Replay. Reduced motion
 * gets the end state immediately.
 *
 * The request, the line items, the $6,300 first-year total and the number DD-2026-0002 are from a
 * real run of the MCP server on staging; the businesses are fictional.
 */

// [hold in ms] for each step. The step index drives everything below.
const HOLD = [
  500, // 0 an empty prompt
  1900, // 1 typing `claude mcp add ...`
  800, // 2 server added
  3100, // 3 typing the request
  800, // 4 search_library called
  1150, // 5 cited passages back
  800, // 6 draft_proposal called
  900, // 7 drafted; the sheet comes out
  380, // 8 first line item
  380, // 9 second line item
  800, // 10 the total and the sources
  900, // 11 Claude's summary
];
const LAST = HOLD.length; // 12: done
const CMD_STEP = 1;
const ASK_STEP = 3;
const CMD_MS = 1400;
const ASK_MS = 2500;

const CMD =
  'claude mcp add --transport http dealdesk https://app.dealdesk.studio/mcp --header "Authorization: Bearer ddk_live_…"';

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

/** A line typed over an invisible copy of itself, so its height is fixed before it is typed. */
function Typed({text, n, caret}: {text: string; n: number; caret: boolean}) {
  return (
    <span className={styles.stack}>
      <span className={styles.ghost}>{text}</span>
      <span>
        {text.slice(0, n)}
        <span className={styles.caret} data-on={caret} />
      </span>
    </span>
  );
}

export default function AgentSession(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);

  const ask = translate({
    id: 'agents.demo.ask',
    message:
      'Draft a proposal for Lakeside Dental: 12 months of website maintenance at $400/mo plus a $1,500 redesign, starting Nov 1',
  });

  // Start when reached. IntersectionObserver alone can be deferred indefinitely in a throttled
  // tab, so a geometry check on scroll and once after load is the fallback -- as in RfpMatrix.
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

  // Typing, during the two typing steps.
  const typingText = step === CMD_STEP ? CMD : step === ASK_STEP ? ask : '';
  useEffect(() => {
    setTyped(0);
    if (!started || reduced || !typingText) return;
    const total = step === CMD_STEP ? CMD_MS : ASK_MS;
    const each = Math.max(12, Math.floor(total / typingText.length));
    const t = window.setInterval(() => {
      setTyped((n) => {
        if (n >= typingText.length) {
          window.clearInterval(t);
          return n;
        }
        return n + 1;
      });
    }, each);
    return () => window.clearInterval(t);
  }, [step, started, reduced, typingText]);

  const replay = useCallback(() => {
    setTyped(0);
    setStep(0);
    setStarted(true);
  }, []);

  // ---- derived state ----
  const cmdN = step < CMD_STEP ? 0 : step > CMD_STEP ? CMD.length : typed;
  const askN = step < ASK_STEP ? 0 : step > ASK_STEP ? ask.length : typed;
  const done = step >= LAST;
  const on = (s: number) => step >= s;

  return (
    <figure className={styles.figure}>
      <div
        ref={ref}
        className={styles.stage}
        role="img"
        aria-label={translate({
          id: 'agents.demo.aria',
          message:
            'Claude Code is connected to Deal Desk with one command and asked to draft a proposal for Lakeside Dental. It searches the company library, Deal Desk drafts the proposal, and the sheet comes out: website maintenance, 12 months at $400, $4,800; website redesign, $1,500; total for year 1, $6,300; proposal DD-2026-0002.',
        })}>
        <div className={styles.grid} aria-hidden="true">
          {/* ---- the terminal ---- */}
          <div className={styles.term}>
            <div className={styles.termBar}>
              <span>Claude Code</span>
              <span className={styles.termPath}>~/sales</span>
            </div>
            <div className={styles.termBody}>
              <div className={styles.line}>
                <span className={styles.ps}>$</span>
                <Typed text={CMD} n={cmdN} caret={step === 0 || step === CMD_STEP} />
              </div>
              <div className={`${styles.line} ${styles.dim}`} data-on={on(2)}>
                Added HTTP MCP server dealdesk with URL: https://app.dealdesk.studio/mcp to local config
              </div>
              <div className={styles.ask} data-on={on(ASK_STEP)}>
                <span className={styles.ps}>&gt;</span>
                <Typed text={ask} n={askN} caret={step === ASK_STEP} />
              </div>
              <div className={styles.call} data-on={on(4)}>
                <span className={styles.dot} data-done={on(5)} />
                <span>
                  <b>dealdesk - search_library</b> (MCP)(query: "website maintenance plan and redesign")
                </span>
              </div>
              <div className={styles.result} data-on={on(5)}>
                <span className={styles.elbow}>⎿</span>
                <span>
                  [1]{' '}
                  {translate({
                    id: 'agents.demo.cite1',
                    message: 'Service catalog: Website care plan, updates, backups and monitoring, $400 a month',
                  })}
                  <br />
                  [2]{' '}
                  {translate({
                    id: 'agents.demo.cite2',
                    message: 'Service catalog: Website redesign, fixed fee $1,500, four weeks',
                  })}
                </span>
              </div>
              <div className={styles.call} data-on={on(6)}>
                <span className={styles.dot} data-done={on(7)} />
                <span>
                  <b>dealdesk - draft_proposal</b> (MCP)(notes: "Lakeside Dental, 12 months…")
                </span>
              </div>
              <div className={styles.result} data-on={on(7)}>
                <span className={styles.elbow}>⎿</span>
                <span>
                  {translate(
                    {id: 'agents.demo.drafted', message: '{n} saved as a draft. Year 1 total: {total}'},
                    {n: 'DD-2026-0002', total: '$6,300'},
                  )}
                </span>
              </div>
              <div className={styles.reply} data-on={on(11)}>
                <span className={styles.dot} data-done="true" data-reply="true" />
                <span>
                  {translate({
                    id: 'agents.demo.reply',
                    message:
                      'Drafted DD-2026-0002 for Lakeside Dental: website care at $400 a month for 12 months, $4,800, plus the $1,500 redesign, $6,300 in year 1, from your service catalog [1][2]. Review it and send it for signature from Deal Desk.',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* ---- the proposal, out of Deal Desk ---- */}
          <div className={styles.sheet} data-on={on(7)}>
            <div className={styles.sheetTop}>
              <span>Harbor Web Studio</span>
              <span>DD-2026-0002</span>
            </div>
            <div className={styles.sheetBody}>
              <div className={styles.sheetHead}>
                <div>
                  <div className={styles.docTitle}>{translate({id: 'agents.demo.doc.title', message: 'PROPOSAL'})}</div>
                  <div className={styles.forWhom}>
                    {translate({id: 'agents.demo.doc.for', message: 'Prepared for'})} <b>Lakeside Dental</b>
                  </div>
                </div>
                <span className={styles.status}>{translate({id: 'agents.demo.doc.draft', message: 'Draft'})}</span>
              </div>
              <dl className={styles.terms}>
                <div>
                  <dt>{translate({id: 'agents.demo.doc.start', message: 'Start'})}</dt>
                  <dd>{translate({id: 'agents.demo.doc.startValue', message: 'Nov 1, 2026'})}</dd>
                </div>
                <div>
                  <dt>{translate({id: 'agents.demo.doc.term', message: 'Term'})}</dt>
                  <dd>{translate({id: 'agents.demo.doc.termValue', message: '12 months'})}</dd>
                </div>
              </dl>
              <table className={styles.items}>
                <tbody>
                  <tr data-on={on(8)}>
                    <td>
                      {translate({id: 'agents.demo.doc.line1', message: 'Website care plan'})}
                      <small>{translate({id: 'agents.demo.doc.line1.sub', message: '12 months at $400'})}</small>
                    </td>
                    <td>$4,800</td>
                  </tr>
                  <tr data-on={on(9)}>
                    <td>
                      {translate({id: 'agents.demo.doc.line2', message: 'Website redesign'})}
                      <small>{translate({id: 'agents.demo.doc.line2.sub', message: 'One-time'})}</small>
                    </td>
                    <td>$1,500</td>
                  </tr>
                  <tr className={styles.sum} data-on={on(10)}>
                    <td>{translate({id: 'agents.demo.doc.total', message: 'Total, year 1'})}</td>
                    <td>$6,300</td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.sources} data-on={on(10)}>
                {translate({id: 'agents.demo.doc.sources', message: 'Sources'})} [1] [2]{' '}
                {translate({id: 'agents.demo.doc.sourcesName', message: 'Service catalog'})}
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className={styles.caption}>
        <span>
          {translate({
            id: 'agents.demo.caption',
            message: 'The businesses are fictional. The request, the figures and the proposal number are from a real test run.',
          })}
        </span>
        <button
          type="button"
          className={styles.replay}
          onClick={replay}
          data-on={done && !reduced}
          tabIndex={done && !reduced ? 0 : -1}
          aria-hidden={!(done && !reduced)}>
          {translate({id: 'agents.demo.replay', message: 'Replay'})}
        </button>
      </figcaption>
    </figure>
  );
}
