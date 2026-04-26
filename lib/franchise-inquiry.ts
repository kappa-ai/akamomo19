import { z } from "zod"

export const inquirySubmitSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해 주세요.").max(100),
  phone: z.string().trim().min(1, "연락처를 입력해 주세요.").max(40),
  region: z.string().trim().max(50).optional(),
  timing: z.string().trim().max(50).optional(),
  message: z.string().trim().max(8000).optional().default(""),
})

export const inquiryBoardCommentSchema = z.object({
  body: z.string().trim().min(1).max(8000),
})

export type FranchiseInquiryRow = {
  id: string
  name: string
  phone: string
  region: string | null
  timing: string | null
  message: string | null
  created_at: string
  updated_at: string
}

export type FranchiseInquiryMessageRow = {
  id: string
  inquiry_id: string
  body: string
  is_staff: boolean
  created_at: string
}
