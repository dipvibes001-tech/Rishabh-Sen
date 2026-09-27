/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/public/Navbar';
import { FilmsShowcase } from './components/public/FilmsShowcase';
import { About } from './components/public/About';
import { Services } from './components/public/Services';
import { Portfolio } from './components/public/Portfolio';
import { FeaturedStory } from './components/public/FeaturedStory';
import { Highlights } from './components/public/Highlights';
import { Testimonials } from './components/public/Testimonials';
import { SocialSection } from './components/public/SocialSection';
import { ContactSection } from './components/public/ContactSection';
import { Footer } from './components/public/Footer';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

// Inbuilt Full Data so website never shows empty or blank screen
const initialData = {
  about: {
    heading: "Capturing Cinema in Everyday Moments",
    description: "Visual storyteller specializing in luxury wedding cinematography and editorial photography.",
    story: "Over a decade of experience crafting high-end, emotive visual narratives across India and worldwide destinations.",
    yearsExperience: 8,
    projectsCompleted: 350,
    happyClients: 280,
    eventsCovered: 400,
  },
  featuredStory: {
    title: "A Royal Destination Wedding in Udaipur",
    description: "An intimate story of love, regal architecture, and cinematic frames under palace lights.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  },
  highlights: [
    { title: "Storytelling", description: "Narrative-driven visual composition focused on authentic emotion." },
    { title: "Sound & Music", description: "Bespoke acoustic scoring, sound design, and master audio grading." },
    { title: "Attention to Detail", description: "Precision color science, anamorphic lenses, and seamless editing." }
  ],
  services: [
    { id: "1", title: "Wedding Photography", description: "High-end editorial coverage of ceremonies and receptions.", icon: "camera", active: true },
    { id: "2", title: "Cinematography", description: "Feature-film style 4K master wedding movies.", icon: "video", active: true },
    { id: "3", title: "Pre-Wedding Films", description: "Concept-driven visual narratives in stunning locations.", icon: "film", active: true },
    { id: "4", title: "Events & Galas", description: "Corporate summits, galas, and VIP celebrations.", icon: "calendar", active: true },
    { id: "5", title: "Maternity", description: "Timeless, elegant maternal fine art portraits.", icon: "heart", active: true },
    { id: "6", title: "Commercial Photography", description: "Luxury brand campaigns, architecture, and lookbooks.", icon: "briefcase", active: true },
    { id: "7", title: "Fashion Photography", description: "High-fashion editorials, ramp, and model portfolios.", icon: "sparkles", active: true },
    { id: "8", title: "Short Films", description: "Independent narrative shorts, music videos, and docs.", icon: "play", active: true }
  ],
  portfolio: [
    { id: "1", title: "Royal Udaipur Palace", category: "Weddings", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" },
    { id: "2", title: "Sunset In The Dunes", category: "Pre-Weddings", imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80" },
    { id: "3", title: "Monochrome Editorial", category: "Portraits", imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80" },
    { id: "4", title: "Vogue Street Campaign", category: "Commercial", imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" },
    { id: "5", title: "Heritage Gala Night", category: "Events", imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80" },
    { id: "6", title: "Golden Hour Vows", category: "Cinematography", imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80" }
  ],
  testimonials: [
    { id: "1", clientName: "Aarav & Meera", eventType: "Destination Wedding", rating: 5, review: "Rishabh captured our wedding like an international feature film. Every frame felt surreal and deeply emotional." },
    { id: "2", clientName: "Kabir Malhotra", eventType: "Commercial Campaign", rating: 5, review: "Exceptional visual eye and punctuality. The lighting and color grading elevated our brand aesthetic completely." }
  ],
  contact: {
    email: "contact@rishabhsen.com",
    phone: "+91 98765 43210",
    address: "Mumbai / New Delhi, India",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com"
  },
  footer: {
    copyrightText: "© 2026 Rishabh Sen. All rights reserved.",
    tagline: "Cinematic Visuals & Fine Art Photography"
  }
};

// Full Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-[#080B0D]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#65E6EA]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-4xl mx-auto text-center space-y-7 relative z-10">
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
  );
}

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<string>('');

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route 1: Admin Login
  if (currentPath === '/admin/login') {
    return (
      <AdminLogin
        onLoginSuccess={(user) => {
          setAdminUser(user);
          navigateTo('/admin');
        }}
        onBackToSite={() => navigateTo('/')}
      />
    );
  }

  // Route 2: Admin Dashboard
  if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
    if (!adminUser) {
      return (
        <AdminLogin
          onLoginSuccess={(user) => {
            setAdminUser(user);
            navigateTo('/admin');
          }}
          onBackToSite={() => navigateTo('/')}
        />
      );
    }
    return (
      <AdminDashboard
        admin={adminUser}
        initialTab="overview"
        onLogout={() => {
          setAdminUser(null);
          navigateTo('/');
        }}
        onViewPublicSite={() => navigateTo('/')}
      />
    );
  }

  // Route 3: Public Website (All Sections)
  return (
    <div className="min-h-screen bg-[#080B0D] text-white selection:bg-[#65E6EA] selection:text-black">
      {/* 1. Header Navigation */}
      <Navbar onAdminClick={() => navigateTo('/admin')} />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. About Section */}
      <About about={initialData.about} />

      {/* 4. Films Showcase */}
      <FilmsShowcase films={[]} />

      {/* 5. Services Section */}
      <Services
        services={initialData.services}
        onSelectService={(title) => {
          setSelectedService(title);
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. Portfolio Section */}
      <Portfolio portfolio={initialData.portfolio} />

      {/* 7. Featured Story */}
      <FeaturedStory story={initialData.featuredStory} />

      {/* 8. Highlights */}
      <Highlights highlights={initialData.highlights} />

      {/* 9. Testimonials */}
      <Testimonials testimonials={initialData.testimonials} />

      {/* 10. Social Section */}
      <SocialSection contact={initialData.contact} />

      {/* 11. Contact Section */}
      <ContactSection
        contact={initialData.contact}
        initialService={selectedService}
      />

      {/* 12. Footer */}
      <Footer
        footer={initialData.footer}
        contact={initialData.contact}
        onAdminClick={() => navigateTo('/admin')}
      />
    </div>
  );
}

export default App;
