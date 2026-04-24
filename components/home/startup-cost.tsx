import type { ReactNode } from "react"
import { Check, Info } from "lucide-react"
import { RevealSection } from "@/components/motion/reveal"

const costItems = [
  {
    item: "인테리어 및 간판",
    cost: "1,700만원",
    note: "15평 기준 (지역 및 면적에 따라 변동)\n브랜드 컨셉에 맞는 도면 제공\n매장 설계\n간판 및 집기 포함"
  },
  {
    item: "출입인증기/키오스크/CCTV",
    cost: "400만원",
    note: "무인 운영 시스템 구축 및 설치\n직접 구매 가능"
  },
  {
    item: "초도물량",
    cost: "1,500만원",
    note: "판매 데이터 기반 최적 상품 구성"
  },
  {
    item: "오픈 지원 컨설팅",
    cost: "300만원",
    note: "상권 분석\n매장 세팅\n운영 교육\n오픈 후 지속 운영 관리"
  }
]

const benefits: ReactNode[] = [
  "에어컨 및 냉난방기 설치 별도",
  <span key="royalty" className="font-bold text-red-600">
    매월 로열티 면제
  </span>,
  <span key="mgmt" className="font-bold text-red-600">
    매월 관리비 면제
  </span>,
  <span key="pr" className="font-bold text-red-600">
    매월 홍보비 면제
  </span>,
]

export function StartupCost() {
  return (
    <RevealSection className="py-20 bg-peach-lighter/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            가맹 <span className="text-primary">비용</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            초보 창업자도 운영 가능하도록, 매장 구축부터 운영까지 전 과정을 지원합니다.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Cost Table */}
          <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-coral p-4 text-white">
              <div className="grid grid-cols-3 gap-4 text-sm font-semibold">
                <div>품목 상세</div>
                <div className="text-center">비용</div>
                <div className="text-right">비고</div>
              </div>
            </div>

            {/* Cost Items */}
            <div className="divide-y divide-border">
              {costItems.map((item, index) => (
                <div key={index} className="p-4 md:p-6 hover:bg-peach-lighter/20 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                    <div className="font-medium text-foreground">{item.item}</div>
                    <div className="text-center">
                      <span className="inline-block bg-peach-lighter rounded-full px-4 py-1 font-bold text-primary">
                        {item.cost}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-pre-line text-left md:text-right">
                      {item.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-peach-lighter to-blush/30 p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-lg font-semibold text-foreground">총 창업비용</div>
                <div className="text-center">
                  <span className="text-3xl md:text-4xl font-bold text-primary">3,900만원 </span>
                  <span className="text-sm text-muted-foreground ml-2">(VAT 포함)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 bg-white rounded-3xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">추가 안내사항</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-peach-lighter rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className={index === 0 ? "text-muted-foreground" : "text-red-600"}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
