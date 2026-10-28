'use client';

import React, { useState } from 'react';
import { Program } from '@/lib/programs';
import { TransactionRecord } from '@/types/registration';
import {
  WhatsAppIcon,
  CheckIcon,
  CopyIcon,
  ArrowLeftIcon,
  ExternalLinkIcon
} from '@/components/ui/Icons';
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

  const paymentStatusDisplay =
    transaction.paymentStatus === 'paid'
      ? 'Lunas'
      : 'Menunggu Verifikasi Bukti Pembayaran';

  const messageText = buildWhatsAppConfirmationText({
    participantName,
    programName: program.name,
    amount: transaction.amount,
    meetingsCount: APP_CONFIG.meetingsCount,
    bonusFacility: `Gemini Pro ${APP_CONFIG.geminiProDurationMonths} Bulan`,
    transactionReference: transaction.reference,
    paymentStatusLabel: paymentStatusDisplay
  });

  const waUrl = buildWhatsAppConfirmationUrl({
    participantName,
    programName: program.name,
    amount: transaction.amount,
    meetingsCount: APP_CONFIG.meetingsCount,
    bonusFacility: `Gemini Pro ${APP_CONFIG.geminiProDurationMonths} Bulan`,
    transactionReference: transaction.reference,
    paymentStatusLabel: paymentStatusDisplay
  });

  const handleOpenWhatsApp = () => {
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
        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center mx-auto mb-2">
          <WhatsAppIcon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Konfirmasi WhatsApp
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Kirim pesan otomatis ini dan lampirkan bukti pembayaran ke pengajar.
        </p>
      </div>

      {/* Main WhatsApp Action Button */}
      <div className="max-w-xl mx-auto space-y-3 pt-1">
        <button
          type="button"
          onClick={handleOpenWhatsApp}
          className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 shadow-xl shadow-white/10 transition-all active:scale-[0.98] cursor-pointer"
        >
          <WhatsAppIcon className="w-5 h-5 text-zinc-950" />
          <span>Buka WhatsApp Pengajar</span>
          <ExternalLinkIcon className="w-4 h-4 opacity-70" />
        </button>

        <p className="text-[11px] text-center text-zinc-500 font-mono">
          Nomor resmi pengajar: {APP_CONFIG.whatsapp.displayNumber}
        </p>
      </div>

      {/* Preview of the WhatsApp message */}
      <div className="max-w-xl mx-auto rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
        <div className="p-3 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
            Format Pesan:
          </span>
          <button
            type="button"
            onClick={handleCopyMessage}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer"
          >
            {copiedMessage ? <CheckIcon className="w-3.5 h-3.5 text-white" /> : <CopyIcon className="w-3.5 h-3.5" />}
            <span>{copiedMessage ? 'Tersalin' : 'Salin Pesan'}</span>
          </button>
        </div>

        <div className="p-4 font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed select-all">
          {messageText}
        </div>
      </div>

      {/* Back button */}
      <div className="max-w-xl mx-auto pt-2 border-t border-white/10 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToPayment}
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          <span>Kembali ke QRIS</span>
        </button>

        <span className="text-xs text-zinc-500 font-mono">
          Ref: <code className="text-zinc-300">{transaction.reference}</code>
        </span>
      </div>
    </div>
  );
}
