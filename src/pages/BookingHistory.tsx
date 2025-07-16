"use client"
import * as React from "react"

import { useState } from "react"
import { Calendar, Clock, MapPin, Phone, Search } from "lucide-react"
import { useUser } from "../contexts/UserContext"

interface BookingHistoryProps {
  filterType?: "consultation" | "home-service"
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ filterType }) => {
  const { bookingHistory, user } = useUser()
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filter bookings based on status and search term
  const filteredBookings = bookingHistory.filter((booking) => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus
    const matchesSearch =
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.petName && booking.petName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (booking.doctorName && booking.doctorName.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = !filterType || booking.serviceType === filterType

    return matchesStatus && matchesSearch && matchesType
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
    return new Intl.DateFormat("id-ID", {
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
      case "cancelled":
        return "Dibatalkan"
      default:
        return status
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Silakan Login Terlebih Dahulu</h2>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Booking</h1>
          <p className="text-gray-600">Lihat semua riwayat layanan yang pernah Anda gunakan</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari layanan, hewan, atau dokter..."
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

        {/* Booking List */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || filterStatus !== "all" ? "Tidak Ada Hasil" : "Belum Ada Riwayat Booking"}
            </h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus !== "all"
                ? "Coba ubah filter atau kata kunci pencarian"
                : "Mulai gunakan layanan kami untuk melihat riwayat booking"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    {/* Service Icon */}
                    <div
                      className={`p-3 rounded-lg ${
                        booking.serviceType === "consultation" ? "bg-cyan-100" : "bg-orange-100"
                      }`}
                    >
                      {booking.serviceType === "consultation" ? (
                        <Phone
                          className={`h-6 w-6 ${
                            booking.serviceType === "consultation" ? "text-cyan-600" : "text-orange-600"
                          }`}
                        />
                      ) : (
                        <MapPin className="h-6 w-6 text-orange-600" />
                      )}
                    </div>

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{booking.serviceName}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(booking.status)}`}
                        >
                          {getStatusLabel(booking.status)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="space-y-1">
                          {booking.petName && (
                            <p className="flex items-center space-x-2">
                              <span className="font-medium">Hewan:</span>
                              <span>{booking.petName}</span>
                            </p>
                          )}
                          {booking.doctorName && (
                            <p className="flex items-center space-x-2">
                              <span className="font-medium">Dokter:</span>
                              <span>{booking.doctorName}</span>
                            </p>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(booking.date)}</span>
                          </p>
                          <p className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{booking.time}</span>
                          </p>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Catatan:</span> {booking.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(booking.price)}</p>
                    <p className="text-sm text-gray-600">
                      {booking.serviceType === "consultation" ? "Konsultasi" : "Home Service"}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  {booking.status === "upcoming" && (
                    <>
                      <button className="px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                        Batalkan
                      </button>
                      <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                        {booking.serviceType === "consultation" ? "Mulai Chat" : "Lihat Detail"}
                      </button>
                    </>
                  )}
                  {booking.status === "completed" && (
                    <>
                      <button className="px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                        Lihat Detail
                      </button>
                      <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                        Booking Lagi
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingHistory
