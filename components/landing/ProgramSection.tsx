import React from 'react';
import { ALL_PROGRAMS } from '@/lib/programs';
import { ProgramCard } from './ProgramCard';

export function ProgramSection() {
  return (
    <section id="program" className="py-14 lg:py-20 bg-zinc-950 text-white border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
            PILIHAN KELAS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Pilih Sesuai Kebutuhan Aplikasimu
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
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
