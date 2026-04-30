create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  business_name text,
  role text default 'client' check (role in ('client', 'admin')),
  created_at timestamptz default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  business_name text,
  contact_name text,
  email text not null,
  phone text,
  website text,
  business_type text,
  lead_stage text default 'New',
  created_at timestamptz default now()
);

create table if not exists public.ai_ready_intakes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  submitted_at timestamptz default now(),
  business_name text,
  contact_name text,
  email text,
  phone text,
  has_website text,
  owns_domain text,
  has_business_email text,
  can_book_online text,
  external_site_notes text,
  has_google_business_profile text,
  services_products text,
  needs_online_payments text,
  has_branding text,
  interested_package text,
  digital_tools text,
  form_mode text,
  raw_payload jsonb default '{}'::jsonb
);

create table if not exists public.ai_ready_recommendations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  intake_id uuid references public.ai_ready_intakes(id) on delete cascade,
  recommended_package text,
  package_price numeric,
  package_description text,
  recommendation_reason text,
  additional_recommendation text,
  lead_stage text,
  lead_stage_description text,
  ai_readiness_score integer,
  future_automation_recommendation text,
  summary text,
  created_at timestamptz default now()
);

create table if not exists public.ai_opportunity_intakes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  submitted_at timestamptz default now(),
  business_name text,
  contact_name text,
  email text,
  phone text,
  website_or_social text,
  business_type text,
  team_size text,
  services_products text,
  customer_contact_source text,
  lead_process text,
  current_tools text,
  unused_tools text,
  top_time_tasks text,
  repetitive_tasks text,
  bottlenecks text,
  repeated_questions text,
  manual_copying text,
  lost_leads text,
  messy_processes text,
  one_automation text,
  success_definition text,
  biggest_help_needed text,
  readiness_level text,
  budget_range text,
  wants_free_recommendation text,
  additional_notes text,
  form_mode text,
  raw_payload jsonb default '{}'::jsonb
);

create table if not exists public.ai_opportunity_diagnoses (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  intake_id uuid references public.ai_opportunity_intakes(id) on delete cascade,
  pitch_recommendation text,
  why text,
  ai_readiness_score integer,
  created_at timestamptz default now()
);

create table if not exists public.client_dashboard_results (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  result_type text,
  score integer,
  recommended_package text,
  package_price numeric,
  summary text,
  recommendations jsonb default '[]'::jsonb,
  next_steps jsonb default '[]'::jsonb,
  roi jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists public.service_orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  service_name text not null,
  price numeric,
  status text default 'Pending',
  stripe_session_id text,
  created_at timestamptz default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  order_id uuid references public.service_orders(id) on delete set null,
  stripe_payment_id text,
  amount numeric,
  status text,
  created_at timestamptz default now()
);

create table if not exists public.booked_calls (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete set null,
  email text,
  call_type text,
  scheduled_for timestamptz,
  source text,
  created_at timestamptz default now()
);

create table if not exists public.faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  keywords text,
  active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  excerpt text,
  content text,
  featured_image_url text,
  youtube_url text,
  status text default 'Draft',
  publish_date date,
  created_at timestamptz default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  setting_name text unique not null,
  setting_value jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.footer_social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text,
  active boolean default true,
  sort_order integer default 0
);

create table if not exists public.activity_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  client_id uuid references public.clients(id) on delete set null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.ai_ready_intakes enable row level security;
alter table public.ai_ready_recommendations enable row level security;
alter table public.ai_opportunity_intakes enable row level security;
alter table public.ai_opportunity_diagnoses enable row level security;
alter table public.client_dashboard_results enable row level security;
alter table public.service_orders enable row level security;
alter table public.payments enable row level security;
alter table public.booked_calls enable row level security;
alter table public.faq enable row level security;
alter table public.blog_posts enable row level security;
alter table public.site_settings enable row level security;
alter table public.footer_social_links enable row level security;
alter table public.activity_events enable row level security;

create policy "Public can read active FAQ" on public.faq for select using (active = true);
create policy "Public can read published blog posts" on public.blog_posts for select using (status = 'Published');
create policy "Public can read active social links" on public.footer_social_links for select using (active = true);

create policy "Clients can read their profile" on public.profiles for select using (auth.uid() = id);
create policy "Clients can read own client rows" on public.clients for select using (auth.uid() = user_id);
create policy "Clients can read own dashboard results" on public.client_dashboard_results for select using (
  client_id in (select id from public.clients where user_id = auth.uid())
);
create policy "Clients can read own service orders" on public.service_orders for select using (
  client_id in (select id from public.clients where user_id = auth.uid())
);
