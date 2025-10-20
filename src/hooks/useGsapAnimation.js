// nazidullaenterprises/src/hooks/useGsapAnimation.js
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useFadeIn = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return

    const { delay = 0, duration = 1, y = 50 } = options

    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        end: 'top 60%',
        toggleActions: 'play none none reverse'
      },
      y,
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out'
    })
  }, [ref, options])
}

export const useStaggerFade = (ref, options = {}) => {
  useEffect(() => {
    if (!ref.current) return

    const { stagger = 0.15, y = 80 } = options
    const elements = ref.current.children

    gsap.from(elements, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        end: 'top 50%',
        scrub: 1
      },
      y,
      opacity: 0,
      stagger,
      ease: 'power3.out'
    })
  }, [ref, options])
}

export const useParallax = (ref, speed = 0.5) => {
  useEffect(() => {
    if (!ref.current) return

    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      },
      y: () => -ref.current.offsetHeight * speed,
      ease: 'none'
    })
  }, [ref, speed])
}
