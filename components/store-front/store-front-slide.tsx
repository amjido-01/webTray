"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Slide {
  id: number
  title: string
  subtitle: string
  description: string
  badge?: string
  image: string
  buttonText: string
}

interface StoreFrontSlideProps {
  slides?: Slide[]
  autoPlayInterval?: number
}

const StoreFrontSlide = ({ 
  slides: customSlides, 
  autoPlayInterval = 5000
}: StoreFrontSlideProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const defaultSlides: Slide[] = [
    {
      id: 1,
      title: "50% OFF",
      subtitle: "Summer Collection",
      description: "Amazing deals on all your favorite products. Limited time only!",
      badge: "Featured",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=800&fit=crop&q=80",
      buttonText: "Shop Now"
    },
    {
      id: 2,
      title: "New Arrivals",
      subtitle: "Fresh & Trending",
      description: "Discover the latest products that everyone is talking about",
      badge: "Just In",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1600&h=800&fit=crop&q=80",
      buttonText: "Explore Now"
    },
    {
      id: 3,
      title: "Premium Quality",
      subtitle: "Best Sellers",
      description: "Top-rated products loved by thousands of satisfied customers",
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=1600&h=800&fit=crop&q=80",
      buttonText: "View Collection"
    }
  ]

  const slides = customSlides || defaultSlides

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [currentSlide, autoPlayInterval])

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-lg">
      {/* Slides */}
      <div 
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="relative flex-shrink-0 w-full h-full">
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={slide.id === 1}
              quality={85}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                <div className="max-w-2xl">
                  {/* Badge */}
                  {slide.badge && (
                    <span className="inline-block bg-orange-500 text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-4 md:mb-6 shadow-lg">
                      {slide.badge}
                    </span>
                  )}

                  {/* Title */}
                  <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-3 md:mb-4 leading-tight">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3 md:mb-4">
                    {slide.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-base md:text-lg text-gray-200 mb-6 md:mb-8 max-w-xl">
                    {slide.description}
                  </p>

                  {/* CTA Button */}
                  <button className="bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold text-sm md:text-base hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 shadow-xl hover:shadow-2xl hover:scale-105">
                    {slide.buttonText}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-8 h-2 bg-white' 
                : 'w-2 h-2 bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  )
}

export default StoreFrontSlide