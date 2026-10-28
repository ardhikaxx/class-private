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
      step: '1',
      title: 'Pilih Program & Nama',
      desc: 'Tentukan program kelas yang kamu minati dan isi nama lengkap peserta.',
      icon: UserIcon,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      step: '2',
      title: 'Pembayaran QRIS',
      desc: 'Pindai QRIS resmi dari m-Banking atau e-Wallet dengan nominal sesuai tagihan.',
      icon: CreditCardIcon,
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      step: '3',
      title: 'Kirim Bukti ke WhatsApp',
      desc: 'Klik tombol konfirmasi WhatsApp dan kirimkan screenshot bukti pembayaran.',
      icon: WhatsAppIcon,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      step: '4',
      title: 'Sepakati Jadwal',
      desc: 'Setelah pembayaran diverifikasi, sepakati 5 sesi pertemuan fleksibel bersama pengajar.',
      icon: CalendarIcon,
      color: 'bg-violet-100 text-violet-700'
    }
  ];

  return (
    <section id="alur" className="py-12 lg:py-16 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Alur Pendaftaran
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            4 Langkah Mudah Memulai
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Proses cepat dan langsung terhubung dengan pengajar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200 p-5 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl ${s.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">Langkah {s.step}</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/daftar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
          >
            <span>Daftar Sekarang</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
