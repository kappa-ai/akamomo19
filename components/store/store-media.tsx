import Image from "next/image"
import { cn } from "@/lib/utils"
import { RevealSection } from "@/components/motion/reveal"

const ALT = "아카모모 실제 매장"

type Aspect = "video" | "landscape" | "portrait" | "wide"

const aspectClass: Record<Aspect, string> = {
  video: "aspect-video",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
}

type StorePhotoProps = {
  src: string
  alt?: string
  className?: string
  aspect?: Aspect
  sizes?: string
  priority?: boolean
  /** 매장 사진 등 심의·플랫폼 정책용 비식별 블러 */
  obscured?: boolean
}

export function StorePhoto({
  src,
  alt = ALT,
  className,
  aspect = "landscape",
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority,
  obscured = false,
}: StorePhotoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/70 bg-muted/20 shadow-sm ring-1 ring-black/[0.04]",
        aspectClass[aspect],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover object-center",
          obscured && "scale-110 blur-2xl sm:blur-3xl",
        )}
        sizes={sizes}
        priority={priority}
      />
    </div>
  )
}

type StorePhotoRowProps = {
  images: readonly string[]
  className?: string
  aspect?: Aspect
  obscured?: boolean
}

/** 가로 2~3장 나란히 (모바일은 세로 스택) */
export function StorePhotoRow({ images, className, aspect = "landscape", obscured = false }: StorePhotoRowProps) {
  const colSizes =
    images.length >= 3 ? "(max-width: 640px) 100vw, 33vw" : "(max-width: 640px) 100vw, 50vw"
  return (
    <div
      className={cn(
        "grid gap-4 sm:gap-5",
        images.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
        className
      )}
    >
      {images.map((src, i) => (
        <StorePhoto
          key={`${src}-${i}`}
          src={src}
          aspect={aspect}
          sizes={colSizes}
          priority={i === 0}
          obscured={obscured}
        />
      ))}
    </div>
  )
}

type StoreGalleryBandProps = {
  title: string
  description?: string
  images: readonly string[]
  columns?: 2 | 3 | 4
  className?: string
}

/** 섹션 제목 + 그리드 갤러리 */
export function StoreGalleryBand({ title, description, images, columns = 3, className }: StoreGalleryBandProps) {
  const colCls = columns === 4 ? "md:grid-cols-4" : columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"
  return (
    <RevealSection className={cn("py-16 md:py-20 bg-background", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{title}</h2>
          {description ? <p className="text-muted-foreground">{description}</p> : null}
        </div>
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5", colCls)}>
          {images.map((src, i) => (
            <StorePhoto key={`${src}-${i}`} src={src} aspect="video" sizes="(max-width: 768px) 100vw, 25vw" />
          ))}
        </div>
      </div>
    </RevealSection>
  )
}
