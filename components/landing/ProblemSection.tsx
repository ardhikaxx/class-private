import React from 'react';
import { LaptopIcon, HelpCircleIcon, CalendarIcon, ShieldCheckIcon } from '@/components/ui/Icons';

export function ProblemSection() {
  const points = [
    {
      icon: LaptopIcon,
      color: 'bg-blue-100 text-blue-700',
      title: 'Belajar Berbasis Ide Sendiri',
      desc: 'Langsung praktik pada fitur aplikasi yang ingin kamu buat, bukan sekadar meniru tutorial generik.'
    },
    {
      icon: HelpCircleIcon,
      color: 'bg-emerald-100 text-emerald-700',
      title: 'Tanya Jawab & Live Debugging',
      desc: 'Hadapi error dan kendala teknis bersama pengajar secara langsung, tanpa frustrasi mencari solusi sendirian.'
    },
    {
      icon: CalendarIcon,
      color: 'bg-violet-100 text-violet-700',
      title: 'Jadwal & Tempo Fleksibel',
      desc: 'Waktu pertemuan disepakati bersama pengajar. Kecepatan bimbingan disesuaikan dengan kemampuan awalmu.'
    }
  ];

  return (
    <section id="solusi" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Kenapa Privat?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Belajar Lebih Efektif dengan Mentoring 1-on-1
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Fokus penuh pada ide proyekmu tanpa terdistraksi materi massal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-indigo-200 transition-all space-y-3"
              >
                <div className={`w-9 h-9 rounded-xl ${pt.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{pt.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pt.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-600">
          <ShieldCheckIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>Fokus pada bimbingan praktik mandiri, bukan layanan joki atau pembuatan aplikasi jadi.</span>
        </div>
      </div>
    </section>
  );
}
