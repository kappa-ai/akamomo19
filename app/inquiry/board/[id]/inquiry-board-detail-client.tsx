"use client"

import Link from "next/link"
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
      <div className="rounded-xl border-2 border-primary/55 bg-gradient-to-br from-primary/25 via-primary/15 to-peach-light/40 px-4 py-3 shadow-sm">
        <p className="text-base font-extrabold tracking-tight text-primary">Akamomo</p>
        <p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-relaxed text-foreground">{c.body}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {format(new Date(c.created_at), "yyyy.MM.dd HH:mm", { locale: ko })}
        </p>
      </div>
    )
  }
  return (
    <div className="rounded-xl border border-border bg-muted/30 px-4 py-3">
      <p className="text-sm font-medium text-foreground">{c.author_name}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm font-normal text-muted-foreground">{c.body}</p>
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
  const [cSubmitting, setCSubmitting] = useState(false)
  const [cError, setCError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    const res = await fetch(`/api/franchise-board/inquiries/${id}`, { credentials: "same-origin" })
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
      const res = await fetch(`/api/franchise-board/inquiries/${id}/unlock`, {
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
      const res = await fetch(`/api/franchise-board/inquiries/${id}/comments`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: cBody }),
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
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient showStoresNav={showStoresNav} />
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
      </main>
      <FooterClient contact={contact} showStoresNav={showStoresNav} />
    </div>
  )
}
