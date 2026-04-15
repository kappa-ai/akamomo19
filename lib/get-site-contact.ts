import { cache } from "react"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/stores-db"
import {
  SITE_CONTACT_DEFAULTS,
  type SiteContact,
} from "@/lib/site-contact"

function normalize(row: Partial<SiteContact> | null): SiteContact {
  if (!row) return SITE_CONTACT_DEFAULTS
  return {
    phone: row.phone?.trim() || SITE_CONTACT_DEFAULTS.phone,
    contact_email: row.contact_email?.trim() || SITE_CONTACT_DEFAULTS.contact_email,
    ceo_name: row.ceo_name?.trim() || SITE_CONTACT_DEFAULTS.ceo_name,
    business_reg_no: row.business_reg_no?.trim() || SITE_CONTACT_DEFAULTS.business_reg_no,
  }
}

/** 동일 요청 내 중복 조회 방지 */
export const getSiteContact = cache(async (): Promise<SiteContact> => {
  if (!isSupabaseConfigured()) {
    return SITE_CONTACT_DEFAULTS
  }
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from("site_contact")
      .select("phone, contact_email, ceo_name, business_reg_no")
      .eq("id", 1)
      .maybeSingle()
    if (error || !data) {
      return SITE_CONTACT_DEFAULTS
    }
    return normalize(data as Partial<SiteContact>)
  } catch {
    return SITE_CONTACT_DEFAULTS
  }
})
