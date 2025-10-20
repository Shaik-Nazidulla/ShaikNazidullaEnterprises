import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = {
  phone: '+91 98765 43210',
  email: 'info@shaiknazidulla.com',
  workingHours: 'Mon - Sat: 9AM - 6PM',
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#'
  }
}

const Footer = () => {
  const footerRef = useRef(null)

  useEffect(() => {
  const footer = footerRef.current
  const isInView = window.scrollY + window.innerHeight >= footer.offsetTop

  if (isInView) {
    // Directly show content
    gsap.set(footer.children, { opacity: 1, y: 0 })
  } else {
    gsap.from(footer.children, {
      scrollTrigger: {
        trigger: footer,
        start: 'top 90%',
        end: 'top 60%',
        scrub: 1,
      },
      y: 50,
      opacity: 0,
      stagger: 0.1,
    })
  }
}, [])


  return (
    <footer className="bg-black border-t border-amber-400/20 relative z-10">
      <div ref={footerRef} className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 border-2 border-amber-400 rotate-45 flex items-center justify-center">
                <span className="text-amber-400 text-xl font-bold -rotate-45" style={{ fontFamily: "'Playfair Display', serif" }}>S</span>
              </div>
              <div className="text-amber-400 text-xs tracking-widest">
                <div className="text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>SHAIK NAZIDULLA</div>
                <div className="text-xs opacity-80">ENTERPRISES</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium quality false ceiling materials for residential and commercial projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-amber-400 text-lg mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Products', 'Services', 'Contact'].map((link, index) => (
                <li key={index}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm inline-block hover:translate-x-2 transform"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-amber-400 text-lg mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Products</h3>
            <ul className="space-y-3">
              {['Gypsum Boards', 'PVC Panels', 'Metal Profiles', 'Accessories', 'Screws & Fasteners'].map((product, index) => (
                <li key={index}>
                  <a 
                    href="#products" 
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm inline-block hover:translate-x-2 transform"
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-amber-400 text-lg mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400">{contactInfo.phone}</span>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400">{contactInfo.email}</span>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-400">{contactInfo.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-amber-400/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Shaik Nazidulla Enterprises. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-6">
            {[
              { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
              { name: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01' },
              { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' }
            ].map((social, index) => (
              <a
                key={index}
                href={contactInfo.social[social.name.toLowerCase()]}
                className="text-gray-500 hover:text-amber-400 transition-all duration-300 hover:scale-110"
                aria-label={social.name}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer