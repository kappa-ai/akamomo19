import Link from "next/link"
import { FooterClient } from "@/components/layout/footer-client"
import { HeaderClient } from "@/components/layout/header-client"
import { getSiteContact } from "@/lib/get-site-contact"
import { hasStoresForPublicNav } from "@/lib/stores-public"

/** 게시판 데이터 로드 실패 시(404 대신) 안내 */
export async function BoardLoadError({
  title,
  message,
  detail,
}: {
  title: string
  message: string
  detail?: string
}) {
  const [contact, showStoresNav] = await Promise.all([getSiteContact(), hasStoresForPublicNav()])

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient showStoresNav={showStoresNav} />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-4 leading-relaxed text-foreground">{message}</p>
        {detail ? (
          <p className="mt-4 rounded-lg border border-border bg-muted/40 p-3 font-mono text-xs text-muted-foreground break-all">
            {detail}
          </p>
        ) : null}
        <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
          <li>
            · Supabase에 <code className="rounded bg-muted px-1">006_franchise_inquiries.sql</code> 전체 적용 여부, 그리고
            저장소의 <code className="rounded bg-muted px-1">007_franchise_inquiries_postgrest_grants.sql</code> 실행 여부를
            확인해 주세요. (anon 이 테이블을 읽으려면 GRANT 가 필요합니다.)
          </li>
          <li>
            · <code className="rounded bg-muted px-1">NEXT_PUBLIC_SUPABASE_URL</code> 과{" "}
            <code className="rounded bg-muted px-1">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> 가 배포 환경에 있는지 확인해 주세요.
          </li>
        </ul>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/inquiry/board" className="text-primary font-medium underline-offset-4 hover:underline">
            게시판 다시 시도
          </Link>
          <Link href="/inquiry" className="text-primary font-medium underline-offset-4 hover:underline">
            가맹 문의 작성
          </Link>
        </div>
      </main>
      <FooterClient contact={contact} showStoresNav={showStoresNav} />
    </div>
  )
}
