---
title: Privacy
description: What Deal Desk Studio collects, why, who else sees it, how long we keep it, and your rights.
---

# Privacy

_Last updated 8 November 2026._

Deal Desk Studio is a tool businesses use to write and send proposals and to answer RFPs. This page
describes what we hold and why, in plain terms. It covers the application at app.dealdesk.studio
and this website.

If your company uses Deal Desk, our [Data Processing Addendum](/legal/dpa) also applies to the
personal data in what you put into the Service.

## What we hold

**Your account.** Name, email address, company profile (name, logo, website, signatory, your terms
language). You give us these; you can change or remove them at any time from Company Profile. When
you create an account we also record when you accepted the Terms of Service and which version they
were.

**Your language preference.** The language you choose for the application is stored on your
account and in a cookie named `dd_lang`, so pages appear in that language.

**Your deals.** The proposals you draft, their line items and prices, and their status. These are
yours. We do not read them to build features, train models, or compile market data.

**Your company library and RFP responses.** The documents you upload or add from a connected
drive, the RFPs and forms you answer, the answers you write or approve, and the facts you tell Deal
Desk about your company. They are used to draft your documents, and for nothing else.

**Signing records.** When a document is signed we record who signed, when, from what IP address and
browser, how their identity was established, and the signature itself. This exists so a signature
can be evidenced later, which is the entire point of it. It is written to your account's own
storage.

**Support tickets.** What you send through Help & feedback: your name, email address, the message,
any attachments, and which page you were on and your app version.

**Nothing else.** No advertising identifiers, no cross-site tracking, no third-party analytics on
the application.

## What goes to the AI model provider

Deal Desk drafts with AI models (Amazon Nova and Anthropic Claude) run on **Amazon Bedrock**, in
AWS's US East (Ohio) region. To draft, we send Bedrock what the draft is written from: the notes,
transcripts and documents you give it, the RFP or form you are answering, the passages of your
company library that apply, your company profile, and the answers and facts you have provided. When
you ask for a tax estimate we send the postal or ZIP code and a description of what is being sold.

Amazon Bedrock does not use the prompts it receives or the text it returns to train models, and
does not share them with the companies that make the models. Deal Desk does not train AI models on
customer content.

## Who else sees it

We use a small number of service providers (subprocessors) to run the Service. Each one sees only
what it needs for its job. The full list, with what each one sees and where, is on the
[Subprocessors](/legal/subprocessors) page. In short:

- **Amazon Web Services**: hosting in the United States (us-east-2), the AI models (Bedrock), and
  email (SES).
- **Lucenia**: the database and search engine your account's data is stored in, run on AWS in the
  same region. Deal Desk's data is kept in its own tenant there, and every record is tied to the
  account it belongs to, so one account cannot reach another's.
- **Stripe**, for billing. We never see or store your card number.
- **Resend**, to deliver email when SES cannot. It sees the recipient address and the message.
- **Cloudflare**, which carries traffic to the application and this website.
- **Google**: the Google Drive connector, if an administrator connects it; Google Fonts, which the
  application's pages load (Google sees your IP address and browser); and, if you dictate notes in
  Google Chrome, Chrome's speech recognition, which sends the audio to Google to turn it into text.
- **Microsoft**, if an administrator connects SharePoint or OneDrive.
- **Auth0**, if your account signs in through it.
- **DocuSign**, if you send a document for signature through DocuSign.
- **GitHub**, which holds support tickets in a private repository: your name, email address,
  message and attachments.

We do not sell data, and we do not share it with anyone not listed on that page, except when the
law requires it.

## Connected drives (Google Drive, OneDrive, SharePoint)

An account administrator, on plans that include it, can connect Google Drive or Microsoft 365 so
people can add files and folders from it, and so signed documents can be filed into a folder they
choose. This section covers what that connection lets us do and what we keep.

