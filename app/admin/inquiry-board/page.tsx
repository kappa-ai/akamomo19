import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { InquiryBoardStaffReply } from "@/components/admin/inquiry-board-staff-reply"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { isSupabaseConfigured } from "@/lib/stores-db"
import { redirect } from "next/navigation"
import type { InquiryBoardCommentRow } from "@/lib/inquiry-board-types"

export const dynamic = "force-dynamic"

type PostWithComments = {
  id: string
  title: string
  body: string
  is_secret: boolean
  author_name: string
  phone: string | null
  created_at: string
  inquiry_board_comments: InquiryBoardCommentRow[] | null
}

function CommentBubble({ c }: { c: InquiryBoardCommentRow }) {
  if (c.is_staff) {
    return (
      <div className="rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-peach-lighter/40 px-4 py-3">
        <p className="text-sm font-bold text-primary">Akamomo</p>
        <p className="mt-2 whitespace-pre-wrap text-sm font-medium text-foreground">{c.body}</p>
        <p className="mt-2 text-xs text-muted-foreground">
          {format(new Date(c.created_at), "yyyy.MM.dd HH:mm", { locale: ko })}
        </p>
      </div>
    )
  }
  return (
    <div className="rounded-xl border border-border bg-background px-4 py-3">
      <p className="text-sm font-medium text-foreground">{c.author_name}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{c.body}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        {format(new Date(c.created_at), "yyyy.MM.dd HH:mm", { locale: ko })}
      </p>
    </div>
  )
}

export default async function AdminInquiryBoardPage() {
  if (!isSupabaseConfigured()) redirect("/admin/login")

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: raw, error } = await supabase
    .from("inquiry_board_posts")
    .select(
      `
      id,
      title,
      body,
      is_secret,
      author_name,
      phone,
      created_at,
      inquiry_board_comments (
        id,
        post_id,
        body,
        author_name,
        is_staff,
        created_at
      )
    `
    )
    .order("created_at", { ascending: false })
    .order("created_at", { ascending: true, foreignTable: "inquiry_board_comments" })

  if (error) {
    return (
      <p className="text-sm text-destructive">
        글을 불러오지 못했습니다. Supabase에 `006_inquiry_board` 마이그레이션을 적용했는지 확인해 주세요.
      </p>
    )
  }

  const posts = (raw ?? []) as PostWithComments[]

  if (posts.length === 0) {
    return <p className="text-sm text-muted-foreground">등록된 문의가 없습니다.</p>
  }

  return (
    <div className="space-y-10">
      {posts.map((post) => {
        const comments = (post.inquiry_board_comments ?? []).slice().sort((a, b) => {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        })
        return (
          <article key={post.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-foreground">{post.title}</h2>
              {post.is_secret ? (
                <Badge variant="secondary" className="shrink-0">
                  비밀글
                </Badge>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {post.author_name}
              {post.phone ? ` · ${post.phone}` : ""} ·{" "}
              {format(new Date(post.created_at), "yyyy.MM.dd HH:mm", { locale: ko })}
            </p>
            <div className="mt-4 whitespace-pre-wrap rounded-xl bg-muted/40 p-4 text-sm text-foreground">{post.body}</div>

            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-foreground">댓글</h3>
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground">댓글이 없습니다.</p>
              ) : (
                <ul className="space-y-3">
                  {comments.map((c) => (
                    <li key={c.id}>
                      <CommentBubble c={c} />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <InquiryBoardStaffReply postId={post.id} />
          </article>
        )
      })}
    </div>
  )
}
