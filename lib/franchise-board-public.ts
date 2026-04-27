export type FranchiseBoardPublicComment = {
  id: string
  body: string
  author_name: string
  is_staff: boolean
  created_at: string
}

export type FranchiseBoardPublicPost = {
  id: string
  title: string
  body: string | null
  is_secret: boolean
  author_name: string
  phone: string | null
  created_at: string
  body_revealed: boolean
  comments: FranchiseBoardPublicComment[]
}
