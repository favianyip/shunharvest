'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Banner } from '@/types';

interface HeroSliderProps {
  banners: Banner[];
}

export default function HeroSlider({ banners }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-stone-800">
      {/* Slides */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          {banner.image && (
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
            <div className="max-w-xl text-white">
              {banner.subtitle && (
                <p className="text-sm uppercase tracking-widest mb-4 text-amber-300">
                  {banner.subtitle}
                </p>
              )}
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                {banner.title}
              </h2>
              {banner.description && (
                <p className="text-lg md:text-xl text-stone-200 mb-8">
                  {banner.description}
                </p>
              )}
              {banner.link && banner.linkText && (
                <Link
                  href={banner.link}
                  className="inline-block px-8 py-3 bg-white text-stone-900 font-medium hover:bg-stone-100 transition-colors"
                >
                  {banner.linkText}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-stone-900" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-stone-900" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
