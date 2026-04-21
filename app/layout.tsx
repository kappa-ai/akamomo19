import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-kr'
});

const SITE_URL = 'https://app.akamomopartners.com'

const title =
  '아카모모 파트너스 | 초기비용 부담 없는 무인 성인용품 창업'

const description = `무인 성인용품 창업을 고민 중이신가요?
아카모모 파트너스에서 소자본으로 시작 가능한 무인 매장 창업을 안내드립니다.
창업 상담 및 파트너 문의를 지금 바로 확인해보세요.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: '아카모모 파트너스',
    type: 'website',
    images: [{ url: '/og-image.png' }],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
