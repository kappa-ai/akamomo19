"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BRAND_LOGO_ALT, BRAND_LOGO_SRC } from "@/lib/brand-logo"

function buildNavigation(showStoresNav: boolean) {
  return [
    { name: "HOME", href: "/" },
    { name: "브랜드소개", href: "/brand" },
    { name: "가맹안내", href: "/startup" },
    { name: "가맹문의", href: "/inquiry" },
    ...(showStoresNav ? [{ name: "매장안내", href: "/stores" as const }] : []),
    { name: "전용도매몰", href: "/wholesale" },
  ]
}

type HeaderClientProps = {
  showStoresNav?: boolean
}

export function HeaderClient({ showStoresNav = true }: HeaderClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = buildNavigation(showStoresNav)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={BRAND_LOGO_SRC}
              alt={BRAND_LOGO_ALT}
              width={360}
              height={100}
              className="h-10 w-auto max-w-[min(52vw,260px)] object-contain object-left"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Button asChild className="rounded-full bg-primary px-6 text-white hover:bg-coral">
              <Link href="/inquiry">가맹 상담 신청</Link>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-cream">
              <div className="mt-8 flex flex-col gap-6">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Image
                    src={BRAND_LOGO_SRC}
                    alt={BRAND_LOGO_ALT}
                    width={360}
                    height={100}
                    className="h-9 w-auto max-w-[240px] object-contain object-left"
                  />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="border-b border-border py-2 text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-4 rounded-full bg-primary text-white hover:bg-coral">
                  <Link href="/inquiry" onClick={() => setIsOpen(false)}>
                    가맹 상담 신청하기
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
