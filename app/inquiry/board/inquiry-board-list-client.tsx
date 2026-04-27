"use client"

import Link from "next/link"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { HeaderClient } from "@/components/layout/header-client"
import { FooterClient } from "@/components/layout/footer-client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { SiteContact } from "@/lib/site-contact"
import { useCallback, useEffect, useState } from "react"
import { MessageSquare, Lock } from "lucide-react"
import type { FranchiseBoardPublicComment, FranchiseBoardPublicPost } from "@/lib/franchise-board-public"

function CommentLine({ c }: { c: FranchiseBoardPublicComment }) {
  if (c.is_staff) {
    return (
      <div className="rounded-lg border-2 border-primary/55 bg-gradient-to-br from-primary/25 via-primary/12 to-peach-light/35 px-3 py-2.5 text-sm shadow-sm">
        <span className="font-extrabold tracking-tight text-primary">Akamomo</span>
        <span className="mx-2 text-muted-foreground">·</span>
        <span className="whitespace-pre-wrap font-semibold text-foreground">{c.body}</span>
      </div>
    )
  }
  return (
    <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
      <span className="font-medium text-foreground">{c.author_name}</span>
      <span className="mx-2">·</span>
      <span className="whitespace-pre-wrap font-normal">{c.body}</span>
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
  const [posts, setPosts] = useState<FranchiseBoardPublicPost[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoadError(null)
    const res = await fetch("/api/franchise-board/inquiries", { credentials: "same-origin" })
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string }
      setLoadError(j.error ?? "목록을 불러오지 못했습니다.")
      setPosts([])
      return
    }
    const j = (await res.json()) as { posts: FranchiseBoardPublicPost[] }
    setPosts(j.posts ?? [])
  }, [])

  useEffect(() => {
    void load()
  }, [load])

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
            <h1 className="text-balance text-3xl font-bold text-foreground md:text-4xl">온라인 상담 신청 내역</h1>
            <p className="mt-3 text-pretty text-muted-foreground">
              새 상담은 가맹 문의 페이지의 <strong className="font-medium text-foreground">온라인 상담 신청</strong>에서만
              접수됩니다. 비밀글은 신청 시 설정한 비밀번호로만 내용을 확인할 수 있습니다.
            </p>
            <Button asChild className="mt-6 rounded-full">
              <Link href="/inquiry#inquiry-form">상담 신청하러 가기</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          {loadError ? (
            <Alert variant="destructive" className="mb-8">
              <AlertTitle>게시판을 사용할 수 없습니다</AlertTitle>
              <AlertDescription className="text-sm">{loadError}</AlertDescription>
              <p className="mt-2 text-xs text-muted-foreground">
                서버에 `SUPABASE_SERVICE_ROLE_KEY` 를 설정하고, Supabase에 `008_franchise_inquiries_secret_and_applicant_message_rpc.sql`
                까지 적용했는지 확인해 주세요.
              </p>
            </Alert>
          ) : null}

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
                      <p className="mt-3 text-sm text-muted-foreground">비밀글입니다. 상세에서 비밀번호를 입력해 주세요.</p>
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
              <p className="text-sm text-muted-foreground">아직 접수된 상담이 없습니다.</p>
            ) : null}
          </section>
        </div>
      </main>
      <FooterClient contact={contact} showStoresNav={showStoresNav} />
    </div>
  )
}
