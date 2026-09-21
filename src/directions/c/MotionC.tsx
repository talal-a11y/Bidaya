"use client";
// Direction C's motion: Lenis; three chapters that pin and scroll sideways (WeEvolveIT's
// slideshow) driven by the wheel; a progress mark in mono; words that arrive on the stream.
// Each pin plays once forward and back with the scroll — the wheel always moves the page.
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionC() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    let lenis: Lenis | null = null;
    const tick = (t: number) => lenis?.raf(t * 1000);
    const ctx = gsap.context(() => {
      const phone = innerWidth < 900;
      document.querySelectorAll<HTMLElement>("[data-sideways]").forEach((sec) => {
        const track = sec.querySelector<HTMLElement>("[data-track]")!;
        const slides = track.children.length;
        const counter = sec.querySelector<HTMLElement>("[data-counter]");
        if (phone) return; // on the phone the slides are a swipe row (CSS scroll-snap)
        gsap.to(track, {
          xPercent: -100 * (slides - 1) / slides, ease: "none",
          scrollTrigger: { trigger: sec, pin: true, scrub: 0.6, end: () => "+=" + innerWidth * (slides - 1) * 0.9, snap: { snapTo: 1 / (slides - 1), duration: 0.35, ease: "power1.inOut" },
            onUpdate: (st) => { if (counter) counter.textContent = String(Math.min(slides, 1 + Math.round(st.progress * (slides - 1)))).padStart(2, "0"); } },
        });
      });
      document.querySelectorAll<HTMLElement>("[data-arrive]").forEach((el) => {
        gsap.from(el, { y: 28, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
      const prog = document.querySelector<HTMLElement>("[data-progress]");
      if (prog) ScrollTrigger.create({ start: 0, end: "max", onUpdate: (st) => { prog.textContent = String(Math.round(st.progress * 100)).padStart(3, "0") + "%"; } });
    });
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 500));
    idle(() => { lenis = new Lenis({ lerp: 0.1 }); lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0); ScrollTrigger.refresh(); });
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis?.destroy(); };
  }, []);
  return null;
}
