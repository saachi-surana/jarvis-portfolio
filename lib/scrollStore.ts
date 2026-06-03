import { create } from 'zustand'

interface ScrollState {
  progress: number       // smooth interpolated display value (0–1) — page reads this
  target: number         // desired position (0–1) — wheel events write here
  isTransitioning: boolean
  setProgress: (t: number) => void    // set target (BottomBar HOME uses this)
  _setDisplay: (p: number) => void    // rAF writes interpolated value here
  incrementProgress: () => void
  decrementProgress: () => void
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

export const useScrollStore = create<ScrollState>((set, get) => ({
  progress: 0,
  target: 0,
  isTransitioning: false,
  setProgress: (t) => set({ target: clamp01(t) }),
  _setDisplay: (p) => set({ progress: p, isTransitioning: Math.abs(p - get().target) > 0.002 }),
  incrementProgress: () => set((s) => ({ target: clamp01(s.target + 0.015) })),
  decrementProgress: () => set((s) => ({ target: clamp01(s.target - 0.015) })),
}))
