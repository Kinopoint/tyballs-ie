# TYBalls.ie — design handoff

Версия документа: 4 August 2026  
Проект: TYBalls.ie by DebsGuru Ltd  
Текущий preview: https://kinopoint.github.io/tyballs-ie/  
Предполагаемый production-домен: https://tyballs.ie/

## 1. Назначение документа

Это исходное техническое и контентное ТЗ для дизайнера, который будет заново
проектировать интерфейс TYBalls.ie. Документ фиксирует уже согласованную
информацию: позиционирование, страницы, тексты, форму, клиентские материалы,
медиа, SEO и ограничения.

Дизайнер может предложить новую композицию, сетку, типографику, цветовую систему,
карточки, анимацию и способ интеграции логотипа. При этом нельзя самостоятельно
менять бизнес-смысл, обязательные поля формы, юридические оговорки или создавать
неподтверждённые обещания.

## 2. Что представляет собой TYBalls.ie

TYBalls.ie — ирландский enquiry and planning service для Transition Year balls.
Сервис управляется DebsGuru Ltd.

Это не:

- билетный магазин;
- каталог площадок;
- ночной клуб;
- алкогольный или барный бренд;
- публичный прайс-лист;
- автоматический сервис бронирования.

Основная задача сайта — получить качественный booking enquiry от школьного
комитета и передать DebsGuru сведения, необходимые для подготовки реального
предложения: школа, локация, размер учебного года, дата, предполагаемая
посещаемость и требования к мероприятию.

Ключевая идея: memorable TY Ball, organised through one clear plan and one
experienced coordinator.

## 3. Аудитории

### Основная аудитория

- ученики и представители TY-комитета;
- школьные комитеты, которые начинают выбирать дату и площадку;
- пользователи преимущественно с мобильных телефонов.

### Вторая аудитория

- родители;
- представители школ;
- взрослые ответственные лица;
- площадки и event-партнёры, которым важно видеть организованность и
  достоверность сервиса.

Тон должен одновременно ощущаться молодым, событийным и современным, но также
надёжным, понятным и приемлемым для родителей и школ.

## 4. Обязательные бренд-факты

- Название всегда пишется точно: TYBalls.ie.
- TYBalls.ie is brought to you by the team behind DebsGuru.ie.
- Контактный email: info@debsguru.ie.
- Телефон / WhatsApp: 087 343 1732.
- Компания: DebsGuru Ltd.
- Адрес: St Brendans, East End, Ballybunion, Co Kerry, V31 CF61, Ireland.
- Instagram: https://www.instagram.com/debsguru/
- Facebook: https://www.facebook.com/DebsGuru
- Основной сайт DebsGuru: https://debsguru.ie/

## 5. Логотип и визуальная история

### Текущий обязательный логотип

Клиент прислал точный логотип 3 August 2026. Его оригинал:

branding/client-assets/TYBalls.ie-client-logo-original.JPG

Он должен оставаться неизменным. Опубликованные технические версии:

- public/brand/tyballs-client-logo-sign.jpg
- public/brand/tyballs-client-logo-sign.webp
- public/brand/tyballs-client-logo-full.jpg
- public/brand/tyballs-client-logo-full.webp

Версия sign — кроп центральной вывески для компактных размещений. Версия full —
полное клиентское изображение. Нельзя заменять написание, перерисовывать буквы
генеративной моделью или выдавать новый знак за клиентский оригинал.

Логотип содержит белое TYBalls.ie, подстрочник From the team behind DebsGuru.ie,
неоновую рамку magenta-to-blue и тёмный фон. Новый дизайн должен либо органично
поддержать эту палитру, либо предложить согласованный способ изолировать знак,
чтобы он не выглядел случайно вставленной фотографией.

### Архивное направление

Ранее было выбрано направление TYB-LOGO-A — Editorial Rhythm: тёмно-синий,
warm paper, cream и restrained coral. Оно сохранено как концепт в
branding/higgsfield/, но было superseded точным клиентским логотипом и текущей
тёмной Nocturne-системой.

Не следует принимать branding/higgsfield/selected-direction.md за действующий
логотип без отдельного решения владельца проекта. Это полезная альтернативная
история и точка возможного отката.

### Текущие CSS-токены Nocturne

| Роль | Значение |
| --- | --- |
| Background | #161826 |
| Deep background | #11131f |
| Surface | #232532 |
| Soft surface | #1c1e2b |
| Main text | #e9e9ed |
| Soft text | #cfd3e5 |
| Muted text | #9397ab |
| Primary accent | #9184d9 |
| Light accent | #b5abfc |
| Logo magenta | #ff3ec8 |
| Logo blue | #51c7ff |
| Divider | rgba(233, 233, 237, 0.14) |

