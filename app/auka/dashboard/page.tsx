'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Heart, 
  LogOut, 
  Users, 
  Building2, 
  Calendar, 
  Mail, 
  ExternalLink,
  Reply,
  X,
  Send,
  Settings,
  Key,
  Eye,
  EyeOff
} from 'lucide-react'
import { AuthService } from '@/lib/auth'

interface Booking {
  id: string
  brideName: string
  groomName: string
  brideTikTok: string
  groomTikTok: string
  weddingDate: string
  email: string
  vibe: string
  photos: string[]
  createdAt: string
}

interface BrandInquiry {
  id: string
  companyName: string
  contactEmail: string
  message: string
  createdAt: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'bookings' | 'brands'>('bookings')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [brandInquiries, setBrandInquiries] = useState<BrandInquiry[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showReplyModal, setShowReplyModal] = useState(false)
  const [replyData, setReplyData] = useState<{ type: 'booking' | 'brand', id: string, email: string, name: string } | null>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [currentUser, setCurrentUser] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    // Check authentication using AuthService
    if (!AuthService.isAuthenticated()) {
      router.push('/auka')
      return
    }
    setIsAuthenticated(true)

    // Get current user info
    const user = AuthService.getCurrentUser()
    if (user) {
      setCurrentUser(user.username)
    }

    // Extend session on activity
    AuthService.extendSession()

