import React from 'react';
import { Program, formatRupiah } from '@/lib/programs';
import { TransactionRecord } from '@/types/registration';
import {
  UserIcon,
  CreditCardIcon,
  ClockIcon,
  CalendarIcon,
  SparklesIcon
} from '@/components/ui/Icons';

interface OrderSummaryProps {
  participantName: string;
  program: Program;
  transaction?: TransactionRecord | null;
  onEditProgram?: () => void;
  onEditName?: () => void;
  compact?: boolean;
}

export function OrderSummary({
  participantName,
  program,
  transaction,
  onEditProgram,
  onEditName,
  compact = false
}: OrderSummaryProps) {
  const finalPrice = transaction ? transaction.amount : program.price;

  return (
    <div
      className={`bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 transition-all ${
        compact ? 'border-white/20' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Ringkasan Pesanan
          </h3>
          <span className="text-xs text-zinc-400 font-mono">1-on-1 Privat</span>
        </div>
      </div>

      {/* Details List */}
      <div className="space-y-3.5 text-xs sm:text-sm">
        {/* Participant Name */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <UserIcon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <span>Peserta</span>
          </div>
          <div className="text-right">
            <span className="font-semibold text-white">{participantName}</span>
            {onEditName && (
              <button
                type="button"
                onClick={onEditName}
                className="block text-[11px] text-zinc-400 hover:text-white underline decoration-white/30 transition-colors ml-auto mt-0.5 cursor-pointer"
              >
                Ubah
              </button>
            )}
          </div>
        </div>

        {/* Selected Program */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <CreditCardIcon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <span>Program</span>
          </div>
          <div className="text-right">
            <span className="font-semibold text-white">{program.name}</span>
            {onEditProgram && (
              <button
                type="button"
                onClick={onEditProgram}
                className="block text-[11px] text-zinc-400 hover:text-white underline decoration-white/30 transition-colors ml-auto mt-0.5 cursor-pointer"
              >
                Ganti
              </button>
            )}
          </div>
        </div>

        {/* Sessions Count */}
        <div className="flex items-center justify-between text-zinc-400">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <span>Jumlah Sesi</span>
          </div>
          <span className="font-medium text-zinc-200">5 Pertemuan</span>
        </div>

        {/* Schedule */}
        <div className="flex items-center justify-between text-zinc-400">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <span>Jadwal</span>
          </div>
          <span className="font-medium text-zinc-200">Fleksibel</span>
        </div>

        {/* Bonus Facility */}
        <div className="flex items-center justify-between bg-white/[0.04] p-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-zinc-300">
            <SparklesIcon className="w-4 h-4 text-white flex-shrink-0" />
            <span className="text-xs">Fasilitas</span>
          </div>
          <span className="font-semibold text-xs sm:text-sm text-white">
            Gemini Pro 3 Bulan
          </span>
        </div>

        {/* Transaction Reference if available */}
        {transaction && (
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-zinc-400 text-xs font-mono">Kode Ref:</span>
            <code className="text-xs font-mono font-bold bg-white/10 text-white px-2 py-0.5 rounded-lg border border-white/15">
              {transaction.reference}
            </code>
          </div>
        )}
      </div>

      {/* Total Amount Box */}
      <div className="pt-2 border-t border-white/10">
        <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/15 text-white flex items-center justify-between">
          <div className="text-xs text-zinc-400 font-mono">Total Tagihan</div>
          <div className="text-2xl font-black tracking-tight text-white font-mono">
            {formatRupiah(finalPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}
