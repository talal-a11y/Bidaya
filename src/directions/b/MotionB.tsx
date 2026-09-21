"use client";
// Direction B's motion: Lenis for the scroll, GSAP ScrollTrigger for panels that slide in
// from their side once, letters that rise once, and arcs that draw once. Nothing repeats,
// nothing resets on scroll-back. Reduced motion: none of this runs; everything is in place.
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionB() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    let lenis: Lenis | null = null;
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));
    idle(() => {
      lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    });
    const tick = (t: number) => lenis?.raf(t * 1000);

    const ctx = gsap.context(() => {
      // letters of the big word rise out of a clipped line
      document.querySelectorAll<HTMLElement>("[data-letters]").forEach((el) => {
        const text = el.textContent ?? "";
        el.textContent = "";
        const sr = document.createElement("span"); sr.className = "visually-hidden"; sr.textContent = text; el.appendChild(sr);
        const spans = [...text].map((ch) => { const s = document.createElement("span"); s.textContent = ch; s.setAttribute("aria-hidden", "true"); el.appendChild(s); return s; });
        gsap.from(spans, { yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.05, delay: 0.15 });
      });
      // arcs draw themselves
      document.querySelectorAll<SVGCircleElement>("[data-draw] circle").forEach((c, i) => {
        const len = 2 * Math.PI * c.r.baseVal.value;
        gsap.fromTo(c, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut", delay: 0.3 + i * 0.25 });
      });
      // panels slide in from their side, once, when they reach the viewport
      document.querySelectorAll<HTMLElement>("[data-slide]").forEach((el) => {
        const dir = el.dataset.slide;
        const from = dir === "left" ? { xPercent: -22 } : dir === "right" ? { xPercent: 22 } : { yPercent: 18 };
        gsap.from(el, { ...from, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
      });
      // big numerals and words rise as their panel arrives
      document.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
        gsap.from(el, { yPercent: 40, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    });
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis?.destroy(); };
  }, []);
  return null;
}
