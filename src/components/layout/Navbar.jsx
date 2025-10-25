import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { NAV_LINKS } from '../../utils/constants'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const setupNavbarScrollAnimation = (navElement) => {
  if (!navElement) return null

  const showAnim = gsap.from(navElement, {
    yPercent: -100,
    paused: true,
    duration: 0.3,
    ease: 'power2.out'
  }).progress(1)

  return { showAnim }
}

const Navbar = () => {
  const navRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const lastScrollRef = useRef(0)
  const scrollTriggerRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Navbar hide/show on scroll
    const animSetup = setupNavbarScrollAnimation(nav)
    if (!animSetup) return

    const { showAnim } = animSetup

    scrollTriggerRef.current = ScrollTrigger.create({
      start: 'top top',
      end: 99999,
      onUpdate: (self) => {
        const currentScroll = self.scroll()
        
        if (currentScroll < 100) {
          setIsScrolled(false)
          showAnim.pause()
        } else {
          setIsScrolled(true)
          if (currentScroll < lastScrollRef.current) {
            showAnim.play()
          } else if (currentScroll > lastScrollRef.current && currentScroll > 500) {
            showAnim.reverse()
          }
        }
        lastScrollRef.current = currentScroll
      }
    })

    // Active section tracking
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

    const timer = setTimeout(setupSectionTracking, 100)

    return () => {
      clearTimeout(timer)
      if (scrollTriggerRef.current) scrollTriggerRef.current.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    const target = document.querySelector(href)
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 100 },
        ease: 'power3.inOut'
      })
    }
  }

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[998] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 z-[999] lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 relative pt-20">
          {/* Close button inside mobile menu */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-8 right-8 text-amber-400 hover:text-amber-300 transition-colors duration-300"
            aria-label="Close menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {NAV_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-3xl font-display transition-all duration-300 ${
                activeSection === link.href ? 'text-amber-400 scale-110' : 'text-white hover:text-amber-400 hover:scale-110'
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

      {/* Navbar */}
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${
          isScrolled 
            ? 'bg-gradient-to-b from-gray-900/98 to-gray-900/85 backdrop-blur-xl py-3 shadow-lg shadow-amber-500/10 border-b border-amber-400/10' 
            : 'bg-gradient-to-b from-black/50 to-transparent py-5 border-b border-amber-400/5'
        }`}
        style={{
          paddingTop: `calc(max(1.25rem, env(safe-area-inset-top)))`,
          paddingBottom: `calc(max(1rem, env(safe-area-inset-bottom)))`
        }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer relative z-[1001] flex-shrink-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-amber-400 rotate-45 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:border-amber-300 group-hover:shadow-lg group-hover:shadow-amber-400/30 rounded">
              <span className="text-amber-400 text-xl sm:text-2xl font-bold -rotate-45 transition-colors duration-300 group-hover:text-amber-300 font-display">
                S
              </span>
            </div>
            <div className="text-amber-400 text-xs sm:text-sm tracking-widest hidden xs:block">
              <div className="text-sm sm:text-base leading-tight font-semibold font-display">SHAIK NAZIDULLA</div>
              <div className="text-xs opacity-80">ENTERPRISES</div>
            </div>
          </a>
          
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-6 xl:space-x-8 text-xs xl:text-sm tracking-wider">
            {NAV_LINKS.map((link, index) => (
              <li key={index}>
                <a 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-2 transition-colors duration-300 group font-medium ${
                    activeSection === link.href ? 'text-amber-400' : 'text-gray-200 hover:text-amber-400'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-amber-300 transform origin-left transition-transform duration-300 ${
                    activeSection === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-amber-400 focus:outline-none transition-transform duration-300 hover:scale-110 relative z-[1001]"
            aria-label="Toggle menu"
          >
            <svg 
              className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
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
    </>
  )
}

export default Navbar