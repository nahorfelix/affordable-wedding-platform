'use client'

import { 
  Calendar, 
  Upload, 
  Video, 
  Heart,
  CheckCircle,
  Sparkles,
  Users,
  Star
} from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Calendar,
      title: '1. Book Your Date',
      description: 'Fill out our simple booking form with your details, preferred date, and wedding vibe. We\'ll confirm your slot within 24 hours.',
      color: 'from-royal-purple-500 to-royal-purple-600',
      bgColor: 'bg-royal-purple-50',
      borderColor: 'border-royal-purple-200'
    },
    {
      icon: Upload,
      title: '2. Upload Your Photos',
      description: 'Share up to 5 beautiful photos of your journey together. We\'ll create a stunning visual backdrop for your live ceremony.',
      color: 'from-wedding-gold-500 to-wedding-gold-600',
      bgColor: 'bg-wedding-gold-50',
      borderColor: 'border-wedding-gold-200'
    },
    {
      icon: Video,
      title: '3. Go LIVE Together',
      description: 'Join ASKOFUU AUKA on TikTok LIVE for your unforgettable wedding broadcast. Share your love story with the world!',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    }
  ]

  const features = [
    { icon: Users, text: 'Global Audience' },
    { icon: Heart, text: 'Live Blessings' },
    { icon: Sparkles, text: 'Interactive Chat' },
    { icon: Star, text: 'Viral Moments' }
  ]

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block bg-gradient-to-r from-soft-blush-50 via-white to-soft-blush-50 rounded-3xl px-8 py-4 mb-6 shadow-lg border border-soft-blush-200">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-royal-purple-900 love-glow floating-sparkles">
              How It{' '}
              <span className="bg-gradient-to-r from-shimmer-gold-500 via-soft-blush-400 to-shimmer-gold-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to broadcast your love story to the world and create memories that last forever.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-wedding-gold-400 rounded-full"></div>
                  </div>
                </div>
              )}

              <div className={`relative z-10 ${step.bgColor} ${step.borderColor} border-2 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl mb-6 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="bg-gradient-to-br from-deep-rose-900 via-royal-purple-800 to-deep-rose-800 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-playfair font-bold text-white mb-4">
              What Makes Our LIVE Weddings Special?
            </h3>
            <p className="text-white/90 text-lg">
              Experience the magic of sharing your special moment with a global community
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4 border border-white/30">
                  <feature.icon className="w-8 h-8 text-shimmer-gold-300" />
                </div>
                <h4 className="text-white font-semibold text-lg">{feature.text}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-deep-rose-600 mb-2">500+</div>
            <div className="text-gray-600 font-medium">Happy Couples</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-shimmer-gold-600 mb-2">1M+</div>
            <div className="text-gray-600 font-medium">Live Viewers</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl font-bold text-pink-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Countries Reached</div>
          </div>
        </div>
      </div>
    </section>
  )
}