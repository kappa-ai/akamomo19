import { createServerSupabaseClient } from "@/lib/supabase/server"
import type { StoreRow, UpcomingStoreRow } from "@/lib/stores-db"
import { isSupabaseConfigured } from "@/lib/stores-db"

/** Supabase 미연동·오류 시 매장 안내 페이지에 쓰는 데모 데이터 */
export const DEMO_OPERATING_STORES: Omit<StoreRow, "id">[] = [
  {
    name: "아카모모 강남점",
    address: "서울특별시 강남구 강남대로 123",
    phone: "02-1234-5678",
    hours: "24시간 운영",
    status: "운영중",
    image_url: null,
    sort_order: 0,
  },
  {
    name: "아카모모 홍대점",
    address: "서울특별시 마포구 홍익로 45",
    phone: "02-2345-6789",
    hours: "24시간 운영",
    status: "운영중",
    image_url: null,
    sort_order: 1,
  },
  {
    name: "아카모모 부산점",
    address: "부산광역시 해운대구 해운대로 678",
    phone: "051-3456-7890",
    hours: "24시간 운영",
    status: "운영중",
    image_url: null,
    sort_order: 2,
  },
]

export const DEMO_UPCOMING_STORES: Omit<UpcomingStoreRow, "id">[] = [
  { name: "아카모모 대구점", region: "대구광역시", status: "2024년 4월 오픈 예정", image_url: null, sort_order: 0 },
  { name: "아카모모 인천점", region: "인천광역시", status: "2024년 5월 오픈 예정", image_url: null, sort_order: 1 },
  { name: "아카모모 대전점", region: "대전광역시", status: "2024년 6월 오픈 예정", image_url: null, sort_order: 2 },
]

export type StoresPublicResult = {
  operating: StoreRow[]
  upcoming: UpcomingStoreRow[]
  source: "supabase" | "demo"
}

function demoAsRows(): StoresPublicResult {
  const operating: StoreRow[] = DEMO_OPERATING_STORES.map((s, i) => ({
    ...s,
    id: `demo-op-${i}`,
  }))
  const upcoming: UpcomingStoreRow[] = DEMO_UPCOMING_STORES.map((s, i) => ({
    ...s,
    id: `demo-up-${i}`,
  }))
  return { operating, upcoming, source: "demo" }
}

export async function getStoresPublic(): Promise<StoresPublicResult> {
  if (!isSupabaseConfigured()) {
    return demoAsRows()
  }

  try {
    const supabase = await createServerSupabaseClient()
    const [opRes, upRes] = await Promise.all([
      supabase.from("stores").select("*").order("sort_order", { ascending: true }),
      supabase.from("upcoming_stores").select("*").order("sort_order", { ascending: true }),
    ])

    if (opRes.error || upRes.error) {
      return demoAsRows()
    }

    return {
      operating: (opRes.data ?? []) as StoreRow[],
      upcoming: (upRes.data ?? []) as UpcomingStoreRow[],
      source: "supabase",
    }
  } catch {
    return demoAsRows()
  }
}
