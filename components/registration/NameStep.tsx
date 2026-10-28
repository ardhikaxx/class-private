'use client';

import React, { useState } from 'react';
import { UserIcon, ArrowRightIcon, AlertCircleIcon, ShieldCheckIcon } from '@/components/ui/Icons';
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
      <div className="text-center space-y-2 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center mx-auto mb-3 shadow-lg shadow-white/10 font-bold">
          <UserIcon className="w-6 h-6 text-black" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Masukkan Nama Lengkap Peserta
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md mx-auto">
          Nama ini akan dicantumkan pada konfirmasi WhatsApp dan sesi bimbingan bersama pengajar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="participantName" className="block text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider mb-2">
            NAMA LENGKAP <span className="text-white">*</span>
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
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-500 pointer-events-none">
              {name.trim().length}/60
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-rose-400">
              <AlertCircleIcon className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <p className="text-[11px] text-zinc-500 mt-2">
            Minimal 3 karakter. Hanya meminta nama lengkap untuk efisiensi tanpa meminta data pribadi sensitif.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-xs sm:text-sm font-extrabold text-black bg-white hover:bg-zinc-200 shadow-lg shadow-white/10 transition-all cursor-pointer"
          >
            <span>Lanjutkan ke Pemilihan Program</span>
            <ArrowRightIcon className="w-4 h-4 text-black" />
          </button>
        </div>
      </form>

      <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-zinc-500 font-mono">
        <ShieldCheckIcon className="w-4 h-4 text-white flex-shrink-0" />
        <span>Data aman untuk keperluan bimbingan 1-on-1</span>
      </div>
    </div>
  );
}