Интерфейс использует сдержанный тёмный Nocturne-фон и фиолетовый акцент; gradient
magenta → electric blue оставлен для рамок ключевых CTA и связи с клиентским
логотипом. Новый дизайнер может предложить другую систему, но обязан показать,
как клиентский логотип работает в header, footer, hero и mobile menu.

### Текущая фирменная типографика

- Space Grotesk — display-шрифт для H1–H4 и крупных брендовых сообщений.
- DM Sans — основной шрифт для текста, навигации, кнопок и формы.
- Оба семейства подключены через `next/font` и сохраняются локально в production-сборке.
- Размеры построены на fluid responsive-шкале и проверяются на 390, 768 и 1440 px.

## 6. Визуальные и UX-ограничения

- Mobile-first. Базовая проверяемая мобильная ширина — 390 px.
- Desktop-макет должен быть убедительным на 1440 px.
- Существующие ключевые breakpoint: 640 px и 960 px.
- Приоритет — вертикальные фотографии и видео 9:16.
- Для desktop вертикальное медиа нужно помещать в управляемые portrait frames,
  split layouts или art-directed crops, не растягивая лица и не создавая
  случайные пустые зоны.
- Важные заголовки должны помещаться в одну строку на целевой ширине.
- Нельзя допускать горизонтальный overflow.
- Между секциями не должно быть бессмысленных больших пустых зон.
- Страница не должна превращаться в плотную стену текста.
- Использовать фотографии, видео, иконки, понятные CTA и раскрывающиеся FAQ.
- Кнопка Booking Enquiry Form должна быть заметна в header и повторяться в
  ключевых точках пользовательского маршрута.
- Все важные подписи должны оставаться HTML-текстом, а не быть запечёнными в
  изображение.
- Motion должен учитывать prefers-reduced-motion.
- Видео обязано иметь poster и статичную альтернативу.
- Не использовать flashing, rapid cuts, тяжёлые particle effects и дешёвую
  nightclub-эстетику.
- Не показывать алкоголь, beer pong, poker, барные сцены или алкогольный
  брендинг.
- Не придумывать отзывы, цифры, партнёров, площадки, цены или safety claims.

## 7. Общая структура сайта

### Header

Desktop:

- клиентский логотип;
- What’s included → /#experience;
- How it works → /how-it-works;
- Cost guide → /cost-guide;
- Parents & safety → /parents-schools;
- For committees → /for-committees;
- кнопка Booking Enquiry Form → /enquire.

Mobile:

- логотип;
- menu toggle с подписями Open navigation / Close navigation;
- те же ссылки;
- отдельная ссылка Booking Enquiry Form.

Header sticky. Текущий Cost Guide использует дополнительную спокойную entrance
animation через Motion.

### Footer

Brand statement:

> TYBalls.ie is brought to you by the team behind DebsGuru.ie. Every enquiry is
> reviewed before a date or venue is confirmed.

Explore:

- What’s included
- How it works
- For committees
- Parents & schools
- Cost guide
- Booking Enquiry Form

Follow DebsGuru:

- Instagram
- Facebook

Legal:

- Privacy
- Cookies
- Website terms
- Cookie settings

Нижняя строка:

- © current year DebsGuru Ltd
- St Brendans, East End, Ballybunion, Co Kerry

## 8. Sitemap

| URL | Назначение |
| --- | --- |
| / | Главная визуальная воронка |
| /#experience | What’s included, секция главной |
| /how-it-works | Процесс от enquiry до подтверждения |
| /cost-guide | Факторы, влияющие на предложение |
| /for-committees | Чек-лист школьного комитета |
| /parents-schools | Информация для родителей и школ |
| /enquire | Booking Enquiry Form |
| /privacy | Privacy Policy |
| /cookies | Cookie Policy |
| /terms | Website Terms |

Отдельной страницы What’s included сейчас нет: это anchor-секция главной.

## 9. Copy deck — Home

### Hero

Badge:

> TY Ball organisers across Ireland

H1:

> Planning a TY Ball?

Lead:

> A memorable night for them. One clear plan for you.

CTA:

- Booking Enquiry Form
- See how it works →

Proof line:

- 10+ years
- One event coordinator
- Across Ireland

Hero scene controls:

- The night
- Dinner
- Photo booth
- Together

### Highlights

1. Venue search  
   Matched to your county, date and guest estimate
2. One coordinator  
   One contact from first conversation to the night
3. A managed event  
   Arrival, timings and key contacts clearly planned

### Your night / What’s included

Eyebrow:

> Your night

H2:

> Everything in its place.

CTA:

> Booking Enquiry Form

Cards:

1. A venue that fits  
   Date, location, capacity and travel considered together.
