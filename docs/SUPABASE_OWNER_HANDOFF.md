# Supabase 설정 (이 프로젝트 기준)

**관리자:** `/admin/login` → `/admin/stores`

## Supabase가 뭔지 한 줄로

Supabase는 **호스팅 Postgres 데이터베이스** + 그 위에 얹은 **REST API**(`https://xxx.supabase.co`, PostgREST)입니다.  
**대시보드 SQL Editor**에서 실행하는 SQL도, CLI로 넣는 마이그레이션도, **전부 그 Postgres 한 대**에서 돌아갑니다.  
REST(anon 키)만으로는 `CREATE TABLE`이나 `auth` 쪽 시드 같은 걸 못 하게 막혀 있는 게 정상입니다.

## 1. 이 저장소에 있는 것

| 파일 | 내용 |
|------|------|
| 루트 **`.env`** | `NEXT_PUBLIC_*` — Next 앱용. (선택) `DATABASE_URL` 은 **B** 경로일 때만. |
| `supabase/migrations/001_stores.sql` | 매장 테이블·RLS·`admin_users` |
| `supabase/sql/seed_admin_user.sql` | 이메일·비밀번호 있는 **관리자 1명**을 `auth` + `public.admin_users`에 한 번에 넣기 |
| `npm run db:apply` | 위 SQL 두 개를 CLI로 순서대로 실행 (`scripts/supabase-apply-sql.sh`) |

## 2. Supabase에서 할 일 (순서)

1. 프로젝트 만들기(또는 기존 프로젝트 사용).
2. **Authentication → Providers → Email** 켜져 있는지 확인.
3. **Authentication → URL Configuration**  
   - **Site URL**: 배포/로컬 주소 (예: `http://localhost:3000` 또는 실제 도메인)  
   - **Redirect URLs**: `http://localhost:3000/auth/callback` 및 배포 도메인의 `/auth/callback`
4. 스키마 + 관리자 시드 — 아래 **A**, **B**, **C** 중 하나.

**A. Supabase CLI로 링크 (권장)**  
- 터미널: `supabase login` (브라우저로 Supabase 계정 로그인)  
- 이 폴더에서: `supabase link --project-ref <프로젝트 ref> -p <Database 비밀번호> --yes`  
  (`ref`는 프로젝트 URL의 `https://<ref>.supabase.co` 중간 값)  
- `seed_admin_user.sql` 안 이메일·비밀번호 수정 후: `npm run db:apply`  
→ 내부적으로 `supabase db query --linked` 로 **플랫폼에 연결된 프로젝트**에 SQL이 들어갑니다.

**B. CLI + 대시보드에서 복사한 Postgres URI**  
- `supabase link` 대신, 대시보드 **Project Settings → Database → Connection string → URI** 를 `.env`에 `DATABASE_URL=...` 로 넣기.  
- `npm run db:apply`  
→ 연결 대상은 **A와 동일한 Supabase 호스팅 DB**입니다. (이름만 “Postgres URL”일 뿐, Supabase 밖 DB가 아님.)

**C. SQL Editor**  
- `001_stores.sql` 전체 실행 → `seed_admin_user.sql` 전체 실행 (같은 이메일이 이미 있으면 시드는 에러).

## 3. 로그인

`/admin/login` 에서 시드에 넣은 **이메일 + 비밀번호**로 들어가면 됩니다.

## 4. 추가 관리자

`seed_admin_user.sql` 을 복사해 이메일·비밀번호만 바꿔 다시 실행하거나, 동일 패턴으로 `auth.users` / `auth.identities` / `admin_users` 를 SQL로 추가하면 됩니다.
