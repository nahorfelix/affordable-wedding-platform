'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const weddingPhotos = [
  // Placeholder wedding photos - these would be replaced with actual high-quality images
  {
    id: 1,
    alt: 'Happy couple exchanging vows',
    style: 'bg-gradient-to-br from-soft-blush-200 to-deep-rose-200',
    position: { top: '10%', left: '15%' }
  },
  {
    id: 2,
    alt: 'Wedding rings on flower petals',
    style: 'bg-gradient-to-br from-shimmer-gold-200 to-wedding-gold-200',
    position: { top: '60%', right: '20%' }
  },
  {
    id: 3,
    alt: 'Bride and groom dancing',
    style: 'bg-gradient-to-br from-deep-rose-100 to-soft-blush-200',
    position: { bottom: '20%', left: '20%' }
  },
  {
    id: 4,
    alt: 'Wedding bouquet',
    style: 'bg-gradient-to-br from-royal-purple-200 to-deep-rose-200',
    position: { top: '30%', right: '15%' }
  },
  {
    id: 5,
    alt: 'Wedding cake',
    style: 'bg-gradient-to-br from-soft-blush-100 to-shimmer-gold-200',
    position: { bottom: '40%', right: '25%' }
  },
  {
    id: 6,
    alt: 'Couple holding hands',
    style: 'bg-gradient-to-br from-wedding-gold-100 to-deep-rose-100',
    position: { top: '70%', left: '25%' }
  }
]

export default function LoveStoryBackground() {
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([])
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    // Only run on client-side
    setIsClientSide(true)
  }, [])

  useEffect(() => {
    if (!isClientSide) return
    const showPhoto = () => {
      const availablePhotos = weddingPhotos.filter(photo => !visiblePhotos.includes(photo.id))
      if (availablePhotos.length === 0) return

      const randomPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)]
      setVisiblePhotos(prev => [...prev, randomPhoto.id])

      // Hide the photo after 4-6 seconds
      setTimeout(() => {
        setVisiblePhotos(prev => prev.filter(id => id !== randomPhoto.id))
      }, Math.random() * 2000 + 4000)
    }

    // Start showing photos after initial delay
    const initialDelay = setTimeout(showPhoto, 1000)

    // Continue showing photos at random intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance to show a photo each interval
        showPhoto()
      }
    }, 3000)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [visiblePhotos, isClientSide])

  if (!isClientSide) {
    return <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" /> // Return empty div to prevent hydration mismatch
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {visiblePhotos.map(photoId => {
          const photo = weddingPhotos.find(p => p.id === photoId)
          if (!photo) return null

          return (
            <motion.div
              key={photo.id}
              initial={{ 
                opacity: 0, 
                scale: 0.3, 
                rotate: Math.random() * 20 - 10,
                filter: 'blur(10px)'
              }}
              animate={{ 
                opacity: 0.15, 
                scale: 1, 
                rotate: Math.random() * 10 - 5,
                filter: 'blur(0px)'
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8, 
                rotate: Math.random() * 20 - 10,
                filter: 'blur(5px)'
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.25, 0.46, 0.45, 0.94] 
              }}
              className={`absolute w-32 h-24 md:w-40 md:h-32 lg:w-48 lg:h-36 rounded-2xl shadow-2xl ${photo.style}`}
              style={photo.position}
            >
              {/* Placeholder content - in production, this would be actual wedding photos */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <div className="text-center text-white/60 text-xs">
                  <div className="w-8 h-8 mx-auto mb-1 bg-white/20 rounded-full flex items-center justify-center">
                    <span>💕</span>
                  </div>
                  <div className="px-2 leading-tight">{photo.alt}</div>
                </div>
              </div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] rounded-2xl"></div>
            </motion.div>
          )
        })}
      </AnimatePresence>
      
      {/* Floating hearts */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.3, 0], 
              y: -100,
              x: Math.sin(i) * 50
            }}
            transition={{ 
              duration: 8,
              delay: i * 2,
              repeat: Infinity,
              ease: 'easeOut'
            }}
            className="absolute text-deep-rose-300 text-2xl"
            style={{ 
              left: `${10 + i * 15}%`,
              bottom: '0%'
            }}
          >
            <span>💖</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}