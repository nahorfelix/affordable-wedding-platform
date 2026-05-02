'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Upload, 
  X, 
  Heart, 
  Calendar, 
  Users, 
  Mail, 
  AtSign,
  Music,
  AlertTriangle,
  CheckCircle,
  Loader2
} from 'lucide-react'

const formSchema = z.object({
  brideName: z.string().min(2, 'Bride name must be at least 2 characters'),
  groomName: z.string().min(2, 'Groom name must be at least 2 characters'),
  brideTikTok: z.string().min(1, 'Bride TikTok username is required'),
  groomTikTok: z.string().min(1, 'Groom TikTok username is required'),
  weddingDate: z.string().min(1, 'Wedding date preference is required'),
  email: z.string().email('Please enter a valid email address'),
  weddingVibe: z.string().min(1, 'Please select a wedding vibe'),
  legalConsent: z.boolean().refine(val => val === true, {
    message: 'You must read and agree to the legal notice'
  }),
  termsOfEngagement: z.boolean().refine(val => val === true, {
    message: 'You must agree to the Terms of Engagement'
  })
})

type FormData = z.infer<typeof formSchema>

const vibeOptions = [
  { value: '', label: 'Select your wedding vibe...' },
  { value: 'high-energy', label: 'High Energy Praise' },
  { value: 'romantic-soft', label: 'Romantic & Soft' },
  { value: 'traditional', label: 'Traditional/Congregational' }
]

