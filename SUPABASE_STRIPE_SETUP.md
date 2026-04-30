# Evergreen AI Link Portal Setup

The public site can stay on GitHub Pages. The portals need Supabase Auth, Supabase database tables, Stripe checkout links, and n8n workflows that write form results into Supabase.

## Supabase Values Needed

Add these to `site.config.js`:

```js
supabase: {
  url: "https://YOUR-PROJECT.supabase.co",
  anonKey: "YOUR_PUBLIC_ANON_KEY"
}
```

Use the Supabase `service_role` key only inside n8n or Supabase Edge Functions. Never place it in website files.

## Stripe Values Needed

For the first version, create Stripe Payment Links or Checkout links for:

- Starter Setup: `$550`
- Growth Setup: `$1,100`
- AI Agent/Tool: `$1,500`
- Consultation: free, use Google Calendar booking link

Then add them to `site.config.js`:

```js
stripe: {
  starterSetupCheckoutUrl: "https://buy.stripe.com/...",
  growthSetupCheckoutUrl: "https://buy.stripe.com/...",
  aiAgentCheckoutUrl: "https://buy.stripe.com/...",
  consultationCheckoutUrl: "https://calendar.app.google/6oECkQT9oewUMVHs8"
}
```

## n8n Redirect Flow

After an intake form is submitted:

1. Calculate score, recommendations, and ROI in n8n.
2. Upsert the client in Supabase by email.
3. Insert the intake answers.
4. Insert the generated dashboard result.
5. Redirect to:

```txt
https://YOUR-DOMAIN/client-register.html?email={{email}}&result_id={{result_id}}
```

After login, the client portal should query Supabase for results owned by that authenticated user.

## ROI Questions To Add

Add these fields to the AI Opportunity Assessment form:

- Hours per week spent on repetitive manual/admin tasks
- Average hourly cost of the person doing that work
- New leads per month
- Missed or unfollowed leads per month
- Average value of a new customer
- Current lead-to-customer close rate
- Average response time to new leads
- Monthly admin/customer service labor cost
- Monthly software/tool cost
- Estimated monthly revenue
- Primary ROI goal: save time, increase leads, reduce admin cost, improve response time, all

## ROI Calculations

```txt
Monthly Time Savings Value =
Hours Saved Per Week * 4.33 * Hourly Cost
```

```txt
Missed Lead Revenue Recovered =
Missed Leads Per Month * Close Rate * Average Customer Value
```

```txt
Estimated Monthly Benefit =
Monthly Time Savings Value + Missed Lead Revenue Recovered
```

```txt
Payback Period =
Service Cost / Estimated Monthly Benefit
```

```txt
12-Month ROI =
((Estimated Monthly Benefit * 12) - Service Cost) / Service Cost
```

## Recommended Supabase Tables

Start with:

- `profiles`
- `clients`
- `ai_ready_intakes`
- `ai_ready_recommendations`
- `ai_opportunity_intakes`
- `ai_opportunity_diagnoses`
- `client_dashboard_results`
- `service_orders`
- `payments`
- `booked_calls`
- `faq`
- `blog_posts`
- `site_settings`
- `footer_social_links`
- `activity_events`

## Admin Portal Data

The admin portal should read:

- new signups from `profiles` / `clients`
- new service requests from `service_orders`
- calls booked from `booked_calls`
- form results from intake/result tables
- FAQ from `faq`
- blog from `blog_posts`
- footer social links from `footer_social_links`
- daily analytics from `activity_events`

## Current Website Pages Added

- `client-login.html`
- `client-register.html`
- `client-portal.html`
- `admin.html`

These pages are currently in preview mode until Supabase and Stripe values are added.
