---
title: Use Deal Desk alongside other MCP servers
sidebar_label: Alongside other MCP servers
description: Deal Desk answers for your company and leaves everything else to the other servers. A worked example with Gnarl, a private memory server.
---

# Use Deal Desk alongside other MCP servers

An agent such as Claude Code can use several MCP servers at once, and Deal Desk is designed to be
one of them: it answers for your company and leaves everything else to the other servers. A common
pairing is a private memory server that runs on your own computer. The example below uses
[Gnarl](https://gnarl.dev); any memory server fits the same way.

```bash
# Deal Desk: the company's library, facts and proposals
claude mcp add --transport http dealdesk https://app.dealdesk.studio/mcp --header "Authorization: Bearer ddk_live_..."
# Gnarl: private memory, on this computer
gnarl mcp install --port 43300 --no-tls
```

- The agent sees both sets of tools and uses the one each question needs.
- Private memories stay on your computer. The company's library, facts and proposals stay in Deal
  Desk.
- The two stores never merge. The agent combines them only in its conversation with you, and Deal
  Desk's answers carry citations, so you can always tell where a statement came from.

Before you give such an agent a key that can write, read
[Keep private things private](./private.md).
