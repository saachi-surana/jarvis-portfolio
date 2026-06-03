'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useScrollStore } from '@/lib/scrollStore'
import SplashSection from '@/components/layout/SplashSection'
import JarvisHUD from '@/components/layout/JarvisHUD'
import FakeScroll from '@/components/effects/FakeScroll'

// Permanent fullScreen reactor — must never be unmounted or opacity:0
const ArcReactor = dynamic(() => import('@/components/reactor/ArcReactor'), { ssr: false, loading: () => null })

export default function Page() {
  const progress = useScrollStore((s) => s.progress)
  const [spinningUp, setSpinningUp] = useState(false)
  const spinFiredRef = useRef(false)
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // One-shot spin-up: fires the first time progress crosses 0.1, never again
  // Timer stored in ref so progress changes don't cancel it via cleanup
  useEffect(() => {
    if (spinFiredRef.current || progress <= 0.1) return
    spinFiredRef.current = true
    setSpinningUp(true)
    spinTimerRef.current = setTimeout(() => setSpinningUp(false), 1200)
  }, [progress])

  // Clean up timer only on unmount
  useEffect(() => () => { if (spinTimerRef.current) clearTimeout(spinTimerRef.current) }, [])

  const splashOpacity = progress < 0.5 ? 1 : 1 - (progress - 0.5) * 2
  const hudOpacity = progress > 0.3 ? (progress - 0.3) / 0.7 : 0

  // Fly-in: progress 0.8→1.0 — reactor scales down and drifts toward HUD center column
  const flyT = progress > 0.8 ? (progress - 0.8) / 0.2 : 0
  const reactorTransform = `scale(${1 - flyT * 0.7}) translateY(-${flyT * 15}vh)`

  return (
    <>
      <FakeScroll />

      {/* z:0 — fullScreen reactor, always mounted and rendering, never gets opacity:0 */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 0, pointerEvents: 'none',
        transform: reactorTransform,
        transformOrigin: 'center center',
      }}>
        <ArcReactor fullScreen spinningUp={spinningUp} />
      </div>

      {/* z:1 — splash overlay (labels, boot, indicator) — slides up as HUD comes in */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          opacity: splashOpacity,
          transform: `translateY(-${progress * 100}vh)`,
          pointerEvents: progress > 0.8 ? 'none' : 'auto',
          zIndex: 1,
        }}
      >
        <SplashSection />
      </div>

      {/* z:2 — HUD, slides up from below; contain:strict clips all fixed children to this layer */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          opacity: hudOpacity,
          transform: `translateY(${(1 - progress) * 100}vh)`,
          pointerEvents: progress < 0.5 ? 'none' : 'auto',
          contain: 'strict',
          zIndex: 2,
        }}
      >
        <JarvisHUD skipBoot />
      </div>
    </>
  )
}
