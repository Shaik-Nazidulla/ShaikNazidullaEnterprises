import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contactInfo } from '../../data/contactInfo'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const formRef = useRef(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          },
          y: 80,
          opacity: 0
        })
      }

      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 1
          },
          y: 60,
          opacity: 0,
          stagger: 0.2
        })
      }
      
      if (formRef.current) {
        gsap.from(formRef.current, {
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          },
          y: 60,
          opacity: 0
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const contactMethods = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      ),
      label: 'PHONE',
      value: contactInfo.phone,
      link: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
      action: 'Call Us'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
      label: 'EMAIL',
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      action: 'Email Us'
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      ),
      label: 'LOCATION',
      value: contactInfo.address,
      link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`,
      action: 'Get Directions'
    }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number is invalid'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setFormStatus({ submitting: true, submitted: false, error: null })
    
    try {
      // Simulate form submission - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send data to your backend
      console.log('Form submitted:', formData)
      
      // Create WhatsApp message
      const whatsappMessage = `*New Inquiry from Website*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}${formData.subject ? `%0A*Subject:* ${formData.subject}` : ''}%0A*Message:* ${formData.message}`
      
      // Open WhatsApp with pre-filled message
      window.open(`${contactInfo.social.whatsapp}?text=${whatsappMessage}`, '_blank')
      
      setFormStatus({ submitting: false, submitted: true, error: null })
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ submitting: false, submitted: false, error: null })
      }, 5000)
      
    } catch (error) {
      setFormStatus({ 
        submitting: false, 
        submitted: false, 
        error: 'Failed to send message. Please try again.' 
      })
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid-contact" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#C9A870" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-contact)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6">
            <span className="text-white">Get In </span>
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 mx-auto mb-8 shadow-lg shadow-amber-400/30"></div>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Ready to transform your space with premium false ceiling solutions? Contact us today for expert guidance and quality materials.
          </p>
        </div>

        {/* Contact Methods */}
        <div ref={contentRef} className="max-w-6xl mx-auto mb-16 md:mb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-amber-400/20 p-6 md:p-8 text-center transition-all duration-500 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/20 hover:-translate-y-2 rounded-lg overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/5 group-hover:to-amber-400/10 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-amber-400/30 rotate-45 flex items-center justify-center mx-auto mb-6 group-hover:rotate-90 group-hover:border-amber-400 group-hover:scale-110 transition-all duration-700 group-hover:shadow-lg group-hover:shadow-amber-400/30">
                    <svg 
                      className="w-8 h-8 md:w-10 md:h-10 text-amber-400 -rotate-45 group-hover:rotate-0 transition-all duration-700" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      {method.icon}
                    </svg>
                  </div>
                  <div className="text-xs font-semibold text-gray-500 tracking-widest mb-3">
                    {method.label}
                  </div>
                  <div className="text-amber-400 font-medium mb-4 group-hover:text-amber-300 transition-colors duration-300 text-sm md:text-base break-words">
                    {method.value}
                  </div>
                  <a
                    href={method.link}
                    target={method.label === 'LOCATION' ? '_blank' : undefined}
                    rel={method.label === 'LOCATION' ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center text-xs text-gray-400 group-hover:text-amber-400 transition-colors duration-300"
                  >
                    {method.action}
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form & Quick Actions */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div ref={formRef} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-amber-400/20 p-6 md:p-8 lg:p-10 rounded-lg">
                <h3 className="font-display text-2xl md:text-3xl text-white mb-6">Send us a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-900/50 border ${errors.name ? 'border-red-500' : 'border-gray-700'} focus:border-amber-400 text-white px-4 py-3 rounded-lg transition-all duration-300 outline-none`}
                      placeholder="Enter your name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-900/50 border ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:border-amber-400 text-white px-4 py-3 rounded-lg transition-all duration-300 outline-none`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-900/50 border ${errors.phone ? 'border-red-500' : 'border-gray-700'} focus:border-amber-400 text-white px-4 py-3 rounded-lg transition-all duration-300 outline-none`}
                        placeholder="+91 98765 43210"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-gray-300 text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900/50 border border-gray-700 focus:border-amber-400 text-white px-4 py-3 rounded-lg transition-all duration-300 outline-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      className={`w-full bg-gray-900/50 border ${errors.message ? 'border-red-500' : 'border-gray-700'} focus:border-amber-400 text-white px-4 py-3 rounded-lg transition-all duration-300 outline-none resize-none`}
                      placeholder="Tell us about your project requirements..."
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className={`w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold py-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-400/30 ${
                      formStatus.submitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {formStatus.submitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {/* Status Messages */}
                  {formStatus.submitted && (
                    <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                      ✓ Message sent successfully! We'll get back to you soon.
                    </div>
                  )}
                  
                  {formStatus.error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                      ✗ {formStatus.error}
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Call Now Card */}
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-400/30 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Need Quick Help?</h4>
                    <p className="text-gray-400 text-sm">Call us directly</p>
                  </div>
                </div>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="block w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"
                >
                  Call Now
                </a>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-400/30 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Chat on WhatsApp</h4>
                    <p className="text-gray-400 text-sm">Quick response</p>
                  </div>
                </div>
                <a
                  href={contactInfo.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"
                >
                  Open WhatsApp
                </a>
              </div>

              {/* Working Hours */}
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-amber-400/20 p-6 rounded-lg">
                <h4 className="text-white font-semibold text-lg mb-3 flex items-center">
                  <svg className="w-5 h-5 text-amber-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Working Hours
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {contactInfo.workingHours}
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Sunday Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact