import type { ReactNode } from "react"
import { Suspense } from "react"

export default function AdminLoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="py-10">
      <Suspense fallback={<p className="text-center text-muted-foreground">로딩 중…</p>}>{children}</Suspense>
    </div>
  )
}
