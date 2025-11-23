"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
	id: string;
	name: string;
	brand: string;
	image: string;
	price: number;
	originalPrice: number;
	discount: number;
	rating: number;
	ratingCount: number;
	tag?: string;
	link: string;
}

interface ProductCardProps {
	product: Product;
}

export default function ProductCard1({ product }: ProductCardProps) {
	return (
		<Link href={product.link} className="group">
			<Card className="max-w-[313px] overflow-hidden border border-gray-200 rounded-sm hover:shadow-lg gap-0 transition-all duration-300 cursor-pointer py-0">
				<div className="relative w-full aspect-[5/6]  overflow-hidden">
					<Image
						src={product.image}
						alt={product.name}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
					/>

					{/* Tag badge (top-left) */}
					{product.tag && (
						<Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs font-medium px-2 py-0.5 rounded-md max-w-[50%] truncate">
							{product.tag}
						</Badge>
					)}

					{/* Wishlist icon (top-right) */}
					<button
						className="absolute top-2 right-2 bg-white/80 backdrop-blur-md p-1.5 rounded-full hover:bg-white transition"
						onClick={(e) => e.preventDefault()}
					>
						<Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
					</button>
				</div>

				<CardContent className="p-3 space-y-1">
					{/* Rating */}
					<div className="flex items-center gap-1 text-sm">
						<div className="flex items-center text-yellow-500">
							<Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
						</div>
						<span className="font-semibold text-gray-800">
							{product.rating}
						</span>
						<span className="text-gray-500">
							({product.ratingCount})
						</span>
					</div>

					{/* Brand */}
					<h3 className="text-sm font-semibold text-gray-900 truncate">
						{product.brand}
					</h3>

					{/* Name */}
					<p className="text-sm text-gray-600 truncate">
						{product.name}
					</p>

					{/* Price */}
					<div className="flex items-center gap-2 text-sm">
						<span className="font-semibold text-gray-900">
							₹{product.price.toLocaleString()}
						</span>
						<span className="text-gray-500 line-through">
							₹{product.originalPrice.toLocaleString()}
						</span>
						<span className="text-green-600 font-medium">
							{product.discount}% OFF
						</span>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
