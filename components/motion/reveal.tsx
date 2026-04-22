"use client"

import { m, useReducedMotion } from "framer-motion"
import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

export type RevealSectionProps = ComponentPropsWithoutRef<"section"> & {
  /** enter: 첫 화면 히어로용(마운트 시 1회). scroll: 뷰포트 진입 시(기본). */
  mode?: "scroll" | "enter"
}

const ease = [0.22, 1, 0.36, 1] as const

/** 스크롤 모드: translate 없이 opacity만으로 레이어·합성 부담 최소화 */
const scrollViewport = { once: true, amount: 0.1, margin: "0px 0px -6% 0px" } as const

export function RevealSection({ className, children, mode = "scroll", ...rest }: RevealSectionProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <section className={className} {...rest}>
        {children}
      </section>
    )
  }

  if (mode === "enter") {
    return (
      <m.section
        className={cn("transform-gpu", className)}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, ease }}
        {...rest}
      >
        {children}
      </m.section>
    )
  }

  return (
    <m.section
      className={cn("transform-gpu", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={scrollViewport}
      transition={{ duration: 0.8, ease }}
      {...rest}
    >
      {children}
    </m.section>
  )
}
