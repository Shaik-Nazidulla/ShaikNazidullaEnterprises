// nazidullaenterprises/src/components/sections/Products.jsx
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from '../product/ProductCard'
import { products } from '../../data/products'

gsap.registerPlugin(ScrollTrigger)

const productSectionAnimation = (elements) => {
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
    const cards = grid.children
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
        end: 'top 35%',
        scrub: 1.2
      },
      y: 100,
      opacity: 0,
      stagger: 0.15,
      rotationX: -15,
      transformOrigin: 'top center'
    })
  }
}

const Products = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const gridRef = useRef(null)
  const bgElementsRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      productSectionAnimation({
        title: titleRef.current,
        grid: gridRef.current
      })

      // Floating animation for background elements
      if (bgElementsRef.current) {
        const elements = bgElementsRef.current.querySelectorAll('.float-element')
        elements.forEach((el, i) => {
          gsap.to(el, {
            y: -35 + i * 12,
            duration: 5.5 + i * 0.3,
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
    <section id="products" ref={sectionRef} className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-gray-950 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div ref={bgElementsRef} className="absolute inset-0">
        <div className="float-element absolute bottom-0 left-0 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl"></div>
        <div className="float-element absolute top-1/3 right-0 w-80 h-80 bg-amber-400/6 rounded-full blur-3xl"></div>
        <div className="float-element absolute top-1/2 left-1/4 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl"></div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-3">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid-products" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A870" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-products)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Title Section */}
        <div ref={titleRef} className="text-center mb-16 md:mb-24">
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6">
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
              <span className="text-white">Our</span> Premium Products
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 mx-auto mb-8 shadow-lg shadow-amber-400/30"></div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Discover our comprehensive range of high-quality false ceiling materials engineered for excellence
          </p>
        </div>

        {/* Products Grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <p className="text-gray-400 text-base md:text-lg mb-6">
            Looking for custom solutions or bulk orders?
          </p>
          <a 
            href="#contact"
            className="group inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-gray-950 font-bold px-10 py-5 transition-all duration-500 overflow-hidden shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 rounded-lg"
          >
            <span className="tracking-wider">REQUEST QUOTE</span>
            <svg className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Products