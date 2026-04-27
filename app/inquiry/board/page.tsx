import type { Metadata } from "next"
import { getSiteContact } from "@/lib/get-site-contact"
import { hasStoresForPublicNav } from "@/lib/stores-public"
import { InquiryBoardListClient } from "./inquiry-board-list-client"

export const metadata: Metadata = {
  title: "문의게시판 | 아카모모 파트너스",
  description: "가맹·운영 문의를 남기는 게시판입니다. 비밀글은 비밀번호로만 확인할 수 있습니다.",
}

export default async function InquiryBoardPage() {
  const [contact, showStoresNav] = await Promise.all([getSiteContact(), hasStoresForPublicNav()])
  return <InquiryBoardListClient contact={contact} showStoresNav={showStoresNav} />
}
