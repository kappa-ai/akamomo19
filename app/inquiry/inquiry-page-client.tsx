"use client"

import { HeaderClient } from "@/components/layout/header-client"
import { FooterClient } from "@/components/layout/footer-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, MessageCircle, Clock, ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import { useState } from "react"
import { RevealSection } from "@/components/motion/reveal"
import type { SiteContact } from "@/lib/site-contact"
import { telHref } from "@/lib/site-contact"

const faqs = [
  {
    question: "창업 경험이 없어도 가능한가요?",
    answer:
      "네, 가능합니다! 아카모모는 초보 창업자도 쉽게 운영할 수 있는 시스템을 갖추고 있습니다. 본사에서 체계적인 교육과 지속적인 운영 지원을 제공하므로 경험이 없어도 안심하고 시작하실 수 있습니다.",
  },
  {
    question: "부업으로 운영해도 괜찮을까요?",
    answer:
      "아카모모는 부업형 창업에 최적화되어 있습니다. 주 1회 정도의 매장 관리로 운영이 가능하며, 무인 운영 시스템을 통해 본업과 병행하실 수 있습니다.",
  },
  {
    question: "로열티나 관리비가 있나요?",
    answer:
      "아카모모는 매월 로열티, 관리비, 홍보비가 모두 면제입니다. 초기 가맹 비용 외에 별도의 월 비용이 발생하지 않아 부담 없이 운영하실 수 있습니다.",
  },
  {
    question: "상품은 어떻게 공급받나요?",
    answer:
      "본사에서 운영하는 점주 전용 도매몰을 통해 상품을 공급받으실 수 있습니다. 검증된 상품을 경쟁력 있는 가격에 제공해 드리며, 신상품도 우선 공급됩니다.",
  },
  {
    question: "수익률은 어느 정도인가요?",
    answer: "아카모모 가맹점의 평균 마진율은 50% 이상입니다. 월 로열티가 없고 운영비가 낮아 안정적인 수익 창출이 가능합니다.",
  },
]

const regions = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
]

const timings = ["1개월 이내", "3개월 이내", "6개월 이내", "1년 이내", "아직 미정"]

export function InquiryPageClient({
  contact,
  showStoresNav,
}: {
  contact: SiteContact
  showStoresNav: boolean
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [region, setRegion] = useState("")
  const [timing, setTiming] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const phoneHref = telHref(contact.phone)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)
    setSubmitMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    try {
      const response = await fetch("https://formsubmit.co/ajax/akamomo19@naver.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("문의 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.")
      }

      setSubmitMessage("문의가 정상 접수되었습니다. 빠른 시간 내에 연락드릴게요.")
      form.reset()
      setRegion("")
      setTiming("")
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "문의 전송에 실패했습니다.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient showStoresNav={showStoresNav} />
      <main>
        <RevealSection
          mode="enter"
          className="relative py-16 md:py-20 bg-gradient-to-b from-peach-lighter to-background overflow-hidden"
        >
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-peach-light bg-white px-4 py-2">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">가맹 문의</span>
              </div>

              <h1 className="mb-6 text-balance text-3xl font-bold text-foreground md:text-5xl">
                <span className="text-primary">가맹</span>에 대해<br />
                궁금하신가요?
              </h1>

              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                아카모모 전문 상담원이 친절하게 안내해 드립니다.
                <br />
                부담 없이 문의해 주세요.
              </p>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-12 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href={phoneHref}
                className="bg-white rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-coral rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">전화 상담</p>
                  <p className="text-xl font-bold text-foreground">{contact.phone}</p>
                </div>
              </a>

              <a
                href="#inquiry-form"
                className="bg-white rounded-3xl p-6 border border-border shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-peach-light to-blush rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">온라인 상담</p>
                  <p className="text-lg font-bold text-foreground">아래에서 상담 신청하기</p>
                </div>
              </a>

              <div className="bg-white rounded-3xl p-6 border border-border shadow-sm flex items-center gap-4">
                <div className="w-14 h-14 bg-peach-lighter rounded-2xl flex items-center justify-center">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">상담 가능 시간</p>
                  <p className="text-lg font-bold text-foreground">평일 09:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="py-20 bg-peach-lighter/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div
                id="inquiry-form"
                className="scroll-mt-24 bg-white rounded-3xl p-8 md:p-10 border border-border shadow-sm"
              >
                <h2 className="text-2xl font-bold text-foreground mb-2">온라인 상담 신청</h2>
                <p className="text-muted-foreground mb-8">
                  아래 양식을 작성해 주시면 빠른 시간 내에 연락드리겠습니다.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <input type="hidden" name="_subject" value="아카모모 가맹문의 접수" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="희망 지역" value={region || "-"} />
                  <input type="hidden" name="가맹 예정 시기" value={timing || "-"} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">이름 *</label>
                      <Input
                        name="이름"
                        placeholder="홍길동"
                        className="rounded-xl border-border focus:border-primary focus:ring-primary"
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">연락처 *</label>
                      <Input
                        name="연락처"
                        placeholder="010-0000-0000"
                        className="rounded-xl border-border focus:border-primary focus:ring-primary"
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">희망 지역</label>
                      <Select value={region} onValueChange={setRegion}>
                        <SelectTrigger className="rounded-xl border-border">
                          <SelectValue placeholder="지역을 선택해 주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region} value={region}>
                              {region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">가맹 예정 시기</label>
                      <Select value={timing} onValueChange={setTiming}>
                        <SelectTrigger className="rounded-xl border-border">
                          <SelectValue placeholder="시기를 선택해 주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {timings.map((timing) => (
                            <SelectItem key={timing} value={timing}>
                              {timing}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">문의 내용</label>
                    <Textarea
                      name="문의 내용"
                      placeholder="궁금하신 내용을 자유롭게 작성해 주세요."
                      className="rounded-xl border-border focus:border-primary focus:ring-primary min-h-32"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-primary hover:bg-coral text-white py-6 text-lg"
                    >
                      {isSubmitting ? "전송 중..." : "상담 신청하기"}
                    </Button>
                  </div>

                  {submitMessage ? (
                    <p className="text-sm text-center text-green-600">{submitMessage}</p>
                  ) : null}
                  {submitError ? <p className="text-sm text-center text-red-600">{submitError}</p> : null}

                  <p className="text-xs text-muted-foreground text-center">
                    상담 신청 시 개인정보 수집 및 이용에 동의하는 것으로 간주됩니다.
                  </p>
                </form>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">자주 묻는 질문</h2>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-2xl border border-border overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-peach-lighter/30 transition-colors"
                      >
                        <span className="font-medium text-foreground pr-4">{faq.question}</span>
                        {openFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                        )}
                      </button>
                      {openFaq === index && (
                        <div className="px-6 pb-4">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-br from-peach-lighter to-cream rounded-3xl p-6">
                  <h3 className="font-semibold text-foreground mb-3">안심하고 문의하세요</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>✓ 강압적인 권유 절대 없음</li>
                    <li>✓ 친절하고 상세한 상담</li>
                    <li>✓ 개인정보 철저히 보호</li>
                    <li>✓ 부담 없이 질문만 하셔도 OK</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </main>
      <FooterClient contact={contact} showStoresNav={showStoresNav} />
    </div>
  )
}
