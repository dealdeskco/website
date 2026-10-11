import React from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, {translate} from '@docusaurus/Translate';
import AgentSession from '@site/src/components/AgentSession';
import ClientTable from '@site/src/components/ClientTable';
// The landing page's primitives, and the agents page's tables and code, so the siblings match.
import styles from './index.module.css';
import own from './agents.module.css';
import dev from './developers.module.css';

const APP = 'https://app.dealdesk.studio';
const SIGNUP = `${APP}/login?signup=1`;
const DOCS = '/docs/developers';
const OPENAPI = `${APP}/api/v1/openapi.json`;

// The three ways in. The samples are the developer docs' own, character for character.
const WAYS = [
  {
    name: translate({id: 'developers.ways.mcp.name', message: 'MCP server'}),
    desc: translate({
      id: 'developers.ways.mcp.desc',
      message: 'For Claude Code, Cursor, VS Code / GitHub Copilot, Claude Desktop and any MCP client. One command, and the agent sees the Deal Desk tools.',
    }),
    code: 'claude mcp add --transport http dealdesk https://app.dealdesk.studio/mcp --header "Authorization: Bearer ddk_live_..."',
    to: `${DOCS}/mcp`,
    link: translate({id: 'developers.ways.mcp.link', message: 'MCP server and tools'}),
  },
  {
    name: translate({id: 'developers.ways.api.name', message: 'REST API'}),
    desc: translate({
      id: 'developers.ways.api.desc',
      message: 'For your own code. JSON over HTTPS at /api/v1, described by an OpenAPI document.',
    }),
    code:
      'curl https://app.dealdesk.studio/api/v1/proposals -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \\\n  -d \'{"notes": "Call with Maya Torres at Northwind. Annual platform license $24,000, onboarding $3,500 one-time, 10% off year one. Start Jan 5."}\'',
    to: `${DOCS}/api`,
    link: translate({id: 'developers.ways.api.link', message: 'REST API reference'}),
  },
  {
    name: translate({id: 'developers.ways.cli.name', message: 'dealdesk command line tool'}),
    desc: translate({
      id: 'developers.ways.cli.desc',
      message: 'For your terminal and scripts. Signs in through the browser, so there is no key to paste.',
    }),
    code: 'dealdesk login',
    to: `${DOCS}/cli`,
    link: translate({id: 'developers.ways.cli.link', message: 'Command line tool'}),
  },
];

const SCOPES = [
  {
    name: 'read',
    desc: translate({id: 'developers.scopes.read', message: 'Search the library, list facts, read proposals and RFP responses. Every key has it.'}),
  },
  {
    name: 'write',
    desc: translate({id: 'developers.scopes.write', message: 'Add documents, teach facts, draft proposals and answers, edit and approve answers.'}),
  },
  {
    name: 'send',
    desc: translate({
      id: 'developers.scopes.send',
      message: 'Send a proposal for e-signature, billed like a send from the app. Only when you tick Allow sending.',
    }),
  },
];

const SECURITY = [
  {
    name: translate({id: 'developers.security.hash.name', message: 'Hashed, shown once'}),
    desc: translate({
      id: 'developers.security.hash.desc',
      message: 'Deal Desk keeps only a SHA-256 hash of each key, compares it in constant time, and logs requests by key id, never the key. Revoking one stops it at once.',
    }),
  },
  {
    name: translate({id: 'developers.security.account.name', message: 'Confined to your account'}),
    desc: translate({
      id: 'developers.security.account.desc',
      message: 'Every call runs through the same checks as the app, for the key’s own account only. Your library stays in Deal Desk; agents receive only the passages a question needs.',
    }),
  },
  {
    name: translate({id: 'developers.security.private.name', message: 'Private stays private'}),
    desc: translate({
      id: 'developers.security.private.desc',
      message: 'Next to a private memory server such as Gnarl, the two stores never merge. A read-only key rules out an agent copying private notes into the company library.',
    }),
  },
];

const DOC_LINKS = [
  {to: DOCS, name: translate({id: 'developers.docs.quickstart', message: 'Overview and quick start'})},
  {to: `${DOCS}/authentication`, name: translate({id: 'developers.docs.auth', message: 'API keys and scopes'})},
  {to: `${DOCS}/mcp`, name: translate({id: 'developers.docs.mcp', message: 'MCP server, client setup and tools'})},
  {to: `${DOCS}/clients`, name: translate({id: 'developers.docs.clients', message: 'Which clients can connect'})},
  {to: `${DOCS}/api`, name: translate({id: 'developers.docs.api', message: 'REST API reference'})},
  {to: `${DOCS}/cli`, name: translate({id: 'developers.docs.cli', message: 'Command line tool'})},
  {href: OPENAPI, name: translate({id: 'developers.docs.openapi', message: 'OpenAPI document (JSON)'})},
];

