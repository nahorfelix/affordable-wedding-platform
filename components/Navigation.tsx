'use client'

import { useState, useEffect } from 'react'
import { Heart, Menu, X } from 'lucide-react'

interface NavigationProps {
  onBookNowClick: () => void
}

export default function Navigation({ onBookNowClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Heart className={`w-8 h-8 mr-3 transition-colors animate-pulse ${
                  isScrolled ? 'text-deep-rose-600' : 'text-shimmer-gold-300'
                }`} />
                <span className={`text-xl font-playfair font-bold transition-colors ${
                  isScrolled ? 'text-deep-rose-900' : 'text-white'
                }`}>
                  Affordable Wedding
                </span>
              </div>
              
              {/* TikTok Button */}
              <div className="flex flex-col items-center">
                <a
                  href="https://www.tiktok.com/@aukajr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:brightness-110 bg-black hover:bg-gray-800 border border-gray-700"
                  title="Follow us on TikTok"
                >
                  <svg 
                    className="w-5 h-5 text-white"
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.24 8.24 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.2-.26z"/>
                  </svg>
                </a>
                <span className={`text-xs font-medium mt-1 transition-colors ${
                  isScrolled ? 'text-deep-rose-600' : 'text-white/90'
                }`}>
                  Follow us
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className={`font-medium transition-colors hover:text-wedding-gold-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                How It Works
              </button>
              <button
                onClick={onBookNowClick}
                className={`font-medium transition-colors hover:text-wedding-gold-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                Book Wedding
              </button>
              <button
                onClick={() => scrollToSection('brand-partnership')}
                className={`font-medium transition-colors hover:text-wedding-gold-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                Brands
              </button>
              <button
                onClick={onBookNowClick}
                className="group flex items-center px-6 py-2 bg-gradient-to-r from-deep-rose-600 to-deep-rose-700 text-white font-semibold rounded-full hover:from-deep-rose-700 hover:to-deep-rose-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Heart className="w-4 h-4 mr-2 animate-pulse group-hover:animate-bounce" />
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left py-2 text-gray-700 font-medium hover:text-royal-purple-600"
              >
                How It Works
              </button>
              <button
                onClick={onBookNowClick}
                className="block w-full text-left py-2 text-gray-700 font-medium hover:text-royal-purple-600"
              >
                Book Wedding
              </button>
              <button
                onClick={() => scrollToSection('brand-partnership')}
                className="block w-full text-left py-2 text-gray-700 font-medium hover:text-royal-purple-600"
              >
                Brands
              </button>
              <button
                onClick={onBookNowClick}
                className="flex items-center justify-center w-full mt-4 px-6 py-3 bg-gradient-to-r from-deep-rose-600 to-deep-rose-700 text-white font-semibold rounded-full hover:from-deep-rose-700 hover:to-deep-rose-800 transition-all duration-300"
              >
                <Heart className="w-4 h-4 mr-2 animate-pulse" />
                Book Your Live Session
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-0"></div>
    </>
  )
}