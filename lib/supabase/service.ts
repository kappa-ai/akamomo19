import { createClient } from "@supabase/supabase-js"

/** 공개 문의게시판 API 전용 — 서버에서만 사용. RLS를 우회합니다. */
export function isSupabaseServiceRoleConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.length && process.env.SUPABASE_SERVICE_ROLE_KEY?.length
  )
}

export function createServiceSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY 가 설정되지 않았습니다.")
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
