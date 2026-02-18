import Link from "next/link"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#3d5240]">
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="北浦湖畔の風景"
          className="h-full w-full object-cover opacity-40"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1 className="mb-2 font-serif text-5xl font-bold tracking-wider text-[#faf8f5] md:text-7xl lg:text-8xl">
          <span className="block">KITAURA LAKESIDE</span>
          <span className="mt-2 block text-3xl font-light tracking-[0.4em] text-[#faf8f5]/80 md:text-4xl lg:text-5xl">
            RV park
          </span>
        </h1>
        <p className="mt-6 text-lg font-light tracking-widest text-[#faf8f5]/90 md:text-xl">
          大切な人と、心ほどける時間
        </p>
        <Link
          href="/contact"
          className="mt-10 inline-flex rounded-lg bg-[#faf8f5] px-8 py-3.5 text-sm font-semibold tracking-wider text-[#3d5240] transition-all hover:bg-[#faf8f5]/90 hover:shadow-lg"
        >
          予約・空き確認
        </Link>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80V40C360 0 1080 0 1440 40V80H0Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  )
}
