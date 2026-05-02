// Local storage service for demo purposes
// In a real app, this would connect to Supabase, Firebase, or another database

export interface BookingData {
  id: string
  brideName: string
  groomName: string
  brideTikTok: string
  groomTikTok: string
  weddingDate: string
  email: string
  vibe: string
  photos: string[]
  legalConsent: boolean
  termsOfEngagement: boolean
  createdAt: string
}

export interface BrandInquiryData {
  id: string
  companyName: string
  contactEmail: string
  message: string
  createdAt: string
}

// Booking storage functions
export const saveBooking = (bookingData: Omit<BookingData, 'id' | 'createdAt'>): string => {
  const id = generateId()
  const booking: BookingData = {
    ...bookingData,
    id,
    createdAt: new Date().toISOString()
  }

  const existingBookings = getBookings()
  const updatedBookings = [...existingBookings, booking]
  
  localStorage.setItem('adminBookings', JSON.stringify(updatedBookings))
  return id
}

export const getBookings = (): BookingData[] => {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem('adminBookings')
  return stored ? JSON.parse(stored) : []
}

// Brand inquiry storage functions
export const saveBrandInquiry = (inquiryData: Omit<BrandInquiryData, 'id' | 'createdAt'>): string => {
  const id = generateId()
  const inquiry: BrandInquiryData = {
    ...inquiryData,
    id,
    createdAt: new Date().toISOString()
  }

  const existingInquiries = getBrandInquiries()
  const updatedInquiries = [...existingInquiries, inquiry]
  
  localStorage.setItem('adminBrandInquiries', JSON.stringify(updatedInquiries))
  return id
}

export const getBrandInquiries = (): BrandInquiryData[] => {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem('adminBrandInquiries')
  return stored ? JSON.parse(stored) : []
}

// Utility function to generate IDs
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Photo upload simulation (in real app, use cloud storage)
export const uploadPhotos = async (files: File[]): Promise<string[]> => {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // In a real app, upload to cloud storage and return URLs
  return files.map((file, index) => `uploaded_photo_${Date.now()}_${index}.${file.name.split('.').pop()}`)
}