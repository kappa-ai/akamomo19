import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const newsItems = [
  {
    category: "공지",
    title: "2024년 하반기 신규 가맹점 모집 안내",
    date: "2024.03.15",
    excerpt: "아카모모에서 2024년 하반기 신규 가맹점주를 모집합니다. 특별 창업 지원 혜택도 함께 확인하세요."
  },
  {
    category: "뉴스",
    title: "아카모모, 전국 50호점 돌파 기념 이벤트",
    date: "2024.03.10",
    excerpt: "전국 50호점 돌파를 기념하여 특별 프로모션을 진행합니다."
  },
  {
    category: "공지",
    title: "3월 점주 교육 일정 안내",
    date: "2024.03.05",
    excerpt: "신규 점주 교육 및 기존 점주 대상 역량 강화 교육을 진행합니다."
  }
]

export function NewsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              최신 <span className="text-primary">소식</span>
            </h2>
            <p className="text-muted-foreground">
              아카모모의 새로운 소식과 공지사항을 확인하세요
            </p>
          </div>
          <Button asChild variant="ghost" className="text-primary hover:text-coral">
            <Link href="/news">
              전체 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-3xl p-6 border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block bg-peach-lighter text-primary text-xs font-medium px-3 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.excerpt}
              </p>

              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-sm text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  자세히 보기
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
