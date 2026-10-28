import React from 'react';
import Link from 'next/link';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import { ArrowRightIcon, WhatsAppIcon, SparklesIcon } from '@/components/ui/Icons';

export function FinalCTASection() {
  const waUrl = buildWhatsAppConsultationUrl();

  return (
    <section className="py-16 lg:py-24 bg-zinc-950 text-white relative overflow-hidden border-b border-white/10">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono text-zinc-300">
          <SparklesIcon className="w-3.5 h-3.5 text-white" />
          <span>MULAI SEKARANG</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
          Siap Wujudkan Ide Website & Aplikasimu?
        </h2>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Pilih salah satu program kelas, nikmati 5 sesi bimbingan privat 1-on-1 dengan jadwal fleksibel, dan dapatkan bonus akses Gemini Pro selama 3 bulan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/daftar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 transition-all shadow-lg shadow-white/15"
          >
            <span>Daftar Kelas Sekarang</span>
            <ArrowRightIcon className="w-4 h-4 text-black" />
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 text-zinc-300" />
            <span>Tanya via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
