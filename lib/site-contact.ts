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

export type PageTitles = {
  page_title_home: string
  page_title_stores: string
  page_title_startup: string
  page_title_inquiry: string
}

export const PAGE_TITLE_DEFAULTS: PageTitles = {
  page_title_home: "아카모모 파트너스 | 초기비용 부담 없는 무인 성인용품 창업",
  page_title_stores: "매장 찾기 | 아카모모 파트너스",
  page_title_startup: "창업 안내 | 아카모모 파트너스",
  page_title_inquiry: "문의하기 | 아카모모 파트너스",
}

export type SiteContactRow = SiteContact &
  PageTitles & {
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
