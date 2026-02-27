"use client"

import Image from "next/image"

export function Hero() {
  return (
    <section className="relative flex min-h-screen h-screen items-center justify-center overflow-hidden bg-[#3d5240]">
      {/* Background image - 北浦湖畔の夕景 */}
      <div className="absolute inset-0 min-h-full">
        <Image
          src="/hero-lakeside.avif"
          alt="北浦湖畔の夕景"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* 3行テキスト */}
      <div
        className="relative z-10 flex flex-col items-center gap-1 px-4 text-center"
        style={{ transform: "translateY(-8vh)" }}
      >
        <p className="text-lg font-bold tracking-widest text-[#faf8f5]/90 md:text-xl">
          北浦湖畔にある小さな RVパーク
        </p>
        <p className="text-lg font-bold tracking-widest text-[#faf8f5]/90 md:text-xl">
          全区画専用サニタリー棟完備
        </p>
        <p className="text-lg font-bold tracking-widest text-[#faf8f5]/90 md:text-xl">
          プライベートに過ごす大人時間
        </p>
      </div>

      {/* Bottom curve */}
      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full">
          <path d="M0 80V40C360 0 1080 0 1440 40V80H0Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  )
}
