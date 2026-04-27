"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/stores-db"

const staffCommentSchema = z.object({
  postId: z.string().uuid(),
  body: z.string().trim().min(1).max(5000),
})

export type AddStaffCommentState = { ok: true } | { ok: false; message: string }

export async function addInquiryBoardStaffComment(_prev: AddStaffCommentState, formData: FormData): Promise<AddStaffCommentState> {
  if (!isSupabaseConfigured()) {
    return { ok: false, message: "Supabase 가 설정되지 않았습니다." }
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const parsed = staffCommentSchema.safeParse({
    postId: formData.get("postId"),
    body: formData.get("body"),
  })
  if (!parsed.success) {
    return { ok: false, message: "입력값을 확인해 주세요." }
  }

  const { error } = await supabase.from("inquiry_board_comments").insert({
    post_id: parsed.data.postId,
    body: parsed.data.body,
    author_name: "Akamomo",
    is_staff: true,
  })

  if (error) {
    return { ok: false, message: "댓글 저장에 실패했습니다." }
  }

  revalidatePath("/admin/inquiry-board")
  revalidatePath("/inquiry/board")
  revalidatePath(`/inquiry/board/${parsed.data.postId}`)
  return { ok: true }
}
