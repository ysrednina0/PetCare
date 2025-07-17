"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { MessageCircle, Home, ShoppingBag } from "lucide-react"
import { useUser } from "../contexts/UserContext"
import { useNavigate, useLocation } from "react-router-dom"
import ConsultationHistoryPage from "./ConsultationHistoryPage"
import HomeServiceHistoryPage from "./HomeServiceHistoryPage"
import ProductCheckoutHistory from "./ProductCheckoutHistory"

const HistoryPage = () => {
  const { isLoggedIn } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState<"consultations" | "home-service" | "product-checkout">("consultations")

  // Check for initial tab from navigation state
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab)
    }
  }, [location.state])

  // Redirect if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Silakan Login Terlebih Dahulu</h2>
            <p className="text-gray-600 mb-8">Anda perlu login untuk melihat riwayat</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
            >
              Login Sekarang
            </button>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    {
      id: "consultations" as const,
      name: "Konsultasi",
      icon: MessageCircle,
      description: "Riwayat konsultasi online dengan dokter hewan",
    },
    {
      id: "home-service" as const,
      name: "Home Service",
      icon: Home,
      description: "Riwayat layanan perawatan di rumah",
    },
    {
      id: "product-checkout" as const,
      name: "Pembelian Produk",
      icon: ShoppingBag,
      description: "Riwayat pembelian produk dari toko online",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Aktivitas</h1>
          <p className="text-gray-600">Lihat semua aktivitas dan transaksi Anda</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 text-center transition-colors ${
                    activeTab === tab.id
                      ? "bg-cyan-50 text-cyan-600 border-b-2 border-cyan-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Description */}
          <div className="px-6 py-4 bg-gray-50">
            <p className="text-sm text-gray-600 text-center">{tabs.find((tab) => tab.id === activeTab)?.description}</p>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activeTab === "consultations" && (
            <div className="p-6">
              <ConsultationHistoryPage />
            </div>
          )}

          {activeTab === "home-service" && (
            <div className="p-6">
              <HomeServiceHistoryPage />
            </div>
          )}

          {activeTab === "product-checkout" && (
            <div className="p-6">
              <ProductCheckoutHistory />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistoryPage
