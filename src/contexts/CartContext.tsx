import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for cart functionality
export interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  quantity: number
  selected: boolean // For checkout selection
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: any) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  toggleSelection: (id: number) => void
  selectAll: (selected: boolean) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getSelectedItems: () => CartItem[]
  getSelectedTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("petcare_cart")
    if (savedCart) {
      setItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("petcare_cart", JSON.stringify(items))
  }, [items])

  const addToCart = (product: any) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // Add new item to cart
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: Number.parseFloat(product.price.replace(/[^\d]/g, "")), // Remove currency formatting
          originalPrice: product.originalPrice
            ? Number.parseFloat(product.originalPrice.replace(/[^\d]/g, ""))
            : undefined,
          image: product.image,
          category: product.category,
          quantity: 1,
          selected: true, // Default to selected
        }
        return [...prevItems, newItem]
      }
    })
  }

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const toggleSelection = (id: number) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)))
  }

  const selectAll = (selected: boolean) => {
    setItems((prevItems) => prevItems.map((item) => ({ ...item, selected })))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getSelectedItems = () => {
    return items.filter((item) => item.selected)
  }

  const getSelectedTotal = () => {
    return items.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleSelection,
    selectAll,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getSelectedItems,
    getSelectedTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
