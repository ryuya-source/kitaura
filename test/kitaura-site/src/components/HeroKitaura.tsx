"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HeroParticlesCanvas from "@/components/HeroParticlesCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function HeroKitaura() {
  const hero = useRef<HTMLElement | null>(null);
  const bgWrap = useRef<HTMLDivElement | null>(null);
  const copy = useRef<HTMLDivElement | null>(null);
  const cta = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hero.current || !bgWrap.current || !copy.current || !cta.current) return;

    const lenis = new Lenis({
      duration: 1.35,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      smoothTouch: false,
    });

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.getAll().forEach((t) => t.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero.current,
        start: "top top",
        end: "+=220%",
        scrub: 1.25,
        pin: true,
        pinSpacing: true,
        // markers: true,
        
      },
    });

    tl.to(bgWrap.current, { y: -90, ease: "none" }, 0)
      .fromTo(copy.current, { opacity: 0 }, { opacity: 1, ease: "none" }, 0.08)
      .fromTo(cta.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: "none" }, 0.55);

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onTick);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={(el) => {
        hero.current = el;
      }}
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* 背景画像（全画面固定） */}
      <div
        ref={(el) => {
          bgWrap.current = el;
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          transform: "scale(1.06)",
          willChange: "transform",
          zIndex: 0,
        }}
      >
        <img
          src="/hero/dusk-lake.jpg"
          alt="Kitaura dusk lake"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>

      {/* 粒（まず見える化設定） */}
      <HeroParticlesCanvas className="absolute inset-0 z-[2] pointer-events-none opacity-100" />

        {/* 霞（PC / SP 共通で下が沈むグラデーション） */}
        <div
        style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            pointerEvents: "none",
            background: `
            linear-gradient(
                to bottom,
                rgba(0,0,0,0.00) 0%,
                rgba(0,0,0,0.10) 40%,
                rgba(0,0,0,0.35) 70%,
                rgba(0,0,0,0.65) 100%
            )
            `,
        }}
/>

      {/* コピー */}
      <div
        style={{
          position: "relative",
          zIndex: 4,
          height: "100%",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div ref={(el) => (copy.current = el)} style={{ color: "rgba(255,255,255,.92)", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 56px)", fontWeight: 300, letterSpacing: "0.06em" }}>
            湖畔で、時間に泊まる
          </h1>
        </div>
      </div>

      {/* CTA */}
      <div
        ref={(el) => (cta.current = el)}
        style={{
          position: "absolute",
          left: "50%",
          bottom: 48,
          transform: "translateX(-50%)",
          zIndex: 4,
        }}
      >
        <button
          style={{
            padding: "12px 20px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,.35)",
            color: "rgba(255,255,255,.92)",
            background: "rgba(0,0,0,.15)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            fontSize: 14,
          }}
        >
          空き状況を見る
        </button>
      </div>
      {/* Bottom fade（PCでも必ず効く） */}
      <div
  style={{
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "52vh",
    zIndex: 5,
    pointerEvents: "none",
    background: `
      linear-gradient(
        to top,
        rgba(0,0,0,0.78) 0%,
        rgba(0,0,0,0.60) 22%,
        rgba(0,0,0,0.28) 55%,
        rgba(0,0,0,0.00) 100%
      )
    `,
    // ここが効く：上端の“帯”を溶かす
    filter: "blur(10px)",
    transform: "translateY(8px)",
  }}
/>
    </section>
  );
}
