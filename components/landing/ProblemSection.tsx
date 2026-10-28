import React from 'react';
import { LaptopIcon, HelpCircleIcon, CalendarIcon } from '@/components/ui/Icons';

export function ProblemSection() {
  const points = [
    {
      icon: LaptopIcon,
      title: 'Ide Proyek Sendiri',
      desc: 'Langsung praktik pada aplikasi yang ingin kamu buat, bukan sekadar tutorial umum.'
    },
    {
      icon: HelpCircleIcon,
      title: 'Live Debugging',
      desc: 'Atasi error koding langsung bersama pengajar saat sesi bimbingan 1-on-1.'
    },
    {
      icon: CalendarIcon,
      title: 'Waktu Fleksibel',
      desc: 'Jadwal belajar dan kecepatan materi disesuaikan dengan waktu luangmu.'
    }
  ];

  return (
    <section id="solusi" className="py-14 lg:py-20 bg-zinc-950 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-10">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
            KENAPA PRIVAT?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Belajar Lebih Efektif dengan Mentoring 1-on-1
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Fokus penuh pada ide aplikasimu tanpa terdistraksi materi massal.
          </p>
        </div>

        {/* 3 Sleek Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl p-6 shadow-xl hover:border-white/25 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5 text-black" />
                </div>

                <h3 className="text-base font-bold text-white">
                  {pt.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
