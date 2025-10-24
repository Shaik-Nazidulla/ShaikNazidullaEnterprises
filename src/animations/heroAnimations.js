import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const heroEntranceAnimation = (elements) => {
  const { title, subtitle, cta, indicator } = elements
  
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (title) {
    const titleLines = title.querySelectorAll('.title-line')
    tl.from(titleLines, {
      y: 120,
      opacity: 0,
      rotationX: -90,
      transformOrigin: 'top center',
      duration: 1.2,
      stagger: 0.2,
      delay: 0.5
    })
  }

  if (subtitle) {
    tl.from(subtitle, {
      y: 50,
      opacity: 0,
      duration: 1
    }, '-=0.6')
  }

  if (cta) {
    tl.from(cta, {
      y: 30,
      opacity: 0,
      duration: 0.8
    }, '-=0.4')
  }

  if (indicator) {
    tl.from(indicator, {
      opacity: 0,
      y: -20,
      duration: 0.6
    }, '-=0.4')
  }

  return tl
}

// OPTION 1: Blur & Blur-out effect
export const heroParallaxBlur = (heroElement) => {
  return gsap.to(heroElement, {
    scrollTrigger: {
      trigger: heroElement,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    },
    filter: 'blur(20px)',
    opacity: 0.3,
    y: -80
  })
}
