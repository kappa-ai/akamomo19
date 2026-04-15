/** Supabase Storage 버킷 — migrations/002_storage_store_images.sql 과 이름 맞출 것 */
export const STORE_IMAGES_BUCKET = "store-images" as const

export function storeImagePublicUrl(supabaseUrl: string, path: string): string {
  const base = supabaseUrl.replace(/\/$/, "")
  const p = path.replace(/^\/+/, "")
  return `${base}/storage/v1/object/public/${STORE_IMAGES_BUCKET}/${p}`
}

/** 업로드 객체 경로 (버킷 루트 기준) */
export function buildStoreImageObjectPath(
  kind: "operating" | "upcoming",
  entityKey: string,
  file: File
): string {
  const rawExt = file.name.split(".").pop()?.toLowerCase() || "jpg"
  const ext = ["jpg", "jpeg", "png", "webp", "gif"].includes(rawExt) ? (rawExt === "jpeg" ? "jpg" : rawExt) : "jpg"
  const baseName = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-zA-Z0-9-_가-힣]/g, "_")
    .slice(0, 48)
  const stamp =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
  const key = entityKey.replace(/[^a-zA-Z0-9-]/g, "_").slice(0, 64) || "draft"
  return `${kind}/${key}/${stamp}-${baseName || "image"}.${ext}`
}
