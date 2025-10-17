"use client"

import React from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Product, ProductVariant } from "@/lib/data/products"
import { useCart } from "@/components/cart/cart-context"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

type Props = {
  product: Product
}

function formatPrice(n: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n)
}

export function ProductInfo({ product }: Props) {
  const { addToCart } = useCart()

  const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)))
  const uniqueColors = Array.from(new Set(product.variants.map((v) => v.color)))

  const searchParams = useSearchParams()
  const colorFromUrl = React.useMemo(() => {
    const c = searchParams.get("color")
    return c && uniqueColors.includes(c) ? c : uniqueColors[0]
  }, [searchParams, uniqueColors])

  const [size, setSize] = React.useState<string>(uniqueSizes[0])
  const [color, setColor] = React.useState<string>(colorFromUrl)
  React.useEffect(() => {
    setColor(colorFromUrl)
  }, [colorFromUrl])

  const [qty, setQty] = React.useState<number>(1)
  const [wish, setWish] = React.useState<boolean>(false)
  const [pending, startTransition] = React.useTransition()

  const selectedVariant: ProductVariant | undefined = React.useMemo(
    () => product.variants.find((v) => v.size === size && v.color === color),
    [product.variants, size, color],
  )

  const inStock = (selectedVariant?.stock ?? 0) > 0

  const handleAdd = () => {
    if (!selectedVariant) return
    startTransition(async () => {
      await addToCart(product.id, qty, selectedVariant.id)
    })
  }

  return (
    <section className="w-full">
      <h1 className="text-pretty text-2xl font-semibold md:text-3xl">{product.name}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{formatPrice(product.price)}</p>

      <p className="mt-4 text-sm leading-relaxed text-foreground">{product.description}</p>

      <div className="mt-6 space-y-6">
        {/* Size selector */}
        <div>
          <label className="mb-2 block text-sm font-medium">Size</label>
          <div role="radiogroup" className="flex flex-wrap gap-2">
            {uniqueSizes.map((s) => {
              const selected = s === size
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setSize(s)}
                  className={cn(
                    "rounded-md border px-3 py-2 text-sm transition",
                    selected ? "border-ring bg-secondary" : "border-input hover:border-ring hover:bg-muted",
                  )}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        {/* Color selector */}
        <div>
          <label className="mb-2 block text-sm font-medium">Color</label>
          <div className="flex flex-wrap items-center gap-2">
            {uniqueColors.map((c) => {
              const selected = c === color
              const href = `/product/${product.slug}?color=${encodeURIComponent(c)}`
              return (
                <Link
                  key={c}
                  href={href}
                  aria-label={`Select color ${c}`}
                  title={c}
                  className={cn(
                    "relative rounded-md border p-0.5 transition",
                    selected ? "border-ring ring-2 ring-ring" : "border-input hover:border-ring",
                  )}
                >
                  <div className="relative h-10 w-10 overflow-hidden rounded">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={`${product.name} - ${c}`}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <span className="sr-only">{c}</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-2 block text-sm font-medium">Quantity</label>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              −
            </Button>
            <div className="min-w-12 rounded-md border border-input px-3 py-2 text-center text-sm" aria-live="polite">
              {qty}
            </div>
            <Button type="button" variant="outline" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
              +
            </Button>
          </div>
        </div>

        {/* Stock status */}
        <div className="text-sm">
          {inStock ? (
            <span className="text-foreground">In Stock</span>
          ) : (
            <span className="text-muted-foreground">Out of Stock</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button type="button" onClick={handleAdd} disabled={!inStock || pending} className="min-w-40">
            {pending ? "Adding..." : "Add to Cart"}
          </Button>

          <button
            type="button"
            aria-pressed={wish}
            onClick={() => setWish((w) => !w)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md border transition",
              wish ? "border-ring bg-secondary" : "border-input hover:border-ring hover:bg-muted",
            )}
            aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
            title={wish ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-5 w-5 transition", wish ? "fill-current text-foreground" : "")} />
          </button>
        </div>
      </div>
    </section>
  )
}
