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
  // Snap: once target crosses 0.5, commit to destination
  incrementProgress: () => set((s) => {
    const raw = clamp01(s.target + 0.04)
    return { target: raw >= 0.5 ? 1 : raw }
  }),
  decrementProgress: () => set((s) => {
    const raw = clamp01(s.target - 0.04)
    return { target: raw <= 0.5 ? 0 : raw }
  }),
}))
