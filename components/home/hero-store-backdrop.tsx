import { StorePhotoLayer, type StorePhotoOverlay } from "@/components/home/store-photo-layer"

type HeroStoreBackdropProps = {
  src: string
  priority?: boolean
  overlay?: StorePhotoOverlay
}

export function HeroStoreBackdrop({ src, priority = false, overlay = "hero" }: HeroStoreBackdropProps) {
  return <StorePhotoLayer src={src} overlay={overlay} priority={priority} />
}
