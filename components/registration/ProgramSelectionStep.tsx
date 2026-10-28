'use client';

import React, { useState } from 'react';
import { ALL_PROGRAMS, ProgramSlug, formatRupiah } from '@/lib/programs';
import {
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ClockIcon,
  CalendarIcon,
  SparklesIcon,
  WebBrowserIcon,
  MobileDeviceIcon,
  IntegrationIcon
} from '@/components/ui/Icons';

interface ProgramSelectionStepProps {
  participantName: string;
  initialSlug: ProgramSlug | null;
  onNext: (selectedSlug: ProgramSlug) => void;
  onBack: () => void;
}

function ProgramCardIcon({ slug, className = 'w-6 h-6' }: { slug: ProgramSlug; className?: string }) {
  if (slug === 'website') return <WebBrowserIcon className={className} />;
  if (slug === 'mobile') return <MobileDeviceIcon className={className} />;
  return <IntegrationIcon className={className} />;
}

function getProgramSubtitle(slug: ProgramSlug) {
  switch (slug) {
    case 'website':
      return 'Web Frontend, Backend & Database';
    case 'mobile':
      return 'Aplikasi Android & iOS';
    case 'integrasi':
      return 'Web & Mobile Sinkronisasi Data';
  }
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
    <div className="max-w-4xl mx-auto space-y-6 text-white">
      {/* Participant Header */}
      <div className="flex items-center justify-between p-3.5 bg-zinc-900/60 border border-white/10 rounded-2xl backdrop-blur-xl">
        <div className="text-xs">
          <span className="text-zinc-400">Pendaftaran untuk: </span>
          <span className="font-semibold text-white">{participantName}</span>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-mono text-zinc-400 hover:text-white transition-colors underline cursor-pointer"
        >
          Ubah
        </button>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Pilih Program Kelas
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Pilih fokus bimbingan privat 1-on-1 sesuai kebutuhan aplikasimu.
        </p>
      </div>

      {/* 3 Interactive Program Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ALL_PROGRAMS.map((prog) => {
          const isSelected = selectedSlug === prog.slug;
          const subtitle = getProgramSubtitle(prog.slug);

          return (
            <div
              key={prog.slug}
              onClick={() => setSelectedSlug(prog.slug)}
              className={`relative rounded-3xl cursor-pointer p-6 transition-all duration-300 flex flex-col justify-between border text-left backdrop-blur-2xl group ${
                isSelected
                  ? 'border-white bg-white/[0.08] shadow-2xl shadow-white/10 ring-2 ring-white/30 -translate-y-1'
                  : 'border-white/10 bg-zinc-900/40 hover:border-white/25 hover:bg-zinc-900/70 hover:-translate-y-0.5'
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
              <div className="space-y-4">
                {/* Top Row: Custom Icon + Radio Selection Indicator */}
                <div className="flex items-center justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 ${
                      isSelected
                        ? 'bg-white text-zinc-950 shadow-md shadow-white/20'
                        : 'bg-white/10 text-white border border-white/10 group-hover:bg-white/15'
                    }`}
                  >
                    <ProgramCardIcon slug={prog.slug} className="w-6 h-6" />
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all border ${
                      isSelected
                        ? 'bg-white border-white text-zinc-950 shadow-sm'
                        : 'border-white/20 bg-zinc-900/50 text-transparent'
                    }`}
                  >
                    {isSelected && <CheckIcon className="w-3.5 h-3.5 text-zinc-950" />}
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                    {prog.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                    {subtitle}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-1 border-t border-white/10">
                  <div className="text-2xl font-black text-white tracking-tight font-mono">
                    {formatRupiah(prog.price)}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    5 Sesi Privat • 1-on-1
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {prog.description}
                </p>

                {/* Feature highlights */}
                <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span>5 sesi privat tatap muka online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span>Jadwal fleksibel (disepakati)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <SparklesIcon className="w-3.5 h-3.5 text-white flex-shrink-0" />
                    <span>Gemini Pro 3 Bulan</span>
                  </div>
                </div>
              </div>

              {/* Bottom selection state */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                {isSelected ? (
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                    Terpilih
                  </span>
                ) : (
                  <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    Pilih Kelas →
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-400 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4 text-zinc-400" />
          <span>Kembali</span>
        </button>

        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedSlug}
          className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
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
