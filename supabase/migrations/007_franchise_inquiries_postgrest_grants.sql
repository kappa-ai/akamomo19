-- 이미 006만 적용한 프로젝트: 게시판이 403/permission 또는 빈 오류로 막히면 이 스크립트를 SQL Editor에서 1회 실행.
-- (006 최신본에는 동일 GRANT 가 포함되어 있어, 새로 006부터 적용하면 생략 가능)

grant select on table public.franchise_inquiries to anon, authenticated;
grant select on table public.franchise_inquiry_messages to anon, authenticated;
grant insert on table public.franchise_inquiry_messages to anon, authenticated;
