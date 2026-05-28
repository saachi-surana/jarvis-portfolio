import { create } from "zustand";

export type ReactorMode = "online" | "red-alert" | "stealth" | "overdrive";

interface JarvisStore {
  reactorMode: ReactorMode;
  setReactorMode: (m: ReactorMode) => void;

  pingProjectId: string | null;
  pingProject: (id: string | null) => void;

  highlightSection: string | null;
  setHighlightSection: (s: string | null) => void;

  pendingMessage: string | null;
  queueMessage: (text: string) => void;
  clearMessage: () => void;

  showAbout: boolean;
  setShowAbout: (v: boolean) => void;

  bloomIntensity: number;
  setBloomIntensity: (v: number) => void;

  cameraZ: number;
  setCameraZ: (v: number) => void;
}

export const useJarvisStore = create<JarvisStore>((set) => ({
  reactorMode: "online",
  setReactorMode: (m) => set({ reactorMode: m }),

  pingProjectId: null,
  pingProject: (id) => set({ pingProjectId: id }),

  highlightSection: null,
  setHighlightSection: (s) => set({ highlightSection: s }),

  pendingMessage: null,
  queueMessage: (text) => set({ pendingMessage: text }),
  clearMessage: () => set({ pendingMessage: null }),

  showAbout: false,
  setShowAbout: (v) => set({ showAbout: v }),

  bloomIntensity: 2.5,
  setBloomIntensity: (v) => set({ bloomIntensity: v }),

  cameraZ: 7.2,
  setCameraZ: (v) => set({ cameraZ: v }),
}));
