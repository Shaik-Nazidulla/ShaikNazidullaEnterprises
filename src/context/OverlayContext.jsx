import React, { createContext, useContext, useState } from 'react'

const OverlayContext = createContext()

export const useOverlay = () => {
  const context = useContext(OverlayContext)
  if (!context) {
    throw new Error('useOverlay must be used within OverlayProvider')
  }
  return context
}

export const OverlayProvider = ({ children }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const openOverlay = () => {
    setIsOverlayOpen(true)
  }

  const closeOverlay = () => {
    setIsOverlayOpen(false)
  }

  return (
    <OverlayContext.Provider value={{ isOverlayOpen, openOverlay, closeOverlay }}>
      {children}
    </OverlayContext.Provider>
  )
}