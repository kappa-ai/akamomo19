import Image from "next/image"

export type StorePhotoOverlay = "hero" | "section" | "section-soft" | "cta"

const overlayClass: Record<StorePhotoOverlay, string> = {
  /** 메인 배너: 글자 대비 강하게 */
  hero: "bg-gradient-to-b from-background/90 via-cream/84 to-background/93",
  /** 본문 섹션 */
  section: "bg-gradient-to-b from-background/88 via-background/80 to-background/90",
  /** 카드·밝은 UI가 많을 때 조금 더 비춤 */
  "section-soft": "bg-gradient-to-b from-background/82 via-cream/76 to-background/88",
  /** 컬러 CTA 위에 얹기 전 단계 — 어둡게 */
  cta: "bg-gradient-to-b from-black/55 via-black/45 to-black/60",
}

type StorePhotoLayerProps = {
  src: string
  overlay?: StorePhotoOverlay
  priority?: boolean
  /** 히어로는 전체 너비, 좁은 밴드는 (예) max-h-72 */
  sizes?: string
}

export function StorePhotoLayer({
  src,
  overlay = "section",
  priority = false,
  sizes = "100vw",
}: StorePhotoLayerProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Image
        alt=""
        src={src}
        fill
        className="object-cover object-center"
        priority={priority}
        sizes={sizes}
      />
      <div className={`absolute inset-0 ${overlayClass[overlay]}`} aria-hidden />
    </div>
  )
}
