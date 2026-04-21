import { hasStoresForPublicNav } from "@/lib/stores-public"
import type { SiteContact } from "@/lib/site-contact"
import { FooterClient } from "@/components/layout/footer-client"

export async function Footer({ contact }: { contact: SiteContact }) {
  const showStoresNav = await hasStoresForPublicNav()
  return <FooterClient contact={contact} showStoresNav={showStoresNav} />
}
