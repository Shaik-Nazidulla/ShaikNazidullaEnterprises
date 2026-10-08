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
      </div>
    </section>
  )
}

export default Contact