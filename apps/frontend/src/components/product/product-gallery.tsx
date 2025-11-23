"use client"

import Image from "next/image"
import React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
  images: string[]
  alt: string
}

export function ProductGallery({ images, alt }: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const activeSrc = images[activeIndex] ?? images[0]

  const goPrev = React.useCallback(() => {
    setActiveIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])
  const goNext = React.useCallback(() => {
    setActiveIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const touchStartX = React.useRef<number | null>(null)
  const touchDeltaX = React.useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current
    }
  }
  const handleTouchEnd = () => {
    const threshold = 40
    if (Math.abs(touchDeltaX.current) > threshold) {
      if (touchDeltaX.current < 0) goNext()
      else goPrev()
    }
    touchStartX.current = null
    touchDeltaX.current = 0
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      goPrev()
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      goNext()
    }
  }

  return (
    <div className="w-full">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-lg bg-card"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-roledescription="carousel"
        aria-label="Product images"
      >
        <FadeImage key={activeSrc} src={activeSrc} alt={alt} />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={goPrev}
            aria-label="Previous image"
            className="pointer-events-auto ml-0.5 rounded-full bg-background/80 backdrop-blur"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={goNext}
            aria-label="Next image"
            className="pointer-events-auto mr-0.5 rounded-full bg-background/80 backdrop-blur"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2 sm:grid-cols-6">
        {images.map((src, idx) => {
          const isActive = idx === activeIndex
          return (
            <button
              key={src + idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border transition",
                isActive ? "border-ring ring-2 ring-ring" : "border-border hover:border-ring",
              )}
              aria-pressed={isActive}
              aria-label={`Show image ${idx + 1}`}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`${alt} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 20vw, (max-width: 1024px) 15vw, 120px"
                priority={idx === 0}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function FadeImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = React.useState(false)
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      fill
      className={cn("object-cover transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
      onLoadingComplete={() => setLoaded(true)}
      sizes="(max-width: 768px) 100vw, 50vw"
      priority
    />
  )
}
