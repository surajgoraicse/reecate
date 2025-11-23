"use client"

import React from "react"

type CartItem = {
  productId: string
  quantity: number
  variantId?: string
}

type CartContextValue = {
  items: CartItem[]
  addToCart: (productId: string, quantity: number, variantId?: string) => Promise<void>
}

const CartContext = React.createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([])

  const addToCart = React.useCallback(async (productId: string, quantity: number, variantId?: string) => {
    // Simulate latency/API call:
    await new Promise((res) => setTimeout(res, 250))
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.variantId === variantId)
      if (existing) {
        return prev.map((i) => (i === existing ? { ...i, quantity: i.quantity + quantity } : i))
      }
      return [...prev, { productId, quantity, variantId }]
    })
    console.log("[v0] addToCart:", { productId, quantity, variantId })
  }, [])

  const value = React.useMemo(() => ({ items, addToCart }), [items, addToCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
