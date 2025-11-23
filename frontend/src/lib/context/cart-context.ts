import { createContext, useEffect, useState } from "react";
import { CartItem, Item, Product } from "../types/types";
import { authClient } from "../auth-client";
import { User } from "better-auth";

interface CartContextType {
	items: Item[];
	addItem: (
		productId: string,
		quantity: number,
		size?: string,
		color?: string
	) => Promise<void>;
	updateItem: (itemId: string, quantity: number) => Promise<void>;
	removeItem: (itemId: string) => Promise<void>;
	clearCart: () => Promise<void>;
	totalItems: number;
	totalPrice: number;
	loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<Item[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const initializeCart = async () => {
			try {
				const session = await authClient.getSession();

				if (session.data?.user) {
					setUser(session.data.user);
				}
				
			} catch (error) {}
		};
	}, []);

	return <CartContext.Provider> {children} </CartContext.Provider>;
}
