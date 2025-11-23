"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Product } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductCarouselProps {
	products: Product[];
	title: string;
}

const ProductCarousel = ({ products, title }: ProductCarouselProps) => {
	const formatPrice = (price: number) => {
		return `₹${price.toLocaleString("en-IN")}`;
	};

	return (
		<div className="w-full py-12">
			<h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-8">
				{title}
			</h2>

			<Swiper
				modules={[Autoplay, Navigation, Pagination]}
				spaceBetween={24}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				loop={true}
				breakpoints={{
					640: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
				}}
				className="w-full pb-12"
			>
				{products.map((product) => (
					<SwiperSlide key={product.id}>
						<Card className="overflow-hidden hover-lift h-full">
							<Link href={`/product/${product.id}`}>
								<div className="aspect-square overflow-hidden">
									<Image
										width={500}
										height={500}
										
										src={product.image}
										alt={product.name}
										className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
									/>
								</div>
							</Link>
							<CardContent className="p-4">
								<Link href={`/product/${product.id}`}>
									<h3 className="font-semibold text-lg mb-2 hover:text-accent transition-colors">
										{product.name}
									</h3>
								</Link>
								<p className="text-sm text-muted-foreground mb-2">
									{product.description.substring(0, 60)}...
								</p>
								<p className="text-xl font-bold text-accent">
									{formatPrice(product.price)}
								</p>
							</CardContent>
							<CardFooter className="p-4 pt-0">
								<Button className="w-full" variant="default">
									<ShoppingBag className="mr-2 h-4 w-4" />
									Add to Cart
								</Button>
							</CardFooter>
						</Card>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default ProductCarousel;
