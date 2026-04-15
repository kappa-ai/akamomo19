-- GoTrue 로그인 시 "Database error querying schema" / unexpected_failure 가 날 때,
-- SQL로 만든 auth.users 행에 토큰 컬럼이 NULL 인 경우가 많습니다.
-- 아래 이메일을 본인 관리자 이메일로 바꾼 뒤 SQL Editor에서 1회 실행하세요.

update auth.users
set
  confirmation_token = coalesce(confirmation_token, ''),
  email_change = coalesce(email_change, ''),
  email_change_token_new = coalesce(email_change_token_new, ''),
  recovery_token = coalesce(recovery_token, '')
where lower(email) = lower('admin@akamomo.local');
