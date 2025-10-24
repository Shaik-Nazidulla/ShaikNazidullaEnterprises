// nazidullaenterprises/src/components/sections/Hero.jsx
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroEntranceAnimation = (elements) => {
  const { title, subtitle, cta, indicator } = elements
  
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (title) {
    const titleLines = title.querySelectorAll('.title-line')
    tl.from(titleLines, {
      y: 120,
      opacity: 0,
      rotationX: -90,
      transformOrigin: 'top center',
      duration: 1.2,
      stagger: 0.2,
      delay: 0.5
    })
  }

  if (subtitle) {
    tl.from(subtitle, {
      y: 50,
      opacity: 0,
      duration: 1
    }, '-=0.6')
  }

  if (cta) {
    tl.from(cta, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.4')
  }

  if (indicator) {
    tl.from(indicator, {
      opacity: 0,
      y: -20,
      duration: 0.6
    }, '-=0.4')
  }

  return tl
}



const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const bgElementsRef = useRef(null)

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return

    const ctx = gsap.context(() => {
      heroEntranceAnimation({
        title: titleRef.current,
        subtitle: subtitleRef.current,
        cta: ctaRef.current,
        indicator: scrollIndicatorRef.current
      })


      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '20% top',
            scrub: 1
          },
          opacity: 0,
          y: -50
        })
      }

      // Floating animation for background elements
      if (bgElementsRef.current) {
        const elements = bgElementsRef.current.querySelectorAll('.float-element')
        elements.forEach((el, i) => {
          gsap.to(el, {
            y: -30 + i * 10,
            duration: 4 + i,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black py-20"
    >
      {/* Enhanced Background Effects */}
      <div ref={bgElementsRef} className="absolute inset-0 overflow-hidden">
        <div className="float-element absolute top-20 left-10 w-72 h-72 bg-amber-400/8 rounded-full blur-3xl"></div>
        <div className="float-element absolute bottom-20 right-10 w-96 h-96 bg-amber-400/6 rounded-full blur-3xl"></div>
        <div className="float-element absolute top-1/3 right-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl"></div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A870" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative diamond shapes */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-400/10 rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-amber-400/5 rotate-45"></div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div ref={titleRef} className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 md:mb-10 leading-tight">
          <div className="title-line overflow-hidden">
            <div className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
              Elegant False Ceiling
            </div>
          </div>
          <div className="title-line overflow-hidden mt-4 md:mt-6">
            <div className="text-white font-light">Materials Delivering</div>
          </div>
          <div className="title-line overflow-hidden mt-4 md:mt-6">
            <div className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              Quality & Style
            </div>
          </div>
        </div>
        
        <p ref={subtitleRef} className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed px-4 font-light">
          Transform your spaces with premium gypsum boards, PVC panels, profiles, and accessories crafted for perfection
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <a 
            href="#products" 
            className="group relative inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-gray-950 font-bold px-10 py-5 transition-all duration-500 overflow-hidden shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50"
          >
            <span className="relative z-10 tracking-wider text-base">EXPLORE PRODUCTS</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-amber-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </a>
          
          <a 
            href="#contact" 
            className="group relative inline-flex items-center justify-center border-2 border-amber-400 hover:border-amber-300 text-amber-400 hover:text-amber-300 font-bold px-10 py-5 transition-all duration-300 overflow-hidden bg-transparent hover:bg-amber-400/5"
          >
            <span className="relative z-10 tracking-wider text-base">GET IN TOUCH</span>
            <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
      >
        <span className="text-amber-400 text-xs tracking-widest font-semibold group-hover:text-amber-300 transition-colors duration-300">SCROLL TO EXPLORE</span>
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center p-2 group-hover:border-amber-300 transition-colors duration-300">
          <div className="w-1.5 h-3 bg-gradient-to-b from-amber-400 to-transparent rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero