-- DRIFT waitlist setup for Supabase.
-- Run this in the Supabase SQL editor.
-- Use only the public anon key in the website. Never put the service role key in HTML.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text default 'drift_landing_page',
  page_url text,
  user_agent text,
  created_at timestamptz not null default now(),
  constraint waitlist_signups_email_format
    check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
);

create unique index if not exists waitlist_signups_email_unique
  on public.waitlist_signups (lower(email));

alter table public.waitlist_signups enable row level security;

drop policy if exists "Allow public waitlist inserts" on public.waitlist_signups;
create policy "Allow public waitlist inserts"
  on public.waitlist_signups
  for insert
  to anon
  with check (true);

drop policy if exists "Block public waitlist reads" on public.waitlist_signups;
create policy "Block public waitlist reads"
  on public.waitlist_signups
  for select
  to anon
  using (false);

grant insert on public.waitlist_signups to anon;
