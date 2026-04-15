-- 매장 이미지용 Supabase Storage 버킷 + 정책 (001_stores.sql 이후 1회 실행)
-- 관리자 화면에서 업로드한 파일은 public URL 로 stores / upcoming_stores 의 image_url 에 저장됩니다.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'store-images',
  'store-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "store_images_select_public" on storage.objects;
create policy "store_images_select_public"
  on storage.objects for select
  using (bucket_id = 'store-images');

drop policy if exists "store_images_insert_admin" on storage.objects;
create policy "store_images_insert_admin"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'store-images'
    and exists (select 1 from public.admin_users au where au.user_id = auth.uid())
  );

drop policy if exists "store_images_update_admin" on storage.objects;
create policy "store_images_update_admin"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'store-images'
    and exists (select 1 from public.admin_users au where au.user_id = auth.uid())
  )
  with check (
    bucket_id = 'store-images'
    and exists (select 1 from public.admin_users au where au.user_id = auth.uid())
  );

drop policy if exists "store_images_delete_admin" on storage.objects;
create policy "store_images_delete_admin"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'store-images'
    and exists (select 1 from public.admin_users au where au.user_id = auth.uid())
  );
