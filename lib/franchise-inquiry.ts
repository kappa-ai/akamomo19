import { z } from "zod"

export const inquirySubmitSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해 주세요.").max(100),
  phone: z.string().trim().min(1, "연락처를 입력해 주세요.").max(40),
  region: z.string().trim().max(50).optional(),
  timing: z.string().trim().max(50).optional(),
  message: z.string().trim().max(8000).optional().default(""),
})

/** 온라인 상담 신청 API — 비밀글·비밀번호는 여기서만 설정 */
export const inquiryOnlineApplySchema = inquirySubmitSchema
  .extend({
    is_secret: z.boolean().optional().default(false),
    password: z.string().max(200).optional().nullable(),
    password_confirm: z.string().max(200).optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.is_secret) return
    const pw = data.password?.trim() ?? ""
    if (pw.length < 4) {
      ctx.addIssue({ code: "custom", message: "비밀글은 4자 이상 비밀번호가 필요합니다.", path: ["password"] })
    }
    const c = data.password_confirm?.trim() ?? ""
    if (pw !== c) {
      ctx.addIssue({ code: "custom", message: "비밀번호가 일치하지 않습니다.", path: ["password_confirm"] })
    }
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
  /** DB `008` 적용 후 항상 내려옵니다. */
  is_secret?: boolean
  created_at: string
  updated_at: string
}

export function formatFranchiseInquiryBody(
  row: Pick<FranchiseInquiryRow, "region" | "timing" | "message">
): string {
  const bits: string[] = []
  if (row.region?.trim()) bits.push(`희망 지역: ${row.region}`)
  if (row.timing?.trim()) bits.push(`가맹 예정 시기: ${row.timing}`)
  if (row.message?.trim()) bits.push(row.message)
  return bits.join("\n\n") || "—"
}

export type FranchiseInquiryMessageRow = {
  id: string
  inquiry_id: string
  body: string
  is_staff: boolean
  created_at: string
}
