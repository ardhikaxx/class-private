'use client';

import React, { useState, useEffect } from 'react';
import { Program, formatRupiah } from '@/lib/programs';
import { TransactionRecord } from '@/types/registration';
import {
  CopyIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ClockIcon,
  ShieldCheckIcon,
  SparklesIcon,
  DownloadIcon
} from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';
import {
  QRIS_MERCHANT_INFO,
  generateDynamicQrisPayload,
  generateQrisDataUrl
} from '@/lib/qris';

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
  const [generatedQrUrl, setGeneratedQrUrl] = useState<string>('');

  // Fallback to client-generated QR code if transaction doesn't have one
  useEffect(() => {
    if (transaction.qrisDataUrl) return;

    let isSubscribed = true;
    const payload = transaction.qrisPayload || generateDynamicQrisPayload(transaction.amount);
    generateQrisDataUrl(payload)
      .then((url) => {
        if (isSubscribed) {
          setGeneratedQrUrl(url);
        }
      })
      .catch((err) => {
        console.error('Failed to generate dynamic QR URL:', err);
      });

    return () => {
      isSubscribed = false;
    };
  }, [transaction.qrisDataUrl, transaction.qrisPayload, transaction.amount]);

  const activeQrUrl = transaction.qrisDataUrl || generatedQrUrl;

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
    if (!activeQrUrl) return;
    const a = document.createElement('a');
    a.href = activeQrUrl;
    a.download = `QRIS-${transaction.reference}-${transaction.amount}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase block">
            Metode Pembayaran Resmi — {program.name}
          </span>
          <h3 className="text-xl font-black text-white tracking-tight mt-0.5">
            Pindai QRIS Dinamis Otomatis Nominal
          </h3>
        </div>
        <Badge variant="featured" className="text-xs font-semibold self-start sm:self-auto">
          <SparklesIcon className="w-3.5 h-3.5 mr-1 text-white" />
          QRIS Dinamis Aktif
        </Badge>
      </div>

      {/* Main QRIS and Instructions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* QR Code Container - Pure White Card for Maximum Camera Optical Contrast */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="p-4 bg-white rounded-3xl shadow-2xl text-center max-w-[280px] w-full text-zinc-950 border border-white/20">
            <div className="flex items-center justify-between text-[11px] font-mono font-bold text-zinc-700 uppercase tracking-wider mb-2 px-1">
              <span>QRIS DINAMIS</span>
              <span className="text-[10px] text-zinc-950 font-bold bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-300">
                Auto Amount
              </span>
            </div>

            {/* Dynamic QR Code Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white border border-zinc-200 p-2 flex items-center justify-center">
              {activeQrUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={activeQrUrl}
                  alt={`QRIS Dinamis ${formatRupiah(transaction.amount)}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
                  <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[11px] text-zinc-600 font-medium">Menghasilkan QR Dinamis...</span>
                </div>
              )}
            </div>

            <div className="mt-3 space-y-1.5 text-center">
              <div className="text-xs font-bold text-zinc-950">
                {QRIS_MERCHANT_INFO.name}
              </div>
              <div className="text-[11px] text-zinc-500 font-mono">
                NMID: {QRIS_MERCHANT_INFO.nationalQrisId}
              </div>
              <button
                type="button"
                onClick={handleDownloadQr}
                disabled={!activeQrUrl}
                className="mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-zinc-200 transition-colors w-full disabled:opacity-50"
              >
                <DownloadIcon className="w-3.5 h-3.5" />
                <span>Unduh Gambar QR</span>
              </button>
            </div>
          </div>
        </div>

        {/* Nominal & Reference Guidance */}
        <div className="md:col-span-7 space-y-4">
          {/* Nominal Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/15">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-300">
                Nominal Tagihan Terkunci Otomatis:
              </span>
              <span className="text-[10px] font-bold text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
                ✓ Terisi Otomatis
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 mt-2">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatRupiah(transaction.amount)}
              </div>
              <button
                type="button"
                onClick={handleCopyAmount}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
                title="Salin nominal transfer"
              >
                {copiedAmount ? <CheckIcon className="w-3.5 h-3.5 text-white" /> : <CopyIcon className="w-3.5 h-3.5" />}
                <span>{copiedAmount ? 'Tersalin' : 'Salin Angka'}</span>
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 mt-3 leading-relaxed">
              *QRIS di atas di-generate secara dinamis dari QRIS resmi pengajar. Saat dipindai, nominal <strong className="text-white">{formatRupiah(transaction.amount)}</strong> otomatis terkunci di aplikasi pembayaran Anda.
            </p>
          </div>

          {/* Reference Box */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3">
            <div className="text-xs">
              <span className="text-zinc-400 block text-[11px] font-mono">Kode Referensi:</span>
              <span className="font-mono font-bold text-white text-sm">{transaction.reference}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyRef}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
            >
              {copiedRef ? <CheckIcon className="w-3.5 h-3.5 text-white" /> : <CopyIcon className="w-3.5 h-3.5" />}
              <span>{copiedRef ? 'Tersalin' : 'Salin Ref'}</span>
            </button>
          </div>

          {/* Supported Apps Note */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-zinc-300 space-y-1">
            <div className="font-semibold text-white">
              Mendukung Seluruh Aplikasi Pembayaran Nasional:
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-400">
              BCA Mobile, Livin&apos; by Mandiri, BRImo, BNI, GoPay, OVO, DANA, ShopeePay, LinkAja, serta semua perbankan/e-wallet berlogo QRIS.
            </p>
          </div>

          {/* Validity Notice */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 pt-1">
            <ClockIcon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
            <span>Referensi aktif dan berlaku hingga 24 jam ke depan.</span>
          </div>
        </div>
      </div>

      {/* Action Buttons to WhatsApp Step */}
      <div className="pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Ganti Program</span>
        </button>

        <button
          type="button"
          onClick={onProceedToWhatsApp}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 shadow-xl shadow-white/10 transition-all active:scale-[0.98]"
        >
          <span>Sudah Membayar? Lanjut Konfirmasi WhatsApp</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
        <ShieldCheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>Status pembayaran diverifikasi langsung oleh pengajar setelah bukti bayar dikirim via WhatsApp.</span>
      </div>
    </div>
  );
}
