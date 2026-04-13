import { Store, Sun, Heart } from "lucide-react"
import { RevealSection } from "@/components/motion/reveal"

const differentiators = [
  {
    number: "01",
    icon: Store,
    title: "무인·자판기형이 아닌 직접 경험하는 공간",
    description: "단순히 물건을 파는 자판기형 매장이 아닌, 고객이 직접 보고 만지고 선택할 수 있는 체험 중심의 공간을 제공합니다.",
    gradient: "from-primary/20 to-coral/20"
  },
  {
    number: "02",
    icon: Sun,
    title: "부담스럽지 않은 밝고 친근한 매장 분위기",
    description: "기존 성인용품점의 어둡고 부담스러운 이미지를 탈피하여, 누구나 편하게 들어올 수 있는 밝고 세련된 공간을 만들었습니다.",
    gradient: "from-peach-light/30 to-blush/30"
  },
  {
    number: "03",
    icon: Heart,
    title: "판매 공간이 아닌 하나의 데이트 코스",
    description: "커플들이 함께 방문하여 즐길 수 있는 특별한 데이트 코스로서의 가치를 제공합니다. 새로운 경험을 선사하는 공간입니다.",
    gradient: "from-blush/20 to-lavender/20"
  }
]

export function Differentiation() {
  return (
    <RevealSection className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            <span className="text-primary">아카모모</span>만의 차별화
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            기존 성인용품점과는 완전히 다른 새로운 개념의 라이프스타일 매장
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {differentiators.map((item, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${item.gradient} rounded-3xl p-8 border border-border overflow-hidden group hover:shadow-lg transition-all duration-300`}
            >
              {/* Background Number */}
              <span className="absolute -top-4 -right-4 text-[120px] font-bold text-primary/5 leading-none select-none">
                {item.number}
              </span>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}
