export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#3d5240]">
      {/* Background image overlay - 北浦湖畔の夕景 */}
      <div className="absolute inset-0">
        <img
          src="/hero-lakeside.png"
          alt="北浦湖畔の夕景"
          className="h-full w-full object-cover object-center opacity-70"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <p className="text-lg font-light tracking-widest text-[#faf8f5]/90 md:text-xl">
          大切な人と、心ほどける時間
        </p>
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
