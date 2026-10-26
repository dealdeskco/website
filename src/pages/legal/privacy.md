---
title: Privacy
description: What Deal Desk Studio collects, why, and what we never do with it.
---

# Privacy

_Last updated 26 October 2026._

Deal Desk Studio is a tool businesses use to write and send proposals. This page describes what
we hold and why, in plain terms.

## What we hold

**Your account.** Name, email address, company profile (name, logo, website, signatory, your terms
language). You give us these; you can change or remove them at any time from Company Profile.

**Your language preference.** The language you choose for the application is stored on your
account and in a cookie named `dd_lang`, so pages appear in that language.

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
- **Amazon Bedrock**, when you use AI drafting. The notes you provide are sent to generate the
  draft, along with a postal or ZIP code when you ask for a tax estimate. They are not retained by
  the model provider for training.
- **Amazon SES and Resend**, to deliver email. They see the recipient address and the message.
- **Stripe**, for billing. We never see or store your card number.
- **Google and Microsoft**, only if an administrator connects a drive (see below).

We do not sell data, and we do not share it with anyone not listed above.

## Connected drives (Google Drive, OneDrive, SharePoint)

An account administrator, on plans that include it, can connect Google Drive or Microsoft 365 so people can
add files from it, and so signed documents can be filed into a folder they choose. This section
covers what that connection lets us do and what we keep.

**What we can reach.** For Google Drive we ask only for the `drive.file` permission: we can open
the files and folders someone picks in Google's own file picker, and the files Deal Desk itself
saves there. We cannot see, list or search the rest of the drive. For Microsoft we act with the
permissions of the person who connected, never more than they can already open themselves, and we
write only to the folder chosen for signed documents. We also receive the email address of the
connected account, to show which account is connected.

**What we keep.** The connection's refresh token, encrypted (AES-256-GCM); the connected account's
email address; and the folder chosen for signed documents. A file is read only when someone picks
it. It then goes through the same path as a file you upload yourself, and becomes part of your
company library or the response you added it to.

**How it is used.** Only to provide the features you use: building your company library, drafting
your responses, and filing your signed documents. The text of a picked file may be sent to Amazon
Bedrock to draft from it, as described above. We do not use data from your drive for advertising,
we do not sell it, we do not use it to train general-purpose AI models, and no person reads it
except when you ask us to, for support or security, or when the law requires it.

**Disconnecting.** An administrator can disconnect at any time under **Connected drives**. We then
revoke our access with Google (for Microsoft, remove Deal Desk under My Apps) and delete the stored
token. You can also remove our access from your Google Account under Third-party apps & services.
Files already added to your library stay there until you delete them.

**Google API data.** Deal Desk Studio's use and transfer to any other app of information received
from Google APIs will adhere to the
[Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the Limited Use requirements.

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
