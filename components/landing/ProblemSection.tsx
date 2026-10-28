import React from 'react';
import { HelpCircleIcon, CheckCircleIcon, ArrowRightIcon } from '@/components/ui/Icons';
import Link from 'next/link';

export function ProblemSection() {
  const painPoints = [
    {
      problem: 'Punya ide aplikasi/website tapi bingung harus mulai dari mana',
      explanation:
        'Banyak ide cemerlang berhenti di angan-angan karena terlalu banyak opsi framework, library, dan tutorial yang membingungkan.',
      solution: 'Diskusi ide terarah untuk membedah fitur utama dan menyusun arsitektur sistem dari langkah paling awal.'
    },
    {
      problem: 'Kerap bingung menghubungkan frontend, backend, dan database',
      explanation:
        'Membuat tampilan mungkin bisa ditiru dari tutorial, namun saat data harus disimpan, divalidasi, dan ditarik kembali sering kali macet.',
      solution: 'Praktik langsung membuat alur data, REST API, serta struktur basis data yang saling terhubung rapi.'
    },
    {
      problem: 'Terjebak tutorial generik yang tidak menjawab kebutuhan proyekmu',
      explanation:
        'Video tutorial biasanya hanya mengajarkan studi kasus to-do list atau blog sederhana, bukan fitur spesifik yang ingin kamu bangun.',
      solution: 'Materi disesuaikan dengan ide aplikasimu sendiri, sehingga setiap sesi langsung relevan untuk kemajuan proyekmu.'
    },
    {
      problem: 'Mengalami error/bug tanpa ada mentor yang bisa ditanya langsung',
      explanation:
        'Mencari jawaban di forum sering kali memakan waktu berhari-hari dan menghasilkan rasa frustrasi bagi pemula.',
      solution: 'Sesi privat 1-on-1 memungkinkan kamu bertanya langsung, live debugging bareng pengajar, dan paham penyebab error.'
    }
  ];

  return (
    <section id="solusi" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Tantangan & Solusi Belajar
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kenapa Belajar Mandiri Lewat Tutorial Sering Kali Buntu?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Menjadi programmer bukan sekadar menghafal sintaks, tapi memahami bagaimana merancang alur sistem dan menyelesaikan masalah nyata. Di sinilah bimbingan privat membuat perbedaan.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {painPoints.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200/90 bg-slate-50/50 p-6 sm:p-7 hover:border-indigo-200 hover:bg-white transition-all shadow-xs space-y-4"
            >
              {/* Problem Statement */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HelpCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{item.problem}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.explanation}</p>
                </div>
              </div>

              {/* Solution from Mentoring */}
              <div className="pt-3 border-t border-slate-200/70 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircleIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                    Solusi di Private Coding Class:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 mt-0.5 font-medium leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Realistic Expectations Banner */}
        <div className="mt-10 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-indigo-950">
            <span className="font-bold block sm:inline">Transparan & Realistis:</span>{' '}
            <span>
              Program ini adalah bimbingan dan pendampingan praktik langsung agar kamu paham cara membuat dan memelihara aplikasi. Bukan layanan joki atau pembuatan instan oleh pengajar.
            </span>
          </div>
          <Link
            href="/#program"
            className="flex-shrink-0 inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-indigo-700 hover:text-indigo-900"
          >
            <span>Lihat Paket Kelas</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
