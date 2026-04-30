# Evergreen AI Link Airtable CMS Blueprint

Use these tables to edit the website content from Airtable. The current static site already reads `Services`, `Blog`, and `Leads`; the remaining tables are the recommended structure for controlling every page when the CMS layer is expanded.

## 1. Site Settings

One record for global settings.

| Column | Type | Notes |
| --- | --- | --- |
| Setting Name | Single line text | Example: `Primary` |
| Business Name | Single line text | Evergreen AI Link |
| Tagline | Single line text | Sustaining intelligence for a brighter future. |
| Logo | Attachment | Transparent logo |
| Email | Email | Public contact email |
| Phone | Phone number | Optional |
| Booking URL | URL | Book a Call CTA |
| n8n Intake URL | URL | Webhook or form URL |
| Footer Description | Long text | Footer brand copy |
| Copyright Text | Single line text | All rights reserved © 2026 Evergreen AI Link. |
| Instagram URL | URL | Optional |
| Facebook URL | URL | Optional |
| YouTube URL | URL | Optional |
| TikTok URL | URL | Optional |
| LinkedIn URL | URL | Optional |

## 2. Pages

Controls top-level page content.

| Column | Type | Notes |
| --- | --- | --- |
| Page Title | Single line text | Home, Services, Blog, Contact, AI System Plan |
| Slug | Single line text | `home`, `services`, `blog`, `contact`, `ai-system-plan` |
| Meta Title | Single line text | Browser/SEO title |
| Meta Description | Long text | SEO summary |
| Hero Eyebrow | Single line text | Small label above headline |
| Hero Headline | Long text | Main H1 |
| Hero Subheadline | Long text | Hero paragraph |
| Hero Image | Attachment | Optional |
| Primary CTA Label | Single line text | Example: Book a Call |
| Primary CTA URL | URL | Link |
| Secondary CTA Label | Single line text | Example: Get My AI System Plan |
| Secondary CTA URL | URL | Link |
| Status | Single select | Draft, Published |
| Sort Order | Number | Page ordering |

## 3. Page Sections

Controls repeatable sections on each page.

| Column | Type | Notes |
| --- | --- | --- |
| Section Name | Single line text | Internal label |
| Page | Linked record | Link to `Pages` |
| Section Type | Single select | Hero, Text, Cards, Checklist, Process, CTA, Image, Pricing, Embed |
| Eyebrow | Single line text | Optional |
| Heading | Long text | Section heading |
| Body | Long text | Section copy |
| Image | Attachment | Optional |
| CTA Label | Single line text | Optional |
| CTA URL | URL | Optional |
| Embed URL | URL | Optional n8n/YouTube/etc. |
| Background Style | Single select | White, Light Green, Dark Green, Beige |
| Sort Order | Number | Display order |
| Published | Checkbox | Show/hide |

## 4. Services

Controls service cards and service detail pages.

| Column | Type | Notes |
| --- | --- | --- |
| Name | Single line text | Service name |
| Slug | Single line text | Example: `starter-setup` |
| Summary | Long text | Card summary |
| Description | Long text | Detail page description |
| Outcome | Long text | Expected result |
| Price | Single line text | `$550`, `$1,100`, `$1,500 per Agent/Tool`, or Custom |
| Category | Single select | Foundation, AI Tool, Automation, CRM, Lead Flow |
| Featured Image | Attachment | Optional |
| Features | Long text | One feature per line |
| Best For | Long text | Ideal customer |
| CTA Label | Single line text | Request This Service |
| Active | Checkbox | Show/hide |
| Sort Order | Number | Display order |

## 5. Blog

Controls blog listing and blog detail pages.

| Column | Type | Notes |
| --- | --- | --- |
| Title | Single line text | Blog title |
| Slug | Single line text | URL slug |
| Excerpt | Long text | Card summary |
| Content | Long text | Full post content |
| Featured Image | Attachment | Main image |
| Featured Image URL | URL | Optional fallback |
| YouTube URL | URL | Optional embed |
| Author | Single line text | Optional |
| Publish Date | Date | Display/sort |
| Category | Single select | AI Readiness, Automation, Lead Flow, CRM, Operations |
| Status | Single select | Draft, Published |
| Sort Order | Number | Optional |

## 6. Navigation

Controls header and footer menus.

| Column | Type | Notes |
| --- | --- | --- |
| Label | Single line text | Home, Services, Blog |
| URL | URL or single line text | `index.html`, `services.html`, external URL |
| Menu Area | Single select | Header, Footer, Both |
| Open New Tab | Checkbox | For external links |
| Active | Checkbox | Show/hide |
| Sort Order | Number | Display order |

## 7. CTA Blocks

Reusable calls to action.

| Column | Type | Notes |
| --- | --- | --- |
| CTA Name | Single line text | Internal name |
| Eyebrow | Single line text | Optional |
| Heading | Long text | CTA headline |
| Body | Long text | CTA supporting copy |
| Primary Label | Single line text | Button text |
| Primary URL | URL | Button link |
| Secondary Label | Single line text | Optional |
| Secondary URL | URL | Optional |
| Style | Single select | Light, Dark, Split |
| Active | Checkbox | Show/hide |

## 8. Media Library

Central place for logos, infographics, PDFs, and page images.

| Column | Type | Notes |
| --- | --- | --- |
| Asset Name | Single line text | Internal name |
| File | Attachment | Image or PDF |
| Alt Text | Single line text | Accessibility text |
| Asset Type | Single select | Logo, Hero, Infographic, PDF, Blog Image, Icon |
| Usage Notes | Long text | Where it appears |
| Active | Checkbox | Show/hide |

## 9. Leads

Quick contact form submissions.

| Column | Type | Notes |
| --- | --- | --- |
| Name | Single line text | Contact name |
| Email | Email | Contact email |
| Company | Single line text | Optional |
| Phone | Phone number | Optional |
| Message | Long text | Form message |
| Source | Single line text | Website quick contact |
| Status | Single select | New, Contacted, Qualified, Closed |
| Created At | Created time | Airtable field |

## 10. AI System Plan Requests

Advanced intake submissions for n8n.

| Column | Type | Notes |
| --- | --- | --- |
| Name | Single line text | Contact name |
| Email | Email | Contact email |
| Company | Single line text | Business name |
| Website | URL | Optional |
| Selected Service | Single line text | Hidden service value |
| Current Tools | Long text | Airtable, CRM, email, forms, calendar |
| Bottleneck | Single select | Missing calls, Manual work, Losing leads, Slow response, Disorganized systems |
| Workflow Description | Long text | Intake details |
| Budget Range | Single select | Optional |
| Timeline | Single select | Optional |
| n8n Execution ID | Single line text | Optional automation tracking |
| Status | Single select | New, Reviewing, Planned, Built, Closed |
| Created At | Created time | Airtable field |

## 11. Testimonials

Optional future trust section.

| Column | Type | Notes |
| --- | --- | --- |
| Client Name | Single line text | Person or business |
| Role / Company | Single line text | Optional |
| Quote | Long text | Testimonial |
| Photo / Logo | Attachment | Optional |
| Related Service | Linked record | Link to `Services` |
| Active | Checkbox | Show/hide |
| Sort Order | Number | Display order |

## 12. FAQ

Optional FAQ section and AI assistant training source.

| Column | Type | Notes |
| --- | --- | --- |
| Question | Long text | FAQ question |
| Answer | Long text | FAQ answer |
| Category | Single select | Pricing, AI Setup, Website, Automation, Support |
| Related Service | Linked record | Optional |
| Active | Checkbox | Show/hide |
| Sort Order | Number | Display order |
