# Evergreen AI Link Website

Modern static website for Evergreen AI Link, an AI automation agency focused on booked calls and qualified AI system leads.

## Pages

- `index.html` - home page with hero, services overview, AI readiness checklist, workflow steps, and CTAs.
- `services.html` - dynamic services listing.
- `service.html` - service detail and request form with selected service passed into the intake.
- `blog.html` - dynamic blog listing.
- `post.html` - blog detail with optional YouTube embed.
- `contact.html` - quick contact form for Airtable leads.
- `ai-system-plan.html` - advanced AI intake form for n8n, with optional embedded n8n form.

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
    intakeWebhookUrl: "https://your-n8n-webhook",
    embedUrl: "https://your-n8n-form"
  },
  airtable: {
    baseId: "app...",
    token: "pat...",
    servicesTable: "Services",
    blogTable: "Blog",
    leadsTable: "Leads",
    leadsWebhookUrl: "https://your-secure-lead-webhook"
  }
};
```

For production, prefer `leadsWebhookUrl` or a secure proxy for Airtable writes so private Airtable tokens are not exposed in browser code.

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

Leads table:

- `Name`
- `Email`
- `Company`
- `Message`
- `Source`
