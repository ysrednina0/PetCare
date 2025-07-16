import React from 'react';
import { Search, MessageCircle, Calendar, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Pilih Layanan',
      description: 'Pilih jenis layanan yang Anda butuhkan: konsultasi online, belanja produk, atau booking home service.',
      color: 'cyan'
    },
    {
      icon: MessageCircle,
      title: 'Konsultasi & Pilih',
      description: 'Konsultasikan kebutuhan hewan peliharaan Anda dengan dokter hewan atau pilih produk yang sesuai.',
      color: 'blue'
    },
    {
      icon: Calendar,
      title: 'Jadwalkan',
      description: 'Atur jadwal konsultasi lanjutan, pengiriman produk, atau kunjungan home service sesuai kebutuhan.',
      color: 'orange'
    },
    {
      icon: CheckCircle,
      title: 'Nikmati Layanan',
      description: 'Terima layanan berkualitas tinggi dan rasakan perbedaannya untuk kesehatan hewan peliharaan Anda.',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      cyan: 'bg-cyan-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      purple: 'bg-purple-500'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Cara Kerja Platform PetCare
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empat langkah sederhana untuk mendapatkan perawatan terbaik untuk hewan peliharaan Anda
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-8 z-0"></div>
              )}
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${getColorClasses(step.color)} rounded-2xl mb-6 shadow-lg`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Step number */}
                <div className="absolute -top-2 -right-2 bg-white border-2 border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-gray-600">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Siap Memulai Perjalanan Perawatan Hewan Peliharaan?
            </h3>
            <p className="text-gray-600 mb-6">
              Bergabunglah dengan ribuan pemilik hewan yang telah mempercayai PetCare untuk perawatan hewan peliharaan mereka.
            </p>
            <button className="bg-emerald-500 text-white px-8 py-4 rounded-lg hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg">
              Daftar Sekarang Gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
