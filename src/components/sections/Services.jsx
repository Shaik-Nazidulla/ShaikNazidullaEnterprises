import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../../data/services'

gsap.registerPlugin(ScrollTrigger)

const serviceSectionAnimation = (elements) => {
  const { title, cards } = elements

  if (title) {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1
      },
      y: 80,
      opacity: 0
    })
  }

  if (cards) {
    const cardElements = cards.children
    
    gsap.from(cardElements, {
      scrollTrigger: {
        trigger: cards,
        start: 'top 75%',
        end: 'top 30%',
        scrub: 1.2
      },
      y: 120,
      opacity: 0,
      rotationY: 45,
      stagger: 0.12,
      transformOrigin: 'center center'
    })
  }
}

const Services = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const cardsRef = useRef(null)
  const bgElementsRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      serviceSectionAnimation({
        title: titleRef.current,
        cards: cardsRef.current
      })

      // Floating animation for background elements
      if (bgElementsRef.current) {
        const elements = bgElementsRef.current.querySelectorAll('.float-element')
        elements.forEach((el, i) => {
          gsap.to(el, {
            y: -40 + i * 15,
            duration: 5.5 + i * 0.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getIcon = (iconName) => {
    const icons = {
      consultation: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      ),
      delivery: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      ),
      quality: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ),
      support: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      )
    }
    return icons[iconName] || icons.support
  }

  return (
    <section id="services" ref={sectionRef} className="relative py-20 md:py-32 bg-gradient-to-b from-gray-950 via-gray-900 to-black overflow-hidden">
      {/* Enhanced Background Effects */}
      <div ref={bgElementsRef} className="absolute inset-0">
        <div className="float-element absolute top-1/2 left-0 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl"></div>
        <div className="float-element absolute top-1/4 right-10 w-80 h-80 bg-amber-400/6 rounded-full blur-3xl"></div>
        <div className="float-element absolute bottom-20 left-1/3 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl"></div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid-services" width="45" height="45" patternUnits="userSpaceOnUse">
                <path d="M 45 0 L 0 0 0 45" fill="none" stroke="#C9A870" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-services)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 mx-auto mb-8 shadow-lg shadow-amber-400/30"></div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Comprehensive support from expert consultation to seamless delivery and beyond
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-amber-400/20 p-8 md:p-10 transition-all duration-500 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-400/20 hover:-translate-y-4 perspective-1000 rounded-lg backdrop-blur-sm overflow-hidden"
            >
              {/* Background shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon Section */}
              <div className="relative mb-6 z-10">
                <div className="w-16 h-16 border-2 border-amber-400/40 rotate-45 flex items-center justify-center mx-auto group-hover:rotate-90 group-hover:border-amber-400 transition-all duration-700 rounded">
                  <svg 
                    className="w-8 h-8 text-amber-400 -rotate-45 group-hover:rotate-0 transition-all duration-700" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {getIcon(service.icon)}
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl text-center text-amber-400 mb-4 group-hover:text-amber-300 transition-colors duration-300 z-10 relative">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-200 text-sm text-center mb-6 leading-relaxed z-10 relative">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3 z-10 relative">
                {service.features.map((feature, index) => (
                  <li key={index} className="text-xs text-gray-300 flex items-start group/item">
                    <svg className="w-4 h-4 text-amber-400 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-125 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span className="group-hover/item:text-gray-100 transition-colors duration-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-gray-400 text-base md:text-lg mb-6">
            Ready to experience our premium services?
          </p>
          <a 
            href="#contact"
            className="group inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-gray-950 font-bold px-10 py-5 transition-all duration-500 overflow-hidden shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 rounded-lg"
          >
            <span className="tracking-wider">START TODAY</span>
            <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services