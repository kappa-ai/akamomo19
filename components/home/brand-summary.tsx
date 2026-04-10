import { Heart, Users, Smile } from "lucide-react"

export function BrandSummary() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 bg-peach-lighter rounded-full px-4 py-2 mb-6">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">아카모모 브랜드</span>
          </div>

          {/* Main Quote */}
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground leading-relaxed mb-8 text-pretty">
            &ldquo;판매만 하는 딱딱한 자판기형식의 성인용품점은 이제 그만.&rdquo;
          </blockquote>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto text-pretty">
            아카모모는 누구나 부담 없이 성인용품을 경험할 수 있도록 만든 라이프스타일 브랜드로서,
            아기자기하고 친근한 공간을 통해 기존의 부담스러운 이미지를 낮추고,
            처음 방문하는 고객도 편안하게 둘러보고 선택할 수 있는 환경을 제공합니다.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Smile className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">친근한 공간</h3>
              <p className="text-sm text-muted-foreground">
                밝고 아기자기한 인테리어로 누구나 편안하게 방문할 수 있습니다
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">부담 없는 경험</h3>
              <p className="text-sm text-muted-foreground">
                처음 방문하는 고객도 자유롭게 둘러보고 선택할 수 있어요
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">라이프스타일</h3>
              <p className="text-sm text-muted-foreground">
                단순 판매가 아닌 새로운 경험을 선사하는 공간입니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
