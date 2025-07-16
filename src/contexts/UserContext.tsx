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
  login: (email: string, password: string) => boolean
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
  addPet: (petData: Omit<Pet, "id" | "createdAt">) => void
  updatePet: (petId: string, petData: Partial<Pet>) => void
  deletePet: (petId: string) => void
  addBooking: (booking: Omit<BookingHistory, "id">) => void
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
  name: "Sarah Wijaya",
  email: "demo@example.com",
  phone: "+62 812-3456-7890",
  address: "Jl. Sudirman No. 123, Jakarta Selatan",
  avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300",
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

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [bookingHistory, setBookingHistory] = useState<BookingHistory[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("petcare_user")
    const savedBookings = localStorage.getItem("petcare_bookings")
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

    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  // Save user data to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("petcare_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("petcare_user")
    }
  }, [user])

  // Save booking history to localStorage
  useEffect(() => {
    localStorage.setItem("petcare_bookings", JSON.stringify(bookingHistory))
  }, [bookingHistory])

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem("petcare_orders", JSON.stringify(orders))
  }, [orders])

  const login = (email: string, password: string): boolean => {
    // Demo login - check for demo credentials
    if (email === "demo@example.com" && password === "123456") {
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
    login,
    logout,
    updateProfile,
    addPet,
    updatePet,
    deletePet,
    addBooking,
    orders,
    addOrder,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
