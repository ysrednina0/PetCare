"use client"

import { useState } from "react"
import { Search, ShoppingCart, Star, Heart, Check } from "lucide-react"
import { useCart } from "../contexts/CartContext"

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [addedToCart, setAddedToCart] = useState<number | null>(null)
  const { addToCart, items } = useCart()

  const categories = [
    { id: "all", name: "Semua Produk" },
    { id: "food", name: "Makanan" },
    { id: "medicine", name: "Obat-obatan" },
    { id: "accessories", name: "Aksesoris" },
    { id: "toys", name: "Mainan" },
    { id: "grooming", name: "Perawatan" },
  ]

  const products = [
    {
      id: 1,
      name: "Royal Canin Adult Cat Food",
      category: "food",
      price: "Rp 285.000",
      originalPrice: "Rp 320.000",
      rating: 4.8,
      reviews: 124,
      image: "https://images.pexels.com/photos/1359307/pexels-photo-1359307.jpeg?auto=compress&cs=tinysrgb&w=400",
      discount: "11%",
      inStock: true,
    },
    {
      id: 2,
      name: "Vitamin Kucing Multivitamin",
      category: "medicine",
      price: "Rp 45.000",
      originalPrice: "Rp 55.000",
      rating: 4.6,
      reviews: 89,
      image: "https://images.pexels.com/photos/6131071/pexels-photo-6131071.jpeg?auto=compress&cs=tinysrgb&w=400",
      discount: "18%",
      inStock: true,
    },
    {
      id: 3,
      name: "Kalung Anjing Premium Leather",
      category: "accessories",
      price: "Rp 125.000",
      originalPrice: null,
      rating: 4.9,
      reviews: 67,
      image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
      discount: null,
      inStock: true,
    },
    {
      id: 4,
      name: "Mainan Kucing Interactive Ball",
      category: "toys",
      price: "Rp 35.000",
      originalPrice: "Rp 45.000",
      rating: 4.7,
      reviews: 156,
      image: "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=400",
      discount: "22%",
      inStock: false,
    },
    {
      id: 5,
      name: "Shampoo Anjing Anti Kutu",
      category: "grooming",
      price: "Rp 65.000",
      originalPrice: null,
      rating: 4.5,
      reviews: 93,
      image: "https://images.pexels.com/photos/6568946/pexels-photo-6568946.jpeg?auto=compress&cs=tinysrgb&w=400",
      discount: null,
      inStock: true,
    },
    {
      id: 6,
      name: "Whiskas Adult Dry Food",
      category: "food",
      price: "Rp 95.000",
      originalPrice: "Rp 110.000",
      rating: 4.4,
      reviews: 201,
      image: "https://images.pexels.com/photos/1359307/pexels-photo-1359307.jpeg?auto=compress&cs=tinysrgb&w=400",
      discount: "14%",
      inStock: true,
    },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Handle add to cart with animation feedback
  const handleAddToCart = (product: any) => {
    addToCart(product)
    setAddedToCart(product.id)

    // Reset animation after 2 seconds
    setTimeout(() => {
      setAddedToCart(null)
    }, 2000)
  }

  // Check if product is already in cart
  const isInCart = (productId: number) => {
    return items.some((item) => item.id === productId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Toko Produk Hewan Peliharaan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan berbagai produk berkualitas untuk kebutuhan hewan peliharaan Anda
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-lg whitespace-nowrap transition-all transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? "bg-cyan-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                {product.discount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-medium animate-pulse">
                    -{product.discount}
                  </div>
                )}
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-all transform hover:scale-110">
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">Stok Habis</span>
                  </div>
                )}
                {isInCart(product.id) && (
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Check className="h-4 w-4" />
                    <span>Di Keranjang</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-cyan-600 transition-colors cursor-pointer">
                  {product.name}
                </h3>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">({product.reviews} ulasan)</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <button
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
                  className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 transform ${
                    product.inStock
                      ? addedToCart === product.id
                        ? "bg-green-500 text-white scale-105"
                        : "bg-cyan-500 text-white hover:bg-cyan-600 hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {addedToCart === product.id ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Ditambahkan!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      <span>{product.inStock ? "Tambah ke Keranjang" : "Stok Habis"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-bounce">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            </div>
            <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan</p>
            <p className="text-gray-400">Coba ubah kata kunci pencarian atau kategori</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Store
