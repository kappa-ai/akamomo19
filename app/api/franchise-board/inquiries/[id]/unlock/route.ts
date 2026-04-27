import { NextResponse } from "next/server"
import { z } from "zod"
import {
  INQUIRY_BOARD_UNLOCK_COOKIE,
  getBoardCookieSigningSecret,
  withUnlock,
} from "@/lib/inquiry-board-unlock-cookie"
import { verifyPostPassword } from "@/lib/inquiry-board-password"
import { createServiceSupabaseClient, isSupabaseServiceRoleConfigured } from "@/lib/supabase/service"

type Ctx = { params: Promise<{ id: string }> }

const bodySchema = z.object({
  password: z.string().min(1).max(200),
})

function getCookieRaw(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie") ?? ""
  const raw = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith(`${INQUIRY_BOARD_UNLOCK_COOKIE}=`))
  const v = raw?.split("=").slice(1).join("=")
  return v ? decodeURIComponent(v) : undefined
}

const UNLOCK_TTL_SEC = 60 * 60 * 24 * 7

export async function POST(request: Request, ctx: Ctx) {
  if (!isSupabaseServiceRoleConfigured()) {
    return NextResponse.json({ error: "문의게시판 서비스 설정이 필요합니다." }, { status: 503 })
  }
  const secret = getBoardCookieSigningSecret()
  if (!secret) {
    return NextResponse.json({ error: "SUPABASE_SERVICE_ROLE_KEY 가 필요합니다." }, { status: 503 })
  }

  const { id } = await ctx.params
  if (!/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 })
  }

  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 })
  }
  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "비밀번호를 입력해 주세요." }, { status: 400 })
  }

  const supabase = createServiceSupabaseClient()
  const { data: row, error } = await supabase
    .from("franchise_inquiries")
    .select("id, is_secret, password_hash")
    .eq("id", id)
    .maybeSingle()

  if (error || !row) {
    return NextResponse.json({ error: "글을 찾을 수 없습니다." }, { status: 404 })
  }

  const inv = row as { id: string; is_secret: boolean; password_hash: string | null }
  if (!inv.is_secret || !inv.password_hash) {
    return NextResponse.json({ ok: true })
  }

  if (!verifyPostPassword(parsed.data.password, inv.password_hash)) {
    return NextResponse.json({ error: "비밀번호가 일치하지 않습니다." }, { status: 401 })
  }

  const nextVal = withUnlock(getCookieRaw(request), secret, id, UNLOCK_TTL_SEC)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(INQUIRY_BOARD_UNLOCK_COOKIE, nextVal, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: UNLOCK_TTL_SEC,
  })
  return res
}
