import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BannerSlider = ({ banners = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { navigateTo } = useApp();

  useEffect(() => {
    if (!banners.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (!banners.length) return null;

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative w-full overflow-hidden bg-gray-200">
      <div 
        onClick={() => navigateTo('categories', { category: currentBanner.categoryTarget })}
        className="cursor-pointer relative h-44 sm:h-52 w-full transition-all duration-500 ease-in-out"
      >
        <img
          src={currentBanner.image}
          alt={currentBanner.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay for high-end Flipkart banner styling */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent flex flex-col justify-center px-4 text-white">
          <span className="inline-block bg-[#ffe500] text-gray-900 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider mb-1 w-max">
            {currentBanner.tag}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white leading-tight drop-shadow-sm max-w-[250px]">
            {currentBanner.title}
          </h2>
          <p className="text-xs text-gray-200 mt-1 max-w-[220px] line-clamp-2">
            {currentBanner.subtitle}
          </p>

          <div className="mt-2.5 flex items-center space-x-1 text-xs font-bold text-[#ffe500]">
            <span>Shop Now</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Top-right promo tag */}
        <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
          {currentBanner.badge}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1.5 z-10 pointer-events-none">
        {banners.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
