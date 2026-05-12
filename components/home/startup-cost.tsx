import { Info } from "lucide-react"
import { RevealSection } from "@/components/motion/reveal"

const costItems = [
  {
    item: "인테리어 및 간판",
    cost: "-",
    note: "브랜드 색감 유지 제외\n자유롭게 구성 가능\n구성과 방향에 따라 가격 변동"
  },
  {
    item: "출입인증기/키오스크/CCTV",
    cost: "500만원",
    note: "무인 운영 시스템 구축 및 설치\n직접 구매 가능"
  },
  {
    item: "초도물량",
    cost: "1,500만원",
    note: "판매 데이터 기반 최적 상품 구성"
  },
  {
    item: "오픈 지원 \n평생 지속 운영 관리",
    cost: "400만원",
    note: "상권 분석\n매장 세팅\n운영 교육\n영업 노하우 전수수"
  }
]

const lifetimeSupportItems = [
  "상시 운영 상담 지원 및 분기 1회 본사 직접 방문 관리",
  "가격표·홍보물·포스터 제작 및 지원",
  "홈페이지 배너, SNS, 유튜브 등 지속적인 브랜드 홍보 진행",
  "월 1회 신상품 및 인기상품 판매 데이터 공유",
  "로열티 면제",
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
                  <span className="text-3xl md:text-4xl font-bold text-primary">2,400만원 </span>
                  <span className="text-sm text-muted-foreground ml-2">(VAT 포함)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lifetime support */}
          <div className="mt-8 bg-white rounded-3xl p-6 border border-border shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-primary shrink-0" aria-hidden />
              <h3 className="font-semibold text-foreground">오픈 후에도 평생 지원 관리</h3>
            </div>
            <ol className="list-none space-y-3 m-0 p-0 text-sm">
              {lifetimeSupportItems.map((line, index) => {
                const isLast = index === lifetimeSupportItems.length - 1
                return (
                  <li
                    key={index}
                    className={`flex gap-3 items-start ${isLast ? "text-red-600 font-semibold" : "text-foreground"}`}
                  >
                    <span className={`tabular-nums shrink-0 ${isLast ? "" : "text-muted-foreground"}`}>
                      {index + 1}.
                    </span>
                    <span>{line}</span>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
