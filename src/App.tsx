import * as React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./contexts/CartContext"
import { UserProvider } from "./contexts/UserContext"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Consultation from "./pages/Consultation"
import Store from "./pages/Store"
import Services from "./pages/Services"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Profile from "./pages/Profile"
import BookingHistory from "./pages/BookingHistory"
import ChatDoctor from "./pages/ChatDoctor"
import HistoryPage from "./pages/HistoryPage"

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/consultation" element={<Consultation />} />
                      <Route path="/store" element={<Store />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/booking-history" element={<BookingHistory />} />
                      <Route path="/chat-doctor" element={<ChatDoctor />} />
                      <Route path="/history" element={<HistoryPage />} />
                    </Routes>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  )
}

export default App
