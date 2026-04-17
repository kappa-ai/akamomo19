import { RevealSection } from "@/components/motion/reveal"
import { HeroStoreBackdrop } from "@/components/home/hero-store-backdrop"
import { HomeBannerCarousel } from "@/components/home/home-banner-carousel"
import { storePhotoSlots } from "@/lib/store-photos"
import { getHomeBanners } from "@/lib/home-banners"

/** 배경: `lib/store-photos.ts` → `storePhotoSlots.homeHero`. 메인 카피는 Supabase `home_banners` 또는 기본 문구. */
export async function HeroSection() {
  const banners = await getHomeBanners()
  const showBackdrop = banners.length === 0

  return (
    <RevealSection
      mode="enter"
      role="banner"
      aria-label="아카모모 메인 소개"
      className={
        showBackdrop
          ? "relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-background"
          : "relative flex h-[calc(100svh-4rem)] min-h-0 flex-col overflow-hidden bg-background"
      }
    >
      {showBackdrop ? (
        <HeroStoreBackdrop src={storePhotoSlots.homeHero} priority />
      ) : null}

      <div
        className={
          showBackdrop
            ? "relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-0 pb-28 pt-10 sm:pb-32 sm:pt-12 lg:pb-36"
            : "relative z-10 flex h-full min-h-0 w-full flex-col px-0 pb-0 pt-0"
        }
      >
        <HomeBannerCarousel banners={banners} fillViewport={!showBackdrop} />
      </div>

      {showBackdrop ? (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 50C240 80 480 90 720 80C960 70 1200 50 1440 60V100H0V50Z"
              fill="currentColor"
              className="text-background"
            />
          </svg>
        </div>
      ) : null}
    </RevealSection>
  )
}
