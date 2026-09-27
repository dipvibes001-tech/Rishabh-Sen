import React, { useState } from 'react';

interface CinematicImageProps {
  src?: string;
  alt?: string;
  className?: string;
  category?: string;
  title?: string;
  client?: string;
}

export const CinematicImage: React.FC<CinematicImageProps> = ({
  src,
  alt = 'Cinematic Shot',
  className = '',
  category = '',
  title = '',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Safe category check taaki toLowerCase kabhi crash na kare
  const safeCat = category ? String(category).toLowerCase() : '';

  const fallbackSrc = 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80';

  return (
    <div className={`relative overflow-hidden bg-[#0C1014] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#12181C] animate-pulse flex items-center justify-center">
          <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500">
            {safeCat || 'Cinema Still'}
          </span>
        </div>
      )}
      <img
        src={error || !src ? fallbackSrc : src}
        alt={alt || title || 'Visual'}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default CinematicImage;
