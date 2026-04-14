import Link from "next/link"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

import { LogoutButton } from "@/components/admin/logout-button"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/stores-db"

export default async function AdminStoresLayout({ children }: { children: React.ReactNode }) {
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
          <h1 className="text-2xl font-bold text-foreground">매장 관리</h1>
          <p className="mt-1 text-sm text-muted-foreground">운영 매장 · 오픈 예정 매장을 추가·수정·삭제할 수 있습니다.</p>
        </div>
        <div className="flex items-center gap-2">
          <LogoutButton />
          <Link
            href="/stores"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            공개 페이지 보기
          </Link>
        </div>
      </header>
      {children}
    </div>
  )
}
