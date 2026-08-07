# TYBalls.ie — legal and privacy project memory

Last reviewed: 7 August 2026.

Primary research source: `/Users/kinopoint/Downloads/deep-research-report.md 8`.

This document records the legal and data-protection implications relevant to the project. It is operational project memory, not individual legal advice. Legal documents must describe the service that DebsGuru actually operates and should be reviewed when the business model or suppliers change.

## Current product boundary

TYBalls.ie currently:

- provides information about committee-led TY Ball planning;
- accepts booking enquiries for DebsGuru Ltd;
- does not sell tickets or take payment online;
- does not reserve a venue or date when a form is submitted;
- does not create a customer account;
- does not collect student lists, dates of birth, medical information, emergency contacts or payment-card details;
- issues prices, booking terms and event-specific arrangements separately after the enquiry has been reviewed.

This boundary is important. Ticket-sale, refund, checkout, transport, parental-authorisation and attendee-list requirements from the research are future requirements, not current website features.

## Personal data currently collected

The enquiry flow currently collects or derives:

- first and last name;
- phone number;
- email address;
- school name and school location;
- names of other schools joining the event, if supplied;
- approximate number of people in the school year;
- enquiry type: Debs or TY Ball;
- preferred event date and location;
- estimated attendance band;
- referral source and optional explanation;
- optional free-text requirements or message;
- landing page, referrer and campaign parameters;
- UTM parameters and advertising click identifiers where present;
- a privacy acknowledgement timestamp;
- a privacy-protected request hash used for rate limiting and duplicate suppression;
- notification delivery status and limited technical/security logs.

The website must not send names, school names, email addresses, phone numbers, dates or free-text messages to analytics.

## Required public documents for the current site

### Privacy Notice

Keep a concise Privacy Notice. It must reflect the actual enquiry system and explain:

- DebsGuru Ltd is the data controller;
- a working privacy/contact email;
- the categories of information collected;
- why the information is used;
- the lawful basis for each purpose;
- the categories of recipients and service providers;
- international transfers, where applicable;
- retention periods or the criteria used to determine them;
- applicable data-subject rights;
- the right to complain to the Irish Data Protection Commission;
- how consent can be withdrawn where consent is actually used;
- that the form does not request student lists, dates of birth, medical data or card details.

The Privacy Notice must be available when the data is collected, with a clear link beside the enquiry form.

Official guidance:

