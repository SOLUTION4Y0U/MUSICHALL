import React, { useState, useEffect } from 'react';
import type { SplineProps } from '@splinetool/react-spline';
import { Category } from '../../../types/product';

interface CategoryBannerProps {
  categories: Category[];
  onCategorySelect?: (categoryId: string) => void;
  customHeight?: string;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ 
  categories, 
  onCategorySelect,
  customHeight
}) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [Spline, setSpline] = useState<React.ComponentType<SplineProps> | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load Spline component
  useEffect(() => {
    import('@splinetool/react-spline').then((module) => {
      setSpline(() => module.default);
    });
  }, []);

  const SplineComponent = Spline || (() => <div style={{color: 'red', fontWeight: 'bold'}}>Spline not loaded</div>);

  // Auto-rotate categories
  useEffect(() => {
    if (categories.length <= 1) return;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [categories.length]);

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect?.(categoryId);
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div 
      className={`relative w-full bg-gradient-to-r from-brand-black via-[#47B139]/20 to-brand-black rounded-2xl overflow-hidden shadow-2xl flex flex-row ${!customHeight ? 'h-80 md:h-[320px]' : ''}`}
      style={customHeight ? { height: customHeight } : undefined}
    >
      {/* Left side: Animated categories */}
      <div className="flex flex-col justify-center h-full pl-8 md:pl-12 pr-4 md:pr-8 w-full md:w-1/2 z-10">
        <div className="mb-4">
          <h3 className="text-[#47B139] text-2xl md:text-3xl font-secondary font-semibold uppercase tracking-wider mb-4">
            Категории товаров
          </h3>
        </div>
        {/* Single animated category name */}
        <div className="relative min-h-[7rem] md:min-h-[10rem] flex items-center">
          <div 
            className={`absolute inset-0 flex items-center transition-all duration-500 ease-in-out transform ${
              isAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <button
              onClick={() => handleCategoryClick(categories[currentCategoryIndex]?.id || '')}
              className="block text-left w-full group"
            >
              <span className="block break-words whitespace-pre-line text-2xl md:text-5xl font-extrabold text-white group-hover:text-brand-white transition-colors duration-300 leading-tight" style={{ wordBreak: 'break-word', maxHeight: '12rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                {categories[currentCategoryIndex]?.name}
              </span>
              <div className="w-0 group-hover:w-full h-1 bg-[#47B139] transition-all duration-300 mt-2"></div>
            </button>
          </div>
        </div>
      </div>
      {/* Right side: Spline planet (wide, left-aligned) - hidden on mobile */}
      <div className="hidden md:block w-1/2 h-full relative overflow-hidden flex items-center justify-end">
        <div style={{ width: 1000, height: 500, borderRadius: 16, background: 'transparent' }}>
          <SplineComponent
            scene="https://prod.spline.design/VOvM5rREhyEgRYbe/scene.splinecode"
            style={{ width: '100%', height: '100%', marginRight: '700px' }}
          />
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-[#47B139]/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-[#47B139]/10 rounded-full blur-lg"></div>
    </div>
  );
};

export default CategoryBanner; 