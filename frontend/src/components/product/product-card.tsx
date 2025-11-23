import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/data/landing-products.ts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function ProductCard({
	product,
	className,
}: {
	product: Product;
	className?: string;
}) {
	return (
		<Link
			href={`/product/${product.slug}`}
			className={cn("block", className)}
		>
			<Card className="bg-card text-card-foreground transition-transform duration-200 hover:scale-[1.01]">
				<CardContent className="p-0">
					<div className="relative aspect-[3/4] w-full overflow-hidden">
						<Image
							src={product.image || "/placeholder.svg"}
							alt={product.name}
							fill
							sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw"
							className="object-cover"
							priority={false}
						/>
						{product.badge ? (
							<div className="absolute left-3 top-3">
								<Badge variant="secondary">
									{product.badge}
								</Badge>
							</div>
						) : null}
					</div>
					<div className="px-4 py-3">
						<p className="text-sm text-muted-foreground"> </p>
						<h3 className="text-pretty text-base font-medium">
							{product.name}
						</h3>
						<p className="mt-1 text-sm text-muted-foreground">
							${product.price.toFixed(2)}
						</p>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
