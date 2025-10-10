import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-dark-secondary border border-primary/20 overflow-hidden transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
      {/* Product Image Area */}
      <div className="relative h-64 bg-dark overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-2 border-primary/30 rotate-45 flex items-center justify-center group-hover:scale-110 group-hover:rotate-90 transition-all duration-700">
            <span className="text-primary text-5xl font-bold -rotate-45 group-hover:rotate-0 transition-all duration-700 font-display">
              {product.id}
            </span>
          </div>
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-secondary to-transparent opacity-60"></div>
        
        {/* Badge */}
        {product.inStock && (
          <div className="absolute top-4 right-4 bg-primary text-dark text-xs font-semibold px-3 py-1 tracking-wider">
            IN STOCK
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl md:text-2xl text-primary mb-3 group-hover:text-primary-light transition-colors duration-300">
          {product.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {/* Features List */}
        <ul className="space-y-2 mb-6">
          {product.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="text-sm text-gray-300 flex items-start">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-primary/20">
          <span className="text-primary font-semibold text-sm">{product.price}</span>
          <button className="text-primary hover:text-primary-light text-sm font-medium flex items-center gap-2 group/btn transition-colors duration-300">
            View Details
            <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
