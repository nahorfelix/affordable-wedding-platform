'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'

// High-quality wedding images from Unsplash with proper dimensions and optimization
const weddingImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Wedding ceremony with bride and groom',
    preload: true // First image loads immediately
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=2187&q=80',
    alt: 'Beautiful wedding celebration',
    preload: false
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80',
    alt: 'Bride and groom dancing',
    preload: false
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1594736797933-d0ca9ba70179?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Wedding rings and bouquet',
    preload: false
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Wedding couple at sunset',
    preload: false
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80',
    alt: 'Wedding venue decoration',
    preload: false
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=2148&q=80',
    alt: 'Wedding kiss moment',
    preload: false
  }
]

interface ImageState {
  currentIndex: number
  nextIndex: number
  isTransitioning: boolean
}

function BackgroundSlideshowComponent() {
  const [isMounted, setIsMounted] = useState(false)
  const [imageState, setImageState] = useState<ImageState>({
    currentIndex: 0,
    nextIndex: 1,
    isTransitioning: false
  })

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]))
  const intervalRef = useRef<NodeJS.Timeout>()
  const containerRef = useRef<HTMLDivElement>(null)

  // Preload next image with better error handling
  const preloadImage = useCallback((index: number) => {
    if (loadedImages.has(index) || index >= weddingImages.length) return

    const img = new Image()
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, index]))
    }
    img.onerror = () => {
      console.warn(`Failed to load image at index ${index}`)
      // Still mark as "loaded" to prevent infinite retries
      setLoadedImages(prev => new Set([...prev, index]))
    }
    img.src = weddingImages[index].url
  }, [loadedImages])

  // Transition to next image
  const transitionToNext = useCallback(() => {
    setImageState(prev => {
      const nextIndex = (prev.currentIndex + 1) % weddingImages.length
      const afterNextIndex = (nextIndex + 1) % weddingImages.length
      
      // Preload the image after next
      preloadImage(afterNextIndex)
      
      return {
        currentIndex: prev.currentIndex,
        nextIndex: nextIndex,
        isTransitioning: true
      }
    })

    // Complete transition after fade duration
    setTimeout(() => {
      setImageState(prev => ({
        currentIndex: prev.nextIndex,
        nextIndex: (prev.nextIndex + 1) % weddingImages.length,
        isTransitioning: false
      }))
    }, 2000) // 2 second fade transition
  }, [preloadImage])

  useEffect(() => {
    // Preload first few images
    preloadImage(1)
    preloadImage(2)

    // Start slideshow timer
    intervalRef.current = setInterval(transitionToNext, 6000) // 6 seconds total (4s display + 2s transition)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [transitionToNext, preloadImage])

  // Don't render on server to prevent hydration issues
  if (!isMounted) {
    return null
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none background-slideshow"
      style={{ zIndex: -10 }} // Strictly behind all content
    >
      {/* Current Image */}
      <div
        className="absolute inset-0 transition-opacity duration-2000 ease-in-out will-change-opacity"
        style={{ 
          opacity: imageState.isTransitioning ? 0 : 1.0, // Maximum visibility for testing: 100%
          backgroundImage: `url(${weddingImages[imageState.currentIndex].url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(0)', // Hardware acceleration
          backfaceVisibility: 'hidden'
        }}
      />

      {/* Next Image (for seamless transition) */}
      <div
        className="absolute inset-0 transition-opacity duration-2000 ease-in-out will-change-opacity"
        style={{ 
          opacity: imageState.isTransitioning ? 1.0 : 0, // Fades in as current fades out
          backgroundImage: `url(${weddingImages[imageState.nextIndex].url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: 'translateZ(0)', // Hardware acceleration
          backfaceVisibility: 'hidden'
        }}
      />

      {/* Preloaded images (hidden, for performance optimization) */}
      <div className="sr-only" aria-hidden="true">
        {weddingImages.map((image, index) => (
          <img
            key={image.id}
            src={image.url}
            alt=""
            loading={image.preload ? "eager" : "lazy"}
            style={{ display: 'none' }}
            onLoad={() => setLoadedImages(prev => new Set([...prev, index]))}
            onError={() => setLoadedImages(prev => new Set([...prev, index]))}
          />
        ))}
      </div>

      {/* Subtle overlay for enhanced readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(255,255,255,0.01) 50%, rgba(0,0,0,0.02) 100%)',
          zIndex: -9,
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}

// Export as client-only component to prevent hydration issues
const BackgroundSlideshow = dynamic(() => Promise.resolve(BackgroundSlideshowComponent), {
  ssr: false
})

export default BackgroundSlideshow