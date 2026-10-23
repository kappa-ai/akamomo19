import Image from "next/image"
import { RevealSection } from "@/components/motion/reveal"

type Task = { label: string; time: string }

const routine: { day: string; tasks: Task[]; note?: string }[] = [
  { day: "일", tasks: [] },
  { day: "월", tasks: [{ label: "발주", time: "30분" }], note: "집에서도 OK" },
  {
    day: "화",
    tasks: [
      { label: "상품 정리", time: "30분" },
      { label: "매장 청소", time: "30분" },
    ],
  },
  { day: "수", tasks: [] },
  { day: "목", tasks: [{ label: "발주", time: "30분" }], note: "집에서도 OK" },
  {
    day: "금",
    tasks: [
      { label: "상품 정리", time: "30분" },
      { label: "매장 청소", time: "30분" },
    ],
  },
  { day: "토", tasks: [] },
]

function DayTasks({ tasks, note }: { tasks: Task[]; note?: string }) {
  if (tasks.length === 0) {
    return <span className="text-muted-foreground">—</span>
  }
  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <p key={task.label} className="font-semibold text-foreground">
          {task.label} <span className="text-primary">{task.time}</span>
        </p>
      ))}
      {note && <p className="text-muted-foreground">{note}</p>}
    </div>
  )
}

export function BrandWeeklyRoutine() {
  return (
    <RevealSection className="break-keep bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
          본업은 그대로,
          <br />
          매장 관리는 <span className="whitespace-nowrap text-primary">주 3시간</span>
        </h2>

        <div className="mx-auto mt-12 max-w-5xl md:mt-16">
          <p className="mb-4 text-center text-lg text-foreground md:text-2xl">일상에 부담을 덜어주는 아카모모 운영 루틴</p>

          {/* 데스크톱: 요일별 7칸 표 */}
          <table className="hidden w-full table-fixed border-collapse text-center md:table">
            <thead>
              <tr>
                {routine.map(({ day }) => (
                  <th
                    key={day}
                    scope="col"
                    className="border border-peach-light bg-peach-lighter py-3 text-lg font-semibold text-foreground"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {routine.map(({ day, tasks, note }) => (
                  <td key={day} className="h-32 border border-peach-light bg-white px-2 align-middle text-base">
                    <DayTasks tasks={tasks} note={note} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          {/* 모바일: 요일별 세로 목록 */}
          <dl className="overflow-hidden rounded-2xl border border-peach-light bg-white md:hidden">
            {routine.map(({ day, tasks, note }) => (
              <div key={day} className="grid grid-cols-[3.5rem_1fr] border-b border-peach-light last:border-b-0">
                <dt className="flex items-center justify-center bg-peach-lighter font-semibold text-foreground">{day}</dt>
                <dd className="px-4 py-3 text-sm">
                  <DayTasks tasks={tasks} note={note} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl items-center gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
          <Image
            src="/images/brand/owner-laptop.webp"
            alt="집에서 노트북으로 매장을 관리하는 점주"
            width={920}
            height={500}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-auto w-full"
          />
          <div className="border-l-2 border-primary pl-6 md:pl-8">
            <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">운영은 간결하게, 지원은 든든하게</h3>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              아카모모는 점주님이 매장에 쓰는
              <br />
              시간을 오히려 <span className="font-semibold text-coral">줄이는 데</span> 집중하며,
              <br />
              이를 최대한 지원합니다.
            </p>
          </div>
        </div>
      </div>
    </RevealSection>
  )
}
