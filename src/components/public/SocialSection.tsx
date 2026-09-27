import React from 'react';
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { SiteContact } from '../../types';

interface SocialSectionProps {
  contact?: SiteContact;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ contact }) => {
  return (
    <section className="py-20 bg-[#080B0D] border-t border-white/10 relative z-10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-8">
        <span className="text-xs uppercase tracking-[0.3em] text-[#65E6EA] font-mono">Connect</span>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Join the Journey</h2>
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {contact?.instagramUrl && (
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#12181C] border border-white/10 hover:border-[#65E6EA] hover:text-[#65E6EA] transition text-xs font-mono tracking-widest uppercase"
            >
              <Instagram className="w-4 h-4 text-[#65E6EA]" />
              Instagram
            </a>
          )}
          {contact?.youtubeUrl && (
            <a
              href={contact.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#12181C] border border-white/10 hover:border-[#65E6EA] hover:text-[#65E6EA] transition text-xs font-mono tracking-widest uppercase"
            >
              <Youtube className="w-4 h-4 text-[#65E6EA]" />
              YouTube Cinema
            </a>
          )}
          {contact?.email && (
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#12181C] border border-white/10 hover:border-[#65E6EA] hover:text-[#65E6EA] transition text-xs font-mono tracking-widest uppercase"
            >
              <Mail className="w-4 h-4 text-[#65E6EA]" />
              Email
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
