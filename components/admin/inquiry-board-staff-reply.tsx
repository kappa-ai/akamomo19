"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addInquiryBoardStaffComment, type AddStaffCommentState } from "@/app/admin/inquiry-board/actions"

const initial: AddStaffCommentState = { ok: false, message: "" }

export function InquiryBoardStaffReply({ postId }: { postId: string }) {
  const [state, formAction, pending] = useActionState(addInquiryBoardStaffComment, initial)

  return (
    <form action={formAction} className="mt-4 space-y-2 rounded-xl border border-border bg-muted/30 p-4">
      <input type="hidden" name="postId" value={postId} />
      <p className="text-xs font-medium text-muted-foreground">Akamomo 공식 답변 (작성자 표시: Akamomo)</p>
      <Textarea
        name="body"
        required
        minLength={1}
        placeholder="답변 내용을 입력하세요."
        className="min-h-24 rounded-xl"
        disabled={pending}
      />
      {state && !state.ok && state.message ? (
        <p className="text-sm text-destructive">{state.message}</p>
      ) : null}
      {state?.ok ? <p className="text-sm text-primary">저장되었습니다.</p> : null}
      <Button type="submit" size="sm" disabled={pending} className="rounded-full">
        공식 댓글 등록
      </Button>
    </form>
  )
}
