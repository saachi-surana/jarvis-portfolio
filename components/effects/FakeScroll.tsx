'use client'
import { useEffect, useRef } from 'react'
import { useScrollStore } from '@/lib/scrollStore'

interface FakeScrollProps {
  disabled?: boolean  // true during boot — swallows scroll/touch but never changes progress
}

export default function FakeScroll({ disabled = false }: FakeScrollProps) {
  const { incrementProgress, decrementProgress, setProgress } = useScrollStore()
  const displayRef  = useRef(0)
  const disabledRef = useRef(disabled)
  useEffect(() => { disabledRef.current = disabled }, [disabled])

  // rAF loop: lerp displayRef toward store target, write back to store.progress
  // 0.15 speed when snapping to 0/1, 0.12 otherwise
  useEffect(() => {
    let rafId: number
    const loop = () => {
      const { target, _setDisplay } = useScrollStore.getState()
      const curr = displayRef.current
      const isSnapping = target === 0 || target === 1
      const speed = isSnapping ? 0.15 : 0.12
      const next = curr + (target - curr) * speed
      displayRef.current = Math.abs(next - target) < 0.0005 ? target : next
      _setDisplay(displayRef.current)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Wheel: always preventDefault (prevents real scroll), only drive progress when active
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (disabledRef.current) return
      e.deltaY > 0 ? incrementProgress() : decrementProgress()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [incrementProgress, decrementProgress])

  // Touch: binary swipe — only active after boot
  useEffect(() => {
    let startY = 0
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY }
    const onTouchMove  = (e: TouchEvent) => { e.preventDefault() }
    const onTouchEnd   = (e: TouchEvent) => {
      if (disabledRef.current) return
      const dy = startY - e.changedTouches[0].clientY
      if (dy > 50) setProgress(1)
      else if (dy < -50) setProgress(0)
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove',  onTouchMove,  { passive: false })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [setProgress])

  return null
}
