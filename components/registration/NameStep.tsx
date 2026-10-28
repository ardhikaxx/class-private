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
    <div className="max-w-xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="text-center space-y-2 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto mb-3">
          <UserIcon className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Masukkan Nama Lengkap Peserta
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
          Nama ini akan dicantumkan pada konfirmasi WhatsApp dan sesi bimbingan bersama pengajar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="participantName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            Nama Lengkap <span className="text-rose-500">*</span>
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
              className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all ${
                error
                  ? 'border-rose-400 bg-rose-50/20 focus:ring-rose-500'
                  : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-500'
              }`}
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none">
              {name.trim().length}/60
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-rose-600">
              <AlertCircleIcon className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <p className="text-[11px] text-slate-400 mt-2">
            Minimal 3 karakter. Hanya meminta nama lengkap untuk efisiensi pendaftaran tanpa meminta data pribadi sensitif.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <span>Lanjutkan ke Pemilihan Program</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
        <ShieldCheckIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        <span>Data aman dan hanya digunakan untuk keperluan komunikasi kelas privat</span>
      </div>
    </div>
  );
}
