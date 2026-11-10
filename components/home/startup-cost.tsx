import { Info } from "lucide-react"
import { RevealSection } from "@/components/motion/reveal"

const costItems = [
  {
    item: "인테리어 및 간판",
    cost: "1,300만원",
    note: "브랜드 색감 및 콘셉트 유지 필수\n그 외 인테리어 구성 및 시공 업체 자유 선택\n시공 업체와 구성에 따라 비용 변동"
  },
  {
    item: "필수집기",
    cost: "500만원",
    note: "출입인증기 1대\n키오스크 1대\nCCTV 4대"
  },
  {
    item: "초도물량",
    cost: "1,300만원",
    note: "판매데이터 기반의\n약 400가지 인기상품\n초도물량 구성"
  },
  {
    item: "가맹비",
    cost: "400만원",
    note: "상권 분석 및 매장 세팅\n운영 교육 및 영업 노하우 전수"
  },
  {
    item: "교육비",
    cost: "0원",
    note: "10호점 한정\n2,000,000원\n교육비 면제"
  }
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="font-bold text-foreground md:text-lg">{item.item}</div>
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
                  <span className="text-3xl md:text-4xl font-bold text-primary">3,500만원</span>
                  <span className="text-sm text-muted-foreground ml-2">(VAT 미포함)</span>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-2xl md:text-4xl font-bold text-red-600">10호점 한정 매월 로열티 면제</p>

          {/* Interior detail */}
          <div className="mt-8 bg-white rounded-3xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-primary shrink-0" aria-hidden />
              <h3 className="font-semibold text-foreground">인테리어 상세 안내</h3>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-foreground break-keep">
              <p>
                위 표의 인테리어 비용은 예상 견적이며, 상가의 기존 시설, 내부 상태 및 시공 범위에 따라 달라집니다.
                {" "}<br className="hidden md:block" />
                지정 시공업체 없이 점주가 직접 업체를 선정하고 견적을 비교할 수 있습니다.
              </p>
              <p>
                브랜드 지정 색감과 기본 콘셉트를 유지하는 범위에서 공간 구성과 세부 인테리어는 자유롭게 선택할 수 있습니다.
                {" "}<br className="hidden md:block" />
                기본 구성부터 추가 연출까지 예산과 매장 여건에 맞춰 진행하며, 본사는 브랜드에 어울리는 인테리어 방향을 안내합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
