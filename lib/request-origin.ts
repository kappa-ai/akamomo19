/** 알림 메일·리다이렉트용 절대 URL (프록시 환경은 x-forwarded-* 사용). */
export function absoluteUrlFromRequest(request: Request, pathname: string): string {
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host")
  const proto = request.headers.get("x-forwarded-proto") ?? "https"
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  if (!host) {
    const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
    if (base) return `${base}${path}`
    return path
  }
  return `${proto}://${host}${path}`
}
