'use client'

import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-deep-rose-900 to-royal-purple-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="w-8 h-8 text-shimmer-gold-400 mr-3 animate-pulse" />
              <h3 className="text-2xl font-playfair font-bold">Affordable Wedding</h3>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Making love stories go viral, one LIVE wedding at a time. 
              Celebrating unions with a global congregation since 2023.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-shimmer-gold-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-shimmer-gold-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-shimmer-gold-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#booking-form" className="text-white/80 hover:text-wedding-gold-300 transition-colors">
                  Book Wedding
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-wedding-gold-300 transition-colors">
                  Previous Weddings
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-wedding-gold-300 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-wedding-gold-300 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-shimmer-gold-400" />
                <span className="text-white/80 text-sm">hello@affordablewedding.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-shimmer-gold-400" />
                <span className="text-white/80 text-sm">+1 (555) WEDDING</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-shimmer-gold-400 mt-0.5" />
                <span className="text-white/80 text-sm">Broadcasting Globally<br />Based in Love</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-white/60 text-sm">
              © 2026 Affordable Wedding TikTok LIVE. All rights reserved.
            </p>
            <p className="text-white/50 text-xs mt-1">
              Created and designed by{' '}
              <a 
                href="https://github.com/nahorfelix" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-shimmer-gold-300 hover:text-shimmer-gold-200 transition-colors underline decoration-dotted underline-offset-2"
              >
                Felix Nahor
              </a>
            </p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/60 hover:text-shimmer-gold-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-shimmer-gold-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}