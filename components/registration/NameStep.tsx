'use client';

import React, { useState } from 'react';
import { ArrowRightIcon, AlertCircleIcon } from '@/components/ui/Icons';
import { validateParticipantName } from '@/lib/transactions';

interface NameStepProps {
  initialName: string;
  onNext: (name: string) => void;
}

export function NameStep({ initialName, onNext }: NameStepProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const validation = validateParticipantName(name);
    if (!validation.isValid) {
      setError(validation.error || 'Nama lengkap wajib diisi.');
      return;
    }

    setError(null);
    onNext(validation.cleanName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (touched) {
      const validation = validateParticipantName(val);
      setError(validation.isValid ? null : validation.error || null);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-zinc-900/60 border border-white/15 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl text-white space-y-6">
      <div className="text-center space-y-1.5 mb-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Terbuka untuk Peserta IT & Non-IT</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Nama Lengkap Peserta
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Masukkan nama untuk dicantumkan pada sesi privat dan konfirmasi.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="participantName" className="block text-xs font-mono font-medium text-zinc-300 uppercase tracking-wider mb-2">
            NAMA LENGKAP
          </label>
          <div className="relative">
            <input
              id="participantName"
              type="text"
              autoComplete="name"
              placeholder="Contoh: Muhammad Ardhika"
              value={name}
              onChange={handleChange}
              onBlur={() => setTouched(true)}
              maxLength={60}
              className={`w-full px-4 py-3.5 rounded-xl border text-sm text-white placeholder:text-zinc-600 bg-white/5 focus:outline-none focus:ring-1 transition-all ${
                error
                  ? 'border-rose-400 focus:ring-rose-400'
                  : 'border-white/20 focus:border-white focus:ring-white'
              }`}
            />
          </div>

          {error && (
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-rose-400">
              <AlertCircleIcon className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="pt-1">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 shadow-lg shadow-white/10 transition-all cursor-pointer"
          >
            <span>Lanjut Pilih Program</span>
            <ArrowRightIcon className="w-4 h-4 text-black" />
          </button>
        </div>
      </form>
    </div>
  );
}
