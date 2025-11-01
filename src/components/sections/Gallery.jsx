import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useOverlay } from '../../context/OverlayContext'

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
  const lightboxRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  
  const [hoveredItem, setHoveredItem] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageLoaded, setImageLoaded] = useState({})
  const [isMobile, setIsMobile] = useState(false)
  
  const { openOverlay, closeOverlay } = useOverlay()

  const galleryItems = [
    {
      id: 1,
      title: 'Corporate Office',
      category: 'Corporate',
      image: '/images/gallery/corporate_office.jpeg',
      description: 'Modern false ceiling design for corporate workspace'
    },
    {
      id: 2,
      title: 'Educational Institute',
      category: 'Education',
      image: '/images/gallery/educational_institution.jpeg',
      description: 'Acoustic ceiling solutions for educational facilities'
    },
    {
      id: 3,
      title: 'Hospital Installation',
      category: 'Healthcare',
      image: '/images/gallery/hospital.jpeg',
      description: 'Hygienic and functional ceiling systems for healthcare'
    },
    {
      id: 4,
      title: 'Residential Project',
      category: 'Residential',
      image: '/images/gallery/residential.jpeg',
      description: 'Elegant home ceiling design with contemporary aesthetics'
    },
    {
      id: 5,
      title: 'Retail Space',
      category: 'Commercial',
      image: '/images/gallery/retail_space.jpeg',
      description: 'Eye-catching ceiling design for retail environments'
    },
    {
      id: 6,
      title: 'Shopping Mall',
      category: 'Commercial',
      image: '/images/gallery/shopping_mall.jpeg',
      description: 'Grand scale false ceiling installation for shopping centers'
    }
  ]

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  // Lightbox animations
  useEffect(() => {
    if (selectedImage && lightboxRef.current) {
      gsap.fromTo(lightboxRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      
      const imageElement = lightboxRef.current.querySelector('.lightbox-image')
      if (imageElement) {
        gsap.fromTo(imageElement,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
        )
      }
    }
  }, [selectedImage])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!selectedImage) return
      
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowRight') {
        navigateImage('next')
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage])

  // Touch handlers for swipe navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      // Swiped left - next image
      navigateImage('next')
    }
    
    if (touchStartX.current - touchEndX.current < -75) {
      // Swiped right - previous image
      navigateImage('prev')
    }
  }

  const openLightboxHandler = (item) => {
    setSelectedImage(item)
    openOverlay()
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    const imageElement = lightboxRef.current?.querySelector('.lightbox-image')
    if (imageElement) {
      gsap.to(imageElement, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          setSelectedImage(null)
          closeOverlay()
          document.body.style.overflow = 'auto'
        }
      })
    } else {
      setSelectedImage(null)
      closeOverlay()
      document.body.style.overflow = 'auto'
    }
  }

  const navigateImage = (direction) => {
    const currentIndex = galleryItems.findIndex(item => item.id === selectedImage.id)
    let newIndex
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryItems.length
    } else {
      newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
    }
    
    setSelectedImage(galleryItems[newIndex])
  }

  return (
    <section id="gallery" ref={sectionRef} className="relative py-16 md:py-20 lg:py-32 bg-gradient-to-b from-gray-950 via-black to-gray-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div ref={bgElementsRef} className="absolute inset-0">
        <div className="float-element absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-amber-400/8 rounded-full blur-3xl"></div>
        <div className="float-element absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-amber-400/6 rounded-full blur-3xl"></div>
        <div className="float-element absolute top-1/2 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-amber-400/5 rounded-full blur-3xl"></div>
        
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

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16 lg:mb-24">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 md:mb-6 px-4">
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
              <span className="text-white">Project</span> Gallery
            </span>
          </h2>
          <div className="w-24 md:w-32 h-1 md:h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 mx-auto mb-6 md:mb-8 shadow-lg shadow-amber-400/30"></div>
          <p className="text-gray-300 text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed px-4">
            Showcasing excellence in false ceiling installations across diverse projects
          </p>
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id}
              className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg touch-manipulation"
              onMouseEnter={() => !isMobile && setHoveredItem(item.id)}
              onMouseLeave={() => !isMobile && setHoveredItem(null)}
              onClick={() => openLightboxHandler(item)}
            >
              {/* Background Base */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>

              {/* Border Effect */}
              <div className="absolute inset-0 border border-amber-400/30 group-hover:border-amber-400/60 group-active:border-amber-400/80 transition-all duration-300 rounded-lg"></div>

              {/* Loading Skeleton */}
              {!imageLoaded[item.id] && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
              )}

              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title}
                loading="lazy"
                onLoad={() => setImageLoaded(prev => ({ ...prev, [item.id]: true }))}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  imageLoaded[item.id] ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Overlay - Always visible on mobile, hover on desktop */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-all duration-500 ${
                isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}></div>

              {/* Content - Always visible on mobile */}
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 z-10 p-3 md:p-4 ${
                isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {!isMobile && (
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-amber-400 mb-2 md:mb-3 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                <p className="text-white font-display text-sm md:text-base lg:text-lg font-semibold text-center mb-1">
                  {item.title}
                </p>
                <p className="text-amber-400 text-xs tracking-widest font-semibold">
                  {item.category}
                </p>
              </div>

              {/* Corner accents - desktop only */}
              {!isMobile && (
                <>
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 md:p-4"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-2 right-2 md:top-4 md:right-4 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-900/80 hover:bg-amber-400 active:bg-amber-500 text-white hover:text-black rounded-full transition-all duration-300 touch-manipulation"
            aria-label="Close lightbox"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('prev')
            }}
            className="absolute left-2 md:left-4 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-900/80 hover:bg-amber-400 active:bg-amber-500 text-white hover:text-black rounded-full transition-all duration-300 touch-manipulation"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage('next')
            }}
            className="absolute right-2 md:right-4 z-50 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gray-900/80 hover:bg-amber-400 active:bg-amber-500 text-white hover:text-black rounded-full transition-all duration-300 touch-manipulation"
            aria-label="Next image"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div 
            className="lightbox-image w-full max-w-6xl max-h-full flex flex-col items-center px-2 md:px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Info */}
            <div className="mt-4 md:mt-6 text-center max-w-2xl px-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-white mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-amber-400 text-xs md:text-sm font-semibold tracking-widest mb-2 md:mb-3">
                {selectedImage.category}
              </p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {selectedImage.description}
              </p>
            </div>

            {/* Image Counter */}
            <div className="mt-3 md:mt-4 text-gray-400 text-xs md:text-sm">
              {galleryItems.findIndex(item => item.id === selectedImage.id) + 1} / {galleryItems.length}
            </div>
          </div>

          {/* Swipe Indicator - Mobile Only */}
          {isMobile && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span>Swipe to navigate</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}

          {/* Keyboard Hints - Desktop Only */}
          {!isMobile && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 text-gray-400 text-xs">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-gray-800 rounded">ESC</kbd> Close
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-gray-800 rounded">←</kbd> Previous
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-gray-800 rounded">→</kbd> Next
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default Gallery