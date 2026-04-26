import { notFound } from "next/navigation"
import { AdminInquiryDetailManager } from "@/components/admin/inquiry-detail-manager"

const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export default async function AdminInquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!uuidRe.test(id)) {
    notFound()
  }
  return <AdminInquiryDetailManager inquiryId={id} />
}
