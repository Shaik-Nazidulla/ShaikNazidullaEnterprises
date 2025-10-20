import { useState, useEffect, useCallback, useRef } from 'react'

export const useWindowSize = (debounceDelay = 150) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  const debounceTimeoutRef = useRef(null)

  const handleResize = useCallback(() => {
    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Set new debounced timeout
    debounceTimeoutRef.current = setTimeout(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, debounceDelay)
  }, [debounceDelay])

  useEffect(() => {
    // Set initial size (fixes SSR issues)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [handleResize])

  return windowSize
}

/**
 * Advanced version with breakpoint helpers
 */
export const useWindowSizeWithBreakpoints = (debounceDelay = 150) => {
  const windowSize = useWindowSize(debounceDelay)

  // Common breakpoints (Tailwind defaults)
  const breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  }

  const isBreakpoint = useCallback((breakpoint) => {
    return windowSize.width >= breakpoints[breakpoint]
  }, [windowSize.width])

  const getActiveBreakpoint = useCallback(() => {
    const width = windowSize.width
    if (width >= breakpoints['2xl']) return '2xl'
    if (width >= breakpoints.xl) return 'xl'
    if (width >= breakpoints.lg) return 'lg'
    if (width >= breakpoints.md) return 'md'
    if (width >= breakpoints.sm) return 'sm'
    return 'xs'
  }, [windowSize.width])

  return {
    ...windowSize,
    isBreakpoint,
    getActiveBreakpoint,
    isMobile: windowSize.width < breakpoints.md,
    isTablet: windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg,
    isDesktop: windowSize.width >= breakpoints.lg,
  }
}