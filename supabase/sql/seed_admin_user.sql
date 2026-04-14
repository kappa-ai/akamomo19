-- 관리자 계정 1명을 SQL로만 생성합니다. (대시보드 Add user 불필요)
-- 선행: supabase/migrations/001_stores.sql 을 먼저 Supabase SQL Editor에서 실행해 두세요.
--
-- 아래 admin_email, admin_password 만 바꾼 뒤 통째로 실행하세요.

create extension if not exists pgcrypto;

do $$
declare
  admin_email text := 'admin@akamomo.local';
  admin_password text := 'changeme';
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
    updated_at
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
    now()
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
    gen_random_uuid(),
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
