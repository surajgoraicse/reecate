"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const slides = [
  {
    id: "s1",
    src: "/latest-collection-1.jpg",
    title: "Refined Essentials",
    subtitle: "Minimal silhouettes for everyday comfort.",
    cta: { label: "Shop Now", href: "/search?collection=essentials" },
  },
  {
    id: "s2",
    src: "/latest-collection-2.jpg",
    title: "Autumn Layers",
    subtitle: "Warm textures. Clean lines.",
    cta: { label: "Discover", href: "/search?collection=autumn" },
  },
  {
    id: "s3",
    src: "/latest-collection-3.jpg",
    title: "Monochrome Edit",
    subtitle: "Elevate your wardrobe with timeless tones.",
    cta: { label: "Explore", href: "/search?collection=monochrome" },
  },
]

export function HeroSection() {
  return (
    <section aria-label="Hero">
      <div className="relative">
        <Carousel className="mx-auto max-w-[1400px]" opts={{ loop: true, align: "start" }}>
          <CarouselContent>
            {slides.map((s) => (
              <CarouselItem key={s.id}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                  <Image src={s.src || "/placeholder.svg"} alt={s.title} fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center px-6">
                    <div className="max-w-3xl text-center text-white">
                      <h1 className="text-balance text-3xl font-semibold leading-tight md:text-5xl">{s.title}</h1>
                      <p className="mt-3 text-pretty text-sm leading-relaxed md:text-base">{s.subtitle}</p>
                      <Button
                        asChild
                        className="mt-6"
                        // overriding background => contrast handled by Button styles
                      >
                        <a href={s.cta.href}>{s.cta.label}</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 md:-left-12" />
          <CarouselNext className="right-4 md:-right-12" />
        </Carousel>
      </div>
    </section>
  )
}
