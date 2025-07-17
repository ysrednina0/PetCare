/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Home, Clock } from "lucide-react"
import { useUser } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const Services = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const { user, isLoggedIn, addHomeServiceHistory } = useUser()
  const navigate = useNavigate()

  // Update the existing Services component to handle booking
  const [isBooking, setIsBooking] = useState(false)

  const services = [
    {
      id: "checkup",
      name: "Pemeriksaan Kesehatan",
      description: "Pemeriksaan rutin untuk memastikan kesehatan hewan peliharaan Anda",
      price: "Rp 150.000",
      duration: "45 menit",
      image: "https://images.pexels.com/photos/5487067/pexels-photo-5487067.jpeg",
      includes: [
        "Pemeriksaan fisik lengkap",
        "Pengecekan suhu tubuh",
        "Pemeriksaan mata, telinga, mulut",
        "Konsultasi kesehatan",
        "Laporan hasil pemeriksaan",
      ],
    },
    {
      id: "vaccination",
      name: "Vaksinasi",
      description: "Layanan vaksinasi lengkap untuk melindungi hewan peliharaan dari penyakit",
      price: "Rp 200.000",
      duration: "30 menit",
      image: "https://images.pexels.com/photos/7474852/pexels-photo-7474852.jpeg",
      includes: [
        "Vaksin sesuai jadwal",
        "Pemeriksaan pre-vaksinasi",
        "Sertifikat vaksinasi",
        "Konsultasi jadwal vaksin berikutnya",
        "Monitoring post-vaksinasi",
      ],
    },
    {
      id: "grooming",
      name: "Grooming & Perawatan",
      description: "Layanan grooming profesional untuk menjaga kebersihan dan penampilan hewan",
      price: "Rp 100.000",
      duration: "60 menit",
      image: "https://images.pexels.com/photos/19145897/pexels-photo-19145897.jpeg",
      includes: [
        "Mandi dengan shampoo khusus",
        "Pemotongan kuku",
        "Pembersihan telinga",
        "Penyisiran dan styling",
        "Parfum hewan yang aman",
      ],
    },
    {
      id: "emergency",
      name: "Layanan Darurat",
      description: "Layanan darurat 24/7 untuk kondisi medis yang memerlukan penanganan segera",
      price: "Rp 300.000",
      duration: "Sesuai kebutuhan",
      image: "https://images.pexels.com/photos/6131096/pexels-photo-6131096.jpeg",
      includes: [
        "Respon cepat 24/7",
        "Pemeriksaan darurat",
        "Pertolongan pertama",
        "Rujukan ke klinik jika diperlukan",
        "Follow-up perawatan",
      ],
    },
  ]

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

  // Add this function to handle home service booking
  const handleBookService = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      alert("Silakan lengkapi semua data booking")
      return
    }

    if (!isLoggedIn) {
      navigate("/login")
      return
    }

    setIsBooking(true)

    const selectedServiceData = services.find((s) => s.id === selectedService)

    setTimeout(() => {
      // Add to home service history
      addHomeServiceHistory({
        bookingId: `booking-${Date.now()}`,
        date: new Date(selectedDate),
        time: selectedTime,
        petName: "Hewan Peliharaan", // You can enhance this to select specific pet
        petId: user?.pets[0]?.id || "",
        serviceType: selectedService as any,
        serviceName: selectedServiceData?.name || "",
        doctorName: "Dr. Tim Home Service",
        status: "upcoming",
        price: Number.parseInt(selectedServiceData?.price.replace(/[^\d]/g, "") || "0"),
        address: user?.address || "Alamat akan dikonfirmasi",
        notes: `Booking ${selectedServiceData?.name} pada ${selectedDate} jam ${selectedTime}`,
      })

      setIsBooking(false)
      alert("Booking berhasil! Lihat riwayat di halaman History.")

      // Reset form
      setSelectedService(null)
      setSelectedDate("")
      setSelectedTime("")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Layanan Home Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nikmati layanan perawatan hewan profesional yang datang langsung ke rumah Anda
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Layanan</h2>
            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`bg-white rounded-xl p-6 shadow-sm border-2 cursor-pointer transition-all ${
                    selectedService === service.id
                      ? "border-cyan-500 shadow-lg"
                      : "border-gray-200 hover:border-cyan-300"
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex space-x-4">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-600">{service.price}</div>
                          {/* <div className="text-sm text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {service.duration}
                          </div> */}
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <div className="grid md:grid-cols-2 gap-2">
                        {service.includes.map((item, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Booking Layanan</h3>

            {selectedService ? (
              <div className="space-y-6">
                {/* Selected Service */}
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-medium text-cyan-800 mb-1">
                    {services.find((s) => s.id === selectedService)?.name}
                  </h4>
                  <p className="text-cyan-600 text-sm">{services.find((s) => s.id === selectedService)?.price}</p>
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Tanggal</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Waktu</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg text-sm transition-colors ${
                          selectedTime === time
                            ? "bg-cyan-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                    <input
                      type="tel"
                      placeholder="Masukkan nomor telepon"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                    <textarea
                      rows={3}
                      placeholder="Masukkan alamat lengkap"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    ></textarea>
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBookService}
                  disabled={!selectedDate || !selectedTime || isBooking}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    selectedDate && selectedTime && !isBooking
                      ? "bg-cyan-500 text-white hover:bg-cyan-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isBooking ? "Memproses..." : "Book Sekarang"}
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Pilih layanan untuk melanjutkan booking</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