2. A proper occasion  
   Dinner, service and dietary requirements coordinated.
3. A dancefloor ready  
   DJ, lighting and the running order brought together.
4. Moments to keep  
   Photography, photobooth and awards can be included.

### Coordinator story

Eyebrow:

> DebsGuru

H2:

> One coordinator.

Body:

> Your coordinator connects the committee, venue and event team, so decisions
> and updates stay in one place.

Facts:

- 10+ years
- Across Ireland

CTA:

> How it works

### Process teaser

Eyebrow:

> A simple start

H2:

> Three steps. One plan.

1. Share the basics  
   School, county, date and estimated attendance.
2. Review the plan  
   See the venue, inclusions and pricing together.
3. Enjoy the night  
   Your coordinator keeps the agreed plan moving.

CTA:

> Booking Enquiry Form

### Parents and schools teaser

Eyebrow:

> For parents and schools

H2:

> Clear for everyone.

Items:

- Guest list and venue entry plan
- Named adult contacts
- Clear arrival and collection

CTA:

> See the event guidance

### FAQ

Eyebrow:

> Quick answers

H2:

> Good to know.

Q: Do we need final guest numbers?  
A: No. Start with a realistic estimate and confirm the final number later.

Q: Who coordinates the event?  
A: A named DebsGuru coordinator works with the committee, venue and event team.

Q: Can dietary and access needs be planned?  
A: Yes. Share them early so the selected venue can confirm the arrangements.

Q: Does an enquiry reserve the date?  
A: No. A date is secured only after availability, pricing and booking terms are
agreed.

### Final CTA

Eyebrow:

> Start with the basics

H2:

> Booking Enquiry Form

Button:

> Open the form

## 10. Copy deck — How it works

URL: /how-it-works

Hero eyebrow:

> How it works

H1:

> From enquiry to event

Description:

> Start with a date, location and guest estimate. DebsGuru turns them into a
> plan the committee can review with confidence.

Stages:

1. Share the starting point  
   Send the school, county, preferred date and a realistic guest estimate. You
   do not need a final list to begin.
2. We check what fits  
   DebsGuru reviews suitable venues and event arrangements for the date,
   location and expected attendance.
3. Review one clear proposal  
   The committee sees the available venue, inclusions, practical requirements
   and pricing together before deciding.
4. Confirm the event  
   The date is secured only after availability, pricing and the booking terms
   have been agreed with DebsGuru.

Final CTA:

- Eyebrow: Ready to begin
- H2: Booking Enquiry Form
- Button: Open the form

## 11. Copy deck — Cost guide

URL: /cost-guide

Нельзя добавлять packages, starting prices, budget examples или tier
comparisons без нового разрешения клиента.

Hero eyebrow:

> TY Ball cost guide

H1:

> What shapes the cost?

Hero CTA:

> Booking Enquiry Form ↗

Supporting line:

> Your proposal follows the venue, date, guest estimate and the parts of the
> night your committee chooses.

Hero panels:

- Built for your event
- Built around your night.
- See the factors
- 10+ years
- DebsGuru event experience across Ireland.

Rotating statements:

- Venue, date and location set the starting point.
- A realistic guest estimate shapes capacity and cost.
- Dinner, service and dietary needs form one part.
- Entertainment follows the committee’s priorities.

Factors section:

- Eyebrow: Pricing factors
- H2: Every part counts.
- Intro: DebsGuru checks current venue and supplier costs, then brings the
  relevant inclusions and pricing into one proposal.

Cards:

1. Venue and date  
   Location, availability and time of year influence the starting cost.
2. Guest estimate  
   A realistic number sets the capacity and helps suppliers price accurately.
3. Dinner and service  
   Menu, service style and dietary needs become part of the proposal.
4. Entertainment  
   DJ, lighting, photography and extras follow the committee’s priorities.
5. Transport  
   Routes, collection points and passenger numbers shape any travel included.
6. Event requirements  
   Staffing, access, timings and procedures differ between venues.

Final CTA:

- Eyebrow: Send the starting point
- H2: Ready for a real proposal?
- Body: Share the school, county, date or flexibility, guest estimate and the
  parts of the night that matter most.
- Button: Booking Enquiry Form

## 12. Copy deck — For committees

URL: /for-committees

Hero:

- Eyebrow: For TY committees
- H1: Start with the basics
- Description: You do not need every answer. Five useful details give DebsGuru
  enough to start shaping the event.

Checklist intro:

- Eyebrow: Committee checklist
- H2: Five things to share
- Body: These basics keep the first conversation focused. DebsGuru can then
  check the venue, event arrangements and pricing that fit your group.

Checklist:

1. A preferred date  
   Share your first choice and any flexibility. Nearby dates can open more
   suitable venue options.
2. A realistic guest estimate  
   A rough number is enough to begin. The final guest list can follow later.
3. The school and county  
   Location helps DebsGuru focus on venues and travel arrangements that make
   practical sense.
4. The committee’s priorities  
   Tell us what matters most, whether that is the venue, dinner, music,
   photography or something else.
5. One committee contact  
   One named contact keeps decisions, questions and updates clear for everyone
   involved.

Final CTA:

- Eyebrow: Ready to begin
- H2: Booking Enquiry Form
- Button: Open the form

## 13. Copy deck — Parents & schools

URL: /parents-schools

Hero:

- Eyebrow: For parents and schools
- H1: Know the plan
- Body: See what should be clear before the event, then follow the confirmed
  information for the selected venue.
- Button: Ask a question

Section:

- Eyebrow: For the selected venue
- H2: What to confirm

Cards:

1. Guest list and entry  
   How check-in, venue rules and re-entry will work.
2. Event format  
   Who attends, what is included and how spaces are used.
3. Venue timings  
   The agreed arrival, finish and collection windows.
4. Named contacts  
   The DebsGuru coordinator, venue contact and responsible adults.
5. Transport home  
   Travel arrangements, collection points and contact details.
6. Food and access  
   Dietary, allergy, mobility and accessibility requirements.

Before-event section:

- Eyebrow: Before the event
- H2: Keep it close
- Body: Share the confirmed venue information with guests and responsible
  contacts before the night.

Actions:

1. Save the contacts  
   Keep the coordinator, venue and responsible adult details close.
2. Share the journey  
   Send the confirmed arrival and collection plan to guests.
3. Confirm requirements  
   Submit dietary, allergy and access needs by the stated date.
4. Check photography  
   Understand the photography arrangements for the selected event.

Final CTA:

- Eyebrow: Need something clarified
- H2: Ask DebsGuru
- Button: Send your question

## 14. Booking Enquiry Form

URL: /enquire

### Page hero

- Eyebrow: Your event starts here
- H1: Booking Enquiry Form
- Body: Tell us about your school, preferred date and likely attendance. A
  DebsGuru coordinator will review the details and come back to your committee.
- Chips: Committee contact / School details / Event preferences

### Before you start

- Eyebrow: Before you start
- H2: Have these ready
- School and location — Include another school if you are joining together.
- Year size — This gives the team a better attendance estimate.
- Date and venue area — Your preferences give the team a clear starting point.
- Note: No commitment yet. This enquiry starts a conversation and does not
  reserve a date.

### Form navigation

- Contact
- School
- Event
- Final details

### Section 1 — Contact

Label:

> Committee contact

H2:

> Your contact details

Description:

> So a DebsGuru coordinator can respond to your committee.

| Field | Input | Required | Constraints |
| --- | --- | --- | --- |
| First name | text | Yes | 2–80 characters server-side |
| Last name | text | Yes | 2–80 characters server-side |
| Phone | tel | Yes | 7–30 characters; digits, spaces, +, -, parentheses |
| Email | email | Yes | valid email, maximum 254 |

### Section 2 — School

Label:

> School profile

H2:

> Your school

Description:

> Your year size gives the team a stronger starting point for attendance
> planning.

| Field | Input | Required | Constraints / text |
| --- | --- | --- | --- |
| School name | text | Yes | 2–160 characters |
| School location | text | Yes | 2–120; placeholder Town or county |
| How many people are in your year? | number | Yes | integer 10–2000; placeholder Approximately |
| Include any other school names here if you are joining with other schools for this event | textarea | No | maximum 500 |

Вопрос про размер всего учебного года обязателен: он даёт DebsGuru более
реалистичную основу для оценки attendance, чем случайная оценка участника.

### Section 3 — Event

Label:

> Your preferences

H2:

> Event details

Description:

> Tell us what the committee is considering for the night.

Fields:

1. Enquiring for — required radio:
   - Debs
   - TY Ball
2. Preferred date for the event? — required date.
3. Preferred location for your event? — required text, 2–160 characters.
4. Estimated total attendance, including plus-ones — required radio:
   - 50–80
   - 80–120
   - 120–150
   - More than 150

### Section 4 — Final details

Label:

> Almost there

H2:

> One last detail

Description:

> Tell us how you found DebsGuru and add anything else the team should know.

How did you hear about DebsGuru? — required:

- Previous school year
- Friends / other schools
- Instagram
- TikTok
- Google search
- Other

При выборе Other появляется обязательное поле:

> Please tell us how you heard about DebsGuru *

Открытый комментарий:

> Anything else you might require or want to tell us? optional

Maximum 2000 characters.

### Consent and submit area

Mandatory consent:

> DebsGuru works directly with Debs and TY Ball committees. I have read the
> Privacy Policy and agree that DebsGuru Ltd may reply to this enquiry and send
> follow-up information related to it. *

Marketing consent сейчас скрыт и всегда передаётся как false.

Submit labels:

- Default: Send booking enquiry
- Submitting: Sending…
- Static preview: Preview only

Disclaimer:

> Sending an enquiry does not reserve a date or create a booking.

Preview notice:

> Preview website: enquiry sending will be enabled on the secure TYBalls.ie
> server.

Configuration error:

> The enquiry form security key is not configured.

Client-side error:

> We could not send the enquiry. Please try again.

Security error:

> Please complete the security check.

Production success:

> Thank you — your enquiry has been received. No date is reserved yet; the team
> will contact you to discuss availability.

Duplicate submission:

> We already received this enquiry. The team will be in touch.

### Form logic that design must preserve

- Cloudflare Turnstile security check.
- Hidden honeypot field Website.
- Server-side schema validation.
- PostgreSQL persistence before email notification.
- SMTP notification to DebsGuru.
- Rate limit: maximum five attempts per hashed IP in a 15-minute window.
- Duplicate suppression for the same IP hash, email and school for 15 minutes.
- Static GitHub Pages preview never submits the form.
- Successful production form tracks generate_lead.
- First focus inside the form tracks form_start.
- Names, email, phone and message are not sent to analytics.
- Captured attribution: landing page, referrer, UTM source/medium/campaign/
  content/term, gclid and fbclid.

Дизайнер может менять внешний вид и последовательность визуальных групп, но
нельзя убирать обязательные вопросы, объединять разные значения в одно поле или
ломать доступные label, legend, focus, error и success states.

## 15. Cookie consent

Dialog title:

> Your privacy, your choice

Body:

> Necessary security is always active. With your permission, anonymous
> analytics helps us understand which pages and enquiry steps are useful. Form
> details are never sent to analytics. Cookie Policy

Actions:

- Necessary only
- Allow analytics

Optional analytics is denied by default. Google Tag Manager loads only after
consent. Advertising storage remains denied.

## 16. Legal pages

Все три страницы сейчас имеют статус Draft for client review и дату Last
updated 2 August 2026. До production launch требуется юридическое и клиентское
подтверждение.

### Privacy Policy

Eyebrow: Legal  
H1: Privacy Policy  
Status: Draft for client review · Last updated 2 August 2026

#### 1. Who controls your information

> DebsGuru Ltd, trading through TYBalls.ie, is the controller of personal
> information submitted through this website.

Displayed address:

> DebsGuru Ltd  
> St Brendans, East End  
> Ballybunion, Co Kerry  
> V31 CF61, Ireland  
> Email: info@debsguru.ie

#### 2. Information we collect

> When you make an enquiry, we collect the school, county, committee contact
> name, email address, phone number, estimated attendance, preferred date or
> date flexibility, event priorities and any message you choose to provide.

> We may also receive technical information such as the page visited, referrer,
> campaign parameters, consent choices and a privacy-protected identifier used
> to prevent repeated spam submissions. We do not ask for student lists, dates
> of birth or payment-card information through this form.

#### 3. Why we use it

- To respond to your request and discuss suitable TY Ball options.
- To keep a record of the enquiry and manage follow-up.
- To protect the form and website from misuse.
- To measure website performance where you have allowed analytics cookies.
- To send occasional updates only where you have actively chosen to receive
  them.

> These uses rely on steps requested before entering a contract, legitimate
> interests in operating and securing the service, legal obligations, or
> consent where applicable.

#### 4. Who receives it

> Authorised DebsGuru personnel and contracted providers supporting hosting,
> email delivery, form security and consented analytics may process information
> only for the relevant service. Personal enquiry details are not sent to
> advertising analytics.

#### 5. How long it is kept

> Unconverted enquiries are scheduled for deletion or anonymisation after 24
> months. If an enquiry becomes a booking, relevant business and transaction
> records may be retained for up to six years or longer where required by law
> or an active dispute.

#### 6. Your rights

> Subject to applicable law, you may ask for access, correction, deletion,
> restriction, objection or a portable copy of your information. You may
> withdraw marketing or analytics consent at any time without affecting earlier
> processing.

> You may also make a complaint to the Irish Data Protection Commission at
> dataprotection.ie.

#### 7. Contact

> Send privacy requests to info@debsguru.ie. We may need to verify that a
> request relates to you before acting on it.

### Cookie Policy

Eyebrow: Legal  
H1: Cookie Policy  
Status: Draft for client review · Last updated 2 August 2026

#### What cookies are

> Cookies and similar browser storage help a website remember information or
> perform a requested function. Some are necessary for the site to work; others
> require your permission.

