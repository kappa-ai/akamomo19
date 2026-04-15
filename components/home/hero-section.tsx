import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { HeroStoreBackdrop } from "@/components/home/hero-store-backdrop"
import { storePhotoSlots } from "@/lib/store-photos"
import { RevealSection } from "@/components/motion/reveal"

/** 배경 이미지: `lib/store-photos.ts` → `storePhotoSlots.homeHero` */
export function HeroSection() {
  return (
    <RevealSection
      mode="enter"
      role="banner"
      aria-label="아카모모 메인 소개"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-background"
    >
      <HeroStoreBackdrop src={storePhotoSlots.homeHero} priority />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-28 pt-10 sm:px-6 sm:pb-32 sm:pt-12 lg:px-8 lg:pb-36">
        <div className="mx-auto w-full max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-peach-light shadow-sm">
            <Sparkles className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-foreground">새로운 형태의 성인용품 가맹</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            <span className="text-balance">부담 없이 시작하는</span>
            <br />
            <span className="text-primary">아카모모</span>
            <span className="text-balance"> 프랜차이즈</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto text-pretty">
            기존의 딱딱하고 부담스러운 성인용품점은 이제 그만.
            <br className="hidden md:block" />
            밝고 친근한 라이프스타일 매장으로 새로운 가맹의 기회를 만나보세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary hover:bg-coral text-white px-8 py-6 text-lg shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-coral/30"
            >
              <Link href="/inquiry">
                가맹 상담 신청하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-peach-light bg-white/50 hover:bg-peach-lighter text-foreground px-8 py-6 text-lg"
            >
              <Link href="/brand">브랜드 소개 보기</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 50C240 80 480 90 720 80C960 70 1200 50 1440 60V100H0V50Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </RevealSection>
  )
}
