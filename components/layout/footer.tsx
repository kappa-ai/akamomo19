import Link from "next/link"
import Image from "next/image"
import type { SiteContact } from "@/lib/site-contact"
import { telHref } from "@/lib/site-contact"

export function Footer({ contact }: { contact: SiteContact }) {
  const phoneHref = telHref(contact.phone)

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Company Info */}
          <div className="md:col-span-2">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01_akamomo_logo-IfYDbiEAfToiPJwiER9scHRCcSdRIk.png"
                alt="아카모모"
                width={120}
                height={35}
                className="h-9 w-auto mb-4"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              아카모모는 누구나 부담 없이 성인용품을 경험할 수 있도록<br />
              만든 라이프스타일 브랜드입니다.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
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

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">바로가기</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/brand" className="text-muted-foreground hover:text-primary transition-colors">
                  브랜드소개
                </Link>
              </li>
              <li>
                <Link href="/startup" className="text-muted-foreground hover:text-primary transition-colors">
                  가맹안내
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-muted-foreground hover:text-primary transition-colors">
                  가맹문의
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-muted-foreground hover:text-primary transition-colors">
                  매장안내
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">가맹 문의</h4>
            <div className="space-y-3">
              <a
                href={phoneHref}
                className="block bg-white rounded-2xl p-4 border border-border transition-colors hover:border-primary/30"
              >
                <p className="text-xs text-muted-foreground mb-1">전화 상담</p>
                <p className="text-lg font-bold text-primary">{contact.phone}</p>
                <p className="text-xs text-muted-foreground mt-1">평일 09:00 - 18:00</p>
              </a>
              <Link
                href="/inquiry"
                className="block text-center bg-primary text-white rounded-full py-3 text-sm font-medium hover:bg-coral transition-colors"
              >
                온라인 상담 신청
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-xs text-muted-foreground">
            © 2024 아카모모. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
