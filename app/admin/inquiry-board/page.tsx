import { redirect } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/stores-db"

export const dynamic = "force-dynamic"

/** 문의게시판은 온라인 상담 신청(`franchise_inquiries`)과 동일 데이터입니다. */
export default async function AdminInquiryBoardRedirectPage() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login")
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  redirect("/admin/inquiries")
}
