import Link from "next/link"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

import { LogoutButton } from "@/components/admin/logout-button"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/stores-db"

export default async function AdminContactLayout({ children }: { children: React.ReactNode }) {
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
          <h1 className="text-2xl font-bold text-foreground">페이지 정보</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            페이지 탭 제목, 전화번호, 이메일, 대표자명, 사업자등록번호를 수정할 수 있습니다.
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
          <LogoutButton />
          <Link
            href="/"
            className="inline-flex h-8 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            target="_blank"
            rel="noopener noreferrer"
          >
            사이트 보기
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}
