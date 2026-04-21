import Link from "next/link"
import Image from "next/image"
import type { SiteContact } from "@/lib/site-contact"
import { telHref } from "@/lib/site-contact"
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from "@/lib/brand-logo"

export type FooterClientProps = {
  contact: SiteContact
  showStoresNav?: boolean
}

export function FooterClient({ contact, showStoresNav = true }: FooterClientProps) {
  const phoneHref = telHref(contact.phone)

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/">
              <Image
                src={BRAND_LOGO_SRC}
                alt={BRAND_LOGO_ALT}
                width={360}
                height={100}
                className="mb-4 h-9 w-auto max-w-[220px] object-contain object-left"
              />
            </Link>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              아카모모는 누구나 부담 없이 성인용품을 경험할 수 있도록<br />
              만든 라이프스타일 브랜드입니다.
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>상호명: 아카모모</p>
              <p>대표: {contact.ceo_name}</p>
              <p>사업자등록번호: {contact.business_reg_no}</p>
              <p>이메일: {contact.contact_email}</p>
              <p>
                전화:{" "}
                <a href={phoneHref} className="underline-offset-2 hover:text-primary hover:underline">
                  {contact.phone}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">바로가기</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/brand" className="text-muted-foreground transition-colors hover:text-primary">
                  브랜드소개
                </Link>
              </li>
              <li>
                <Link href="/startup" className="text-muted-foreground transition-colors hover:text-primary">
                  가맹안내
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-muted-foreground transition-colors hover:text-primary">
                  가맹문의
                </Link>
              </li>
              {showStoresNav ? (
                <li>
                  <Link href="/stores" className="text-muted-foreground transition-colors hover:text-primary">
                    매장안내
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-foreground">가맹 문의</h4>
            <div className="space-y-3">
              <a
                href={phoneHref}
                className="block rounded-2xl border border-border bg-white p-4 transition-colors hover:border-primary/30"
              >
                <p className="mb-1 text-xs text-muted-foreground">전화 상담</p>
                <p className="text-lg font-bold text-primary">{contact.phone}</p>
                <p className="mt-1 text-xs text-muted-foreground">평일 09:00 - 18:00</p>
              </a>
              <Link
                href="/inquiry"
                className="block rounded-full bg-primary py-3 text-center text-sm font-medium text-white transition-colors hover:bg-coral"
              >
                온라인 상담 신청
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted-foreground">© 2024 아카모모. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
