// nazidullaenterprises/src/data/products.js
export const products = [
  {
    id: 1,
    title: 'Gypsum Boards',
    slug: 'gypsum-boards',
    description: 'High-quality gypsum boards for smooth, durable false ceilings with excellent finish',
    longDescription: 'Premium quality gypsum boards manufactured to international standards. Perfect for creating smooth, seamless false ceilings in residential and commercial spaces.',
    features: [
      'Fire-resistant properties',
      'Superior sound insulation',
      'Easy installation process',
      'Moisture-resistant variants',
      'Smooth surface finish',
      'Eco-friendly material'
    ],
    specifications: {
      thickness: '12.5mm',
      size: '6ft x 4ft',
      weight: 'Lightweight',
      finish: 'Smooth white surface'
    },
    applications: ['Residential ceilings', 'Office spaces', 'Hotels', 'Hospitals'],
    image: '/images/products/gypsum-boards.png',
    price: 'Contact for pricing',
    inStock: true
  },
  {
    id: 2,
    title: 'PVC Ceiling Panels',
    slug: 'pvc-ceiling-panels',
    description: 'Moisture-resistant PVC panels perfect for kitchens, bathrooms, and humid areas',
    longDescription: 'Durable PVC ceiling panels that resist moisture, mold, and mildew. Ideal for areas with high humidity and requiring low maintenance.',
    features: [
      '100% waterproof',
      'Low maintenance required',
      'Wide variety of designs',
      'Termite-proof material',
      'Quick installation',
      'Cost-effective solution'
    ],
    specifications: {
      thickness: '8mm, 9mm',
      size: '10ft x 1ft, 12ft x 1ft',
      weight: 'Ultra-lightweight',
      finish: 'Glossy and matte options'
    },
    applications: ['Kitchen ceilings', 'Bathroom ceilings', 'Balconies', 'Outdoor areas'],
    image: '/images/products/PVC-panels.png',
    price: 'Contact for pricing',
    inStock: true
  },
  {
    id: 3,
    title: 'Metal Profiles',
    slug: 'metal-profiles',
    description: 'Strong aluminum and steel profiles for robust ceiling framework and support',
    longDescription: 'High-grade metal profiles and channels engineered for maximum strength and durability. Essential components for professional ceiling installations.',
    features: [
      'Corrosion-resistant coating',
      'High load-bearing capacity',
      'Precise dimensional accuracy',
      'Rust-proof treatment',
      'Easy to cut and install',
      'Long-lasting durability'
    ],
    specifications: {
      material: 'Galvanized steel, Aluminum',
      thickness: '0.4mm - 0.8mm',
      length: '10ft, 12ft custom lengths',
      finish: 'Galvanized/Powder coated'
    },
    applications: ['Ceiling framework', 'Partition walls', 'Grid systems', 'Support structures'],
    image: '/images/products/metal-frames.png',
    price: 'Contact for pricing',
    inStock: true
  },
  {
    id: 4,
    title: 'Accessories',
    slug: 'accessories-screws',
    description: 'Complete range of installation accessories, screws, and fasteners for perfect finish',
    longDescription: 'Comprehensive collection of premium quality accessories including screws, anchors, joint tapes, and corner beads for professional ceiling installations.',
    features: [
      'Premium quality materials',
      'Various sizes available',
      'Bulk quantities in stock',
      'Corrosion-resistant',
      'Easy application',
      'Professional-grade quality'
    ],
    specifications: {
      includes: 'Drywall screws, Anchors, Joint tape, Corner beads',
      material: 'Hardened steel, Fiber mesh',
      packaging: 'Bulk packs available',
      finish: 'Zinc-coated'
    },
    applications: ['Ceiling installation', 'Wall mounting', 'Finishing work', 'Repairs'],
    image: '/images/products/accessories.png',
    price: 'Contact for pricing',
    inStock: true
  }
]

export const productCategories = [
  'All Products',
  'Gypsum Boards',
  'PVC Panels',
  'Metal Profiles',
  'Accessories'
]