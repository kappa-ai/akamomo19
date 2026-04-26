import type { Metadata } from "next"
import Link from "next/link"
import { FooterClient } from "@/components/layout/footer-client"
import { HeaderClient } from "@/components/layout/header-client"
import { BoardLoadError } from "@/components/inquiry/board-load-error"
import type { FranchiseInquiryRow } from "@/lib/franchise-inquiry"
import { getSiteContact } from "@/lib/get-site-contact"
import { hasStoresForPublicNav } from "@/lib/stores-public"
import { createAnonSupabaseClient } from "@/lib/supabase/anon-server"
import { MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "가맹 문의 게시판 | 아카모모",
}

function formatKo(dt: string) {
  try {
    return new Date(dt).toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" })
  } catch {
    return dt
  }
}

export default async function InquiryBoardListPage() {
  let rows: FranchiseInquiryRow[] = []
  let loadError: string | null = null

  try {
    const supabase = createAnonSupabaseClient()
    const { data, error } = await supabase
      .from("franchise_inquiries")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("franchise_inquiries list", error)
      loadError = error.message
    } else {
      rows = (data ?? []) as FranchiseInquiryRow[]
    }
  } catch (e) {
    console.error("InquiryBoardListPage", e)
    loadError = e instanceof Error ? e.message : "알 수 없는 오류"
  }

  if (loadError) {
    return (
      <BoardLoadError
        title="가맹 문의 게시판"
        message="게시판 목록을 불러오지 못했습니다. 아래를 확인한 뒤 다시 시도해 주세요."
        detail={loadError}
      />
    )
  }

  const [contact, showStoresNav] = await Promise.all([getSiteContact(), hasStoresForPublicNav()])

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient showStoresNav={showStoresNav} />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-peach-light bg-white px-4 py-2">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">공개 게시판</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">가맹 문의 게시판</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            접수된 문의가 시간순으로 보입니다. 글을 눌러 댓글을 확인하거나 남길 수 있어요.
          </p>
        </div>

        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">아직 등록된 문의가 없습니다.</p>
        ) : (
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
            {rows.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/inquiry/board/${r.id}`}
                  className="block px-4 py-4 transition-colors hover:bg-muted/40 sm:px-5"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground sm:text-sm">
                        {[r.region, r.timing].filter(Boolean).join(" · ") || "지역·시기 미입력"}
                      </p>
                      {r.message ? (
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.message}</p>
                      ) : null}
                    </div>
                    <time className="shrink-0 text-xs text-muted-foreground">{formatKo(r.created_at)}</time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-center text-sm text-muted-foreground">
          <Link href="/inquiry" className="text-primary underline-offset-4 hover:underline">
            새 가맹 문의 작성하기
          </Link>
        </p>
      </main>
      <FooterClient contact={contact} showStoresNav={showStoresNav} />
    </div>
  )
}
