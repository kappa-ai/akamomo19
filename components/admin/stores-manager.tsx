"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import type { StoreRow, UpcomingStoreRow } from "@/lib/stores-db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Pencil, Plus } from "lucide-react"
import { StoreImageUrlField } from "@/components/admin/store-image-url-field"

function useSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createBrowserClient(url, key)
}

export function AdminStoresManager() {
  const [operating, setOperating] = useState<StoreRow[]>([])
  const [upcoming, setUpcoming] = useState<UpcomingStoreRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingOp, setEditingOp] = useState<StoreRow | null>(null)
  const [editingUp, setEditingUp] = useState<UpcomingStoreRow | null>(null)

  const load = useCallback(async () => {
    setError(null)
    const supabase = useSupabase()
    const [op, up] = await Promise.all([
      supabase.from("stores").select("*").order("sort_order", { ascending: true }),
      supabase.from("upcoming_stores").select("*").order("sort_order", { ascending: true }),
    ])
    if (op.error) {
      setError(op.error.message)
      setLoading(false)
      return
    }
    if (up.error) {
      setError(up.error.message)
      setLoading(false)
      return
    }
    setOperating((op.data ?? []) as StoreRow[])
    setUpcoming((up.data ?? []) as UpcomingStoreRow[])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function deleteOperating(id: string) {
    if (!confirm("이 매장을 삭제할까요?")) return
    const supabase = useSupabase()
    const { error: e } = await supabase.from("stores").delete().eq("id", id)
    if (e) {
      setError(e.message)
      return
    }
    await load()
  }

  async function deleteUpcoming(id: string) {
    if (!confirm("삭제할까요?")) return
    const supabase = useSupabase()
    const { error: e } = await supabase.from("upcoming_stores").delete().eq("id", id)
    if (e) {
      setError(e.message)
      return
    }
    await load()
  }

  async function saveOperating(row: Partial<StoreRow> & { id?: string }) {
    const supabase = useSupabase()
    const payload = {
      name: row.name?.trim(),
      address: row.address?.trim(),
      phone: row.phone?.trim(),
      hours: row.hours?.trim() || "24시간 운영",
      status: row.status?.trim() || "운영중",
      image_url: row.image_url?.trim() || null,
      sort_order: row.sort_order ?? 0,
    }
    if (!payload.name || !payload.address || !payload.phone) {
      setError("매장명, 주소, 전화번호는 필수입니다.")
      return
    }
    if (row.id) {
      const { error: e } = await supabase.from("stores").update(payload).eq("id", row.id)
      if (e) {
        setError(e.message)
        return
      }
    } else {
      const { error: e } = await supabase.from("stores").insert(payload)
      if (e) {
        setError(e.message)
        return
      }
    }
    setEditingOp(null)
    await load()
  }

  async function saveUpcoming(row: Partial<UpcomingStoreRow> & { id?: string }) {
    const supabase = useSupabase()
    const payload = {
      name: row.name?.trim(),
      region: row.region?.trim(),
      status: row.status?.trim(),
      image_url: row.image_url?.trim() || null,
      sort_order: row.sort_order ?? 0,
    }
    if (!payload.name || !payload.region || !payload.status) {
      setError("매장명, 지역, 오픈 안내 문구는 필수입니다.")
      return
    }
    if (row.id) {
      const { error: e } = await supabase.from("upcoming_stores").update(payload).eq("id", row.id)
      if (e) {
        setError(e.message)
        return
      }
    } else {
      const { error: e } = await supabase.from("upcoming_stores").insert(payload)
      if (e) {
        setError(e.message)
        return
      }
    }
    setEditingUp(null)
    await load()
  }

  if (loading) {
    return <p className="text-muted-foreground">불러오는 중…</p>
  }

  return (
    <div className="space-y-12">
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
          <Button type="button" variant="ghost" size="sm" className="ml-2 h-auto p-0 text-destructive" onClick={() => setError(null)}>
            닫기
          </Button>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        변경이 안 되면 Supabase에서 <code className="rounded bg-muted px-1">admin_users</code>에 본인 계정 UUID가 등록됐는지 확인해 주세요. (
        <code className="rounded bg-muted px-1">docs/SUPABASE_OWNER_HANDOFF.md</code>)
      </p>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">운영 중인 매장</h2>

        {editingOp && (
          <OperatingForm
            initial={editingOp}
            onCancel={() => setEditingOp(null)}
            onSave={(r) => {
              setError(null)
              void saveOperating(r)
            }}
          />
        )}

        {!editingOp && (
          <Button
            type="button"
            variant="outline"
            className="mb-6 rounded-full"
            onClick={() =>
              setEditingOp({
                id: "",
                name: "",
                address: "",
                phone: "",
                hours: "24시간 운영",
                status: "운영중",
                image_url: null,
                sort_order: operating.length,
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            매장 추가
          </Button>
        )}

        <ul className="space-y-4">
          {operating
            .filter((s) => !editingOp || editingOp.id !== s.id)
            .map((s) => (
            <li key={s.id} className="flex flex-col gap-3 rounded-2xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.address}</p>
                <p className="text-sm text-muted-foreground">
                  {s.phone} · {s.hours}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => setEditingOp({ ...s })}
                >
                  <Pencil className="mr-1 h-3.5 w-3.5" />
                  수정
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-full text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    setError(null)
                    void deleteOperating(s.id)
                  }}
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  삭제
                </Button>
              </div>
            </li>
          ))}
        </ul>
        {operating.length === 0 && !editingOp && <p className="text-sm text-muted-foreground">등록된 매장이 없습니다.</p>}
      </section>

      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">오픈 예정 매장</h2>

        {editingUp && (
          <UpcomingForm
            initial={editingUp}
            onCancel={() => setEditingUp(null)}
            onSave={(r) => {
              setError(null)
              void saveUpcoming(r)
            }}
          />
        )}

        {!editingUp && (
          <Button
            type="button"
            variant="outline"
            className="mb-6 rounded-full"
            onClick={() =>
              setEditingUp({
                id: "",
                name: "",
                region: "",
                status: "",
                image_url: null,
                sort_order: upcoming.length,
              })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            예정 매장 추가
          </Button>
        )}

        <ul className="space-y-4">
          {upcoming
            .filter((s) => !editingUp || editingUp.id !== s.id)
            .map((s) => (
            <li key={s.id} className="flex flex-col gap-3 rounded-2xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-foreground">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.region}</p>
                <p className="text-sm text-primary">{s.status}</p>
              </div>
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="outline" className="rounded-full" onClick={() => setEditingUp({ ...s })}>
                  <Pencil className="mr-1 h-3.5 w-3.5" />
                  수정
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="rounded-full text-destructive hover:bg-destructive/10"
                  onClick={() => {
                    setError(null)
                    void deleteUpcoming(s.id)
                  }}
                >
                  <Trash2 className="mr-1 h-3.5 w-3.5" />
                  삭제
                </Button>
              </div>
            </li>
          ))}
        </ul>
        {upcoming.length === 0 && !editingUp && <p className="text-sm text-muted-foreground">등록된 예정 매장이 없습니다.</p>}
      </section>
    </div>
  )
}

function OperatingForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: StoreRow
  onSave: (r: Partial<StoreRow> & { id?: string }) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initial.name)
  const [address, setAddress] = useState(initial.address)
  const [phone, setPhone] = useState(initial.phone)
  const [hours, setHours] = useState(initial.hours)
  const [status, setStatus] = useState(initial.status)
  const [imageUrl, setImageUrl] = useState(initial.image_url ?? "")
  const [sortOrder, setSortOrder] = useState(String(initial.sort_order))
  const draftStorageKey = useRef<string | null>(null)
  if (!initial.id) {
    if (!draftStorageKey.current) draftStorageKey.current = crypto.randomUUID()
  }
  const storageEntityKey = initial.id || draftStorageKey.current!

  return (
    <div className="mb-6 space-y-4 rounded-2xl border border-dashed border-primary/40 bg-peach-lighter/20 p-4">
      <p className="text-sm font-medium text-foreground">{initial.id ? "매장 수정" : "새 매장 추가"}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="op-name">매장명</Label>
          <Input id="op-name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="op-phone">전화</Label>
          <Input id="op-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="op-address">주소</Label>
          <Input id="op-address" value={address} onChange={(e) => setAddress(e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="op-hours">영업 시간</Label>
          <Input id="op-hours" value={hours} onChange={(e) => setHours(e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="op-status">상태 라벨</Label>
          <Input id="op-status" value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl" />
        </div>
        <StoreImageUrlField kind="operating" entityKey={storageEntityKey} value={imageUrl} onChange={setImageUrl} />
        <div className="space-y-1">
          <Label htmlFor="op-sort">정렬 순서 (숫자)</Label>
          <Input id="op-sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="rounded-xl" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          className="rounded-full bg-primary hover:bg-coral"
          onClick={() =>
            onSave({
              id: initial.id || undefined,
              name,
              address,
              phone,
              hours,
              status,
              image_url: imageUrl || null,
              sort_order: Number.parseInt(sortOrder, 10) || 0,
            })
          }
        >
          저장
        </Button>
        <Button type="button" variant="outline" className="rounded-full" onClick={onCancel}>
          취소
        </Button>
      </div>
    </div>
  )
}

function UpcomingForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: UpcomingStoreRow
  onSave: (r: Partial<UpcomingStoreRow> & { id?: string }) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initial.name)
  const [region, setRegion] = useState(initial.region)
  const [status, setStatus] = useState(initial.status)
  const [imageUrl, setImageUrl] = useState(initial.image_url ?? "")
  const [sortOrder, setSortOrder] = useState(String(initial.sort_order))
  const draftStorageKey = useRef<string | null>(null)
  if (!initial.id) {
    if (!draftStorageKey.current) draftStorageKey.current = crypto.randomUUID()
  }
  const storageEntityKey = initial.id || draftStorageKey.current!

  return (
    <div className="mb-6 space-y-4 rounded-2xl border border-dashed border-primary/40 bg-peach-lighter/20 p-4">
      <p className="text-sm font-medium text-foreground">{initial.id ? "예정 매장 수정" : "오픈 예정 매장 추가"}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <Label htmlFor="up-name">매장명</Label>
          <Input id="up-name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="up-region">지역</Label>
          <Input id="up-region" value={region} onChange={(e) => setRegion(e.target.value)} className="rounded-xl" />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <Label htmlFor="up-status">오픈 안내 문구</Label>
          <Input id="up-status" value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl" />
        </div>
        <StoreImageUrlField kind="upcoming" entityKey={storageEntityKey} value={imageUrl} onChange={setImageUrl} />
        <div className="space-y-1">
          <Label htmlFor="up-sort">정렬 순서</Label>
          <Input id="up-sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="rounded-xl" />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          className="rounded-full bg-primary hover:bg-coral"
          onClick={() =>
            onSave({
              id: initial.id || undefined,
              name,
              region,
              status,
              image_url: imageUrl || null,
              sort_order: Number.parseInt(sortOrder, 10) || 0,
            })
          }
        >
          저장
        </Button>
        <Button type="button" variant="outline" className="rounded-full" onClick={onCancel}>
          취소
        </Button>
      </div>
    </div>
  )
}
