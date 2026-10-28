import React from 'react';
import Link from 'next/link';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import { ArrowRightIcon, WhatsAppIcon } from '@/components/ui/Icons';

export function FinalCTASection() {
  const waUrl = buildWhatsAppConsultationUrl();

  return (
    <section className="py-16 lg:py-24 bg-zinc-950 text-white relative overflow-hidden border-b border-white/10">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
          Siap Wujudkan Ide Aplikasimu?
        </h2>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Pilih program kelas dan mulai 5 sesi bimbingan privat 1-on-1 dengan jadwal fleksibel bersama pengajar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/daftar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 transition-all cursor-pointer"
          >
            <span>Daftar Kelas Sekarang</span>
            <ArrowRightIcon className="w-4 h-4 text-black" />
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4 text-zinc-300" />
            <span>Tanya Pengajar</span>
          </a>
        </div>
      </div>
    </section>
  );
}
