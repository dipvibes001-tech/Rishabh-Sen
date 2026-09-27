import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Lock } from 'lucide-react';

interface NavbarProps {
  onAdminClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Films', href: '#films' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Story', href: '#story' },
    { label: 'Highlights', href: '#highlights' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B0D]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#about"
          className="group flex items-center gap-2.5 text-lg sm:text-xl font-display font-bold tracking-[0.16em] text-white uppercase transition-colors"
        >
          <span className="group-hover:text-[#65E6EA] transition-colors">Rishabh Sen</span>
          <span className="w-2 h-2 rounded-full bg-[#65E6EA] shadow-[0_0_10px_#65E6EA] inline-block opacity-90 group-hover:scale-125 transition-transform" />
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-sans-clean uppercase tracking-[0.18em] text-[#9CA7AD]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#65E6EA] after:to-[#8B7CFF] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#contact"
            className="px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-bold text-[#080B0D] bg-gradient-to-r from-[#65E6EA] via-[#8B7CFF] to-[#C56CFF] hover:opacity-90 transition-all rounded-xl shadow-[0_0_25px_rgba(101,230,234,0.35)] hover:shadow-[0_0_35px_rgba(139,124,255,0.5)] whitespace-nowrap flex items-center gap-1.5"
          >
            <span>Book a Session</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {onAdminClick && (
            <button
              onClick={onAdminClick}
              title="Admin Portal"
              aria-label="Admin Portal"
              className="p-2 text-[#9CA7AD] hover:text-[#65E6EA] hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-colors cursor-pointer"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Mobile Hamburger toggle */}
        <div className="flex md:hidden items-center gap-2">
          {onAdminClick && (
            <button
              onClick={onAdminClick}
              title="Admin Portal"
              aria-label="Admin Portal"
              className="p-2 text-[#9CA7AD] hover:text-[#65E6EA]"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-white hover:text-[#65E6EA] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D1215]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-[#9CA7AD] hover:text-[#65E6EA] py-2 border-b border-white/5 flex items-center justify-between font-medium transition-colors"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#65E6EA]">→</span>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-widest font-bold text-[#080B0D] bg-gradient-to-r from-[#65E6EA] to-[#8B7CFF] rounded-xl shadow-lg shadow-[#65E6EA]/20"
            >
              <span>Book a Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
