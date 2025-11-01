import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const gallerySectionAnimation = (elements) => {
  const { title, grid } = elements

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

  if (grid) {
    const items = grid.children
    
    gsap.from(items, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 75%',
        end: 'top 30%',
        scrub: 1.2
      },
      y: 100,
      opacity: 0,
      scale: 0.8,
      stagger: {
        amount: 0.5,
        from: 'random'
      }
    })
  }
}

const Gallery = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const bgElementsRef = useRef(null)
  const [hoveredItem, setHoveredItem] = useState(null)

  const galleryItems = [
    {
      id: 1,
      title: 'Residential Project',
      category: 'Interior'
    },
    {
      id: 2,
      title: 'Office Complex',
      category: 'Commercial'
    },
    {
      id: 3,
      title: 'Retail Space',
      category: 'Commercial'
    },
    {
      id: 4,
      title: 'Hospital Installation',
      category: 'Healthcare'
    },
    {
      id: 5,
      title: 'Corporate Office',
      category: 'Corporate'
    },
    {
      id: 6,
      title: 'Shopping Mall',
      category: 'Commercial'
    },
    {
      id: 7,
      title: 'Modern Residence',
      category: 'Residential'
    },
    {
      id: 8,
      title: 'Educational Institute',
      category: 'Education'
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gallerySectionAnimation({
        title: titleRef.current,
        grid: gridRef.current
      })

      // Floating animation for background elements
      if (bgElementsRef.current) {
        const elements = bgElementsRef.current.querySelectorAll('.float-element')
        elements.forEach((el, i) => {
          gsap.to(el, {
            y: -50 + i * 20,
            duration: 6 + i * 0.6,
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
    <section id="gallery" ref={sectionRef} className="relative py-20 md:py-32 bg-gradient-to-b from-gray-950 via-black to-gray-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div ref={bgElementsRef} className="absolute inset-0">
        <div className="float-element absolute top-0 left-0 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl"></div>
        <div className="float-element absolute bottom-0 right-0 w-96 h-96 bg-amber-400/6 rounded-full blur-3xl"></div>
        <div className="float-element absolute top-1/2 right-1/4 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl"></div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid-gallery" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#C9A870" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-gallery)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
              <span className="text-white">Project</span> Gallery
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 mx-auto mb-8 shadow-lg shadow-amber-400/30"></div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Showcasing excellence in false ceiling installations across diverse projects
          </p>
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Background Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>

              {/* Border Effect */}
              <div className="absolute inset-0 border border-amber-400/30 group-hover:border-amber-400/60 transition-all duration-300 rounded-lg"></div>

              {/* Placeholder Image Area */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700/40 to-gray-900/60">
                <div className="w-24 h-24 border-2 border-amber-400/20 rotate-45 group-hover:rotate-90 transition-all duration-700 rounded">
                  <div className="absolute inset-0 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-all duration-700">
                    <span className="text-amber-400 text-4xl font-display font-bold">{String(item.id).padStart(2, '0')}</span>
                  </div>
                </div>
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              {/* Content on Hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <svg className="w-14 h-14 text-amber-400 mb-4 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-white font-display text-lg font-semibold text-center px-4">
                  {item.title}
                </p>
                <p className="text-amber-400 text-xs mt-2 tracking-widest font-semibold">
                  {item.category}
                </p>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery