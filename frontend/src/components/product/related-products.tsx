import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/lib/data/products";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function RelatedProducts({ products }: { products: Product[] }) {
	return (
		<section className="mt-16">
			<h2 className="text-pretty text-xl font-semibold md:text-2xl">
				Related Products
			</h2>
			<div className="relative mt-6">
				<Carousel
					className="w-full"
					opts={{ align: "start", loop: false }}
				>
					<CarouselContent>
						{products.map((p) => (
							<CarouselItem
								key={p.id}
								className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
							>
								<article
									className={cn(
										"group rounded-lg border border-border bg-card transition hover:shadow-sm"
									)}
								>
									<Link
										href={`/product/${p.slug}`}
										className="block"
									>
										<div className="relative aspect-square overflow-hidden rounded-t-lg">
											<Image
												src={
													p.images[0] ||
													"/placeholder.svg"
												}
												alt={p.name}
												fill
												className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
												sizes="(max-width: 768px) 70vw, 25vw"
											/>
										</div>
										<div className="p-3">
											<h3 className="line-clamp-1 text-sm font-medium">
												{p.name}
											</h3>
											<p className="mt-1 text-xs text-muted-foreground">
												{new Intl.NumberFormat(
													undefined,
													{
														style: "currency",
														currency: "USD",
													}
												).format(p.price)}
											</p>
										</div>
									</Link>
								</article>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</section>
	);
}