**Picking files from Google Drive.** By default we ask only for the `drive.file` permission: we can
open the files someone picks in Google's own file picker, and the files Deal Desk itself saves
there. With that permission alone we cannot see, list or search the rest of the drive.

**Adding a folder from Google Drive asks for more.** `drive.file` reaches a picked folder but not
the files inside it. So the first time someone adds a **folder**, Google asks them to grant
read-only access to their Drive (`drive.readonly`). That permission is broader: it would let Deal
Desk read any file the connected person can open. We use it only to read the folders that are
added, and nothing else in the drive. If you would rather not grant it, pick files instead of
folders.

**Microsoft 365.** We act with the permissions of the person who connected, never more than they
can already open themselves (`Files.ReadWrite.All`, and `Sites.Read.All` for SharePoint on work
accounts). We read only what someone adds, and we write only to the folder chosen for signed
documents.

For both providers we also receive the email address of the connected account, to show which
account is connected.

**What we keep.** The connection's refresh token, encrypted (AES-256-GCM); the connected account's
email address; and the folder chosen for signed documents. A file is read only when someone adds
it. It then goes through the same path as a file you upload yourself, and becomes part of your
company library or the response you added it to.

**How it is used.** Only to provide the features you use: building your company library, drafting
your responses, and filing your signed documents. The text of an added file may be sent to Amazon
Bedrock to draft from it, as described above. We do not use data from your drive for advertising,
we do not sell it, we do not use it to train AI models, and no person reads it except when you ask
us to, for support or security, or when the law requires it.

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

## How long we keep it

- **While your account is open**, we keep your account data so the Service works.
- **Delete a deal** and it is removed from your account; signed copies and their verification
  records are kept as legal records.
- **Close your account** and we delete your account data within 30 days. Copies in our backups
  roll off within 35 days.
- **Signed records** — a sealed document, its certificate of completion and its verification
  record — are kept as legal records after a deal or an account is deleted, because deleting them
  would break a counterparty's ability to verify a contract they hold. Tell us if you need a
  specific signed record removed and we will consider it, subject to the law.
- **Support tickets** are kept while your account is open and deleted with it.

To close your account, email **privacy@dealdesk.studio** from the account owner's address.

## Your rights

Depending on where you live, you may have the right to ask us for a copy of your personal data, to
correct it, to delete it, to restrict or object to how we use it, to receive it in a portable form,
and to withdraw a consent you gave. Email **privacy@dealdesk.studio**. We will confirm who you are
before acting, and answer within 30 days. If you are a counterparty or a member of a customer's
team, we may pass your request to that customer, because they decide what happens to their
documents.

You can also complain to your data protection authority.

## Legal bases (EU, EEA and UK)

Where the GDPR or the UK GDPR applies, we process personal data:

- **to perform our contract with you**: running your account, drafting, sending and signing
  documents, billing and support;
- **for our legitimate interests**: keeping the Service secure, preventing abuse, and keeping the
  records a signature needs so it can be evidenced later;
- **with your consent**: connecting a drive, and dictating notes in your browser. You can withdraw
  it by disconnecting the drive or by not using dictation;
- **to meet legal obligations**: tax and accounting records, and lawful requests.

For the personal data inside the documents you put into the Service, your company is the controller
and we process it on its behalf, as described in the [Data Processing Addendum](/legal/dpa).

## International transfers

Deal Desk is run from the United States, and your data is stored and processed in the United
States. Where we transfer personal data from the EEA, the UK or Switzerland, we rely on the European
Commission's Standard Contractual Clauses (with the UK Addendum where it applies), with our
subprocessors as well as with you.

## Security

Credentials are hashed with scrypt. Sessions are HMAC-signed cookies. Traffic is encrypted with TLS,
and email is sent over enforced TLS. Sealed documents are signed with Ed25519 and verifiable against
a published public key. More on the [Security](/security) page.

## Changes

If we change this policy in a way that matters, we will update the date at the top and tell account
owners by email before the change takes effect.

## Contact

**privacy@dealdesk.studio**
