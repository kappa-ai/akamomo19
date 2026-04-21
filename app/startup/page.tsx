import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FranchiseProcess } from "@/components/home/franchise-process"
import { StartupCost } from "@/components/home/startup-cost"
import { Rocket } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/motion/reveal"
import { getSiteContact } from "@/lib/get-site-contact"
import { getPageTitles } from "@/lib/get-page-titles"
import { telHref } from "@/lib/site-contact"

export async function generateMetadata(): Promise<Metadata> {
  const titles = await getPageTitles()
  return { title: titles.page_title_startup }
}

export default async function StartupPage() {
  const contact = await getSiteContact()
  const phoneHref = telHref(contact.phone)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <RevealSection mode="enter" className="relative py-20 bg-gradient-to-b from-peach-lighter to-background overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blush/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-lavender/30 rounded-full blur-2xl" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-peach-light">
                <Rocket className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">가맹 안내</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                <span className="text-primary">아카모모</span>와 함께<br />
                성공적인 창업을 시작하세요
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                체계적인 지원 시스템과 검증된 비즈니스 모델로
                <br />
                초보 창업자도 안심하고 시작할 수 있습니다.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="rounded-full bg-primary hover:bg-coral text-white px-8">
                  <Link href="/inquiry">가맹 상담 신청하기</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-peach-light hover:bg-peach-lighter">
                  <a href={phoneHref}>전화 상담: {contact.phone}</a>
                </Button>
              </div>
            </div>
          </div>
        </RevealSection>

        <StartupCost />
        <FranchiseProcess />
      </main>
      <Footer contact={contact} />
    </div>
  )
}
