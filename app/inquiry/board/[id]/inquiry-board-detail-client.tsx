"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { FooterClient } from "@/components/layout/footer-client"
import { HeaderClient } from "@/components/layout/header-client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { inquiryBoardCommentSchema } from "@/lib/franchise-inquiry"
import type { FranchiseInquiryMessageRow, FranchiseInquiryRow } from "@/lib/franchise-inquiry"
import type { SiteContact } from "@/lib/site-contact"
import { MessageCircle } from "lucide-react"

function useSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createBrowserClient(url, key)
}

function formatKo(dt: string) {
  try {
    return new Date(dt).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" })
  } catch {
    return dt
  }
}

export function InquiryBoardDetailClient({
  contact,
  showStoresNav,
  inquiryId,
  inquiry,
  initialMessages,
}: {
  contact: SiteContact
  showStoresNav: boolean
  inquiryId: string
  inquiry: FranchiseInquiryRow
  initialMessages: FranchiseInquiryMessageRow[]
}) {
  const router = useRouter()
  const [messages, setMessages] = useState(initialMessages)
  const [body, setBody] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  async function handleSend(ev: React.FormEvent) {
    ev.preventDefault()
    setError(null)
    const parsed = inquiryBoardCommentSchema.safeParse({ body })
    if (!parsed.success) {
      setError("댓글 내용을 확인해 주세요.")
      return
    }
    setSending(true)
    try {
      const supabase = useSupabase()
      const { error: insertError } = await supabase.from("franchise_inquiry_messages").insert({
        inquiry_id: inquiryId,
        body: parsed.data.body,
        is_staff: false,
      })
      if (insertError) {
        setError(insertError.message)
        return
      }
      setBody("")
      router.refresh()
    } catch {
      setError("등록에 실패했습니다.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient showStoresNav={showStoresNav} />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm text-muted-foreground">
          <Link href="/inquiry/board" className="text-primary underline-offset-4 hover:underline">
            ← 목록으로
          </Link>
        </p>

        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-peach-light bg-white px-4 py-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">문의 상세</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">가맹 상담 문의</h1>
        </div>

        <div className="space-y-4 rounded-3xl border border-border bg-white p-6 shadow-sm md:p-8">
          <div className="rounded-2xl border border-border bg-peach-lighter/40 p-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">원문</p>
            <p className="mt-1 text-sm text-muted-foreground">{formatKo(inquiry.created_at)}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex flex-wrap gap-2">
                <dt className="font-medium text-foreground">이름</dt>
                <dd className="text-muted-foreground">{inquiry.name}</dd>
              </div>
              <div className="flex flex-wrap gap-2">
                <dt className="font-medium text-foreground">연락처</dt>
                <dd className="text-muted-foreground">{inquiry.phone}</dd>
              </div>
              {inquiry.region ? (
                <div className="flex flex-wrap gap-2">
                  <dt className="font-medium text-foreground">희망 지역</dt>
                  <dd className="text-muted-foreground">{inquiry.region}</dd>
                </div>
              ) : null}
              {inquiry.timing ? (
                <div className="flex flex-wrap gap-2">
                  <dt className="font-medium text-foreground">가맹 예정 시기</dt>
                  <dd className="text-muted-foreground">{inquiry.timing}</dd>
                </div>
              ) : null}
              {inquiry.message ? (
                <div className="mt-3 border-t border-border pt-3">
                  <dt className="font-medium text-foreground">문의 내용</dt>
                  <dd className="mt-1 whitespace-pre-wrap text-muted-foreground leading-relaxed">{inquiry.message}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">댓글</h2>
            <div className="space-y-3">
              {messages.length === 0 ? (
                <p className="text-sm text-muted-foreground">아직 댓글이 없습니다.</p>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`rounded-2xl border p-4 ${
                      m.is_staff ? "border-primary/30 bg-primary/5" : "border-border bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{m.is_staff ? "아카모모" : "문의자"}</span>
                      <span>{formatKo(m.created_at)}</span>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{m.body}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <form onSubmit={handleSend} className="space-y-3 border-t border-border pt-6">
            <label className="text-sm font-medium text-foreground">댓글 달기</label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="추가로 전달하실 내용을 입력해 주세요."
              className="min-h-28 rounded-xl border-border"
              maxLength={8000}
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <Button type="submit" disabled={sending || !body.trim()} className="rounded-full">
              {sending ? "등록 중..." : "댓글 등록"}
            </Button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/inquiry" className="text-primary underline-offset-4 hover:underline">
            가맹 문의 작성
          </Link>
        </p>
      </main>
      <FooterClient contact={contact} showStoresNav={showStoresNav} />
    </div>
  )
}
