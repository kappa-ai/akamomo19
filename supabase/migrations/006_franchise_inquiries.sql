-- 가맹 문의 공개 게시판: 누구나 /inquiry/board 에서 목록·상세·댓글(문의자) 열람/작성.
-- 본사 댓글은 admin_users 만 is_staff=true 로 INSERT.
-- 접수는 submit_franchise_inquiry RPC (anon). 테이블 INSERT 직접은 정책상 비권장·RPC 사용.

create table if not exists public.franchise_inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  region text,
  timing text,
  message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.franchise_inquiry_messages (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references public.franchise_inquiries (id) on delete cascade,
  body text not null,
  is_staff boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists franchise_inquiry_messages_inquiry_id_idx
  on public.franchise_inquiry_messages (inquiry_id);

alter table public.franchise_inquiries enable row level security;
alter table public.franchise_inquiry_messages enable row level security;

-- 관리자: 문의·댓글 전부
create policy "franchise_inquiries_admin_all"
  on public.franchise_inquiries for all to authenticated
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));

create policy "franchise_inquiry_messages_admin_all"
  on public.franchise_inquiry_messages for all to authenticated
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));

-- 공개 읽기
create policy "franchise_inquiries_select_public"
  on public.franchise_inquiries for select
  using (true);

create policy "franchise_inquiry_messages_select_public"
  on public.franchise_inquiry_messages for select
  using (true);

-- 문의자 등 비로그인: 본사 댓글이 아닌 댓글만 작성 (스팸 완화: 본사 플래그 불가)
create policy "franchise_inquiry_messages_insert_anon_applicant"
  on public.franchise_inquiry_messages for insert to anon
  with check (
    is_staff = false
    and length(trim(body)) between 1 and 8000
    and exists (select 1 from public.franchise_inquiries fi where fi.id = inquiry_id)
  );

create policy "franchise_inquiry_messages_insert_auth_applicant"
  on public.franchise_inquiry_messages for insert to authenticated
  with check (
    is_staff = false
    and not exists (select 1 from public.admin_users au where au.user_id = auth.uid())
    and length(trim(body)) between 1 and 8000
    and exists (select 1 from public.franchise_inquiries fi where fi.id = inquiry_id)
  );

create or replace function public.submit_franchise_inquiry(
  p_name text,
  p_phone text,
  p_region text,
  p_timing text,
  p_message text
)
returns table (id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text := trim(coalesce(p_name, ''));
  v_phone text := trim(coalesce(p_phone, ''));
  new_id uuid;
begin
  if length(v_name) < 1 or length(v_phone) < 1 then
    raise exception 'name and phone required';
  end if;

  insert into public.franchise_inquiries (name, phone, region, timing, message)
  values (
    v_name,
    v_phone,
    nullif(trim(coalesce(p_region, '')), ''),
    nullif(trim(coalesce(p_timing, '')), ''),
    nullif(trim(coalesce(p_message, '')), '')
  )
  returning franchise_inquiries.id into new_id;

  return query select new_id;
end;
$$;

revoke all on function public.submit_franchise_inquiry (text, text, text, text, text) from public;
grant execute on function public.submit_franchise_inquiry (text, text, text, text, text) to anon, authenticated;
