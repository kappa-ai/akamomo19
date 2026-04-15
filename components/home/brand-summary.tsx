import { Smile, Users, Heart } from "lucide-react"
import { RevealSection } from "@/components/motion/reveal"

export function BrandSummary() {
  return (
    <RevealSection className="border-y border-border/30 bg-peach-lighter/25 py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight text-balance">
            <span className="text-primary">아카모모</span>가 지향하는 공간
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            판매뿐만 아니라, 편하게 머물 수 있는 라이프스타일형 브랜드입니다. 
          </p>

          <blockquote className="mt-10 md:mt-14 mx-auto max-w-2xl border-0 p-0">
            <p className="text-lg md:text-xl lg:text-[1.35rem] font-normal leading-[1.75] text-foreground/90 text-pretty">
              <span className="text-primary/80 font-serif text-2xl md:text-3xl leading-none align-top mr-0.5" aria-hidden>
                &ldquo;
              </span>
              판매만 하는 자판기 형식의 딱딱한 성인용품점은 이제 그만.
              <span className="text-primary/80 font-serif text-2xl md:text-3xl leading-none align-top ml-0.5" aria-hidden>
                &rdquo;
              </span>
            </p>
          </blockquote>

          <p className="mt-8 md:mt-10 text-base md:text-[1.05rem] text-muted-foreground leading-[1.8] max-w-2xl mx-auto text-pretty">
            아카모모는 누구나 부담 없이 성인용품을 경험할 수 있도록 만든 라이프스타일 브랜드로서,
            아기자기하고 친근한 공간을 통해 기존의 부담스러운 이미지를 낮추고,
            처음 방문하는 고객도 편안하게 둘러보고 선택할 수 있는 환경을 제공합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 md:mt-14">
            <div className="bg-white/90 rounded-3xl p-8 border border-border/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Smile className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">친근한 공간</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                밝고 아기자기한 인테리어로 누구나 편안하게 방문할 수 있습니다
              </p>
            </div>

            <div className="bg-white/90 rounded-3xl p-8 border border-border/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">부담 없는 경험</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                처음 방문하는 고객도 자유롭게 둘러보고 선택할 수 있어요
              </p>
            </div>

            <div className="bg-white/90 rounded-3xl p-8 border border-border/80 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">라이프스타일</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                단순 판매가 아닌 색다른 경험을 선사합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
