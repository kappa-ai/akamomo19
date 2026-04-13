import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, ArrowRight } from "lucide-react"
import { RevealSection } from "@/components/motion/reveal"

export function InquiryCTA() {
  return (
    <RevealSection className="py-20 bg-gradient-to-br from-primary via-coral to-blush relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
            가맹에 대해 궁금하신가요?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
            아카모모 전문 상담원이 친절하게 안내해 드립니다.
            <br />
            부담 없이 문의해 주세요.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-cream px-8 py-6 text-lg shadow-lg transition-all hover:scale-105"
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
              className="rounded-full border-2 border-white bg-transparent text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              <a href="tel:1588-0000">
                <Phone className="mr-2 h-5 w-5" />
                전화 상담: 1588-0000
              </a>
            </Button>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white">
              <p className="text-sm opacity-80">상담 가능 시간</p>
              <p className="font-semibold">평일 09:00 - 18:00</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white">
              <p className="text-sm opacity-80">이메일 문의</p>
              <p className="font-semibold">contact@akamomo.co.kr</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-white">
              <p className="text-sm opacity-80">카카오톡 상담</p>
              <p className="font-semibold">@아카모모</p>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
