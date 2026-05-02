'use client'

import { useState, useEffect } from 'react'

// High-quality wedding images from Unsplash
const weddingImages = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2187&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
  'https://images.unsplash.com/photo-1594736797933-d0ca9ba70179?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80'
]

export default function SimpleBackgroundSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    // Ensure this only runs on client-side to prevent hydration issues
    setIsClientSide(true)

    // Start the slideshow immediately after mounting
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % weddingImages.length
      )
    }, 6000) // Change image every 6 seconds

    return () => clearInterval(interval)
  }, [])

  // Always render something to ensure there's always a background image visible
  const currentImage = weddingImages[currentImageIndex]

  return (
    <div 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -10 }}
    >
      {/* Always show a background image - no conditional rendering to avoid hydration issues */}
      <div
        className="absolute inset-0 transition-opacity duration-2000 ease-in-out"
        style={{
          backgroundImage: `url(${currentImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isClientSide ? 1.0 : 0.8 // Show image immediately, make it full opacity after client-side hydration
        }}
      />
      
      {/* Very light overlay to maintain theme while showing photos */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(75, 0, 130, 0.2) 50%, rgba(199, 21, 133, 0.1) 100%)',
          zIndex: -9
        }}
      />
    </div>
  )
}