import Link from "next/link"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

import { LogoutButton } from "@/components/admin/logout-button"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/stores-db"

export default async function AdminInquiryBoardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login")
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">문의게시판</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            비밀글 포함 전체 글을 확인하고, Akamomo 공식 댓글로 답변할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/stores"
            className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            매장 관리
          </Link>
          <Link
            href="/admin/banners"
            className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            메인 배너
          </Link>
          <Link
            href="/admin/contact"
            className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            페이지 정보
          </Link>
          <LogoutButton />
          <Link
            href="/inquiry/board"
            className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            target="_blank"
            rel="noopener noreferrer"
          >
            공개 게시판
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}
