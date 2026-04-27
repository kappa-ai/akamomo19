"use client"

import Link from "next/link"
<<<<<<< HEAD
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
=======
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { HeaderClient } from "@/components/layout/header-client"
import { FooterClient } from "@/components/layout/footer-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { SiteContact } from "@/lib/site-contact"
import { useCallback, useEffect, useState } from "react"
import { ArrowLeft, Lock } from "lucide-react"

type PublicComment = {
  id: string
  body: string
  author_name: string
  is_staff: boolean
  created_at: string
}

type PublicPost = {
  id: string
  title: string
  body: string | null
  is_secret: boolean
  author_name: string
  phone: string | null
  created_at: string
  body_revealed: boolean
  comments: PublicComment[]
}

function CommentBlock({ c }: { c: PublicComment }) {
  if (c.is_staff) {
    return (
      <div className="rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-peach-lighter/30 px-4 py-3">
        <p className="text-sm font-bold text-primary">Akamomo</p>
        <p className="mt-2 whitespace-pre-wrap text-sm font-medium text-foreground">{c.body}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {format(new Date(c.created_at), "yyyy.MM.dd HH:mm", { locale: ko })}
        </p>
      </div>
    )
  }
  return (
    <div className="rounded-xl border border-border bg-muted/30 px-4 py-3">
      <p className="text-sm font-medium text-foreground">{c.author_name}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{c.body}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        {format(new Date(c.created_at), "yyyy.MM.dd HH:mm", { locale: ko })}
      </p>
    </div>
  )
}

export function InquiryBoardDetailClient({
  id,
  contact,
  showStoresNav,
}: {
  id: string
  contact: SiteContact
  showStoresNav: boolean
}) {
  const [post, setPost] = useState<PublicPost | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pw, setPw] = useState("")
  const [unlockError, setUnlockError] = useState<string | null>(null)
  const [unlocking, setUnlocking] = useState(false)

  const [cBody, setCBody] = useState("")
  const [cAuthor, setCAuthor] = useState("")
  const [cSubmitting, setCSubmitting] = useState(false)
  const [cError, setCError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    const res = await fetch(`/api/inquiry-board/posts/${id}`, { credentials: "same-origin" })
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string }
      setError(j.error ?? "불러오지 못했습니다.")
      setPost(null)
      return
    }
    const j = (await res.json()) as { post: PublicPost }
    setPost(j.post)
  }, [id])

  useEffect(() => {
    void load()
  }, [load])

  async function tryUnlock(e: React.FormEvent) {
    e.preventDefault()
    setUnlockError(null)
    setUnlocking(true)
    try {
      const res = await fetch(`/api/inquiry-board/posts/${id}/unlock`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      })
      const j = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setUnlockError(j.error ?? "실패했습니다.")
        return
      }
      setPw("")
      await load()
    } finally {
      setUnlocking(false)
    }
  }

  async function submitComment(e: React.FormEvent) {
    e.preventDefault()
    setCError(null)
    setCSubmitting(true)
    try {
      const res = await fetch(`/api/inquiry-board/posts/${id}/comments`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: cBody, author_name: cAuthor }),
      })
      const j = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setCError(j.error ?? "댓글 등록에 실패했습니다.")
        return
      }
      setCBody("")
      await load()
    } finally {
      setCSubmitting(false)
>>>>>>> 0f152ad88ad7e6ed275f2fbf23a2cc3fb0a67556
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient showStoresNav={showStoresNav} />
<<<<<<< HEAD
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
=======
      <main className="pb-16">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <Button variant="ghost" asChild className="-ml-2 mb-6 gap-2 rounded-full text-muted-foreground">
            <Link href="/inquiry/board">
              <ArrowLeft className="h-4 w-4" />
              목록
            </Link>
          </Button>

          {error ? (
            <Alert variant="destructive">
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          {post ? (
            <>
              <div className="mb-6 flex flex-wrap items-start justify-between gap-2">
                <h1 className="text-balance text-2xl font-bold text-foreground md:text-3xl">{post.title}</h1>
                {post.is_secret ? (
                  <Badge variant="secondary" className="shrink-0 gap-1">
                    <Lock className="h-3 w-3" />
                    비밀글
                  </Badge>
                ) : null}
              </div>
              <p className="text-sm text-muted-foreground">
                {post.author_name}
                {post.body_revealed && post.phone ? ` · ${post.phone}` : ""} ·{" "}
                {format(new Date(post.created_at), "yyyy.MM.dd HH:mm", { locale: ko })}
              </p>

              {!post.body_revealed && post.is_secret ? (
                <form onSubmit={tryUnlock} className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h2 className="text-sm font-semibold text-foreground">비밀번호 확인</h2>
                  <p className="mt-1 text-sm text-muted-foreground">이 글은 비밀번호로 보호되어 있습니다.</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="grow space-y-2">
                      <Label htmlFor="unlock-pw">비밀번호</Label>
                      <Input
                        id="unlock-pw"
                        type="password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        className="max-w-md rounded-xl"
                        autoComplete="current-password"
                      />
                    </div>
                    <Button type="submit" disabled={unlocking} className="rounded-full sm:w-auto">
                      확인
                    </Button>
                  </div>
                  {unlockError ? <p className="mt-2 text-sm text-destructive">{unlockError}</p> : null}
                </form>
              ) : (
                <div className="mt-8 whitespace-pre-wrap rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-foreground shadow-sm">
                  {post.body}
                </div>
              )}

              <section className="mt-10">
                <h2 className="text-lg font-semibold text-foreground">댓글</h2>
                {post.body_revealed ? (
                  <>
                    <ul className="mt-4 space-y-3">
                      {(post.comments ?? []).map((c) => (
                        <li key={c.id}>
                          <CommentBlock c={c} />
                        </li>
                      ))}
                    </ul>
                    {post.comments?.length === 0 ? (
                      <p className="mt-4 text-sm text-muted-foreground">아직 댓글이 없습니다.</p>
                    ) : null}

                    <form onSubmit={submitComment} className="mt-6 space-y-4 rounded-2xl border border-border bg-muted/20 p-6">
                      <h3 className="text-sm font-medium text-foreground">댓글 작성</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="c-author">작성자</Label>
                          <Input
                            id="c-author"
                            value={cAuthor}
                            onChange={(e) => setCAuthor(e.target.value)}
                            required
                            maxLength={80}
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="c-body">내용</Label>
                        <Textarea
                          id="c-body"
                          value={cBody}
                          onChange={(e) => setCBody(e.target.value)}
                          required
                          className="min-h-24 rounded-xl"
                        />
                      </div>
                      {cError ? <p className="text-sm text-destructive">{cError}</p> : null}
                      <Button type="submit" disabled={cSubmitting} className="rounded-full">
                        댓글 등록
                      </Button>
                    </form>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">비밀번호 확인 후 댓글을 볼 수 있습니다.</p>
                )}
              </section>
            </>
          ) : !error ? (
            <p className="text-sm text-muted-foreground">불러오는 중…</p>
          ) : null}
        </div>
>>>>>>> 0f152ad88ad7e6ed275f2fbf23a2cc3fb0a67556
      </main>
      <FooterClient contact={contact} showStoresNav={showStoresNav} />
    </div>
  )
}
