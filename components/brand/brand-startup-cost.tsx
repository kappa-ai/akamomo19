import Image from "next/image"
import Link from "next/link"
import { RevealSection } from "@/components/motion/reveal"

export function BrandStartupCost() {
  return (
    <RevealSection className="break-keep bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-balance text-center text-3xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          나만의 성인용품샵,
          <br />
          <span className="text-primary">3,500만원</span>으로 창업비용 모두 해결!
        </h2>

        <div className="mx-auto mt-10 max-w-5xl md:mt-14">
          <Image
            src="/images/brand/storefront.webp"
            alt="핑크색 차양과 민트색 문이 있는 밝은 분위기의 아카모모 매장 외관"
            width={1850}
            height={1050}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="h-auto w-full"
          />
        </div>

        <p className="mt-10 text-center text-lg font-semibold text-foreground md:mt-14 md:text-2xl">
          ※ 자세한 창업 비용은{" "}
          <Link
            href="/startup"
            className="text-[#6db3a3] underline-offset-4 transition-colors hover:text-[#4f9a89] hover:underline"
          >
            [가맹비용]
          </Link>{" "}
          메뉴에서 확인하세요.
        </p>
      </div>
    </RevealSection>
  )
}
