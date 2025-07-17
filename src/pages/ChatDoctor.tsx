/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Send, Phone, Video, ArrowLeft, MoreVertical, Paperclip, Smile } from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useUser } from "../contexts/UserContext"

interface Message {
  id: string
  sender: "user" | "doctor"
  message: string
  timestamp: Date
  type: "text" | "image" | "system"
}

const ChatDoctor = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isLoggedIn, addConsultationHistory, updateConsultationHistory } = useUser()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get consultation data from navigation state
  const consultationData = location.state || {}
  const { doctorName, doctorImage, petName, petId, consultationId } = consultationData

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "system",
      message: `Konsultasi dimulai dengan ${doctorName || "Dokter"} untuk ${petName || "hewan peliharaan Anda"}`,
      timestamp: new Date(),
      type: "system",
    },
    {
      id: "2",
      sender: "doctor",
      message: `Halo ${user?.name || ""}! Saya ${doctorName || "Dokter"}. Apa yang bisa saya bantu dengan ${petName || "hewan peliharaan Anda"} hari ini?`,
      timestamp: new Date(),
      type: "text",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [consultationStartTime] = useState(new Date())
  const [showEndConsultationModal, setShowEndConsultationModal] = useState(false)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login")
    }
  }, [isLoggedIn, navigate])

  // Simulate doctor responses
  const simulateDoctorResponse = (userMessage: string) => {
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(
      () => {
        setIsTyping(false)

        let response = ""

        // Simple response logic based on keywords
        const message = userMessage.toLowerCase()
        if (message.includes("sakit") || message.includes("demam")) {
          response =
            "Saya mengerti kekhawatiran Anda. Bisakah Anda ceritakan lebih detail tentang gejala yang dialami? Sudah berapa lama kondisi ini berlangsung?"
        } else if (message.includes("makan") || message.includes("nafsu")) {
          response =
            "Masalah nafsu makan memang perlu diperhatikan. Apakah ada perubahan dalam rutinitas atau lingkungan hewan peliharaan Anda belakangan ini?"
        } else if (message.includes("vaksin") || message.includes("imunisasi")) {
          response =
            "Vaksinasi sangat penting untuk kesehatan hewan peliharaan. Saya akan berikan jadwal vaksinasi yang tepat. Kapan vaksinasi terakhir dilakukan?"
        } else if (message.includes("terima kasih") || message.includes("thanks")) {
          response =
            "Sama-sama! Jangan ragu untuk menghubungi saya jika ada pertanyaan lain. Semoga hewan peliharaan Anda segera membaik."
        } else {
          response =
            "Terima kasih atas informasinya. Berdasarkan yang Anda sampaikan, saya sarankan untuk melakukan pemeriksaan lebih lanjut. Apakah ada gejala lain yang perlu saya ketahui?"
        }

        const doctorMessage: Message = {
          id: Date.now().toString(),
          sender: "doctor",
          message: response,
          timestamp: new Date(),
          type: "text",
        }

        setMessages((prev) => [...prev, doctorMessage])
      },
      1500 + Math.random() * 2000,
    ) // Random delay between 1.5-3.5 seconds
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      message: newMessage,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate doctor response
    simulateDoctorResponse(newMessage)

    setNewMessage("")
  }

  const handleEndConsultation = () => {
    const consultationEndTime = new Date()
    const duration = Math.round((consultationEndTime.getTime() - consultationStartTime.getTime()) / (1000 * 60))

    // Save consultation to history
    addConsultationHistory({
      consultationId: consultationId || `consultation-${Date.now()}`,
      date: consultationStartTime,
      petName: petName || "Unknown Pet",
      petId: petId || "",
      doctorName: doctorName || "Unknown Doctor",
      doctorImage: doctorImage,
      consultationType: "general",
      status: "completed",
      duration,
      chatMessages: messages.map((msg) => ({
        id: msg.id,
        sender: msg.sender,
        message: msg.message,
        timestamp: msg.timestamp,
        type: msg.type,
      })),
      price: 75000, // Default consultation price
      notes: `Konsultasi online dengan ${doctorName} untuk ${petName}`,
    })

    // Navigate to consultation history
    navigate("/history", { state: { activeTab: "consultations" } })
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (!isLoggedIn) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-full overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <Link to="/consultation" className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <img
                src={
                  doctorImage ||
                  "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=100" ||
                  "/placeholder.svg" ||
                  "/placeholder.svg"
                }
                alt={doctorName || "Doctor"}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h1 className="font-semibold text-gray-900 truncate">{doctorName || "Dokter Hewan"}</h1>
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-gray-400"} flex-shrink-0`}
                  ></div>
                  <span className="text-sm text-gray-600">{isOnline ? "Online" : "Offline"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
              <Phone className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block">
              <Video className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowEndConsultationModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Akhiri
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                {message.type === "system" ? (
                  <div className="text-center">
                    <span className="bg-gray-200 text-gray-600 px-4 py-2 rounded-full text-sm">{message.message}</span>
                  </div>
                ) : (
                  <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs sm:max-w-sm lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-cyan-500 text-white rounded-br-md"
                          : "bg-white text-gray-900 shadow-sm border border-gray-200 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.message}</p>
                      <p className={`text-xs mt-2 ${message.sender === "user" ? "text-cyan-100" : "text-gray-500"}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-900 shadow-sm border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 hidden sm:block"
            >
              <Paperclip className="h-5 w-5 text-gray-600" />
            </button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ketik pesan Anda..."
                className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors hidden sm:block"
              >
                <Smile className="h-4 w-4 text-gray-600" />
              </button>
            </div>

            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`p-3 rounded-full transition-colors flex-shrink-0 ${
                newMessage.trim()
                  ? "bg-cyan-500 text-white hover:bg-cyan-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* End Consultation Modal */}
      {showEndConsultationModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-100 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Akhiri Konsultasi</h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin mengakhiri konsultasi ini? Riwayat chat akan disimpan di halaman riwayat
              konsultasi.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowEndConsultationModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleEndConsultation}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Akhiri Konsultasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatDoctor
