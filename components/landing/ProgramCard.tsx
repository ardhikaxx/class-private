import React from 'react';
import Link from 'next/link';
import { Program, formatRupiah } from '@/lib/programs';
import {
  CheckIcon,
  SparklesIcon,
  CalendarIcon,
  ClockIcon,
  LaptopIcon,
  SmartphoneIcon,
  LayersIcon,
  ArrowRightIcon
} from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const isIntegrasi = program.slug === 'integrasi';

  const ProgramIcon =
    program.slug === 'website'
      ? LaptopIcon
      : program.slug === 'mobile'
      ? SmartphoneIcon
      : LayersIcon;

  const buttonLabel =
    program.slug === 'website'
      ? 'Daftar Class Website'
      : program.slug === 'mobile'
      ? 'Daftar Class Aplikasi Mobile'
      : 'Daftar Class Integrasi';

  return (
    <div
      className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
        isIntegrasi
          ? 'border border-white/35 bg-zinc-900/80 backdrop-blur-2xl shadow-2xl shadow-black ring-1 ring-white/20'
          : 'border border-white/10 bg-zinc-900/40 backdrop-blur-xl hover:border-white/25 shadow-xl'
      }`}
    >
      {program.popularBadge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge
            variant={isIntegrasi ? 'primary' : 'secondary'}
            className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 border-white/20"
          >
            {isIntegrasi && <SparklesIcon className="w-3 h-3 mr-1" />}
            {program.popularBadge}
          </Badge>
        </div>
      )}

      {/* Top Details */}
      <div className="p-6 sm:p-7 space-y-4">
        <div className="flex items-center gap-2.5 pt-1">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
              isIntegrasi
                ? 'bg-white text-black font-bold shadow-md shadow-white/20'
                : 'bg-white/10 text-white border border-white/15'
            }`}
          >
            <ProgramIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {program.name}
            </h3>
            <span className="text-[11px] text-zinc-400 font-mono block">5 Sesi • 1-on-1 Privat</span>
          </div>
        </div>

        {/* Pricing in Glass */}
        <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-baseline justify-between backdrop-blur-md">
          <div>
            <span className="text-2xl font-black text-white tracking-tight font-mono">
              {formatRupiah(program.price)}
            </span>
            <span className="text-xs text-zinc-400 ml-1">/ 5 sesi</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-white bg-white/15 px-2 py-0.5 rounded-md border border-white/20">
            QRIS DINAMIS
          </span>
        </div>

        {/* Short description */}
        <p className="text-xs text-zinc-400 leading-relaxed">
          {program.description}
        </p>

        {/* Key Features */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <span className="text-[11px] font-mono font-bold text-zinc-300 uppercase tracking-wider block">
            Materi & Praktik:
          </span>
          <ul className="space-y-1.5">
            {program.curriculum.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
                <CheckIcon className="w-3.5 h-3.5 text-white flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Specs */}
        <div className="pt-2 border-t border-white/10 space-y-1 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5 text-zinc-200 flex-shrink-0" />
            <span>5 sesi privat 1-on-1 intensif</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-zinc-200 flex-shrink-0" />
            <span>Jadwal fleksibel disepakati bersama</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-white bg-white/5 p-2 rounded-xl border border-white/10">
            <SparklesIcon className="w-3.5 h-3.5 text-white flex-shrink-0" />
            <span>Bonus akses Gemini Pro 3 bulan</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="p-6 sm:p-7 pt-0">
        <Link
          href={`/daftar?program=${program.slug}`}
          className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            isIntegrasi
              ? 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/15'
              : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md'
          }`}
        >
          <span>{buttonLabel}</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
