"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

const StoreFrontSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
   
      bgColor: "bg-black",
      textColor: "text-white"
    },
    {
      id: 2,
  
      bgColor: "bg-black",
      textColor: "text-white"
    },
    {
      id: 3,

      bgColor: "bg-black",
      textColor: "text-white"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <div className="relative w-full  mx-auto overflow-hidden rounded-sm">
      {/* Slider Container */}
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`flex-shrink-0 w-full ${slide.bgColor} ${slide.textColor} p-8 md:p-12`}
          >
            <div className=" mx-auto">
       
              
              {/* CTA Button */}
              <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full p-2 transition-all duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default StoreFrontSlide