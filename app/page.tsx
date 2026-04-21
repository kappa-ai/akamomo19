import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { getSiteContact } from "@/lib/get-site-contact"
import { getPageTitles } from "@/lib/get-page-titles"

export async function generateMetadata(): Promise<Metadata> {
  const titles = await getPageTitles()
  return { title: titles.page_title_home }
}

export default async function HomePage() {
  const contact = await getSiteContact()
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
      </main>
      <Footer contact={contact} />
    </div>
  )
}
