'use client'
import { useEffect, useRef } from 'react'
import { useScrollStore } from '@/lib/scrollStore'

export default function FakeScroll() {
  const { incrementProgress, decrementProgress } = useScrollStore()
  const displayRef = useRef(0)

  // rAF loop: lerp displayRef toward store target, write back to store.progress
  useEffect(() => {
    let rafId: number
    const loop = () => {
      const { target, _setDisplay } = useScrollStore.getState()
      const curr = displayRef.current
      const next = curr + (target - curr) * 0.08
      displayRef.current = Math.abs(next - target) < 0.0005 ? target : next
      _setDisplay(displayRef.current)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Wheel: prevent real scroll, drive target
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.deltaY > 0 ? incrementProgress() : decrementProgress()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [incrementProgress, decrementProgress])

  // Touch: intercept swipe gestures
  useEffect(() => {
    let startY = 0
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      const dy = startY - e.touches[0].clientY
      if (Math.abs(dy) > 3) {
        dy > 0 ? incrementProgress() : decrementProgress()
        startY = e.touches[0].clientY
      }
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [incrementProgress, decrementProgress])

  return null
}
