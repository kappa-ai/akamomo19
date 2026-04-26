import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { FranchiseInquiryMessageRow, FranchiseInquiryRow } from "@/lib/franchise-inquiry"
import { getSiteContact } from "@/lib/get-site-contact"
import { hasStoresForPublicNav } from "@/lib/stores-public"
import { createAnonSupabaseClient } from "@/lib/supabase/anon-server"
import { InquiryBoardDetailClient } from "./inquiry-board-detail-client"

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  if (!uuidRe.test(id)) return { title: "문의 | 아카모모" }
  return { title: "문의 상세 | 아카모모" }
}

export default async function InquiryBoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!uuidRe.test(id)) {
    notFound()
  }

  let inquiry: FranchiseInquiryRow | null = null
  let messages: FranchiseInquiryMessageRow[] = []
  try {
    const supabase = createAnonSupabaseClient()
    const { data: inv, error: e1 } = await supabase.from("franchise_inquiries").select("*").eq("id", id).maybeSingle()
    if (e1) {
      console.error("franchise_inquiries detail", e1)
      notFound()
    }
    if (!inv) {
      notFound()
    }
    const { data: msgs, error: e2 } = await supabase
      .from("franchise_inquiry_messages")
      .select("*")
      .eq("inquiry_id", id)
      .order("created_at", { ascending: true })
    if (e2) {
      console.error("franchise_inquiry_messages", e2)
      notFound()
    }
    inquiry = inv as FranchiseInquiryRow
    messages = (msgs ?? []) as FranchiseInquiryMessageRow[]
  } catch {
    notFound()
  }

  const [contact, showStoresNav] = await Promise.all([getSiteContact(), hasStoresForPublicNav()])

  return (
    <InquiryBoardDetailClient
      contact={contact}
      showStoresNav={showStoresNav}
      inquiryId={id}
      inquiry={inquiry}
      initialMessages={messages}
    />
  )
}
