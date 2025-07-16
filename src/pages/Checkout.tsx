"use client"

import * as React from "react"
import { useState } from "react"
import { CreditCard, Truck, MapPin, Phone, Check, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useUser } from "../contexts/UserContext"

const Checkout = () => {
  const navigate = useNavigate()
  const { getSelectedItems, getSelectedTotal, clearCart } = useCart()
  const { user, isLoggedIn, addOrder } = useUser()

  const [paymentMethod, setPaymentMethod] = useState("")
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    postalCode: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const selectedItems = getSelectedItems()
  const subtotal = getSelectedTotal()
  const shippingCost = 0 // Free shipping
  const total = subtotal + shippingCost

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!paymentMethod) {
      alert("Silakan pilih metode pembayaran")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)

      // Save order to history
      addOrder({
        date: new Date(),
        status: "processing",
        items: selectedItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        total,
        shippingAddress: `${shippingAddress.address}, ${shippingAddress.city}`,
        paymentMethod,
      })

      setOrderComplete(true)

      // Don't auto-redirect, let user choose
    }, 2000)
  }

  // Redirect if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Login Diperlukan</h2>
            <p className="text-gray-600 mb-8">Anda perlu login untuk melanjutkan checkout</p>
            <Link
              to="/login"
              className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Login Sekarang
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Redirect if no items selected
  if (selectedItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tidak Ada Produk untuk Checkout</h2>
            <p className="text-gray-600 mb-8">Silakan pilih produk di keranjang terlebih dahulu</p>
            <Link
              to="/cart"
              className="inline-flex items-center space-x-2 bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Kembali ke Keranjang</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Order completion screen
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-bounce mb-8">
              <div className="bg-green-500 rounded-full p-6 w-24 h-24 mx-auto flex items-center justify-center">
                <Check className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pembelian Berhasil!</h2>
            <p className="text-gray-600 mb-8">Terima kasih atas pembelian Anda. Pesanan akan segera diproses.</p>
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Detail Pesanan</h3>
              <p className="text-gray-600">Total: {formatCurrency(total)}</p>
              <p className="text-gray-600">Metode Pembayaran: {paymentMethod}</p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/history"
                className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Lihat Riwayat Pesanan
              </Link>
              <Link
                to="/"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Kembali ke Beranda
              </Link>
            </div>
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
          <Link
            to="/cart"
            className="inline-flex items-center space-x-2 text-cyan-600 hover:text-cyan-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Kembali ke Keranjang</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Alamat Pengiriman</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                    <textarea
                      required
                      rows={3}
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kota</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kode Pos</label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <CreditCard className="h-6 w-6 text-cyan-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Metode Pembayaran</h2>
                </div>

                <div className="space-y-3">
                  {[
                    { id: "credit-card", name: "Kartu Kredit/Debit", icon: CreditCard },
                    { id: "bank-transfer", name: "Transfer Bank", icon: CreditCard },
                    { id: "e-wallet", name: "E-Wallet (OVO, GoPay, Dana)", icon: Phone },
                    { id: "cod", name: "Bayar di Tempat (COD)", icon: Truck },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? "border-cyan-500 bg-cyan-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-cyan-600 focus:ring-cyan-500"
                      />
                      <method.icon className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {selectedItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({selectedItems.length} produk)</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Ongkos Kirim</span>
                    <span className="text-green-600">Gratis</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-cyan-600">{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                    isProcessing
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-cyan-500 text-white hover:bg-cyan-600 transform hover:scale-105"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      <span>Bayar Sekarang</span>
                    </>
                  )}
                </button>

                {/* Security Notice */}
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700 text-center">🔒 Pembayaran Anda aman dan terenkripsi</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout
