export const HOME_BANNERS_BUCKET = "home-banners"

export function buildHomeBannerObjectPath(bannerId: string, file: File): string {
  const safeBase = file.name.replace(/[^\w.\-]+/g, "_").slice(0, 80) || "image"
  return `banners/${bannerId}/${Date.now()}-${safeBase}`
}

export function homeBannerPublicUrl(supabaseProjectUrl: string, objectPath: string): string {
  const base = supabaseProjectUrl.replace(/\/$/, "")
  return `${base}/storage/v1/object/public/${HOME_BANNERS_BUCKET}/${objectPath}`
}
