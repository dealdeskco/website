---
title: REST API reference
sidebar_label: REST API reference
description: Every /api/v1 endpoint with its method, path, scope, parameters, an example and the response, plus errors and limits.
toc_max_heading_level: 2
---

# REST API reference

Base URL `https://app.dealdesk.studio/api/v1`. JSON in and out (`Content-Type: application/json`),
except file downloads. The machine-readable description is at
[`/api/v1/openapi.json`](https://app.dealdesk.studio/api/v1/openapi.json) (OpenAPI 3.1).

- Every request carries an API key: `Authorization: Bearer ddk_live_...`. See
  [API keys and scopes](./authentication.md).
- Files go up in JSON: `{"name": "rfp.pdf", "data": "<base64>", "content_type": "application/pdf"}`,
  or `{"name": "notes.txt", "text": "..."}`. Up to about 12 MB per file.
- CORS is open to any origin without credentials: the API reads no cookies, so a browser page can
  only call it with a key it already holds.
- Long work (reading a document, drafting every answer) runs in the background. The call returns at
  once with an id to poll.

## Endpoints

| Method | Path | Scope | What it does |
| --- | --- | --- | --- |
| `GET` | [`/account`](#get-account) | `read` | The account, plan and features this key acts for |
| `GET` | [`/facts`](#get-facts) | `read` | Facts the company told Deal Desk |
| `POST` | [`/facts`](#post-facts) | `write` | Teach facts in plain words, or ask what it knows |
| `DELETE` | [`/facts/{id}`](#delete-factsid) | `write` | Remove a fact |
| `GET` | [`/facts/gaps`](#get-factsgaps) | `read` | Facts open RFP responses still need |
| `POST` | [`/library/search`](#post-librarysearch) | `read` | Search the library; passages come back numbered, to cite |
| `GET` | [`/library/sources`](#get-librarysources) | `read` | Documents in the library |
| `POST` | [`/library/sources`](#post-librarysources) | `write` | Add a document or text to the library |
| `DELETE` | [`/library/sources/{id}`](#delete-librarysourcesid) | `write` | Remove a document from the library |
| `GET` | [`/library/sources/{id}`](#get-librarysourcesid) | `read` | One library document and its indexing status |
| `GET` | [`/proposals`](#get-proposals) | `read` | Proposals, orders and agreements, newest first |
| `POST` | [`/proposals`](#post-proposals) | `write` | Draft a proposal from notes, saved as a draft |
| `GET` | [`/proposals/{number}`](#get-proposalsnumber) | `read` | One proposal: its fields, line items and totals |
| `PATCH` | [`/proposals/{number}`](#patch-proposalsnumber) | `write` | Change a proposal's fields, line items or discounts |
| `GET` | [`/proposals/{number}/pdf`](#get-proposalsnumberpdf) | `read` | The proposal as a PDF |
| `POST` | [`/proposals/{number}/send`](#post-proposalsnumbersend) | `send` | Send for e-signature; billed as a sent deal |
| `GET` | [`/rfps`](#get-rfps) | `read` | Documents being answered |
| `POST` | [`/rfps`](#post-rfps) | `write` | Upload a document to answer |
| `DELETE` | [`/rfps/{id}`](#delete-rfpsid) | `write` | Delete a response |
| `GET` | [`/rfps/{id}`](#get-rfpsid) | `read` | Status and progress of one response |
| `POST` | [`/rfps/{id}/draft-all`](#post-rfpsiddraft-all) | `write` | Draft every open requirement in the background |
| `GET` | [`/rfps/{id}/export`](#get-rfpsidexport) | `read` | The filled-in original, or the compliance matrix as CSV |
| `GET` | [`/rfps/{id}/requirements`](#get-rfpsidrequirements) | `read` | Requirements with drafted answers and citations |
| `PATCH` | [`/rfps/{id}/requirements/{rid}`](#patch-rfpsidrequirementsrid) | `write` | Edit an answer, or mark it answered |
| `POST` | [`/rfps/{id}/requirements/{rid}/draft`](#post-rfpsidrequirementsriddraft) | `write` | Draft or redraft one answer from the library |
| `POST` | [`/rfps/{id}/requirements/{rid}/fact`](#post-rfpsidrequirementsridfact) | `write` | Give the fact a requirement is missing |

## Errors

Every error has one shape:

```json
{ "error": { "code": "payment_required", "message": "Responding to a document is part of the RFP responder add-on. …", "billing_required": true, "required_addon": "rfp" } }
```

The `error` object carries `code` and `message`, and where they apply `billing_required`,
`required_addon`, `feature`, `required_scope`, `retry_after` and `needs_force`.

| Status | code | Meaning |
| --- | --- | --- |
| 400 | `invalid_request` | Something in the request is missing or wrong; the message says what. |
| 401 | `unauthenticated` | No key, an invalid or revoked key, or its creator is no longer an admin. |
| 402 | `payment_required` | The plan does not include this: Developer starts on Starter; RFP responses need the RFP responder; sending past the Free plan's allowance. |
| 403 | `insufficient_scope` | The key lacks the scope (`required_scope` says which). Other refusals answer `forbidden`. |
| 404 | `not_found` | No such thing in this account. Another account's ids are indistinguishable from ids that do not exist. |
| 405 | `method_not_allowed` | That method is not offered on that path. |
| 409 | `conflict` | Changed since you read it, already running, or a limit reached. |
| 410 | `gone` | It existed and has been removed. |
| 413 / 415 / 422 | `payload_too_large` / `unsupported_media_type` / `unprocessable` | The file is too large, of a type Deal Desk cannot read, or has no readable text (a scanned PDF). |
| 429 | `rate_limited` | Too many requests; wait `Retry-After` seconds. |
| 5xx | `internal_error` / `upstream_error` / `unavailable` | Our side. Retry with backoff. |

## Limits

| What | Limit |
| --- | --- |
| Requests per key | 120 a minute (MCP calls included) |
| PDF renders per key | 10 a minute |
| Request body | 16 MB (about 12 MB of file, base64-encoded) |
| Keys per account | 20 |
| Library | 200 documents, ~100 pages each |
| Drafting, reading and teaching | The same per-account limits as the app |

## Account {/* #account */}

### `GET /account`

Scope `read`. The account, plan and features this key acts for, and the key itself (never its
secret). `features` includes `library` when the company library and facts are available (every
paid plan) and `documents` when RFP responses are (the RFP responder add-on).

```bash
curl https://app.dealdesk.studio/api/v1/account -H "Authorization: Bearer $DEALDESK_API_KEY"
```

```js
// 200
{ "account": { "id": "7f3a9c2e1b4d", "name": "Acme Federal", "plan": "pro", "features": ["documents", "developer"], "can_send": true },
  "key": { "id": "key_4be0c2a19f7d3e61", "name": "Claude Code", "prefix": "ddk_live_Q7xm", "last4": "pA2k", "scopes": ["read", "write"], ... },
  "acting_as": "owner@acme.example" }
```

### `POST /auth/revoke`

Any scope. Revoke the key making the request. `dealdesk logout` uses it.

## Library

The library, **What we know** in the app, is included on every paid plan, from Starter.

### `POST /library/search`

Scope `read`. Body: `query` (required). The passages that best answer a question (keyword and
semantic search, fused), numbered for citation.

```bash
curl https://app.dealdesk.studio/api/v1/library/search -H "Authorization: Bearer $DEALDESK_API_KEY" \
  -H "Content-Type: application/json" -d '{"query": "ISO 27001 certification"}'
```

```js
// 200
{ "query": "ISO 27001 certification",
  "results": [ { "citation": 1, "source_id": "9b2...", "source_name": "Security overview 2026.docx", "heading": "Certifications",
                 "text": "Acme Federal has been ISO/IEC 27001 certified since 2023 ..." } ] }
```

### `GET /library/sources`

Scope `read`. Documents in the library, newest first, with `status` (`indexing`, `ready`,
`failed`) and passage counts. Returns `{"sources": [...]}`.

```bash
curl https://app.dealdesk.studio/api/v1/library/sources -H "Authorization: Bearer $DEALDESK_API_KEY"
```

### `POST /library/sources`

Scope `write`. Body: `name` (required), and either `text`, or `data` (base64) with `content_type`.
Adds a .docx, .pdf or text document to the library.

```bash
curl https://app.dealdesk.studio/api/v1/library/sources -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \
  -d "{\"name\": \"capabilities.pdf\", \"content_type\": \"application/pdf\", \"data\": \"$(base64 < capabilities.pdf | tr -d '\n')\"}"
```

Answers `200` with `{"source": {"id": ..., "status": "indexing"}}`; poll the next call until
`ready`.

### `GET /library/sources/{id}`

Scope `read`. One library document and its indexing status, as `{"source": {...}}`.

### `DELETE /library/sources/{id}`

Scope `write`. Remove a document from the library.

## Facts

Facts are what people told Deal Desk about the company. They are part of the library, on every paid
plan from Starter.

### `POST /facts`

Scope `write`. Body: `message` (required). Teach Deal Desk in plain words. Only what the message
states is kept, one fact per topic (a later fact on the same topic replaces it). A question gets an
answer from the library, with its sources.

```bash
curl https://app.dealdesk.studio/api/v1/facts -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \
  -d '{"message": "We have 18 employees, 12 of them with TS/SCI clearances."}'
```

```js
// 200
{ "reply": "I will remember that Acme Federal has 18 employees, 12 with TS/SCI clearances.",
  "saved": [ { "topic": "Employee count", "text": "Acme Federal has 18 employees." },
             { "topic": "Cleared staff", "text": "12 Acme Federal employees hold TS/SCI clearances." } ],
  "not_saved": 0, "sources": [] }
```

### `GET /facts`

Scope `read`. The facts taught so far, as `{"facts": [{"id", "topic", "text", "created_at"}]}`.

### `DELETE /facts/{id}`

Scope `write`. Remove a wrong or outdated fact. To correct one, you can also teach the right fact
on the same topic.

### `GET /facts/gaps`

Scope `read`. Facts your open RFP responses still need, as `{"gaps": [...]}`: good questions to
ask the person, then save the answers with `POST /facts`.

## Proposals

### `POST /proposals`

Scope `write`. Body: `notes` (required), `lang` (optional). Draft a proposal from notes and save it
as a draft. `lang` is `en` (default), `es-419` or `es-ES`. Free.

```bash
curl https://app.dealdesk.studio/api/v1/proposals -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \
  -d '{"notes": "Call with Maya Torres at Northwind. Annual platform license $24,000, onboarding $3,500 one-time, 10% off year one. Start Jan 5."}'
```

```js
// 200
{ "proposal": { "number": "DD-2026-0042", "status": "draft", "version": 1,
    "fields": { "docType": "proposal", "custName": "Northwind", "custSigner": "Maya Torres", "startDate": "2027-01-05", "currency": "USD", ... },
    "lineItems": [ { "desc": "Annual platform license", "y1": 24000, "y2": 24000 }, { "desc": "Onboarding", "y1": 3500, "y2": 0 } ],
    "discounts": [ { "label": "Year-one discount", "kind": "pct", "value": 10, "y1": true, "y2": false } ],
    "totals": { "y1": { "subtotal": 27500, "net": 24750, "tax": 0, "total": 24750, ... }, "y2": { ... } }, ... } }
```

### `GET /proposals`

Scope `read`. Proposals, orders and agreements, newest first, as `{"proposals": [...]}`: each with
`number`, `doc_type`, `customer`, `status` (draft, sent, signed, lost), `y1_total`, `y2_total`,
`version` and dates.

```bash
curl https://app.dealdesk.studio/api/v1/proposals -H "Authorization: Bearer $DEALDESK_API_KEY"
```

### `GET /proposals/{number}`

Scope `read`. One proposal by its number, for example `DD-2026-0042`: every field, the line items,
discounts and totals per year, in the same shape as the draft above, plus `signing`: one entry per
party (`cust` for the customer, `luc` for your signer) with `method`, `signer_name`, `email`,
`completed_at` and `authenticated`.

### `PATCH /proposals/{number}`

Scope `write`. Set `fields` by name, or replace `lineItems` / `discounts` whole. Pass the `version`
you read to be refused (`409`) if someone changed it since. Fields: `docType` (proposal, order,
agreement), `docLang`, `custName`, `custSigner`, `custTitle`, `custEmail`, `deployDesc`,
`edition`, `region`, `scale`, `currency`, `billing` (Annual, Quarterly, Monthly, One-time),
`term`, `startDate`, `validUntil` (YYYY-MM-DD), `sla`, `support`, `lucSigner`, `lucTitle`,
`lucEmail`, `governingLaw`, `sow`, `taxLabel`, `taxRate`, `termsAssumptions`, `termsConditions`.
It never changes the status: sending is separate.

```bash
curl -X PATCH https://app.dealdesk.studio/api/v1/proposals/DD-2026-0042 -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \
  -d '{"version": 1, "fields": {"term": "12 months", "validUntil": "2026-12-31"}}'
```

### `GET /proposals/{number}/pdf`

Scope `read`. The PDF, rendered exactly like Export PDF in the app.

```bash
curl -o DD-2026-0042.pdf https://app.dealdesk.studio/api/v1/proposals/DD-2026-0042/pdf -H "Authorization: Bearer $DEALDESK_API_KEY"
```

### `POST /proposals/{number}/send`

Scope `send`. Emails the customer a link to review and sign the proposal with Deal Desk's own
e-signature, plus a one-time code when email is available. **Billed as a sent deal**, through the
same path as Send in the app: if the plan's sending allowance is used up, the call is refused
(`402`) before any email goes out. Body: `customer_email` (required), `customer_name` and
`customer_title` (optional). A proposal that is already signed returns `409`. Only send when the
person has said to.

The response includes the signing `link` and `mail_status`, so you can pass the link on yourself
if the email could not be delivered. `mail_status` is `sent`, `failed` or `not_configured`:

```js
// 200
{ "status": "sent",
  "signing": { "emailed": true, "mail_status": "sent", "one_time_code": true, "expires_in_hours": 72,
               "link": "https://app.dealdesk.studio/sign/..." } }
```

## RFP responses

RFP responses need the RFP responder add-on.

### `POST /rfps`

Scope `write`. Upload a document to answer: `.pdf`, `.docx` (it can be filled back in), `.xlsx`
capability matrix, or text. Body: `name` (required), `text` or `data` with `content_type`, and an
optional `deal_number` that grounds the answers in that proposal. Reading runs in the background.

```bash
curl https://app.dealdesk.studio/api/v1/rfps -H "Authorization: Bearer $DEALDESK_API_KEY" -H "Content-Type: application/json" \
  -d "{\"name\": \"RFP-2026-14.docx\", \"data\": \"$(base64 < RFP-2026-14.docx | tr -d '\n')\"}"
```

Returns `{"rfp": {"id": ..., "status": "reading", ...}}`. Poll `GET /rfps/{id}` until it is ready.

### `GET /rfps`

Scope `read`. Documents being answered, newest first, as `{"rfps": [...]}`, each with its status
and how many requirements it has.

### `GET /rfps/{id}`

Scope `read`. Status (`reading`, `ready`, `failed`), counts by answer status, how many still need a
fact, and drafting progress.

### `GET /rfps/{id}/requirements`

Scope `read`. In document order. Query: `status`, `needs_input=true`, `offset`, `limit` (default
50, max 200).

```js
// 200
{ "total": 214, "offset": 0, "limit": 50, "rfp": { ... },
  "requirements": [ { "id": "r12", "ref": "L.3.2", "section": "Key personnel", "text": "Describe the qualifications of the program manager.",
    "status": "drafted", "response": "Our program manager holds a PMP and led the NGA Maven pilot [1].",
    "answer": "Our program manager holds a PMP and led the NGA Maven pilot.", "needs_input": null,
    "sources": [ { "citation": 1, "source_name": "Resumes 2026.docx", "heading": "Program manager" } ], "unverified_claims": [] } ] }
```

### `POST /rfps/{id}/requirements/{rid}/draft`

Scope `write`. Draft or redraft one answer. When the library cannot support one, `needs_input`
names the missing fact instead. Returns `{"requirement": {...}}`.

### `POST /rfps/{id}/draft-all`

Scope `write`. Draft every open requirement in the background; answers a person edited are never
overwritten. `{"cancel": true}` stops it.

### `PATCH /rfps/{id}/requirements/{rid}`

Scope `write`. `response` and/or `status` (`open`, `drafted`, `answered`, `na`). An answer marked
`answered` joins the library as approved wording.

### `POST /rfps/{id}/requirements/{rid}/fact`

Scope `write`. `{"answer": "..."}`: the fact the requirement was missing. It is kept for every
future document and this answer is redrafted.

### `GET /rfps/{id}/export`

Scope `read`. Query: `format=filled` (default), the original .docx or .xlsx with your answers
written in, or `format=csv`, the compliance matrix.

```bash
curl -OJ "https://app.dealdesk.studio/api/v1/rfps/$RFP_ID/export?format=filled" -H "Authorization: Bearer $DEALDESK_API_KEY"
```

### `DELETE /rfps/{id}`

Scope `write`. Delete a response.
