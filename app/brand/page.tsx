import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BrandSummary } from "@/components/home/brand-summary"
import { Differentiation } from "@/components/home/differentiation"
import { TargetAudience } from "@/components/home/target-audience"
import { SideJobOperation } from "@/components/brand/side-job-operation"
import { HeadquartersSupport } from "@/components/brand/headquarters-support"
import { Heart } from "lucide-react"

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative py-16 md:py-20 bg-gradient-to-b from-peach-lighter to-background overflow-hidden">
          <div className="absolute top-10 right-10 w-40 h-40 bg-blush/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-lavender/30 rounded-full blur-2xl" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-peach-light">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">브랜드 소개</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                <span className="text-primary">아카모모</span>를 소개합니다
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                부담 없이 경험하는 새로운 성인용품 라이프스타일,
                <br />
                아카모모만의 특별한 공간 철학을 만나보세요.
              </p>
            </div>
          </div>
        </section>

        <BrandSummary />
        <Differentiation />
        <SideJobOperation />
        <TargetAudience />
        <HeadquartersSupport />
      </main>
      <Footer />
    </div>
  )
}
