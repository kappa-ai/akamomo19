-- 사이트 공통 연락처·사업자 정보 (단일 행 id=1). 공개 읽기, admin_users 만 수정.

create table if not exists public.site_contact (
  id int primary key check (id = 1),
  phone text not null,
  contact_email text not null,
  ceo_name text not null,
  business_reg_no text not null,
  updated_at timestamptz not null default now()
);

insert into public.site_contact (id, phone, contact_email, ceo_name, business_reg_no)
values (1, '1588-0000', 'contact@akamomo.co.kr', '홍길동', '000-00-00000')
on conflict (id) do nothing;

alter table public.site_contact enable row level security;

create policy "site_contact_select_public"
  on public.site_contact for select
  using (true);

create policy "site_contact_update_admin"
  on public.site_contact for update to authenticated
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid()));
