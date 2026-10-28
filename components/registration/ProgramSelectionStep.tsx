'use client';

import React, { useState } from 'react';
import { ALL_PROGRAMS, ProgramSlug, formatRupiah } from '@/lib/programs';
import {
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  ClockIcon,
  CalendarIcon,
  LaptopIcon,
  SmartphoneIcon,
  LayersIcon,
  UserIcon
} from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';

interface ProgramSelectionStepProps {
  participantName: string;
  initialSlug: ProgramSlug | null;
  onNext: (selectedSlug: ProgramSlug) => void;
  onBack: () => void;
}

export function ProgramSelectionStep({
  participantName,
  initialSlug,
  onNext,
  onBack
}: ProgramSelectionStepProps) {
  const [selectedSlug, setSelectedSlug] = useState<ProgramSlug | null>(initialSlug);

  const handleContinue = () => {
    if (selectedSlug) {
      onNext(selectedSlug);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Participant Header Pill */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white border border-slate-200/90 rounded-2xl shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0">
            <UserIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Pendaftaran Atas Nama:</span>
            <span className="text-sm font-bold text-slate-900 block">{participantName}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Ubah Nama
        </button>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Pilih Salah Satu Program Mentoring
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
          Pilih program yang paling sesuai dengan ide proyekmu. Harga terpusat resmi dan sudah mencakup 5 sesi privat & Gemini Pro 3 bulan.
        </p>
      </div>

      {/* 3 Interactive Program Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ALL_PROGRAMS.map((prog) => {
          const isSelected = selectedSlug === prog.slug;
          const isIntegrasi = prog.slug === 'integrasi';

          const ProgIcon =
            prog.slug === 'website'
              ? LaptopIcon
              : prog.slug === 'mobile'
              ? SmartphoneIcon
              : LayersIcon;

          return (
            <div
              key={prog.slug}
              onClick={() => setSelectedSlug(prog.slug)}
              className={`relative rounded-2xl cursor-pointer p-6 transition-all duration-200 flex flex-col justify-between border-2 text-left ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/40 shadow-md ring-2 ring-indigo-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  setSelectedSlug(prog.slug);
                }
              }}
            >
              {/* Badge for Popular or Integrasi */}
              {prog.popularBadge && (
                <div className="mb-3">
                  <Badge
                    variant={isIntegrasi ? 'featured' : 'secondary'}
                    className="text-[10px] font-bold uppercase tracking-wider py-0.5 px-2.5"
                  >
                    {isIntegrasi && <SparklesIcon className="w-3 h-3 mr-1" />}
                    {prog.popularBadge}
                  </Badge>
                </div>
              )}

              {/* Title, Icon, Price */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <ProgIcon className="w-4 h-4" />
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                      {prog.name}
                    </h3>
                  </div>

                  {/* Radio Checkmark Circle */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors border ${
                      isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckIcon className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* Price Display */}
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">
                    {formatRupiah(prog.price)}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Total biaya untuk 5 kali pertemuan
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {prog.description}
                </p>

                {/* Specs List */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span>5 sesi privat 1-on-1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span>Jadwal fleksibel (disepakati)</span>
                  </div>
                  <div className="flex items-center gap-2 text-indigo-900 font-semibold">
                    <SparklesIcon className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span>Bonus Gemini Pro 3 bulan</span>
                  </div>
                </div>
              </div>

              {/* Bottom selection feedback */}
              <div className="mt-5 pt-3 border-t border-slate-100 text-center">
                <span
                  className={`text-xs font-bold ${
                    isSelected ? 'text-indigo-700' : 'text-slate-400'
                  }`}
                >
                  {isSelected ? '✓ Program Dipilih' : 'Klik untuk Memilih'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedSlug}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all ${
            selectedSlug
              ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 cursor-pointer'
              : 'bg-slate-300 cursor-not-allowed opacity-75'
          }`}
        >
          <span>Lanjut ke Pembayaran QRIS</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
