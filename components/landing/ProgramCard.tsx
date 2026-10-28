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

  // Icon according to slug
  const ProgramIcon =
    program.slug === 'website'
      ? LaptopIcon
      : program.slug === 'mobile'
      ? SmartphoneIcon
      : LayersIcon;

  // Exact button label as requested in specification
  const buttonLabel =
    program.slug === 'website'
      ? 'Daftar Class Website'
      : program.slug === 'mobile'
      ? 'Daftar Class Aplikasi Mobile'
      : 'Daftar Class Integrasi';

  return (
    <div
      className={`relative rounded-3xl transition-all duration-200 flex flex-col justify-between ${
        isIntegrasi
          ? 'border-2 border-indigo-500 bg-white shadow-xl shadow-indigo-100 ring-4 ring-indigo-500/10'
          : 'border border-slate-200/90 bg-white shadow-sm hover:shadow-md hover:border-slate-300'
      }`}
    >
      {/* Featured Header Pill for Integrasi or Popular Badge */}
      {program.popularBadge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge
            variant={isIntegrasi ? 'featured' : 'secondary'}
            className="text-[11px] font-bold tracking-wide uppercase px-3 py-1"
          >
            {isIntegrasi && <SparklesIcon className="w-3.5 h-3.5 mr-1" />}
            {program.popularBadge}
          </Badge>
        </div>
      )}

      {/* Card Content Top */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Title & Icon Header */}
        <div className="flex items-start justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isIntegrasi
                    ? 'bg-indigo-600 text-white'
                    : program.slug === 'website'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-violet-100 text-violet-700'
                }`}
              >
                <ProgramIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Private Mentoring
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {program.name}
            </h3>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="text-xs font-medium text-slate-500">Biaya Investasi Program:</div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {formatRupiah(program.price)}
            </span>
            <span className="text-xs text-slate-500 font-medium">/ 5 sesi privat</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Nominal pasti dari sistem & siap bayar via QRIS</span>
          </div>
        </div>

        {/* Description & Target */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {program.description}
          </p>
          <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200/60 text-xs text-slate-700">
            <span className="font-semibold text-slate-900 block mb-0.5">Cocok untuk:</span>
            {program.targetAudience}
          </div>
        </div>

        {/* Core Specs (5 Meetings, Flexible Schedule, Gemini Pro) */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
            <ClockIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>{program.durationLabel}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
            <CalendarIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>{program.scheduleLabel}</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-indigo-900 font-semibold bg-indigo-50/80 p-2 rounded-lg border border-indigo-200/60">
            <SparklesIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span>{program.bonusFacility}</span>
          </div>
        </div>

        {/* Curriculum / Topics */}
        <div className="space-y-2.5 pt-2">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Gambaran Materi & Pendampingan:
          </h4>
          <ul className="space-y-2">
            {program.curriculum.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckIcon className="w-2.5 h-2.5" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Card Action Bottom */}
      <div className="p-6 sm:p-8 pt-0">
        <Link
          href={`/daftar?program=${program.slug}`}
          className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold transition-all ${
            isIntegrasi
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/30 hover:shadow-lg'
              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
          }`}
        >
          <span>{buttonLabel}</span>
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
        <p className="text-[11px] text-center text-slate-400 mt-2">
          *Pendaftaran instan dengan QRIS resmi & verifikasi WhatsApp
        </p>
      </div>
    </div>
  );
}
