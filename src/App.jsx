import React, { useEffect, Suspense, lazy } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { useGSAP } from '@gsap/react'
import ErrorBoundary from './components/ui/ErrorBoundary'
import Loader from './components/ui/Loader'

// Layout Components (Keep these eager loaded)
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'

// Lazy load section components for better performance
const Hero = lazy(() => import('./components/sections/Hero'))
const About = lazy(() => import('./components/sections/About'))
const Products = lazy(() => import('./components/sections/Products'))
const Services = lazy(() => import('./components/sections/Services'))
const WhyChooseUs = lazy(() => import('./components/sections/WhyChooseUs'))
const Gallery = lazy(() => import('./components/sections/Gallery'))
const Contact = lazy(() => import('./components/sections/Contact'))

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP)

function App() {
  useEffect(() => {
    // GSAP ScrollTrigger configuration for performance
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150
    })

    // ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
      scroller: 'body',
    })

    // Refresh ScrollTrigger on window resize (debounced)
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 250)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <ErrorBoundary>
      <div className="relative bg-dark overflow-hidden">
        <Navbar />
        <main>
          <Suspense fallback={<Loader />}>
            <Hero />
            <About />
            <Products />
            <Services />
            <WhyChooseUs />
            <Gallery />
            <Contact />
          </Suspense>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  )
}

export default App
