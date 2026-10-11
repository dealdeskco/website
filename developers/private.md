---
title: Keep private things private
sidebar_label: Security and privacy
description: What an agent connected to Deal Desk can see and change, and how to keep private information out of the company library.
---

# Keep private things private

An agent connected to several MCP servers can carry information from one to another. Decide what it
may write to Deal Desk.

- With a read-and-write key, an agent could copy something from another tool, such as a private
  memory, into the company library by teaching it to Deal Desk as a fact. Everyone in the account
  would then see it.
- To rule that out, give the agent a read-only key. It can still search the library and read
  proposals and RFP responses, but it cannot change anything.
- Clients such as Claude Code ask before each tool call unless you have allowed that tool. Before
  you approve a `teach_fact` or `add_library_document` call, read what it would send.
- Never put a key in a shared repository. Use one key per agent or computer, so you can revoke any
  one without stopping the rest.

## Security

- Your library stays in Deal Desk. Agents receive only the passages a question needs, and every call
  is confined to the key's own account, through the same checks as the app.
- Keys are stored as SHA-256 hashes, compared in constant time, shown once, and revocable at once.
  Requests are logged with the key's id, never the key.
- Command line sign-in codes last ten minutes, work once, and are approved only by a signed-in
  admin of the account. The approval page shows where the request came from; approve only a request
  you started.
- The command line tool sends a key only over HTTPS (plain HTTP only to localhost) and stores it
  with permissions 0600.
