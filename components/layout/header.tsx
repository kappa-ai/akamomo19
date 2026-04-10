"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "HOME", href: "/" },
  { name: "브랜드소개", href: "/brand" },
  { name: "창업안내", href: "/startup" },
  { name: "창업문의", href: "/inquiry" },
  { name: "매장안내", href: "/stores" },
  { name: "전용도매몰", href: "/wholesale" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01_akamomo_logo-IfYDbiEAfToiPJwiER9scHRCcSdRIk.png"
              alt="아카모모"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Button asChild className="rounded-full bg-primary hover:bg-coral text-white px-6">
              <Link href="/inquiry">창업 상담 신청</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-cream">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01_akamomo_logo-IfYDbiEAfToiPJwiER9scHRCcSdRIk.png"
                    alt="아카모모"
                    width={120}
                    height={35}
                    className="h-9 w-auto"
                  />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="mt-4 rounded-full bg-primary hover:bg-coral text-white">
                  <Link href="/inquiry" onClick={() => setIsOpen(false)}>
                    창업 상담 신청하기
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
