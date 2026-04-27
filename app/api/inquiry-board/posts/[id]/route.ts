import { NextResponse } from "next/server"
import { createServiceSupabaseClient, isSupabaseServiceRoleConfigured } from "@/lib/supabase/service"
import {
  INQUIRY_BOARD_UNLOCK_COOKIE,
  isPostUnlocked,
  parseUnlockCookie,
} from "@/lib/inquiry-board-unlock-cookie"
import type { InquiryBoardCommentRow, InquiryBoardPostRow } from "@/lib/inquiry-board-types"

type Ctx = { params: Promise<{ id: string }> }

function getUnlockCookie(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie") ?? ""
  const raw = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${INQUIRY_BOARD_UNLOCK_COOKIE}=`))
  const v = raw?.split("=").slice(1).join("=")
  return v ? decodeURIComponent(v) : undefined
}

export async function GET(_request: Request, ctx: Ctx) {
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

  const unlockPayload = parseUnlockCookie(getUnlockCookie(_request), signSecret)
  const unlocked = isPostUnlocked(unlockPayload, id)

  const supabase = createServiceSupabaseClient()
  const { data: post, error } = await supabase
    .from("inquiry_board_posts")
    .select("id, title, body, is_secret, author_name, phone, created_at")
    .eq("id", id)
    .maybeSingle()

  if (error || !post) {
    return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 })
  }

  const row = post as Omit<InquiryBoardPostRow, "password_hash">
  const full: InquiryBoardPostRow = { ...row, password_hash: null }

  const { data: comments } = await supabase
    .from("inquiry_board_comments")
    .select("id, post_id, body, author_name, is_staff, created_at")
    .eq("post_id", id)
    .order("created_at", { ascending: true })

  const reveal = !full.is_secret || unlocked
  return NextResponse.json({
    post: {
      id: full.id,
      title: full.title,
      body: reveal ? full.body : null,
      is_secret: full.is_secret,
      author_name: full.author_name,
      phone: reveal ? full.phone : null,
      created_at: full.created_at,
      body_revealed: reveal,
      comments: reveal
        ? ((comments ?? []) as InquiryBoardCommentRow[]).map((c) => ({
            id: c.id,
            post_id: c.post_id,
            body: c.body,
            author_name: c.author_name,
            is_staff: c.is_staff,
            created_at: c.created_at,
          }))
        : [],
    },
  })
}
