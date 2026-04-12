import { Wallet, TrendingUp, ShoppingBag, Headphones, Megaphone } from "lucide-react"

const strengths = [
  {
    icon: Wallet,
    title: "부담 없는 가맹 비용",
    description: "합리적인 초기 투자 비용으로 부담 없이 가맹을 시작할 수 있습니다",
    highlight: "4,000만원"
  },
  {
    icon: TrendingUp,
    title: "50% 이상의 높은 수익률",
    description: "검증된 비즈니스 모델로 안정적인 수익 창출이 가능합니다",
    highlight: "50%+"
  },
  {
    icon: Headphones,
    title: "지속적인 운영 지원과 홍보",
    description: "본사의 체계적인 운영 지원과 다양한 마케팅을 통해 점주님들의 홍보에 대한 부담을 줄여줍니다.",
    highlight: "본사 지원"
  },
  {
    icon: ShoppingBag,
    title: "점주 전용 도매 사이트",
    description: "여러 도매처 상품들을 한 곳에 모아, 매출에 도움이 되는 상품만 선별하여 보다 간편하게 발주할 수 있습니다.",
    highlight: "전용몰"
  }
]

export function FranchiseStrengths() {
  return (
    <section className="py-20 bg-gradient-to-b from-peach-lighter/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            아카모모의 <span className="text-primary">강점</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            아카모모만의 체계적인 지원 시스템으로 성공적인 가맹을 도와드립니다
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
