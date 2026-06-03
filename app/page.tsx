'use client'
import dynamic from 'next/dynamic'
import { useScrollStore } from '@/lib/scrollStore'
import SplashSection from '@/components/layout/SplashSection'
import JarvisHUD from '@/components/layout/JarvisHUD'
import FakeScroll from '@/components/effects/FakeScroll'

// Permanent fullScreen reactor — must never be unmounted or opacity:0
const ArcReactor = dynamic(() => import('@/components/reactor/ArcReactor'), { ssr: false, loading: () => null })

export default function Page() {
  const progress = useScrollStore((s) => s.progress)

  const splashOpacity = progress < 0.5 ? 1 : 1 - (progress - 0.5) * 2
  const hudOpacity = progress > 0.3 ? (progress - 0.3) / 0.7 : 0

  return (
    <>
      <FakeScroll />

      {/* z:0 — fullScreen reactor, always mounted and rendering, never gets opacity:0 */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <ArcReactor fullScreen />
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
