import type { Variants } from "framer-motion";

// ─── Spring / easing presets ─────────────────────────────────────────────────
export const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;
export const EASE_REVEAL = [0.16, 1, 0.3, 1] as const;

// ─── Variants ────────────────────────────────────────────────────────────────

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.2, ease: EASE_REVEAL } },
  exit:   { opacity: 0, transition: { duration: 0.2 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 6 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE_REVEAL } },
};

export const slideFromRight: Variants = {
  hidden: { x: "100%" },
  show:   { x: 0 },
  exit:   { x: "100%" },
};

export const slideFromBottom: Variants = {
  hidden: { y: "100%" },
  show:   { y: 0 },
  exit:   { y: "100%" },
};

export const scrim: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.2 } },
  exit:   { opacity: 0, transition: { duration: 0.2 } },
};

// Parent variant — staggers children at 0.07s intervals
export const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07 } },
};
