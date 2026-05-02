# Deployment Guide 🚀

## Quick Setup Checklist

### 1. Prerequisites ✅
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Formspree account created

### 2. Installation Steps 📦

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

### 3. Configure Form Submission 📧

**Formspree Setup:**
1. Go to [formspree.io](https://formspree.io)
2. Create a new form
3. Copy your form ID (e.g., `xvoeqlaw`)
4. Replace `YOUR_FORMSPREE_ID` in `components/BookingForm.tsx` line 85:

```typescript
const response = await fetch('https://formspree.io/f/YOUR_ACTUAL_ID', {
```

**Brand Inquiry Email:**
Update the email address in `components/BrandVisibility.tsx` line 48:
```typescript
window.open(`mailto:your-actual-email@domain.com?subject=${subject}&body=${body}`)
```

### 4. Deployment Options 🌐

#### Option A: Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy automatically

#### Option B: Netlify
1. Build the project: `npm run build`
2. Drag and drop the `.next` folder to Netlify
3. Or connect your GitHub repository

#### Option C: Traditional Hosting
1. Build: `npm run build`
2. Export static files: `npm run export` (add to package.json if needed)
3. Upload files to any hosting provider

### 5. Domain Configuration 🔧

**Custom Domain:**
- Update `NEXT_PUBLIC_SITE_URL` in your environment variables
- Configure DNS settings with your hosting provider
- Set up SSL certificate (automatic on Vercel/Netlify)

### 6. Performance Optimization 🔥

**Recommended Settings:**
- Enable automatic compression (Vercel/Netlify do this automatically)
- Configure caching headers
- Optimize images (Next.js does this automatically)

### 7. Analytics & Monitoring 📊

**Add Google Analytics:**
1. Get tracking ID from Google Analytics
2. Add to `app/layout.tsx`:

```typescript
import Script from 'next/script'

// Add in the <head> section:
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID`}
  strategy="afterInteractive"
/>
```

### 8. SEO Optimization 🔍

The site includes:
- ✅ Meta tags and Open Graph
- ✅ Semantic HTML structure
- ✅ Accessible components
- ✅ Mobile-first responsive design

### 9. Testing Checklist 🧪

Before going live, test:
- [ ] Form submission works
- [ ] Photo upload functions
- [ ] Mobile responsiveness
- [ ] All buttons and links work
- [ ] Smooth scroll animations
- [ ] Brand inquiry email opens correctly

### 10. Go Live! 🎉

1. Final build and deploy
2. Test the live site
3. Share with Askofu Auka
4. Monitor form submissions

---

## Support 💬

For technical support or customizations, contact the development team.

**Built with ❤️ for celebrating love worldwide!** 🌍✨