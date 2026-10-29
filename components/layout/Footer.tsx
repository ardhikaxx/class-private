import React from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/lib/config';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import { LaptopIcon, WhatsAppIcon, ShieldCheckIcon } from '@/components/ui/Icons';

export function Footer() {
  const currentYear = 2026;
  const waUrl = buildWhatsAppConsultationUrl();

  return (
    <footer className="bg-black text-zinc-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black shrink-0">
                <LaptopIcon className="w-5 h-5 text-black" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {APP_CONFIG.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              Bimbingan privat 1-on-1 belajar membangun website, aplikasi mobile, dan integrasi sesuai ide proyek peserta dengan jadwal fleksibel.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <ShieldCheckIcon className="w-4 h-4 text-white flex-shrink-0" />
              <span>Pendampingan bimbingan praktik mandiri</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              NAVIGASI
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link href="/#solusi" className="hover:text-white transition-colors">
                  Kenapa Privat?
                </Link>
              </li>
              <li>
                <Link href="/#program" className="hover:text-white transition-colors">
                  Program & Biaya
                </Link>
              </li>
              <li>
                <Link href="/#teknologi" className="hover:text-white transition-colors">
                  Teknologi
                </Link>
              </li>
              <li>
                <Link href="/#perbandingan" className="hover:text-white transition-colors">
                  Keunggulan
                </Link>
              </li>
              <li>
                <Link href="/#fasilitas" className="hover:text-white transition-colors">
                  Fasilitas
                </Link>
              </li>
              <li>
                <Link href="/#alur" className="hover:text-white transition-colors">
                  Alur Pendaftaran
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/daftar" className="text-white hover:underline font-semibold transition-colors">
                  Pendaftaran →
                </Link>
              </li>
            </ul>
          </div>

          {/* Program Choices */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              KONSULTASI & KONTAK
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              Punya pertanyaan mengenai materi, ide proyek, atau kecocokan program? Hubungi pengajar langsung:
            </p>
            <div className="pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold transition-all backdrop-blur-md"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Chat WhatsApp: {APP_CONFIG.whatsapp.displayNumber}</span>
              </a>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1 font-mono">
              *Jadwal 5 sesi pertemuan disepakati bersama setelah pendaftaran & konfirmasi pembayaran.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-mono">
          <p>© {currentYear} {APP_CONFIG.name}. Hak Cipta Dilindungi.</p>
          <p className="text-center sm:text-right text-[11px]">
            Fasilitas Gemini Pro 3 Bulan disesuaikan dengan ketentuan resmi penyedia.
          </p>
        </div>
      </div>
    </footer>
  );
}
