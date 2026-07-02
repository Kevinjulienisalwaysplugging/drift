create extension if not exists pgcrypto;

create table if not exists public.drift_reviews (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  user_id uuid,
  display_name text not null,
  email_hash text not null,
  rating integer not null check (rating between 1 and 5),
  title text not null,
  body text not null,
  country text not null,
  verified_buyer boolean not null default false,
  helpful_count integer not null default 0,
  photo_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.drift_review_photos (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.drift_reviews(id) on delete cascade,
  product_name text not null,
  public_url text not null,
  alt_text text,
  width integer,
  height integer,
  created_at timestamptz not null default now()
);

create table if not exists public.drift_review_helpful_votes (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.drift_reviews(id) on delete cascade,
  user_id uuid,
  voter_hash text not null,
  created_at timestamptz not null default now(),
  unique (review_id, voter_hash)
);

create index if not exists drift_reviews_product_created_idx
  on public.drift_reviews(product_name, created_at desc);

create index if not exists drift_reviews_product_rating_idx
  on public.drift_reviews(product_name, rating desc);

create index if not exists drift_reviews_product_helpful_idx
  on public.drift_reviews(product_name, helpful_count desc);

create index if not exists drift_review_photos_product_idx
  on public.drift_review_photos(product_name, created_at desc);

alter table public.drift_reviews enable row level security;
alter table public.drift_review_photos enable row level security;
alter table public.drift_review_helpful_votes enable row level security;

create policy "Reviews are publicly readable"
  on public.drift_reviews for select
  using (true);

create policy "Review photos are publicly readable"
  on public.drift_review_photos for select
  using (true);

-- Writes are handled by Next.js API routes with SUPABASE_SERVICE_ROLE_KEY.
-- Do not create public insert/update/delete policies unless you intentionally move validation into RLS.

-- Create a public Supabase Storage bucket named:
-- review-photos
-- The frontend/API expects uploaded customer review photos to be publicly readable.
