import Image from "next/image"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#3d5240]">
      {/* Background image overlay - 北浦湖畔の夕景 */}
      <div className="absolute inset-0">
        <Image
          src="/hero-lakeside.avif"
          alt="北浦湖畔の夕景"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center -translate-y-[8vh]">
        <p className="text-lg font-bold tracking-widest text-[#faf8f5]/90 md:text-xl">
          北浦湖畔で、心ほどける時間
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
