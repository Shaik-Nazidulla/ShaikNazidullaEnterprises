import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const fadeInUp = (element, options = {}) => {
  const { delay = 0, duration = 1, y = 80 } = options

  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
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
}

export const staggerFadeIn = (container, options = {}) => {
  const { stagger = 0.15, y = 60, scrub = false } = options
  const elements = container.children

  return gsap.from(elements, {
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      end: 'top 50%',
      scrub: scrub ? 1 : false,
      toggleActions: scrub ? undefined : 'play none none reverse'
    },
    y,
    opacity: 0,
    stagger,
    ease: 'power3.out'
  })
}

export const parallaxEffect = (element, speed = 0.5) => {
  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    },
    y: () => element.offsetHeight * speed,
    ease: 'none'
  })
}

export const scaleInEffect = (element, options = {}) => {
  const { scale = 0.8, rotation = 0 } = options

  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      end: 'top 55%',
      scrub: 1
    },
    scale,
    rotation,
    opacity: 0,
    ease: 'power2.out'
  })
}

export const slideInFromSide = (element, direction = 'left', options = {}) => {
  const { distance = 100, duration = 1 } = options
  const xValue = direction === 'left' ? -distance : distance

  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      end: 'top 60%',
      toggleActions: 'play none none reverse'
    },
    x: xValue,
    opacity: 0,
    duration,
    ease: 'power3.out'
  })
}

export const revealOnScroll = (element, options = {}) => {
  const { clipPath = true } = options

  if (clipPath) {
    return gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1
      },
      clipPath: 'inset(0% 0% 100% 0%)',
      ease: 'power2.inOut'
    })
  }
}

export const rotateIn = (element, options = {}) => {
  const { rotation = 45, scale = 0.5 } = options

  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      end: 'top 55%',
      scrub: 1
    },
    rotation,
    scale,
    opacity: 0,
    transformOrigin: 'center center',
    ease: 'power2.out'
  })
}
