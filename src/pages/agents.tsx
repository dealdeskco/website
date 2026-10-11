import React from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import AgentSession from '@site/src/components/AgentSession';
import ClientTable from '@site/src/components/ClientTable';
// Shares the landing page's primitives so the two cannot drift apart.
import styles from './index.module.css';
import own from './agents.module.css';

const APP = 'https://app.dealdesk.studio';
const SIGNUP = `${APP}/login?signup=1`;
const DOCS = '/docs/developers';
const CMD =
  'claude mcp add --transport http dealdesk https://app.dealdesk.studio/mcp --header "Authorization: Bearer ddk_live_..."';

// What the agent gets on its own versus with Deal Desk connected. Every right-hand cell is
// something the MCP server and the API do today.
const COMPARE = [
  {
    what: translate({id: 'agents.compare.facts', message: 'Facts about your company'}),
    alone: translate({id: 'agents.compare.facts.alone', message: 'Whatever sounds right. A missing reference or certification gets made up.'}),
    with: translate({id: 'agents.compare.facts.with', message: 'From your library and the facts you taught it, each one cited. If the library does not know, the agent is told to ask you.'}),
  },
  {
    what: translate({id: 'agents.compare.math', message: 'Prices and totals'}),
    alone: translate({id: 'agents.compare.math.alone', message: 'Arithmetic written as prose, and sometimes wrong.'}),
    with: translate({id: 'agents.compare.math.with', message: 'Line items, discounts and totals per year, computed by Deal Desk.'}),
  },
  {
    what: translate({id: 'agents.compare.doc', message: 'The document'}),
    alone: translate({id: 'agents.compare.doc.alone', message: 'Text in a chat window, to paste somewhere.'}),
    with: translate({id: 'agents.compare.doc.with', message: 'A proposal on your letterhead, saved in Deal Desk as a draft, with a PDF.'}),
  },
  {
    what: translate({id: 'agents.compare.sign', message: 'The signature'}),
    alone: translate({id: 'agents.compare.sign.alone', message: 'Not its job.'}),
    with: translate({id: 'agents.compare.sign.with', message: 'E-signature and a sealed PDF, sent when you say so.'}),
  },
];

const ALONE = translate({id: 'agents.compare.col.alone', message: 'The agent on its own'});
const WITH = translate({id: 'agents.compare.col.with', message: 'With Deal Desk connected'});

// The tools a connected agent sees, by name, with the scope each needs.
const TOOLS = [
  {
    name: 'search_library',
    desc: translate({id: 'agents.tools.search', message: 'Finds the passages in your library that bear on a question, numbered so the agent can cite them.'}),
    scope: 'read',
  },
  {
    name: 'teach_fact',
    desc: translate({id: 'agents.tools.teach', message: 'Saves a fact you state, such as a headcount or a certification, so every later draft can cite it.'}),
    scope: 'write',
  },
  {
    name: 'draft_proposal',
    desc: translate({id: 'agents.tools.draft', message: 'Turns notes into a priced proposal saved in Deal Desk as a draft. Fields the notes do not support stay empty.'}),
    scope: 'write',
  },
  {
    name: 'get_proposal',
    desc: translate({id: 'agents.tools.get', message: 'Reads a proposal back: every field, the line items and the totals for each year.'}),
    scope: 'read',
  },
  {
    name: 'start_rfp_response',
    desc: translate({id: 'agents.tools.rfp', message: 'Uploads an RFP, an RFI or a questionnaire and reads it into every requirement.'}),
    scope: 'write',
  },
  {
    name: 'get_rfp_requirements',
    desc: translate({id: 'agents.tools.reqs', message: 'Lists the requirements with their drafted answers, the citations behind them and any fact still missing.'}),
    scope: 'read',
  },
  {
    name: 'draft_rfp_answer',
    desc: translate({id: 'agents.tools.answer', message: 'Drafts one answer from your library, or says which fact it needs instead of inventing one.'}),
    scope: 'write',
  },
];

const SECURITY = [
  {
    name: translate({id: 'agents.security.keys.name', message: 'Keys are hashed and revocable'}),
    desc: translate({id: 'agents.security.keys.desc', message: 'A key is shown once, when you create it. Deal Desk keeps only a hash of it, and revoking one stops it at once. Make one key per agent or computer, so revoking one leaves the rest working.'}),
  },
  {
    name: translate({id: 'agents.security.scopes.name', message: 'Each key does only what you allow'}),
    desc: translate({id: 'agents.security.scopes.desc', message: 'Read only, or read and write. Sending for signature is a separate permission you tick when you create the key, and each send is billed like a send from the app.'}),
  },
  {
    name: translate({id: 'agents.security.library.name', message: 'Your library stays in Deal Desk'}),
    desc: translate({id: 'agents.security.library.desc', message: 'The agent receives only the passages a question needs, as cited answers. Every call is confined to your own account, through the same checks as the app.'}),
  },
  {
    name: translate({id: 'agents.security.memory.name', message: 'Works beside private memory'}),
    desc: translate({id: 'agents.security.memory.desc', message: 'Use it alongside a private memory tool such as Gnarl. The agent uses both, and each store stays separate: nothing from one is copied into the other.'}),
  },
];

