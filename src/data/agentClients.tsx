import React from 'react';
import {translate} from '@docusaurus/Translate';

/**
 * The AI clients Deal Desk works with, and whether each works TODAY. One list, used by the home
 * page highlight, the /agents page and the developer docs, so the three cannot disagree.
 *
 * Status is a single field per client. The clients that connect by signing in with Deal Desk
 * (OAuth: the ChatGPT app, and the click-to-connect Connectors in claude.ai and Claude Desktop)
 * all take theirs from OAUTH below.
 *
 * ★ WHEN OAUTH SHIPS TO PROD, change the next line to 'available'. That is the whole change:
 * it flips those clients to Available everywhere, and shows the "Sign in with Deal Desk" setup
 * steps in the developer docs (<WhenOAuth>) in place of the "coming soon" note (<UntilOAuth>).
 */
export const OAUTH: Status = 'soon';

export type Status = 'available' | 'soon';
export type Client = {
  id: string;
  /** Product names stay as written in every language; only generic names are translated. */
  name: string;
  /** How it connects: one plain sentence. */
  how: string;
  status: Status;
};

export function agentClients(): Client[] {
  return [
    {
      id: 'chatgpt',
      name: translate({id: 'clients.chatgpt.name', message: 'ChatGPT'}),
      how: translate({
        id: 'clients.chatgpt.how',
        message: 'Add Deal Desk as a connector, then sign in with Deal Desk and approve.',
      }),
      status: OAUTH,
    },
    {
      id: 'claude-code',
      name: 'Claude Code',
      how: translate({id: 'clients.claudeCode.how', message: 'One command in the terminal, with an API key.'}),
      status: 'available',
    },
    {
      id: 'claude-desktop',
      name: 'Claude Desktop',
      how: translate({
        id: 'clients.claudeDesktop.how',
        message: 'An entry in its configuration file, with an API key.',
      }),
      status: 'available',
    },
    {
      id: 'connectors',
      name: translate({id: 'clients.connectors.name', message: 'Connectors in claude.ai and Claude Desktop'}),
      how: translate({
        id: 'clients.connectors.how',
        message: 'Add a custom connector with the Deal Desk address, then sign in with Deal Desk.',
      }),
      status: OAUTH,
    },
    {
      id: 'cursor',
      name: 'Cursor',
      how: translate({id: 'clients.cursor.how', message: 'A few lines in its MCP settings, with an API key.'}),
      status: 'available',
    },
    {
      id: 'vscode',
      name: 'VS Code / GitHub Copilot',
      how: translate({
        id: 'clients.vscode.how',
        message: 'A few lines in .vscode/mcp.json, then Copilot Chat in agent mode.',
      }),
      status: 'available',
    },
    {
      id: 'any',
      name: translate({id: 'clients.any.name', message: 'Any MCP-compatible agent'}),
      how: translate({
        id: 'clients.any.how',
        message: 'The remote MCP server, or the REST API for your own code, with an API key.',
      }),
      status: 'available',
    },
  ];
}

export const statusLabel = (s: Status): string =>
  s === 'available'
    ? translate({id: 'clients.status.available', message: 'Available'})
    : translate({id: 'clients.status.soon', message: 'Coming soon'});

/** Children shown only once sign-in with Deal Desk (OAuth) is live. */
export function WhenOAuth({children}: {children: React.ReactNode}): React.ReactElement | null {
  return OAUTH === 'available' ? <>{children}</> : null;
}
/** Children shown only until it is. */
export function UntilOAuth({children}: {children: React.ReactNode}): React.ReactElement | null {
  return OAUTH === 'available' ? null : <>{children}</>;
}
