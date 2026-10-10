---
sidebar_position: 2
title: Signatures and sealing
description: How a signature is captured, evidenced and sealed — and what it does and does not prove.
---

# Signatures and sealing

A drawn mark on its own evidences very little. Deal Desk records three separate things around it,
and it is worth knowing what each one does.

## The audit trail

Every signing ceremony is recorded as an append-only list of events: when the document was opened,
when consent was accepted, when the signature was adopted, from what IP address and browser. The
record also stores the signer's typed affirmation and the **stroke dynamics** of the signature —
pressure, tilt and inter-point timing.

That last part matters: a signature image is trivial to copy, but the way a hand actually moved is
not.

Withdrawing a signature is recorded as an event, never as a deletion. An audit trail you can erase
is not an audit trail.

## Identity

How strongly a signature is tied to a person depends on how it was taken, and the certificate says
which was used rather than implying the strongest:

| Method | What it actually proves |
| --- | --- |
| **In person** | Possession of *your* session. The signer was in front of you; nothing more is claimed. |
| **Remote link** | Possession of a single-use link sent to the signer's own email address. |
| **Remote link + code** | The above, plus a one-time code delivered to that same address. |

## The seal

When you seal a document, the server renders the final PDF and signs the exact bytes with an
**Ed25519** key. The signature, the SHA-256 hash and the public key are all published.

To verify a copy without trusting us at all:

```bash
curl -sO https://app.dealdesk.studio/api/verify/<id>/document
curl -s https://app.dealdesk.studio/api/verify/pubkey > dealdesk.pub
curl -s https://app.dealdesk.studio/api/verify/<id> \
  | sed -n 's/.*"signature":"\([^"]*\)".*/\1/p' | base64 -d > doc.sig
openssl pkeyutl -verify -pubin -inkey dealdesk.pub -rawin -in <doc>.pdf -sigfile doc.sig
```

Change one byte of the PDF and verification fails.

## What this is not

A third-party e-signature service's weight in a dispute comes substantially from being a **neutral
third party** that will produce records and testify. An audit trail written by the vendor whose customer gets paid when the
deal closes is weaker evidence, however good the cryptography.

So: in-person signing is right for *"the customer is in front of me, close it now"*. For a
high-value or likely-contested agreement, consider a neutral third-party e-signature service
instead. Deal Desk does not include one.
