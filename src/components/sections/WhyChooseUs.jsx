import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const WhyChooseUs = () => {
  const sectionRef = useRef(null)
  const bgElementsRef = useRef(null)

  const reasons = [
    {
      number: '01',
      title: 'Premium Quality',
      description: 'All products sourced from certified manufacturers meeting international standards'
    },
    {
      number: '02',
      title: 'Competitive Pricing',
      description: 'Best prices in the market without compromising on quality'
    },
    {
      number: '03',
      title: 'Expert Guidance',
      description: 'Professional consultation and technical support throughout your project'
    },
    {
      number: '04',
      title: 'Fast Delivery',
      description: 'Prompt delivery with proper packaging and handling'
    },
    {
      number: '05',
      title: 'Wide Selection',
      description: 'Comprehensive range of products for all ceiling requirements'
    },
    {
      number: '06',
      title: 'Bulk Orders',
      description: 'Special rates and dedicated support for large projects'
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Floating animation for background elements
      if (bgElementsRef.current) {
        const elements = bgElementsRef.current.querySelectorAll('.float-element')
        elements.forEach((el, i) => {
          gsap.to(el, {
            y: -45 + i * 18,
            duration: 6 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-gray-950 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div ref={bgElementsRef} className="absolute inset-0">
        <div className="float-element absolute top-0 right-0 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl"></div>
        <div className="float-element absolute bottom-1/3 left-10 w-80 h-80 bg-amber-400/6 rounded-full blur-3xl"></div>
        <div className="float-element absolute top-1/2 right-1/3 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl"></div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid-whychoose" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#C9A870" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-whychoose)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className=" font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
              <span className="text-white">Why</span> Choose Us
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 mx-auto mb-8 shadow-lg shadow-amber-400/30"></div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Your trusted partner for premium false ceiling materials and exceptional service
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-amber-400/20 p-8 md:p-10 transition-all duration-500 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-400/20 hover:-translate-y-3 rounded-lg backdrop-blur-sm overflow-hidden"
            >
              {/* Background shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Number Badge */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-amber-400/10 to-amber-400/5 rounded-full group-hover:from-amber-400/20 group-hover:to-amber-400/10 transition-all duration-500"></div>

              <div className="flex items-start space-x-6 relative z-10">
                <div className="flex-shrink-0">
                  <div className="text-5xl md:text-6xl font-display bg-gradient-to-br from-amber-400/30 to-amber-400/10 bg-clip-text text-transparent group-hover:from-amber-400/60 group-hover:to-amber-400/30 transition-all duration-300 font-bold">
                    {reason.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl md:text-2xl text-amber-400 mb-3 group-hover:text-amber-300 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-amber-300 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

              {/* Left side accent */}
              <div className="absolute left-0 top-0 w-1 h-0 bg-gradient-to-b from-amber-400 to-transparent group-hover:h-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs