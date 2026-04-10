import { Wallet, TrendingUp, ShoppingBag, Headphones, Megaphone } from "lucide-react"

const strengths = [
  {
    icon: Wallet,
    title: "부담 없는 창업 비용",
    description: "합리적인 초기 투자 비용으로 부담 없이 창업을 시작할 수 있습니다",
    highlight: "4,000만원"
  },
  {
    icon: TrendingUp,
    title: "50% 이상의 높은 수익률",
    description: "검증된 비즈니스 모델로 안정적인 수익 창출이 가능합니다",
    highlight: "50%+"
  },
  {
    icon: ShoppingBag,
    title: "점주 전용 도매 사이트",
    description: "본사에서 운영하는 전용 도매몰을 통해 경쟁력 있는 가격으로 상품을 공급받습니다",
    highlight: "전용몰"
  },
  {
    icon: Headphones,
    title: "지속적인 운영 지원과 홍보",
    description: "본사의 체계적인 운영 지원과 지속적인 마케팅 지원을 받을 수 있습니다",
    highlight: "본사 지원"
  },
  {
    icon: Megaphone,
    title: "SNS/블로그/유튜브 마케팅",
    description: "다양한 온라인 채널을 통한 브랜드 홍보와 마케팅 지원을 제공합니다",
    highlight: "마케팅"
  }
]

export function FranchiseStrengths() {
  return (
    <section className="py-20 bg-gradient-to-b from-peach-lighter/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            가맹의 <span className="text-primary">강점</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            아카모모만의 체계적인 지원 시스템으로 성공적인 창업을 도와드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strengths.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-105 transition-all">
                  <item.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="inline-block bg-peach-lighter/50 rounded-full px-3 py-1 text-xs font-medium text-primary mb-2">
                    {item.highlight}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
