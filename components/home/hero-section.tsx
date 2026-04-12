import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-peach-lighter via-cream to-background">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-peach-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blush/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-lavender/30 rounded-full blur-2xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-peach-light shadow-sm">
            <Sparkles className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-foreground">새로운 형태의 성인용품 가맹</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            <span className="text-balance">부담 없이 시작하는</span>
            <br />
            <span className="text-primary">아카모모</span>
            <span className="text-balance"> 프랜차이즈</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto text-pretty">
            기존의 딱딱하고 부담스러운 성인용품점은 이제 그만.
            <br className="hidden md:block" />
            밝고 친근한 라이프스타일 매장으로 새로운 가맹의 기회를 만나보세요.
          </p>

          {/* CTA Buttons */}
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

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 50C240 80 480 90 720 80C960 70 1200 50 1440 60V100H0V50Z"
            fill="currentColor"
            className="text-background"
          />
        </svg>
      </div>
    </section>
  )
}
