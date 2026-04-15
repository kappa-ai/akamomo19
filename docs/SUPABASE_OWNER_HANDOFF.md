# Supabase 설정 (이 프로젝트 기준)

**관리자:** `/admin/login` → `/admin/stores`

## 1. 이 저장소에 있는 것

| 파일 | 내용 |
|------|------|
| 루트 **`.env`** | `NEXT_PUBLIC_*` — Next 앱용 |
| `supabase/migrations/001_stores.sql` | 매장 테이블·RLS·`admin_users` (프로젝트당 1회) |
| `supabase/migrations/002_storage_store_images.sql` | Storage 버킷 `store-images` + 업로드/읽기 정책 (관리자 화면 **이미지 업로드**에 필요) |
| `supabase/sql/seed_admin_user.sql` | (선택) SQL로만 관리자 넣을 때 — **보통은 쓰지 않아도 됨** |
| `supabase/sql/fix_auth_user_token_columns.sql` | (선택) 예전 SQL 시드로 깨진 계정만 고칠 때 |
| `npm run db:apply` | `001` + 시드를 CLI로 한 번에 (링크 또는 `DATABASE_URL` 필요) |

## 2. 할 일 순서 (권장 — 가장 단순)

1. **SQL Editor**에서 `001_stores.sql` **전체 1회 실행** (이미 했으면 생략).  
   이어서 **`002_storage_store_images.sql`** 도 1회 실행 (관리자에서 사진 업로드할 때 필요).
2. Supabase **Authentication → Users → Add user**  
   - 쓸 **이메일·비밀번호** 입력  
   - **Auto Confirm User** 켜기  
   - 생성 후 그 사용자 행에서 **UUID** 복사.
3. **SQL Editor**에서 아래만 실행 (`UUID`만 바꿈):

```sql
insert into public.admin_users (user_id) values ('여기에-UUID-붙여넣기');
```

4. **Authentication → Providers → Email** 켜짐 확인.  
5. **Authentication → URL Configuration** — Site URL, Redirect URLs에 사이트 주소·`/auth/callback` 넣기.

이후 `/admin/login` 에서 2번에서 정한 이메일·비밀번호로 로그인하면 됩니다.

## 3. 추가 관리자

2~3번을 반복하면 됩니다 (같은 `admin_users` 테이블에 UUID만 추가).

## 4. (선택) CLI로 SQL 돌리기

`supabase link` 또는 `.env`의 `DATABASE_URL` 설정 후 `npm run db:apply` — `001` + `002_storage` + `seed_admin_user.sql` 순서.  
시드는 bcrypt·스키마 차이로 로그인 문제가 날 수 있어, **운영은 2절 Add user 방식**을 권장합니다.
