'use client'
import { useEffect } from 'react'
import SplashSection from '@/components/layout/SplashSection'
import JarvisHUD from '@/components/layout/JarvisHUD'

export default function Page() {
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Force scroll to top — use sessionStorage to ensure this
    // runs before the browser can restore a stored scroll position
    const key = 'jarvis-scroll-reset'
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1')
      window.scrollTo(0, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <main style={{ margin: 0, padding: 0 }}>
      {/* Splash — full-screen arc reactor */}
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <SplashSection />
      </div>

      {/* HUD — contained so its fixed/absolute overlays cannot bleed
          into the splash above. transform-gpu on JarvisHUD's root makes
          it the containing block for fixed descendants; overflow:hidden
          here clips them to this 100vh section. */}
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          isolation: 'isolate',
        }}
      >
        <JarvisHUD skipBoot />
      </div>
    </main>
  )
}
