import React from 'react';
import { Star } from 'lucide-react';
import { TestimonialItem } from '../../types';

interface TestimonialsProps {
  testimonials?: TestimonialItem[];
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  { id: "1", clientName: "Aarav & Meera", eventType: "Destination Wedding", rating: 5, review: "Rishabh captured our wedding like an international feature film. Every frame felt surreal and deeply emotional." },
  { id: "2", clientName: "Kabir Malhotra", eventType: "Commercial Campaign", rating: 5, review: "Exceptional visual eye and punctuality. The lighting and color grading elevated our brand aesthetic completely." }
];

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials = [] }) => {
  const items = Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <section id="testimonials" className="py-24 bg-[#0C1014] border-t border-white/10 relative z-10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-12">
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-[#65E6EA] font-mono">Testimonials</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Client Words</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {items.map((t, idx) => (
            <div key={t.id || idx} className="p-8 rounded-2xl bg-[#0F1418] border border-white/10 space-y-4">
              <div className="flex gap-1 text-[#65E6EA]">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#65E6EA]" />
                ))}
              </div>
              <p className="text-sm text-gray-300 italic leading-relaxed">"{t.review}"</p>
              <div className="pt-4 border-t border-white/5">
                <div className="text-sm font-serif font-bold text-white">{t.clientName}</div>
                <div className="text-[11px] font-mono text-gray-400 mt-0.5">{t.eventType}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
