import React from 'react'

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-dark z-50 flex items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 border-2 border-primary/30 rotate-45 animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary text-3xl font-bold font-display">S</span>
        </div>
      </div>
    </div>
  )
}

export default Loader
