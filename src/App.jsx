import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Import all components directly (no lazy loading)
import ErrorBoundary from './components/ui/ErrorBoundary'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/layout/ScrollToTop'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Products from './components/sections/Products'
import Services from './components/sections/Services'
import WhyChooseUs from './components/sections/WhyChooseUs'
import Gallery from './components/sections/Gallery'
import Contact from './components/sections/Contact'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function App() {
  useEffect(() => {
    // GSAP ScrollTrigger configuration
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150
    })

    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
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
          <Hero />
          <About />
          <Products />
          <Services />
          <WhyChooseUs />
          <Gallery />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  )
}

export default App
