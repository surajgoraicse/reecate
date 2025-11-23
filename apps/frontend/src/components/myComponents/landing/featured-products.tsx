import { ProductCard } from "@/components/product/product-card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { getFeaturedProducts } from "@/lib/data/landing-products";

export async function FeaturedProducts() {
	const products = await getFeaturedProducts();

	return (
		<section
			aria-label="Featured Products"
			className="mx-auto max-w-6xl px-4"
		>
			<header className="mb-6 flex items-center justify-between">
				<h2 className="text-balance text-2xl font-semibold md:text-3xl">
					Featured
				</h2>
				<a href="/search?sort=featured" className="text-sm underline">
					View all
				</a>
			</header>

			<Carousel opts={{ align: "start" }} className="relative">
				<CarouselContent>
					{products.map((p) => (
						<CarouselItem
							key={p.id}
							className="basis-1/2 md:basis-1/3 lg:basis-1/4"
						>
							<ProductCard product={p} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	);
}
