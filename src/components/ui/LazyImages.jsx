import React, { useState, useEffect, useRef } from 'react'

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/images/placeholder.jpg',
  onLoad 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder)
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    let observer
    
    if (imageRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src)
              observer.unobserve(imageRef.current)
            }
          })
        },
        {
          rootMargin: '100px'
        }
      )
      
      observer.observe(imageRef.current)
    } else {
      // Fallback for browsers without IntersectionObserver
      setImageSrc(src)
    }

    return () => {
      if (observer && imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [src])

  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  return (
    <img
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      className={`${className} transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      onLoad={handleLoad}
      loading="lazy"
    />
  )
}

export default LazyImage
