import Link from "next/link"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

import { LogoutButton } from "@/components/admin/logout-button"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/stores-db"

export default async function AdminBannersLayout({ children }: { children: React.ReactNode }) {
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
          <h1 className="text-2xl font-bold text-foreground">메인 배너</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            홈 히어로 영역에 노출되는 이미지·HTML 배너를 추가·삭제하고 순서를 바꿀 수 있습니다.
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
            href="/admin/contact"
            className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            페이지 정보
          </Link>
          <Link
            href="/admin/inquiries"
            className="inline-flex h-8 items-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            가맹 문의
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
