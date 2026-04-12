import { useInView } from "motion/react";
import { useRef } from "react";

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  return { ref };
}
