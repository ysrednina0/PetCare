import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Wijaya',
      role: 'Pemilik Kucing Persian',
      location: 'Jakarta',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'PetCare sangat membantu ketika kucing saya sakit tengah malam. Dokter hewan langsung merespon chat saya dan memberikan saran yang tepat. Layanan home service-nya juga sangat profesional!',
      rating: 5
    },
    {
      name: 'Ahmad Pratama',
      role: 'Pemilik Anjing Golden Retriever',
      location: 'Surabaya',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'Toko online PetCare lengkap banget! Dari makanan premium sampai mainan, semua ada. Pengiriman cepat dan packaging aman. Anjing saya suka banget sama makanan yang saya beli di sini.',
      rating: 5
    },
    {
      name: 'Rina Sari',
      role: 'Pemilik Hamster',
      location: 'Bandung',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
      content: 'Sebagai pemilik hewan kecil, saya sering khawatir dengan kesehatan hamster saya. PetCare memberikan konsultasi yang detail dan mudah dipahami. Sangat recommended!',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Apa Kata Mereka tentang PetCare?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Testimoni dari ribuan pemilik hewan yang telah merasakan manfaat layanan PetCare
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow">
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-emerald-200">
                <Quote className="h-8 w-8" />
              </div>
              
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">15,000+</div>
              <div className="text-emerald-100">Hewan Dirawat</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-cyan-100">Kepuasan Pelanggan</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-cyan-100">Layanan Tersedia</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-cyan-100">Kota Terjangkau</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
