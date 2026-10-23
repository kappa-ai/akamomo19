import Image from "next/image"
import { RevealSection } from "@/components/motion/reveal"

export function BrandLifestyle() {
  return (
    <RevealSection className="overflow-hidden break-keep bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-base font-semibold text-foreground md:text-lg">자동차가 하늘을 나는 시대,</p>
        <h2 className="text-balance text-3xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          성인용품점은 아직도
          <br />
          <span className="text-primary">어두운 분위기</span>와{" "}
          <span className="whitespace-nowrap">
            <span className="text-primary">자판기</span> 방식?
          </span>
        </h2>
        <p className="mt-5 text-xl font-medium text-foreground md:text-2xl">성인용품점도 변해야 합니다.</p>
      </div>

      <div className="mx-auto mt-10 max-w-6xl md:mt-14">
        <Image
          src="/images/brand/before-after.webp"
          alt="어둡고 삭막한 자판기형 성인용품점과, 밝은 아카모모 매장에서 커플이 상품을 함께 고르는 모습 비교"
          width={1254}
          height={513}
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="h-auto w-full md:[mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
        />
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-4 text-center sm:px-6 md:mt-14 lg:px-8">
        <p className="text-2xl font-bold leading-snug text-foreground md:text-4xl">
          아카모모는 밝은 분위기에서
          <br />
          <span className="text-[#6db3a3]">직접 보고 체험하는</span>
          <br />
          <span className="text-primary">라이프스타일형</span> 매장입니다.
        </p>
      </div>
    </RevealSection>
  )
}
