import { NextResponse } from "next/server"
import { inquiryOnlineApplySchema } from "@/lib/franchise-inquiry"
import { hashPostPassword } from "@/lib/inquiry-board-password"
import { absoluteUrlFromRequest } from "@/lib/request-origin"
import { createAnonSupabaseClient } from "@/lib/supabase/anon-server"

async function resolveNotifyEmail(supabase: ReturnType<typeof createAnonSupabaseClient>): Promise<string | null> {
  const fromEnv = process.env.INQUIRY_NOTIFY_EMAIL?.trim()
  if (fromEnv) return fromEnv
  const { data } = await supabase.from("site_contact").select("contact_email").eq("id", 1).maybeSingle()
  const row = data as { contact_email?: string } | null
  const email = row?.contact_email?.trim()
  return email && email.length > 0 ? email : null
}

async function sendInquiryBoardNotifyEmail(opts: {
  notifyEmail: string
  name: string
  phone: string
  region: string
  timing: string
  message: string
  adminUrl: string
  boardUrl: string
}) {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(opts.notifyEmail)}`
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      _subject: "아카모모 가맹문의 접수",
      _captcha: "false",
      이름: opts.name,
      연락처: opts.phone,
      희망지역: opts.region,
      가맹예정시기: opts.timing,
      문의내용: opts.message,
      "게시글(관리자)": opts.adminUrl,
      "공개 게시판": opts.boardUrl,
    }),
  })
  return res.ok
}

export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: "JSON 본문이 필요합니다." }, { status: 400 })
  }

  const parsed = inquiryOnlineApplySchema.safeParse(json)
  if (!parsed.success) {
    const flat = parsed.error.flatten()
    const msg =
      flat.fieldErrors.password?.[0] ??
      flat.fieldErrors.password_confirm?.[0] ??
      flat.fieldErrors.is_secret?.[0] ??
      flat.fieldErrors.name?.[0] ??
      flat.fieldErrors.phone?.[0] ??
      "입력값을 확인해 주세요."
    return NextResponse.json({ error: msg }, { status: 400 })
  }

  const { name, phone, region, timing, message, password } = parsed.data
  const password_hash = password?.trim() ? hashPostPassword(password.trim()) : null

  try {
    const supabase = createAnonSupabaseClient()
    const { data: rows, error } = await supabase.rpc("submit_franchise_inquiry", {
      p_name: name,
      p_phone: phone,
      p_region: region ?? "",
      p_timing: timing ?? "",
      p_message: message ?? "",
      p_is_secret: true,
      p_password_hash: password_hash,
    })

    if (error) {
      console.error("submit_franchise_inquiry", error)
      return NextResponse.json({ error: "문의 저장에 실패했습니다. 잠시 후 다시 시도해 주세요." }, { status: 502 })
    }

    const row = Array.isArray(rows) ? rows[0] : null
    const id = row?.id as string | undefined
    if (!id) {
      return NextResponse.json({ error: "문의 저장 응답이 올바르지 않습니다. DB 마이그레이션을 적용했는지 확인해 주세요." }, { status: 502 })
    }

    const adminUrl = absoluteUrlFromRequest(request, `/admin/inquiries/${id}`)
    const boardListUrl = absoluteUrlFromRequest(request, "/inquiry/board")
    const boardPostUrl = absoluteUrlFromRequest(request, `/inquiry/board/${id}`)

    const notifyEmail = await resolveNotifyEmail(supabase)
    if (notifyEmail) {
      const ok = await sendInquiryBoardNotifyEmail({
        notifyEmail,
        name,
        phone,
        region: region || "-",
        timing: timing || "-",
        message: message || "-",
        adminUrl,
        boardUrl: `${boardPostUrl} (목록: ${boardListUrl})`,
      })
      if (!ok) {
        console.error("FormSubmit inquiry notify failed", { notifyEmail })
      }
    } else {
      console.warn("No notify email: set INQUIRY_NOTIFY_EMAIL or site_contact.contact_email")
    }

    return NextResponse.json({ ok: true, boardPath: `/inquiry/board/${id}`, boardListPath: "/inquiry/board" })
  } catch (e) {
    console.error("POST /api/inquiry", e)
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 })
  }
}
