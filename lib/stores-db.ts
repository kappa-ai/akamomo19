export type StoreRow = {
  id: string
  name: string
  address: string
  phone: string
  hours: string
  status: string
  image_url: string | null
  sort_order: number
}

export type UpcomingStoreRow = {
  id: string
  name: string
  region: string
  status: string
  image_url: string | null
  sort_order: number
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.length &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length
  )
}
