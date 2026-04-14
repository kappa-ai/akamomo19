import { TrendingUp, Clock, Check } from "lucide-react"
import { RevealSection } from "@/components/motion/reveal"

export function SideJobOperation() {
  return (
    <RevealSection className="py-20 bg-background">
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
                <span className="text-muted-foreground">주 1~2회 관리만으로 운영 가능</span>
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
                <span className="text-muted-foreground">초보 사업가도 쉽게 운영 가능한 구조</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">본사의 직접 홍보 지원으로 마케팅 부담 최소화</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground">다양한 도매처 상품을 한곳에서 소싱할 수 있는 전용 도매몰 제공</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
