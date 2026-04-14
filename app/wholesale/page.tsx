import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ShoppingBag, CheckCircle, Package, TrendingUp, Shield, Truck, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RevealSection } from "@/components/motion/reveal"

const features = [
  {
    icon: CheckCircle,
    title: "검증된 상품 구성",
    description: "실제 매출에 기여하는 검증된 인기 상품만 엄선하여 제공합니다."
  },
  {
    icon: Package,
    title: "다양한 도매처 상품 통합",
    description: "여러 도매처의 상품을 한 곳에서 편리하게 주문할 수 있습니다."
  },
  {
    icon: TrendingUp,
    title: "매출에 도움되는 상품 선별",
    description: "본사의 데이터 분석을 통해 실제 매출에 도움이 되는 상품을 큐레이션합니다."
  },
  {
    icon: Shield,
    title: "점주 운영 편의성",
    description: "복잡한 발주 과정 없이 간편하게 상품을 주문하고 관리할 수 있습니다."
  },
  {
    icon: Truck,
    title: "상품 공급 안정성",
    description: "안정적인 재고 확보와 빠른 배송으로 매장 운영에 차질이 없도록 지원합니다."
  },
  {
    icon: Star,
    title: "본사 큐레이션",
    description: "시즌별, 트렌드별 추천 상품과 신상품을 본사에서 직접 큐레이션합니다."
  }
]

export default function WholesalePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <RevealSection mode="enter" className="relative py-20 bg-gradient-to-b from-peach-lighter to-background overflow-hidden">
          <div className="absolute top-10 right-10 w-40 h-40 bg-blush/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-lavender/30 rounded-full blur-2xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-peach-light bg-white/80 px-4 py-2 backdrop-blur-sm">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">전용 도매몰</span>
              </div>

              <h1 className="mb-6 text-3xl font-bold text-foreground md:text-5xl">
                점주 전용<br />
                <span className="text-primary">도매몰</span>을 소개합니다
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                아카모모 가맹점주만을 위한 특별한 도매몰에서
                <br />
                검증된 상품을 경쟁력 있는 가격에 만나보세요.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild className="rounded-full bg-primary px-8 hover:bg-coral text-white">
                  <Link href="/inquiry">가맹 문의하기</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-peach-light hover:bg-peach-lighter">
                  <a href="https://b2b.akamomopartners.com/" target="_blank" rel="noopener noreferrer">
                    도매몰 둘러보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-20 bg-peach-lighter/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                도매몰의 <span className="text-primary">강점</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                점주님의 편의와 매출 증대를 위한 다양한 기능을 제공합니다
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-all group h-full">
                  <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-20 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                이용 <span className="text-primary">방법</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                간편한 3단계로 상품을 주문하세요
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-coral rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">도매몰 로그인</h3>
                <p className="text-sm text-muted-foreground">
                  가맹 계약 후 제공되는 점주 전용 계정으로 로그인합니다
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-coral rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">상품 선택</h3>
                <p className="text-sm text-muted-foreground">
                  필요한 상품을 검색하고 장바구니에 담아 주문합니다
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-coral rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">빠른 배송</h3>
                <p className="text-sm text-muted-foreground">
                  주문 완료 후 1-2일 내 매장으로 상품이 배송됩니다
                </p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-20 bg-peach-lighter/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                다양한 <span className="text-primary">상품 카테고리</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                고객의 다양한 니즈를 충족시킬 수 있는 폭넓은 상품 구성
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {[
                "여성용품",
                "남성용품",
                "커플용품",
                "코스튬",
                "젤/로션",
                "위생용품"
              ].map((category, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 border border-border text-center hover:shadow-md hover:-translate-y-1 transition-all h-full">
                  <div className="w-12 h-12 bg-peach-lighter rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{category}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-20 bg-gradient-to-br from-primary via-coral to-blush">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <ShoppingBag className="w-12 h-12 mx-auto mb-6 opacity-80" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                점주 전용 도매몰의<br />
                혜택을 누려보세요
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                아카모모 가맹점주가 되시면 전용 도매몰 이용 권한이 제공됩니다.
                <br />
                검증된 상품과 경쟁력 있는 가격으로 성공적인 매장 운영을 지원합니다.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-cream px-8 py-6 text-lg"
              >
                <Link href="/inquiry">
                  가맹 상담 신청하기
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </RevealSection>
      </main>
      <Footer />
    </div>
  )
}
