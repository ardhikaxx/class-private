import React from 'react';
import { LaptopIcon, HelpCircleIcon, CalendarIcon, ShieldCheckIcon } from '@/components/ui/Icons';

export function ProblemSection() {
  const points = [
    {
      icon: LaptopIcon,
      gradient: 'from-blue-600 to-indigo-600 shadow-blue-500/20',
      badge: '100% Relevan',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Ide Proyek Sendiri',
      desc: 'Langsung praktik pada aplikasi yang ingin kamu buat, bukan sekadar meniru tutorial umum.'
    },
    {
      icon: HelpCircleIcon,
      gradient: 'from-emerald-600 to-teal-600 shadow-emerald-500/20',
      badge: 'Solutif',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Live Debugging Bareng',
      desc: 'Atasi error coding langsung bersama pengajar tanpa perlu pusing mencari jawaban sendiri.'
    },
    {
      icon: CalendarIcon,
      gradient: 'from-violet-600 to-purple-600 shadow-violet-500/20',
      badge: 'Fleksibel',
      badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
      title: 'Waktu & Tempo Bebas',
      desc: 'Jadwal belajar disepakati bersama dan kecepatan materi disesuaikan dengan kemampuanmu.'
    }
  ];

  return (
    <section id="solusi" className="py-12 lg:py-16 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Kenapa Privat?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Belajar Lebih Efektif dengan Mentoring 1-on-1
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Fokus penuh pada ide proyekmu tanpa terdistraksi materi massal.
          </p>
        </div>

        {/* 3 Sleek Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pt.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${pt.badgeColor}`}
                    >
                      {pt.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {pt.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Minimalist Trust Pill */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600 shadow-2xs">
            <ShieldCheckIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>Pendampingan praktik mandiri terarah, bukan jasa joki aplikasi.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
