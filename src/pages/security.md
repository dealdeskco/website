---
title: Security
description: How Deal Desk Studio protects your account and your data, and how to report a vulnerability.
---

# Security

_Last updated 8 November 2026._

Deal Desk holds your proposals, your prices and what your company knows. This page says how we
look after them, plainly, and only what is true today.

## Where your data lives

The application and its database run on **Amazon Web Services in the United States, in the us-east-2
(Ohio) region**. AI drafting runs on Amazon Bedrock in the same region. The full list of providers is
on the [Subprocessors](/legal/subprocessors) page.

{/* TODO(owner): add "Data is encrypted at rest on encrypted AWS storage." only once the EBS volumes
    and the S3 backup bucket are confirmed encrypted. No evidence was found in the dealdesk infra. */}

## Encryption in transit

- Every connection to the application and this website uses **TLS (HTTPS)**.
- The application verifies the database's TLS certificate on every connection.
- Email is sent over **enforced TLS**: a message is not delivered to a mail server that cannot
  accept it securely.

## Keeping customers apart

- Deal Desk's data lives in its **own tenant** on the database engine, which other users of that
  engine cannot reach.
- Inside it, every record is keyed by the account it belongs to, and every request is checked
  against the signed-in account before anything is read or written. One account cannot open
  another's deals, documents or library by guessing an identifier.
- Support tickets are labelled with the account that filed them and are shown only to that account.

## Access controls

- **Passwords** are hashed with scrypt; we never store or see them in plain text.
- **Sessions** are HMAC-signed cookies, checked on every request. Removing someone from a team
  signs them out at once.
- **Roles.** Each team has owners, administrators and members. Billing, team membership, connected
  drives and API keys are managed by owners and administrators only.
- **API keys** are shown once when created and stored only as hashes; each can be revoked.
- **Connected drives.** Refresh tokens for Google Drive and Microsoft 365 are encrypted with
  AES-256-GCM. Disconnecting revokes our access and deletes the token.
- Our own staff reach customer data only to provide support you asked for, for security, or when
  the law requires it.

## Signed documents

Sealed documents are signed with **Ed25519** and can be verified by anyone against our published
public key, so a signed contract can be checked without trusting us. The audit record says how each
signer was identified and claims no more than that.

## AI and your content

Drafting runs on Amazon Bedrock, which does not use your content to train models. Deal Desk does not
train models on customer content either. Drafted RFP answers are checked by fixed rules, not by the
AI itself, for figures, dates and names that are not in your sources.

## What the Service is not

Deal Desk is **not FedRAMP authorized and not CMMC certified**. Do not upload classified
information, Controlled Unclassified Information (CUI), or ITAR- or EAR-controlled information. See
the [Terms of Service](/legal/terms).

## Reporting a vulnerability

If you think you have found a security problem, email **security@dealdesk.studio** with enough
detail for us to reproduce it. We will acknowledge your report, keep you informed while we fix it,
and credit you if you would like. Please do not access other customers' data, disrupt the Service,
or make the issue public before we have fixed it. We will not take action against good-faith
research that follows these rules.

## Questions

Security questionnaires and data protection terms: **security@dealdesk.studio**. Our
[Data Processing Addendum](/legal/dpa) is available to every customer.
