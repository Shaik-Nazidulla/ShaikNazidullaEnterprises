import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const Hero = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useGSAP(() => {
    // Initial entrance animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    // Split title into lines for animation
    const titleLines = titleRef.current.querySelectorAll('.title-line')
    
    tl.from(titleLines, {
      y: 120,
      opacity: 0,
      rotationX: -90,
      transformOrigin: 'top center',
      duration: 1.2,
      stagger: 0.2,
      delay: 0.5
    })
    .from(subtitleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
    }, '-=0.6')
    .from(ctaRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, '-=0.4')
    .from(scrollIndicatorRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.6,
    }, '-=0.4')

    // Parallax scroll effect on hero
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      },
      opacity: 0,
      scale: 0.9,
      y: -100
    })

    // Scroll indicator fade out
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
  }, { scope: heroRef })

  return (
    <section 
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark via-dark-secondary to-dark"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div ref={titleRef} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 md:mb-8 leading-tight">
          <div className="title-line overflow-hidden">
            <div className="text-gradient">Elegant False Ceiling</div>
          </div>
          <div className="title-line overflow-hidden mt-3 md:mt-4">
            <div className="text-white">Materials Delivering</div>
          </div>
          <div className="title-line overflow-hidden mt-3 md:mt-4">
            <div className="text-gradient">Quality & Style</div>
          </div>
        </div>
        
        <p ref={subtitleRef} className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed px-4">
          Transform your spaces with premium gypsum boards, PVC panels, profiles, and accessories
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#products" 
            className="group relative inline-flex items-center justify-center bg-primary hover:bg-primary-light text-dark font-semibold px-8 py-4 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 tracking-wide">EXPLORE PRODUCTS</span>
            <div className="absolute inset-0 bg-gradient-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </a>
          
          <a 
            href="#contact" 
            className="group inline-flex items-center justify-center border-2 border-primary hover:bg-primary text-primary hover:text-dark font-semibold px-8 py-4 transition-all duration-300"
          >
            <span className="tracking-wide">GET IN TOUCH</span>
            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="text-primary text-xs tracking-widest">SCROLL</span>
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
