"use client"

import { useCallback, useEffect, useId, useMemo, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { HomeBannerRow, HomeBannerType } from "@/lib/home-banners"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HomeBannerImageField } from "@/components/admin/home-banner-image-field"

function useSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createBrowserClient(url, key)
}

export function AdminHomeBannersManager() {
  const formId = useId()
  const [rows, setRows] = useState<HomeBannerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingOrder, setSavingOrder] = useState(false)
  const [adding, setAdding] = useState(false)

  const [uploadKey, setUploadKey] = useState(() => crypto.randomUUID())
  const [newType, setNewType] = useState<HomeBannerType>("image")
  const [newImageUrl, setNewImageUrl] = useState("")
  const [newHtml, setNewHtml] = useState("")
  const [newAlt, setNewAlt] = useState("")
  const [newSort, setNewSort] = useState("0")

  const load = useCallback(async () => {
    setError(null)
    const supabase = useSupabase()
    const { data, error: loadError } = await supabase
      .from("home_banners")
      .select("id, banner_type, image_url, html_content, alt_text, sort_order")
      .order("sort_order", { ascending: true })
    if (loadError) {
      setError(loadError.message)
      setLoading(false)
      return
    }
    setRows((data as HomeBannerRow[]) ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const maxOrder = useMemo(() => rows.reduce((m, r) => Math.max(m, r.sort_order), -1), [rows])

  useEffect(() => {
    setNewSort(String(maxOrder + 1))
  }, [maxOrder])

  function setRowOrder(id: string, sort_order: number) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, sort_order } : r)))
  }

  async function saveOrder() {
    setSavingOrder(true)
    setError(null)
    const supabase = useSupabase()
    try {
      for (const r of rows) {
        const { error: u } = await supabase.from("home_banners").update({ sort_order: r.sort_order }).eq("id", r.id)
        if (u) throw u
      }
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "순서 저장에 실패했습니다.")
    } finally {
      setSavingOrder(false)
    }
  }

  async function remove(id: string) {
    if (!confirm("이 배너를 삭제할까요?")) return
    setError(null)
    const supabase = useSupabase()
    const { error: d } = await supabase.from("home_banners").delete().eq("id", id)
    if (d) {
      setError(d.message)
      return
    }
    await load()
  }

  async function addBanner() {
    setAdding(true)
    setError(null)
    const sort_order = Number.parseInt(newSort, 10)
    if (Number.isNaN(sort_order)) {
      setError("표시 순서는 숫자로 입력해 주세요.")
      setAdding(false)
      return
    }

    const supabase = useSupabase()
    const now = new Date().toISOString()

    try {
      if (newType === "image") {
        const image_url = newImageUrl.trim()
        if (!image_url) {
          setError("이미지 URL을 입력하거나 업로드해 주세요.")
          setAdding(false)
          return
        }
        const { error: ins } = await supabase.from("home_banners").insert({
          banner_type: "image",
          image_url,
          html_content: null,
          alt_text: newAlt.trim() || null,
          sort_order,
          updated_at: now,
        })
        if (ins) throw ins
      } else {
        const html_content = newHtml.trim()
        if (!html_content) {
          setError("HTML 내용을 입력해 주세요.")
          setAdding(false)
          return
        }
        const { error: ins } = await supabase.from("home_banners").insert({
          banner_type: "html",
          image_url: null,
          html_content,
          alt_text: newAlt.trim() || null,
          sort_order,
          updated_at: now,
        })
        if (ins) throw ins
      }

      setNewImageUrl("")
      setNewHtml("")
      setNewAlt("")
      setNewType("image")
      setUploadKey(crypto.randomUUID())
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "추가에 실패했습니다.")
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">불러오는 중…</p>
  }

  return (
    <div className="space-y-10">
      {error && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground">배너 추가</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          이미지(캡처 PNG 등) 또는 HTML 조각을 넣을 수 있습니다. HTML은 관리자만 입력하므로 신뢰된 마크업만
          사용해 주세요.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`${formId}-type`}>유형</Label>
            <Select value={newType} onValueChange={(v) => setNewType(v as HomeBannerType)}>
              <SelectTrigger id={`${formId}-type`} className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">이미지</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${formId}-sort`}>표시 순서</Label>
            <Input
              id={`${formId}-sort`}
              value={newSort}
              onChange={(e) => setNewSort(e.target.value)}
              inputMode="numeric"
              className="rounded-xl"
            />
          </div>
          {newType === "image" ? (
            <HomeBannerImageField uploadKey={uploadKey} value={newImageUrl} onChange={setNewImageUrl} />
          ) : (
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor={`${formId}-html`}>HTML</Label>
              <Textarea
                id={`${formId}-html`}
                value={newHtml}
                onChange={(e) => setNewHtml(e.target.value)}
                rows={8}
                className="min-h-[180px] rounded-xl font-mono text-sm"
                placeholder="<div>...</div>"
              />
            </div>
          )}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor={`${formId}-alt`}>대체 텍스트 (선택, 이미지·스크린리더용)</Label>
            <Input
              id={`${formId}-alt`}
              value={newAlt}
              onChange={(e) => setNewAlt(e.target.value)}
              className="rounded-xl"
            />
          </div>
        </div>
        <Button type="button" className="mt-6 rounded-full" disabled={adding} onClick={addBanner}>
          {adding ? "추가 중…" : "배너 추가"}
        </Button>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">등록된 배너</h2>
            <p className="mt-1 text-sm text-muted-foreground">숫자를 바꾼 뒤 &quot;순서 저장&quot;을 누르면 메인 슬라이드 순서가 바뀝니다.</p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="rounded-full"
            disabled={savingOrder || rows.length === 0}
            onClick={saveOrder}
          >
            {savingOrder ? "저장 중…" : "순서 저장"}
          </Button>
        </div>

        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">아직 배너가 없습니다. 메인에는 기본 문구가 표시됩니다.</p>
        ) : (
          <ul className="space-y-4">
            {rows.map((row) => (
              <li
                key={row.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-start"
              >
                <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-44">
                  {row.banner_type === "image" && row.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={row.image_url} alt="" className="h-full w-full object-cover" />
                  ) : row.banner_type === "html" && row.html_content ? (
                    <iframe title="미리보기" srcDoc={row.html_content} className="h-full w-full border-0" sandbox="" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    {row.banner_type === "image" ? "이미지" : "HTML"} ·{" "}
                    <span className="font-mono text-xs text-muted-foreground">{row.id.slice(0, 8)}…</span>
                  </p>
                  {row.banner_type === "image" && row.image_url && (
                    <p className="truncate text-xs text-muted-foreground">{row.image_url}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-muted-foreground">순서</Label>
                      <Input
                        className="h-9 w-20 rounded-lg"
                        type="number"
                        value={row.sort_order}
                        onChange={(e) =>
                          setRowOrder(row.id, Number.parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full text-destructive hover:text-destructive"
                      onClick={() => remove(row.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
