import Image from "next/image"
import { Button } from "@/components/ui/button"

export function SeasonalBanner() {
  return (
    <section aria-label="Seasonal Banner" className="px-4">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative aspect-[21/9] overflow-hidden rounded-lg">
          <Image
            src="/autumn-collection-2025.jpg"
            alt="Autumn Collection 2025"
            fill
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div className="px-6">
              <h2 className="text-balance text-2xl font-semibold md:text-4xl">Autumn Collection 2025</h2>
              <p className="mt-2 text-pretty text-sm md:text-base">Up to 40% Off</p>
              <Button asChild className="mt-5">
                <a href="/search?collection=autumn">Shop the Collection</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
