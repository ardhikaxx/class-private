import React from 'react';
import { ALL_PROGRAMS } from '@/lib/programs';
import { ProgramCard } from './ProgramCard';
import { ShieldCheckIcon } from '@/components/ui/Icons';

export function ProgramSection() {
  return (
    <section id="program" className="py-16 lg:py-24 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Pilihan Program Kelas
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pilih Jalur Belajar yang Sesuai dengan Targetmu
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Semua program berlangsung selama 5 kali pertemuan privat (1-on-1) dengan jadwal fleksibel yang disepakati bersama. Sudah termasuk fasilitas pendampingan AI resmi Gemini Pro selama 3 bulan.
          </p>
        </div>

        {/* 3 Program Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {ALL_PROGRAMS.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>

        {/* Bottom Note on Pricing Integrity */}
        <div className="mt-12 text-center max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-500 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs">
          <ShieldCheckIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
          <span>
            Harga bersifat final & terpusat. Pembayaran diproses dengan nominal tepat tanpa biaya tersembunyi.
          </span>
        </div>
      </div>
    </section>
  );
}
