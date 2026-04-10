import { MessageCircle, FileText, MapPin, Paintbrush, Package, PartyPopper } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "가맹상담",
    description: "전화 또는 온라인으로 상담을 진행합니다"
  },
  {
    icon: FileText,
    step: "02",
    title: "가맹계약",
    description: "계약 조건 검토 후 가맹 계약을 체결합니다"
  },
  {
    icon: MapPin,
    step: "03",
    title: "상권분석",
    description: "최적의 입지를 선정하고 상권을 분석합니다"
  },
  {
    icon: Paintbrush,
    step: "04",
    title: "인테리어",
    description: "브랜드 컨셉에 맞는 인테리어를 진행합니다"
  },
  {
    icon: Package,
    step: "05",
    title: "초도물량",
    description: "매장 오픈을 위한 상품을 입고합니다"
  },
  {
    icon: PartyPopper,
    step: "06",
    title: "그랜드 오픈",
    description: "매장을 오픈하고 운영을 시작합니다"
  }
]

export function FranchiseProcess() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            가맹 <span className="text-primary">절차</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            체계적인 프로세스로 창업 초보자도 쉽게 시작할 수 있습니다
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-peach-light via-primary to-coral -translate-y-1/2" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-3xl p-6 border border-border shadow-sm text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative z-10">
                  {/* Step Number Badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.step}
                  </div>

                  <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center mx-auto mb-4 mt-2">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>

                {/* Arrow - Mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 text-primary">
                    <svg className="w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
