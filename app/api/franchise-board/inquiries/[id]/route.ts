import { NextResponse } from "next/server"
import {
  formatFranchiseInquiryBody,
  type FranchiseInquiryMessageRow,
  type FranchiseInquiryRow,
} from "@/lib/franchise-inquiry"
import {
  INQUIRY_BOARD_UNLOCK_COOKIE,
  isPostUnlocked,
  parseUnlockCookie,
} from "@/lib/inquiry-board-unlock-cookie"
import { createServiceSupabaseClient, isSupabaseServiceRoleConfigured } from "@/lib/supabase/service"

type Ctx = { params: Promise<{ id: string }> }

function getUnlockCookie(request: Request, signSecret: string) {
  const cookieHeader = request.headers.get("cookie") ?? ""
  const raw = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${INQUIRY_BOARD_UNLOCK_COOKIE}=`))
  const v = raw?.split("=").slice(1).join("=")
  return parseUnlockCookie(decodeURIComponent(v ?? ""), signSecret)
}

export async function GET(request: Request, ctx: Ctx) {
  if (!isSupabaseServiceRoleConfigured()) {
    return NextResponse.json({ error: "문의게시판 서비스 설정이 필요합니다." }, { status: 503 })
  }
  const signSecret = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!signSecret) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY 가 필요합니다." }, { status: 503 })
  }

  const { id } = await ctx.params
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 })
  }

  const unlockPayload = getUnlockCookie(request, signSecret)
  const unlocked = isPostUnlocked(unlockPayload, id)

  const supabase = createServiceSupabaseClient()
  const { data: row, error } = await supabase
    .from("franchise_inquiries")
    .select("id, name, phone, region, timing, message, is_secret, created_at")
    .eq("id", id)
    .maybeSingle()

  if (error || !row) {
    return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 })
  }

  const inv = row as FranchiseInquiryRow
  const reveal = !inv.is_secret || unlocked
  const bodyText = formatFranchiseInquiryBody(inv)

  const { data: mRows } = await supabase
    .from("franchise_inquiry_messages")
    .select("id, inquiry_id, body, is_staff, created_at")
    .eq("inquiry_id", id)
    .order("created_at", { ascending: true })

  const msgs = (mRows ?? []) as FranchiseInquiryMessageRow[]
  const comments = reveal
    ? msgs.map((m) => ({
        id: m.id,
        body: m.body,
        author_name: m.is_staff ? "Akamomo" : "문의자",
        is_staff: m.is_staff,
        created_at: m.created_at,
      }))
    : []

  return NextResponse.json({
    post: {
      id: inv.id,
      title: reveal ? `${inv.name}님 상담 문의` : "비밀 상담 신청",
      body: reveal ? bodyText : null,
      is_secret: inv.is_secret,
      author_name: reveal ? inv.name : "비공개",
      phone: reveal ? inv.phone : null,
      created_at: inv.created_at,
      body_revealed: reveal,
      comments,
    },
  })
}
