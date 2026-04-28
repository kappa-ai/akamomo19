"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { FranchiseInquiryMessageRow, FranchiseInquiryRow } from "@/lib/franchise-inquiry"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

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

export function AdminInquiryDetailManager({ inquiryId }: { inquiryId: string }) {
  const router = useRouter()
  const [inquiry, setInquiry] = useState<FranchiseInquiryRow | null>(null)
  const [messages, setMessages] = useState<FranchiseInquiryMessageRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reply, setReply] = useState("")
  const [sending, setSending] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setError(null)
    const supabase = useSupabase()
    const { data: inv, error: e1 } = await supabase.from("franchise_inquiries").select("*").eq("id", inquiryId).maybeSingle()

    if (e1) {
      setError(e1.message)
      setLoading(false)
      return
    }
    if (!inv) {
      setError("문의를 찾을 수 없습니다.")
      setLoading(false)
      return
    }

    const { data: msgs, error: e2 } = await supabase
      .from("franchise_inquiry_messages")
      .select("*")
      .eq("inquiry_id", inquiryId)
      .order("created_at", { ascending: true })

    if (e2) {
      setError(e2.message)
      setLoading(false)
      return
    }

    setInquiry(inv as FranchiseInquiryRow)
    setMessages((msgs ?? []) as FranchiseInquiryMessageRow[])
    setLoading(false)
  }, [inquiryId])

  useEffect(() => {
    load()
  }, [load])

  async function sendReply(ev: React.FormEvent) {
    ev.preventDefault()
    const text = reply.trim()
    if (!text) return
    setSending(true)
    setError(null)
    const supabase = useSupabase()
    const { error: insertError } = await supabase.from("franchise_inquiry_messages").insert({
      inquiry_id: inquiryId,
      body: text,
      is_staff: true,
    })
    setSending(false)
    if (insertError) {
      setError(insertError.message)
      return
    }
    setReply("")
    await load()
  }

  async function deleteInquiry() {
    if (deleting) return
    const ok = window.confirm("이 문의를 삭제할까요? 댓글도 함께 삭제됩니다.")
    if (!ok) return

    setDeleting(true)
    setError(null)
    const supabase = useSupabase()
    const { error: deleteError } = await supabase.from("franchise_inquiries").delete().eq("id", inquiryId)
    setDeleting(false)

    if (deleteError) {
      setError(deleteError.message)
      return
    }

    router.push("/admin/inquiries")
    router.refresh()
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">불러오는 중…</p>
  }

  if (error && !inquiry) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
        <div className="mt-4 flex gap-2">
          <Button type="button" variant="outline" size="sm" asChild>
            <Link href="/admin/inquiries">목록으로</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!inquiry) {
    return null
  }

  const boardUrl = typeof window !== "undefined" ? `${window.location.origin}/inquiry/board/${inquiry.id}` : ""

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button type="button" variant="ghost" size="sm" asChild className="-ml-2">
          <Link href="/admin/inquiries">← 목록</Link>
        </Button>
        <Button type="button" variant="destructive" size="sm" onClick={deleteInquiry} disabled={deleting}>
          {deleting ? "삭제 중…" : "문의 삭제"}
        </Button>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-3 text-sm text-destructive">{error}</div>
      ) : null}

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-foreground">접수 정보</h2>
          {inquiry.is_secret ? (
            <Badge variant="secondary" className="text-xs">
              비밀글
            </Badge>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{formatKo(inquiry.created_at)}</p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">이름</dt>
            <dd className="font-medium text-foreground">{inquiry.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">연락처</dt>
            <dd className="font-medium text-foreground">{inquiry.phone}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">희망 지역</dt>
            <dd className="text-foreground">{inquiry.region ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">가맹 예정 시기</dt>
            <dd className="text-foreground">{inquiry.timing ?? "—"}</dd>
          </div>
        </dl>
        {inquiry.message ? (
          <div className="mt-4 border-t border-border pt-4">
            <p className="text-sm text-muted-foreground">문의 내용</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{inquiry.message}</p>
          </div>
        ) : null}
        {boardUrl ? (
          <div className="mt-6 rounded-lg bg-muted/50 p-3 text-xs">
            <p className="font-medium text-foreground">공개 게시판 링크 (동일 글·댓글)</p>
            <p className="mt-1 break-all text-muted-foreground">{boardUrl}</p>
          </div>
        ) : null}
      </section>

      <section className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold text-foreground">댓글</h2>
        <p className="mt-1 text-sm text-muted-foreground">Akamomo·문의자 모두 같은 스레드에 표시됩니다.</p>
        <div className="mt-4 space-y-3">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground">아직 댓글이 없습니다.</p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`rounded-lg border p-4 ${
                  m.is_staff
                    ? "border-primary/55 bg-gradient-to-br from-primary/25 via-primary/15 to-peach-light/35 shadow-sm"
                    : "border-border bg-muted/25"
                }`}
              >
                <div className="flex justify-between gap-2 text-xs text-muted-foreground">
                  <span
                    className={
                      m.is_staff
                        ? "text-sm font-extrabold tracking-tight text-primary"
                        : "font-medium text-foreground"
                    }
                  >
                    {m.is_staff ? "Akamomo" : "문의자"}
                  </span>
                  <span>{formatKo(m.created_at)}</span>
                </div>
                <p
                  className={`mt-2 whitespace-pre-wrap text-sm leading-relaxed ${
                    m.is_staff ? "font-semibold text-foreground" : "text-foreground"
                  }`}
                >
                  {m.body}
                </p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={sendReply} className="mt-6 space-y-3 border-t border-border pt-6">
          <Label htmlFor="admin-reply">Akamomo 답글</Label>
          <Textarea
            id="admin-reply"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="문의자에게 전달할 내용을 입력하세요."
            className="min-h-32"
            maxLength={8000}
          />
          <Button type="submit" disabled={sending || !reply.trim()}>
            {sending ? "등록 중…" : "댓글 등록"}
          </Button>
        </form>
      </section>
    </div>
  )
}
