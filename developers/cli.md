---
title: The dealdesk command line tool
sidebar_label: Command line tool
description: Sign in through the browser, then search the library, teach facts, draft proposals, answer RFPs and set up MCP clients from the terminal.
---

# The dealdesk command line tool

One file, no dependencies, Node.js 18 or later. It is not on npm yet; until it is, run it from a
checkout of the Deal Desk repository:

```bash
git clone https://github.com/dealdeskco/dealdesk.git
npm install -g ./dealdesk/cli        # puts `dealdesk` on your PATH
dealdesk --help
```

Once published it will be `npx @dealdesk/cli` or `npm install -g @dealdesk/cli`.

## Signing in

```bash
dealdesk login
```

The command shows a short code and opens `https://app.dealdesk.studio/cli`. Sign in as an account
owner or admin, check that the code matches, and approve. The tool receives a new key of its own
("CLI on *your computer*") and saves it in `~/.config/dealdesk/credentials.json`, readable only by
you. No key ever appears in a URL. `dealdesk logout` revokes that key.

For CI and scripts, set `DEALDESK_API_KEY`, or save a key with `dealdesk login --key ddk_live_...`.
`DEALDESK_API_KEY` in the environment wins over a saved key. `dealdesk logout` forgets a saved key
without revoking it unless you add `--revoke`.

## Commands

```bash
dealdesk whoami
dealdesk library search "past performance with NGA"
dealdesk library add capabilities.pdf
dealdesk teach "We are ISO 9001 certified since 2021."
dealdesk facts list
dealdesk draft --notes call-notes.txt          # or: pbpaste | dealdesk draft --notes -
dealdesk proposals list
dealdesk proposals pdf DD-2026-0042 -o proposal.pdf
dealdesk rfp upload RFP-2026-14.docx --wait
dealdesk rfp draft <id> --all --wait
dealdesk rfp requirements <id> --needs-input
dealdesk rfp export <id>                       # the original .docx, filled in
dealdesk mcp                                   # setup for every MCP client, with your key
dealdesk mcp install claude-code
```

The full set:

| Command | What it does |
| --- | --- |
| `dealdesk whoami` | The account, plan and key in use. |
| `dealdesk library list` | Documents in the library. |
| `dealdesk library search "<question>"` | Passages that answer a question, with citations. |
| `dealdesk library add <file>` | Add a .docx, .pdf or text file to the library. |
| `dealdesk teach "<fact>"` | Tell Deal Desk a fact about the company. |
| `dealdesk facts list` | The facts taught so far. |
| `dealdesk facts remove <id>` | Remove a fact. |
| `dealdesk draft --notes <file>` | Draft a proposal from notes (`-` reads standard input). |
| `dealdesk proposals list` | Proposals, newest first. |
| `dealdesk proposals get <number>` | One proposal. |
| `dealdesk proposals pdf <number> -o <file>` | Download a proposal as a PDF. |
| `dealdesk rfp upload <file> --wait` | Upload an RFP and wait until it is read. |
| `dealdesk rfp status <id>` | Reading progress and answer counts. |
| `dealdesk rfp requirements <id> --needs-input` | Requirements, optionally only those waiting on a fact. |
| `dealdesk rfp draft <id> --all --wait` | Draft every open answer; or `dealdesk rfp draft <id> <rid>` for one. |
| `dealdesk rfp export <id>` | The original .docx or .xlsx, filled in; `--format csv` for the compliance matrix. |
| `dealdesk mcp` | The MCP setup for every client, with your key filled in. |
| `dealdesk mcp install claude-code` | Runs `claude mcp add` for you (`--scope user`, `project` or `local`). |
| `dealdesk login` / `dealdesk logout` | Sign in through the browser; sign out and revoke. |

Every command takes `--json` for scripting. Errors go to standard error; the exit code is 1 for a
failed request and 2 for a usage error.

## Other servers

`--staging` talks to `https://app-staging.dealdesk.studio`; `--base-url <url>` (or
`DEALDESK_BASE_URL`) to any other. Keys are saved per server, and a key is only ever sent over
HTTPS (plain HTTP is allowed for `localhost` alone, for running the app locally).

## Verify a deployment

After every deploy, run the smoke check from a checkout of the repository against that stage. It
uses the key `dealdesk login` saved for that server (or `DEALDESK_API_KEY`), so no key is pasted,
and it never prints one:

```bash
dealdesk login --staging                               # once, approved in the browser
node scripts/smoke-developer.mjs --staging             # read-only checks
node scripts/smoke-developer.mjs --staging --write     # also teach and remove a probe fact, draft a probe proposal
DEALDESK_API_KEY=... node scripts/smoke-developer.mjs --base-url https://app.dealdesk.studio
```

It checks the OpenAPI document, the account, library list and search, facts, proposals and RFP
lists, MCP `initialize`, `tools/list` and `tools/call`, `dealdesk whoami --json`, that an invalid
key gets `401` in the error envelope, and the CORS preflight on `/mcp`. It prints one line per check
with its timing and exits 1 if any check fails. Checks the account's plan does not include are
skipped, not failed. Nothing is ever sent.
