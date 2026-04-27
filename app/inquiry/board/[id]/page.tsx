import type { Metadata } from "next"
import { getSiteContact } from "@/lib/get-site-contact"
import { hasStoresForPublicNav } from "@/lib/stores-public"
import { InquiryBoardDetailClient } from "./inquiry-board-detail-client"

export const metadata: Metadata = {
  title: "게시글 | 문의게시판",
}

export default async function InquiryBoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [contact, showStoresNav] = await Promise.all([getSiteContact(), hasStoresForPublicNav()])
  return <InquiryBoardDetailClient id={id} contact={contact} showStoresNav={showStoresNav} />
}
