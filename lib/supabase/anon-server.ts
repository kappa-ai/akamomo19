import { createClient } from "@supabase/supabase-js"

/** Route Handler 등에서 쿠키 없이 anon 키로 RPC 호출할 때 사용합니다. */
export function createAnonSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 가 설정되지 않았습니다.")
  }
  return createClient(url, key)
}
