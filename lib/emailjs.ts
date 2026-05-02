import emailjs from '@emailjs/browser'

// EmailJS configuration (replace with your actual keys)
export const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  templateId: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  publicKey: 'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
}

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey)

export interface EmailData {
  to_email: string
  to_name: string
  from_name: string
  message: string
  reply_to: string
}

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        to_email: emailData.to_email,
        to_name: emailData.to_name,
        from_name: 'ASKOFUU AUKA - Affordable Wedding',
        message: `Hello, ASKOFUU AUKA has responded to your request regarding your Affordable Wedding booking. ${emailData.message}`,
        reply_to: 'admin@affordablewedding.com'
      }
    )
    
    console.log('Email sent successfully:', result)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

// For development/demo purposes - mock email sending
export const mockSendEmail = async (emailData: EmailData): Promise<boolean> => {
  console.log('Mock email sending:', {
    to: emailData.to_email,
    subject: 'Response from ASKOFUU AUKA - Affordable Wedding',
    message: `Hello, ASKOFUU AUKA has responded to your request regarding your Affordable Wedding booking. ${emailData.message}`
  })
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  return true
}