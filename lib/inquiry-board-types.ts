export type InquiryBoardPostRow = {
  id: string
  title: string
  body: string
  is_secret: boolean
  password_hash: string | null
  author_name: string
  phone: string | null
  created_at: string
}

export type InquiryBoardCommentRow = {
  id: string
  post_id: string
  body: string
  author_name: string
  is_staff: boolean
  created_at: string
}

export type InquiryBoardPostPublic = Omit<InquiryBoardPostRow, "password_hash"> & {
  body_revealed: boolean
  comments?: InquiryBoardCommentPublic[]
}

export type InquiryBoardCommentPublic = Omit<InquiryBoardCommentRow, "is_staff"> & {
  is_staff: boolean
}
