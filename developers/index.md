---
slug: /
title: Deal Desk for developers
sidebar_label: Overview and quick start
description: Connect your agents to Deal Desk with a remote MCP server, a REST API and a command line tool, and draft proposals and RFP answers from your company's own library.
---

# Deal Desk for developers

Your team already writes proposals with Claude, Cursor and Copilot. Connect them to Deal Desk and
they draft from what your company actually knows, with citations, while your library stays in
Deal Desk. Deal Desk does the parts that have to be right: the pricing, the document and the
signature.

There are three ways in, all with the same API key:

| Way in | What it is |
| --- | --- |
| [Remote MCP server](./mcp.mdx) | `https://app.dealdesk.studio/mcp`, for Claude Code, Cursor, VS Code / GitHub Copilot, Claude Desktop and any MCP client. |
| [REST API](./api.md) | `https://app.dealdesk.studio/api/v1`, described by an [OpenAPI document](https://app.dealdesk.studio/api/v1/openapi.json). |
| [Command line tool](./cli.md) | `dealdesk`, for your terminal and your scripts. |

## Quick start

1. **Create an API key.** In Deal Desk, open the account menu and choose **Developer**, then
   **Create key**. You need to be an account owner or admin, on the Starter plan or above. The key
   is shown once: copy it then.
2. **Connect your agent.** For Claude Code it is one command (other clients are in
   [MCP server](./mcp.mdx#connect-a-client)):

   ```bash
   claude mcp add --transport http dealdesk https://app.dealdesk.studio/mcp --header "Authorization: Bearer ddk_live_..."
   ```

3. **Ask.** "Search our Deal Desk library for our ISO certifications", "Draft a proposal from
   these call notes", or "Upload this RFP to Deal Desk and draft every answer".

Prefer a terminal? `dealdesk login` signs the [command line tool](./cli.md) in through your browser
without pasting a key.

## Your first call

The same key works over plain HTTPS. This returns the account, plan and features the key acts for:

```bash
curl https://app.dealdesk.studio/api/v1/account -H "Authorization: Bearer $DEALDESK_API_KEY"
```

## What it costs

Developer access is included on **Starter, Pro and Team**. On Free, the Developer section is
visible but keys cannot be created, and existing keys answer `402`.

- **Drafting is free**, through the API exactly as in the app: drafting a proposal, drafting
  answers, searching the library.
- **Sending is metered** exactly as in the app: a proposal sent for signature counts as one sent
  deal on your plan, once, however many times it is re-sent.
- The company library and facts are included on every paid plan, from Starter. RFP responses need
  the **RFP responder** add-on, as in the app; without it those calls answer `402` with
  `"required_addon": "rfp"`.

See [Pricing](/pricing) for the plans, and [Deal Desk for your AI agent](/agents) for what this
looks like from the agent's side.
