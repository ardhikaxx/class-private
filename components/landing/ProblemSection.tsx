import React from 'react';
import { LaptopIcon, HelpCircleIcon, CalendarIcon, ShieldCheckIcon } from '@/components/ui/Icons';

export function ProblemSection() {
  const points = [
    {
      icon: LaptopIcon,
      badge: '100% RELEVAN',
      title: 'Ide Proyek Sendiri',
      desc: 'Langsung praktik pada aplikasi yang ingin kamu buat, bukan sekadar meniru tutorial umum.'
    },
    {
      icon: HelpCircleIcon,
      badge: 'SOLUTIF',
      title: 'Live Debugging Bareng',
      desc: 'Atasi error coding langsung bersama pengajar tanpa perlu pusing mencari jawaban sendiri.'
    },
    {
      icon: CalendarIcon,
      badge: 'FLEKSIBEL',
      title: 'Waktu & Tempo Bebas',
      desc: 'Jadwal belajar disepakati bersama dan kecepatan materi disesuaikan dengan kemampuanmu.'
    }
  ];

  return (
    <section id="solusi" className="py-14 lg:py-20 bg-zinc-950 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
            KENAPA PRIVAT?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Belajar Lebih Efektif dengan Mentoring 1-on-1
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Fokus penuh pada ide proyekmu tanpa terdistraksi materi massal.
          </p>
        </div>

        {/* 3 Sleek Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl p-6 shadow-xl hover:border-white/30 hover:bg-zinc-900/70 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold shadow-md shadow-white/10 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-white/20 bg-white/5 text-zinc-300">
                      {pt.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {pt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Trust Pill in Glass */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs text-zinc-400">
            <ShieldCheckIcon className="w-4 h-4 text-white flex-shrink-0" />
            <span>Pendampingan praktik mandiri terarah, bukan jasa joki aplikasi.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
