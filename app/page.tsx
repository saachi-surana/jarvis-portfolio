'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useScrollStore } from '@/lib/scrollStore'
import SplashSection from '@/components/layout/SplashSection'
import JarvisHUD from '@/components/layout/JarvisHUD'
import FakeScroll from '@/components/effects/FakeScroll'
import BootSequence from '@/components/effects/BootSequence'

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

  const handleBootComplete = useCallback(() => {
    console.log('[boot] page.handleBootComplete → setBootComplete(true), FakeScroll enabling')
    setBootComplete(true)
  }, [])

  // Viewport size — stateful so SSR (1440×900) and first client render match (no hydration
  // mismatch), then resolves to real dimensions after mount and stays in sync on resize.
  const [vp, setVp] = useState({ w: 1440, h: 900 })
  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Clamp to [0,1] — guards against any floating point edge cases
  const p = Math.max(0, Math.min(1, progress))

  // Single reactor: full viewport (p=0) → HUD center column (p=1).
  // Targets calibrated to the HUD reference screenshot: left 240, top 45, 950×370.
  const targetW = 950
  const targetH = 370
  const targetL = 240
  const targetT = 45
  const reactorStyle: React.CSSProperties = {
    position: 'fixed',
    left:   `${targetL * p}px`,
    top:    `${targetT * p}px`,
    width:  `${vp.w - (vp.w - targetW) * p}px`,
    height: `${vp.h - (vp.h - targetH) * p}px`,
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

      {/* z:1 — splash content (labels, indicator), fades out by p=0.5 */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        opacity: Math.max(0, 1 - p * 2),
        pointerEvents: p > 0.4 ? 'none' : 'auto',
        zIndex: 1,
      }}>
        <SplashSection />
      </div>

      {/* z:100 — boot overlay, above reactor (z:10) so canvas never covers the sequence */}
      {!bootComplete && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
          <BootSequence onComplete={handleBootComplete} />
        </div>
      )}

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
