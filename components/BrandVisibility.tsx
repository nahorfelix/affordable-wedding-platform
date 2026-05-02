'use client'

import { useState } from 'react'
import { 
  Sparkles, 
  Star, 
  TrendingUp, 
  Users, 
  Mail,
  ExternalLink,
  Megaphone,
  Crown,
  X,
  Send,
  Heart
} from 'lucide-react'

export default function BrandVisibility() {
  const [showInquiryModal, setShowInquiryModal] = useState(false)
  const [inquiryForm, setInquiryForm] = useState({
    companyName: '',
    contactEmail: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleBrandInquiry = () => {
    setShowInquiryModal(true)
  }

  const handleSubmitInquiry = async () => {
    if (!inquiryForm.companyName || !inquiryForm.contactEmail || !inquiryForm.message) {
      alert('Please fill in all fields')
      return
    }

    setIsSubmitting(true)

    try {
      // Save inquiry to local storage for admin dashboard
      const { saveBrandInquiry } = await import('@/lib/storage')
      
      const inquiryId = saveBrandInquiry({
        companyName: inquiryForm.companyName,
        contactEmail: inquiryForm.contactEmail,
        message: inquiryForm.message
      })

      console.log('Brand inquiry saved with ID:', inquiryId)
      
      // Also open mailto as backup
      const subject = encodeURIComponent('Brand Partnership Inquiry - Affordable Wedding LIVE')
      const body = encodeURIComponent(`Hello Affordable Wedding Team,

I'm interested in partnering with your TikTok LIVE wedding broadcasts. 

Brand/Company: ${inquiryForm.companyName}
Email: ${inquiryForm.contactEmail}

Message: ${inquiryForm.message}

Looking forward to discussing this opportunity!

Best regards,`)

      window.open(`mailto:partnerships@askofuauka.com?subject=${subject}&body=${body}`)

      // Reset form and close modal
      setInquiryForm({ companyName: '', contactEmail: '', message: '' })
      setShowInquiryModal(false)
      alert('Thank you! Your inquiry has been submitted and our team will respond within 24 hours.')
      
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('There was an error submitting your inquiry. Please try again.')
    }

    setIsSubmitting(false)
    const subject = encodeURIComponent('Brand Partnership Inquiry - Affordable Wedding LIVE')
    const body = encodeURIComponent(`Hello Affordable Wedding Team,

I'm interested in partnering with your TikTok LIVE wedding broadcasts. 

Brand/Company: 
Contact Person: 
Email: 
Phone: 

Partnership Interest:
□ Product Placement
□ Sponsor Shoutouts
□ Custom Brand Integration
□ Event Sponsorship

Additional Details:


Looking forward to discussing this opportunity!

Best regards,`)

    window.open(`mailto:partnerships@askofuauka.com?subject=${subject}&body=${body}`)
  }

  return (
    <section className="py-12 bg-gradient-to-br from-deep-rose-900 via-royal-purple-800 to-deep-rose-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-pulse">
          <Crown className="w-16 h-16 text-shimmer-gold-400" />
        </div>
        <div className="absolute top-40 right-20 animate-bounce-slow">
          <Star className="w-12 h-12 text-soft-blush-300" />
        </div>
        <div className="absolute bottom-20 left-20 animate-float">
          <Sparkles className="w-14 h-14 text-shimmer-gold-400" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center bg-wedding-gold-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-wedding-gold-400/30">
            <Megaphone className="w-5 h-5 text-wedding-gold-300 mr-2" />
            <span className="text-wedding-gold-200 font-medium text-sm tracking-wide">
              BRAND PARTNERSHIPS
            </span>
          </div>

          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-3xl px-8 py-4 mb-6 border border-white/20 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white love-glow floating-sparkles">
              Grow Your Brand With{' '}
              <span className="bg-gradient-to-r from-shimmer-gold-300 via-soft-blush-200 to-shimmer-gold-500 bg-clip-text text-transparent">
                TikTok LIVE Weddings
              </span>
            </h2>
          </div>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            <strong>Boost your brand's reach with our TikTok LIVE wedding events!</strong> We promote increased viewership, 
            grow your followers, and expand your brand to millions of engaged viewers during our live celebrations.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          {[
            { icon: Users, value: '50K+', label: 'Live Viewers Per Event' },
            { icon: TrendingUp, value: '1M+', label: 'Likes Per Event' },
            { icon: Star, value: '50+', label: 'Countries Reached' },
            { icon: Sparkles, value: '10x', label: 'Brand Reach Multiplier' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-wedding-gold-500/20 backdrop-blur-sm rounded-full mb-4 border border-wedding-gold-400/30">
                <stat.icon className="w-8 h-8 text-wedding-gold-300" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Partnership Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-wedding-gold-500 rounded-xl flex items-center justify-center mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Viewership Growth</h3>
            </div>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-wedding-gold-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Massive live audience exposure during events
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-wedding-gold-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Direct brand mentions to engaged viewers
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-wedding-gold-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Product showcases during peak viewing moments
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-royal-purple-500 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Follower Acquisition</h3>
            </div>
            <ul className="space-y-3 text-white/90">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-wedding-gold-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Drive followers to your brand's TikTok account
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-wedding-gold-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Cross-platform social media growth
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-wedding-gold-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                Viral hashtag campaigns featuring your brand
              </li>
            </ul>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-shimmer-gold-500/20 to-deep-rose-500/20 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-shimmer-gold-400/30">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 mr-3 text-shimmer-gold-300" />
              Why Partner With Our TikTok LIVE Events?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-white/90">
              <div className="text-center">
                <Users className="w-12 h-12 text-shimmer-gold-300 mx-auto mb-3" />
                <h4 className="font-bold text-lg text-white mb-2">Massive Viewership</h4>
                <p className="text-sm">Get your brand in front of 50K+ live viewers during our wedding events, creating instant brand awareness.</p>
              </div>
              <div className="text-center">
                <Heart className="w-12 h-12 text-shimmer-gold-300 mx-auto mb-3" />
                <h4 className="font-bold text-lg text-white mb-2">Massive Engagement</h4>
                <p className="text-sm">Generate 1M+ likes per event with highly engaged audiences who actively interact with your brand.</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-shimmer-gold-300 mx-auto mb-3" />
                <h4 className="font-bold text-lg text-white mb-2">Follower Growth</h4>
                <p className="text-sm">We actively promote your brand and drive massive follower growth to your social media accounts globally.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={handleBrandInquiry}
            className="sparkle-button group inline-flex items-center px-10 py-4 text-lg font-semibold text-deep-rose-900 bg-gradient-to-r from-shimmer-gold-400 via-soft-blush-300 to-shimmer-gold-500 rounded-full hover:from-shimmer-gold-300 hover:via-soft-blush-200 hover:to-shimmer-gold-400 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-shimmer-gold-500/25 love-glow"
          >
            <Mail className="w-6 h-6 mr-3 group-hover:animate-pulse" />
            Brand Inquiry
            <ExternalLink className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-white/70 text-sm mt-4">
            Response within 24 hours • Custom packages available
          </p>
        </div>
      </div>

      {/* Brand Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-royal-purple-100">
              <h3 className="text-lg font-semibold text-royal-purple-900">
                Brand Partnership Inquiry
              </h3>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="text-royal-purple-400 hover:text-royal-purple-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-royal-purple-800 mb-2">
                  Company/Brand Name *
                </label>
                <input
                  type="text"
                  value={inquiryForm.companyName}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-4 py-3 border border-royal-purple-200 rounded-xl focus:ring-2 focus:ring-deep-rose-500 focus:border-deep-rose-500"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-royal-purple-800 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={inquiryForm.contactEmail}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="w-full px-4 py-3 border border-royal-purple-200 rounded-xl focus:ring-2 focus:ring-deep-rose-500 focus:border-deep-rose-500"
                  placeholder="your@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-royal-purple-800 mb-2">
                  Partnership Details *
                </label>
                <textarea
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full h-32 px-4 py-3 border border-royal-purple-200 rounded-xl focus:ring-2 focus:ring-deep-rose-500 focus:border-deep-rose-500 resize-none"
                  placeholder="Tell us about your brand and how you'd like us to promote your viewership, grow your followers, and expand your reach during our TikTok LIVE wedding events."
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowInquiryModal(false)}
                  className="px-4 py-2 text-royal-purple-600 hover:text-royal-purple-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitInquiry}
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 px-6 py-2 bg-deep-rose-600 text-white rounded-lg hover:bg-deep-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}