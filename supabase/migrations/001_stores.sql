-- Supabase SQL Editor에서 프로젝트당 1회 실행.
-- 관리자 계정은 supabase/sql/seed_admin_user.sql 로 생성.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade
);

create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  phone text not null,
  hours text not null default '24시간 운영',
  status text not null default '운영중',
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.upcoming_stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  region text not null,
  status text not null,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.stores enable row level security;
alter table public.upcoming_stores enable row level security;

-- Admin can see only their own row (for EXISTS checks in policies)
create policy "admin_users_select_own"
  on public.admin_users for select to authenticated
  using (user_id = auth.uid());

-- No insert/update/delete on admin_users via API (use SQL Editor as postgres to add admins)

-- Public read for storefront
create policy "stores_select_public"
  on public.stores for select
  using (true);

create policy "upcoming_select_public"
  on public.upcoming_stores for select
  using (true);

-- Mutations only for users listed in admin_users
create policy "stores_mutate_admin"
  on public.stores for all to authenticated
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));

create policy "upcoming_mutate_admin"
  on public.upcoming_stores for all to authenticated
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));
