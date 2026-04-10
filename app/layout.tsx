import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansKR = Noto_Sans_KR({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-kr'
});

export const metadata: Metadata = {
  title: '아카모모 | 무인 성인용품 프랜차이즈',
  description: '아카모모는 누구나 부담 없이 성인용품을 경험할 수 있도록 만든 라이프스타일 브랜드입니다. 밝고 친근한 공간에서 새로운 창업의 기회를 만나보세요.',
  generator: 'v0.app',
  keywords: ['아카모모', '성인용품', '무인매장', '프랜차이즈', '창업', '부업'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
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
