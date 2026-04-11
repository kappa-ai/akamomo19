import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { BrandSummary } from "@/components/home/brand-summary"
import { TargetAudience } from "@/components/home/target-audience"
import { Differentiation } from "@/components/home/differentiation"
import { FranchiseStrengths } from "@/components/home/franchise-strengths"
import { FranchiseProcess } from "@/components/home/franchise-process"
import { StartupCost } from "@/components/home/startup-cost"
import { InquiryCTA } from "@/components/home/inquiry-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <BrandSummary />
        <TargetAudience />
        <Differentiation />
        <FranchiseStrengths />
        <FranchiseProcess />
        <StartupCost />
        <InquiryCTA />
      </main>
      <Footer />
    </div>
  )
}
