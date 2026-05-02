'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Lock, Eye, EyeOff } from 'lucide-react'
import { AuthService } from '@/lib/auth'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already authenticated
    if (AuthService.isAuthenticated()) {
      router.push('/auka/dashboard')
    }
    
    // Initialize default admin user
    AuthService.initializeDefaultAdmin()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const authResult = await AuthService.authenticate(credentials.username, credentials.password)
      
      if (authResult.success && authResult.user) {
        // Create session
        AuthService.createSession(authResult.user)
        router.push('/auka/dashboard')
      } else {
        setError(authResult.error || 'Authentication failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred. Please try again.')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-purple-900 via-deep-rose-800 to-shimmer-gold-600 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-deep-rose-600 mr-2 animate-pulse" />
            <h1 className="text-2xl font-playfair font-bold text-royal-purple-900">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-royal-purple-600 text-sm">
            Affordable Wedding Management Portal
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-royal-purple-800 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-4 py-3 border border-royal-purple-200 rounded-xl focus:ring-2 focus:ring-deep-rose-500 focus:border-deep-rose-500 transition-colors bg-white/50"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-royal-purple-800 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 pr-12 border border-royal-purple-200 rounded-xl focus:ring-2 focus:ring-deep-rose-500 focus:border-deep-rose-500 transition-colors bg-white/50"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-royal-purple-400 hover:text-royal-purple-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-deep-rose-600 to-royal-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-deep-rose-700 hover:to-royal-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock className="w-5 h-5" />
            <span>{isLoading ? 'Authenticating...' : 'Login to Dashboard'}</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-royal-purple-600 hover:text-deep-rose-600 text-sm transition-colors"
          >
            ← Back to Main Site
          </a>
        </div>
      </div>
    </div>
  )
}