#### Necessary technologies

> The website may use a consent preference and Cloudflare Turnstile security
> data to protect the enquiry form from automated abuse. These functions are
> necessary for security and form operation and are not used to build an
> advertising profile.

#### Analytics

> If you choose analytics, Google Analytics 4 may receive non-identifying
> website usage events such as page views, form start, successful enquiry and
> WhatsApp click. Names, email addresses, phone numbers and form messages are
> not sent to analytics.

#### Your choice

> Optional analytics remains disabled until you consent. You can change or
> withdraw your choice through the cookie settings control available on the
> website. Browser controls can also remove stored cookies, although blocking
> necessary functions may prevent the form from working correctly.

#### Changes

> This policy will be updated if the website’s measurement or service providers
> change.

### Website Terms

Eyebrow: Legal  
H1: Website Terms  
Status: Draft for client review · Last updated 2 August 2026

#### 1. About this website

> TYBalls.ie is operated by DebsGuru Ltd from St Brendans, East End,
> Ballybunion, Co Kerry, V31 CF61, Ireland. It provides information and an
> enquiry route for Transition Year ball planning.

#### 2. An enquiry is not a booking

> Submitting the website form does not reserve a venue or date, create a
> booking, or oblige either party to proceed. Availability, services, pricing,
> deposits, cancellation and date-change terms are confirmed separately in
> writing by DebsGuru.

#### 3. Prices and availability

> Venue and supplier costs can change. Website descriptions are general and do
> not constitute a fixed offer. A tailored proposal becomes applicable only in
> the form and period stated in that proposal.

#### 4. Information you provide

> You agree to provide information you reasonably believe is accurate,
> including an honest attendance estimate. You must not submit another person’s
> contact information without permission or use the form unlawfully.

#### 5. Website content

> We aim to keep information accurate but cannot guarantee that every venue,
> date, supplier or option shown or described remains available. We may update
> the website without notice.

#### 6. Intellectual property

> Unless stated otherwise, the website design, written content and brand
> materials are owned by or licensed to DebsGuru Ltd. They may not be
> reproduced for commercial use without permission.

#### 7. External services

> Links to third-party websites or services are provided for convenience. Their
> availability, content and privacy practices are controlled by those third
> parties.

#### 8. Contact

> Questions about these website terms can be sent to info@debsguru.ie.

## 17. Реальные клиентские фотографии и видео

Исходный Google Drive:

https://drive.google.com/drive/folders/1mxb42F8KVXqRovD6DgPBx2mHh-O5MvQg

Сайт использует оптимизированные производные; оригиналы остаются в Drive.

| Published asset | Drive source / ID | Текущее использование |
| --- | --- | --- |
| drive-arrival | IMG_0893.jpg / 16xg3clUzUgg2Ew2zANLzkQ3dYEWafQG1 | arrival, home story, enquiry hero |
| drive-dinner | IMG_0960.jpg / 1EoKlM0w55_8n4dcPH5vd3_38Lt66hQ-z | dinner, home, How it works |
| drive-photobooth | IMG_1294.jpg / 1TTuICl5zWL5pyo-4HzsYHYvh1UmjmHa0 | photo booth |
| drive-dance | IMG_1341.jpg / 1n4F0He7ncIanelbb1ryc6dSTpeJlZOi6 | dancefloor |
| drive-group | IMG_1349.jpg / 1a1KIUWVLambeulu6WgxG763RsI_yhcI1 | photo booth group |
| drive-garden | IMG_1066.jpg / 1d0-ps_x7gjtyVA2qr6dVpfjd6Rawu_vi | venue, committees, cost guide |
| tyballs-real-event-vertical.mp4 | Promo5.MOV / 1ft0Vc44wkRYNquBrLeE8BKgsqj6WEVfI | home and Parents hero motion |
| tyballs-jenga-vertical.mp4 | Promo 1 Jenga with logo.MOV / 1m_NsM99hJU8ZjDl6KUEb7GEjfdFCRDxt | home activity motion |

Файлы сайта:

- public/images/drive-arrival.jpg and .webp
- public/images/drive-dinner.jpg and .webp
- public/images/drive-photobooth.jpg and .webp
- public/images/drive-dance.jpg and .webp
- public/images/drive-group.jpg and .webp
- public/images/drive-garden.jpg and .webp
- public/images/tyballs-real-event-poster.jpg
- public/images/tyballs-jenga-poster.jpg
- public/video/tyballs-real-event-vertical.mp4
- public/video/tyballs-jenga-vertical.mp4

Selection rule: prioritise portrait media, identifiable event activity and
natural guest interaction. Не публиковать beer-pong, poker, visible alcohol,
bar-led frames или кадры, создающие unsafe impression.

