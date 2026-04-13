import { StorePhotoLayer, type StorePhotoOverlay } from "@/components/home/store-photo-layer"

type HeroStoreBackdropProps = {
  src: string
  priority?: boolean
  overlay?: StorePhotoOverlay
}

/** 풀블리드 히어로/배너용 (오버레이만 조절할 때 `overlay` 전달) */
export function HeroStoreBackdrop({ src, priority = false, overlay = "hero" }: HeroStoreBackdropProps) {
  return <StorePhotoLayer src={src} overlay={overlay} priority={priority} />
}
