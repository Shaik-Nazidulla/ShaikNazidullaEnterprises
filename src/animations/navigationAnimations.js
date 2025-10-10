import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export const smoothScrollTo = (target, options = {}) => {
  const { duration = 1.2, offset = 80 } = options

  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY: offset
    },
    ease: 'power3.inOut'
  })
}

export const navItemHover = (element) => {
  const tl = gsap.timeline({ paused: true })
  
  tl.to(element, {
    color: '#C9A870',
    scale: 1.05,
    duration: 0.3,
    ease: 'power2.out'
  })

  return tl
}

export const mobileMenuAnimation = (menuElement, isOpen) => {
  const items = menuElement.querySelectorAll('a')
  
  if (isOpen) {
    gsap.to(menuElement, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.3,
      ease: 'power2.out'
    })

    gsap.from(items, {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power3.out'
    })
  } else {
    gsap.to(menuElement, {
      opacity: 0,
      visibility: 'hidden',
      duration: 0.3,
      ease: 'power2.in'
    })
  }
}
