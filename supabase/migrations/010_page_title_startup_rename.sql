-- '가맹안내' 메뉴명이 '가맹비용'으로 바뀌어 /startup 페이지 탭 제목도 맞춰 변경합니다.
-- 관리자가 직접 바꾼 제목은 건드리지 않도록 기존 기본값일 때만 갱신합니다.

alter table public.site_contact
  alter column page_title_startup set default '가맹 비용 | 아카모모 파트너스';

update public.site_contact
  set page_title_startup = '가맹 비용 | 아카모모 파트너스'
  where page_title_startup = '창업 안내 | 아카모모 파트너스';
