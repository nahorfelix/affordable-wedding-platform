'use client'

import { Heart } from 'lucide-react'

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <Heart className="w-8 h-8 text-royal-purple-600 animate-pulse" />
        <div className="absolute inset-0 rounded-full border-2 border-royal-purple-200 border-t-royal-purple-600 animate-spin"></div>
      </div>
    </div>
  )
}