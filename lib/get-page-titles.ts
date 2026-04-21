import { cache } from "react"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/stores-db"
import { PAGE_TITLE_DEFAULTS, type PageTitles } from "@/lib/site-contact"

export const getPageTitles = cache(async (): Promise<PageTitles> => {
  if (!isSupabaseConfigured()) return PAGE_TITLE_DEFAULTS
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from("site_contact")
      .select("page_title_home, page_title_stores, page_title_startup, page_title_inquiry")
      .eq("id", 1)
      .maybeSingle()
    if (error || !data) return PAGE_TITLE_DEFAULTS
    return {
      page_title_home: data.page_title_home?.trim() || PAGE_TITLE_DEFAULTS.page_title_home,
      page_title_stores: data.page_title_stores?.trim() || PAGE_TITLE_DEFAULTS.page_title_stores,
      page_title_startup: data.page_title_startup?.trim() || PAGE_TITLE_DEFAULTS.page_title_startup,
      page_title_inquiry: data.page_title_inquiry?.trim() || PAGE_TITLE_DEFAULTS.page_title_inquiry,
    }
  } catch {
    return PAGE_TITLE_DEFAULTS
  }
})
