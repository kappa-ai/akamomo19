import { NextResponse } from "next/server"
import { z } from "zod"
import { createServiceSupabaseClient, isSupabaseServiceRoleConfigured } from "@/lib/supabase/service"
import {
  INQUIRY_BOARD_UNLOCK_COOKIE,
  isPostUnlocked,
  parseUnlockCookie,
} from "@/lib/inquiry-board-unlock-cookie"
import type { InquiryBoardPostRow } from "@/lib/inquiry-board-types"

type Ctx = { params: Promise<{ id: string }> }

const commentSchema = z.object({
  body: z.string().trim().min(1).max(5000),
  author_name: z.string().trim().min(1).max(80),
})

function getUnlockCookie(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie") ?? ""
  const raw = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${INQUIRY_BOARD_UNLOCK_COOKIE}=`))
  const v = raw?.split("=").slice(1).join("=")
  return v ? decodeURIComponent(v) : undefined
}

export async function POST(request: Request, ctx: Ctx) {
  if (!isSupabaseServiceRoleConfigured()) {
    return NextResponse.json({ error: "문의게시판 서비스 설정이 필요합니다." }, { status: 503 })
  }
  const signSecret = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!signSecret) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY 가 필요합니다." }, { status: 503 })
  }

  const { id: postId } = await ctx.params
  if (!/^[0-9a-f-]{36}$/i.test(postId)) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 })
  }
  const parsed = commentSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "입력값을 확인해 주세요." }, { status: 400 })
  }

  const supabase = createServiceSupabaseClient()
  const { data: post, error: pe } = await supabase
    .from("inquiry_board_posts")
    .select("id, is_secret")
    .eq("id", postId)
    .maybeSingle()

  if (pe || !post) {
    return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 })
  }

  const row = post as Pick<InquiryBoardPostRow, "id" | "is_secret">
  if (row.is_secret) {
    const payload = parseUnlockCookie(getUnlockCookie(request), signSecret)
    if (!isPostUnlocked(payload, postId)) {
      return NextResponse.json({ error: "비밀글은 비밀번호 확인 후 댓글을 작성할 수 있습니다." }, { status: 403 })
    }
  }

  const { data, error } = await supabase
    .from("inquiry_board_comments")
    .insert({
      post_id: postId,
      body: parsed.data.body,
      author_name: parsed.data.author_name,
      is_staff: false,
    })
    .select("id")
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "댓글 저장에 실패했습니다." }, { status: 500 })
  }

  return NextResponse.json({ id: data.id }, { status: 201 })
}
