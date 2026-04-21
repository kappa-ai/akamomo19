import type { Metadata } from "next"
import { getSiteContact } from "@/lib/get-site-contact"
import { hasStoresForPublicNav } from "@/lib/stores-public"
import { getPageTitles } from "@/lib/get-page-titles"
import { InquiryPageClient } from "./inquiry-page-client"

export async function generateMetadata(): Promise<Metadata> {
  const titles = await getPageTitles()
  return { title: titles.page_title_inquiry }
}

export default async function InquiryPage() {
  const [contact, showStoresNav] = await Promise.all([getSiteContact(), hasStoresForPublicNav()])
  return <InquiryPageClient contact={contact} showStoresNav={showStoresNav} />
}
