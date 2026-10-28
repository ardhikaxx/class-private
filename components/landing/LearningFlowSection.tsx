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
      title: 'Pilih Program',
      desc: 'Tentukan program kelas dan masukkan nama peserta.',
      icon: UserIcon
    },
    {
      step: '02',
      title: 'Bayar via QRIS',
      desc: 'Pindai kode QRIS dinamis langsung dari aplikasi perbankanmu.',
      icon: CreditCardIcon
    },
    {
      step: '03',
      title: 'Kirim Bukti',
      desc: 'Konfirmasi dan kirim screenshot bukti transfer ke WhatsApp pengajar.',
      icon: WhatsAppIcon
    },
    {
      step: '04',
      title: 'Mulai Belajar',
      desc: 'Sepakati jadwal 5 sesi privat dan mulai bimbingan aplikasimu.',
      icon: CalendarIcon
    }
  ];

  return (
    <section id="alur" className="py-14 lg:py-20 bg-zinc-950 text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-10">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
            ALUR PENDAFTARAN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            4 Langkah Mudah
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Proses cepat, transparan, dan langsung terhubung dengan pengajar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-5 hover:border-white/20 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold shrink-0">
                    <Icon className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-500">{s.step}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 transition-all cursor-pointer"
          >
            <span>Daftar Sekarang</span>
            <ArrowRightIcon className="w-4 h-4 text-black" />
          </Link>
        </div>
      </div>
    </section>
  );
}
