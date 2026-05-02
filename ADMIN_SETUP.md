# Admin Dashboard Setup Guide

## Overview
The Affordable Wedding admin dashboard provides a complete management system for wedding bookings and brand partnership inquiries. This guide explains how to set up and use all features.

## Access Information

### Admin Login
- **URL:** `http://localhost:3002/auka`
- **Username:** `admin`
- **Password:** `ASKOFU_ADMIN_2026`

### Dashboard Features
- **Wedding Bookings Management:** View couple details, TikTok handles, wedding dates, uploaded photos
- **Brand Inquiries Management:** Review partnership requests with company details and messages
- **Email Response System:** Send personalized responses directly from the dashboard

## Technical Implementation

### Authentication System
- Simple hardcoded credentials (suitable for MVP/demo)
- Protected routes using localStorage session management
- Automatic redirect to login if not authenticated

### Data Storage
Currently uses localStorage for demo purposes. In production, replace with:
- **Recommended:** Supabase (PostgreSQL database with real-time features)
- **Alternative:** Firebase Firestore
- **Enterprise:** Custom backend API with PostgreSQL/MongoDB

### Email Integration Setup

#### Option 1: EmailJS (Recommended for MVP)
1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   ```
   To: {{to_email}}
   From: ASKOFUU AUKA - Affordable Wedding
   Subject: Response from ASKOFUU AUKA - Affordable Wedding
   
   Hello {{to_name}},
   
   {{message}}
   
   Best regards,
   ASKOFUU AUKA
   Affordable Wedding Team
   ```
4. Update `lib/emailjs.ts` with your credentials:
   ```typescript
   export const EMAILJS_CONFIG = {
     serviceId: 'your_service_id',
     templateId: 'your_template_id', 
     publicKey: 'your_public_key'
   }
   ```
5. Replace `mockSendEmail` calls with `sendEmail` in the dashboard

#### Option 2: Resend API
1. Sign up at [Resend.com](https://resend.com/)
2. Get your API key
3. Install: `npm install resend`
4. Create email service in `lib/email-resend.ts`

## Current Data Structure

### Booking Data
```typescript
interface BookingData {
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
```

### Brand Inquiry Data  
```typescript
interface BrandInquiryData {
  id: string
  companyName: string
  contactEmail: string
  message: string
  createdAt: string
}
```

## File Structure
```
app/
├── auka/
│   ├── page.tsx              # Admin login page
│   └── dashboard/
│       └── page.tsx          # Main dashboard
components/
├── BookingForm.tsx           # Connected to storage
└── BrandVisibility.tsx       # Connected to storage  
lib/
├── storage.ts                # Data management
├── emailjs.ts                # Email service
└── ...
```

## Usage Instructions

### For Admins
1. Navigate to `/auka` 
2. Login with credentials above
3. Switch between "Wedding Bookings" and "Brand Inquiries" tabs
4. Click "Reply" to respond to any entry
5. Type your message and click "Send Reply"
6. Emails are automatically formatted and sent

### For Couples (Main Site)
1. Fill out the booking form at the main site
2. Data is automatically saved and appears in admin dashboard
3. Admin receives notification and can respond via dashboard

### For Brands (Main Site)
1. Click "Brand Inquiry" button in Partner section
2. Fill out the partnership form
3. Data is automatically saved and appears in admin dashboard
4. Admin can respond directly from the dashboard

## Security Notes

### Current Security Level (Demo/MVP)
- Hardcoded credentials (acceptable for demo)
- Client-side authentication (localStorage)
- No rate limiting
- No input sanitization

### Production Security Requirements
1. **Authentication:**
   - Move to secure backend authentication (JWT tokens)
   - Add password hashing (bcrypt)
   - Implement session management
   - Add 2FA for admin accounts

2. **Authorization:**
   - Role-based access control
   - API route protection
   - Input validation and sanitization

3. **Data Protection:**
   - HTTPS only
   - Environment variables for secrets
   - Database encryption
   - Regular security audits

## Deployment Notes

### Current State
- All data stored in browser localStorage
- Fully functional for testing and demonstration
- EmailJS integration ready (needs credentials)

### Production Migration Path
1. Set up database (Supabase recommended)
2. Update storage functions to use API calls
3. Implement proper authentication backend
4. Configure email service
5. Add monitoring and analytics
6. Set up backup and recovery

## Troubleshooting

### Common Issues
1. **Login not working:** Check browser localStorage, clear if needed
2. **Dashboard empty:** Ensure sample data is loaded (check browser console)
3. **Email not sending:** Verify EmailJS configuration in `lib/emailjs.ts`
4. **Form submissions not appearing:** Check browser console for errors

### Debug Steps
1. Open browser Developer Tools
2. Check Console tab for errors  
3. Check Application > Local Storage for data
4. Verify network requests are successful

## Support
For technical support or questions about the admin system:
- Check browser console for error messages
- Verify all form fields are properly filled
- Ensure localStorage has proper permissions
- Test with different browsers if issues persist