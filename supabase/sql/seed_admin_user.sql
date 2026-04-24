-- 관리자 계정 1명을 SQL로 생성합니다.
-- 선행: supabase/migrations/001_stores.sql 을 먼저 실행해 두세요.
--
-- 아래 admin_email, admin_password 만 바꾼 뒤 통째로 실행하세요.
--
-- [중요] unexpected_failure / "Database error querying schema" 가 나오면:
-- auth.users 의 confirmation_token·recovery_token·email_change·email_change_token_new 가 NULL 인 경우가 많습니다.
-- 이미 만든 사용자는 supabase/sql/fix_auth_user_token_columns.sql 로 고치거나, 토큰 컬럼을 '' 로 UPDATE 하세요.
--
-- 로그인 시 400 / invalid_grant 가 나오면:
-- 호스팅 Supabase(GoTrue)가 bcrypt(crypt) 해시와 맞지 않는 경우가 있습니다.
-- 그때는 Authentication → Users → Add user 로 같은 이메일·비밀번호로 사용자를 만들고
-- (Auto Confirm 켜기) 그 사용자 UUID로만 실행:
--   insert into public.admin_users (user_id) values ('복사한-UUID');
-- SQL로 만든 auth.users / auth.identities 행은 해당 이메일이면 먼저 삭제하거나 다른 이메일을 쓰세요.

create extension if not exists pgcrypto;

do $$
declare
  admin_email text := 'akamomo19@akamomo.com';
  admin_password text := 'Akamomo19@@';
  new_id uuid := gen_random_uuid();
  enc text;
begin
  if exists (select 1 from auth.users where lower(email) = lower(admin_email)) then
    raise exception '이미 같은 이메일의 사용자가 있습니다: %', admin_email;
  end if;

  enc := crypt(admin_password, gen_salt('bf'));

  -- confirmation_token 등이 NULL이면 GoTrue가 "Database error querying schema" 를 냅니다. 반드시 '' 로 둡니다.
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
