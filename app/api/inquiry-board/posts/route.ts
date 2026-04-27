import { NextResponse } from "next/server"
import { z } from "zod"
import { createServiceSupabaseClient, isSupabaseServiceRoleConfigured } from "@/lib/supabase/service"
import {
  INQUIRY_BOARD_UNLOCK_COOKIE,
  isPostUnlocked,
  parseUnlockCookie,
} from "@/lib/inquiry-board-unlock-cookie"
import { hashPostPassword } from "@/lib/inquiry-board-password"
import type { InquiryBoardCommentRow, InquiryBoardPostRow } from "@/lib/inquiry-board-types"

const createSchema = z.object({
  title: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(20000),
  author_name: z.string().trim().min(1).max(80),
  phone: z.string().trim().max(30).optional().nullable(),
  is_secret: z.boolean(),
  password: z.string().max(200).optional().nullable(),
})

function maskPost(
  row: InquiryBoardPostRow,
  comments: InquiryBoardCommentRow[] | undefined,
  unlocked: boolean
) {
  const reveal = !row.is_secret || unlocked
  return {
    id: row.id,
    title: row.title,
    body: reveal ? row.body : null,
    is_secret: row.is_secret,
    author_name: row.author_name,
    phone: reveal ? row.phone : null,
    created_at: row.created_at,
    body_revealed: reveal,
    comments: reveal
      ? (comments ?? []).map((c) => ({
          id: c.id,
          post_id: c.post_id,
          body: c.body,
          author_name: c.author_name,
          is_staff: c.is_staff,
          created_at: c.created_at,
        }))
      : [],
  }
}

export async function GET(request: Request) {
  if (!isSupabaseServiceRoleConfigured()) {
    return NextResponse.json({ error: "문의게시판 서비스 설정이 필요합니다." }, { status: 503 })
  }
  const signSecret = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!signSecret) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY 가 필요합니다." }, { status: 503 })
  }

  const cookieHeader = request.headers.get("cookie") ?? ""
  const rawCookie = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${INQUIRY_BOARD_UNLOCK_COOKIE}=`))
  const cookieVal = rawCookie?.split("=").slice(1).join("=")
  const unlockPayload = parseUnlockCookie(decodeURIComponent(cookieVal ?? ""), signSecret)

  const supabase = createServiceSupabaseClient()
  const { data: posts, error } = await supabase
    .from("inquiry_board_posts")
    .select("id, title, body, is_secret, author_name, phone, created_at")
    .order("created_at", { ascending: false })
    .limit(100)

  if (error) {
    return NextResponse.json({ error: "목록을 불러오지 못했습니다." }, { status: 500 })
  }

  const rows = (posts ?? []) as Omit<InquiryBoardPostRow, "password_hash">[]
  const ids = rows.map((r) => r.id)
  let allComments: InquiryBoardCommentRow[] = []
  if (ids.length > 0) {
    const { data: cRows } = await supabase
      .from("inquiry_board_comments")
      .select("id, post_id, body, author_name, is_staff, created_at")
      .in("post_id", ids)
      .order("created_at", { ascending: true })
    allComments = (cRows ?? []) as InquiryBoardCommentRow[]
  }

  const byPost = new Map<string, InquiryBoardCommentRow[]>()
  for (const c of allComments) {
    const list = byPost.get(c.post_id) ?? []
    list.push(c)
    byPost.set(c.post_id, list)
  }

  const list = rows.map((r) => {
    const full: InquiryBoardPostRow = { ...r, password_hash: null }
    const unlocked = isPostUnlocked(unlockPayload, r.id)
    return maskPost(full, byPost.get(r.id), unlocked)
  })

  return NextResponse.json({ posts: list })
}

export async function POST(request: Request) {
  if (!isSupabaseServiceRoleConfigured()) {
    return NextResponse.json({ error: "문의게시판 서비스 설정이 필요합니다." }, { status: 503 })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 })
  }

  const parsed = createSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "입력값을 확인해 주세요." }, { status: 400 })
  }

  const { title, body, author_name, phone, is_secret, password } = parsed.data
  if (is_secret) {
    const pw = password?.trim()
    if (!pw || pw.length < 4) {
      return NextResponse.json({ error: "비밀글은 4자 이상 비밀번호가 필요합니다." }, { status: 400 })
    }
  }

  const password_hash = is_secret && password ? hashPostPassword(password.trim()) : null

  const supabase = createServiceSupabaseClient()
  const { data, error } = await supabase
    .from("inquiry_board_posts")
    .insert({
      title,
      body,
      author_name,
      phone: phone?.trim() || null,
      is_secret,
      password_hash,
    })
    .select("id")
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "저장에 실패했습니다." }, { status: 500 })
  }

  return NextResponse.json({ id: data.id }, { status: 201 })
}
