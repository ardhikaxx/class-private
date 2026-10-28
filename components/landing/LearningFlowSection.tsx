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
      title: 'Pilih Program & Isi Data',
      desc: 'Tentukan program (Website, Mobile, atau Integrasi) dan masukkan nama lengkapmu di formulir pendaftaran cepat.',
      icon: UserIcon,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      step: '02',
      title: 'Pindai Kode QRIS',
      desc: 'Sistem menyajikan kode QRIS resmi dengan nominal tagihan tepat. Pindai langsung melalui m-Banking atau e-Wallet favoritmu.',
      icon: CreditCardIcon,
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      step: '03',
      title: 'Kirim Bukti via WhatsApp',
      desc: 'Klik tombol konfirmasi WhatsApp otomatis, lalu lampirkan screenshot bukti transfer transaksi berhasil ke nomor pengajar.',
      icon: WhatsAppIcon,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      step: '04',
      title: 'Sepakati Jadwal & Mulai',
      desc: 'Setelah pembayaran terverifikasi, kamu dan pengajar akan menyepakati 5 sesi pertemuan fleksibel dan mulai mewujudkan proyekmu!',
      icon: CalendarIcon,
      color: 'bg-violet-100 text-violet-700'
    }
  ];

  return (
    <section id="alur" className="py-16 lg:py-24 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 lg:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Alur Mudah
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bagaimana Alur Pendaftaran & Pembelajaran?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hanya butuh beberapa menit untuk mendaftar. Seluruh alur dirancang transparan, aman, dan langsung terhubung dengan pengajar.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-indigo-200">{s.step}</span>
                    <div className={`w-9 h-9 rounded-xl ${s.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA to start registration */}
        <div className="mt-12 text-center">
          <Link
            href="/daftar"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition-all"
          >
            <span>Mulai Pendaftaran Sekarang</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
