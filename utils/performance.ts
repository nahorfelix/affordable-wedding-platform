// Performance monitoring utilities for the background slideshow

export const performanceMonitor = {
  // Track frame rate to ensure smooth animations
  trackFrameRate: () => {
    let frames = 0
    let lastTime = performance.now()
    
    const tick = (currentTime: number) => {
      frames++
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime))
        
        // Log if FPS drops below 50 (which could indicate performance issues)
        if (fps < 50) {
          console.warn(`Low FPS detected: ${fps} fps`)
        }
        
        frames = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(tick)
    }
    
    requestAnimationFrame(tick)
  },

  // Optimize image loading based on connection speed
  getOptimalImageQuality: (): number => {
    // @ts-ignore - navigator.connection is experimental but widely supported
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    
    if (!connection) return 80 // Default quality
    
    const effectiveType = connection.effectiveType
    
    switch (effectiveType) {
      case 'slow-2g':
      case '2g':
        return 60 // Lower quality for slow connections
      case '3g':
        return 70 // Medium quality
      case '4g':
      default:
        return 80 // High quality for fast connections
    }
  },

  // Preload images intelligently based on viewport and user behavior
  shouldPreloadImage: (imageIndex: number, currentIndex: number): boolean => {
    // Always preload the next 2 images
    const nextImages = [
      (currentIndex + 1) % 7,
      (currentIndex + 2) % 7
    ]
    
    return nextImages.includes(imageIndex)
  },

  // Debounce function for performance-sensitive operations
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void => {
    let timeout: NodeJS.Timeout | null = null
    
    return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }
}

// Initialize performance monitoring in development
if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    performanceMonitor.trackFrameRate()
  }
}