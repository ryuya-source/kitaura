"use client"

import { useEffect, useRef } from "react"

/** HERO高さ（画面の90%） */
const HERO_RATIO = 0.9
/** この回数だけスクロールしても画面を動かさない */
const LOCK_COUNT = 10

export function HeroScrollLock() {
  const count = useRef(0)
  const touchCounted = useRef(false)

  useEffect(() => {
    const threshold = () => HERO_RATIO * window.innerHeight

    function shouldLock() {
      if (window.scrollY >= threshold()) return false
      return count.current < LOCK_COUNT
    }

    function handleScroll() {
      if (window.scrollY >= threshold()) count.current = 0
    }

    function handleWheel(e: WheelEvent) {
      if (!shouldLock()) return
      e.preventDefault()
      count.current += 1
    }

    function handleTouchStart() {
      touchCounted.current = false
    }

    function handleTouchMove(e: TouchEvent) {
      if (!shouldLock()) return
      e.preventDefault()
      if (!touchCounted.current) {
        touchCounted.current = true
        count.current += 1
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return null
}
