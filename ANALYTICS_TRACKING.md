# Analytics tracking plan

The production site uses Google Tag Manager as the delivery layer and GA4 as the analytics destination. Tracking is deliberately small, consent-gated and free of personal data.

## Consent behaviour

- GTM is not loaded until the visitor accepts analytics cookies.
- Before acceptance, analytics storage and ad storage remain denied.
- Rejecting or later withdrawing consent prevents all custom events from being pushed.
- No form values, names, school names, email addresses, phone numbers, dates, messages, IP addresses or Turnstile tokens are sent to the data layer.

## Events

| Event | Trigger | Parameters | Purpose |
| --- | --- | --- | --- |
| `form_start` | First interaction with the booking form | `form_name: tyballs_enquiry` | Measure movement from page view to genuine enquiry intent. |
| `generate_lead` | The API accepts and stores a new enquiry | `form_name: tyballs_enquiry` | Primary conversion; mark this as a GA4 key event. |
| `whatsapp_click` | Visitor opens the WhatsApp contact link | `location: header`, `mobile_navigation` or `footer` | Understand which contact placement is useful. |

`generate_lead` is emitted only after a successful server response. Duplicate submissions do not create a second stored lead and therefore should not be treated as a new conversion.

## GTM setup

1. Create a GA4 Configuration tag using the production GA4 measurement ID.
2. Create one Custom Event trigger for each event in the table.
3. Create GA4 Event tags with the same event names and listed parameters.
4. Require analytics consent for every analytics tag.
5. Mark `generate_lead` as a key event in GA4. Do not mark `form_start` as a conversion.
6. Publish only after validating the consent states and events in GTM Preview and GA4 DebugView.

## Release validation

- With no consent choice, confirm that GTM and GA4 requests are absent.
- After rejection, confirm that the three events are not sent.
- After acceptance, submit one real test enquiry and confirm one `form_start` and one `generate_lead` without form contents.
- Click each WhatsApp placement and confirm the correct non-personal `location` value.
- Withdraw consent through Cookie Settings and confirm that later clicks no longer send events.
- Check GA4 after 24 hours for duplicate conversions and unexpected `(not set)` values.
