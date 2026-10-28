import React from 'react';
import { ALL_PROGRAMS } from '@/lib/programs';
import { ProgramCard } from './ProgramCard';

export function ProgramSection() {
  return (
    <section id="program" className="py-12 lg:py-20 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Pilihan Program Kelas
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pilih Sesuai Kebutuhan Aplikasimu
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Semua paket mencakup 5 sesi privat 1-on-1, jadwal fleksibel, dan bonus Gemini Pro 3 bulan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {ALL_PROGRAMS.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
