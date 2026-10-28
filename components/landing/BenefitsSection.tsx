import React from 'react';
import {
  SparklesIcon,
  ClockIcon,
  CalendarIcon,
  LaptopIcon
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
      title: 'Gemini Pro 3 Bulan',
      desc: `Akses AI selama ${APP_CONFIG.geminiProDurationMonths} bulan untuk mempercepat riset dan solusi kode.`
    }
  ];

  return (
    <section id="fasilitas" className="py-14 lg:py-20 bg-zinc-950 text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-10">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
            FASILITAS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Yang Kamu Dapatkan
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Pendampingan privat terarah untuk membangun proyek aplikasimu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl hover:border-white/20 transition-all space-y-2.5"
              >
                <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5 text-black" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {b.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
