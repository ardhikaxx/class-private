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
      className={`relative rounded-3xl transition-all flex flex-col justify-between ${
        isIntegrasi
          ? 'border-2 border-indigo-500 bg-white shadow-xl shadow-indigo-100 ring-4 ring-indigo-500/10'
          : 'border border-slate-200 bg-white shadow-sm hover:border-slate-300'
      }`}
    >
      {program.popularBadge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge
            variant={isIntegrasi ? 'featured' : 'secondary'}
            className="text-[10px] font-bold uppercase tracking-wider px-3 py-0.5"
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
                ? 'bg-indigo-600 text-white'
                : program.slug === 'website'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-violet-100 text-violet-700'
            }`}
          >
            <ProgramIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              {program.name}
            </h3>
            <span className="text-[11px] text-slate-500 block">5 Pertemuan • 1-on-1</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">
              {formatRupiah(program.price)}
            </span>
            <span className="text-xs text-slate-500 ml-1">/ total 5 sesi</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
            QRIS Resmi
          </span>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-600 leading-relaxed">
          {program.description}
        </p>

        {/* Key Features */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block">
            Materi & Praktik:
          </span>
          <ul className="space-y-1.5">
            {program.curriculum.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                <CheckIcon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Specs */}
        <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-700">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
            <span>5 sesi privat 1-on-1 intensif</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
            <span>Jadwal fleksibel disepakati bersama</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-indigo-900 bg-indigo-50/70 p-1.5 rounded-lg">
            <SparklesIcon className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
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
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <span>{buttonLabel}</span>
          <ArrowRightIcon className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