    // Load data from localStorage or mock data
    loadMockData()
  }, [router])

  const loadMockData = () => {
    // Load existing bookings from localStorage or create mock data
    const storedBookings = localStorage.getItem('adminBookings')
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    } else {
      // Mock data for demonstration
      const mockBookings: Booking[] = [
        {
          id: '1',
          brideName: 'Sarah Johnson',
          groomName: 'Michael Chen',
          brideTikTok: '@sarahj_bride',
          groomTikTok: '@mike_chen2024',
          weddingDate: '2026-06-15',
          email: 'sarah.johnson@email.com',
          vibe: 'romantic-soft',
          photos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg'],
          createdAt: '2026-05-01T10:30:00Z'
        },
        {
          id: '2',
          brideName: 'Emma Wilson',
          groomName: 'David Brown',
          brideTikTok: '@emmaweds',
          groomTikTok: '@davidb_live',
          weddingDate: '2026-07-22',
          email: 'emma.wilson@email.com',
          vibe: 'high-energy',
          photos: ['photo4.jpg', 'photo5.jpg'],
          createdAt: '2026-05-02T14:15:00Z'
        }
      ]
      setBookings(mockBookings)
      localStorage.setItem('adminBookings', JSON.stringify(mockBookings))
    }

    // Load brand inquiries
    const storedInquiries = localStorage.getItem('adminBrandInquiries')
    if (storedInquiries) {
      setBrandInquiries(JSON.parse(storedInquiries))
    } else {
      const mockInquiries: BrandInquiry[] = [
        {
          id: '1',
          companyName: 'Elegant Flowers Co.',
          contactEmail: 'partnerships@elegantflowers.com',
          message: 'We would love to provide floral arrangements for your live weddings. Please contact us to discuss partnership opportunities.',
          createdAt: '2026-05-01T09:00:00Z'
        },
        {
          id: '2',
          companyName: 'LuxeWedding Photography',
          contactEmail: 'hello@luxewedding.com',
          message: 'Interested in being the official photography partner for your TikTok LIVE weddings. We can provide real-time photo sharing.',
          createdAt: '2026-05-02T11:30:00Z'
        }
      ]
      setBrandInquiries(mockInquiries)
      localStorage.setItem('adminBrandInquiries', JSON.stringify(mockInquiries))
    }
  }

  const handleLogout = () => {
    AuthService.clearSession()
    router.push('/auka')
  }

  const openReplyModal = (type: 'booking' | 'brand', id: string, email: string, name: string) => {
    setReplyData({ type, id, email, name })
    setShowReplyModal(true)
    setReplyMessage('')
  }

  const closeReplyModal = () => {
    setShowReplyModal(false)
    setReplyData(null)
    setReplyMessage('')
  }

  const openPasswordModal = () => {
    setShowPasswordModal(true)
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setPasswordError('')
  }

  const closePasswordModal = () => {
    setShowPasswordModal(false)
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setPasswordError('')
    setShowPasswords({ current: false, new: false, confirm: false })
  }

  const handlePasswordChange = async () => {
    setPasswordLoading(true)
    setPasswordError('')

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('All fields are required')
      setPasswordLoading(false)
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match')
      setPasswordLoading(false)
      return
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long')
      setPasswordLoading(false)
      return
    }

    try {
      const result = await AuthService.changePassword(passwordForm.currentPassword, passwordForm.newPassword)
      
      if (result.success) {
        alert('Password changed successfully!')
        closePasswordModal()
      } else {
        setPasswordError(result.error || 'Failed to change password')
      }
    } catch (error) {
      console.error('Password change error:', error)
      setPasswordError('An unexpected error occurred')
    }

    setPasswordLoading(false)
  }

  const sendReply = async () => {
    if (!replyData || !replyMessage.trim()) return

    setIsSending(true)
    
    try {
      // Import EmailJS service
      const { mockSendEmail } = await import('@/lib/emailjs')
      
      const success = await mockSendEmail({
        to_email: replyData.email,
        to_name: replyData.name,
        from_name: 'ASKOFUU AUKA - Affordable Wedding',
        message: replyMessage,
        reply_to: 'admin@affordablewedding.com'
      })
      
      if (success) {
        alert(`Reply sent successfully to ${replyData.name}!`)
        closeReplyModal()
      } else {
        alert('Failed to send reply. Please try again.')
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Failed to send reply. Please try again.')
    }
    
    setIsSending(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (!isAuthenticated) {
    return null // Loading or redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-royal-purple-50 to-deep-rose-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-royal-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-deep-rose-600 mr-3 animate-pulse" />
              <div>
                <h1 className="text-xl font-playfair font-bold text-royal-purple-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-royal-purple-600">
                  Affordable Wedding Management • Welcome, {currentUser}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={openPasswordModal}
                className="flex items-center space-x-2 px-4 py-2 text-royal-purple-600 hover:text-deep-rose-600 hover:bg-royal-purple-50 rounded-lg transition-all duration-200"
                title="Change Password"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-royal-purple-600 hover:text-deep-rose-600 hover:bg-royal-purple-50 rounded-lg transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="border-b border-royal-purple-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'bookings'
                  ? 'border-deep-rose-500 text-deep-rose-600'
                  : 'border-transparent text-royal-purple-500 hover:text-royal-purple-700 hover:border-royal-purple-300'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Wedding Bookings ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('brands')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'brands'
                  ? 'border-deep-rose-500 text-deep-rose-600'
                  : 'border-transparent text-royal-purple-500 hover:text-royal-purple-700 hover:border-royal-purple-300'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              Brand Inquiries ({brandInquiries.length})
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-xl shadow-lg border border-royal-purple-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-royal-purple-100">
              <h2 className="text-lg font-semibold text-royal-purple-900">Wedding Bookings</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-royal-purple-100">
                <thead className="bg-royal-purple-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-purple-600 uppercase tracking-wider">
                      Couple
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-purple-600 uppercase tracking-wider">
                      TikTok Handles
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-purple-600 uppercase tracking-wider">
                      Wedding Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-purple-600 uppercase tracking-wider">
                      Vibe
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-purple-600 uppercase tracking-wider">
                      Photos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-royal-purple-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-royal-purple-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-royal-purple-25">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-royal-purple-900">
                            {booking.brideName} & {booking.groomName}
                          </div>
                          <div className="text-sm text-royal-purple-500">{booking.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-royal-purple-900">
                        <div>{booking.brideTikTok}</div>
                        <div>{booking.groomTikTok}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-royal-purple-900">
                          <Calendar className="w-4 h-4 mr-2 text-royal-purple-500" />
                          {formatDate(booking.weddingDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-deep-rose-100 text-deep-rose-800 rounded-full">
                          {booking.vibe.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-royal-purple-900">
                        <div className="flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2 text-royal-purple-500" />
                          {booking.photos.length} photos
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openReplyModal('booking', booking.id, booking.email, `${booking.brideName} & ${booking.groomName}`)}
                          className="flex items-center space-x-1 text-deep-rose-600 hover:text-deep-rose-900 transition-colors"
                        >
                          <Reply className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'brands' && (
          <div className="bg-white rounded-xl shadow-lg border border-royal-purple-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-royal-purple-100">
              <h2 className="text-lg font-semibold text-royal-purple-900">Brand Partnership Inquiries</h2>
            </div>
            <div className="divide-y divide-royal-purple-100">
              {brandInquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-6 hover:bg-royal-purple-25 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <Building2 className="w-5 h-5 text-royal-purple-500 mr-2" />
                        <h3 className="text-lg font-medium text-royal-purple-900">
                          {inquiry.companyName}
                        </h3>
                      </div>
                      <div className="flex items-center mb-3 text-sm text-royal-purple-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {inquiry.contactEmail}
                        <span className="mx-2">•</span>
                        <span>{formatDate(inquiry.createdAt)}</span>
                      </div>
                      <p className="text-royal-purple-700 mb-4 leading-relaxed">
                        {inquiry.message}
                      </p>
                    </div>
                    <button
                      onClick={() => openReplyModal('brand', inquiry.id, inquiry.contactEmail, inquiry.companyName)}
                      className="ml-4 flex items-center space-x-2 px-4 py-2 bg-deep-rose-600 text-white rounded-lg hover:bg-deep-rose-700 transition-colors"
                    >
                      <Reply className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {showReplyModal && replyData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-royal-purple-100">
              <h3 className="text-lg font-semibold text-royal-purple-900">
                Reply to {replyData.name}
              </h3>
              <button
                onClick={closeReplyModal}
                className="text-royal-purple-400 hover:text-royal-purple-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-royal-purple-800 mb-2">
                  Email will be sent to: {replyData.email}
                </label>
                <p className="text-sm text-royal-purple-600">
                  Message will include: "Hello, ASKOFUU AUKA has responded to your request regarding your Affordable Wedding booking."
                </p>
              </div>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full h-32 px-4 py-3 border border-royal-purple-200 rounded-xl focus:ring-2 focus:ring-deep-rose-500 focus:border-deep-rose-500 resize-none"
                placeholder="Type your response here..."
              />
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={closeReplyModal}
                  className="px-4 py-2 text-royal-purple-600 hover:text-royal-purple-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={sendReply}
                  disabled={!replyMessage.trim() || isSending}
                  className="flex items-center space-x-2 px-6 py-2 bg-deep-rose-600 text-white rounded-lg hover:bg-deep-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'Sending...' : 'Send Reply'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-royal-purple-100">
              <h3 className="text-lg font-semibold text-royal-purple-900 flex items-center">
                <Key className="w-5 h-5 mr-2" />
                Change Password
              </h3>
              <button
                onClick={closePasswordModal}
                className="text-royal-purple-400 hover:text-royal-purple-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-royal-purple-800 mb-2">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-royal-purple-200 rounded-xl focus:ring-2 focus:ring-deep-rose-500 focus:border-deep-rose-500"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-royal-purple-400 hover:text-royal-purple-600"
                  >
                    {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-royal-purple-800 mb-2">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-royal-purple-200 rounded-xl focus:ring-2 focus:ring-deep-rose-500 focus:border-deep-rose-500"
                    placeholder="Enter new password (min 8 characters)"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-royal-purple-400 hover:text-royal-purple-600"
                  >
                    {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-royal-purple-800 mb-2">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-royal-purple-200 rounded-xl focus:ring-2 focus:ring-deep-rose-500 focus:border-deep-rose-500"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-royal-purple-400 hover:text-royal-purple-600"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                  {passwordError}
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={closePasswordModal}
                  className="px-4 py-2 text-royal-purple-600 hover:text-royal-purple-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  disabled={passwordLoading}
                  className="flex items-center space-x-2 px-6 py-2 bg-deep-rose-600 text-white rounded-lg hover:bg-deep-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Key className="w-4 h-4" />
                  <span>{passwordLoading ? 'Changing...' : 'Change Password'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}