export default function Agents(): React.ReactElement {
  const {i18n} = useDocusaurusContext();
  // Each Spanish edition has its own screenshot and recording; Spain's says ordenador, not laptop.
  const sfx = i18n.currentLocale === 'en' ? '' : `-${i18n.currentLocale}`;
  const panel = useBaseUrl(`/img/agents/developer-panel${sfx}.png`);
  const gif = useBaseUrl(`/img/agents/agent-session${sfx}.gif`);
  const og = `https://dealdesk.studio/img/agents/agents-social${sfx}.png`;
  return (
    <Layout
      title={translate({id: 'agents.meta.title', message: 'Deal Desk for your AI agent'})}
      description={translate({
        id: 'agents.meta.description',
        message:
          'Connect Claude Code, Cursor, VS Code or your own agent to Deal Desk. The agent writes; Deal Desk supplies your company’s real facts with citations, the pricing, the document and the signature.',
      })}>
      <Head>
        <meta property="og:image" content={og} />
        <meta name="twitter:image" content={og} />
      </Head>
      <header className={`${styles.masthead} ${styles.mastShort}`}>
        <div className={styles.sheet}>
          <div className={own.heroGrid}>
            <h1 className={styles.title}>
              <Translate id="agents.title">Deal Desk for your AI agent.</Translate>
            </h1>
            <div>
              <p className={styles.lede}>
                <Translate id="agents.lede">
                  Keep writing proposals in Claude, Cursor or Copilot. Connect Deal Desk once, and
                  the agent drafts from what your company actually knows, with citations, while
                  Deal Desk does the pricing, the document and the signature.
                </Translate>
              </p>
              <div className={styles.actions}>
                <Link className={styles.go} to={SIGNUP}>
                  <Translate id="common.cta.startFree">Start free</Translate>
                </Link>
                <Link className={styles.alt} to={DOCS}>
                  <Translate id="agents.cta.docs">Read the developer docs</Translate>
                </Link>
              </div>
              <p className={styles.terms} style={{marginTop: '1.1rem'}}>
                <Translate id="agents.hero.terms">
                  From $9 a month, your agent drafts from your company’s real library, with citations.
                </Translate>
              </p>
            </div>
          </div>
          <div className={styles.rule} />
          <div className={own.demo}>
            <AgentSession />
            <noscript>
              <img
                className={own.gif}
                src={gif}
                width={888}
                height={633}
                alt={translate({
                  id: 'agents.gif.alt',
                  message: 'Claude Code connected to Deal Desk drafts a proposal for Lakeside Dental with a year-1 total of $6,300.',
                })}
              />
            </noscript>
          </div>
        </div>
      </header>

      {/* ---------------- the problem, as a ruled comparison ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="agents.problem.heading">Fluent is not the same as right</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="agents.problem.note">
                An agent writes a convincing proposal in seconds. It does not know your references,
                your rates or your terms, and it does arithmetic in prose.
              </Translate>
            </p>
          </div>
          <table className={own.table}>
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col">{ALONE}</th>
                <th scope="col">{WITH}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((r) => (
                <tr key={r.what}>
                  <th scope="row">{r.what}</th>
                  <td className={own.alone} data-label={ALONE}>{r.alone}</td>
                  <td data-label={WITH}>{r.with}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ---------------- setup ---------------- */}
      <section className={styles.section} id="setup">
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="agents.setup.heading">Set up in three steps</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="agents.setup.note">A few minutes, once. You need to be an account owner or admin.</Translate>
            </p>
          </div>
          <div className={own.setup}>
            <div className={styles.steps}>
              <div className={styles.step}>
                <div>
                  <h3 className={styles.stepH}>
                    <Translate id="agents.setup.1.h">Create a key in Developer</Translate>
                  </h3>
                  <p className={styles.stepP}>
                    <Translate id="agents.setup.1.p">
                      In Deal Desk, open the account menu and choose Developer. Name the key after
                      where it will be used, choose what it may do, and press Create key. Copy it
                      then: it is shown once.
                    </Translate>
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div>
                  <h3 className={styles.stepH}>
                    <Translate id="agents.setup.2.h">Run the one command</Translate>
                  </h3>
                  <p className={styles.stepP}>
                    <Translate id="agents.setup.2.p">
                      For Claude Code it is one line. Developer shows it with your key already filled
                      in, next to the setup for Cursor, VS Code and Claude Desktop.
                    </Translate>
                  </p>
                  <pre className={own.code}>
                    <code>{CMD}</code>
                  </pre>
                  <p className={own.small}>
                    <Translate id="agents.setup.2.cli">
                      Prefer a terminal of your own? The dealdesk command line tool signs in through
                      your browser with dealdesk login, without pasting a key. The developer docs
                      explain how to set it up.
                    </Translate>
                  </p>
                </div>
              </div>
              <div className={styles.step}>
                <div>
                  <h3 className={styles.stepH}>
                    <Translate id="agents.setup.3.h">Ask your agent</Translate>
                  </h3>
                  <p className={styles.stepP}>
                    <Translate id="agents.setup.3.p">
                      “Draft a proposal from these call notes.” “What do we know about our safety
                      record?” “Upload this RFP to Deal Desk and draft every answer.” The draft lands
                      in Deal Desk, where you review it, brand it and send it.
                    </Translate>
                  </p>
                </div>
              </div>
            </div>
            <figure className={own.shot}>
              <img
                src={panel}
                width={1504}
                height={sfx ? 1410 : 1368}
                loading="lazy"
                alt={translate({
                  id: 'agents.shot.alt',
                  message:
                    'The Developer panel in Deal Desk: a key named Claude Code on my laptop with read and write access, and the Claude Code setup command.',
                })}
              />
              <figcaption>
                <Translate id="agents.shot.caption">
                  Developer, in the account menu. The key is shortened here; Deal Desk shows the
                  whole key once, when you create it.
                </Translate>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------------- clients ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="agents.clients.heading">Works in the tools you already use</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="agents.clients.note">
                Deal Desk is a remote MCP server at app.dealdesk.studio/mcp, with a REST API beside it.
                The ChatGPT app and the Connectors screens connect by signing in with Deal Desk.
              </Translate>
            </p>
          </div>
          <ClientTable />
        </div>
      </section>

      {/* ---------------- tools ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="agents.tools.heading">What the agent can ask Deal Desk for</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="agents.tools.note">
                Some of the tools a connected agent sees, and the permission each one needs.
              </Translate>
            </p>
          </div>
          <div className={styles.items}>
            {TOOLS.map((t) => (
              <div key={t.name} className={styles.item}>
                <div className={`${styles.itemName} ${own.tool}`}>{t.name}</div>
                <div className={styles.itemDesc}>{t.desc}</div>
                <div className={styles.itemCol}>{t.scope}</div>
              </div>
            ))}
          </div>
          <p className={own.small} style={{marginTop: '1rem'}}>
            <Translate id="agents.tools.more">
              The full list, the REST endpoints and the OpenAPI document are in the developer docs.
            </Translate>{' '}
            <Link to={`${DOCS}/mcp#tools`}>
              <Translate id="agents.tools.link">Every tool, with its inputs</Translate>
            </Link>
          </p>
        </div>
      </section>

      {/* ---------------- security ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="agents.security.heading">Security, in plain words</Translate>
            </h2>
          </div>
          <div className={styles.items}>
            {SECURITY.map((s) => (
              <div key={s.name} className={styles.item}>
                <div className={styles.itemName}>{s.name}</div>
                <div className={styles.itemDesc}>{s.desc}</div>
                <div className={styles.itemCol} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- plan ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="agents.plan.heading">Price</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="agents.plan.note">Drafting through an agent is free, as it is in the app.</Translate>
            </p>
          </div>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.itemName}>
                <Translate id="agents.plan.dev.name">Developer: API, MCP, CLI</Translate>
              </div>
              <div className={styles.itemDesc}>
                <Translate id="agents.plan.dev.desc">
                  Included on Starter, Pro and Team, with your company library: from $9 a month your
                  agent drafts from your company’s real facts, with citations, and drafts, reads and
                  updates proposals. Sending for signature counts as a sent deal, exactly as it does
                  in the app.
                </Translate>{' '}
                <Link to="/pricing">
                  <Translate id="agents.plan.link">See the plans</Translate>
                </Link>
              </div>
              <div className={styles.itemCol}>
                <Translate id="agents.plan.dev.col">from $9/month</Translate>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemName}>
                <Translate id="agents.plan.library.name">RFP tools</Translate>
              </div>
              <div className={styles.itemDesc}>
                <Translate id="agents.plan.library.desc">
                  start_rfp_response, get_rfp_requirements, draft_rfp_answer and the other RFP tools
                  come with the RFP responder add-on, as RFP responses do in the app.
                </Translate>{' '}
                <Link to="/rfp">
                  <Translate id="agents.plan.rfp">About the RFP responder</Translate>
                </Link>
              </div>
              <div className={styles.itemCol}>
                <Translate id="pricing.addon.price">+$49/month</Translate>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itemName}>
                <Translate id="agents.plan.partners.name">Design partners</Translate>
              </div>
              <div className={styles.itemDesc}>
                <Translate id="agents.plan.partners.desc">Everything above is included while the partnership runs.</Translate>
              </div>
              <div className={styles.itemCol}>
                <Translate id="agents.plan.partners.col">included</Translate>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.close}>
        <div className={styles.sheet}>
          <h2 className={styles.closeH}>
            <Translate id="agents.close.heading">Let the agent write. Let Deal Desk get it right.</Translate>
          </h2>
          <p className={styles.closeP}>
            <Translate id="agents.close.note">
              Create your account, choose Starter or above, and make your first key under Developer.
            </Translate>
          </p>
          <div className={styles.closeActions}>
            <Link className={styles.go} to={SIGNUP}>
              <Translate id="common.cta.startFree">Start free</Translate>
            </Link>
            <Link className={styles.alt} to="/help/ai-agents">
              <Translate id="agents.close.guide">Read the step-by-step guide</Translate>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
