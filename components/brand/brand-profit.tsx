import Image from "next/image"
import { RevealSection } from "@/components/motion/reveal"

const rows = [
  { item: "매출액", amount: "6,000,000원", ratio: "100%" },
  { item: "상품 매입 원가", amount: "2,100,000원", ratio: "35%" },
  { item: "상가 월세", amount: "1,000,000원", ratio: "16.7%" },
  { item: "전기 요금", amount: "120,000원", ratio: "2%" },
  { item: "인터넷 요금", amount: "30,000원", ratio: "0.5%" },
]

export function BrandProfit() {
  return (
    <RevealSection className="break-keep bg-background py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
          <div className="pb-2">
            <h2 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">
              관리 부담은 줄이고,
              <br />
              월 예상 순이익 <span className="whitespace-nowrap text-primary">약 270만원</span>
            </h2>
            <p className="mt-4 text-lg text-foreground md:text-2xl">월매출 600만원 기준 예상 수익표</p>
          </div>
          <Image
            src="/images/brand/owner-tablet.webp"
            alt="매장에서 태블릿으로 재고를 확인하는 점주"
            width={704}
            height={598}
            sizes="(min-width: 768px) 320px, 70vw"
            className="mx-auto h-auto w-2/3 max-w-xs md:w-80"
          />
        </div>

        <div className="overflow-hidden rounded-2xl border border-peach-light bg-white">
          <table className="w-full border-collapse text-center text-sm md:text-lg">
            <thead className="bg-peach-lighter">
              <tr>
                <th scope="col" className="border-b border-peach-light px-2 py-3 font-semibold text-foreground md:py-4">
                  항목
                </th>
                <th
                  scope="col"
                  className="border-b border-l border-peach-light px-2 py-3 font-semibold text-foreground md:py-4"
                >
                  금액
                </th>
                <th
                  scope="col"
                  className="border-b border-l border-peach-light px-2 py-3 font-semibold text-foreground md:py-4"
                >
                  비율
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.item} className="border-b border-peach-light">
                  <th scope="row" className="px-2 py-3 font-normal text-foreground md:py-4">
                    {row.item}
                  </th>
                  <td className="border-l border-peach-light px-2 py-3 tabular-nums text-foreground md:py-4">
                    {row.amount}
                  </td>
                  <td className="border-l border-peach-light px-2 py-3 tabular-nums text-foreground md:py-4">
                    {row.ratio}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-peach-lighter">
              <tr>
                <th scope="row" className="px-2 py-4 text-base font-bold text-foreground md:py-5 md:text-2xl">
                  예상 순이익
                </th>
                <td className="border-l border-peach-light px-2 py-4 text-base font-bold tabular-nums text-coral md:py-5 md:text-2xl">
                  2,750,000원
                </td>
                <td className="border-l border-peach-light px-2 py-4 text-base font-bold tabular-nums text-coral md:py-5 md:text-2xl">
                  45.8%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="mt-4 text-sm text-muted-foreground md:text-base">
          월매출 6,000,000원일 경우, 간이과세자 요건을 충족하여 부가세 부담도 줄일 수 있습니다.
        </p>
      </div>
    </RevealSection>
  )
}
