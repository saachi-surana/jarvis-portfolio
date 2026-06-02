'use client'
import { useEffect } from 'react'
import SplashSection from '@/components/layout/SplashSection'
import JarvisHUD from '@/components/layout/JarvisHUD'

export default function Page() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main style={{ margin: 0, padding: 0 }}>
      <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <SplashSection />
      </div>
      <div style={{ height: '100vh', overflow: 'hidden', position: 'relative', contain: 'strict' }}>
        <JarvisHUD skipBoot />
      </div>
    </main>
  )
}
