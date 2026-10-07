---
title: Privacy
description: What Deal Desk Studio collects, why, and what we never do with it.
---

# Privacy

_Last updated 7 October 2026._

Deal Desk Studio is a tool businesses use to write and send proposals. This page describes what
we hold and why, in plain terms.

## What we hold

**Your account.** Name, email address, company profile (name, logo, website, signatory, your terms
language). You give us these; you can change or remove them at any time from Company Profile.

**Your deals.** The proposals you draft, their line items and prices, and their status. These are
yours. We do not read them to build features, train models, or compile market data.

**Signing records.** When a document is signed we record who signed, when, from what IP address and
browser, how their identity was established, and the signature itself. This exists so a signature
can be evidenced later, which is the entire point of it. It is written to your account's own
storage.

**Nothing else.** No advertising identifiers, no cross-site tracking, no third-party analytics on
the application.

## Who else sees it

- **Your Lucenia tenant.** Your deals live in a database namespace that is yours. Other customers'
  credentials cannot reach it.
- **Amazon Bedrock**, when you use AI drafting. Your notes are sent to generate the draft and are
  not retained by the model provider for training.
- **Amazon SES and Resend**, to deliver email. They see the recipient address and the message.
- **Stripe**, for billing. We never see or store your card number.
- **DocuSign**, only if you send an envelope.

We do not sell data, and we do not share it with anyone not listed above.

## Your counterparty's data

When you send a proposal, the recipient's name and email address are processed on your behalf. You
are responsible for having a legitimate business reason to contact them. We use that address for
that document and nothing else — no list, no newsletter, no later marketing.

## Deletion

Delete a deal and it is gone from your account. Ask us to close your account and we remove your
account, your deals and your signing records. Email **privacy@dealdesk.studio**.

One exception, stated plainly: a **sealed** document is retained as long as its verification link
is live, because deleting it would break the ability of a counterparty to verify a contract they
hold. Tell us if you need a specific sealed document removed and we will remove it.

## Security

Credentials are hashed with scrypt. Sessions are HMAC-signed cookies. Email is sent over enforced
TLS. Sealed documents are signed with Ed25519 and verifiable against a published public key.

## Contact

**privacy@dealdesk.studio**
