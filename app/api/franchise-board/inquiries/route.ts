import { NextResponse } from "next/server"
import type { FranchiseBoardPublicPost } from "@/lib/franchise-board-public"
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

function mapMessage(m: FranchiseInquiryMessageRow): FranchiseBoardPublicPost["comments"][0] {
  return {
    id: m.id,
    body: m.body,
    author_name: m.is_staff ? "Akamomo" : "문의자",
    is_staff: m.is_staff,
    created_at: m.created_at,
  }
}

function getUnlockCookie(request: Request, signSecret: string) {
  const cookieHeader = request.headers.get("cookie") ?? ""
  const raw = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${INQUIRY_BOARD_UNLOCK_COOKIE}=`))
  const v = raw?.split("=").slice(1).join("=")
  return parseUnlockCookie(decodeURIComponent(v ?? ""), signSecret)
}

export async function GET(request: Request) {
  if (!isSupabaseServiceRoleConfigured()) {
    return NextResponse.json({ error: "문의게시판 서비스 설정이 필요합니다." }, { status: 503 })
  }
  const signSecret = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!signSecret) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY 가 필요합니다." }, { status: 503 })
  }

  const unlockPayload = getUnlockCookie(request, signSecret)
  const supabase = createServiceSupabaseClient()
  const { data: rows, error } = await supabase
    .from("franchise_inquiries")
    .select("id, name, phone, region, timing, message, is_secret, created_at")
    .order("created_at", { ascending: false })
    .limit(100)

  if (error) {
    return NextResponse.json({ error: "목록을 불러오지 못했습니다." }, { status: 500 })
  }

  const inquiries = (rows ?? []) as FranchiseInquiryRow[]
  const ids = inquiries.map((r) => r.id)
  let allMessages: FranchiseInquiryMessageRow[] = []
  if (ids.length > 0) {
    const { data: mRows } = await supabase
      .from("franchise_inquiry_messages")
      .select("id, inquiry_id, body, is_staff, created_at")
      .in("inquiry_id", ids)
      .order("created_at", { ascending: true })
    allMessages = (mRows ?? []) as FranchiseInquiryMessageRow[]
  }

  const byInquiry = new Map<string, FranchiseInquiryMessageRow[]>()
  for (const m of allMessages) {
    const list = byInquiry.get(m.inquiry_id) ?? []
    list.push(m)
    byInquiry.set(m.inquiry_id, list)
  }

  const posts: FranchiseBoardPublicPost[] = inquiries.map((inv) => {
    const unlocked = isPostUnlocked(unlockPayload, inv.id)
    const reveal = !inv.is_secret || unlocked
    const bodyText = formatFranchiseInquiryBody(inv)
    const msgs = byInquiry.get(inv.id) ?? []
    return {
      id: inv.id,
      title: reveal ? `${inv.name}님 상담 문의` : "비밀 상담 신청",
      body: reveal ? bodyText : null,
      is_secret: inv.is_secret,
      author_name: reveal ? inv.name : "비공개",
      phone: reveal ? inv.phone : null,
      created_at: inv.created_at,
      body_revealed: reveal,
      comments: reveal ? msgs.map(mapMessage) : [],
    }
  })

  return NextResponse.json({ posts })
}
