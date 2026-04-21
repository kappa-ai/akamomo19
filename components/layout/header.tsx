import { hasStoresForPublicNav } from "@/lib/stores-public"
import { HeaderClient } from "@/components/layout/header-client"

export async function Header() {
  const showStoresNav = await hasStoresForPublicNav()
  return <HeaderClient showStoresNav={showStoresNav} />
}
