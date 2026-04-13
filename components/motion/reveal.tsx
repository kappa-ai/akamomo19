"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ComponentPropsWithoutRef } from "react"

export type RevealSectionProps = ComponentPropsWithoutRef<"section"> & {
  /** enter: 첫 화면 히어로용(마운트 시 1회). scroll: 뷰포트 진입 시(기본). */
  mode?: "scroll" | "enter"
}

const ease = [0.22, 1, 0.36, 1] as const

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
      <motion.section
        className={className}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease }}
        {...rest}
      >
        {children}
      </motion.section>
    )
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.06, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.72, ease }}
      {...rest}
    >
      {children}
    </motion.section>
  )
}
