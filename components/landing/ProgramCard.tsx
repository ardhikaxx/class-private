import React from 'react';
import Link from 'next/link';
import { Program, formatRupiah, ProgramSlug } from '@/lib/programs';
import {
  CheckIcon,
  WebBrowserIcon,
  MobileDeviceIcon,
  IntegrationIcon,
  ArrowRightIcon
} from '@/components/ui/Icons';

interface ProgramCardProps {
  program: Program;
}

function ProgramIcon({ slug, className = 'w-5 h-5' }: { slug: ProgramSlug; className?: string }) {
  if (slug === 'website') return <WebBrowserIcon className={className} />;
  if (slug === 'mobile') return <MobileDeviceIcon className={className} />;
  return <IntegrationIcon className={className} />;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const isIntegrasi = program.slug === 'integrasi';

  return (
    <div
      className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
        isIntegrasi
          ? 'border border-white/25 bg-zinc-900/80 backdrop-blur-2xl shadow-2xl ring-1 ring-white/15'
          : 'border border-white/10 bg-zinc-900/40 backdrop-blur-xl hover:border-white/20 shadow-xl'
      }`}
    >
      {/* Details */}
      <div className="p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isIntegrasi
                ? 'bg-white text-black font-bold shadow-md shadow-white/20'
                : 'bg-white/10 text-white border border-white/10'
            }`}
          >
            <ProgramIcon slug={program.slug} className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {program.name}
            </h3>
            <span className="text-[11px] text-zinc-400 font-mono">5 Sesi Privat • 1-on-1</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="pt-1">
          <span className="text-2xl font-black text-white tracking-tight font-mono">
            {formatRupiah(program.price)}
          </span>
          <span className="text-xs text-zinc-400 ml-1.5 font-mono">/ paket</span>
        </div>

        {/* Short description */}
        <p className="text-xs text-zinc-400 leading-relaxed">
          {program.description}
        </p>

        {/* Key Features */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
            Materi Utama:
          </span>
          <ul className="space-y-1.5">
            {program.curriculum.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                <CheckIcon className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t border-white/10 text-[11px] text-zinc-400 space-y-1 font-mono">
          <div>• Jadwal fleksibel disepakati bersama</div>
          <div>• Bonus Gemini Pro 3 Bulan</div>
        </div>
      </div>

      {/* Button */}
      <div className="p-6 sm:p-7 pt-0">
        <Link
          href={`/daftar?program=${program.slug}`}
          className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            isIntegrasi
              ? 'bg-white text-black hover:bg-zinc-200'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <span>Pilih Program</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
