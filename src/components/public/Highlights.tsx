import React from 'react';
import { Sparkles, Award, Film } from 'lucide-react';
import { StudioHighlight } from '../../types';

interface HighlightsProps {
  highlights?: StudioHighlight[];
}

const DEFAULT_HIGHLIGHTS: StudioHighlight[] = [
  { title: "Storytelling", description: "Narrative-driven visual composition focused on raw, heartfelt human emotion." },
  { title: "Sound & Music", description: "Custom acoustic sound design, live speech recordings, and emotive orchestral scores." },
  { title: "Attention to Detail", description: "Precision color science tailored to heritage skin tones and ambient architecture." }
];

export const Highlights: React.FC<HighlightsProps> = ({ highlights = [] }) => {
  const items = Array.isArray(highlights) && highlights.length > 0 ? highlights : DEFAULT_HIGHLIGHTS;

  return (
    <section id="highlights" className="py-24 bg-[#080B0D] border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-[#0F1418] border border-white/10 hover:border-[#65E6EA]/40 transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[#65E6EA]">
                {idx === 0 ? <Sparkles className="w-6 h-6" /> : idx === 1 ? <Film className="w-6 h-6" /> : <Award className="w-6 h-6" />}
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3">{item?.title || 'Excellence'}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item?.description || ''}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
