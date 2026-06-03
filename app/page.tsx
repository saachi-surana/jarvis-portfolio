'use client'
import { useScrollStore } from '@/lib/scrollStore'
import SplashSection from '@/components/layout/SplashSection'
import JarvisHUD from '@/components/layout/JarvisHUD'
import FakeScroll from '@/components/effects/FakeScroll'

export default function Page() {
  const progress = useScrollStore((s) => s.progress)

  const splashOpacity = progress < 0.5 ? 1 : 1 - (progress - 0.5) * 2
  const hudOpacity = progress > 0.3 ? (progress - 0.3) / 0.7 : 0

  return (
    <>
      <FakeScroll />
      <div
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          opacity: splashOpacity,
          transform: `translateY(-${progress * 100}vh)`,
          pointerEvents: progress > 0.8 ? 'none' : 'auto',
        }}
      >
        <SplashSection />
      </div>
      <div
        style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          opacity: hudOpacity,
          transform: `translateY(${(1 - progress) * 100}vh)`,
          pointerEvents: progress < 0.5 ? 'none' : 'auto',
          contain: 'strict',
        }}
      >
        <JarvisHUD skipBoot />
      </div>
    </>
  )
}