Перед public launch нужно письменное подтверждение использования материалов или
их замена. Необходимо учитывать согласия и возраст изображённых людей.

## 18. Generated visual archive

В branding/higgsfield/output/ сохранены:

- три ранних logo concepts;
- final lockup references;
- monogram references;
- generated photo originals;
- people-led и premium photo variants;
- cost-guide plates and cutouts;
- icon concept sheet;
- two generated video originals.

История промптов, моделей, job URLs и review:

branding/higgsfield/generation-log.md

Это архив производства, а не автоматическое разрешение использовать каждый
файл. Некоторые изображения отклонены из-за текста-подобных артефактов,
неподходящей постановки или старого art direction.

Если понадобятся новые генерации, в рамках этого проекта ранее было установлено:

- использовать Higgsfield connector;
- не использовать встроенный imagegen, стоки или сторонние генераторы;
- можно использовать платные модели;
- для фото предпочиталось Nano Banana Pro / canonical nano_banana_2;
- каждый оригинал и job metadata сохранять в branding/higgsfield/;
- не запекать тексты и интерфейсные кнопки в изображения;
- обязательно проверять лица, руки, геометрию, отражения и отсутствие алкоголя.

## 19. Иконки

Текущие PNG:

- calendar
- camera
- contact
- dining
- guests
- music
- route
- shield
- spark
- venue

Путь: public/icons/

Текущая интеграция иконок ранее вызывала замечания по центрированию, обрезке и
масштабу. Новый дизайнер должен рассматривать их как заменяемую концептуальную
систему. Предпочтительный production-результат — чистые доступные SVG/CSS icons
с единым stroke weight, optical size, safe area и состояниями hover/focus.

## 20. SEO и семантика

Global title:

> TY Ball Organisers Ireland | TYBalls.ie by DebsGuru

Global description:

> Plan a memorable TY Ball with one experienced coordinator for the venue,
> food, entertainment and event details. Enquire with DebsGuru across Ireland.

| Page | SEO title | Description |
| --- | --- | --- |
| Home | TY Ball Organisers Ireland | Глобальное описание выше |
| How it works | How TY Ball Planning Works | See how DebsGuru turns a date, location and guest estimate into a coordinated TY Ball plan, from the first enquiry to the confirmed event. |
| Cost guide | TY Ball Cost Guide Ireland | Understand what affects TY Ball costs in Ireland, including the venue, date, attendance, dinner, entertainment, transport and event requirements. |
| For committees | TY Ball Planning for School Committees | A practical TY Ball planning checklist for school committees: the date, county, guest estimate, priorities and contact needed to start an enquiry. |
| Parents & schools | TY Ball Guidance for Parents & Schools | Clear TY Ball guidance for parents and schools covering venue entry, timings, named contacts, transport, dietary needs and accessibility. |
| Enquire | Booking Enquiry Form | Send a TY Ball booking enquiry with your school, year size, preferred date, location and estimated attendance. The DebsGuru team will review the details. |

Structured data currently includes Organization, WebSite, Service, FAQPage,
HowTo, WebPage, ContactPage and BreadcrumbList.

Редизайн должен сохранять:

- один понятный H1 на страницу;
- правильную иерархию H2/H3;
- живой HTML copy;
- alt text;
- keyboard navigation;
- visible focus;
- form labels and fieldset legends;
- sitemap, robots, canonical и Open Graph metadata.

## 21. Техническая архитектура

- Next.js 16 App Router.
- React and TypeScript.
- Motion library: motion/react.
- CSS сейчас находится главным образом в app/globals.css.
- Production form endpoint: app/api/enquiries/route.ts.
- Validation: Zod schema in lib/enquiry-schema.ts.
- Database: PostgreSQL.
- Email: SMTP notification after persistence.
- Security: Cloudflare Turnstile, honeypot, rate limiting and duplicate
  suppression.
- Analytics: consent-gated GTM; form_start and generate_lead.
- Static preview: GitHub Pages / gh-pages branch.
- Intended production: Docker deployment on Contabo behind Nginx/HTTPS.

Критический поток:

Browser form → client validation → Turnstile → POST /api/enquiries → Zod
validation → rate limit → duplicate check → PostgreSQL insert → SMTP
notification → success response.

Новый визуальный слой не должен менять этот поток без отдельного инженерного
согласования.

## 22. GitHub Pages и production

GitHub Pages — только статическое preview. Оно:

- доступно по https://kinopoint.github.io/tyballs-ie/;
- использует base path /tyballs-ie;
- не содержит server-only enquiry API;
- не загружает Turnstile;
- не отправляет форму;
- показывает Preview only.

Рабочая форма возможна только на secure production server.

## 23. Что дизайнер может менять

