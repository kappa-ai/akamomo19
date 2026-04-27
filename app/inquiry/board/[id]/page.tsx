import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getSiteContact } from "@/lib/get-site-contact"
import { hasStoresForPublicNav } from "@/lib/stores-public"
import { InquiryBoardDetailClient } from "./inquiry-board-detail-client"

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  if (!uuidRe.test(id)) return { title: "문의 | 아카모모" }
  return { title: "게시글 | 문의게시판" }
}

export default async function InquiryBoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!uuidRe.test(id)) {
    notFound()
  }
  const [contact, showStoresNav] = await Promise.all([getSiteContact(), hasStoresForPublicNav()])
  return <InquiryBoardDetailClient id={id} contact={contact} showStoresNav={showStoresNav} />
}
