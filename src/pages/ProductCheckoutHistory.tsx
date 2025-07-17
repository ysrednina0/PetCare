/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { useState } from "react"
import { Package, Calendar, Search, Eye, RotateCcw } from "lucide-react"
import { useUser } from "../contexts/UserContext"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  orderNumber: string
  date: Date
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  total: number
  shippingAddress: string
  paymentMethod: string
}

const ProductCheckoutHistory = () => {
  const { user } = useUser()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Get orders from localStorage
  const getOrders = (): Order[] => {
    const savedOrders = localStorage.getItem("petcare_orders")
    return savedOrders ? JSON.parse(savedOrders) : []
  }

  const [orders] = useState<Order[]>(getOrders())

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = filterStatus === "all" || order.status === filterStatus

    return matchesSearch && matchesStatus
  })

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "processing":
        return "Diproses"
      case "shipped":
        return "Dikirim"
      case "delivered":
        return "Diterima"
      case "cancelled":
        return "Dibatalkan"
      default:
        return status
    }
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="animate-bounce mb-8">
          <Package className="h-24 w-24 text-gray-400 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Belum Ada Riwayat Pembelian</h3>
        <p className="text-gray-600 mb-8">Anda belum pernah melakukan pembelian produk</p>
        <button
          onClick={() => (window.location.href = "/store")}
          className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Mulai Belanja
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Search and Filter */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari nomor pesanan atau produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2">
            {[
              { value: "all", label: "Semua" },
              { value: "processing", label: "Diproses" },
              { value: "shipped", label: "Dikirim" },
              { value: "delivered", label: "Diterima" },
              { value: "cancelled", label: "Dibatalkan" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  filterStatus === filter.value
                    ? "bg-cyan-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Hasil</h3>
          <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              {/* Order Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">#{order.orderNumber}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(order.date)}</span>
                    </div>
                    <span>•</span>
                    <span>{order.items.length} produk</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(order.total)}</p>
                  <p className="text-sm text-gray-600 capitalize">{order.paymentMethod.replace("-", " ")}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        {item.quantity}x • {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <p className="text-sm text-gray-600 pl-15">+{order.items.length - 2} produk lainnya</p>
                )}
              </div>

              {/* Order Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p>Dikirim ke: {order.shippingAddress}</p>
                </div>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>Detail</span>
                  </button>
                  {order.status === "delivered" && (
                    <button className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                      <RotateCcw className="h-4 w-4" />
                      <span>Beli Lagi</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCheckoutHistory
