export type ProductVariant = {
  id: string
  size: string
  color: string
  stock: number
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string
  price: number // in major currency units for simplicity
  images: string[]
  category: string
  variants: ProductVariant[]
}

const products: Product[] = [
  {
    id: "p1",
    name: "Classic Cotton Tee",
    slug: "classic-cotton-tee",
    description: "A timeless cotton tee with a relaxed fit. Soft, breathable, and perfect for everyday wear.",
    price: 29,
    category: "Apparel",
    images: [
      "/classic-cotton-tee-main-image.jpg",
      "/classic-cotton-tee-alt-image-1.jpg",
      "/classic-cotton-tee-alt-image-2.jpg",
      "/classic-cotton-tee-alt-image-3.jpg",
    ],
    variants: [
      { id: "p1-s-b", size: "S", color: "Black", stock: 8 },
      { id: "p1-m-b", size: "M", color: "Black", stock: 0 },
      { id: "p1-l-b", size: "L", color: "Black", stock: 4 },
      { id: "p1-s-w", size: "S", color: "White", stock: 3 },
      { id: "p1-m-w", size: "M", color: "White", stock: 5 },
      { id: "p1-l-w", size: "L", color: "White", stock: 2 },
    ],
  },
  {
    id: "p2",
    name: "Everyday Hoodie",
    slug: "everyday-hoodie",
    description: "Cozy fleece hoodie designed for comfort and warmth. Minimalist look, maximal comfort.",
    price: 69,
    category: "Apparel",
    images: ["/everyday-hoodie-main-image.jpg", "/everyday-hoodie-alt-image-1.jpg", "/everyday-hoodie-alt-image-2.jpg"],
    variants: [
      { id: "p2-s-n", size: "S", color: "Navy", stock: 6 },
      { id: "p2-m-n", size: "M", color: "Navy", stock: 10 },
      { id: "p2-l-n", size: "L", color: "Navy", stock: 1 },
      { id: "p2-s-g", size: "S", color: "Gray", stock: 0 },
      { id: "p2-m-g", size: "M", color: "Gray", stock: 4 },
      { id: "p2-l-g", size: "L", color: "Gray", stock: 2 },
    ],
  },
  {
    id: "p3",
    name: "Tailored Chinos",
    slug: "tailored-chinos",
    description: "Smart-casual chinos with a tapered fit and comfortable stretch. Dress them up or down.",
    price: 79,
    category: "Bottoms",
    images: ["/tailored-chinos-main-image.jpg", "/tailored-chinos-alt-image-1.jpg"],
    variants: [
      { id: "p3-30-k", size: "30", color: "Khaki", stock: 5 },
      { id: "p3-32-k", size: "32", color: "Khaki", stock: 0 },
      { id: "p3-34-k", size: "34", color: "Khaki", stock: 5 },
    ],
  },
  {
    id: "p4",
    name: "Lightweight Jacket",
    slug: "lightweight-jacket",
    description: "A versatile layer with water-resistant finish. Minimal details, maximum utility.",
    price: 119,
    category: "Outerwear",
    images: ["/lightweight-jacket-main-image.jpg", "/lightweight-jacket-alt-image-1.jpg"],
    variants: [
      { id: "p4-s-ol", size: "S", color: "Olive", stock: 2 },
      { id: "p4-m-ol", size: "M", color: "Olive", stock: 3 },
      { id: "p4-l-ol", size: "L", color: "Olive", stock: 3 },
    ],
  },
]

export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const related = products.filter((p) => p.category === product.category && p.id !== product.id)
  const fill = products.filter((p) => p.id !== product.id && !related.includes(p))
  const combined = [...related, ...fill]
  return combined.slice(0, limit)
}
