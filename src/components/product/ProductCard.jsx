import React, { useState } from 'react'

const ProductCard = ({ product, onImageLoad }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
    if (onImageLoad) onImageLoad()
  }

  const handleImageError = () => {
    setImageError(true)
    if (onImageLoad) onImageLoad()
  }

  return (
    <>
      <div className="group relative bg-gradient-to-br from-gray-900 to-gray-950 border border-amber-400/20 rounded-lg overflow-hidden transition-all duration-500 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-400/20 hover:-translate-y-2">
        {/* Product Image Area */}
        <div className="relative h-64 bg-gray-950 overflow-hidden">
          {!imageError && product.image ? (
            <img 
              src={product.image}
              alt={product.title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
              <div className="w-32 h-32 border-2 border-amber-400/30 rotate-45 flex items-center justify-center group-hover:scale-110 group-hover:rotate-90 transition-all duration-700">
                <span className="text-amber-400 text-5xl font-bold -rotate-45 group-hover:rotate-0 transition-all duration-700 font-display">
                  {product.id}
                </span>
              </div>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent opacity-80"></div>
          
          {/* Badge */}
          {product.inStock && (
            <div className="absolute top-4 right-4 bg-amber-400 text-gray-950 text-xs font-bold px-3 py-1.5 tracking-wider shadow-lg">
              IN STOCK
            </div>
          )}

          {/* Quick View Button */}
          <button
            onClick={() => setShowDetails(true)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-950 px-6 py-2 font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:bg-amber-300 shadow-lg"
          >
            QUICK VIEW
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-xl md:text-2xl text-amber-400 mb-3 group-hover:text-amber-300 transition-colors duration-300">
            {product.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Features List */}
          <ul className="space-y-2 mb-6">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start">
                <svg className="w-4 h-4 text-amber-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-amber-400/20">
            <span className="text-amber-400 font-semibold text-sm">{product.price}</span>
            <button 
              onClick={() => setShowDetails(true)}
              className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center gap-2 group/btn transition-colors duration-300"
            >
              View Details
              <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {showDetails && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowDetails(false)}
        >
          <div 
            className="bg-gradient-to-br from-gray-900 to-gray-950 border border-amber-400/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-950/95 backdrop-blur-sm border-b border-amber-400/20 p-6 flex items-center justify-between z-10">
              <h2 className="font-display text-3xl text-amber-400">{product.title}</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Image */}
                <div className="relative h-80 bg-gray-950 rounded-lg overflow-hidden">
                  {!imageError && product.image ? (
                    <img 
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                      loading="eager"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-amber-400 text-6xl font-bold font-display">{product.id}</span>
                    </div>
                  )}
                </div>

                {/* Quick Info */}
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-4">Product Overview</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">{product.longDescription}</p>
                  
                  {product.inStock && (
                    <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 px-4 py-2 rounded mb-6">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                      <span className="text-amber-400 font-semibold text-sm">Available in Stock</span>
                    </div>
                  )}

                  <div className="bg-gray-950 border border-amber-400/20 rounded-lg p-4">
                    <p className="text-gray-400 text-sm mb-2">Pricing</p>
                    <p className="text-amber-400 font-bold text-2xl">{product.price}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-amber-400 mb-4">Key Features</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 bg-gray-950 border border-amber-400/10 p-3 rounded">
                      <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-amber-400 mb-4">Specifications</h3>
                <div className="bg-gray-950 border border-amber-400/20 rounded-lg overflow-hidden">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div 
                      key={key}
                      className={`flex flex-col sm:flex-row sm:items-center p-4 ${
                        index !== Object.entries(product.specifications).length - 1 ? 'border-b border-amber-400/10' : ''
                      }`}
                    >
                      <span className="text-amber-400 font-semibold capitalize sm:w-1/3 mb-2 sm:mb-0">{key}</span>
                      <span className="text-gray-300">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-amber-400 mb-4">Applications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app, index) => (
                    <span 
                      key={index}
                      className="bg-amber-400/10 border border-amber-400/30 text-amber-400 px-4 py-2 rounded-full text-sm"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  onClick={() => setShowDetails(false)}
                  className="flex-1 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-gray-950 font-bold px-8 py-4 text-center transition-all duration-300 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 rounded-lg"
                >
                  REQUEST QUOTE
                </a>
                <a
                  href="tel:+919705883384"
                  className="flex-1 bg-gray-950 hover:bg-gray-900 border-2 border-amber-400/30 hover:border-amber-400 text-amber-400 font-bold px-8 py-4 text-center transition-all duration-300 rounded-lg"
                >
                  CALL NOW
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  )
}

export default ProductCard