import type React from "react"
import { useState } from "react"
import { User, Edit3, Save, X, Plus, Trash2, Heart, Phone, Mail, MapPin } from "lucide-react"
import { useUser } from "../contexts/UserContext"

const Profile = () => {
  const { user, updateProfile, addPet, updatePet, deletePet } = useUser()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isAddingPet, setIsAddingPet] = useState(false)
  const [editingPetId, setEditingPetId] = useState<string | null>(null)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })

  // Pet form state
  const [petForm, setPetForm] = useState({
    name: "",
    type: "cat" as "cat" | "dog" | "bird" | "rabbit" | "hamster" | "other",
    gender: "male" as "male" | "female",
    age: "",
    breed: "",
    weight: "",
  })

  // Handle profile update
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(profileForm)
    setIsEditingProfile(false)
  }

  // Handle pet addition
  const handlePetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const petData = {
      ...petForm,
      age: petForm.age ? Number.parseInt(petForm.age) : undefined,
      weight: petForm.weight ? Number.parseFloat(petForm.weight) : undefined,
    }

    if (editingPetId) {
      updatePet(editingPetId, petData)
      setEditingPetId(null)
    } else {
      addPet(petData)
    }

    // Reset form
    setPetForm({
      name: "",
      type: "cat",
      gender: "male",
      age: "",
      breed: "",
      weight: "",
    })
    setIsAddingPet(false)
  }

  // Handle pet editing
  const handleEditPet = (pet: any) => {
    setPetForm({
      name: pet.name,
      type: pet.type,
      gender: pet.gender,
      age: pet.age?.toString() || "",
      breed: pet.breed || "",
      weight: pet.weight?.toString() || "",
    })
    setEditingPetId(pet.id)
    setIsAddingPet(true)
  }

  // Cancel pet form
  const cancelPetForm = () => {
    setPetForm({
      name: "",
      type: "cat",
      gender: "male",
      age: "",
      breed: "",
      weight: "",
    })
    setIsAddingPet(false)
    setEditingPetId(null)
  }

  const petTypeLabels = {
    cat: "Kucing",
    dog: "Anjing",
    bird: "Burung",
    rabbit: "Kelinci",
    hamster: "Hamster",
    other: "Lainnya",
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profil Saya</h1>
          <p className="text-gray-600">Kelola informasi pribadi dan data hewan peliharaan Anda</p>
        </div>

        <div className="space-y-8">
          {/* Profile Information */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      user.avatar ||
                      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100"
                    }
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Informasi Pribadi</h2>
                    <p className="text-gray-600">Data pribadi Anda</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsEditingProfile(!isEditingProfile)
                    if (!isEditingProfile) {
                      setProfileForm({
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        address: user.address || "",
                      })
                    }
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors"
                >
                  {isEditingProfile ? <X className="h-5 w-5" /> : <Edit3 className="h-5 w-5" />}
                  <span>{isEditingProfile ? "Batal" : "Edit"}</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              {isEditingProfile ? (
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                      <input
                        type="tel"
                        required
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                      <input
                        type="text"
                        value={profileForm.address}
                        onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="flex items-center space-x-2 bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Simpan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(false)}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Nama</p>
                      <p className="font-medium text-gray-900">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Telepon</p>
                      <p className="font-medium text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Alamat</p>
                      <p className="font-medium text-gray-900">{user.address || "Belum diisi"}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pet Information */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <Heart className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Hewan Peliharaan</h2>
                    <p className="text-gray-600">Data hewan peliharaan Anda ({user.pets.length})</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddingPet(true)}
                  className="flex items-center space-x-2 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  <span>Tambah Hewan</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Add/Edit Pet Form */}
              {isAddingPet && (
                <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {editingPetId ? "Edit Hewan Peliharaan" : "Tambah Hewan Peliharaan"}
                  </h3>
                  <form onSubmit={handlePetSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Hewan *</label>
                        <input
                          type="text"
                          required
                          value={petForm.name}
                          onChange={(e) => setPetForm({ ...petForm, name: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Hewan *</label>
                        <select
                          required
                          value={petForm.type}
                          onChange={(e) => setPetForm({ ...petForm, type: e.target.value as any })}
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
                          value={petForm.gender}
                          onChange={(e) => setPetForm({ ...petForm, gender: e.target.value as any })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="male">Jantan</option>
                          <option value="female">Betina</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Umur (tahun)</label>
                        <input
                          type="number"
                          min="0"
                          value={petForm.age}
                          onChange={(e) => setPetForm({ ...petForm, age: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ras/Breed</label>
                        <input
                          type="text"
                          value={petForm.breed}
                          onChange={(e) => setPetForm({ ...petForm, breed: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Berat (kg)</label>
                        <input
                          type="number"
                          min="0"
                          step="0.1"
                          value={petForm.weight}
                          onChange={(e) => setPetForm({ ...petForm, weight: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                      >
                        <Save className="h-4 w-4" />
                        <span>{editingPetId ? "Update" : "Simpan"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={cancelPetForm}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Pet List */}
              {user.pets.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Hewan Peliharaan</h3>
                  <p className="text-gray-600">Tambahkan data hewan peliharaan Anda untuk memudahkan konsultasi</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {user.pets.map((pet) => (
                    <div
                      key={pet.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={
                              pet.image ||
                              "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=100"
                            }
                            alt={pet.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">{pet.name}</h4>
                            <p className="text-sm text-gray-600">
                              {petTypeLabels[pet.type]} • {pet.gender === "male" ? "Jantan" : "Betina"}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditPet(pet)}
                            className="p-2 text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 rounded-lg transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deletePet(pet.id)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600">
                        {pet.age && <p>Umur: {pet.age} tahun</p>}
                        {pet.breed && <p>Ras: {pet.breed}</p>}
                        {pet.weight && <p>Berat: {pet.weight} kg</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
