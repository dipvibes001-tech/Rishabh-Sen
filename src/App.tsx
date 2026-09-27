/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/public/Navbar';
import { Hero } from './components/public/Hero';
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
import { CinematicBackground } from './components/common/CinematicBackground';
import { LoadingScreen } from './components/common/LoadingScreen';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import {
  PublicContentResponse,
  AdminUser,
} from './types';
import {
  fetchPublicContent,
  fetchAdminMe,
  getAdminToken,
} from './services/api';

// Complete Safe Fallback Content Structure
const fallbackContent: PublicContentResponse = {
  siteSettings: {
    hero: {
      title: "Rishabh Sen",
      subtitle: "Cinematographer & Visual Storyteller",
      description: "Crafting timeless cinematic experiences & fine art photography.",
      badgeText: "Cinematic Excellence",
      primaryCtaText: "View Portfolio",
      secondaryCtaText: "Book Session",
      heroImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
    },
    about: {
      heading: "Capturing Cinema in Everyday Moments",
      description: "Visual storyteller specializing in luxury wedding cinematography and editorial photography.",
      story: "Over a decade of experience creating timeless visual narratives across the globe.",
      yearsExperience: 10,
      projectsCompleted: 250,
      happyClients: 180,
      eventsCovered: 300,
      profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
    },
    featuredStory: {
      title: "A Royal Destination Wedding in Udaipur",
      description: "An intimate story of love, rich cultural traditions, and grand visual moments.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    },
    highlights: [
      { id: "1", title: "Storytelling", description: "Narrative-driven visual composition." },
      { id: "2", title: "Sound & Music", description: "Custom audio scoring & sound design." },
      { id: "3", title: "Attention to Detail", description: "Precision color grading & editing." }
    ],
    contact: {
      email: "contact@cinematicrishabh.site",
      phone: "+91 98765 43210",
      address: "Mumbai / New Delhi, India",
      instagramUrl: "https://instagram.com",
      youtubeUrl: "https://youtube.com"
    },
    footer: {
      copyrightText: "© 2026 Rishabh Sen. All rights reserved.",
      tagline: "Cinematic Visuals & Fine Art Photography"
    }
  },
  services: [
    { id: "1", title: "Wedding Cinematography", description: "Feature-length luxury films", icon: "video", active: true },
    { id: "2", title: "Pre-Wedding Films", description: "Concept-driven visual stories", icon: "film", active: true },
    { id: "3", title: "Fashion & Commercial", description: "Editorial & brand campaigns", icon: "camera", active: true }
  ],
  portfolio: [
    { id: "1", title: "Royal Palace Wedding", category: "Weddings", imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" },
    { id: "2", title: "Urban Editorial", category: "Commercial", imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80" }
  ],
  films: [],
  testimonials: []
};

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [content, setContent] = useState<PublicContentResponse>(fallbackContent);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string>('');
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(true);

  // Admin authentication state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Auto Safety Timer: 1.5 second baad loading screen apne aap gayab ho jayegi
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Sync with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Verify Admin Session
  useEffect(() => {
    let isMounted = true;
    const verifyAuth = async () => {
      const token = getAdminToken();
      if (!token) {
        if (isMounted) setAuthChecking(false);
        return;
      }
      try {
        const authPromise = fetchAdminMe();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Auth Timeout')), 2000)
        );
        const { admin }: any = await Promise.race([authPromise, timeoutPromise]);
        if (isMounted) setAdminUser(admin);
      } catch {
        if (isMounted) setAdminUser(null);
      } finally {
        if (isMounted) setAuthChecking(false);
      }
    };

    verifyAuth();
    return () => { isMounted = false; };
  }, []);

  // Fetch Public Content
  const loadPublicContent = async () => {
    try {
      setLoading(true);
      const apiPromise = fetchPublicContent();
      const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve(null), 2000)
      );

      const data: any = await Promise.race([apiPromise, timeoutPromise]);

      if (data && data.siteSettings) {
        setContent(data);
      } else {
        setContent(fallbackContent);
      }
    } catch (err) {
      setContent(fallbackContent);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublicContent();
  }, []);

  // Guard Routes
  const isAdminSecurityRoute = currentPath === '/admin/security';
  const isAdminDashboardRoute = currentPath === '/admin' || currentPath.startsWith('/admin/');
  const isAdminLoginRoute = currentPath === '/admin/login';

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#080B0D] flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-[#65E6EA] border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_20px_rgba(101,230,234,0.4)]" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#65E6EA] font-mono">
            Rishabh Sen · Initializing Studio...
          </p>
        </div>
      </div>
    );
  }

  // Admin Login Page
  if (isAdminLoginRoute) {
    if (adminUser) {
      navigateTo('/admin');
      return null;
    }
    return (
      <AdminLogin
        onLoginSuccess={(user) => {
          setAdminUser(user);
          navigateTo('/admin');
          loadPublicContent();
        }}
        onBackToSite={() => navigateTo('/')}
      />
    );
  }

  // Admin Dashboard Page (Protected)
  if (isAdminDashboardRoute) {
    if (!adminUser) {
      navigateTo('/admin/login');
      return null;
    }
    return (
      <AdminDashboard
        admin={adminUser}
        initialTab={isAdminSecurityRoute ? 'security' : 'overview'}
        onLogout={() => {
          setAdminUser(null);
          navigateTo('/');
          loadPublicContent();
        }}
        onViewPublicSite={() => {
          navigateTo('/');
          loadPublicContent();
        }}
      />
    );
  }

  // Safe Extraction of Props
  const siteSettings = content?.siteSettings || fallbackContent.siteSettings;
  const services = content?.services || fallbackContent.services;
  const portfolio = content?.portfolio || fallbackContent.portfolio;
  const films = content?.films || [];
  const testimonials = content?.testimonials || [];

  return (
    <div className="min-h-screen bg-[#080B0D] text-white font-sans selection:bg-[#65E6EA] selection:text-[#080B0D] relative">
      {/* Loading Animation Overlay */}
      {showLoadingScreen && (
        <LoadingScreen onFinished={() => setShowLoadingScreen(false)} />
      )}

      {/* Dynamic 3D Cinematic Background */}
      <CinematicBackground />

      {/* 1. Sticky Navigation */}
      <Navbar onAdminClick={() => navigateTo(adminUser ? '/admin' : '/admin/login')} />

      {/* 2. Hero Section */}
      {siteSettings?.hero && <Hero hero={siteSettings.hero} />}

      {/* 3. About Section */}
      {siteSettings?.about && <About about={siteSettings.about} />}

      {/* 4. Cinematography / Films Showcase */}
      <FilmsShowcase films={films} />

      {/* 5. Portfolio Section */}
      <Portfolio portfolio={portfolio} />

      {/* 6. Services Section */}
      <Services
        services={services}
        onSelectService={(title) => {
          setSelectedService(title);
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 7. Featured Story Section */}
      {siteSettings?.featuredStory && (
        <FeaturedStory story={siteSettings.featuredStory} />
      )}

      {/* 8. Highlights Section */}
      {siteSettings?.highlights && (
        <Highlights highlights={siteSettings.highlights} />
      )}

      {/* 9. Testimonials Section */}
      <Testimonials testimonials={testimonials} />

      {/* 10. Social Section */}
      {siteSettings?.contact && (
        <SocialSection contact={siteSettings.contact} />
      )}

      {/* 11. Contact Section */}
      {siteSettings?.contact && (
        <ContactSection
          contact={siteSettings.contact}
          initialService={selectedService}
        />
      )}

      {/* 12. Footer */}
      {siteSettings?.footer && siteSettings?.contact && (
        <Footer
          footer={siteSettings.footer}
          contact={siteSettings.contact}
          onAdminClick={() => navigateTo(adminUser ? '/admin' : '/admin/login')}
        />
      )}
    </div>
  );
}
