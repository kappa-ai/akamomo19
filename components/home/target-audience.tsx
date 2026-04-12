import { Briefcase, Home, Clock, Lightbulb, Calendar } from "lucide-react"

const audiences = [
  {
    icon: Briefcase,
    title: "직장인 부업",
    description: "본업과 병행 가능한 부업형 가맹"
  },
  {
    icon: Home,
    title: "전업주부",
    description: "가사와 함께 운영 가능한 비즈니스"
  },
  {
    icon: Clock,
    title: "정년퇴직 후",
    description: "새로운 수익원을 찾는 분들께"
  }
]

export function TargetAudience() {
  return (
    <section className="py-20 bg-peach-lighter/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            이런 분들께 <span className="text-primary">추천</span>드려요
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            아카모모는 다양한 상황의 예비 창업주분들께 적합한 비즈니스 모델입니다
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {audiences.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 text-center border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-peach-light to-blush rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
