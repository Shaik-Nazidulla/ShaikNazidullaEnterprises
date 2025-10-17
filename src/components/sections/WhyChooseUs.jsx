import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WhyChooseUs = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const itemsRef = useRef(null)

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

      if (itemsRef.current) {
        const items = itemsRef.current.children
        
        gsap.from(items, {
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 1
          },
          x: (index) => index % 2 === 0 ? -100 : 100,
          opacity: 0,
          stagger: 0.15
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Why <span className="text-gradient">Choose Us</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Your trusted partner for false ceiling materials
          </p>
        </div>

        <div ref={itemsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="group relative bg-dark-secondary border border-primary/20 p-8 transition-all duration-500 hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2"
            >
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="text-5xl font-display text-primary/20 group-hover:text-primary/40 transition-colors duration-300">
                    {reason.number}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl text-primary mb-3 group-hover:text-primary-light transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
