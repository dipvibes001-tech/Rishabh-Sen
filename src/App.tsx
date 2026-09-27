// Simple Inline Hero Component
function Hero({ hero }: { hero: any }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-6 z-10">
        {hero.badgeText && (
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#65E6EA]/10 text-[#65E6EA] border border-[#65E6EA]/20">
            {hero.badgeText}
          </span>
        )}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight">
          {hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light">
          {hero.subtitle}
        </p>
        <p className="text-base text-gray-400 max-w-2xl mx-auto">
          {hero.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href="#portfolio"
            className="px-8 py-3 rounded-full bg-[#65E6EA] text-black font-semibold hover:bg-[#4bc3c7] transition"
          >
            {hero.primaryCtaText || "View Portfolio"}
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition"
          >
            {hero.secondaryCtaText || "Book Session"}
          </a>
        </div>
      </div>
    </section>
  );
}
