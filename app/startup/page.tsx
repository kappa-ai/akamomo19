import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { TargetAudience } from "@/components/home/target-audience"
import { Differentiation } from "@/components/home/differentiation"
import { FranchiseStrengths } from "@/components/home/franchise-strengths"
import { FranchiseProcess } from "@/components/home/franchise-process"
import { StartupCost } from "@/components/home/startup-cost"
import { InquiryCTA } from "@/components/home/inquiry-cta"
import { Rocket, TrendingUp, Clock, Headphones, ShoppingBag, Megaphone, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StartupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-peach-lighter to-background overflow-hidden">
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
        </section>

        {/* Key Benefits Summary */}
        <section className="py-16 bg-background">
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
        </section>

        {/* Target Audience */}
        <TargetAudience />

        {/* Operation Details */}
        <section className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                부업형 <span className="text-primary">운영 구조</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                본업을 유지하면서도 안정적으로 운영할 수 있는 시스템
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-peach-lighter to-cream rounded-3xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  운영의 단순성
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">주 1회 정도의 매장 관리로 운영 가능</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">무인 운영 시스템으로 인건비 최소화</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">본업과 병행 가능한 유연한 운영</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">가맹 경험 없이도 쉽게 운영</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-lavender/30 to-cream rounded-3xl p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  높은 수익률
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">50% 이상의 높은 마진율</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">월 로열티, 관리비, 홍보비 면제</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">전용 도매몰을 통한 경쟁력 있는 공급가</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">낮은 고정비로 안정적인 수익 창출</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Support System */}
        <section className="py-20 bg-peach-lighter/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                본사 <span className="text-primary">지원 시스템</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                가맹부터 운영까지 아카모모가 함께합니다
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mb-6">
                  <Headphones className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">지속적인 운영 지원</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  가맹 후에도 본사의 체계적인 운영 지원으로 안정적인 매장 운영이 가능합니다.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 정기 점검 및 컨설팅</li>
                  <li>• 매출 분석 및 개선 제안</li>
                  <li>• 24시간 운영 지원</li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mb-6">
                  <ShoppingBag className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">전용 도매몰 강점</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  본사에서 운영하는 전용 도매몰을 통해 경쟁력 있는 가격으로 상품을 공급받습니다.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 검증된 상품 구성</li>
                  <li>• 경쟁력 있는 도매가</li>
                  <li>• 신상품 우선 공급</li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mb-6">
                  <Megaphone className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">마케팅 지원</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  다양한 온라인 채널을 통한 브랜드 홍보와 마케팅 지원을 제공합니다.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• SNS 마케팅 지원</li>
                  <li>• 블로그 콘텐츠 제공</li>
                  <li>• 유튜브 홍보 지원</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiation */}
        <Differentiation />

        {/* Franchise Process */}
        <FranchiseProcess />

        {/* Startup Cost */}
        <StartupCost />

        {/* CTA */}
        <InquiryCTA />
      </main>
      <Footer />
    </div>
  )
}
