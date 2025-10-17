import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)

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

      if (gridRef.current) {
        const items = gridRef.current.children
        
        gsap.from(items, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            end: 'top 35%',
            scrub: 1
          },
          y: 100,
          opacity: 0,
          scale: 0.8,
          stagger: {
            amount: 0.6,
            from: 'random'
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="gallery" ref={sectionRef} className="py-20 md:py-32 bg-dark-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16 md:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            Project <span className="text-gradient">Gallery</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Showcasing excellence in false ceiling installations
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div 
              key={index}
              className="group relative aspect-square bg-dark border border-primary/20 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-dark to-dark-secondary">
                <div className="w-20 h-20 border-2 border-primary/30 rotate-45 group-hover:rotate-90 transition-all duration-700">
                  <div className="absolute inset-0 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-700">
                    <span className="text-primary text-2xl font-display">{item}</span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500"></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
