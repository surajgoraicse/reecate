import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { RelatedProducts } from "@/components/product/related-products"
import { CartProvider } from "@/components/cart/cart-context"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params
  const product = getProductBySlug(slug)
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.name} — v0 Shop`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  }
}

export default async function ProductPage(props: PageProps) {
  const { slug } = await props.params
  const product = getProductBySlug(slug)
  if (!product) return notFound()

  const related = getRelatedProducts(product, 4)

  return (
    <main className="container mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="px-1">
            /
          </li>
          <li>
            <Link href={`/category/${encodeURIComponent(product.category.toLowerCase())}`} className="hover:underline">
              {product.category}
            </Link>
          </li>
          <li aria-hidden="true" className="px-1">
            /
          </li>
          <li aria-current="page" className="text-foreground">
            {product.name}
          </li>
        </ol>
      </nav>

      {/* Two-column layout */}
      <div className="mt-6 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <ProductGallery images={product.images} alt={product.name} />
        </div>
        <CartProvider>
          <ProductInfo product={product} />
        </CartProvider>
      </div>

      <RelatedProducts products={related} />
    </main>
  )
}
