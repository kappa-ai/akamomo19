#!/usr/bin/env bash
# 001_stores.sql → 002_storage_store_images.sql → seed_admin_user.sql 순서로 원격에 적용합니다.
# 관리자는 대시보드 Add user + admin_users 가 더 단순합니다. seed 는 생략해도 됨(스크립트에서 두 번째 줄 제거).
#
# Supabase는 “별도 SQL 서버”가 아니라 호스팅 Postgres + PostgREST(API) 조합입니다.
# 대시보드 SQL Editor가 실행하는 것도 이 Postgres입니다.
# https://xxx.supabase.co REST(anon 키)는 DDL·auth 스키마 시드를 받지 않도록 막혀 있어서,
# 스키마/시드는 (1) SQL Editor 또는 (2) CLI가 Postgres에 쿼리를 보내는 방식으로만 적용됩니다.
#
# 적용 경로 (앞에서 성공하면 뒤는 시도하지 않음):
#   1) supabase login + supabase link 가 된 경우 → supabase db query --linked (Management API 경유)
#   2) 아니면 .env 의 DATABASE_URL (대시보드 Database → Connection string → URI, Supabase가 준 연결 문자열)

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v supabase >/dev/null 2>&1; then
  echo "Supabase CLI 가 PATH 에 없습니다. https://supabase.com/docs/guides/cli"
  exit 1
fi

run_linked() {
  supabase db query --linked --agent=no -f "$ROOT/supabase/migrations/001_stores.sql"
  supabase db query --linked --agent=no -f "$ROOT/supabase/migrations/002_storage_store_images.sql"
  supabase db query --linked --agent=no -f "$ROOT/supabase/sql/seed_admin_user.sql"
}

run_db_url() {
  local url="$1"
  supabase db query --db-url "$url" --agent=no -f "$ROOT/supabase/migrations/001_stores.sql"
  supabase db query --db-url "$url" --agent=no -f "$ROOT/supabase/migrations/002_storage_store_images.sql"
  supabase db query --db-url "$url" --agent=no -f "$ROOT/supabase/sql/seed_admin_user.sql"
}

if supabase db query --linked "select 1 as ok" --agent=no >/dev/null 2>&1; then
  echo "연결: Supabase CLI --linked (프로젝트에 link 됨)"
  run_linked
  echo "OK: 001 + 002_storage + seed_admin_user.sql"
  exit 0
fi

if [ ! -f .env ]; then
  echo "이 프로젝트에 supabase link 가 안 되어 있습니다."
  echo "  → 한 번 실행: supabase login 후 supabase link --project-ref <프로젝트 ref> -p <DB 비밀번호> --yes"
  echo "또는 .env 에 DATABASE_URL 을 넣으세요 (대시보드 Database → Connection string → URI)."
  exit 1
fi

DATABASE_URL="$(python3 <<'PY'
import pathlib
p = pathlib.Path(".env")
for line in p.read_text().splitlines():
    line = line.strip()
    if not line or line.startswith("#"):
        continue
    if line.startswith("DATABASE_URL="):
        v = line.split("=", 1)[1].strip()
        if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
            v = v[1:-1]
        print(v)
        raise SystemExit(0)
raise SystemExit(1)
PY
)" || {
  echo "supabase link 가 없고, .env 에 DATABASE_URL 도 없습니다."
  echo "  권장: supabase login → supabase link --project-ref <ref> -p <DB 비밀번호> --yes → npm run db:apply"
  echo "  대안: 대시보드에서 받은 Postgres URI 를 .env 의 DATABASE_URL=... 로 넣기 (SQL Editor와 같은 DB입니다)."
  exit 1
}

echo "연결: DATABASE_URL (Supabase 대시보드에서 준 Postgres 접속 문자열)"
run_db_url "$DATABASE_URL"
echo "OK: 001 + 002_storage + seed_admin_user.sql"
