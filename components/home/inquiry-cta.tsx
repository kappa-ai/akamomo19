import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, ArrowRight, Mail, Clock } from "lucide-react"
import { RevealSection } from "@/components/motion/reveal"

export function InquiryCTA() {
  return (
    <RevealSection className="relative overflow-hidden bg-gradient-to-b from-peach-lighter to-background py-20">
      <div className="absolute top-10 right-10 h-40 w-40 rounded-full bg-blush/20 blur-3xl" />
      <div className="absolute bottom-10 left-10 h-32 w-32 rounded-full bg-lavender/30 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-peach-light bg-white/80 px-4 py-2 backdrop-blur-sm">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">가맹 문의</span>
          </div>

          <h2 className="mb-4 text-balance text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
            <span className="text-primary">가맹</span>에 대해 궁금하신가요?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            아카모모 전문 상담원이 친절하게 안내해 드립니다.
            <br />
            부담 없이 문의해 주세요.
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary px-8 py-6 text-lg text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:bg-coral"
            >
              <Link href="/inquiry">
                <MessageCircle className="mr-2 h-5 w-5" />
                가맹 상담 신청하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-peach-light bg-white/80 px-8 py-6 text-lg text-foreground hover:bg-peach-lighter"
            >
              <a href="tel:1588-0000">
                <Phone className="mr-2 h-5 w-5" />
                전화 상담: 1588-0000
              </a>
            </Button>
          </div>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-3">
            <a
              href="tel:1588-0000"
              className="group flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-coral transition-transform group-hover:scale-105">
                <Phone className="h-7 w-7 text-white" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm text-muted-foreground">전화 상담</p>
                <p className="text-xl font-bold text-foreground">1588-0000</p>
              </div>
            </a>

            <a
              href="mailto:contact@akamomo.co.kr"
              className="group flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-peach-light to-blush transition-transform group-hover:scale-105">
                <Mail className="h-7 w-7 text-white" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm text-muted-foreground">이메일 문의</p>
                <p className="break-words text-base font-bold leading-snug text-foreground [overflow-wrap:anywhere] sm:text-lg">
                  contact@akamomo.co.kr
                </p>
              </div>
            </a>

            <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-peach-lighter">
                <Clock className="h-7 w-7 text-primary" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm text-muted-foreground">상담 가능 시간</p>
                <p className="text-base font-bold leading-snug text-foreground sm:text-lg">평일 09:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
