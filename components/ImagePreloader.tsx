'use client'

import { useEffect } from 'react'

interface ImagePreloaderProps {
  imageUrls: string[]
  priority?: number[] // Indices of priority images to load first
}

export default function ImagePreloader({ imageUrls, priority = [0, 1] }: ImagePreloaderProps) {
  useEffect(() => {
    // Preload priority images immediately
    priority.forEach(index => {
      if (imageUrls[index]) {
        const img = new Image()
        img.src = imageUrls[index]
      }
    })

    // Preload remaining images with a slight delay to avoid blocking
    const remainingImages = imageUrls
      .map((url, index) => ({ url, index }))
      .filter(({ index }) => !priority.includes(index))

    const preloadRemaining = () => {
      remainingImages.forEach(({ url }, arrayIndex) => {
        setTimeout(() => {
          const img = new Image()
          img.src = url
        }, arrayIndex * 200) // Stagger loading by 200ms each
      })
    }

    // Start preloading remaining images after a short delay
    const timeoutId = setTimeout(preloadRemaining, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [imageUrls, priority])

  return null // This component doesn't render anything
}