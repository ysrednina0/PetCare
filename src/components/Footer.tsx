import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import logo from "../assets/logo-petcare-white.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 rounded-lg">
              <img src={logo} alt="Logo" width={30} />
              </div>
              <span className="text-2xl font-bold">PetCare</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Platform kesehatan hewan terlengkap di Indonesia. Kami menyediakan konsultasi online, 
              toko produk hewan, dan layanan home service untuk memberikan perawatan terbaik bagi hewan peliharaan Anda.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/petcaree.ofc?igsh=MXdtM25mNDF0cHZ2eg==" className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Layanan</h3>
            <ul className="space-y-4">
              <li><Link to="/Consultation" className="text-gray-400 hover:text-white transition-colors">Konsultasi Online</Link></li>
              <li><Link to="/Store" className="text-gray-400 hover:text-white transition-colors">Toko Produk</Link></li>
              <li><Link to="/Services" className="text-gray-400 hover:text-white transition-colors">Home Service</Link></li>
              <li><Link to="/Services" className="text-gray-400 hover:text-white transition-colors">Vaksinasi</Link></li>
              <li><Link to="/Services" className="text-gray-400 hover:text-white transition-colors">Grooming</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Hubungi Kami</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-cyan-500" />
                <span className="text-gray-400">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-cyan-500" />
                <span className="text-gray-400">petcareeofc@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-cyan-500" />
                <span className="text-gray-400">Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 PetCare. Semua hak dilindungi.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              Syarat & Ketentuan
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
