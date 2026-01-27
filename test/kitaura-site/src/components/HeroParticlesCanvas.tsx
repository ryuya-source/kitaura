"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  density?: number; // 粒の数
};

export default function HeroParticlesCanvas({
  className,
  density = 38, // 北浦：少なめが上品
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const particles: {
      x: number;
      y: number;
      r: number;
      a: number; // alpha
      vx: number;
      vy: number;
      tw: number; // twinkle phase
    }[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 粒を再生成（画面サイズ依存）
      particles.length = 0;
      const n = Math.max(18, Math.floor((w * h) / (52000)) + density);
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1.2 + Math.random() * 2.4,
          a: 0.10 + Math.random() * 0.12,
          vx: -0.02 + Math.random() * 0.04,
          vy: -0.02 + Math.random() * 0.03,
          tw: Math.random() * Math.PI * 2,
        });
      }
    };

    const tick = (t: number) => {
      // クリア（完全透明）
      ctx.clearRect(0, 0, w, h);

      // ほんの少しだけ“空気の濃淡”を作る（夕暮れの霞）
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(255,255,255,0.00)");
      g.addColorStop(0.55, "rgba(255,210,170,0.03)");
      g.addColorStop(1, "rgba(0,0,0,0.06)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // 粒描画
      for (const p of particles) {
        p.tw += 0.008; // きらめき速度（遅い）
        const twinkle = 0.75 + Math.sin(p.tw) * 0.25;

        p.x += p.vx;
        p.y += p.vy;

        // 画面外ループ
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // 上半分は少し薄く、水面側は少し濃く（自然っぽい）
        const depth = Math.min(1, Math.max(0, p.y / h));
        const alpha = p.a * (0.65 + depth * 0.8) * twinkle;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${Math.min(0.35, alpha * 6)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement ?? canvas);

    resize();
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [density]);

  return (
    <canvas
    ref={canvasRef}
    className={className}
    aria-hidden="true"
    style={{ outline: "3px solid lime" }}
    />
  );
}
