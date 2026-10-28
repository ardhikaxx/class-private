'use client';

import React, { useState } from 'react';
import { Program } from '@/lib/programs';
import { TransactionRecord } from '@/types/registration';
import {
  WhatsAppIcon,
  CheckIcon,
  CopyIcon,
  AlertCircleIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExternalLinkIcon
} from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';
import { APP_CONFIG } from '@/lib/config';
import {
  buildWhatsAppConfirmationText,
  buildWhatsAppConfirmationUrl
} from '@/lib/whatsapp';

interface WhatsAppConfirmationProps {
  participantName: string;
  program: Program;
  transaction: TransactionRecord;
  onBackToPayment: () => void;
}

export function WhatsAppConfirmation({
  participantName,
  program,
  transaction,
  onBackToPayment
}: WhatsAppConfirmationProps) {
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [hasOpenedWhatsApp, setHasOpenedWhatsApp] = useState(false);

  // Status mapping
  const paymentStatusDisplay =
    transaction.paymentStatus === 'paid'
      ? 'Lunas / Terverifikasi'
      : 'Menunggu Verifikasi Bukti Pembayaran';

  const messageText = buildWhatsAppConfirmationText({
    participantName,
    programName: program.name,
    amount: transaction.amount,
    meetingsCount: APP_CONFIG.meetingsCount,
    bonusFacility: `Gemini Pro selama ${APP_CONFIG.geminiProDurationMonths} bulan`,
    transactionReference: transaction.reference,
    paymentStatusLabel: paymentStatusDisplay
  });

  const waUrl = buildWhatsAppConfirmationUrl({
    participantName,
    programName: program.name,
    amount: transaction.amount,
    meetingsCount: APP_CONFIG.meetingsCount,
    bonusFacility: `Gemini Pro selama ${APP_CONFIG.geminiProDurationMonths} bulan`,
    transactionReference: transaction.reference,
    paymentStatusLabel: paymentStatusDisplay
  });

  const handleOpenWhatsApp = () => {
    setHasOpenedWhatsApp(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
          <WhatsAppIcon className="w-7 h-7" />
        </div>
        <Badge variant="warning" className="text-xs font-bold">
          Tahap Akhir: Konfirmasi & Kirim Bukti
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Konfirmasi Pendaftaran ke Pengajar
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Buka chat WhatsApp resmi pengajar dengan format pesan pendaftaran yang telah kami siapkan otomatis.
        </p>
      </div>

      {/* Main WhatsApp Action Button */}
      <div className="max-w-xl mx-auto space-y-4 pt-2">
        <button
          type="button"
          onClick={handleOpenWhatsApp}
          className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-emerald-500/30"
        >
          <WhatsAppIcon className="w-6 h-6" />
          <span>Konfirmasi Pendaftaran via WhatsApp</span>
          <ExternalLinkIcon className="w-4 h-4 opacity-80" />
        </button>

        <p className="text-[11px] text-center text-slate-400">
          *Browser akan membuka chat WhatsApp ke nomor {APP_CONFIG.whatsapp.displayNumber}. Kamu cukup menekan tombol &apos;Kirim&apos; di aplikasi WhatsApp dan melampirkan screenshot bukti transfer.
        </p>

        {/* Notice after WhatsApp is clicked */}
        {hasOpenedWhatsApp && (
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-indigo-900">
              <CheckCircleIcon className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span>Sudah Membuka WhatsApp?</span>
            </div>
            <p className="text-xs leading-relaxed text-indigo-900/90">
              Pastikan kamu telah <strong>mengirimkan teks pesan pendaftaran</strong> dan <strong>melampirkan screenshot bukti transfer pembayaran</strong> pada chat WhatsApp tersebut. Pengajar akan segera memverifikasi dan menyepakati jadwal 5 sesi pertemuan denganmu.
            </p>
          </div>
        )}
      </div>

      {/* Preview of the WhatsApp message */}
      <div className="max-w-xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
        <div className="p-3.5 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Format Pesan WhatsApp Otomatis:
          </span>
          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
          >
            {copiedMessage ? <CheckIcon className="w-3.5 h-3.5 text-emerald-600" /> : <CopyIcon className="w-3.5 h-3.5" />}
            <span>{copiedMessage ? 'Tersalin' : 'Salin Pesan'}</span>
          </button>
        </div>

        <div className="p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap leading-relaxed bg-white">
          {messageText}
        </div>
      </div>

      {/* Honest Status Banner */}
      <div className="max-w-xl mx-auto p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1">
        <div className="flex items-center gap-2 font-bold text-amber-900">
          <AlertCircleIcon className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Status Sistem: Menunggu Verifikasi Pembayaran</span>
        </div>
        <p className="text-[11px] leading-relaxed text-amber-900/90">
          Status pendaftaran kamu belum dinyatakan lunas sampai pengajar menerima dan memeriksa screenshot bukti transfer pembayaranmu. Website kami tidak membuat konfirmasi sukses palsu.
        </p>
      </div>

      {/* Back button to view QRIS again if needed */}
      <div className="max-w-xl mx-auto pt-4 border-t border-slate-100 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToPayment}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          <span>Lihat Kembali Kode QRIS</span>
        </button>

        <span className="text-xs text-slate-400">
          Ref: <code className="font-mono">{transaction.reference}</code>
        </span>
      </div>
    </div>
  );
}
