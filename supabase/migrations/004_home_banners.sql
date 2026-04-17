-- 메인 히어로 배너 (이미지 또는 HTML). 공개 읽기, admin_users 만 수정.
-- Storage: SQL Editor에서 001·002 이후 1회 실행. 업로드는 관리자 화면에서 사용.

create table if not exists public.home_banners (
  id uuid primary key default gen_random_uuid(),
  banner_type text not null check (banner_type in ('image', 'html')),
  image_url text,
  html_content text,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint home_banners_payload_ok check (
    (banner_type = 'image' and coalesce(trim(image_url), '') <> '')
    or (banner_type = 'html' and coalesce(trim(html_content), '') <> '')
  )
);

create index if not exists home_banners_sort_order_idx on public.home_banners (sort_order asc, id asc);

alter table public.home_banners enable row level security;

create policy "home_banners_select_public"
  on public.home_banners for select
  using (true);

create policy "home_banners_mutate_admin"
  on public.home_banners for all to authenticated
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));

-- Storage bucket (public read, admin write/delete)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'home-banners',
  'home-banners',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "home_banners_storage_select_public" on storage.objects;
create policy "home_banners_storage_select_public"
  on storage.objects for select
  using (bucket_id = 'home-banners');

drop policy if exists "home_banners_storage_insert_admin" on storage.objects;
create policy "home_banners_storage_insert_admin"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'home-banners'
    and exists (select 1 from public.admin_users au where au.user_id = auth.uid())
  );

drop policy if exists "home_banners_storage_update_admin" on storage.objects;
create policy "home_banners_storage_update_admin"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'home-banners'
    and exists (select 1 from public.admin_users au where au.user_id = auth.uid())
  )
  with check (
    bucket_id = 'home-banners'
    and exists (select 1 from public.admin_users au where au.user_id = auth.uid())
  );

drop policy if exists "home_banners_storage_delete_admin" on storage.objects;
create policy "home_banners_storage_delete_admin"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'home-banners'
    and exists (select 1 from public.admin_users au where au.user_id = auth.uid())
  );
