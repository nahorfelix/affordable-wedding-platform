'use client'

import { useRef } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import BookingForm from '@/components/BookingForm'
import HowItWorks from '@/components/HowItWorks'
import BrandVisibility from '@/components/BrandVisibility'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

const LoveStoryBackground = dynamic(() => import('@/components/LoveStoryBackground'), {
  ssr: false
})

const SimpleBackgroundSlideshow = dynamic(() => import('@/components/SimpleBackgroundSlideshow'), {
  ssr: false
})

export default function Home() {
  const bookingFormRef = useRef<HTMLDivElement>(null)

  const scrollToBookingForm = () => {
    bookingFormRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <main className="min-h-screen relative">
      {/* Simple Background Slideshow - Strictly behind all content */}
      <SimpleBackgroundSlideshow />
      
      {/* Love Story Background - Floating elements */}
      <LoveStoryBackground />

      {/* Navigation */}
      <Navigation onBookNowClick={scrollToBookingForm} />

      {/* Content wrapper with proper z-index */}
      <div className="relative z-content">
        {/* Hero Section */}
        <HeroSection onBookNowClick={scrollToBookingForm} />

        {/* How It Works Section */}
        <div id="how-it-works">
          <HowItWorks />
        </div>

        {/* Booking Form Section */}
        <div ref={bookingFormRef}>
          <BookingForm />
        </div>

        {/* Brand Visibility Section */}
        <div id="brand-partnership">
          <BrandVisibility />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}