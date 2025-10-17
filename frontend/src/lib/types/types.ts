export interface CartItem {
	id: string;
	user_id: string;
	product_id: string;
	quantity: number;
	size: SIZE_OPTION | null;
	color: COLOR_OPTION | null;
	created_at: string;
	updated_at: string;
	product?: Product;
}
export interface Product {
	id: string;
	name: string;
	description: string | null;
	price: number;
	category: string;
	SIZE_OPTION: SIZE_OPTION[];
	COLOR_OPTION: COLOR_OPTION[];
	images: string[];
	stock_quantity: number;
	featured: boolean;
	created_at: string;
	updated_at: string;
}
export type SIZE_OPTION = "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type COLOR_OPTION = "white" | "black" | "navy" | "gray" | "white";

export type Item = CartItem & { product: Product };
