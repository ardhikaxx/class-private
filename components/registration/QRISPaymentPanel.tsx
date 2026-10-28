'use client';

import React, { useState, useEffect } from 'react';
import { Program, formatRupiah } from '@/lib/programs';
import { TransactionRecord } from '@/types/registration';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  DownloadIcon
} from '@/components/ui/Icons';
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
      {/* Header - Minimalist, without excess badges */}
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Pembayaran QRIS
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Pindai kode QR berikut untuk menyelesaikan pembayaran {program.name}.
        </p>
      </div>

      {/* QR Code Container - Pure White Card for Maximum Optical Contrast */}
      <div className="flex flex-col items-center justify-center py-2">
        <div className="p-5 bg-white rounded-3xl shadow-xl text-center max-w-[300px] w-full text-zinc-950 border border-zinc-200">
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
                <span className="text-[11px] text-zinc-600 font-medium">Menyiapkan QR...</span>
              </div>
            )}
          </div>

          {/* Total Pembayaran under QR */}
          <div className="mt-3.5 pt-3 border-t border-zinc-100 text-center">
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-400 font-semibold block">
              Total Pembayaran
            </span>
            <div className="text-2xl font-black text-zinc-950 tracking-tight font-mono mt-0.5">
              {formatRupiah(transaction.amount)}
            </div>
          </div>

          <div className="mt-2 text-center space-y-0.5">
            <div className="text-xs font-semibold text-zinc-800">
              {QRIS_MERCHANT_INFO.name}
            </div>
            <div className="text-[10px] text-zinc-400 font-mono">
              NMID: {QRIS_MERCHANT_INFO.nationalQrisId}
            </div>
            <button
              type="button"
              onClick={handleDownloadQr}
              disabled={!activeQrUrl}
              className="mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-zinc-200 transition-colors w-full disabled:opacity-50 cursor-pointer"
            >
              <DownloadIcon className="w-3.5 h-3.5" />
              <span>Unduh QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-white/10 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          <span>Ganti Program</span>
        </button>

        <button
          type="button"
          onClick={onProceedToWhatsApp}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 transition-all active:scale-[0.98] cursor-pointer"
        >
          <span>Lanjut Konfirmasi WhatsApp</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
