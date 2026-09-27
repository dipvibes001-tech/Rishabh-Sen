import React from 'react';
import { Camera, Video, Film, Calendar, Heart, Briefcase, Sparkles, Play } from 'lucide-react';
import { ServiceItem } from '../../types';

interface ServicesProps {
  services?: ServiceItem[];
  onSelectService: (serviceTitle: string) => void;
}

const DEFAULT_SERVICES = [
  { id: "1", title: "Wedding Photography", description: "High-end editorial coverage of ceremonies and receptions.", icon: "camera" },
  { id: "2", title: "Cinematography", description: "Feature-film style 4K master wedding movies.", icon: "video" },
  { id: "3", title: "Pre-Wedding Films", description: "Concept-driven visual narratives in stunning locations.", icon: "film" },
  { id: "4", title: "Events & Galas", description: "Corporate summits, galas, and VIP celebrations.", icon: "calendar" },
  { id: "5", title: "Maternity", description: "Timeless, elegant maternal fine art portraits.", icon: "heart" },
  { id: "6", title: "Commercial Photography", description: "Luxury brand campaigns, architecture, and lookbooks.", icon: "briefcase" },
  { id: "7", title: "Fashion Photography", description: "High-fashion editorials, ramp, and model portfolios.", icon: "sparkles" },
  { id: "8", title: "Short Films", description: "Independent narrative shorts, music videos, and docs.", icon: "play" }
];

export const Services: React.FC<ServicesProps> = ({ services = [], onSelectService }) => {
  const items = Array.isArray(services) && services.length > 0 ? services : DEFAULT_SERVICES;

  const renderIcon = (iconName?: string) => {
    const key = iconName ? String(iconName).toLowerCase() : '';
    switch (key) {
      case 'video': return <Video className="w-6 h-6 text-[#65E6EA]" />;
      case 'film': return <Film className="w-6 h-6 text-[#65E6EA]" />;
      case 'calendar': return <Calendar className="w-6 h-6 text-[#65E6EA]" />;
      case 'heart': return <Heart className="w-6 h-6 text-[#65E6EA]" />;
      case 'briefcase': return <Briefcase className="w-6 h-6 text-[#65E6EA]" />;
      case 'sparkles': return <Sparkles className="w-6 h-6 text-[#65E6EA]" />;
      case 'play': return <Play className="w-6 h-6 text-[#65E6EA]" />;
      default: return <Camera className="w-6 h-6 text-[#65E6EA]" />;
    }
  };

  return (
    <section id="services" className="py-28 bg-[#080B0D] relative border-t border-white/10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#65E6EA] font-mono">Capabilities</span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">Services & Craft</h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            From intimate royal vows to grand commercial fashion campaigns, crafted with cinema-grade prime glass.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((service, idx) => (
            <div
              key={service.id || idx}
              onClick={() => onSelectService(service.title)}
              className="p-6 rounded-2xl bg-[#0F1418] border border-white/10 hover:border-[#65E6EA]/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1 shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                {renderIcon(service.icon)}
              </div>
              <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#65E6EA] transition duration-200">
                {service.title}
              </h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#65E6EA]">
                <span>Inquire Session</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
