import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BrandSummary } from "@/components/home/brand-summary"
import { Differentiation } from "@/components/home/differentiation"
import { TargetAudience } from "@/components/home/target-audience"
import { SideJobOperation } from "@/components/brand/side-job-operation"
import { HeadquartersSupport } from "@/components/brand/headquarters-support"
import { StorePhotoRow } from "@/components/store/store-media"
import { storePhotoSlots } from "@/lib/store-photos"
import { Heart } from "lucide-react"
import { RevealSection } from "@/components/motion/reveal"
import { getSiteContact } from "@/lib/get-site-contact"

export default async function BrandPage() {
  const contact = await getSiteContact()
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <RevealSection
          mode="enter"
          className="relative overflow-hidden bg-gradient-to-b from-peach-lighter to-background py-20"
        >
          <div className="absolute top-10 right-10 h-40 w-40 rounded-full bg-blush/20 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-32 w-32 rounded-full bg-lavender/30 blur-2xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center justify-center gap-2 rounded-full border border-peach-light bg-white/80 px-4 py-2 backdrop-blur-sm">
                <Heart className="h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">브랜드 소개</span>
              </div>

              <h1 className="mb-4 w-full text-balance text-center text-3xl font-bold text-foreground md:text-5xl">
                <span className="text-primary">아카모모</span>를 소개합니다
              </h1>

              <p className="max-w-2xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">
                부담 없이 경험하는 새로운 성인용품 라이프스타일,
                <br className="hidden sm:block" />
                아카모모만의 특별한 공간 철학을 만나보세요.
              </p>
            </div>
          </div>
        </RevealSection>

        <BrandSummary />

        <RevealSection className="py-14 md:py-16 bg-background border-y border-border/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                실제 <span className="text-primary">매장 공간</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                밝고 친근한 라이프스타일 매장의 분위기를 사진으로 만나보세요.
              </p>
            </div>
            <StorePhotoRow images={storePhotoSlots.brandDifferentiationTrio} />
          </div>
        </RevealSection>

        <Differentiation />
        <SideJobOperation />
        <TargetAudience />
        <HeadquartersSupport />
      </main>
      <Footer contact={contact} />
    </div>
  )
}
