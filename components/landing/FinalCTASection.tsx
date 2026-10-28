import React from 'react';
import Link from 'next/link';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import { ArrowRightIcon, WhatsAppIcon } from '@/components/ui/Icons';

export function FinalCTASection() {
  const waUrl = buildWhatsAppConsultationUrl();

  return (
    <section className="py-12 lg:py-16 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
          Siap Wujudkan Ide Website & Aplikasimu?
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Pilih salah satu program kelas, nikmati 5 sesi bimbingan privat 1-on-1 dengan jadwal fleksibel, dan dapatkan bonus akses Gemini Pro selama 3 bulan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/daftar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-sm"
          >
            <span>Daftar Kelas Sekarang</span>
            <ArrowRightIcon className="w-4 h-4 text-slate-900" />
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
            <span>Tanya via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
