export type SiteContact = {
  phone: string
  contact_email: string
  ceo_name: string
  business_reg_no: string
}

export const SITE_CONTACT_DEFAULTS: SiteContact = {
  phone: "1588-0000",
  contact_email: "contact@akamomo.co.kr",
  ceo_name: "홍길동",
  business_reg_no: "000-00-00000",
}

export type SiteContactRow = SiteContact & {
  id: number
  updated_at: string
}

/** tel: 링크용 — 공백·하이픈 제거 후 숫자만 사용 */
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  return digits ? `tel:${digits}` : "tel:"
}

export function mailtoHref(email: string): string {
  const e = email.trim()
  return e ? `mailto:${e}` : "mailto:"
}
