'use client'
import { useEffect } from 'react'
import SplashSection from '@/components/layout/SplashSection'
import JarvisHUD from '@/components/layout/JarvisHUD'

export default function Page() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    document.documentElement.style.overflow = 'hidden'
    
    // Re-enable scrolling after a brief delay
    const t = setTimeout(() => {
      document.documentElement.style.overflow = ''
      window.scrollTo(0, 0)
    }, 100)
    
    return () => clearTimeout(t)
  }, [])

  return (
    <main style={{ margin: 0, padding: 0 }}>
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <SplashSection />
      </div>
      <div style={{ height: '100vh', overflow: 'hidden', isolation: 'isolate' }}>
        <JarvisHUD skipBoot />
      </div>
    </main>
  )
}