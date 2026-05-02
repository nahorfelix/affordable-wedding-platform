'use client'

import { Heart, Sparkles, Users, Video } from 'lucide-react'

interface HeroSectionProps {
  onBookNowClick: () => void
}

export default function HeroSection({ onBookNowClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Semi-transparent gradient overlay to let background photos show through */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-rose-900/40 via-royal-purple-700/60 via-deep-rose-600/40 to-shimmer-gold-500/30"></div>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 animate-float">
          <Heart className="w-8 h-8 text-shimmer-gold-300 opacity-60 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce-slow">
          <Sparkles className="w-6 h-6 text-soft-blush-200 opacity-50" />
        </div>
        <div className="absolute bottom-40 left-20 animate-pulse-slow">
          <Video className="w-10 h-10 text-shimmer-gold-400 opacity-50" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '2s' }}>
          <Users className="w-8 h-8 text-soft-blush-100 opacity-40" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-30 flex items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-soft-blush-300/30">
            <Heart className="w-5 h-5 text-shimmer-gold-300 mr-2 animate-pulse" />
            <span className="text-white font-medium text-sm tracking-wide">
              AFFORDABLE LIVE WEDDINGS
            </span>
          </div>

          {/* Main headline */}
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-3xl px-8 py-6 mb-6 border border-white/20 shadow-2xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight love-glow floating-sparkles">
              Your Love Story,{' '}
              <span className="bg-gradient-to-r from-shimmer-gold-300 via-soft-blush-200 to-shimmer-gold-400 bg-clip-text text-transparent">
                Live to the World!
              </span>
              <span className="inline-block ml-4 text-6xl animate-bounce-slow">💍</span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed font-inter">
            Join <span className="font-semibold text-shimmer-gold-300">Affordable Wedding</span> for an unforgettable 
            TikTok LIVE wedding broadcast. Celebrate your union with a global congregation.
          </p>

          {/* Live stats ticker */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">LIVE NOW</span>
            </div>
            <div className="text-sm">
              <span className="font-bold text-shimmer-gold-300">1M+</span> Likes
            </div>
            <div className="text-sm">
              <span className="font-bold text-shimmer-gold-300">Global</span> Audience
            </div>
            <div className="text-sm">
              <span className="font-bold text-shimmer-gold-300">50+</span> Countries
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onBookNowClick}
            className="sparkle-button group relative inline-flex items-center px-12 py-4 text-lg font-semibold text-deep-rose-900 bg-gradient-to-r from-shimmer-gold-400 via-soft-blush-300 to-shimmer-gold-500 rounded-full hover:from-shimmer-gold-300 hover:via-soft-blush-200 hover:to-shimmer-gold-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-shimmer-gold-500/25 love-glow"
          >
            <Heart className="w-6 h-6 mr-3 animate-pulse group-hover:animate-bounce" />
            Book Your Live Session
            <Sparkles className="w-6 h-6 ml-3 group-hover:animate-spin" />
          </button>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}