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
      title: '5 Sesi Privat 1-on-1',
      desc: 'Bimbingan tatap muka online intensif berdua langsung bersama pengajar.'
    },
    {
      icon: LaptopIcon,
      title: 'Praktik Proyek Nyata',
      desc: 'Langsung merancang, coding, dan menguji fitur sesuai ide yang ingin kamu buat.'
    },
    {
      icon: CalendarIcon,
      title: 'Jadwal Fleksibel',
      desc: 'Waktu pertemuan dibicarakan dan disepakati bersama setelah pendaftaran.'
    },
    {
      icon: SparklesIcon,
      title: 'Akses Gemini Pro 3 Bulan',
      desc: `Fasilitas AI resmi selama ${APP_CONFIG.geminiProDurationMonths} bulan untuk mempercepat riset konsep dan eksplorasi solusi.`
    }
  ];

  return (
    <section id="fasilitas" className="py-14 lg:py-20 bg-zinc-950 text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
            FASILITAS & DUKUNGAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Apa yang Kamu Dapatkan?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Fasilitas komprehensif untuk mendukung proses belajar yang optimal dan terarah.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="group p-5 sm:p-6 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl hover:border-white/25 hover:bg-zinc-900/70 transition-all duration-300 space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold shadow-md shadow-white/10 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md text-xs text-zinc-400 flex items-start sm:items-center gap-2.5 max-w-3xl mx-auto">
          <ShieldCheckIcon className="w-4 h-4 text-white flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-white">Transparansi:</strong> Program ini adalah pendampingan belajar dan bimbingan praktik mandiri, bukan jasa joki pembuatan aplikasi instan. Hasil akhir disesuaikan dengan ruang lingkup dan komitmen belajar peserta.
          </p>
        </div>
      </div>
    </section>
  );
}
