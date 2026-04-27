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
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { SiteContact } from "@/lib/site-contact"
import { useCallback, useEffect, useState } from "react"
import { MessageSquare, Lock } from "lucide-react"

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

function CommentLine({ c }: { c: PublicComment }) {
  if (c.is_staff) {
    return (
      <div className="rounded-lg border border-primary/40 bg-primary/5 px-3 py-2 text-sm">
        <span className="font-bold text-primary">Akamomo</span>
        <span className="mx-2 text-muted-foreground">·</span>
        <span className="whitespace-pre-wrap font-medium text-foreground">{c.body}</span>
      </div>
    )
  }
  return (
    <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
      <span className="font-medium text-foreground">{c.author_name}</span>
      <span className="mx-2">·</span>
      <span className="whitespace-pre-wrap">{c.body}</span>
    </div>
  )
}

export function InquiryBoardListClient({
  contact,
  showStoresNav,
}: {
  contact: SiteContact
  showStoresNav: boolean
}) {
  const [posts, setPosts] = useState<PublicPost[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [phone, setPhone] = useState("")
  const [body, setBody] = useState("")
  const [isSecret, setIsSecret] = useState(false)
  const [password, setPassword] = useState("")

  const load = useCallback(async () => {
    setLoadError(null)
    const res = await fetch("/api/inquiry-board/posts", { credentials: "same-origin" })
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string }
      setLoadError(j.error ?? "목록을 불러오지 못했습니다.")
      setPosts([])
      return
    }
    const j = (await res.json()) as { posts: PublicPost[] }
    setPosts(j.posts ?? [])
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    setSubmitting(true)
    try {
      const res = await fetch("/api/inquiry-board/posts", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body,
          author_name: authorName,
          phone: phone.trim() || null,
          is_secret: isSecret,
          password: isSecret ? password : null,
        }),
      })
      const j = (await res.json().catch(() => ({}))) as { error?: string; id?: string }
      if (!res.ok) {
        setFormError(j.error ?? "등록에 실패했습니다.")
        return
      }
      setTitle("")
      setAuthorName("")
      setPhone("")
      setBody("")
      setIsSecret(false)
      setPassword("")
      await load()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient showStoresNav={showStoresNav} />
      <main className="pb-16">
        <div className="border-b border-border bg-gradient-to-b from-peach-lighter/60 to-background py-12">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-peach-light bg-white px-4 py-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">문의게시판</span>
            </div>
            <h1 className="text-balance text-3xl font-bold text-foreground md:text-4xl">가맹·운영 문의를 남겨 주세요</h1>
            <p className="mt-3 text-pretty text-muted-foreground">
              로그인 없이 작성할 수 있습니다. 비밀글은 글 비밀번호로만 내용을 확인할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          {loadError ? (
            <Alert variant="destructive" className="mb-8">
              <AlertTitle>게시판을 사용할 수 없습니다</AlertTitle>
              <AlertDescription className="text-sm">{loadError}</AlertDescription>
              <p className="mt-2 text-xs text-muted-foreground">
                서버 환경 변수에 `SUPABASE_SERVICE_ROLE_KEY` 를 넣고, Supabase에 `006_inquiry_board.sql` 마이그레이션을
                적용해 주세요.
              </p>
            </Alert>
          ) : null}

          <section className="mb-12 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">글쓰기</h2>
            <form className="mt-4 space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="b-title">제목</Label>
                <Input
                  id="b-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  maxLength={200}
                  className="rounded-xl"
                  placeholder="제목을 입력하세요"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="b-author">작성자</Label>
                  <Input
                    id="b-author"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                    maxLength={80}
                    className="rounded-xl"
                    placeholder="닉네임 또는 이름"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="b-phone">연락처 (선택)</Label>
                  <Input
                    id="b-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength={30}
                    className="rounded-xl"
                    placeholder="010-0000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="b-body">내용</Label>
                <Textarea
                  id="b-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                  className="min-h-36 rounded-xl"
                  placeholder="문의 내용을 작성해 주세요."
                />
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="b-secret" checked={isSecret} onCheckedChange={(v) => setIsSecret(v === true)} />
                  <Label htmlFor="b-secret" className="cursor-pointer text-sm font-normal">
                    비밀글 (비밀번호로만 본문·댓글 확인)
                  </Label>
                </div>
                {isSecret ? (
                  <div className="flex w-full flex-col gap-2 sm:max-w-xs">
                    <Label htmlFor="b-pw" className="sr-only">
                      비밀번호
                    </Label>
                    <Input
                      id="b-pw"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-xl"
                      placeholder="4자 이상 비밀번호"
                      minLength={4}
                      autoComplete="new-password"
                    />
                  </div>
                ) : null}
              </div>
              {formError ? <p className="text-sm text-destructive">{formError}</p> : null}
              <Button type="submit" disabled={submitting || Boolean(loadError)} className="rounded-full">
                등록하기
              </Button>
            </form>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">게시글</h2>
            <ul className="space-y-4">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/inquiry/board/${p.id}`}
                    className="block rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/30"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {p.is_secret ? (
                        <Badge variant="secondary" className="gap-1">
                          <Lock className="h-3 w-3" />
                          비밀글
                        </Badge>
                      ) : null}
                      <span className="font-semibold text-foreground">{p.title}</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p.author_name} · {format(new Date(p.created_at), "yyyy.MM.dd HH:mm", { locale: ko })}
                    </p>
                    {p.body_revealed && p.body ? (
                      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.body}</p>
                    ) : p.is_secret ? (
                      <p className="mt-3 text-sm text-muted-foreground">비밀글입니다. 글 보기에서 비밀번호를 입력해 주세요.</p>
                    ) : (
                      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.body}</p>
                    )}
                    {p.body_revealed && p.comments.length > 0 ? (
                      <div className="mt-3 space-y-2 border-t border-border pt-3">
                        {p.comments.slice(0, 2).map((c) => (
                          <CommentLine key={c.id} c={c} />
                        ))}
                        {p.comments.length > 2 ? (
                          <p className="text-xs text-muted-foreground">댓글 {p.comments.length}개 — 전체 보기</p>
                        ) : null}
                      </div>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
            {posts.length === 0 && !loadError ? (
              <p className="text-sm text-muted-foreground">첫 문의를 남겨 주세요.</p>
            ) : null}
          </section>
        </div>
      </main>
      <FooterClient contact={contact} showStoresNav={showStoresNav} />
    </div>
  )
}
