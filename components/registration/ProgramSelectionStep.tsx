'use client';

import React, { useState } from 'react';
import { ALL_PROGRAMS, ProgramSlug, formatRupiah } from '@/lib/programs';
import {
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  LaptopIcon,
  SmartphoneIcon,
  LayersIcon
} from '@/components/ui/Icons';

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
    <div className="max-w-4xl mx-auto space-y-6 text-white">
      {/* Participant Header */}
      <div className="flex items-center justify-between p-3.5 bg-zinc-900/60 border border-white/10 rounded-2xl backdrop-blur-xl">
        <div className="text-xs">
          <span className="text-zinc-400">Peserta: </span>
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
          Pilih fokus bimbingan privat yang kamu butuhkan.
        </p>
      </div>

      {/* 3 Interactive Program Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ALL_PROGRAMS.map((prog) => {
          const isSelected = selectedSlug === prog.slug;

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
              className={`relative rounded-3xl cursor-pointer p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between border text-left backdrop-blur-xl ${
                isSelected
                  ? 'border-white bg-white/10 shadow-xl shadow-white/10 ring-1 ring-white/30'
                  : 'border-white/10 bg-zinc-900/40 hover:border-white/20 hover:bg-zinc-900/60'
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
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-white text-black font-bold'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      <ProgIcon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {prog.name}
                    </h3>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border ${
                      isSelected
                        ? 'bg-white border-white text-black'
                        : 'border-white/20 bg-transparent text-transparent'
                    }`}
                  >
                    {isSelected && <CheckIcon className="w-3 h-3 text-black" />}
                  </div>
                </div>

                <div>
                  <div className="text-xl font-black text-white tracking-tight font-mono">
                    {formatRupiah(prog.price)}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    5 Sesi Privat • 1-on-1
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10 text-[11px] text-zinc-400 space-y-1">
                <div>• Jadwal fleksibel</div>
                <div>• Fasilitas Gemini Pro 3 Bulan</div>
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
