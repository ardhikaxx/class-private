import React from 'react';
import Link from 'next/link';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import { ALL_PROGRAMS, formatRupiah } from '@/lib/programs';
import {
  SparklesIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  CalendarIcon
} from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';

export function HeroSection() {
  const waUrl = buildWhatsAppConsultationUrl();

  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center">
              <Badge variant="featured" className="py-1 px-3 text-xs font-semibold">
                <SparklesIcon className="w-3.5 h-3.5 mr-1 text-amber-300" />
                Mentoring 1-on-1 • Jadwal Fleksibel • Free Gemini Pro 3 Bulan
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Belajar Bikin Website & Aplikasi Sesuai{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Ide Proyekmu
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Bimbingan privat 1-on-1 selama 5 pertemuan praktik langsung. Dari perencanaan alur, antarmuka, hingga database — dipandu intensif sesuai idemu.
            </p>

            {/* Quick 3 Specs Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-700 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <ClockIcon className="w-3.5 h-3.5 text-indigo-600" />
                5x Pertemuan Privat
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                <CalendarIcon className="w-3.5 h-3.5 text-indigo-600" />
                Jadwal Fleksibel
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-900 font-semibold shadow-xs">
                <SparklesIcon className="w-3.5 h-3.5 text-indigo-600" />
                Bonus Gemini Pro 3 Bulan
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <Link
                href="/#program"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition-all"
              >
                <span>Lihat Pilihan Kelas</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Program Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg shadow-slate-100 space-y-4 max-w-md mx-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Ringkasan Program & Biaya
                </span>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  5 Sesi 1-on-1
                </span>
              </div>

              <div className="space-y-2.5">
                {ALL_PROGRAMS.map((p) => {
                  const isFeatured = p.slug === 'integrasi';
                  return (
                    <Link
                      key={p.slug}
                      href={`/daftar?program=${p.slug}`}
                      className={`block p-3.5 rounded-2xl border transition-all ${
                        isFeatured
                          ? 'border-indigo-300 bg-indigo-50/50 hover:bg-indigo-50'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900">{p.name}</span>
                            {isFeatured && (
                              <span className="text-[10px] font-bold text-white bg-indigo-600 px-1.5 py-0.2 rounded">
                                Terlengkap
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{p.tagline}</p>
                        </div>
                        <div className="text-right flex-shrink-0 pl-2">
                          <span className="text-sm font-extrabold text-slate-900 block">
                            {formatRupiah(p.price)}
                          </span>
                          <span className="text-[10px] text-indigo-600 font-semibold">Daftar →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                  Pembayaran via QRIS resmi
                </span>
                <span className="text-indigo-600 font-semibold">Slot Terbatas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
