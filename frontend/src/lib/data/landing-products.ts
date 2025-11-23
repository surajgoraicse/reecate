export type Product = {
	id: string;
	slug: string;
	name: string;
	price: number;
	image: string;
	badge?: "New" | "Best Seller" | "Limited";
	createdAt: string; // ISO date for sorting "new arrivals"
};

// Simple, fast dummy data for carousels
const allProducts: Product[] = [
	{
		id: "p-1",
		slug: "classic-cotton-tee",
		name: "Classic Cotton Tee",
		price: 24.99,
		image: "/classic-cotton-tee.jpg",
		badge: "Best Seller",
		createdAt: "2025-09-12",
	},
	{
		id: "p-2",
		slug: "everyday-jeans",
		name: "Everyday Jeans",
		price: 59.0,
		image: "/everyday-jeans.jpg",
		badge: "Best Seller",
		createdAt: "2025-10-01",
	},
	{
		id: "p-3",
		slug: "minimal-hoodie",
		name: "Minimal Hoodie",
		price: 69.0,
		image: "/minimal-hoodie.jpg",
		badge: "New",
		createdAt: "2025-10-14",
	},
	{
		id: "p-4",
		slug: "linen-shirt",
		name: "Linen Shirt",
		price: 49.0,
		image: "/linen-shirt.png",
		createdAt: "2025-09-28",
	},
	{
		id: "p-5",
		slug: "sleek-sneakers",
		name: "Sleek Sneakers",
		price: 89.0,
		image: "/sleek-sneakers.jpg",
		badge: "Limited",
		createdAt: "2025-09-30",
	},
	{
		id: "p-6",
		slug: "wool-coat",
		name: "Wool Coat",
		price: 149.0,
		image: "/wool-coat.jpg",
		createdAt: "2025-10-10",
	},
	{
		id: "p-7",
		slug: "ribbed-tank",
		name: "Ribbed Tank",
		price: 19.0,
		image: "/ribbed-tank.jpg",
		createdAt: "2025-08-20",
	},
	{
		id: "p-8",
		slug: "cargo-trousers",
		name: "Cargo Trousers",
		price: 72.0,
		image: "/cargo-trousers.jpg",
		createdAt: "2025-10-05",
	},
];

export async function getFeaturedProducts(): Promise<Product[]> {
	// For demo: pick “best sellers” then fill with top items
	const best = allProducts.filter((p) => p.badge === "Best Seller");
	const rest = allProducts.filter((p) => p.badge !== "Best Seller");
	return [...best, ...rest].slice(0, 8);
}

export async function getNewArrivals(): Promise<Product[]> {
	// Sort by most recent createdAt
	return [...allProducts]
		.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
		.slice(0, 8);
}
