'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useScrollStore } from '@/lib/scrollStore'
import SplashSection from '@/components/layout/SplashSection'
import JarvisHUD from '@/components/layout/JarvisHUD'
import FakeScroll from '@/components/effects/FakeScroll'

const ArcReactor = dynamic(() => import('@/components/reactor/ArcReactor'), { ssr: false, loading: () => null })

export default function Page() {
  const progress = useScrollStore((s) => s.progress)
  const [bootComplete, setBootComplete] = useState(false)
  const [spinningUp, setSpinningUp] = useState(false)
  const spinFiredRef = useRef(false)
  const spinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // One-shot spin-up on first scroll — timer in ref so progress changes don't cancel it
  useEffect(() => {
    if (spinFiredRef.current || progress <= 0.1) return
    spinFiredRef.current = true
    setSpinningUp(true)
    spinTimerRef.current = setTimeout(() => setSpinningUp(false), 1200)
  }, [progress])
  useEffect(() => () => { if (spinTimerRef.current) clearTimeout(spinTimerRef.current) }, [])

  const handleBootComplete = useCallback(() => setBootComplete(true), [])

  // Clamp to [0,1] — guards against any floating point edge cases
  const p = Math.max(0, Math.min(1, progress))

  // Single reactor: interpolates from full viewport (p=0) to HUD center column (p=1)
  // HUD center column: left=280px, right=300px, top=52px, height≈58vh-130px
  const reactorStyle: React.CSSProperties = {
    position: 'fixed',
    left:   `${280 * p}px`,
    right:  `${300 * p}px`,
    top:    `${52  * p}px`,
    height: `calc(${100 - 42 * p}vh - ${130 * p}px)`,
    zIndex: 10,
    pointerEvents: p >= 0.8 ? 'auto' : 'none',
  }

  return (
    <>
      <FakeScroll disabled={!bootComplete} />

      {/* z:10 — single reactor, always visible, scales from splash→HUD position */}
      <div style={reactorStyle}>
        <ArcReactor activated={p >= 0.8} spinningUp={spinningUp} />
      </div>

      {/* z:1 — splash content (labels, boot, indicator), fades out by p=0.5 */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        opacity: Math.max(0, 1 - p * 2),
        pointerEvents: p > 0.4 ? 'none' : 'auto',
        zIndex: 1,
      }}>
        <SplashSection onBootComplete={handleBootComplete} />
      </div>

      {/* z:2 — HUD panels fade in around the reactor as it lands */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        opacity: p > 0.3 ? (p - 0.3) / 0.7 : 0,
        pointerEvents: p < 0.5 ? 'none' : 'auto',
        contain: 'strict',
        zIndex: 2,
      }}>
        <JarvisHUD skipBoot />
      </div>
    </>
  )
}
