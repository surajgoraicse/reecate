"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    alt: "Headphones Banner",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    alt: "Phone Banner",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    alt: "Laptop Banner",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    alt: "Headphones Banner",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    alt: "Phone Banner",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    alt: "Laptop Banner",
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    alt: "Headphones Banner",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    alt: "Phone Banner",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    alt: "Laptop Banner",
  },
];

export default function BannerCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false })
  );

  return (
    <div className="relative w-full overflow-hidden p-2 md:p-0" >
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="relative w-full">
              <div className="relative h-[220px] md:h-[300px] w-full">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  className="object-cover rounded-xl md:rounded-none "
                  priority

                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-2 hover:bg-white shadow-md" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-2 hover:bg-white shadow-md" />
      </Carousel>

 
    </div>
  );
}
