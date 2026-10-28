import React from 'react';
import Link from 'next/link';
import {
  CreditCardIcon,
  WhatsAppIcon,
  CalendarIcon,
  ArrowRightIcon,
  UserIcon
} from '@/components/ui/Icons';

export function LearningFlowSection() {
  const steps = [
    {
      step: '01',
      title: 'Pilih Program & Nama',
      desc: 'Tentukan program kelas yang kamu minati dan isi nama lengkap peserta.',
      icon: UserIcon
    },
    {
      step: '02',
      title: 'Pembayaran QRIS',
      desc: 'Pindai QRIS dinamis dari m-Banking atau e-Wallet dengan nominal terkunci otomatis.',
      icon: CreditCardIcon
    },
    {
      step: '03',
      title: 'Kirim Bukti ke WhatsApp',
      desc: 'Klik tombol konfirmasi WhatsApp dan kirimkan screenshot bukti pembayaran.',
      icon: WhatsAppIcon
    },
    {
      step: '04',
      title: 'Sepakati Jadwal',
      desc: 'Setelah pembayaran diverifikasi, sepakati 5 sesi pertemuan fleksibel bersama pengajar.',
      icon: CalendarIcon
    }
  ];

  return (
    <section id="alur" className="py-14 lg:py-20 bg-zinc-950 text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300 bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
            ALUR PENDAFTARAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            4 Langkah Mudah Memulai
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Proses instan, transparan, dan langsung terhubung dengan pengajar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-5 shadow-xl hover:border-white/25 hover:bg-zinc-900/60 transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold shadow-md shadow-white/10 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-500">LANGKAH {s.step}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/daftar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 shadow-lg shadow-white/15 transition-all"
          >
            <span>Daftar Sekarang</span>
            <ArrowRightIcon className="w-4 h-4 text-black" />
          </Link>
        </div>
      </div>
    </section>
  );
}
