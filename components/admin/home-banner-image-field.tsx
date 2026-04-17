"use client"

import { useId, useRef, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  HOME_BANNERS_BUCKET,
  buildHomeBannerObjectPath,
  homeBannerPublicUrl,
} from "@/lib/storage-home-banners"

const MAX_BYTES = 5 * 1024 * 1024

type Props = {
  /** 업로드 객체 경로에 쓰는 고정 키(임시 UUID 등) */
  uploadKey: string
  value: string
  onChange: (url: string) => void
}

export function HomeBannerImageField({ uploadKey, value, onChange }: Props) {
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
      const objectPath = buildHomeBannerObjectPath(uploadKey, file)
      const { error } = await supabase.storage.from(HOME_BANNERS_BUCKET).upload(objectPath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || "image/jpeg",
      })
      if (error) throw error
      onChange(homeBannerPublicUrl(url, objectPath))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "업로드에 실패했습니다."
      setLocalErr(
        msg.includes("Bucket not found") || msg.includes("not found")
          ? "Storage 버킷이 없습니다. Supabase에서 supabase/migrations/004_home_banners.sql 을 실행해 주세요."
          : msg,
      )
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2 sm:col-span-2">
      <Label htmlFor={fieldId}>이미지 URL</Label>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="sr-only"
          onChange={onPickFile}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? "업로드 중…" : "이미지 업로드"}
        </Button>
        <span className="text-xs text-muted-foreground">
          Storage에 올리면 주소가 자동 입력됩니다. 외부 URL을 직접 넣어도 됩니다.
        </span>
      </div>
      <Input
        id={fieldId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="rounded-xl"
      />
      {localErr && <p className="text-xs text-destructive">{localErr}</p>}
    </div>
  )
}
