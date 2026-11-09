---
title: Subprocessors
description: The service providers Deal Desk Studio uses to run the Service, what each one sees, and where.
---

# Subprocessors

_Last updated 8 November 2026._

These are the companies that process customer data for us so Deal Desk Studio can run. Each one sees
only what it needs for its job. Some are used only when you turn on the feature they serve; that is
said in the table.

| Subprocessor | What for | What it sees | Where |
| --- | --- | --- | --- |
| **Amazon Web Services** | Hosting the application; AI drafting (Amazon Bedrock); sending and receiving email (Amazon SES) | Everything stored in the Service; what a draft is written from (notes, documents, RFPs, library passages, company profile, answers); email recipients and messages | United States (us-east-2, Ohio) |
| **Lucenia** | The database and search engine your account's data is stored in | Everything stored in the Service, in Deal Desk's own tenant, with every record tied to its account | United States (on AWS, us-east-2) |
| **Stripe** | Billing and payments | Billing contact, company name, plan and usage; card details go to Stripe directly and never to us | United States |
| **Resend** | Delivering email when Amazon SES cannot | Recipient address and the message | United States |
| **Cloudflare** | DNS and network delivery for the application and the website | Traffic passing through, including IP addresses | Global network |
| **Google** | Google Drive connector, when an administrator connects it; Google Fonts on the application's pages; speech recognition when you dictate notes in Google Chrome | Files and folders added from Drive and the connected account's email; your IP address and browser (fonts); the audio you dictate (Chrome) | United States |
| **Microsoft** | SharePoint and OneDrive connector, when an administrator connects it | Files and folders added from the drive, the connected account's email, and signed documents filed there | United States |
| **Auth0 (Okta)** | Sign-in, when your account signs in through Auth0 | Name, email address and sign-in events | United States |
| **DocuSign** | Signing, when you send a document through DocuSign | The document, and the signers' names and email addresses | United States |
| **GitHub** | Support tickets from Help & feedback, kept in a private repository | Your name, email address, the message and attachments, and the page and app version | United States |

## Changes

We give customers at least 30 days' notice, by email to account owners, before adding or replacing a
subprocessor. If you object on reasonable data protection grounds, tell us at
**privacy@dealdesk.studio**; if we cannot address it, you may end the affected service and we will
refund any fees paid in advance for it. The [Data Processing Addendum](/legal/dpa) sets this out.

See also the [Privacy policy](/legal/privacy) and [Security](/security).
