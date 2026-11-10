import Image from "next/image"
import { RevealSection } from "@/components/motion/reveal"

export function BrandLifestyle() {
  return (
    <RevealSection className="overflow-hidden bg-[#fdf6f8] py-20">
      <h2 className="sr-only">어두운 자판기형 매장을 벗어난 아카모모의 라이프스타일형 매장</h2>
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 sm:px-6 md:gap-16 lg:px-8">
        <Image
          src="/images/brand/vending-machine-store.webp"
          alt="똑같은 분위기, 똑같은 자판기, 똑같은 시스템. 성인용품점은 아직도 어두운 분위기와 자판기 방식? 기존의 틀에서 벗어나야 새로운 매출을 만들 수 있습니다."
          width={1894}
          height={1200}
          sizes="(min-width: 1024px) 976px, 100vw"
          className="h-auto w-full"
        />
        <Image
          src="/images/brand/lifestyle-store.webp"
          alt="구매를 넘어, 함께 즐기는 공간으로. 새로운 라이프스타일형 매장 시스템. 밝고 아기자기한 분위기, 고객이 직접 비교하고 구매하는 체험형 시스템, 커플의 데이트코스를 겨냥한 공간 구성."
          width={1206}
          height={1305}
          sizes="(min-width: 768px) 720px, 100vw"
          className="mx-auto h-auto w-full max-w-3xl"
        />
      </div>
    </RevealSection>
  )
}
