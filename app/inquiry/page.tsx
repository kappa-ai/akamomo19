import { getSiteContact } from "@/lib/get-site-contact"
import { InquiryPageClient } from "./inquiry-page-client"

export default async function InquiryPage() {
  const contact = await getSiteContact()
  return <InquiryPageClient contact={contact} />
}
