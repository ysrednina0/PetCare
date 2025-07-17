"use client"

import * as React from "react"
import { useState } from "react"
import { Home, Calendar, Clock, Search, Eye, MapPin, User } from "lucide-react"
import { useUser } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const HomeServiceHistoryPage = () => {
  const { homeServiceHistory, user, isLoggedIn } = useUser()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter services based on search and status
  const filteredServices = homeServiceHistory.filter((service) => {
    const matchesSearch =
      service.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.doctorName && service.doctorName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = filterStatus === "all" || service.status === filterStatus

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
      case "completed":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "ongoing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get status label
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai"
      case "upcoming":
        return "Akan Datang"
      case "ongoing":
        return "Berlangsung"
      case "cancelled":
        return "Dibatalkan"
      default:
        return status
    }
  }

  // Get service type label
  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case "health-checkup":
        return "Pemeriksaan Kesehatan"
      case "grooming":
        return "Grooming"
      case "vaccination":
        return "Vaksinasi"
      case "emergency-service":
        return "Layanan Darurat"
      case "dental-care":
        return "Perawatan Gigi"
      default:
        return type
    }
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Silakan Login Terlebih Dahulu</h2>
            <p className="text-gray-600 mb-8">Anda perlu login untuk melihat riwayat home service</p>
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

  if (homeServiceHistory.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="animate-bounce mb-8">
          <Home className="h-24 w-24 text-gray-400 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Belum Ada Riwayat Home Service</h3>
        <p className="text-gray-600 mb-8">Anda belum pernah menggunakan layanan home service</p>
        <button
          onClick={() => navigate("/services")}
          className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Booking Home Service
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
              placeholder="Cari hewan, layanan, atau dokter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2">
            {[
              { value: "all", label: "Semua" },
              { value: "upcoming", label: "Akan Datang" },
              { value: "ongoing", label: "Berlangsung" },
              { value: "completed", label: "Selesai" },
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

      {/* Services List */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Hasil</h3>
          <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              {/* Service Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  {/* Service Icon */}
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Home className="h-6 w-6 text-orange-600" />
                  </div>

                  {/* Service Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{service.serviceName}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(service.status)}`}>
                        {getStatusLabel(service.status)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <p className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Hewan: {service.petName}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Home className="h-4 w-4" />
                          <span>Jenis: {getServiceTypeLabel(service.serviceType)}</span>
                        </p>
                        {service.doctorName && (
                          <p className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Dokter: {service.doctorName}</span>
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(service.date)}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{service.time}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">{service.address}</span>
                        </p>
                      </div>
                    </div>

                    {service.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Catatan:</span> {service.notes}
                        </p>
                      </div>
                    )}

                    {service.completedAt && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700">
                          <span className="font-medium">Selesai pada:</span>{" "}
                          {new Intl.DateTimeFormat("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }).format(new Date(service.completedAt))}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(service.price)}</p>
                  <p className="text-sm text-gray-600">Home Service</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                {service.status === "upcoming" && (
                  <>
                    <button className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                      Batalkan
                    </button>
                    <button className="px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      Ubah Jadwal
                    </button>
                  </>
                )}
                {service.status === "completed" && (
                  <>
                    <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>Lihat Detail</span>
                    </button>
                    <button
                      onClick={() => navigate("/services")}
                      className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                      Booking Lagi
                    </button>
                  </>
                )}
                {service.status === "ongoing" && (
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Lihat Status
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomeServiceHistoryPage
