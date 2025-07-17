"use client"

import * as React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for user and pet data
export interface Pet {
  id: string
  name: string
  type: "cat" | "dog" | "bird" | "rabbit" | "hamster" | "other"
  gender: "male" | "female"
  age?: number
  breed?: string
  weight?: number
  image?: string
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  avatar?: string
  pets: Pet[]
  createdAt: Date
}

export interface ChatMessage {
  id: string
  sender: "user" | "doctor"
  message: string
  timestamp: Date
  type: "text" | "image" | "system"
}

export interface ConsultationHistory {
  id: string
  consultationId: string
  date: Date
  petName: string
  petId: string
  doctorName: string
  doctorImage?: string
  consultationType: "general" | "emergency" | "follow-up" | "specialist"
  status: "completed" | "ongoing" | "cancelled"
  duration?: number // in minutes
  chatMessages: ChatMessage[]
  price: number
  notes?: string
}

export interface BookingHistory {
  id: string
  serviceType: "consultation" | "home-service"
  serviceName: string
  petId?: string
  petName?: string
  doctorName?: string
  date: Date
  time: string
  status: "completed" | "upcoming" | "cancelled"
  price: number
  notes?: string
}

export interface HomeServiceHistory {
  id: string
  bookingId: string
  date: Date
  time: string
  petName: string
  petId: string
  serviceType: "health-checkup" | "grooming" | "vaccination" | "emergency-service" | "dental-care"
  serviceName: string
  doctorName?: string
  status: "completed" | "upcoming" | "cancelled" | "ongoing"
  price: number
  address: string
  notes?: string
  completedAt?: Date
}

export interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  orderNumber: string
  date: Date
  status: "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  total: number
  shippingAddress: string
  paymentMethod: string
}

interface UserContextType {
  user: User | null
  isLoggedIn: boolean
  bookingHistory: BookingHistory[]
  consultationHistory: ConsultationHistory[]
  homeServiceHistory: HomeServiceHistory[]
  login: (email: string, password: string) => boolean
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
  addPet: (petData: Omit<Pet, "id" | "createdAt">) => void
  updatePet: (petId: string, petData: Partial<Pet>) => void
  deletePet: (petId: string) => void
  addBooking: (booking: Omit<BookingHistory, "id">) => void
  addConsultationHistory: (consultation: Omit<ConsultationHistory, "id">) => void
  updateConsultationHistory: (consultationId: string, updates: Partial<ConsultationHistory>) => void
  addHomeServiceHistory: (service: Omit<HomeServiceHistory, "id">) => void
  updateHomeServiceHistory: (serviceId: string, updates: Partial<HomeServiceHistory>) => void
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "orderNumber">) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

// Demo user data
const DEMO_USER: User = {
  id: "demo-user-1",
  name: "Komeng",
  email: "AkunKomeng@gmail.com",
  phone: "+62 812-3456-7890",
  address: "Jl. Sudirman No. 123, Jakarta Selatan",
  avatar: "https://plus.unsplash.com/premium_photo-1738590017220-5820f49608cc?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  pets: [
    {
      id: "pet-1",
      name: "Milo",
      type: "cat",
      gender: "male",
      age: 2,
      breed: "Persian",
      weight: 4.5,
      image: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300",
      createdAt: new Date("2023-01-15"),
    },
    {
      id: "pet-2",
      name: "Luna",
      type: "dog",
      gender: "female",
      age: 3,
      breed: "Golden Retriever",
      weight: 25,
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300",
      createdAt: new Date("2023-03-20"),
    },
  ],
  createdAt: new Date("2023-01-01"),
}

// Demo booking history
const DEMO_BOOKINGS: BookingHistory[] = [
  {
    id: "booking-1",
    serviceType: "consultation",
    serviceName: "Konsultasi Online",
    petId: "pet-1",
    petName: "Milo",
    doctorName: "Dr. Sarah Wijaya",
    date: new Date("2024-01-10"),
    time: "14:00",
    status: "completed",
    price: 75000,
    notes: "Konsultasi rutin, kondisi sehat",
  },
  {
    id: "booking-2",
    serviceType: "home-service",
    serviceName: "Vaksinasi",
    petId: "pet-2",
    petName: "Luna",
    doctorName: "Dr. Ahmad Pratama",
    date: new Date("2024-01-15"),
    time: "10:00",
    status: "completed",
    price: 200000,
    notes: "Vaksin rabies dan distemper",
  },
  {
    id: "booking-3",
    serviceType: "consultation",
    serviceName: "Konsultasi Online",
    petId: "pet-1",
    petName: "Milo",
    doctorName: "Dr. Rina Sari",
    date: new Date("2024-01-20"),
    time: "16:00",
    status: "upcoming",
    price: 75000,
  },
]

// Demo consultation history
const DEMO_CONSULTATIONS: ConsultationHistory[] = [
  {
    id: "consultation-1",
    consultationId: "cons-001",
    date: new Date("2024-01-10"),
    petName: "Milo",
    petId: "pet-1",
    doctorName: "Dr. Sarah Wijaya",
    doctorImage: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300",
    consultationType: "general",
    status: "completed",
    duration: 25,
    price: 75000,
    notes: "Konsultasi rutin mengenai kesehatan umum",
    chatMessages: [
      {
        id: "msg-1",
        sender: "system",
        message: "Konsultasi dimulai dengan Dr. Sarah Wijaya untuk Milo",
        timestamp: new Date("2024-01-10T14:00:00"),
        type: "system",
      },
      {
        id: "msg-2",
        sender: "doctor",
        message: "Halo! Saya Dr. Sarah. Apa yang bisa saya bantu dengan Milo hari ini?",
        timestamp: new Date("2024-01-10T14:00:30"),
        type: "text",
      },
      {
        id: "msg-3",
        sender: "user",
        message: "Halo dokter, Milo sepertinya kurang nafsu makan belakangan ini.",
        timestamp: new Date("2024-01-10T14:01:00"),
        type: "text",
      },
    ],
  },
]

// Demo home service history
const DEMO_HOME_SERVICES: HomeServiceHistory[] = [
  {
    id: "service-1",
    bookingId: "booking-hs-001",
    date: new Date("2024-01-15"),
    time: "10:00",
    petName: "Luna",
    petId: "pet-2",
    serviceType: "vaccination",
    serviceName: "Vaksinasi Lengkap",
    doctorName: "Dr. Ahmad Pratama",
    status: "completed",
    price: 200000,
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    notes: "Vaksin rabies dan distemper berhasil diberikan",
    completedAt: new Date("2024-01-15T11:30:00"),
  },
]

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([])
  const [consultationHistory, setConsultationHistory] = useState<ConsultationHistory[]>([])
  const [homeServiceHistory, setHomeServiceHistory] = useState<HomeServiceHistory[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("petcare_user")
    const savedBookings = localStorage.getItem("petcare_bookings")
    const savedConsultations = localStorage.getItem("petcare_consultations")
    const savedHomeServices = localStorage.getItem("petcare_home_services")
    const savedOrders = localStorage.getItem("petcare_orders")

    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsLoggedIn(true)
    }

    if (savedBookings) {
      setBookingHistory(JSON.parse(savedBookings))
    } else {
      setBookingHistory(DEMO_BOOKINGS)
    }

    if (savedConsultations) {
      setConsultationHistory(JSON.parse(savedConsultations))
    } else {
      setConsultationHistory(DEMO_CONSULTATIONS)
    }

    if (savedHomeServices) {
      setHomeServiceHistory(JSON.parse(savedHomeServices))
    } else {
      setHomeServiceHistory(DEMO_HOME_SERVICES)
    }

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Save data to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem("petcare_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("petcare_user")
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem("petcare_bookings", JSON.stringify(bookingHistory))
  }, [bookingHistory])

  useEffect(() => {
    localStorage.setItem("petcare_consultations", JSON.stringify(consultationHistory))
  }, [consultationHistory])

  useEffect(() => {
    localStorage.setItem("petcare_home_services", JSON.stringify(homeServiceHistory))
  }, [homeServiceHistory])

  useEffect(() => {
    localStorage.setItem("petcare_orders", JSON.stringify(orders))
  }, [orders])

  const login = (email: string, password: string): boolean => {
    // Demo login - check for demo credentials
    if (email === "AkunKomeng@gmail.com" && password === "123456") {
      setUser(DEMO_USER)
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("petcare_user")
  }

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      setUser(updatedUser)
    }
  }

  const addPet = (petData: Omit<Pet, "id" | "createdAt">) => {
    if (user) {
      const newPet: Pet = {
        ...petData,
        id: `pet-${Date.now()}`,
        createdAt: new Date(),
      }

      const updatedUser = {
        ...user,
        pets: [...user.pets, newPet],
      }

      setUser(updatedUser)
    }
  }

  const updatePet = (petId: string, petData: Partial<Pet>) => {
    if (user) {
      const updatedUser = {
        ...user,
        pets: user.pets.map((pet) => (pet.id === petId ? { ...pet, ...petData } : pet)),
      }

      setUser(updatedUser)
    }
  }

  const deletePet = (petId: string) => {
    if (user) {
      const updatedUser = {
        ...user,
        pets: user.pets.filter((pet) => pet.id !== petId),
      }

      setUser(updatedUser)
    }
  }

  const addBooking = (booking: Omit<BookingHistory, "id">) => {
    const newBooking: BookingHistory = {
      ...booking,
      id: `booking-${Date.now()}`,
    }

    setBookingHistory((prev) => [newBooking, ...prev])
  }

  const addConsultationHistory = (consultation: Omit<ConsultationHistory, "id">) => {
    const newConsultation: ConsultationHistory = {
      ...consultation,
      id: `consultation-${Date.now()}`,
    }

    setConsultationHistory((prev) => [newConsultation, ...prev])
  }

  const updateConsultationHistory = (consultationId: string, updates: Partial<ConsultationHistory>) => {
    setConsultationHistory((prev) =>
      prev.map((consultation) =>
        consultation.consultationId === consultationId ? { ...consultation, ...updates } : consultation,
      ),
    )
  }

  const addHomeServiceHistory = (service: Omit<HomeServiceHistory, "id">) => {
    const newService: HomeServiceHistory = {
      ...service,
      id: `service-${Date.now()}`,
    }

    setHomeServiceHistory((prev) => [newService, ...prev])
  }

  const updateHomeServiceHistory = (serviceId: string, updates: Partial<HomeServiceHistory>) => {
    setHomeServiceHistory((prev) =>
      prev.map((service) => (service.id === serviceId ? { ...service, ...updates } : service)),
    )
  }

  const addOrder = (orderData: Omit<Order, "id" | "orderNumber">) => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      orderNumber: `PET${Date.now().toString().slice(-6)}`,
    }
    setOrders((prev) => [newOrder, ...prev])
  }

  const value = {
    user,
    isLoggedIn,
    bookingHistory,
    consultationHistory,
    homeServiceHistory,
    login,
    logout,
    updateProfile,
    addPet,
    updatePet,
    deletePet,
    addBooking,
    addConsultationHistory,
    updateConsultationHistory,
    addHomeServiceHistory,
    updateHomeServiceHistory,
    orders,
    addOrder,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
