export interface IImage {
	alt: string;
	src: string;
}

export const myImages = {
	heroMen: {
		src: "/hero-men.jpg",
		alt: "Hero",
	},
	heroKids: {
		src: "/hero-kids.jpg",
		alt: "Hero",
	},
};

export interface Product {
	id: string;
	name: string;
	category: "men" | "kids";
	price: number;
	image: string;
	description: string;
	occasion: "casual" | "everyday" | "playwear" | "outing";
	variants: {
		sizes: string[];
		colors: string[];
	};
}

export const menProducts: Product[] = [
	{
		id: "1",
		name: "Classic Cotton Tee",
		category: "men",
		price: 2499,
		image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
		description:
			"Premium cotton t-shirt with a perfect fit for everyday comfort.",
		occasion: "everyday",
		variants: {
			sizes: ["S", "M", "L", "XL", "XXL"],
			colors: ["White", "Black", "Navy", "Gray"],
		},
	},
	{
		id: "2",
		name: "Luxury Linen Shirt",
		category: "men",
		price: 4999,
		image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
		description: "Breathable linen shirt perfect for casual outings.",
		occasion: "outing",
		variants: {
			sizes: ["S", "M", "L", "XL"],
			colors: ["White", "Beige", "Light Blue"],
		},
	},
	{
		id: "3",
		name: "Casual Chinos",
		category: "men",
		price: 3999,
		image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
		description: "Versatile chinos that blend comfort with style.",
		occasion: "casual",
		variants: {
			sizes: ["30", "32", "34", "36", "38"],
			colors: ["Khaki", "Navy", "Olive", "Gray"],
		},
	},
	{
		id: "4",
		name: "Premium Polo Shirt",
		category: "men",
		price: 3499,
		image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800",
		description: "Classic polo design with modern fit.",
		occasion: "casual",
		variants: {
			sizes: ["S", "M", "L", "XL"],
			colors: ["White", "Navy", "Burgundy", "Forest Green"],
		},
	},
	{
		id: "5",
		name: "Kids Cotton Tee",
		category: "kids",
		price: 1299,
		image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800",
		description: "Soft and comfortable tee for everyday play.",
		occasion: "everyday",
		variants: {
			sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
			colors: ["White", "Blue", "Red", "Yellow"],
		},
	},
	{
		id: "6",
		name: "Kids Playful Shorts",
		category: "kids",
		price: 1499,
		image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800",
		description: "Comfortable shorts perfect for active play.",
		occasion: "playwear",
		variants: {
			sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
			colors: ["Navy", "Khaki", "Gray"],
		},
	},
	{
		id: "7",
		name: "Kids Casual Hoodie",
		category: "kids",
		price: 2299,
		image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
		description: "Cozy hoodie for casual outings and cooler days.",
		occasion: "outing",
		variants: {
			sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
			colors: ["Gray", "Navy", "Black", "Red"],
		},
	},
	{
		id: "8",
		name: "Kids Denim Jeans",
		category: "kids",
		price: 1999,
		image: "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800",
		description: "Durable denim jeans for everyday adventures.",
		occasion: "everyday",
		variants: {
			sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
			colors: ["Blue", "Black"],
		},
	},
];



