import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const categories = [
  {
    key: "men",
    label: "Men",
    href: "/search?category=men",
    image: "/men-category-fashion.jpg",
  },
  {
    key: "women",
    label: "Women",
    href: "/search?category=women",
    image: "/women-category-fashion.jpg",
  },
  {
    key: "kids",
    label: "Kids",
    href: "/search?category=kids",
    image: "/kids-category-fashion.jpg",
  },
  {
    key: "accessories",
    label: "Accessories",
    href: "/search?category=accessories",
    image: "/accessories-category-fashion.jpg",
  },
]

export function ShopByCategory() {
  return (
    <section aria-label="Shop by Category" className="mx-auto max-w-6xl px-4">
      <header className="mb-6 text-center">
        <h2 className="text-balance text-2xl font-semibold md:text-3xl">Shop by Category</h2>
      </header>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.key} href={c.href} className="group relative block overflow-hidden rounded-lg">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={c.image || "/placeholder.svg"}
                alt={c.label}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-black/20 p-4">
              <span className={cn("rounded bg-background/80 px-3 py-1 text-sm")}>{c.label}</span>
            </div>
            <span className="sr-only">Shop {c.label} now</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
