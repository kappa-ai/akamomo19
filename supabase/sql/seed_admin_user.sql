-- [선택] SQL로만 관리자 1명을 넣을 때 사용합니다.
-- 운영에서는 docs/SUPABASE_OWNER_HANDOFF.md 처럼 "Add user + admin_users insert" 가 더 단순합니다.
--
-- 선행: supabase/migrations/001_stores.sql 실행 완료.
-- 아래 admin_email, admin_password 만 바꾼 뒤 통째로 실행.
--
-- 문제 시: Authentication → Users → Add user 로 동일 이메일을 만들고,
--           기존 SQL 사용자·identities 는 삭제한 뒤 admin_users 만 UUID로 insert.

create extension if not exists pgcrypto;

do $$
declare
  admin_email text := 'admin@example.com';
  admin_password text := 'change-me';
  new_id uuid := gen_random_uuid();
  enc text;
begin
  if exists (select 1 from auth.users where lower(email) = lower(admin_email)) then
    raise exception '이미 같은 이메일의 사용자가 있습니다: %', admin_email;
  end if;

  enc := crypt(admin_password, gen_salt('bf'));

  insert into auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change,
    email_change_token_new
  ) values (
    new_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    admin_email,
    enc,
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) values (
    new_id,
    new_id,
    jsonb_build_object(
      'sub', new_id::text,
      'email', admin_email,
      'email_verified', true,
      'phone_verified', false
    ),
    'email',
    new_id::text,
    now(),
    now(),
    now()
  );

  insert into public.admin_users (user_id) values (new_id);
end $$;
