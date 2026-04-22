"use client"

import { LazyMotion, domAnimation } from "framer-motion"

/** domAnimation 번들만 로드해 메인 스레드·번들 비용을 줄입니다. */
export function MotionProviders({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
