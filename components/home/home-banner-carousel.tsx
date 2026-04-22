"use client"

import Image from "next/image"
import * as React from "react"
import { Sparkles } from "lucide-react"
import type { HomeBannerRow } from "@/lib/home-banners"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const AUTOPLAY_MS = 6000

function HeroMarketingFallback() {
  return (
    <div className="mx-auto w-full max-w-4xl text-center">
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-peach-light bg-white px-4 py-2 shadow-sm">
        <Sparkles className="h-4 w-4 text-coral" />
        <span className="text-sm font-medium text-foreground">새로운 형태의 성인용품 창업</span>
      </div>
      <h1 className="mb-6 text-3xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
        <span className="text-balance">부담 없이 시작하는</span>
        <br />
        <span className="text-primary">아카모모</span>
        <span className="text-balance"> 프랜차이즈</span>
      </h1>
      <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
        기존의 딱딱하고 부담스러운 성인용품점은 이제 그만.
        <br className="hidden md:block" />
        밝고 친근한 라이프스타일 매장으로 새로운 창업의 기회를 만나보세요.
      </p>
    </div>
  )
}

function BannerSlide({
  banner,
  priority,
  fillViewport,
}: {
  banner: HomeBannerRow
  priority?: boolean
  fillViewport?: boolean
}) {
  const boxClass = fillViewport
    ? "relative h-full min-h-0 w-full bg-background"
    : "relative h-[clamp(220px,min(50svh,520px),640px)] w-full bg-background"

  if (banner.banner_type === "html" && banner.html_content) {
    return (
      <div className={boxClass}>
        <iframe
          title={banner.alt_text?.trim() || "메인 배너"}
          srcDoc={banner.html_content}
          className="absolute inset-0 h-full w-full border-0"
          sandbox=""
        />
      </div>
    )
  }
  const src = banner.image_url?.trim()
  if (!src) return null
  return (
    <div className={boxClass}>
      <Image
        src={src}
        alt={banner.alt_text?.trim() || "메인 배너"}
        fill
        className={fillViewport ? "object-cover object-center" : "object-contain object-center"}
        sizes="100vw"
        priority={priority}
      />
    </div>
  )
}

type Props = {
  banners: HomeBannerRow[]
  /** 배너만 있을 때: 부모 높이(거의 풀뷰)를 채움 */
  fillViewport?: boolean
}

export function HomeBannerCarousel({ banners, fillViewport = false }: Props) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [selected, setSelected] = React.useState(0)
  const loop = banners.length > 1

  React.useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    onSelect()
    api.on("reInit", onSelect)
    api.on("select", onSelect)
    return () => {
      api.off("reInit", onSelect)
      api.off("select", onSelect)
    }
  }, [api])

  React.useEffect(() => {
    if (!api || banners.length <= 1) return
    const id = window.setInterval(() => {
      api.scrollNext()
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [api, banners.length])

  if (banners.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-20 pt-6 sm:px-6 sm:pb-24 sm:pt-8 lg:px-8">
        <HeroMarketingFallback />
      </div>
    )
  }

  return (
    <div className={cn("relative w-full", fillViewport && "flex min-h-0 flex-1 flex-col")}>
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop, containScroll: "trimSnaps" }}
        className={cn("w-full", fillViewport && "flex min-h-0 flex-1 flex-col")}
      >
        <CarouselContent className={cn("-ml-0", fillViewport && "min-h-0 flex-1")}>
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id} className={cn("basis-full pl-0", fillViewport && "h-full min-h-0")}>
              <BannerSlide banner={banner} priority={index === 0} fillViewport={fillViewport} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {banners.length > 1 && (
        <div
          className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2 sm:bottom-10"
          role="tablist"
          aria-label="배너 선택"
        >
          {banners.map((b, i) => (
            <button
              key={b.id}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`배너 ${i + 1}`}
              className={cn(
                "h-2.5 rounded-full transition-[width,background-color] duration-200 ease-out",
                i === selected ? "w-8 bg-primary" : "w-2.5 bg-foreground/25 hover:bg-foreground/40",
              )}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
