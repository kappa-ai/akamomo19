-- 온라인 상담 신청 시 비밀글·비밀번호(해시) 저장. 문의게시판은 API(서비스 롤)로만 비밀 내용 노출.
-- 비밀글은 anon이 franchise_inquiries / franchise_inquiry_messages 를 직접 SELECT 할 수 없게 하고,
-- 문의자 댓글은 SECURITY DEFINER RPC 로만 INSERT.

alter table public.franchise_inquiries
  add column if not exists is_secret boolean not null default false;

alter table public.franchise_inquiries
  add column if not exists password_hash text;

alter table public.franchise_inquiries
  drop constraint if exists franchise_inquiries_secret_chk;

alter table public.franchise_inquiries
  add constraint franchise_inquiries_secret_chk check (
    (is_secret = false and password_hash is null)
    or (is_secret = true and password_hash is not null)
  );

-- 기존 5인자 RPC 교체
drop function if exists public.submit_franchise_inquiry(text, text, text, text, text);

create or replace function public.submit_franchise_inquiry(
  p_name text,
  p_phone text,
  p_region text,
  p_timing text,
  p_message text,
  p_is_secret boolean,
  p_password_hash text
)
returns table (id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name text := trim(coalesce(p_name, ''));
  v_phone text := trim(coalesce(p_phone, ''));
  v_secret boolean := coalesce(p_is_secret, false);
  v_hash text := nullif(trim(coalesce(p_password_hash, '')), '');
  new_id uuid;
begin
  if length(v_name) < 1 or length(v_phone) < 1 then
    raise exception 'name and phone required';
  end if;

  if v_secret then
    if v_hash is null or length(v_hash) < 1 then
      raise exception 'password hash required for secret inquiry';
    end if;
    insert into public.franchise_inquiries (name, phone, region, timing, message, is_secret, password_hash)
    values (
      v_name,
      v_phone,
      nullif(trim(coalesce(p_region, '')), ''),
      nullif(trim(coalesce(p_timing, '')), ''),
      nullif(trim(coalesce(p_message, '')), ''),
      true,
      v_hash
    )
    returning franchise_inquiries.id into new_id;
  else
    insert into public.franchise_inquiries (name, phone, region, timing, message, is_secret, password_hash)
    values (
      v_name,
      v_phone,
      nullif(trim(coalesce(p_region, '')), ''),
      nullif(trim(coalesce(p_timing, '')), ''),
      nullif(trim(coalesce(p_message, '')), ''),
      false,
      null
    )
    returning franchise_inquiries.id into new_id;
  end if;

  return query select new_id;
end;
$$;

revoke all on function public.submit_franchise_inquiry (text, text, text, text, text, boolean, text) from public;
grant execute on function public.submit_franchise_inquiry (text, text, text, text, text, boolean, text) to anon, authenticated;

-- anon 공개 조회: 비밀글이 아닌 접수만
drop policy if exists "franchise_inquiries_select_public" on public.franchise_inquiries;

create policy "franchise_inquiries_select_anon_non_secret"
  on public.franchise_inquiries for select to anon
  using (is_secret = false);

-- 메시지: 비밀글이 아닌 스레드만 anon SELECT (비밀 스레드는 PostgREST 직접 조회 불가)
drop policy if exists "franchise_inquiry_messages_select_public" on public.franchise_inquiry_messages;

create policy "franchise_inquiry_messages_select_anon_open_parent"
  on public.franchise_inquiry_messages for select to anon
  using (
    exists (
      select 1 from public.franchise_inquiries fi
      where fi.id = franchise_inquiry_messages.inquiry_id and fi.is_secret = false
    )
  );

-- 비밀 스레드 문의자 댓글: 직접 INSERT 대신 RPC
drop policy if exists "franchise_inquiry_messages_insert_anon_applicant" on public.franchise_inquiry_messages;
drop policy if exists "franchise_inquiry_messages_insert_auth_applicant" on public.franchise_inquiry_messages;

create or replace function public.append_franchise_inquiry_applicant_message(
  p_inquiry_id uuid,
  p_body text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_body text := trim(coalesce(p_body, ''));
begin
  if length(v_body) < 1 or length(v_body) > 8000 then
    raise exception 'invalid body length';
  end if;

  if not exists (select 1 from public.franchise_inquiries where franchise_inquiries.id = p_inquiry_id) then
    raise exception 'inquiry not found';
  end if;

  insert into public.franchise_inquiry_messages (inquiry_id, body, is_staff)
  values (p_inquiry_id, v_body, false);
end;
$$;

revoke all on function public.append_franchise_inquiry_applicant_message (uuid, text) from public;
grant execute on function public.append_franchise_inquiry_applicant_message (uuid, text) to anon, authenticated;
