"use client"

import * as React from "react"
import { useState } from "react"
import { ArrowRight, ArrowLeft, Plus, Check, CreditCard, MessageCircle, Heart } from "lucide-react"
import { useUser } from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const Consultation = () => {
  const { user, isLoggedIn, addPet, addBooking } = useUser()
  const navigate = useNavigate()

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPet, setSelectedPet] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // New pet form state
  const [isAddingPet, setIsAddingPet] = useState(false)
  const [newPetForm, setNewPetForm] = useState({
    name: "",
    type: "cat" as "cat" | "dog" | "bird" | "rabbit" | "hamster" | "other",
    gender: "male" as "male" | "female",
  })

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Wijaya",
      specialty: "Dokter Hewan Umum",
      experience: "8 tahun",
      rating: 4.9,
      price: 25000,
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "online",
      responseTime: "< 2 menit",
    },
    {
      id: 2,
      name: "Dr. Ahmad Pratama",
      specialty: "Spesialis Kucing",
      experience: "12 tahun",
      rating: 4.8,
      price: 35000,
      image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "online",
      responseTime: "< 3 menit",
    },
    {
      id: 3,
      name: "Dr. Rina Sari",
      specialty: "Spesialis Anjing",
      experience: "10 tahun",
      rating: 4.9,
      price: 30000,
      image: "https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=300",
      status: "busy",
      responseTime: "< 5 menit",
    },
  ]

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Pet type labels
  const petTypeLabels = {
    cat: "Kucing",
    dog: "Anjing",
    bird: "Burung",
    rabbit: "Kelinci",
    hamster: "Hamster",
    other: "Lainnya",
  }

  // Handle add new pet
  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault()
    addPet(newPetForm)
    setNewPetForm({ name: "", type: "cat", gender: "male" })
    setIsAddingPet(false)
  }

  // Handle consultation booking
  const handleBookConsultation = () => {
    if (!selectedPet || !selectedDoctor) return

    setIsProcessing(true)

    const selectedPetData = user?.pets.find((pet) => pet.id === selectedPet)
    const selectedDoctorData = doctors.find((doc) => doc.id === selectedDoctor)

    setTimeout(() => {
      // Add booking to history
      addBooking({
        serviceType: "consultation",
        serviceName: "Konsultasi Online",
        petId: selectedPet,
        petName: selectedPetData?.name,
        doctorName: selectedDoctorData?.name,
        date: new Date(),
        time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
        status: "upcoming",
        price: selectedDoctorData?.price || 0,
      })

      setIsProcessing(false)

      // Navigate to chat page with consultation data
      navigate("/chat-doctor", {
        state: {
          doctorName: selectedDoctorData?.name,
          doctorImage: selectedDoctorData?.image,
          petName: selectedPetData?.name,
          consultationId: `consultation-${Date.now()}`,
        },
      })
    }, 2000)
  }

  // Redirect if not logged in
  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Silakan Login Terlebih Dahulu</h2>
            <p className="text-gray-600 mb-8">Anda perlu login untuk menggunakan layanan konsultasi</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Konsultasi Online</h1>
          <p className="text-gray-600">Konsultasi dengan dokter hewan profesional dalam 3 langkah mudah</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: "Pilih Hewan", icon: Heart },
              { step: 2, title: "Ringkasan Pembayaran", icon: CreditCard },
              { step: 3, title: "Metode Pembayaran", icon: MessageCircle },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`flex items-center space-x-3 ${
                    currentStep >= item.step ? "text-cyan-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= item.step ? "bg-cyan-500 text-white" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {currentStep > item.step ? <Check className="h-5 w-5" /> : <item.icon className="h-5 w-5" />}
                  </div>
                  <span className="font-medium">{item.title}</span>
                </div>
                {index < 2 && (
                  <ArrowRight
                    className={`h-5 w-5 mx-4 ${currentStep > item.step ? "text-cyan-600" : "text-gray-400"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {/* Step 1: Select Pet */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Hewan Peliharaan</h2>

              {/* Pet List */}
              {user.pets.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {user.pets.map((pet) => (
                    <div
                      key={pet.id}
                      onClick={() => setSelectedPet(pet.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPet === pet.id ? "border-cyan-500 bg-cyan-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            pet.image ||
                            "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=100" ||
                            "/placeholder.svg"
                          }
                          alt={pet.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                          <p className="text-gray-600">
                            {petTypeLabels[pet.type]} • {pet.gender === "male" ? "Jantan" : "Betina"}
                          </p>
                          {pet.age && <p className="text-sm text-gray-500">Umur: {pet.age} tahun</p>}
                        </div>
                        {selectedPet === pet.id && <Check className="h-6 w-6 text-cyan-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 mb-6">
                  <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Hewan Peliharaan</h3>
                  <p className="text-gray-600 mb-4">Tambahkan data hewan peliharaan Anda terlebih dahulu</p>
                </div>
              )}

              {/* Add New Pet */}
              {!isAddingPet ? (
                <button
                  onClick={() => setIsAddingPet(true)}
                  className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-colors flex items-center justify-center space-x-2 text-gray-600 hover:text-cyan-600"
                >
                  <Plus className="h-5 w-5" />
                  <span>Tambah Hewan Peliharaan Baru</span>
                </button>
              ) : (
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tambah Hewan Peliharaan</h3>
                  <form onSubmit={handleAddPet} className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Hewan *</label>
                        <input
                          type="text"
                          required
                          value={newPetForm.name}
                          onChange={(e) => setNewPetForm({ ...newPetForm, name: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Hewan *</label>
                        <select
                          required
                          value={newPetForm.type}
                          onChange={(e) => setNewPetForm({ ...newPetForm, type: e.target.value as any })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          {Object.entries(petTypeLabels).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin *</label>
                        <select
                          required
                          value={newPetForm.gender}
                          onChange={(e) => setNewPetForm({ ...newPetForm, gender: e.target.value as any })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="male">Jantan</option>
                          <option value="female">Betina</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingPet(false)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Continue Button */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedPet}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all ${
                    selectedPet
                      ? "bg-cyan-500 text-white hover:bg-cyan-600 transform hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <span>Lanjutkan</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Summary */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Dokter & Ringkasan Pembayaran</h2>

              {/* Doctor Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pilih Dokter Hewan</h3>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedDoctor === doctor.id
                          ? "border-cyan-500 bg-cyan-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                            <div
                              className={`px-3 py-1 rounded-full text-sm ${
                                doctor.status === "online"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {doctor.status === "online" ? "Online" : "Sibuk"}
                            </div>
                          </div>
                          <p className="text-cyan-600 font-medium mb-1">{doctor.specialty}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {doctor.experience} • Rating {doctor.rating} • Respon {doctor.responseTime}
                            </span>
                            <span className="text-lg font-bold text-gray-900">{formatCurrency(doctor.price)}</span>
                          </div>
                        </div>
                        {selectedDoctor === doctor.id && <Check className="h-6 w-6 text-cyan-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              {selectedDoctor && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pembayaran</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biaya Konsultasi</span>
                      <span className="font-medium">
                        {formatCurrency(doctors.find((d) => d.id === selectedDoctor)?.price || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Biaya Admin</span>
                      <span className="font-medium text-green-600">Gratis</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Pembayaran</span>
                        <span className="text-cyan-600">
                          {formatCurrency(doctors.find((d) => d.id === selectedDoctor)?.price || 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Kembali</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={!selectedDoctor}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all ${
                    selectedDoctor
                      ? "bg-cyan-500 text-white hover:bg-cyan-600 transform hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <span>Lanjutkan</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment Method */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilih Metode Pembayaran</h2>

              {/* Payment Methods */}
              <div className="space-y-3 mb-8">
                {[
                  { id: "credit-card", name: "Kartu Kredit/Debit" },
                  { id: "bank-transfer", name: "Transfer Bank" },
                  { id: "e-wallet", name: "E-Wallet (OVO, GoPay, Dana)" },
                  { id: "virtual-account", name: "Virtual Account" },
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
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{method.name}</span>
                  </label>
                ))}
              </div>

              {/* Final Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Konfirmasi Konsultasi</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hewan Peliharaan:</span>
                    <span className="font-medium">{user.pets.find((pet) => pet.id === selectedPet)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dokter:</span>
                    <span className="font-medium">{doctors.find((d) => d.id === selectedDoctor)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metode Pembayaran:</span>
                    <span className="font-medium capitalize">{paymentMethod.replace("-", " ")}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-cyan-600">
                        {formatCurrency(doctors.find((d) => d.id === selectedDoctor)?.price || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  <span>Kembali</span>
                </button>
                <button
                  onClick={handleBookConsultation}
                  disabled={!paymentMethod || isProcessing}
                  className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all ${
                    paymentMethod && !isProcessing
                      ? "bg-cyan-500 text-white hover:bg-cyan-600 transform hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5" />
                      <span>Mulai Konsultasi</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Consultation
