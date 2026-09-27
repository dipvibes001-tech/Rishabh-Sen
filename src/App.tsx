import React from 'react';

// Luxury Cinematic Hero Component
export function Hero({ hero }: { hero?: any }) {
  // अगर बैकएंड से डेटा नहीं मिलता है तो यह डिफ़ॉल्ट डेटा इस्तेमाल होगा
  const data = {
    badgeText: hero?.badgeText || "Cinematographer & Visual Artist",
    title: hero?.title || "Rishabh Sen",
    subtitle: hero?.subtitle || "Crafting Timeless Visual Narratives",
    description: hero?.description || "Specializing in luxury wedding cinematography, editorial fashion, and fine art storytelling across India and worldwide.",
    primaryCtaText: hero?.primaryCtaText || "View Portfolio",
    secondaryCtaText: hero?.secondaryCtaText || "Book a Session",
    ...hero,
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden bg-[#080B0D]">
      {/* Cinematic subtle glow background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#65E6EA]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
        {/* Editorial Pill Badge */}
        {data.badgeText && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12181C] border border-[#65E6EA]/30 text-[#65E6EA] text-[11px] tracking-[0.28em] uppercase font-mono shadow-[0_0_20px_rgba(101,230,234,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65E6EA] animate-ping" />
            {data.badgeText}
          </div>
        )}

        {/* Large Cinematic Title */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif font-extrabold text-white tracking-tight leading-[1.05]">
          {data.title}
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-[#E5E9EC] font-light tracking-wide max-w-2xl mx-auto font-sans">
          {data.subtitle}
        </p>

        {/* Short Bio Description */}
        <p className="text-sm md:text-base text-[#9CA7AD] max-w-xl mx-auto leading-relaxed">
          {data.description}
        </p>

        {/* Dual Call-To-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-[#65E6EA] text-[#080B0D] font-medium text-sm tracking-wider uppercase hover:bg-[#7ff3f7] hover:shadow-[0_0_25px_rgba(101,230,234,0.4)] transition-all duration-300"
          >
            {data.primaryCtaText}
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-9 py-3.5 rounded-full border border-white/20 text-white font-medium text-sm tracking-wider uppercase hover:border-[#65E6EA]/60 hover:bg-white/5 transition-all duration-300"
          >
            {data.secondaryCtaText}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
