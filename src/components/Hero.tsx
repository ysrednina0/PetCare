import React from 'react';
import { ArrowRight, Play, Heart } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="bg-gradient-to-br from-cyan-50 to-blue-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Solusi Kesehatan{' '}
              <span className="text-cyan-500">Hewan Peliharaan</span>{' '}
              Terlengkap
            </h1>
            <p className="text-xl text-gray-600 mt-6 mb-8 leading-relaxed">
              Konsultasi online, belanja kebutuhan hewan, dan layanan home service dalam satu platform. 
              Rawat hewan peliharaan Anda dengan mudah dan terpercaya.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-cyan-500 text-white px-8 py-4 rounded-lg hover:bg-cyan-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg">
                <span>Mulai Konsultasi</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Lihat Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">50+</div>
                <div className="text-gray-600 text-sm">Dokter Hewan</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">10K+</div>
                <div className="text-gray-600 text-sm">Produk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600">100+</div>
                <div className="text-gray-600 text-sm">Kota</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Pet care consultation"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-100 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">24/7 Support</div>
                  <div className="text-gray-600 text-sm">Selalu siap membantu</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Play className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Konsultasi Cepat</div>
                  <div className="text-gray-600 text-sm">Respon {'<'} 5 menit</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
