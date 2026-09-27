import React, { useState } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { FilmItem } from '../../types';

interface FilmsShowcaseProps {
  films?: FilmItem[];
}

const DEFAULT_FILMS: FilmItem[] = [
  {
    id: 'f1',
    title: 'A Royal Heritage Wedding in Udaipur',
    category: 'Wedding Film',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    description: 'An intimate, cinematic visual story filmed under palace skies with anamorphic primes.'
  },
  {
    id: 'f2',
    title: 'Dunes & Whispers - Thar Desert',
    category: 'Pre-Wedding Film',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    description: 'A visual poem traversing the golden sand ridges and twilight glow of Rajasthan.'
  }
];

export const FilmsShowcase: React.FC<FilmsShowcaseProps> = ({ films = [] }) => {
  const safeFilms = Array.isArray(films) && films.length > 0 ? films : DEFAULT_FILMS;
  const [selectedFilm, setSelectedFilm] = useState<FilmItem>(safeFilms[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="films" className="py-28 bg-[#0C1014] relative border-t border-white/10 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12181C] border border-[#65E6EA]/30 text-xs font-semibold tracking-wider text-[#65E6EA] uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#65E6EA]" />
              <span>02. Cinema Motion</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-white">
              Motion <span className="text-[#65E6EA]">Films</span>
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
            High-dynamic-range 4K feature stories, acoustic sound scoring, and true color science.
          </p>
        </div>

        {/* Featured Video Player Box */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-black shadow-2xl mb-10 aspect-video max-h-[600px] w-full flex items-center justify-center">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube.com/embed/${selectedFilm.videoUrl?.split('v=')[1] || 'dQw4w9WgXcQ'}?autoplay=1`}
              title={selectedFilm.title || 'Cinema Film'}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={selectedFilm.thumbnailUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'}
                alt={selectedFilm.title || 'Film Poster'}
                className="w-full h-full object-cover opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="mb-4 w-16 h-16 rounded-full bg-[#65E6EA] text-black flex items-center justify-center hover:scale-110 transition duration-300 shadow-[0_0_30px_rgba(101,230,234,0.6)] cursor-pointer"
                  aria-label="Play Film"
                >
                  <Play className="w-7 h-7 fill-black ml-1" />
                </button>
                <span className="text-xs uppercase font-mono tracking-widest text-[#65E6EA] mb-1">
                  {selectedFilm.category || 'Cinema'}
                </span>
                <h3 className="text-2xl md:text-4xl font-serif font-bold text-white">
                  {selectedFilm.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-300 max-w-2xl mt-2 line-clamp-2">
                  {selectedFilm.description}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Films Thumbnails Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {safeFilms.map((film, idx) => (
            <div
              key={film.id || idx}
              onClick={() => {
                setSelectedFilm(film);
                setIsPlaying(false);
              }}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                selectedFilm.id === film.id
                  ? 'border-[#65E6EA] bg-[#12181C]'
                  : 'border-white/10 bg-[#0F1418] hover:border-white/30'
              }`}
            >
              <img
                src={film.thumbnailUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80'}
                alt={film.title || 'Film'}
                className="w-full h-36 object-cover rounded-xl mb-3"
              />
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#65E6EA]">
                {film.category || 'Film'}
              </span>
              <h4 className="text-sm font-serif font-bold text-white line-clamp-1 mt-1">
                {film.title}
              </h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FilmsShowcase;
