-- 페이지별 브라우저 탭 제목 관리 (site_contact 테이블에 컬럼 추가)
-- 관리자가 각 페이지의 <title> 태그를 수정할 수 있도록 합니다.

alter table public.site_contact
  add column if not exists page_title_home     text not null default '아카모모 파트너스 | 초기비용 부담 없는 무인 성인용품 창업',
  add column if not exists page_title_stores   text not null default '매장 찾기 | 아카모모 파트너스',
  add column if not exists page_title_startup  text not null default '창업 안내 | 아카모모 파트너스',
  add column if not exists page_title_inquiry  text not null default '문의하기 | 아카모모 파트너스';
