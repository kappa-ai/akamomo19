import { Headphones, ShoppingBag, Megaphone } from "lucide-react"

export function HeadquartersSupport() {
  return (
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
  )
}