- [DPC transparency guidance](https://www.dataprotection.ie/en/organisations/know-your-obligations/transparency)
- [DPC Article 13 and 14 guidance](https://www.dataprotection.ie/en/individuals/know-your-rights/right-be-informed-transparency-article-13-14-gdpr)
- [GDPR Article 13](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679)

### Cookie Policy

Keep a short Cookie Policy that describes only technologies actually used.

- Strictly necessary security or form-operation technologies do not normally require prior consent.
- Analytics, advertising and conversion-tracking technologies require consent before they load.
- If no optional analytics or tracking is configured, do not show a redundant consent banner.
- If GTM/GA4 is configured, analytics must remain blocked until the visitor actively allows it.
- Visitors must be able to withdraw or change their choice as easily as they gave it.

Official guidance:

- [DPC cookies and tracking guidance](https://www.dataprotection.ie/en/dpc-guidance/guidance-cookies-and-other-tracking-technologies)
- [DPC analytics-cookie consent FAQ](https://www.dataprotection.ie/en/faqs/cookies/do-i-need-consent-analytics-cookies)

### Website Terms

Keep basic Website Terms covering the current informational and enquiry service:

- submitting a form is an enquiry only;
- it does not reserve a date, venue or service;
- it does not oblige either party to proceed;
- availability, inclusions, price, deposit, cancellation and date-change terms are supplied separately in writing;
- third-party links are controlled by their respective providers;
- a contact method is available for questions.

Detailed ticket, checkout, refund and transport terms are not required until those services are actually offered online.

## Form wording and lawful bases

Responding to a person’s booking enquiry is not direct marketing. The core form should not rely on GDPR consent where processing is necessary to review and answer the request.

Recommended contextual notice:

> We use the information submitted to review and respond to your booking enquiry. See our Privacy Notice for details.

If an acknowledgement checkbox is retained, use:

> I confirm that I have read the Privacy Notice.

Avoid wording that asks the person to “consent to the Privacy Policy”. A Privacy Notice provides information; it is not itself a contract.

Working lawful-basis map for the current site:

| Processing | Working lawful basis |
|---|---|
| Review and reply to an enquiry | Steps requested before entering a contract |
| Maintain reasonable enquiry follow-up records | Pre-contract steps and/or documented legitimate interests |
| Spam, duplicate and security controls | Documented legitimate interests in protecting the service |
| Required business or accounting records after a booking | Contract and legal obligation, as applicable |
| Optional analytics | Consent |
| Future marketing email or text | Separate consent, unless a specific lawful existing-customer exception has been verified |

The legitimate-interest purposes and balancing assessment must be documented internally if that basis is used.

## Direct marketing

Operational communication about the submitted enquiry may include questions, availability, a proposal and relevant follow-up about that enquiry. It must not silently turn into general promotional messaging.

If DebsGuru later sends future-event promotions or newsletters:

- add a separate, optional, unticked marketing checkbox;
- record when and what the person accepted;
- include a working opt-out in every marketing message;
- action objections and withdrawals promptly;
- maintain a minimal suppression record so an opted-out address is not re-added accidentally.

Suggested optional wording:

> Email me about future TY Ball events and updates. Optional.

Official guidance: [DPC electronic direct-marketing FAQ](https://www.dataprotection.ie/en/dpc-guidance/faq-consent-electronic-direct-marketing).

## Retention schedule

GDPR does not prescribe a universal retention period. Each period must be tied to a real purpose and implemented, not merely stated.

Current working schedule:

| Record | Working retention |
|---|---|
| Unconverted ordinary enquiry | Delete or anonymise 12 months after the last meaningful contact |
| School or committee enquiry with a longer planning cycle | Delete or anonymise 18 months after the last meaningful contact |
| Duplicate-prevention/security data | Keep only for the documented security window, normally 90–180 days |
| Cookie-consent choice/log | Keep only for the active consent and reasonable proof period, normally 12–24 months |
| Enquiry that becomes a booking | Move only necessary business records into the booking system |
| Accounting, invoice and core transaction records | Up to six years where required for tax/accounting or contractual purposes |
| Marketing consent | While active, with periodic review; retain a minimal suppression record after opt-out |
| Privacy-rights request record | Keep a limited compliance record, normally up to three years |
| Incident-related material | Pause normal deletion only for the relevant material while a claim or investigation remains active |

Do not retain all enquiry fields for six years merely because a booking was made. Separate accounting and contract records from operational contact data.

## Data-subject requests

DebsGuru must be able to receive and manage requests for access, correction, deletion, restriction, portability or objection where applicable.

Internal process:

1. Record the date and scope of the request.
2. Acknowledge it promptly.
3. Verify identity only where there are reasonable doubts and request only proportionate evidence.
4. Search the website database, email system and any relevant CRM or supplier.
5. Remove unrelated third-party information where necessary.
6. Respond without undue delay and within the GDPR deadline, normally one month.
7. Record the decision, systems checked and completion date.

A dedicated `privacy@tyballs.ie` address is recommended but not mandatory if `info@debsguru.ie` is actively monitored and can handle these requests reliably.

## Controllers, processors and suppliers

DebsGuru Ltd is the controller for the current website enquiry flow.

Before production launch, maintain a supplier register covering:

- web hosting/VPS;
- PostgreSQL/database hosting;
- transactional email/SMTP;
- Cloudflare Turnstile and related security services;
- Google Tag Manager/Google Analytics if enabled;
- backup, monitoring and logging providers;
- any CRM or helpdesk introduced later.

For each supplier record:

- its role as processor or separate controller;
- data categories and purposes;
- processing locations;
- sub-processors;
- retention/deletion controls;
- security measures;
- data-processing agreement;
- international-transfer mechanism where data leaves the EEA.

Do not send student lists through personal WhatsApp accounts, personal Gmail accounts or unrestricted shared spreadsheets. If named student data is later shared with schools, committees, venues or transport operators, define necessity, access, security, deletion and controller/processor roles before sharing.

## Children and special-category data

TY Ball attendees may be under 18, so public information addressed to students must use clear, age-appropriate language.

For the current enquiry-only form:

- collect committee/contact information, not individual attendee profiles;
- do not request dates of birth, medical conditions, allergy data or emergency contacts;
- do not use student details for marketing;
- do not add student-list upload without a separate data-flow and security review.

If medical, allergy, accessibility or other special-category information is later collected, perform a separate Article 9 analysis, determine necessity, access, retention and security, and consider whether a DPIA is required.

## Photography and video

Keep written evidence that DebsGuru is authorised to publish each event photo or video used on the website.

Do not treat general event photography and identifiable promotional portraits of minors as automatically equivalent. Before introducing uploads, attendee galleries, facial recognition or individual image permissions, document:

- the purpose and lawful basis;
- who was informed;
- parental/participant permissions where required;
- opt-out or escalation process;
- storage and deletion;
- access and onward publication rights.

## Security and breach readiness

Production controls must include:

- least-privilege staff access;
- MFA for administrative and supplier accounts;
- HTTPS and encryption in transit;
- patched dependencies and operating systems;
- protected backups and a tested restore process;
- access and security logging with defined retention;
- secrets stored outside the repository;
- a process to revoke access when staff or suppliers change;
- a written incident and personal-data-breach procedure.

If a personal-data breach is likely to create a risk to people, escalation to the DPC may be required without undue delay and, where feasible, within 72 hours of awareness. The assessment and decision must be documented even where notification is not required.

## Company identity and postal address

For the current enquiry-only launch:

- identify `DebsGuru Ltd` clearly as the operator/controller;
- provide a reliable email contact;
- do not publish a personal/home address merely as a placeholder;
- confirm the correct legal entity details internally.

If the website later concludes consumer contracts, sells tickets or accepts payment online, reassess pre-contract company-information requirements. The research indicates that online selling may require the seller’s geographic address, telephone/email, legal name, registration details, full price and cancellation/refund information. Consider a registered-office agent or approved business address rather than a director’s home address.

## Future triggers requiring a new legal review

Do not extend the current legal copy by assumption. Re-open this review before adding any of the following:

- online ticket sales, deposits or payments;
- public event listings and checkout;
- customer or school accounts;
- QR tickets, guest transfers or wallet passes;
- student/attendee lists;
- parent or guardian authorisation;
- DebsGuru-arranged transport;
- emergency-contact, medical, allergy or accessibility data;
- CCTV controlled by DebsGuru;
- event-specific cancellation, transfer or refund rules;
- Meta Pixel, TikTok Pixel, Google Ads conversion tracking or session recording;
- email/SMS marketing;
- attendee image uploads, galleries or promotional portrait permissions;
- sharing named records with schools, committees, venues, security or transport providers.

At the point of online sale, prepare or review at minimum:

- full Terms and Conditions;
- Refund and Cancellation Policy;
- event and admission rules;
- age and purchaser requirements;
- parent/guardian authorisation where needed;
- transport terms where applicable;
- checkout privacy notice and separate marketing choice;
- durable confirmation sent by email;
- clear total price and payment-obligation button;
- the event-date exception to the normal cooling-off period, without limiting statutory rights.

## Current launch checklist

- [ ] Confirm the exact legal entity and monitored privacy contact.
- [ ] Replace consent-to-reply wording with a contextual Privacy Notice statement or read acknowledgement.
- [ ] Make the public Privacy Notice match the actual database fields and suppliers.
- [ ] Choose and implement the 12/18-month enquiry deletion schedule.
- [ ] Confirm whether GTM/GA4 will be enabled at launch.
- [ ] Keep optional analytics blocked until consent.
- [ ] Verify that no personal form data reaches analytics.
- [ ] Complete processor/supplier records and agreements.
- [ ] Enable MFA for production administration and supplier accounts.
- [ ] Approve production backups, monitoring and restore testing.
- [ ] Prepare data-subject-request and breach-response procedures.
- [ ] Obtain written media-publication confirmation for website assets.
- [ ] Have the final public legal drafts reviewed against DebsGuru’s real operations before launch.

