import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = {
  phone: '+91 98765 43210',
  email: 'info@shaiknazidulla.com',
  address: '123 Business Plaza, City Center, State - 500001',
  workingHours: 'Mon - Sat: 9AM - 6PM',
  social: {
    whatsapp: 'https://wa.me/919876543210',
    facebook: '#',
    instagram: '#',
    linkedin: '#'
  }
}

const Contact = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

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
      link: `tel:${contactInfo.phone}`
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
      label: 'EMAIL',
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      ),
      label: 'ADDRESS',
      value: contactInfo.address,
      link: null
    }
  ]

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-amber-400/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to Transform{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              Your Space?
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-200 mx-auto mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Contact us today for premium false ceiling materials and expert guidance
          </p>
        </div>

        {/* Contact Methods */}
        <div ref={contentRef} className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link || '#contact'}
                className="group bg-gray-800 border border-amber-400/20 p-8 text-center transition-all duration-500 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-400/20 hover:-translate-y-3 block"
              >
                <div className="w-16 h-16 border-2 border-amber-400/30 rotate-45 flex items-center justify-center mx-auto mb-6 group-hover:rotate-90 group-hover:border-amber-400 transition-all duration-700">
                  <svg 
                    className="w-8 h-8 text-amber-400 -rotate-45 group-hover:rotate-0 transition-all duration-700" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {method.icon}
                  </svg>
                </div>
                <div className="text-xs text-gray-500 tracking-widest mb-2">
                  {method.label}
                </div>
                <div className="text-amber-400 font-medium group-hover:text-amber-300 transition-colors duration-300">
                  {method.value}
                </div>
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href={`tel:${contactInfo.phone}`}
              className="group relative inline-flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-black font-semibold px-10 py-5 transition-all duration-300 overflow-hidden min-w-[200px]"
            >
              <span className="relative z-10 tracking-wide">CALL NOW</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
            
            <a 
              href={contactInfo.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center border-2 border-amber-400 hover:bg-amber-400 text-amber-400 hover:text-black font-semibold px-10 py-5 transition-all duration-300 min-w-[200px]"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="tracking-wide">WHATSAPP</span>
            </a>
          </div>

          {/* Working Hours */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-sm">
              <span className="text-amber-400 font-semibold">Working Hours:</span> {contactInfo.workingHours}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact