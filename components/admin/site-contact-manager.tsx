"use client"

import { useCallback, useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { SiteContactRow } from "@/lib/site-contact"
import { SITE_CONTACT_DEFAULTS, PAGE_TITLE_DEFAULTS } from "@/lib/site-contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function useSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createBrowserClient(url, key)
}

export function AdminSiteContactManager() {
  const [row, setRow] = useState<SiteContactRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setError(null)
    const supabase = useSupabase()
    const { data, error: loadError } = await supabase.from("site_contact").select("*").eq("id", 1).maybeSingle()
    if (loadError) {
      setError(loadError.message)
      setLoading(false)
      return
    }
    if (!data) {
      setRow({
        id: 1,
        phone: SITE_CONTACT_DEFAULTS.phone,
        contact_email: SITE_CONTACT_DEFAULTS.contact_email,
        ceo_name: SITE_CONTACT_DEFAULTS.ceo_name,
        business_reg_no: SITE_CONTACT_DEFAULTS.business_reg_no,
        page_title_home: PAGE_TITLE_DEFAULTS.page_title_home,
        page_title_stores: PAGE_TITLE_DEFAULTS.page_title_stores,
        page_title_startup: PAGE_TITLE_DEFAULTS.page_title_startup,
        page_title_inquiry: PAGE_TITLE_DEFAULTS.page_title_inquiry,
        updated_at: new Date().toISOString(),
      })
    } else {
      setRow(data as SiteContactRow)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function save() {
    if (!row) return
    setSaving(true)
    setError(null)
    const supabase = useSupabase()
    const payload = {
      phone: row.phone.trim(),
      contact_email: row.contact_email.trim(),
      ceo_name: row.ceo_name.trim(),
      business_reg_no: row.business_reg_no.trim(),
      page_title_home: row.page_title_home.trim(),
      page_title_stores: row.page_title_stores.trim(),
      page_title_startup: row.page_title_startup.trim(),
      page_title_inquiry: row.page_title_inquiry.trim(),
      updated_at: new Date().toISOString(),
    }
    if (!payload.phone || !payload.contact_email || !payload.ceo_name || !payload.business_reg_no) {
      setError("연락처 항목을 모두 입력해 주세요.")
      setSaving(false)
      return
    }
    if (!payload.page_title_home || !payload.page_title_stores || !payload.page_title_startup || !payload.page_title_inquiry) {
      setError("페이지 제목 항목을 모두 입력해 주세요.")
      setSaving(false)
      return
    }
    const { error: e } = await supabase.from("site_contact").update(payload).eq("id", 1)
    if (e) {
      setError(e.message)
      setSaving(false)
      return
    }
    await load()
    setSaving(false)
  }

  if (loading || !row) {
    return <p className="text-sm text-muted-foreground">불러오는 중…</p>
  }

  return (
    <div className="space-y-8">
      {error && (
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* 페이지 제목 관리 */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-1 text-base font-semibold text-foreground">페이지 탭 제목</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          브라우저 탭과 검색 결과에 표시되는 각 페이지의 제목입니다.{" "}
          마이그레이션 <code className="rounded bg-muted px-1 py-0.5 text-xs">005_page_titles.sql</code> 적용 후 저장할 수 있습니다.
        </p>

        <div className="grid gap-6">
          <div className="space-y-2">
            <Label htmlFor="page_title_home">홈 페이지</Label>
            <Input
              id="page_title_home"
              value={row.page_title_home ?? ""}
              onChange={(e) => setRow({ ...row, page_title_home: e.target.value })}
              placeholder={PAGE_TITLE_DEFAULTS.page_title_home}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="page_title_stores">매장 찾기 페이지</Label>
            <Input
              id="page_title_stores"
              value={row.page_title_stores ?? ""}
              onChange={(e) => setRow({ ...row, page_title_stores: e.target.value })}
              placeholder={PAGE_TITLE_DEFAULTS.page_title_stores}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="page_title_startup">창업 안내 페이지</Label>
            <Input
              id="page_title_startup"
              value={row.page_title_startup ?? ""}
              onChange={(e) => setRow({ ...row, page_title_startup: e.target.value })}
              placeholder={PAGE_TITLE_DEFAULTS.page_title_startup}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="page_title_inquiry">문의하기 페이지</Label>
            <Input
              id="page_title_inquiry"
              value={row.page_title_inquiry ?? ""}
              onChange={(e) => setRow({ ...row, page_title_inquiry: e.target.value })}
              placeholder={PAGE_TITLE_DEFAULTS.page_title_inquiry}
            />
          </div>
        </div>
      </div>

      {/* 연락처 · 사업자 정보 */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-1 text-base font-semibold text-foreground">연락처 · 사업자 정보</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          푸터·가맹 문의 등 사이트에 노출되는 전화번호, 이메일, 대표자명, 사업자등록번호입니다.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="phone">전화번호 (표시 및 상담 링크)</Label>
            <Input
              id="phone"
              value={row.phone}
              onChange={(e) => setRow({ ...row, phone: e.target.value })}
              className="max-w-md"
              placeholder="1588-0000"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="contact_email">이메일</Label>
            <Input
              id="contact_email"
              type="email"
              value={row.contact_email}
              onChange={(e) => setRow({ ...row, contact_email: e.target.value })}
              className="max-w-md"
              placeholder="contact@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ceo_name">대표자명</Label>
            <Input
              id="ceo_name"
              value={row.ceo_name}
              onChange={(e) => setRow({ ...row, ceo_name: e.target.value })}
              placeholder="홍길동"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business_reg_no">사업자등록번호</Label>
            <Input
              id="business_reg_no"
              value={row.business_reg_no}
              onChange={(e) => setRow({ ...row, business_reg_no: e.target.value })}
              placeholder="000-00-00000"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" onClick={() => void save()} disabled={saving}>
          {saving ? "저장 중…" : "저장"}
        </Button>
      </div>
    </div>
  )
}