export default function BookingForm() {
  const [photos, setPhotos] = useState<File[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const legalConsent = watch('legalConsent')
  const termsOfEngagement = watch('termsOfEngagement')

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFiles = (fileList: File[]) => {
    const imageFiles = fileList.filter(file => file.type.startsWith('image/'))
    const remainingSlots = 5 - photos.length
    const newPhotos = imageFiles.slice(0, remainingSlots)
    
    setPhotos(prev => [...prev, ...newPhotos])
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      // Import storage service
      const { saveBooking, uploadPhotos } = await import('@/lib/storage')
      
      // Upload photos if any
      let photoUrls: string[] = []
      if (photos && photos.length > 0) {
        photoUrls = await uploadPhotos(photos)
      }
      
      // Save booking data to local storage (admin dashboard will read from here)
      const bookingId = saveBooking({
        brideName: data.brideName,
        groomName: data.groomName,
        brideTikTok: data.brideTikTok,
        groomTikTok: data.groomTikTok,
        weddingDate: data.weddingDate,
        email: data.email,
        vibe: data.weddingVibe,
        photos: photoUrls,
        legalConsent: data.legalConsent,
        termsOfEngagement: data.termsOfEngagement
      })
      
      console.log('Booking saved with ID:', bookingId)
      
      // Also send to Formspree as backup (optional)
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString())
      })
      photos.forEach((photo, index) => {
        formData.append(`photo_${index}`, photo)
      })
      
      // Try to send to Formspree (will fail gracefully if not configured)
      try {
        await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
      } catch (formspreeError) {
        console.log('Formspree not configured, data saved locally for admin dashboard')
      }
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h3 className="text-3xl font-playfair font-bold text-deep-rose-900 mb-4">
          Booking Submitted Successfully! 🎉
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Thank you for choosing Affordable Wedding TikTok LIVE! We'll review your submission 
          and get back to you within 24 hours with next steps for your special day.
        </p>
      </div>
    )
  }

  return (
    <section id="booking-form" className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-soft-blush-50 via-white to-soft-blush-50 rounded-3xl px-8 py-4 mb-6 shadow-lg border border-soft-blush-200">
            <h2 className="text-4xl font-playfair font-bold bg-gradient-to-r from-deep-rose-900 via-deep-rose-700 to-deep-rose-900 bg-clip-text text-transparent love-glow floating-sparkles">
              Book Your Live Wedding Experience
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to share your love story with the world? Fill out the details below 
            and let's make your wedding unforgettable!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Couple Names */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-2" />
                Bride's Full Name
              </label>
              <input
                {...register('brideName')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-deep-rose-500 focus:outline-none transition-colors"
                placeholder="Enter bride's full name"
              />
              {errors.brideName && (
                <p className="text-red-500 text-sm mt-1">{errors.brideName.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Users className="inline w-4 h-4 mr-2" />
                Groom's Full Name
              </label>
              <input
                {...register('groomName')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-deep-rose-500 focus:outline-none transition-colors"
                placeholder="Enter groom's full name"
              />
              {errors.groomName && (
                <p className="text-red-500 text-sm mt-1">{errors.groomName.message}</p>
              )}
            </div>
          </div>

          {/* TikTok Usernames */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <AtSign className="inline w-4 h-4 mr-2" />
                Bride's TikTok Username
              </label>
              <input
                {...register('brideTikTok')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-deep-rose-500 focus:outline-none transition-colors"
                placeholder="@username"
              />
              {errors.brideTikTok && (
                <p className="text-red-500 text-sm mt-1">{errors.brideTikTok.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <AtSign className="inline w-4 h-4 mr-2" />
                Groom's TikTok Username
              </label>
              <input
                {...register('groomTikTok')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-deep-rose-500 focus:outline-none transition-colors"
                placeholder="@username"
              />
              {errors.groomTikTok && (
                <p className="text-red-500 text-sm mt-1">{errors.groomTikTok.message}</p>
              )}
            </div>
          </div>

          {/* Wedding Date and Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="form-field">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-2" />
                Wedding Date Preference
              </label>
              <input
                {...register('weddingDate')}
                type="date"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-deep-rose-500 focus:outline-none transition-colors"
              />
              {errors.weddingDate && (
                <p className="text-red-500 text-sm mt-1">{errors.weddingDate.message}</p>
              )}
            </div>

            <div className="form-field">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-deep-rose-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Wedding Vibe */}
          <div className="form-field">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Music className="inline w-4 h-4 mr-2" />
              Wedding Vibe
            </label>
            <select
              {...register('weddingVibe')}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-royal-purple-500 focus:outline-none transition-colors"
            >
              {vibeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.weddingVibe && (
              <p className="text-red-500 text-sm mt-1">{errors.weddingVibe.message}</p>
            )}
          </div>

          {/* Photo Upload */}
          <div className="form-field">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Upload className="inline w-4 h-4 mr-2" />
              Upload Your Photos ({photos.length}/5)
            </label>
            
            <div
              className={`upload-zone border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                dragActive 
                  ? 'border-royal-purple-500 bg-royal-purple-50 dragover' 
                  : 'border-gray-300 hover:border-royal-purple-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 mx-auto text-royal-purple-500 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drop your photos here or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Maximum 5 photos • PNG, JPG, JPEG up to 10MB each
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFiles(Array.from(e.target.files || []))}
              />
            </div>

            {/* Photo Preview */}
            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Legal Consent Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-amber-800 mb-3">IMPORTANT LEGAL NOTICE</h4>
                <p className="text-amber-700 text-sm leading-relaxed mb-4">
                  Legalising your marriage is entirely the couple's responsibility. A TikTok LIVE wedding 
                  produced with Affordable Wedding is a social and celebratory broadcast. It does not create a 
                  statutory marriage recognised by any government. Compliance with local laws is the sole 
                  duty of the couple.
                </p>
                
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    {...register('legalConsent')}
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-deep-rose-600 border-2 border-amber-300 rounded focus:ring-deep-rose-500"
                  />
                  <span className="text-sm text-amber-800 font-medium">
                    I/We have read the legal notice and understand this is a social broadcast.
                  </span>
                </label>
                
                {errors.legalConsent && (
                  <p className="text-red-500 text-sm mt-2">{errors.legalConsent.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Terms of Engagement Section */}
          <div className="bg-gradient-to-br from-deep-rose-50 to-soft-blush-50 border border-deep-rose-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <Heart className="w-6 h-6 text-deep-rose-600 flex-shrink-0 mt-1 animate-pulse" />
              <div className="flex-1">
                <h4 className="font-semibold text-deep-rose-800 mb-3">TERMS OF ENGAGEMENT</h4>
                <p className="text-deep-rose-700 text-sm leading-relaxed mb-4">
                  <strong>Script & Rights:</strong> All scripts and rights are owned exclusively by ASKOFUU AUKA. 
                  By booking, you agree that ASKOFUU AUKA maintains full creative control of the event according 
                  to his script. He reserves the right to limit the number of gadgets/devices that can go live 
                  during the event to ensure broadcast quality.
                </p>
                
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    {...register('termsOfEngagement')}
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-deep-rose-600 border-2 border-deep-rose-300 rounded focus:ring-deep-rose-500"
                  />
                  <span className="text-sm text-deep-rose-800 font-medium">
                    I understand that the script and rights for this event are owned by ASKOFUU AUKA. By booking, I agree that he has full control over the event proceedings and may limit the number of live gadgets/devices to ensure broadcast quality.
                  </span>
                </label>
                
                {errors.termsOfEngagement && (
                  <p className="text-red-500 text-sm mt-2">{errors.termsOfEngagement.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting || !legalConsent || !termsOfEngagement}
              className="sparkle-button inline-flex items-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-deep-rose-600 via-deep-rose-700 to-deep-rose-800 rounded-full hover:from-deep-rose-700 hover:via-deep-rose-800 hover:to-deep-rose-900 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none love-glow"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6 mr-3 animate-pulse" />
                  Book Your Live Wedding
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}