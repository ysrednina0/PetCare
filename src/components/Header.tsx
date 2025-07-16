"use client";
import React from "react";
import { useState } from "react";
import {
  Menu,
  X,
  Heart,
  ShoppingBag,
  ShoppingCart,
  User,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import logo from "../assets/logo-petcare-dark-blue.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { user, isLoggedIn, logout } = useUser();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const cartItemCount = getTotalItems();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 rounded-lg">
              <img src={logo} alt="Logo" width={30} />
            </div>
            <span className="text-xl font-bold text-gray-900">PetCare</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                isActive("/")
                  ? "text-cyan-600 font-medium"
                  : "text-gray-700 hover:text-cyan-600"
              }`}
            >
              Beranda
            </Link>
            <Link
              to="/consultation"
              className={`transition-colors ${
                isActive("/consultation")
                  ? "text-cyan-600 font-medium"
                  : "text-gray-700 hover:text-cyan-600"
              }`}
            >
              Konsultasi
            </Link>
            <Link
              to="/store"
              className={`transition-colors ${
                isActive("/store")
                  ? "text-cyan-600 font-medium"
                  : "text-gray-700 hover:text-cyan-600"
              }`}
            >
              Toko
            </Link>
            <Link
              to="/services"
              className={`transition-colors ${
                isActive("/services")
                  ? "text-cyan-600 font-medium"
                  : "text-gray-700 hover:text-cyan-600"
              }`}
            >
              Layanan
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isActive("/about")
                  ? "text-cyan-600 font-medium"
                  : "text-gray-700 hover:text-cyan-600"
              }`}
            >
              Tentang
            </Link>
            <Link
              to="/history"
              className={`transition-colors ${
                isActive("/history")
                  ? "text-cyan-600 font-medium"
                  : "text-gray-700 hover:text-cyan-600"
              }`}
            >
              Riwayat
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-cyan-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={
                      user.avatar ||
                      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100" ||
                      "/placeholder.svg"
                    }
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-gray-700 font-medium">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profil Saya</span>
                    </Link>
                    <Link
                      to="/booking-history"
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Riwayat Booking</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Mulai Sekarang
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-cyan-600 font-medium"
                    : "text-gray-700 hover:text-cyan-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                to="/consultation"
                className={`transition-colors ${
                  isActive("/consultation")
                    ? "text-cyan-600 font-medium"
                    : "text-gray-700 hover:text-cyan-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Konsultasi
              </Link>
              <Link
                to="/store"
                className={`transition-colors ${
                  isActive("/store")
                    ? "text-cyan-600 font-medium"
                    : "text-gray-700 hover:text-cyan-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Toko
              </Link>
              <Link
                to="/services"
                className={`transition-colors ${
                  isActive("/services")
                    ? "text-cyan-600 font-medium"
                    : "text-gray-700 hover:text-cyan-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Layanan
              </Link>
              <Link
                to="/about"
                className={`transition-colors ${
                  isActive("/about")
                    ? "text-cyan-600 font-medium"
                    : "text-gray-700 hover:text-cyan-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang
              </Link>
              <Link
                to="/history"
                className={`transition-colors ${
                  isActive("/history")
                    ? "text-cyan-600 font-medium"
                    : "text-gray-700 hover:text-cyan-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Riwayat
              </Link>

              {/* Mobile Cart Link */}
              <Link
                to="/cart"
                className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Keranjang ({cartItemCount})</span>
              </Link>

              {/* Mobile User Actions */}
              {isLoggedIn && user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-cyan-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profil Saya
                  </Link>
                  <Link
                    to="/booking-history"
                    className="text-gray-700 hover:text-cyan-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Riwayat Booking
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-600 hover:text-red-700 transition-colors text-left"
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mulai Sekarang
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
