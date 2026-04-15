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
          <h1 className="text-2xl font-bold text-foreground">연락처 · 사업자 정보</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            전화번호, 이메일, 대표자명, 사업자등록번호를 수정하면 푸터·문의 안내에 반영됩니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/stores"
            className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            매장 관리
          </Link>
          <LogoutButton />
          <Link
            href="/"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
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
