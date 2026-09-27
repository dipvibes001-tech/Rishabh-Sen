import React, { useState } from 'react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  img: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, title: "Royal Udaipur Palace", category: "Weddings", img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Sunset In The Dunes", category: "Pre-Weddings", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Monochrome Editorial", category: "Portraits", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Vogue Street Campaign", category: "Commercial", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" },
  { id: 5, title: "Heritage Gala Night", category: "Events", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" },
  { id: 6, title: "Golden Hour Vows", category: "Cinematography", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80" }
];

const SERVICES = [
  { title: "Wedding Photography", desc: "High-end editorial coverage capturing authentic royal moments." },
  { title: "Cinematography", desc: "Feature-length 4K master films with custom sound design." },
  { title: "Pre-Wedding Films", desc: "Narrative concept films at breathtaking scenic destinations." },
  { title: "Events & Galas", desc: "Comprehensive coverage of premier corporate and luxury celebrations." },
  { title: "Maternity", desc: "Intimate and artistic portraits celebrating new journeys." },
  { title: "Commercial Photography", desc: "Campaign visuals for luxury, fashion, and lifestyle brands." },
  { title: "Fashion Photography", desc: "High-fashion editorials, ramp, and model portfolios." },
  { title: "Short Films", desc: "Independent narrative shorts, music videos, and cinematic documentaries." }
];

export function App() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // Safe filter logic with null checks
  const filteredPortfolio = PORTFOLIO_ITEMS.filter((item) => {
    if (activeTab === "All") return true;
    const cat = item?.category ? String(item.category).toLowerCase() : "";
    return cat === activeTab.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#080B0D] text-white selection:bg-[#65E6EA] selection:text-black font-sans">
      
      {/* 1. STICKY NAVIGATION */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080B0D]/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-serif font-bold tracking-wider text-white">
          RISHABH <span className="text-[#65E6EA]">SEN</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest text-gray-300">
          <a href="#about" className="hover:text-[#65E6EA] transition">About</a>
          <a href="#services" className="hover:text-[#65E6EA] transition">Services</a>
          <a href="#portfolio" className="hover:text-[#65E6EA] transition">Portfolio</a>
          <a href="#story" className="hover:text-[#65E6EA] transition">Featured</a>
          <a href="#contact" className="hover:text-[#65E6EA] transition">Contact</a>
        </div>
        <a 
          href="#contact" 
          className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#65E6EA] text-black hover:bg-[#52d4d8] transition"
        >
          Book Now
        </a>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#65E6EA]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-7 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12181C] border border-[#65E6EA]/30 text-[#65E6EA] text-[11px] tracking-[0.25em] uppercase font-mono">
            <span className="w-2 h-2 rounded-full bg-[#65E6EA] animate-pulse" />
            Cinematographer & Visual Artist
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif font-extrabold text-white tracking-tight leading-none">
            Rishabh Sen
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto">
            Crafting Timeless Visual Narratives
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            Specializing in luxury wedding cinematography, editorial fashion, and fine art storytelling across India and worldwide.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#65E6EA] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#4dd0d4] transition duration-300"
            >
              View Portfolio
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold text-xs tracking-widest uppercase hover:bg-white/10 transition duration-300"
            >
              Book a Session
            </a>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-24 px-6 border-t border-white/5 bg-[#0C1014]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#65E6EA] font-mono">The Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              Capturing Cinema in Everyday Moments
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Over a decade of experience creating timeless visual narratives across the globe. We don't just record events; we weave emotion, light, and music into lasting cinematic treasures.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10">
              <div>
                <div className="text-3xl font-bold font-serif text-[#65E6EA]">10+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Years Craft</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-serif text-white">350+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-serif text-white">280+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-serif text-[#65E6EA]">400+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">Events Covered</div>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80" 
              alt="Cinematographer at work" 
              className="rounded-2xl border border-white/10 shadow-2xl object-cover w-full h-[420px]"
            />
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#65E6EA] font-mono">Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Services & Craft</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#0F1418] border border-white/5 hover:border-[#65E6EA]/40 transition group">
                <div className="text-xs font-mono text-[#65E6EA] mb-4">0{idx + 1}</div>
                <h3 className="text-lg font-serif font-semibold group-hover:text-[#65E6EA] transition">{s.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 px-6 border-t border-white/5 bg-[#0C1014]">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.3em] text-[#65E6EA] font-mono">Curated Work</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Featured Portfolio</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", "Weddings", "Pre-Weddings", "Cinematography", "Commercial", "Portraits", "Events"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono transition ${
                    activeTab === tab ? "bg-[#65E6EA] text-black font-semibold" : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredPortfolio.map(item => (
              <div 
                key={item.id} 
                onClick={() => setSelectedImage(item.img)}
                className="group relative overflow-hidden rounded-xl border border-white/10 cursor-pointer h-72"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <span className="text-[10px] uppercase tracking-widest text-[#65E6EA] font-mono">{item.category}</span>
                  <h4 className="text-base font-serif font-bold text-white">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/95 p-6 flex items-center justify-center cursor-pointer"
        >
          <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" />
        </div>
      )}

      {/* 6. FEATURED STORY */}
      <section id="story" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#0F1418] grid grid-cols-1 lg:grid-cols-2">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" 
            alt="Royal Wedding" 
            className="w-full h-80 lg:h-full object-cover"
          />
          <div className="p-8 sm:p-12 space-y-6 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#65E6EA] font-mono">Milestone Film</span>
            <h3 className="text-3xl font-serif font-bold">A Royal Destination Wedding in Udaipur</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              An intimate visual story of heritage, candlelit courtyards, and heartfelt family vows captured using cinema-grade prime lenses and acoustic master tracks.
            </p>
            <a 
              href="#contact" 
              className="inline-block px-7 py-3 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-widest hover:bg-[#65E6EA] hover:text-black hover:border-transparent transition w-fit"
            >
              Commission a Project
            </a>
          </div>
        </div>
      </section>

      {/* 7. CONTACT FORM */}
      <section id="contact" className="py-24 px-6 border-t border-white/5 bg-[#0C1014]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-[#65E6EA] font-mono">Inquiries</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Reserve Your Date</h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto">Limited commission dates available each season.</p>
          </div>

          {formSubmitted ? (
            <div className="p-8 text-center rounded-2xl bg-[#12181C] border border-[#65E6EA]/40 text-[#65E6EA]">
              ✓ Thank you! Your booking enquiry has been received. Rishabh Sen's studio will connect with you within 24 hours.
            </div>
          ) : (
            <form 
              onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-8 rounded-3xl bg-[#0F1418] border border-white/10"
            >
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">Your Name</label>
                <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm focus:border-[#65E6EA] outline-none text-white" />
              </div>
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm focus:border-[#65E6EA] outline-none text-white" />
              </div>
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm focus:border-[#65E6EA] outline-none text-white" />
              </div>
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">Event Date</label>
                <input type="date" className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm focus:border-[#65E6EA] outline-none text-gray-300" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">Event Details & Location</label>
                <textarea rows={4} placeholder="Tell us about the venue, timeline, and your vision..." className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm focus:border-[#65E6EA] outline-none text-white" />
              </div>
              <div className="sm:col-span-2 text-center pt-2">
                <button type="submit" className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-[#65E6EA] text-black font-semibold text-xs tracking-widest uppercase hover:bg-[#52d4d8] transition">
                  Submit Enquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="py-12 px-6 border-t border-white/10 bg-[#06080A] text-center space-y-4">
        <div className="text-xl font-serif font-bold tracking-wider text-white">
          RISHABH <span className="text-[#65E6EA]">SEN</span>
        </div>
        <p className="text-xs text-gray-400">
          Cinematography & Fine Art Photography across Mumbai, Delhi, Udaipur & Worldwide.
        </p>
        <div className="text-xs text-gray-500 font-mono pt-4">
          © 2026 Rishabh Sen. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}

export default App;
