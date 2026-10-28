'use client';

import React, { useState } from 'react';
import { Program, formatRupiah } from '@/lib/programs';
import { TransactionRecord } from '@/types/registration';
import {
  CopyIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';
import { QRIS_MERCHANT_INFO } from '@/lib/qris';

interface QRISPaymentPanelProps {
  program: Program;
  transaction: TransactionRecord;
  onProceedToWhatsApp: () => void;
  onBack: () => void;
}

export function QRISPaymentPanel({
  program,
  transaction,
  onProceedToWhatsApp,
  onBack
}: QRISPaymentPanelProps) {
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const qrImageSrc = transaction.qrisDataUrl || transaction.qrisUrl;

  const handleCopyAmount = async () => {
    try {
      await navigator.clipboard.writeText(transaction.amount.toString());
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyRef = async () => {
    try {
      await navigator.clipboard.writeText(transaction.reference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadQr = () => {
    if (!qrImageSrc) return;
    const a = document.createElement('a');
    a.href = qrImageSrc;
    a.download = `QRIS-${transaction.reference}-${transaction.amount}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block">
            Metode Pembayaran Resmi — {program.name}
          </span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Pindai QRIS Dinamis Otomatis Nominal
          </h3>
        </div>
        <Badge variant="featured" className="text-xs font-semibold self-start sm:self-auto">
          <SparklesIcon className="w-3.5 h-3.5 mr-1" />
          QRIS Dinamis
        </Badge>
      </div>

      {/* Main QRIS and Instructions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* QR Code Container */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="p-4 bg-white border-2 border-slate-300 rounded-3xl shadow-sm text-center max-w-[280px] w-full">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-2 px-1">
              <span>QRIS DINAMIS</span>
              <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Auto Amount
              </span>
            </div>

            {/* Dynamic QR Code Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 p-2 flex items-center justify-center">
              {/* Using standard img for data URLs to avoid next/image loader restrictions */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrImageSrc}
                alt={`QRIS Dinamis ${formatRupiah(transaction.amount)}`}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-3 space-y-1.5 text-center">
              <div className="text-xs font-bold text-slate-900">
                {QRIS_MERCHANT_INFO.name}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                NMID: {QRIS_MERCHANT_INFO.nationalQrisId}
              </div>
              <button
                type="button"
                onClick={handleDownloadQr}
                className="mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors w-full"
              >
                <span>Unduh Gambar QR</span>
              </button>
            </div>
          </div>
        </div>

        {/* Nominal & Reference Guidance */}
        <div className="md:col-span-7 space-y-4">
          {/* Nominal Box */}
          <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/90">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-indigo-900">
                Nominal Tagihan Terkunci Otomatis:
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                ✓ Terisi Otomatis
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 mt-1.5">
              <div className="text-2xl sm:text-3xl font-black text-indigo-950 tracking-tight">
                {formatRupiah(transaction.amount)}
              </div>
              <button
                type="button"
                onClick={handleCopyAmount}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-white border border-indigo-200 hover:bg-indigo-100/60 transition-colors shadow-xs"
                title="Salin nominal transfer"
              >
                {copiedAmount ? <CheckIcon className="w-3.5 h-3.5 text-emerald-600" /> : <CopyIcon className="w-3.5 h-3.5" />}
                <span>{copiedAmount ? 'Tersalin' : 'Salin Angka'}</span>
              </button>
            </div>
            <p className="text-[11px] text-indigo-800/90 mt-2 font-medium leading-relaxed">
              *QRIS di samping telah dikonversi secara dinamis dari QRIS resmi pengajar. Saat dipindai, nominal <strong>{formatRupiah(transaction.amount)}</strong> akan langsung otomatis muncul di aplikasi pembayaranmu.
            </p>
          </div>

          {/* Reference Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
            <div className="text-xs">
              <span className="text-slate-500 block text-[11px]">Nomor Referensi Transaksi:</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{transaction.reference}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyRef}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors"
            >
              {copiedRef ? <CheckIcon className="w-3.5 h-3.5 text-emerald-600" /> : <CopyIcon className="w-3.5 h-3.5" />}
              <span>{copiedRef ? 'Tersalin' : 'Salin Ref'}</span>
            </button>
          </div>

          {/* Supported Apps Note */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <div className="font-bold text-slate-800">
              Mendukung Semua Aplikasi Pembayaran Nasional:
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              BCA Mobile, Livin&apos; by Mandiri, BRImo, BNI Mobile, GoPay, OVO, Dana, ShopeePay, LinkAja, serta semua mobile banking/e-wallet berlogo QRIS.
            </p>
          </div>

          {/* Validity Notice */}
          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <ClockIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>Referensi aktif dan berlaku hingga 24 jam ke depan.</span>
          </div>
        </div>
      </div>

      {/* Action Buttons to WhatsApp Step */}
      <div className="pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Ganti Program</span>
        </button>

        <button
          type="button"
          onClick={onProceedToWhatsApp}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition-all"
        >
          <span>Sudah Membayar? Lanjut Konfirmasi WhatsApp</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <ShieldCheckIcon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        <span>Sistem tidak mengubah status menjadi lunas secara otomatis tanpa verifikasi bukti bayar oleh pengajar.</span>
      </div>
    </div>
  );
}
