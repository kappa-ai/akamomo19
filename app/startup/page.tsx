import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FranchiseProcess } from "@/components/home/franchise-process"
import { StartupCost } from "@/components/home/startup-cost"
import { InquiryCTA } from "@/components/home/inquiry-cta"
import { StorePhotoRow } from "@/components/store/store-media"
import { storePhotoSlots } from "@/lib/store-photos"
import { Rocket } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/motion/reveal"

export default function StartupPage() {
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
                성공적인 가맹을 시작하세요
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                체계적인 지원 시스템과 검증된 비즈니스 모델로
                <br />
                가맹 초보자도 안심하고 시작할 수 있습니다.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild className="rounded-full bg-primary hover:bg-coral text-white px-8">
                  <Link href="/inquiry">가맹 상담 신청하기</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-peach-light hover:bg-peach-lighter">
                  <a href="tel:1588-0000">전화 상담: 1588-0000</a>
                </Button>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50%+</div>
                <p className="text-sm text-muted-foreground">높은 수익률</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">주 1회</div>
                <p className="text-sm text-muted-foreground">매장 관리</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">0원</div>
                <p className="text-sm text-muted-foreground">월 로열티</p>
              </div>
              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">본사 지원</p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="pb-16 md:pb-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                실제 <span className="text-primary">운영 매장</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                무인·부업형 운영이 가능한 실제 매장 환경을 참고해 보세요.
              </p>
            </div>
            <StorePhotoRow images={storePhotoSlots.startupAfterStatsPair} aspect="video" />
          </div>
        </RevealSection>

        <StartupCost />
        <FranchiseProcess />
        <InquiryCTA />
      </main>
      <Footer />
    </div>
  )
}
