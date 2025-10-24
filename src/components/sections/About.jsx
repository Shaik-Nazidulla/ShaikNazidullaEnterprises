import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const aboutSectionAnimation = (elements) => {
  const { title, content, stats } = elements

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

  if (content) {
    gsap.from(content.children, {
      scrollTrigger: {
        trigger: content,
        start: 'top 75%',
        end: 'top 45%',
        scrub: 1
      },
      y: 60,
      opacity: 0,
      stagger: 0.2
    })
  }

  if (stats) {
    gsap.from(stats.children, {
      scrollTrigger: {
        trigger: stats,
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
}

const About = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)
  const bgElementsRef = useRef(null)

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '500+', label: 'Projects Completed' },
    { number: '1000+', label: 'Happy Clients' },
    { number: '24/7', label: 'Support Available' }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      aboutSectionAnimation({
        title: titleRef.current,
        content: contentRef.current,
        stats: statsRef.current
      })

      // Floating animation for background elements
      if (bgElementsRef.current) {
        const elements = bgElementsRef.current.querySelectorAll('.float-element')
        elements.forEach((el, i) => {
          gsap.to(el, {
            y: -40 + i * 15,
            duration: 5 + i * 0.5,
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
    <section id="about" ref={sectionRef} className="relative py-20 md:py-32 bg-gradient-to-b from-gray-900 via-gray-950 to-black overflow-hidden">
      {/* Enhanced Background Effects */}
      <div ref={bgElementsRef} className="absolute inset-0">
        <div className="float-element absolute top-0 right-0 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl"></div>
        <div className="float-element absolute bottom-20 left-10 w-80 h-80 bg-amber-400/6 rounded-full blur-3xl"></div>
        <div className="float-element absolute top-1/2 right-1/3 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl"></div>
        
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid-about" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#C9A870" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-about)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="bg-gradient-to-r from-amber-300 to-amber-400 bg-clip-text text-transparent">
              <span className="text-white">About</span> Our Company
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 mx-auto mb-8 shadow-lg shadow-amber-400/30"></div>
          <p className="text-amber-400/80 text-sm tracking-widest font-semibold">EXCELLENCE IN EVERY DETAIL</p>
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="max-w-4xl mx-auto mb-16 md:mb-24">
          <div className="space-y-8">
            <div className="group relative p-8 md:p-10 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-amber-400/20 rounded-lg backdrop-blur-sm hover:border-amber-400/40 transition-all duration-500 hover:shadow-lg hover:shadow-amber-400/10">
              <div className="absolute top-0 left-0 w-1 h-8 bg-gradient-to-b from-amber-400 to-transparent rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                <span className="text-amber-400 font-semibold">Shaik Nazidulla Enterprises</span> is your trusted partner for premium false ceiling materials. With over a decade of experience in the industry, we specialize in providing high-quality gypsum boards, PVC ceiling panels, metal profiles, and complete installation accessories tailored to your needs.
              </p>
            </div>

            <div className="group relative p-8 md:p-10 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-amber-400/20 rounded-lg backdrop-blur-sm hover:border-amber-400/40 transition-all duration-500 hover:shadow-lg hover:shadow-amber-400/10">
              <div className="absolute top-0 left-0 w-1 h-8 bg-gradient-to-b from-amber-400 to-transparent rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                Our commitment to <span className="text-amber-400 font-semibold">quality, competitive pricing, and exceptional customer service</span> has made us a preferred choice for contractors, builders, and interior designers across the region. We source our products from certified manufacturers and ensure every item meets international standards for durability and performance.
              </p>
            </div>

            <div className="group relative p-8 md:p-10 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-amber-400/20 rounded-lg backdrop-blur-sm hover:border-amber-400/40 transition-all duration-500 hover:shadow-lg hover:shadow-amber-400/10">
              <div className="absolute top-0 left-0 w-1 h-8 bg-gradient-to-b from-amber-400 to-transparent rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                Whether you're working on <span className="text-amber-400 font-semibold">residential projects, commercial spaces, or large-scale developments</span>, we have the expertise and inventory to meet your requirements with prompt delivery and comprehensive technical support every step of the way.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-gray-400 text-base md:text-lg mb-6">
            Ready to elevate your projects with our premium materials?
          </p>
          <a 
            href="#contact"
            className="group inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-gray-950 font-bold px-10 py-5 transition-all duration-500 overflow-hidden shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 rounded-lg"
          >
            <span className="tracking-wider">LET'S CONNECT</span>
            <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default About