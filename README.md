# Evergreen AI Link Website

Modern static website for Evergreen AI Link, an AI automation agency focused on booked calls and qualified AI system leads.

## Pages

- `index.html` - home page with hero, services overview, AI readiness checklist, workflow steps, and CTAs.
- `services.html` - dynamic services listing.
- `service.html` - service detail and request form with selected service passed into the intake.
- `blog.html` - dynamic blog listing.
- `post.html` - blog detail with optional YouTube embed.
- `faq.html` - searchable FAQ page powered by Airtable or local fallback answers.
- `contact.html` - quick contact form for Airtable leads.
- `ai-system-plan.html` - advanced AI intake form for n8n, with optional embedded n8n form.
- `ai-ready-business-setup.html` - dedicated AI Ready Business Setup intake form.
- `client-login.html` - Supabase-ready client login page.
- `client-register.html` - Supabase-ready client registration page.
- `client-portal.html` - client dashboard and service ordering portal preview.
- `admin.html` - admin portal preview for clients, requests, calls, content, and analytics.

For portal backend setup, see `SUPABASE_STRIPE_SETUP.md`.

## Included Brand Resources

- `assets/evergreen-ai-link-logo-clean.png` - cropped transparent logo used across the site.
- `assets/ai-automation-infographic.png` - AI-ready business foundation infographic.
- `assets/ai-ready-enterprise-path.png` - path to AI-ready enterprise infographic.
- `assets/resources/ai-ready-business-setup.pdf` - pricing and setup PDF linked from the Services page.

## Configuration

Edit `site.config.js`:

```js
window.EVERGREEN_CONFIG = {
  bookingUrl: "https://your-booking-link",
  n8n: {
    intakeWebhookUrl: "https://your-ai-automation-form-or-webhook",
    embedUrl: "https://your-ai-automation-form",
    setupEmbedUrl: "https://your-ai-ready-business-setup-form"
  },
  airtable: {
    baseId: "app...",
    token: "pat...",
    servicesTable: "Services",
    blogTable: "Blog",
    faqTable: "FAQ",
    leadsTable: "Leads",
    leadsWebhookUrl: "https://your-secure-lead-webhook"
  }
};
```

For production, prefer `leadsWebhookUrl` or a secure proxy for Airtable writes so private Airtable tokens are not exposed in browser code.

## Live Form Links

- Book a Call: `https://calendar.app.google/6oECkQT9oewUMVHs8`
- AI Automation Intake / Get My AI System Plan: `https://n8n.srv1218594.hstgr.cloud/form/92cda703-6db6-4c82-a7ca-d7d5d265ca79`
- AI Ready Business Setup Intake: `https://n8n.srv1218594.hstgr.cloud/form/ac03bc11-416a-4ac5-a997-d47fdb1471c1`

## Airtable Fields

For the full CMS structure, see `AIRTABLE_SCHEMA.md`.

Services table:

- `Name`
- `Summary`
- `Description`
- `Outcome`
- `Price`

Blog table:

- `Title`
- `Excerpt`
- `Content`
- `Featured Image` as an attachment, or `Featured Image URL` as a URL field
- `YouTube URL`

FAQ table:

- `Question`
- `Answer`
- `Category`
- `Keywords`
- `Active`
- `Sort Order`

Leads table:

- `Name`
- `Email`
- `Company`
- `Message`
- `Source`
