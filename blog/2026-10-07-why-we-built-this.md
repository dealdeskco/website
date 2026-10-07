---
slug: why-we-built-this
title: The bottleneck was never the deciding
authors: [dealdesk]
tags: [quoting]
---

Ask anyone who quotes work for a living where the time goes and they will not say "deciding the
price". They decided the price standing in the customer's garden, twenty minutes into the
conversation. They knew the scope, they knew roughly what the pushback would be, and they knew
what they would settle at.

The time goes into the two hours afterwards. Opening last quarter's proposal, deleting the old
customer's name, finding the line items, re-typing the scope from notes that made sense at the
time, remembering which discount was offered, and formatting a table that will not break when it
prints.

{/* truncate */}

By the time that is done it is Thursday. The proposal goes out Friday. The customer, who was ready
to say yes on Tuesday, has had three days to think about whether they really need it — and to call
someone else.

## The gap is the product

Every quoting tool we looked at starts from a blank template and asks you to fill it in. That is
the same two hours with nicer fonts. The useful version starts from what you *already have*: the
notes, the transcript, the voice memo recorded on the drive back.

So that is what Deal Desk does. Paste the mess in, get a priced draft out, change what needs
changing, and take the signature while the conversation is still warm.

## What we refused to shortcut

It would have been easy to make the signature a typed name in a box and call it done. We did not,
because a proposal is a document that binds you, and it deserves to be evidenced properly:

- Every signing ceremony has an append-only audit record — who, when, from where, how identified.
- The signature captures stroke dynamics, not just a bitmap.
- The finished PDF is sealed with an Ed25519 signature anyone can verify against a published key.

And where the evidence is weaker, the document says so. A signature taken on your own phone
proves possession of your session and the certificate states exactly that, rather than implying
something stronger. We would rather be the tool that tells you the truth about what you are
holding.
