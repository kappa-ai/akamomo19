import Image from "next/image"

export type StorePhotoOverlay = "hero" | "section" | "section-soft" | "cta"

const overlayClass: Record<StorePhotoOverlay, string> = {
  hero: "bg-gradient-to-b from-background/90 via-cream/84 to-background/93",
  section: "bg-gradient-to-b from-background/88 via-background/80 to-background/90",
  "section-soft": "bg-gradient-to-b from-background/82 via-cream/76 to-background/88",
  cta: "bg-gradient-to-b from-black/55 via-black/45 to-black/60",
}

type StorePhotoLayerProps = {
  src: string
  overlay?: StorePhotoOverlay
  priority?: boolean
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
