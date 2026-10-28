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
    <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center mx-auto mb-3">
          <WhatsAppIcon className="w-7 h-7 text-emerald-400" />
        </div>
        <Badge variant="default" className="text-xs font-mono">
          Tahap Akhir: Konfirmasi & Kirim Bukti
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight pt-1">
          Konfirmasi Pendaftaran ke Pengajar
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Buka chat WhatsApp resmi pengajar dengan format pesan pendaftaran yang telah kami siapkan otomatis.
        </p>
      </div>

      {/* Main WhatsApp Action Button */}
      <div className="max-w-xl mx-auto space-y-4 pt-2">
        <button
          type="button"
          onClick={handleOpenWhatsApp}
          className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl text-base font-bold text-zinc-950 bg-white hover:bg-zinc-200 shadow-2xl shadow-white/10 transition-all active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-white/20"
        >
          <WhatsAppIcon className="w-6 h-6 text-emerald-600" />
          <span>Konfirmasi Pendaftaran via WhatsApp</span>
          <ExternalLinkIcon className="w-4 h-4 opacity-70" />
        </button>

        <p className="text-[11px] text-center text-zinc-500 font-mono">
          *Membuka chat WhatsApp ke {APP_CONFIG.whatsapp.displayNumber}. Tekan kirim dan lampirkan screenshot bukti transfer.
        </p>

        {/* Notice after WhatsApp is clicked */}
        {hasOpenedWhatsApp && (
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 text-zinc-200 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-white">
              <CheckCircleIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Sudah Membuka WhatsApp?</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              Pastikan Anda telah <strong className="text-white">mengirimkan teks pendaftaran</strong> dan <strong className="text-white">melampirkan screenshot bukti transfer</strong>. Pengajar akan segera memverifikasi dan menyepakati jadwal 5 sesi pertemuan.
            </p>
          </div>
        )}
      </div>

      {/* Preview of the WhatsApp message */}
      <div className="max-w-xl mx-auto rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl overflow-hidden">
        <div className="p-3.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Format Pesan WhatsApp Otomatis:
          </span>
          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
          >
            {copiedMessage ? <CheckIcon className="w-3.5 h-3.5 text-emerald-400" /> : <CopyIcon className="w-3.5 h-3.5" />}
            <span>{copiedMessage ? 'Tersalin' : 'Salin Pesan'}</span>
          </button>
        </div>

        <div className="p-4 font-mono text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed select-all">
          {messageText}
        </div>
      </div>

      {/* Honest Status Banner */}
      <div className="max-w-xl mx-auto p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 space-y-1">
        <div className="flex items-center gap-2 font-bold text-amber-300">
          <AlertCircleIcon className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>Status Sistem: Menunggu Verifikasi Bukti Pembayaran</span>
        </div>
        <p className="text-[11px] leading-relaxed text-amber-200/80">
          Status pendaftaran diverifikasi setelah pengajar menerima dan memeriksa screenshot bukti transfer pembayaran. Sistem tidak membuat klaim lunas palsu.
        </p>
      </div>

      {/* Back button to view QRIS again if needed */}
      <div className="max-w-xl mx-auto pt-4 border-t border-white/10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToPayment}
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          <span>Lihat Kembali Kode QRIS</span>
        </button>

        <span className="text-xs text-zinc-500 font-mono">
          Ref: <code className="text-zinc-300">{transaction.reference}</code>
        </span>
      </div>
    </div>
  );
}
