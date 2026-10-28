import React from 'react';
import {
  SparklesIcon,
  ClockIcon,
  CalendarIcon,
  LaptopIcon,
  ShieldCheckIcon,
  CheckCircleIcon
} from '@/components/ui/Icons';
import { APP_CONFIG } from '@/lib/config';

export function BenefitsSection() {
  const benefits = [
    {
      icon: ClockIcon,
      color: 'bg-indigo-100 text-indigo-700',
      title: '5 Pertemuan Privat 1-on-1',
      desc: 'Sesi interaktif langsung antara kamu dan pengajar melalui Google Meet / Zoom. Bebas bertanya tanpa rasa canggung seperti di kelas umum massal.'
    },
    {
      icon: LaptopIcon,
      color: 'bg-blue-100 text-blue-700',
      title: 'Pendampingan Praktik Proyek Nyata',
      desc: 'Bukan sekadar menyimak teori atau slide presentasi. Kamu akan langsung merancang, coding, dan menguji fitur yang relevan dengan idemu.'
    },
    {
      icon: CheckCircleIcon,
      color: 'bg-emerald-100 text-emerald-700',
      title: 'Diskusi & Bedah Ide Spesifik',
      desc: 'Membahas arsitektur sistem, pemilihan database, alur pengguna, hingga penanganan error agar aplikasimu memiliki struktur yang baik dan mudah dikembangkan.'
    },
    {
      icon: CalendarIcon,
      color: 'bg-violet-100 text-violet-700',
      title: 'Jadwal Fleksibel & Terjadwal Nyaman',
      desc: 'Jadwal belajar disepakati bersama pengajar setelah konfirmasi pembayaran. Cocok bagi mahasiswa, pekerja, atau pelajar dengan waktu luang tertentu.'
    },
    {
      icon: SparklesIcon,
      color: 'bg-amber-100 text-amber-700',
      title: 'Fasilitas Gemini Pro Selama 3 Bulan',
      desc: `Mendapatkan akses fasilitas AI Gemini Pro selama ${APP_CONFIG.geminiProDurationMonths} bulan untuk mempercepat riset konsep, eksplorasi solusi coding, dan bantuan belajar mandiri di luar sesi.`
    },
    {
      icon: ShieldCheckIcon,
      color: 'bg-rose-100 text-rose-700',
      title: 'Penyesuaian Tempo Sesuai Kemampuan',
      desc: 'Pengajar akan menyesuaikan kecepatan materi dan analogi teknis berdasarkan latar belakangmu, baik pemula dari nol maupun yang sudah punya dasar coding.'
    }
  ];

  return (
    <section id="fasilitas" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Fasilitas & Ruang Lingkup
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apa yang Kamu Dapatkan di Setiap Program?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Semua paket kelas dirancang komprehensif untuk memastikan kamu tidak hanya tahu teori, tetapi mampu membangun dan memahami alur kerja pembuatan aplikasi sesungguhnya.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all space-y-3.5"
              >
                <div className={`w-10 h-10 rounded-xl ${b.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Honest Mentoring Disclaimer Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-amber-900">
            <ShieldCheckIcon className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <span>Pernyataan Ruang Lingkup & Kejujuran Akademik</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            Kelas ini berfokus pada <strong>pendampingan, transfer ilmu, dan bimbingan praktik mandiri</strong>, bukan jasa joki / pembuatan aplikasi terima beres oleh pengajar. Keberhasilan penyelesaian proyek secara utuh dalam 5 pertemuan bergantung pada kompleksitas ide proyek, komitmen latihan peserta, serta ruang lingkup yang disepakati bersama. Fasilitas Gemini Pro diberikan sebagai pendukung proses belajar sesuai ketersediaan dan ketentuan resmi penyedia.
          </p>
        </div>
      </div>
    </section>
  );
}
