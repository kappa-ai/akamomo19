import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BrandSummary } from "@/components/home/brand-summary"
import { Differentiation } from "@/components/home/differentiation"
import { TargetAudience } from "@/components/home/target-audience"
import { SideJobOperation } from "@/components/brand/side-job-operation"
import { HeadquartersSupport } from "@/components/brand/headquarters-support"
import { Heart } from "lucide-react"
import { RevealSection } from "@/components/motion/reveal"
import { getSiteContact } from "@/lib/get-site-contact"

export default async function BrandPage() {
  const contact = await getSiteContact()
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <RevealSection
          mode="enter"
          aria-label="브랜드 소개 히어로"
          className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-gradient-to-b from-peach-lighter to-background"
        >
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-28 pt-10 sm:px-6 sm:pb-32 sm:pt-12 lg:px-8 lg:pb-36">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-peach-light bg-white px-4 py-2 shadow-sm">
                <Heart className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">브랜드 소개</span>
              </div>

              <h1 className="mb-4 w-full text-balance text-center text-3xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                <span className="text-primary">아카모모</span>를 소개합니다
              </h1>

              <p className="max-w-2xl text-pretty text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
                부담 없이 경험하는 새로운 성인용품 라이프스타일,
                <br className="hidden sm:block" />
                아카모모만의 특별한 공간 철학을 만나보세요.
              </p>
            </div>
          </div>
        </RevealSection>

        <BrandSummary />

        <Differentiation />
        <SideJobOperation />
        <TargetAudience />
        <HeadquartersSupport />
      </main>
      <Footer contact={contact} />
    </div>
  )
}
