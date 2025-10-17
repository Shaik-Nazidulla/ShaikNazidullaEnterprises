import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)

  const stats = [
    { number: '10+', label: 'Years Experience' },
    { number: '500+', label: 'Projects Completed' },
    { number: '100+', label: 'Happy Clients' },
    { number: '24/7', label: 'Support Available' }
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

      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
          },
          y: 80,
          opacity: 0,
          stagger: 0.15,
          scale: 0.8
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-dark-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            About <span className="text-gradient">Our Company</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto"></div>
        </div>

        <div ref={contentRef} className="max-w-4xl mx-auto space-y-6 mb-16 md:mb-20">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed text-center">
            Shaik Nazidulla Enterprises is your trusted partner for premium false ceiling materials. 
            With over a decade of experience in the industry, we specialize in providing high-quality 
            gypsum boards, PVC ceiling panels, metal profiles, and complete installation accessories.
          </p>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed text-center">
            Our commitment to quality, competitive pricing, and exceptional customer service has made 
            us a preferred choice for contractors, builders, and interior designers across the region. 
            We source our products from certified manufacturers and ensure every item meets international standards.
          </p>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed text-center">
            Whether you're working on residential projects, commercial spaces, or large-scale developments, 
            we have the expertise and inventory to meet your requirements with prompt delivery and technical support.
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group relative bg-dark border border-primary/20 p-6 md:p-8 text-center transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="text-4xl md:text-5xl lg:text-6xl font-display text-gradient mb-3 md:mb-4">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm md:text-base tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
