-- 가맹문의는 신규 접수부터 무조건 비밀글(+비밀번호 해시)로 저장한다.
-- 기존 공개글 데이터가 남아 있을 수 있으므로 NOT VALID 제약으로 신규/수정 row만 강제한다.

alter table public.franchise_inquiries
  alter column is_secret set default true;

alter table public.franchise_inquiries
  drop constraint if exists franchise_inquiries_secret_chk;

alter table public.franchise_inquiries
  add constraint franchise_inquiries_secret_required_chk
  check (is_secret = true and password_hash is not null) not valid;

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
  v_hash text := nullif(trim(coalesce(p_password_hash, '')), '');
  new_id uuid;
begin
  if length(v_name) < 1 or length(v_phone) < 1 then
    raise exception 'name and phone required';
  end if;

  -- p_is_secret 값과 무관하게 비밀글만 허용.
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

  return query select new_id;
end;
$$;
