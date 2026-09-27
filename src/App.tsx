/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

// Fallback default data agar API/Database connect na ho
const fallbackContent: PublicContentResponse = {
  siteSettings: {
    about: {
      heading: "Capturing Cinema in Everyday Moments",
      description: "Visual storyteller specializing in luxury wedding cinematography and editorial photography.",
      story: "Over a decade of experience creating timeless visual narratives across the globe.",
      yearsExperience: 10,
      projectsCompleted: 250,
      happyClients: 180,
      eventsCovered: 300,
    },
    featuredStory: {
      title: "A Royal Destination Wedding in Udaipur",
      description: "An intimate story of love, rich cultural traditions, and grand visual moments.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    },
    highlights: [
      { title: "Storytelling", description: "Narrative-driven visual composition." },
      { title: "Sound & Music", description: "Custom audio scoring & sound design." },
      { title: "Attention to Detail", description: "Precision color grading & editing." }
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
  const [content, setContent] = useState<PublicContentResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string>('');
  const [showLoadingScreen, setShowLoadingScreen] = useState<boolean>(true);

  // Admin authentication state
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

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

  // Verify Admin Session on mount
  useEffect(() => {
    const verifyAuth = async () => {
      const token = getAdminToken();
      if (!token) {
        setAuthChecking(false);
        return;
      }
      try {
        const { admin } = await fetchAdminMe();
        setAdminUser(admin);
      } catch {
        setAdminUser(null);
      } finally {
        setAuthChecking(false);
      }
    };

    verifyAuth();
  }, []);

  // Fetch Public Content with Auto-Fallback
  const loadPublicContent = async () => {
    try {
      setLoading(true);
      const data = await fetchPublicContent();
      if (data) {
        setContent(data);
      } else {
        setContent(fallbackContent);
      }
    } catch (err) {
      console.error('Failed to load public portfolio content, using fallback:', err);
      setContent(fallbackContent);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPublicContent();
  }, []);

  // Guard: if accessing /admin but not authenticated, redirect to /admin/login
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

  // Public Portfolio Website
  if (!content) {
    return (
      <div className="min-h-screen bg-[#080B0D] flex items-center justify-center text-white">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#65E6EA] border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_20px_rgba(101,230,234,0.35)]" />
          <p className="text-xs uppercase tracking-widest text-[#9CA7AD] font-mono">
            Loading Cinematography & Portfolio Archive...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080B0D] text-white font-sans-clean selection:bg-[#65E6EA] selection:text-[#080B0D] relative">
      {/* Professional initial reveal loading animation */}
      {showLoadingScreen && (
        <LoadingScreen onFinished={() => setShowLoadingScreen(false)} />
      )}

      {/* Dynamic 3D Cinematic Animated Background */}
      <CinematicBackground />

      {/* 1. Premium Sticky Navigation */}
      <Navbar onAdminClick={() => navigateTo(adminUser ? '/admin' : '/admin/login')} />

      {/* 2. About Section */}
      <About about={content.siteSettings.about} />

      {/* 3. Cinematography / Films Showcase */}
      <FilmsShowcase films={content.films || []} />

      {/* 4. Portfolio Section */}
      <Portfolio portfolio={content.portfolio} />

      {/* 5. Services Section */}
      <Services
        services={content.services}
        onSelectService={(title) => {
          setSelectedService(title);
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. Featured Story Section */}
      <FeaturedStory story={content.siteSettings.featuredStory} />

      {/* 8. Highlights Section */}
      <Highlights highlights={content.siteSettings.highlights} />

      {/* 9. Testimonials Section */}
      <Testimonials testimonials={content.testimonials} />

      {/* 10. Social Section */}
      <SocialSection contact={content.siteSettings.contact} />

      {/* 11. Contact Section */}
      <ContactSection
        contact={content.siteSettings.contact}
        initialService={selectedService}
      />

      {/* 12. Footer */}
      <Footer
        footer={content.siteSettings.footer}
        contact={content.siteSettings.contact}
        onAdminClick={() => navigateTo(adminUser ? '/admin' : '/admin/login')}
      />
    </div>
  );
}
