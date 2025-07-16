import React from 'react';
import { Heart, Users, Award, Globe, Target, Eye } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '15,000+', label: 'Hewan Dirawat' },
    { number: '50+', label: 'Dokter Hewan' },
    { number: '100+', label: 'Kota Terjangkau' },
    { number: '98%', label: 'Kepuasan Pelanggan' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Wijaya',
      role: 'Chief Veterinary Officer',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Dokter hewan berpengalaman 15 tahun dengan spesialisasi hewan kecil'
    },
    {
      name: 'Ahmad Pratama',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Entrepreneur passionate tentang kesehatan hewan dan teknologi'
    },
    {
      name: 'Rina Sari',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Expert dalam operasional dan customer experience management'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Kasih Sayang',
      description: 'Kami percaya setiap hewan peliharaan layak mendapatkan perawatan terbaik dengan penuh kasih sayang'
    },
    {
      icon: Users,
      title: 'Profesionalisme',
      description: 'Tim dokter hewan berpengalaman dan bersertifikat siap memberikan layanan profesional'
    },
    {
      icon: Award,
      title: 'Kualitas Terjamin',
      description: 'Standar layanan tinggi dengan produk berkualitas untuk kesehatan hewan peliharaan'
    },
    {
      icon: Globe,
      title: 'Aksesibilitas',
      description: 'Menjangkau seluruh Indonesia dengan layanan yang mudah diakses kapan saja'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tentang PetCare
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Platform kesehatan hewan terdepan di Indonesia yang menghubungkan pemilik hewan 
              dengan layanan perawatan profesional melalui teknologi digital
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-cyan-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Misi Kami</h2>
              <p className="text-gray-600 leading-relaxed">
                Memberikan akses mudah dan terjangkau ke layanan kesehatan hewan berkualitas tinggi 
                melalui platform digital yang inovatif, sehingga setiap hewan peliharaan di Indonesia 
                dapat hidup sehat dan bahagia.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Visi Kami</h2>
              <p className="text-gray-600 leading-relaxed">
                Menjadi platform kesehatan hewan terpercaya dan terdepan di Asia Tenggara, 
                yang mengintegrasikan teknologi modern dengan layanan perawatan hewan profesional 
                untuk menciptakan ekosistem pet care yang komprehensif.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pencapaian Kami
            </h2>
            <p className="text-xl text-gray-600">
              Angka yang menunjukkan komitmen kami dalam melayani hewan peliharaan Indonesia
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-cyan-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-xl text-gray-600">
              Prinsip yang memandu setiap langkah kami dalam melayani hewan peliharaan
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tim Kami
            </h2>
            <p className="text-xl text-gray-600">
              Profesional berpengalaman yang berdedikasi untuk kesehatan hewan peliharaan
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-cyan-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cerita Kami
            </h2>
          </div>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              PetCare lahir dari keprihatinan mendalam terhadap berbagai tantangan yang dihadapi 
              pemilik hewan peliharaan di Indonesia. Kami melihat bagaimana akses terbatas ke dokter hewan, 
              terutama di daerah terpencil atau di luar jam operasional standar, sering kali menjadi 
              hambatan besar dalam memberikan perawatan terbaik untuk hewan kesayangan.
            </p>
            <p className="mb-6">
              Berawal dari pengalaman pribadi pendiri yang kesulitan mencari layanan veteriner 
              berkualitas saat hewan peliharaannya sakit di tengah malam, kami menyadari perlunya 
              solusi digital yang dapat menjembatani kesenjangan ini. Dengan memanfaatkan teknologi 
              modern, kami menciptakan platform yang mengintegrasikan konsultasi online, toko produk 
              hewan, dan layanan home service dalam satu ekosistem yang mudah diakses.
            </p>
            <p>
              Hari ini, PetCare telah melayani ribuan pemilik hewan di seluruh Indonesia, 
              menghubungkan mereka dengan dokter hewan profesional dan menyediakan akses ke 
              produk-produk berkualitas. Kami terus berinovasi untuk menjadi solusi terdepan 
              dalam dunia perawatan hewan peliharaan digital.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