export default function Developers(): React.ReactElement {
  const {i18n} = useDocusaurusContext();
  const sfx = i18n.currentLocale === 'en' ? '' : `-${i18n.currentLocale}`;
  const og = `https://dealdesk.studio/img/agents/agents-social${sfx}.png`;
  return (
    <Layout
      title={translate({id: 'developers.meta.title', message: 'Developers'})}
      description={translate({
        id: 'developers.meta.description',
        message:
          'Deal Desk is the proposal engine and company library behind your agent: a remote MCP server, a REST API and a command line tool, all with one API key.',
      })}>
      <Head>
        <meta property="og:image" content={og} />
        <meta name="twitter:image" content={og} />
      </Head>
      <header className={`${styles.masthead} ${styles.mastShort}`}>
        <div className={styles.sheet}>
          <div className={own.heroGrid}>
            <h1 className={styles.title}>
              <Translate id="developers.title">The proposal engine behind your agent.</Translate>
            </h1>
            <div>
              <p className={styles.lede}>
                <Translate id="developers.lede">
                  Your agent writes. Deal Desk answers for the company: cited facts from its library,
                  priced proposals with the totals computed, documents and e-signature. One API key,
                  three ways in.
                </Translate>
              </p>
              <div className={styles.actions}>
                <Link className={styles.go} to={DOCS}>
                  <Translate id="developers.cta.quickstart">Read the quick start</Translate>
                </Link>
                <Link className={styles.alt} to={`${DOCS}/api`}>
                  <Translate id="developers.cta.api">API reference</Translate>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.rule} />
          <div className={own.demo}>
            <AgentSession />
          </div>
        </div>
      </header>

      {/* ---------------- the three ways in ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="developers.ways.heading">Three ways in, one key</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="developers.ways.note">
                Create the key in Deal Desk, under Developer in the account menu. It is shown once.
              </Translate>
            </p>
          </div>
          <div className={dev.ways}>
            {WAYS.map((w) => (
              <div key={w.name} className={dev.way}>
                <div className={dev.wayHead}>
                  <h3 className={dev.wayName}>{w.name}</h3>
                  <p className={dev.wayDesc}>
                    {w.desc} <Link to={w.to}>{w.link}</Link>
                  </p>
                </div>
                <pre className={`${own.code} ${dev.wayCode}`}>
                  <code>{w.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- scopes ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="developers.scopes.heading">Keys and scopes</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="developers.scopes.note">
                One key per agent or computer, so revoking one leaves the rest working.
              </Translate>
            </p>
          </div>
          <div className={styles.items}>
            {SCOPES.map((s) => (
              <div key={s.name} className={styles.item}>
                <div className={`${styles.itemName} ${own.tool}`}>{s.name}</div>
                <div className={styles.itemDesc}>{s.desc}</div>
                <div className={styles.itemCol} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- clients ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="developers.clients.heading">Clients</Translate>
            </h2>
            <p className={styles.note}>
              <Translate id="developers.clients.note">
                The remote MCP server is at app.dealdesk.studio/mcp.
              </Translate>
            </p>
          </div>
          <ClientTable />
        </div>
      </section>

      {/* ---------------- security ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={styles.sectionHead}>
            <h2 className={styles.h2}>
              <Translate id="developers.security.heading">Security</Translate>
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

      {/* ---------------- price and docs ---------------- */}
      <section className={styles.section}>
        <div className={styles.sheet}>
          <div className={dev.split}>
            <div>
              <h2 className={styles.h2}>
                <Translate id="developers.price.heading">Included from Starter</Translate>
              </h2>
              <div className={styles.items} style={{marginTop: '1.2rem'}}>
                <div className={styles.item}>
                  <div className={styles.itemName}>
                    <Translate id="agents.plan.dev.name">Developer: API, MCP, CLI</Translate>
                  </div>
                  <div className={styles.itemDesc}>
                    <Translate id="developers.price.desc">
                      Starter, Pro and Team. Drafting through the API is free; a send counts as a sent
                      deal, as in the app. The library, facts and RFP tools need the RFP responder
                      add-on.
                    </Translate>{' '}
                    <Link to="/pricing">
                      <Translate id="agents.plan.link">See the plans</Translate>
                    </Link>
                  </div>
                  <div className={styles.itemCol}>
                    <Translate id="agents.plan.dev.col">from $9/month</Translate>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className={styles.h2}>
                <Translate id="developers.docs.heading">Documentation</Translate>
              </h2>
              <ul className={dev.docList}>
                {DOC_LINKS.map((d) => (
                  <li key={d.name}>{d.href ? <Link href={d.href}>{d.name}</Link> : <Link to={d.to}>{d.name}</Link>}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.close}>
        <div className={styles.sheet}>
          <h2 className={styles.closeH}>
            <Translate id="developers.close.heading">Make the first call today.</Translate>
          </h2>
          <p className={styles.closeP}>
            <Translate id="developers.close.note">
              Create your account, choose Starter or above, and make a key under Developer.
            </Translate>
          </p>
          <div className={styles.closeActions}>
            <Link className={styles.go} to={SIGNUP}>
              <Translate id="common.cta.startFree">Start free</Translate>
            </Link>
            <Link className={styles.alt} to="/agents">
              <Translate id="developers.close.agents">What your team will see</Translate>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
