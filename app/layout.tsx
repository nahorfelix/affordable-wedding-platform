import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Affordable Wedding - Your Love Story, Live to the World',
  description: 'Join Affordable Wedding for an unforgettable TikTok LIVE wedding broadcast. Celebrate your union with a global congregation.',
  keywords: 'affordable wedding, TikTok LIVE, live wedding, online wedding, wedding broadcast',
  authors: [{ name: 'Affordable Wedding' }],
  openGraph: {
    title: 'Affordable Wedding - TikTok LIVE Weddings',
    description: 'Your Love Story, Live to the World! 💍',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-inter" suppressHydrationWarning>
      <body className="antialiased bg-white text-gray-900" suppressHydrationWarning>{children}</body>
    </html>
  )
}