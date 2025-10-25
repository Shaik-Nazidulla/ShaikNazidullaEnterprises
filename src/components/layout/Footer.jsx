import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = {
  phone: '+91 81252 31400',
  email: 'info@shaiknazidulla.com',
  workingHours: 'Mon - Sun: 8AM - 7PM',
  social: {
    instagram: '#',
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
            <a
              href={contactInfo.social.instagram}
              className="text-gray-500 hover:text-amber-400 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer