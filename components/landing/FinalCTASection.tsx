import React from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/lib/config';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import { ArrowRightIcon, WhatsAppIcon, SparklesIcon } from '@/components/ui/Icons';

export function FinalCTASection() {
  const waUrl = buildWhatsAppConsultationUrl();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-indigo-200">
          <SparklesIcon className="w-4 h-4 text-amber-300" />
          <span>Mulai Langkah Pertamamu Membangun Proyek Impian</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
          Siap Wujudkan Ide Aplikasimu dengan Mentoring Privat?
        </h2>

        <p className="text-sm sm:text-base text-indigo-100/80 max-w-2xl mx-auto leading-relaxed">
          Pilih salah satu dari 3 program (Website, Aplikasi Mobile, atau Integrasi Keduanya), nikmati 5 sesi bimbingan fleksibel, dan dapatkan bonus fasilitas Gemini Pro 3 bulan untuk mendukung belajarmu.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/daftar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg shadow-black/20 transition-all transform hover:-translate-y-0.5"
          >
            <span>Daftar Kelas Sekarang</span>
            <ArrowRightIcon className="w-4 h-4 text-slate-900" />
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 transition-all"
          >
            <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
            <span>Tanya & Konsultasi Ide via WhatsApp</span>
          </a>
        </div>

        <p className="text-xs text-indigo-300/60 pt-2">
          *Pendaftaran aman dengan QRIS dan konfirmasi langsung ke nomor WhatsApp resmi {APP_CONFIG.whatsapp.displayNumber}
        </p>
      </div>
    </section>
  );
}
