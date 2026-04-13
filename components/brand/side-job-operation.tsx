import { TrendingUp, Clock, Check } from "lucide-react"

export function SideJobOperation() {
  return (
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
  )
}
