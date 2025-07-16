"use client"
import * as React from "react"
import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useUser } from "../contexts/UserContext"

const Cart = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    toggleSelection,
    selectAll,
    clearCart,
    getSelectedItems,
    getSelectedTotal,
  } = useCart()

  const { isLoggedIn } = useUser()

  const [isSelectAll, setIsSelectAll] = useState(true)

  // Handle select all toggle
  const handleSelectAll = () => {
    const newSelectAll = !isSelectAll
    setIsSelectAll(newSelectAll)
    selectAll(newSelectAll)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const selectedItems = getSelectedItems()
  const selectedTotal = getSelectedTotal()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-bounce mb-8">
              <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Keranjang Belanja Kosong</h2>
            <p className="text-gray-600 mb-8">Belum ada produk yang ditambahkan ke keranjang</p>
            <Link
              to="/store"
              className="inline-flex items-center space-x-2 bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-all transform hover:scale-105"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Mulai Belanja</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Keranjang Belanja</h1>
          <p className="text-gray-600">{items.length} produk dalam keranjang</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Select All Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelectAll}
                      onChange={handleSelectAll}
                      className="h-5 w-5 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                    />
                    <span className="text-lg font-medium text-gray-900">Pilih Semua ({items.length})</span>
                  </label>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Hapus Semua</span>
                  </button>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleSelection(item.id)}
                        className="h-5 w-5 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      />

                      {/* Product Image */}
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2 capitalize">Kategori: {item.category}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-cyan-600">{formatCurrency(item.price)}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatCurrency(item.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Produk Dipilih ({selectedItems.length})</span>
                  <span>{formatCurrency(selectedTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Ongkos Kirim</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-cyan-600">{formatCurrency(selectedTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              {selectedItems.length > 0 ? (
                isLoggedIn ? (
                  <Link
                    to="/checkout"
                    className="w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 bg-cyan-500 text-white hover:bg-cyan-600 transform hover:scale-105"
                  >
                    <span>Checkout ({selectedItems.length})</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 bg-cyan-500 text-white hover:bg-cyan-600 transform hover:scale-105"
                  >
                    <span>Login untuk Checkout</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                )
              ) : (
                <div className="w-full py-4 rounded-lg font-medium bg-gray-300 text-gray-500 cursor-not-allowed flex items-center justify-center space-x-2">
                  <span>Checkout ({selectedItems.length})</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}

              {/* Continue Shopping */}
              <Link
                to="/store"
                className="w-full mt-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Lanjut Belanja</span>
              </Link>

              {/* Promo Section */}
              <div className="mt-6 p-4 bg-cyan-50 rounded-lg">
                <h3 className="font-medium text-cyan-800 mb-2">Promo Hari Ini!</h3>
                <p className="text-sm text-cyan-600">Gratis ongkir untuk pembelian minimal Rp 200.000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
