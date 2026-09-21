---
route: /start
title: Start — Bidaya
description: Start a conversation with Bidaya: tell us where the business stands and what shape of engagement you have in mind, and we'll come back with a time for the call.
order: 8
nav: Start
navCta: true
---

# Start a conversation

@lead Thirty minutes, no charge, and it ends with one of three things: a proposal, a scope for paid discovery, or the reason we're not the right firm. If you've done the read, the call already knows what you told it.

@note the form. One screen. The fields, in order; qualification lives here and nowhere else — tool spec 5.6. Milestone 1 builds the form; milestone 6 wires it to Resend and to consent. Until then the Send button is disabled and says so in its own accessible name.

@form
@field radio "What you have in mind"
- The executive layer inside the business, monthly
- One defined piece of work
- Not sure yet
@hint *Neither shape is the lesser one. The call decides which fits.*

@field radio "Where the business stands"
- Not registered yet
- Setting up
- Trading under a year
- One to three years
- More than three years

@field radio "People, including you"
- 1
- 2–5
- 6–15
- 16–50
- More than 50

@note the Budget question is cut — founder ruling 2026-09-21, docs/decisions.md. Shape and timing qualify; the price is on How we work.

@field radio "When you'd want to begin"
- This month
- Within three months
- Later; I'm planning

@field textarea "In your words" optional
@hint the one thing you'd fix first.

@field text "Your name"
@field text "Company"
@field email "Email"
@field tel "Phone or WhatsApp"

@field consent "I'm happy for Bidaya to contact me about this enquiry."

@submit Send
@end

---

@assumed the reply commitment below is assumed — ledger AU.

@rows
**After sending** We reply within two working days with a time for the call, or with the reason we're not the right firm. Nothing you've told us is shared, and nothing is stored beyond this enquiry unless you ask for the files.
@end
