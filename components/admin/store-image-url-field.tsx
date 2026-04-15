"use client"

import { useId, useRef, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { STORE_IMAGES_BUCKET, buildStoreImageObjectPath, storeImagePublicUrl } from "@/lib/storage-store-images"

const MAX_BYTES = 5 * 1024 * 1024

type Props = {
  kind: "operating" | "upcoming"
  /** 매장 id 또는 신규 작성용 임시 키(한 폼에서 고정) */
  entityKey: string
  value: string
  onChange: (url: string) => void
}

export function StoreImageUrlField({ kind, entityKey, value, onChange }: Props) {
  const fieldId = useId()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [localErr, setLocalErr] = useState<string | null>(null)

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setLocalErr("이미지 파일만 올릴 수 있습니다.")
      return
    }
    if (file.size > MAX_BYTES) {
      setLocalErr("파일은 5MB 이하만 가능합니다.")
      return
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      setLocalErr("Supabase 환경 변수가 없습니다.")
      return
    }

    setLocalErr(null)
    setUploading(true)
    try {
      const supabase = createBrowserClient(url, key)
      const objectPath = buildStoreImageObjectPath(kind, entityKey, file)
      const { error } = await supabase.storage.from(STORE_IMAGES_BUCKET).upload(objectPath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || "image/jpeg",
      })
      if (error) throw error
      onChange(storeImagePublicUrl(url, objectPath))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "업로드에 실패했습니다."
      setLocalErr(
        msg.includes("Bucket not found") || msg.includes("not found")
          ? "Storage 버킷이 없습니다. Supabase SQL Editor에서 supabase/migrations/002_storage_store_images.sql 을 실행해 주세요."
          : msg
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2 sm:col-span-2">
      <Label htmlFor={fieldId}>매장 이미지 (선택)</Label>
      <div className="flex flex-wrap items-center gap-2">
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={onPickFile} />
        <Button type="button" variant="outline" size="sm" className="rounded-full" disabled={uploading} onClick={() => fileRef.current?.click()}>
          {uploading ? "업로드 중…" : "이미지 업로드"}
        </Button>
        <span className="text-xs text-muted-foreground">Supabase Storage에 올리고 주소가 자동 입력됩니다. 또는 URL 직접 입력.</span>
      </div>
      <Input
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://... 또는 업로드 후 자동 입력"
        className="rounded-xl"
      />
      {localErr && <p className="text-xs text-destructive">{localErr}</p>}
    </div>
  )
}
