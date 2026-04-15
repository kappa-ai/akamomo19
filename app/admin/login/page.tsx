"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { isSupabaseConfigured } from "@/lib/stores-db"

export default function AdminLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const err = searchParams.get("error")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)
    if (!isSupabaseConfigured()) {
      setMessage("Supabase 환경 변수가 없습니다. 배포 설정을 확인해 주세요.")
      return
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    setLoading(true)
    const supabase = createBrowserClient(url, key)
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    setLoading(false)
    if (error) {
      const code = "code" in error ? String((error as { code?: string }).code) : ""
      const invalidCreds =
        code === "invalid_credentials" || error.message === "Invalid login credentials"
      if (invalidCreds) {
        setMessage(
          "이메일·비밀번호를 확인하세요. Supabase Authentication → Add user(Auto Confirm)로 만든 계정인지, 그 UUID가 admin_users에 들어갔는지, 사이트의 Supabase URL이 그 프로젝트와 같은지 확인하세요."
        )
        return
      }
      if (
        code === "unexpected_failure" ||
        error.message.includes("Database error querying schema")
      ) {
        setMessage(
          "인증 오류입니다. Users에서 해당 사용자를 삭제한 뒤 Add user(Auto Confirm)로 다시 만들고, UUID를 admin_users에 넣는 방식이 가장 빠릅니다."
        )
        return
      }
      setMessage(error.message)
      return
    }
    router.push("/admin/stores")
    router.refresh()
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
        <p className="text-center text-muted-foreground">
          <code className="text-sm">NEXT_PUBLIC_SUPABASE_URL</code> 와{" "}
          <code className="text-sm">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> 를 설정한 뒤 다시 시도해 주세요.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
      <h1 className="mb-2 text-2xl font-bold text-foreground">관리자 로그인</h1>
      <p className="mb-6 text-sm text-muted-foreground">등록된 이메일과 비밀번호로 로그인해 주세요.</p>
      {err && (
        <p className="mb-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          로그인에 실패했습니다. 다시 시도해 주세요.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="rounded-xl"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl"
          />
        </div>
        {message && <p className="text-sm text-destructive">{message}</p>}
        <Button type="submit" className="w-full rounded-full bg-primary hover:bg-coral" disabled={loading}>
          {loading ? "로그인 중…" : "로그인"}
        </Button>
      </form>
      <Button asChild variant="ghost" className="mt-8">
        <Link href="/">홈으로</Link>
      </Button>
    </div>
  )
}
