/* eslint-disable no-constant-binary-expression */
"use client"

import * as React from "react"
import { useState, useEffect } from 'react';
import { MessageCircle, Calendar, Clock, Search, Eye, User, Phone } from "lucide-react"
import { useUser } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const ConsultationHistoryPage = () => {
  const { consultationHistory, user, isLoggedIn } = useUser()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedConsultation, setSelectedConsultation] = useState<string | null>(null)

  // Filter consultations based on search and status
  const filteredConsultations = consultationHistory.filter((consultation) => {
    const matchesSearch =
      consultation.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.consultationType.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || consultation.status === filterStatus

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
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date))
  }

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ongoing":
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
      case "ongoing":
        return "Berlangsung"
      case "cancelled":
        return "Dibatalkan"
      default:
        return status
    }
  }

  // Get consultation type label
  const getConsultationTypeLabel = (type: string) => {
    switch (type) {
      case "general":
        return "Umum"
      case "emergency":
        return "Darurat"
      case "follow-up":
        return "Tindak Lanjut"
      case "specialist":
        return "Spesialis"
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
            <p className="text-gray-600 mb-8">Anda perlu login untuk melihat riwayat konsultasi</p>
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

  if (consultationHistory.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="animate-bounce mb-8">
          <MessageCircle className="h-24 w-24 text-gray-400 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Belum Ada Riwayat Konsultasi</h3>
        <p className="text-gray-600 mb-8">Anda belum pernah melakukan konsultasi online</p>
        <button
          onClick={() => navigate("/consultation")}
          className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Mulai Konsultasi
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
              placeholder="Cari hewan, dokter, atau jenis konsultasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2">
            {[
              { value: "all", label: "Semua" },
              { value: "completed", label: "Selesai" },
              { value: "ongoing", label: "Berlangsung" },
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

      {/* Consultations List */}
      {filteredConsultations.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak Ada Hasil</h3>
          <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredConsultations.map((consultation) => (
            <div
              key={consultation.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              {/* Consultation Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  {/* Doctor Image */}
                  <img
                    src={
                      consultation.doctorImage ||
                      "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={consultation.doctorName}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  {/* Consultation Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{consultation.doctorName}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(consultation.status)}`}
                      >
                        {getStatusLabel(consultation.status)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <p className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Hewan: {consultation.petName}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <MessageCircle className="h-4 w-4" />
                          <span>Jenis: {getConsultationTypeLabel(consultation.consultationType)}</span>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(consultation.date)}</span>
                        </p>
                        {consultation.duration && (
                          <p className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>Durasi: {consultation.duration} menit</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {consultation.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Catatan:</span> {consultation.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(consultation.price)}</p>
                  <p className="text-sm text-gray-600">Konsultasi Online</p>
                </div>
              </div>

              {/* Chat Preview */}
              {consultation.chatMessages && consultation.chatMessages.length > 0 && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Preview Chat:</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {consultation.chatMessages.slice(-3).map((message) => (
                      <div key={message.id} className="text-sm">
                        {message.type !== "system" && (
                          <p className="text-gray-600">
                            <span className="font-medium">
                              {message.sender === "user" ? "Anda" : consultation.doctorName}:
                            </span>{" "}
                            {message.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() =>
                    setSelectedConsultation(selectedConsultation === consultation.id ? null : consultation.id)
                  }
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>{selectedConsultation === consultation.id ? "Sembunyikan" : "Lihat Detail"}</span>
                </button>
                {consultation.status === "completed" && (
                  <button
                    onClick={() => navigate("/consultation")}
                    className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Konsultasi Lagi</span>
                  </button>
                )}
              </div>

              {/* Expanded Chat Messages */}
              {selectedConsultation === consultation.id && consultation.chatMessages && (
                <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Riwayat Chat Lengkap:</h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {consultation.chatMessages.map((message) => (
                      <div key={message.id}>
                        {message.type === "system" ? (
                          <div className="text-center">
                            <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs">
                              {message.message}
                            </span>
                          </div>
                        ) : (
                          <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                message.sender === "user" ? "bg-cyan-500 text-white" : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p>{message.message}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.sender === "user" ? "text-cyan-100" : "text-gray-500"
                                }`}
                              >
                                {new Intl.DateTimeFormat("id-ID", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }).format(new Date(message.timestamp))}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ConsultationHistoryPage
