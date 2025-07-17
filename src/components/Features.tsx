import React from 'react';
import { MessageCircle, ShoppingBag, Home, Clock, Shield, Star } from 'lucide-react';

const Features = () => {
  const features = [
    {
      id: 'consultation',
      icon: MessageCircle,
      title: 'Konsultasi Online',
      subtitle: 'Chat dengan dokter hewan berpengalaman',
      description: 'Konsultasi kesehatan hewan peliharaan Anda kapan saja, di mana saja dengan dokter hewan profesional dan berpengalaman.',
      features: [
        'Chat real-time dengan dokter hewan',
        'Konsultasi 24/7 tersedia',
        'Respon cepat dalam 5 menit',
        'Riwayat konsultasi tersimpan',
        'Rekomendasi treatment yang tepat'
      ],
      image: 'https://images.pexels.com/photos/4225920/pexels-photo-4225920.jpeg',
      color: 'cyan'
    },
    {
      id: 'store',
      icon: ShoppingBag,
      title: 'Toko Online',
      subtitle: 'Belanja kebutuhan hewan peliharaan',
      description: 'Temukan berbagai produk berkualitas untuk hewan peliharaan Anda, dari makanan hingga aksesoris, semua tersedia di satu tempat.',
      features: [
        'Makanan premium dan suplemen',
        'Obat-obatan dan vitamin',
        'Aksesoris dan mainan',
        'Produk perawatan lengkap',
        'Pengiriman cepat ke seluruh Indonesia'
      ],
      image: 'https://images.pexels.com/photos/6214470/pexels-photo-6214470.jpeg',
      color: 'blue'
    },
    {
      id: 'services',
      icon: Home,
      title: 'Layanan Home Service',
      subtitle: 'Perawatan hewan di rumah Anda',
      description: 'Nikmati layanan perawatan hewan profesional yang datang langsung ke rumah Anda untuk kenyamanan hewan peliharaan.',
      features: [
        'Pemeriksaan kesehatan rutin',
        'Vaksinasi dan grooming',
        'Perawatan medis di rumah',
        'Dokter hewan berpengalaman',
        'Peralatan medis lengkap'
      ],
      image: 'https://images.pexels.com/photos/6234610/pexels-photo-6234610.jpeg',
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: {
        bg: 'bg-cyan-500',
        text: 'text-cyan-600',
        bgLight: 'bg-cyan-50',
        border: 'border-cyan-200'
      },
      blue: {
        bg: 'bg-blue-500',
        text: 'text-blue-600',
        bgLight: 'bg-blue-50',
        border: 'border-blue-200'
      },
      orange: {
        bg: 'bg-orange-500',
        text: 'text-orange-600',
        bgLight: 'bg-orange-50',
        border: 'border-orange-200'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Layanan Terlengkap untuk Hewan Peliharaan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tiga layanan utama yang terintegrasi untuk memberikan perawatan terbaik bagi hewan peliharaan Anda
          </p>
        </div>

        {/* Features */}
        <div className="space-y-20">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            const isEven = index % 2 === 0;

            return (
              <div key={feature.id} className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Content */}
                <div className={isEven ? '' : 'lg:col-start-2'}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.bg} rounded-2xl mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className={`text-lg ${colors.text} mb-6 font-medium`}>{feature.subtitle}</p>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">{feature.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 ${colors.bg} rounded-full`}></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`${colors.bg} text-white px-8 py-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg`}>
                    Pelajari Lebih Lanjut
                  </button>
                </div>

                {/* Image */}
                <div className={isEven ? '' : 'lg:col-start-1'}>
                  <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-[400px] object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                    
                    {/* Floating badge */}
                    <div className={`absolute -top-4 -right-4 ${colors.bgLight} ${colors.border} border-2 p-4 rounded-xl shadow-lg`}>
                      <div className="flex items-center space-x-2">
                        <Star className={`h-5 w-5 ${colors.text}`} />
                        <span className="font-semibold text-gray-900">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
