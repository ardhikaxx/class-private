import React from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/lib/config';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import { LaptopIcon, WhatsAppIcon, ShieldCheckIcon } from '@/components/ui/Icons';

export function Footer() {
  const currentYear = 2026;
  const waUrl = buildWhatsAppConsultationUrl();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <LaptopIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                {APP_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Program bimbingan privat 1-on-1 belajar membangun website, aplikasi mobile, atau integrasi keduanya sesuai ide proyek peserta. Praktik langsung, 5 pertemuan berjadwal fleksibel, dan pendampingan personal.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Pendampingan edukasi & bimbingan pembuatan proyek mandiri</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/#solusi" className="hover:text-white transition-colors">
                  Kenapa Belajar Privat?
                </Link>
              </li>
              <li>
                <Link href="/#program" className="hover:text-white transition-colors">
                  Pilihan Program & Biaya
                </Link>
              </li>
              <li>
                <Link href="/#fasilitas" className="hover:text-white transition-colors">
                  Fasilitas & Gemini Pro
                </Link>
              </li>
              <li>
                <Link href="/#alur" className="hover:text-white transition-colors">
                  Alur Pendaftaran
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Pertanyaan Umum (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/daftar" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  Halaman Pendaftaran →
                </Link>
              </li>
            </ul>
          </div>

          {/* Program Choices */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Konsultasi & Kontak
            </h4>
            <p className="text-sm text-slate-400">
              Punya pertanyaan mengenai materi, ide proyek, atau kecocokan program? Hubungi pengajar langsung melalui WhatsApp:
            </p>
            <div className="pt-1">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat WhatsApp: {APP_CONFIG.whatsapp.displayNumber}</span>
              </a>
            </div>
            <p className="text-xs text-slate-500 pt-2">
              *Jadwal 5 sesi pertemuan disepakati bersama setelah pendaftaran & konfirmasi pembayaran.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {currentYear} {APP_CONFIG.name}. Hak Cipta Dilindungi.</p>
          <p className="text-center sm:text-right">
            Fasilitas Gemini Pro 3 Bulan disesuaikan dengan syarat & ketentuan layanan resmi penyedia.
          </p>
        </div>
      </div>
    </footer>
  );
}
