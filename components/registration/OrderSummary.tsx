import React from 'react';
import { Program, formatRupiah } from '@/lib/programs';
import { TransactionRecord } from '@/types/registration';
import {
  UserIcon,
  CreditCardIcon,
  ClockIcon,
  CalendarIcon,
  SparklesIcon,
  ShieldCheckIcon
} from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';

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
      className={`bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-6 transition-all ${
        compact ? 'border-white/20' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase block">
            Detail Pesanan
          </span>
          <h3 className="text-lg font-black text-white tracking-tight mt-0.5">
            Ringkasan Pendaftaran
          </h3>
        </div>
        <Badge variant="default" className="text-xs font-medium">
          1-on-1 Privat
        </Badge>
      </div>

      {/* Details List */}
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Participant Name */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-zinc-400">
            <UserIcon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <span>Nama Peserta</span>
          </div>
          <div className="text-right">
            <span className="font-semibold text-white">{participantName}</span>
            {onEditName && (
              <button
                type="button"
                onClick={onEditName}
                className="block text-[11px] text-zinc-400 hover:text-white underline decoration-white/30 transition-colors ml-auto mt-0.5"
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
            <span>Program Kelas</span>
          </div>
          <div className="text-right">
            <span className="font-semibold text-white">{program.name}</span>
            {onEditProgram && (
              <button
                type="button"
                onClick={onEditProgram}
                className="block text-[11px] text-zinc-400 hover:text-white underline decoration-white/30 transition-colors ml-auto mt-0.5"
              >
                Ganti Program
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
          <span className="font-medium text-zinc-200">5 Kali Pertemuan</span>
        </div>

        {/* Schedule */}
        <div className="flex items-center justify-between text-zinc-400">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <span>Jadwal Kelas</span>
          </div>
          <span className="font-medium text-zinc-200 text-right">
            Fleksibel (1-on-1 Disepakati Bersama)
          </span>
        </div>

        {/* Bonus Facility */}
        <div className="flex items-center justify-between bg-white/[0.04] p-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-2 text-zinc-300">
            <SparklesIcon className="w-4 h-4 text-white flex-shrink-0" />
            <span className="font-medium text-xs">Fasilitas Tambahan</span>
          </div>
          <span className="font-bold text-xs sm:text-sm text-white">
            Gemini Pro 3 Bulan
          </span>
        </div>

        {/* Transaction Reference if available */}
        {transaction && (
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-zinc-400 text-xs font-mono">Kode Referensi:</span>
            <code className="text-xs font-mono font-bold bg-white/10 text-white px-2.5 py-1 rounded-lg border border-white/15">
              {transaction.reference}
            </code>
          </div>
        )}
      </div>

      {/* Total Amount Box */}
      <div className="pt-2 border-t border-white/10">
        <div className="p-4 rounded-2xl bg-white/[0.06] border border-white/15 text-white flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold">
              Total Tagihan Resmi
            </div>
            <div className="text-xs text-zinc-300">Nominal Terkunci Sistem</div>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {formatRupiah(finalPrice)}
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">Bebas Biaya Registrasi</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-zinc-400">
        <ShieldCheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>Harga resmi terverifikasi server. Tidak ada biaya tambahan di luar tagihan di atas.</span>
      </div>
    </div>
  );
}
