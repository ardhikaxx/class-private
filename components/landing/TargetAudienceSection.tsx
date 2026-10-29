import React from 'react';
import { LaptopIcon, UserIcon, SparklesIcon, ShieldCheckIcon } from '@/components/ui/Icons';

export function TargetAudienceSection() {
  const audiences = [
    {
      icon: SparklesIcon,
      badge: 'Orang Awam & Non-IT',
      title: 'Belajar Coding dari Dasar (Nol)',
      desc: 'Tidak punya latar belakang komputer atau matematika rumit? Jangan khawatir! Materi diajarkan dari nol, dari instalasi software sampai logika coding dengan bahasa yang mudah dipahami tanpa takut tertinggal.'
    },
    {
      icon: UserIcon,
      badge: 'Mahasiswa & Lulusan IT',
      title: 'Bimbingan Skripsi & Tugas Akhir',
      desc: 'Bagi mahasiswa informatika/sistem informasi yang butuh bimbingan intensif penyusunan sistem web atau mobile, bedah error skripsi, perancangan database, maupun persiapan sidang tugas akhir.'
    },
    {
      icon: LaptopIcon,
      badge: 'Founder & Pebisnis',
      title: 'Bikin Prototipe / MVP Bisnis',
      desc: 'Punya ide produk digital tapi bingung cara memulainya? Bangun aplikasi atau website bisnismu sendiri bersama mentor tanpa harus mengeluarkan puluhan juta ke software house.'
    },
    {
      icon: ShieldCheckIcon,
      badge: 'Career Switcher',
      title: 'Pindah Karir ke Bidang IT',
      desc: 'Ingin beralih profesi menjadi Web atau Mobile Developer? Bangun portofolio proyek riil standar industri menggunakan React, Next.js, dan Flutter untuk melamar pekerjaan impian.'
    }
  ];

  return (
    <section id="sasaran" className="py-14 lg:py-20 bg-zinc-950 text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-10">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
            UNTUK SIAPA KELAS INI?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Terbuka untuk Background IT Maupun Non-IT
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Pendekatan bimbingan privat 1-on-1 disesuaikan dengan tingkat pemahaman awal, tempo belajar, dan kebutuhan spesifikmu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl p-6 hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center font-bold shrink-0">
                    <Icon className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      {item.badge}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
