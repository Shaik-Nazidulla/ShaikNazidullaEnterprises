import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { NAV_LINKS } from '../../utils/constants'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Navbar = () => {
  const navRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const nav = navRef.current

    // Initial animation
    gsap.from(nav, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    })

    // Navbar hide/show on scroll
    let lastScroll = 0
    const showAnim = gsap.from(nav, {
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: 'power2.out'
    }).progress(1)

    ScrollTrigger.create({
      start: 'top top',
      end: 99999,
      onUpdate: (self) => {
        const currentScroll = self.scroll()
        
        if (currentScroll < 100) {
          setIsScrolled(false)
          showAnim.pause()
        } else {
          setIsScrolled(true)
          if (currentScroll < lastScroll) {
            showAnim.play()
          } else if (currentScroll > lastScroll && currentScroll > 500) {
            showAnim.reverse()
          }
        }
        lastScroll = currentScroll
      }
    })

    // Active section tracking - with delay to ensure sections are mounted
    const setupSectionTracking = () => {
      const sections = NAV_LINKS.map(link => link.href.substring(1))
      
      sections.forEach(section => {
        const element = document.querySelector(`#${section}`)
        if (element) {
          ScrollTrigger.create({
            trigger: `#${section}`,
            start: 'top center',
            end: 'bottom center',
            onToggle: (self) => {
              if (self.isActive) {
                setActiveSection(`#${section}`)
              }
            }
          })
        }
      })
    }

    // Wait for sections to mount
    const timer = setTimeout(setupSectionTracking, 100)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    const target = document.querySelector(href)
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 80 },
        ease: 'power3.inOut'
      })
    }
  }

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-dark/95 backdrop-blur-md py-4 shadow-lg shadow-primary/5' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-3 group cursor-pointer"
          >
            <div className="w-12 h-12 border-2 border-primary rotate-45 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-primary-light">
              <span className="text-primary text-2xl font-bold -rotate-45 font-display transition-colors duration-300 group-hover:text-primary-light">
                S
              </span>
            </div>
            <div className="text-primary text-sm tracking-widest">
              <div className="font-display text-base leading-tight">SHAIK NAZIDULLA</div>
              <div className="text-xs opacity-80">ENTERPRISES</div>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-8 text-sm tracking-wider">
            {NAV_LINKS.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-2 transition-colors duration-300 group ${
                    activeSection === link.href ? 'text-primary' : 'text-white hover:text-primary'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                    activeSection === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-primary focus:outline-none transition-transform duration-300 hover:scale-110"
            aria-label="Toggle menu"
          >
            <svg 
              className={`w-7 h-7 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-dark z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {NAV_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-3xl font-display transition-all duration-300 ${
                activeSection === link.href ? 'text-primary scale-110' : 'text-white hover:text-primary hover:scale-110'
              }`}
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: isMobileMenuOpen ? `${index * 0.1}s` : '0s'
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar
