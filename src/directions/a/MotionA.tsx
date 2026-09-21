"use client";
// Direction A's motion: no smooth-scroll library — the wheel is the browser's. Each section
// enters once: lines of the headline slide up out of a clipped box; pills and circles rise
// into place as the reader reaches them; the arcs of the mark draw themselves. Nothing loops.
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionA() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from("[data-line]", { yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.09, delay: 0.1 });
      gsap.from("[data-after]", { y: 16, opacity: 0.001, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.55 });
      document.querySelectorAll<SVGCircleElement>("[data-draw] circle").forEach((c, i) => {
        const len = 2 * Math.PI * c.r.baseVal.value;
        gsap.fromTo(c, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", delay: 0.2 + i * 0.3 });
      });
      document.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
        const kids = el.children.length ? [...el.children] : [el];
        gsap.from(kids, { y: 60, duration: 0.9, ease: "power3.out", stagger: 0.14, scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
      document.querySelectorAll<HTMLElement>("[data-enter]").forEach((el) => {
        gsap.from(el, { y: 28, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    });
    return () => ctx.revert();
  }, []);
  return null;
}