- layout и визуальную сетку;
- typography;
- palette при условии убедительной интеграции клиентского logo;
- hierarchy и grouping существующего контента;
- card, tab, accordion и CTA presentation;
- icon system;
- image crops and art direction;
- motion system;
- desktop/mobile navigation presentation;
- form stepper presentation, если все поля и доступность сохраняются;
- footer composition;
- section order, если пользовательский путь остаётся понятным.

## 24. Что нельзя менять без согласования

- написание TYBalls.ie;
- клиентский logo artwork;
- связь с DebsGuru;
- обязательные поля формы и варианты ответов;
- business/legal disclaimers;
- утверждение, что enquiry не является booking;
- контакты и company details;
- safety wording;
- pricing model;
- отсутствие packages и budget examples;
- production form and analytics behavior;
- SEO intent и ключевые смысловые темы;
- запрет на alcohol-led imagery.

## 25. Желаемые deliverables от дизайнера

1. Design direction board с объяснением отношений logo, colour, typography и
   photography.
2. Полный desktop design для 1440 px.
3. Полный mobile design для 390 px.
4. Header, open mobile menu и sticky states.
5. Все home sections.
6. Все inner-page templates.
7. Cost Guide как отдельная сильная landing page.
8. Booking Enquiry Form со всеми четырьмя секциями и всеми состояниями.
9. Cookie banner.
10. Footer.
11. Form states: default, focus, filled, invalid, error, submitting, success,
    static preview and Turnstile state.
12. Interactive states: hover, focus, active, disabled, expanded.
13. Image/video crop specification for mobile and desktop.
14. Reduced-motion alternative.
15. Responsive component rules, spacing tokens, typography scale and grid.
16. Final asset list and export specifications.

## 26. Acceptance criteria

- TYBalls.ie везде написано точно.
- Клиентский logo читается и выглядит частью системы.
- Главная быстро объясняет сервис без стены текста.
- Booking Enquiry Form заметна без навязчивого повторения.
- Все страницы существуют и весь утверждённый смысл сохранён.
- Все обязательные form questions сохранены.
- Форму удобно заполнить одним пальцем на мобильном.
- Нет horizontal overflow на 390 px.
- Нет случайных больших пустых зон.
- Заголовки не обрезаются и не сталкиваются с CTA.
- Вертикальные фото и видео работают на mobile и desktop.
- Нет алкоголя и nightclub clichés.
- Нет invented prices, packages, testimonials или supplier claims.
- Contrast, focus, labels и semantic structure доступны.
- Motion не мешает чтению и имеет reduced-motion path.
- Изображения не содержат сгенерированного текста или UI.
- Footer ясно объясняет связь TYBalls.ie и DebsGuru.ie.

## 27. Открытые вопросы и риски

- Финальные Privacy, Cookie и Website Terms ещё требуют client/legal approval.
- Safety and supervision wording должно быть окончательно подтверждено.
- Нужно документально подтвердить права/согласия на client event media.
- Production Turnstile, SMTP и GTM credentials ещё должны быть настроены.
- Нужны Contabo VPS, backups, monitoring, certificate и restore test.
- Требуется DNS change в LetsHost после approval.
- WhatsApp trial пока не финализирован.
- Старый Editorial Rhythm brief конфликтует с текущим client neon logo; новый
  дизайнер должен показать осознанное решение этого конфликта, а не смешивать
  две системы случайно.

## 28. Rollback

Сохранены точки возврата:

- archive/pre-client-logo — состояние до интеграции клиентского логотипа;
- archive/pre-neon-redesign — состояние непосредственно до site-wide neon
  redesign.
- archive/pre-nocturne-redesign — последний опубликованный вариант до полного
  переноса Nocturne-дизайна.

Исторические состояния позволяют сравнить текущую Nocturne-систему с client-neon
и более спокойным editorial вариантом без потери уже собранного контента и формы.

## 29. Основные исходники

- app/page.tsx — Home copy and sections
- components/home-hero.tsx — interactive hero
- app/how-it-works/page.tsx
- app/cost-guide/page.tsx
- components/cost-guide-motion.tsx
- app/for-committees/page.tsx
- app/parents-schools/page.tsx
- app/enquire/page.tsx
- app/enquire/enquiry-form.tsx
- components/site-header.tsx
- components/site-footer.tsx
- components/consent-manager.tsx
- app/globals.css
- lib/site.ts
- lib/enquiry-schema.ts
- app/api/enquiries/route.ts
- branding/client-assets/
- branding/google-drive/README.md
- branding/higgsfield/

Этот документ описывает текущее согласованное содержание. Любое новое
визуальное направление должно сначала показать, как оно обслуживает этот
контент и мобильный enquiry flow, а уже затем заменять существующую оболочку.
