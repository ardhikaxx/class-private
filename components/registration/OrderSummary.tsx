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
    <div className={`bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6 ${compact ? 'border-indigo-100' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            Detail Pesanan
          </span>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Ringkasan Pendaftaran
          </h3>
        </div>
        <Badge variant="primary" className="text-xs font-semibold">
          1-on-1 Privat
        </Badge>
      </div>

      {/* Details List */}
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Participant Name */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-500">
            <UserIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>Nama Peserta</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-slate-900">{participantName}</span>
            {onEditName && (
              <button
                type="button"
                onClick={onEditName}
                className="block text-[11px] text-indigo-600 hover:text-indigo-800 font-medium ml-auto"
              >
                Ubah
              </button>
            )}
          </div>
        </div>

        {/* Selected Program */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-500">
            <CreditCardIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>Program Kelas</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-slate-900">{program.name}</span>
            {onEditProgram && (
              <button
                type="button"
                onClick={onEditProgram}
                className="block text-[11px] text-indigo-600 hover:text-indigo-800 font-medium ml-auto"
              >
                Ganti Program
              </button>
            )}
          </div>
        </div>

        {/* Sessions Count */}
        <div className="flex items-center justify-between text-slate-500">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>Jumlah Sesi</span>
          </div>
          <span className="font-semibold text-slate-800">5 Kali Pertemuan</span>
        </div>

        {/* Schedule */}
        <div className="flex items-center justify-between text-slate-500">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>Jadwal Kelas</span>
          </div>
          <span className="font-semibold text-slate-800 text-right">
            Fleksibel (Disepakati Bersama)
          </span>
        </div>

        {/* Bonus Facility */}
        <div className="flex items-center justify-between text-indigo-900 bg-indigo-50/70 p-2.5 rounded-xl border border-indigo-100">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <span className="font-semibold">Fasilitas Tambahan</span>
          </div>
          <span className="font-bold text-xs sm:text-sm text-indigo-700">
            Gemini Pro 3 Bulan
          </span>
        </div>

        {/* Transaction Reference if available */}
        {transaction && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-slate-500 text-xs">Reference Transaksi:</span>
            <code className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
              {transaction.reference}
            </code>
          </div>
        )}
      </div>

      {/* Total Amount Box */}
      <div className="pt-4 border-t border-slate-100">
        <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Total Tagihan Resmi
            </div>
            <div className="text-xs text-indigo-300">Biaya 1-on-1 Termasuk Semua Fasilitas</div>
          </div>
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {formatRupiah(finalPrice)}
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">Bebas Biaya Registrasi</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[11px] text-slate-400">
        <ShieldCheckIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        <span>Harga berasal dari konfigurasi server resmi. Tidak ada biaya tambahan di luar tagihan di atas.</span>
      </div>
    </div>
  );
}
