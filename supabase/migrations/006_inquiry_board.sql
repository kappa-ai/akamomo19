-- 가맹 문의 게시판: 글·댓글. 공개 접근은 Next API(서비스 롤)로만; 관리자는 JWT + RLS.

create table if not exists public.inquiry_board_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  is_secret boolean not null default false,
  password_hash text,
  author_name text not null,
  phone text,
  created_at timestamptz not null default now(),
  constraint inquiry_board_posts_secret_chk check (
    (is_secret = false and password_hash is null)
    or (is_secret = true and password_hash is not null)
  )
);

create table if not exists public.inquiry_board_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.inquiry_board_posts (id) on delete cascade,
  body text not null,
  author_name text not null,
  is_staff boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists inquiry_board_posts_created_at_idx
  on public.inquiry_board_posts (created_at desc);

create index if not exists inquiry_board_comments_post_id_idx
  on public.inquiry_board_comments (post_id, created_at);

alter table public.inquiry_board_posts enable row level security;
alter table public.inquiry_board_comments enable row level security;

create policy "inquiry_board_posts_admin_all"
  on public.inquiry_board_posts
  for all
  to authenticated
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));

create policy "inquiry_board_comments_admin_all"
  on public.inquiry_board_comments
  for all
  to authenticated
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));
