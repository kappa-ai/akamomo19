"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { FranchiseInquiryRow } from "@/lib/franchise-inquiry"
import { Button } from "@/components/ui/button"

function useSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createBrowserClient(url, key)
}

function formatKo(dt: string) {
  try {
    return new Date(dt).toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" })
  } catch {
    return dt
  }
}

export function AdminInquiriesListManager() {
  const [rows, setRows] = useState<FranchiseInquiryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setError(null)
    const supabase = useSupabase()
    const { data, error: e } = await supabase
      .from("franchise_inquiries")
      .select("*")
      .order("created_at", { ascending: false })

    if (e) {
      setError(e.message)
      setLoading(false)
      return
    }
    setRows((data ?? []) as FranchiseInquiryRow[])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return <p className="text-sm text-muted-foreground">불러오는 중…</p>
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
        <div className="mt-3">
          <Button type="button" variant="outline" size="sm" onClick={() => load()}>
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">접수된 가맹 문의가 없습니다.</p>
  }

  return (
    <ul className="divide-y divide-border rounded-xl border border-border bg-card">
      {rows.map((r) => (
        <li key={r.id}>
          <Link
            href={`/admin/inquiries/${r.id}`}
            className="flex flex-col gap-1 px-4 py-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-foreground">{r.name}</p>
              <p className="text-sm text-muted-foreground">{r.phone}</p>
              {(r.region || r.timing) && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {[r.region, r.timing].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
            <p className="shrink-0 text-xs text-muted-foreground">{formatKo(r.created_at)}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
