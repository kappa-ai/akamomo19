import { cache } from "react"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/stores-db"

export type HomeBannerType = "image" | "html"

export type HomeBannerRow = {
  id: string
  banner_type: HomeBannerType
  image_url: string | null
  html_content: string | null
  alt_text: string | null
  sort_order: number
}

export const getHomeBanners = cache(async (): Promise<HomeBannerRow[]> => {
  if (!isSupabaseConfigured()) {
    return []
  }
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from("home_banners")
      .select("id, banner_type, image_url, html_content, alt_text, sort_order")
      .order("sort_order", { ascending: true })
    if (error || !data) {
      return []
    }
    return data as HomeBannerRow[]
  } catch {
    return []
  }
})
