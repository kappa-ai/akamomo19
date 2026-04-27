import { createHmac, timingSafeEqual } from "crypto"

export const INQUIRY_BOARD_UNLOCK_COOKIE = "inquiry_board_unlocks"

type UnlockPayload = { exp: Record<string, number> }

function signBody(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("base64url")
}

export function parseUnlockCookie(raw: string | undefined, secret: string): UnlockPayload | null {
  if (!raw?.includes(".")) return null
  const dot = raw.lastIndexOf(".")
  const body = raw.slice(0, dot)
  const sig = raw.slice(dot + 1)
  if (!body || !sig) return null
  const expected = signBody(body, secret)
  try {
    const a = Buffer.from(sig, "base64url")
    const b = Buffer.from(expected, "base64url")
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as UnlockPayload
    if (!parsed || typeof parsed.exp !== "object" || parsed.exp === null) return null
    return parsed
  } catch {
    return null
  }
}

export function serializeUnlockCookie(payload: UnlockPayload, secret: string): string {
  const body = Buffer.from(JSON.stringify({ exp: payload.exp }), "utf8").toString("base64url")
  const sig = signBody(body, secret)
  return `${body}.${sig}`
}

export function isPostUnlocked(payload: UnlockPayload | null, postId: string): boolean {
  if (!payload) return false
  const until = payload.exp[postId]
  return typeof until === "number" && until > Math.floor(Date.now() / 1000)
}

export function withUnlock(
  currentRaw: string | undefined,
  secret: string,
  postId: string,
  ttlSeconds: number
): string {
  const prev = parseUnlockCookie(currentRaw, secret) ?? { exp: {} }
  prev.exp[postId] = Math.floor(Date.now() / 1000) + ttlSeconds
  return serializeUnlockCookie(prev, secret)
}

/** 해제 쿠키 서명용 — 별도 env 없이 서비스 롤 키만 사용(서버에서만 읽음) */
export function getBoardCookieSigningSecret(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
}
