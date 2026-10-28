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
    <div className="max-w-4xl mx-auto space-y-8 text-white">
      {/* Participant Header Pill in Glass */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-zinc-900/60 border border-white/15 rounded-2xl backdrop-blur-xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center flex-shrink-0 font-bold">
            <UserIcon className="w-4 h-4 text-black" />
          </div>
          <div>
            <span className="text-xs text-zinc-400 font-mono">Pendaftaran Atas Nama:</span>
            <span className="text-sm font-bold text-white block">{participantName}</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-mono font-bold text-zinc-300 hover:text-white transition-colors underline"
        >
          Ubah Nama
        </button>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Pilih Salah Satu Program Mentoring
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Pilih program yang paling sesuai dengan ide proyekmu. Harga resmi terpusat mencakup 5 sesi privat & Gemini Pro 3 bulan.
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
              className={`relative rounded-3xl cursor-pointer p-6 transition-all duration-300 flex flex-col justify-between border-2 text-left backdrop-blur-xl ${
                isSelected
                  ? 'border-white bg-white/10 shadow-2xl shadow-white/10 ring-2 ring-white/20'
                  : 'border-white/10 bg-zinc-900/40 hover:border-white/25 hover:bg-zinc-900/60 shadow-xl'
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
                    variant={isIntegrasi ? 'primary' : 'secondary'}
                    className="text-[10px] font-mono font-bold uppercase tracking-wider py-0.5 px-2.5"
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
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                        isSelected
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <ProgIcon className="w-4 h-4" />
                    </div>
                    <h3 className="font-extrabold text-base text-white leading-snug">
                      {prog.name}
                    </h3>
                  </div>

                  {/* Radio Checkmark Circle */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors border ${
                      isSelected
                        ? 'bg-white border-white text-black shadow-md shadow-white/30'
                        : 'border-white/20 bg-zinc-950 text-transparent'
                    }`}
                  >
                    {isSelected && <CheckIcon className="w-3.5 h-3.5 text-black" />}
                  </div>
                </div>

                {/* Price Display */}
                <div>
                  <div className="text-2xl font-black text-white tracking-tight font-mono">
                    {formatRupiah(prog.price)}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Total biaya untuk 5 kali pertemuan
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {prog.description}
                </p>

                {/* Specs List */}
                <div className="pt-3 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    <span>5 sesi privat 1-on-1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    <span>Jadwal fleksibel (disepakati)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-semibold bg-white/5 p-1.5 rounded-lg border border-white/10">
                    <SparklesIcon className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    <span>Bonus Gemini Pro 3 bulan</span>
                  </div>
                </div>
              </div>

              {/* Bottom selection feedback */}
              <div className="mt-5 pt-3 border-t border-white/10 text-center">
                <span
                  className={`text-xs font-mono font-bold ${
                    isSelected ? 'text-white' : 'text-zinc-500'
                  }`}
                >
                  {isSelected ? '✓ PROGRAM DIPILIH' : 'KLIK UNTUK MEMILIH'}
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
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 bg-white/5 border border-white/15 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
        >
          <ArrowLeftIcon className="w-4 h-4 text-zinc-300" />
          <span>Kembali</span>
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedSlug}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
            selectedSlug
              ? 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/15 cursor-pointer'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5'
          }`}
        >
          <span>Lanjut ke Pembayaran QRIS</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
