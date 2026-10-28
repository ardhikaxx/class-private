'use client';

import React, { useState, useEffect } from 'react';
import { Program, formatRupiah } from '@/lib/programs';
import { TransactionRecord } from '@/types/registration';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
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
            Pindai QRIS Dinamis
          </h3>
        </div>
        <Badge variant="featured" className="text-xs font-semibold self-start sm:self-auto">
          <SparklesIcon className="w-3.5 h-3.5 mr-1 text-white" />
          QRIS Dinamis Aktif
        </Badge>
      </div>

      {/* QR Code Container - Centered Pure White Card for Maximum Camera Optical Contrast */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="p-5 bg-white rounded-3xl shadow-2xl text-center max-w-[320px] w-full text-zinc-950 border border-white/20">
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-zinc-700 uppercase tracking-wider mb-2.5 px-1">
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

          {/* Total Pembayaran tepat di bawah QR code */}
          <div className="mt-3 pt-2.5 border-t border-zinc-200/80 text-center">
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500 font-bold block">
              Total Pembayaran
            </span>
            <div className="text-2xl font-black text-zinc-950 tracking-tight font-mono mt-0.5">
              {formatRupiah(transaction.amount)}
            </div>
          </div>

          <div className="mt-3 space-y-1 text-center">
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
              className="mt-2.5 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-zinc-200 transition-colors w-full disabled:opacity-50 cursor-pointer"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              <span>Unduh Gambar QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons to WhatsApp Step */}
      <div className="pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Ganti Program</span>
        </button>

        <button
          type="button"
          onClick={onProceedToWhatsApp}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 shadow-xl shadow-white/10 transition-all active:scale-[0.98] cursor-pointer"
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
