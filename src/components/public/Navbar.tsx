import React, { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
}

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Featured', href: '#story' },
  { name: 'Highlights', href: '#highlights' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onAdminClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080B0D]/90 backdrop-blur-md py-4 border-b border-white/10 shadow-2xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-white">
            RISHABH <span className="text-[#65E6EA]">SEN</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-medium text-gray-300 hover:text-[#65E6EA] transition duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onAdminClick}
            className="p-2 rounded-xl border border-white/10 text-gray-400 hover:text-[#65E6EA] hover:border-[#65E6EA]/30 transition"
            title="Admin Portal"
            aria-label="Admin Portal"
          >
            <Shield className="w-4 h-4" />
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-block px-5 py-2.5 rounded-full bg-[#65E6EA] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#52d4d8] transition shadow-[0_0_15px_rgba(101,230,234,0.3)]"
          >
            Book Session
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#65E6EA]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080B0D]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-gray-300 hover:text-[#65E6EA]"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 rounded-full bg-[#65E6EA] text-black text-xs font-bold uppercase tracking-widest mt-4"
          >
            Book Session
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
