import React from 'react';
import {
  SparklesIcon,
  ClockIcon,
  CalendarIcon,
  LaptopIcon,
  ShieldCheckIcon
} from '@/components/ui/Icons';
import { APP_CONFIG } from '@/lib/config';

export function BenefitsSection() {
  const benefits = [
    {
      icon: ClockIcon,
      color: 'bg-indigo-100 text-indigo-700',
      title: '5 Sesi Privat 1-on-1',
      desc: 'Bimbingan interaktif tatap muka online langsung berdua bersama pengajar.'
    },
    {
      icon: LaptopIcon,
      color: 'bg-blue-100 text-blue-700',
      title: 'Praktik Langsung Proyek Nyata',
      desc: 'Langsung merancang, coding, dan menguji fitur sesuai ide yang ingin kamu buat.'
    },
    {
      icon: CalendarIcon,
      color: 'bg-violet-100 text-violet-700',
      title: 'Jadwal Belajar Fleksibel',
      desc: 'Waktu pertemuan dibicarakan dan disepakati bersama setelah pendaftaran.'
    },
    {
      icon: SparklesIcon,
      color: 'bg-amber-100 text-amber-700',
      title: 'Akses Gemini Pro 3 Bulan',
      desc: `Fasilitas AI resmi selama ${APP_CONFIG.geminiProDurationMonths} bulan untuk mempercepat pemahaman konsep dan eksplorasi solusi.`
    }
  ];

  return (
    <section id="fasilitas" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Fasilitas
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Apa yang Kamu Dapatkan?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Setiap peserta mendapatkan fasilitas lengkap untuk mendukung proses belajar yang optimal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all space-y-2.5"
              >
                <div className={`w-9 h-9 rounded-xl ${b.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start sm:items-center gap-2.5 max-w-3xl mx-auto">
          <ShieldCheckIcon className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong>Catatan:</strong> Program ini adalah pendampingan belajar dan bimbingan praktik mandiri, bukan layanan joki pembuatan aplikasi instan. Hasil akhir disesuaikan dengan ruang lingkup dan komitmen belajar peserta.
          </p>
        </div>
      </div>
    </section>
  );
}
