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
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-zinc-950 text-white">
      {/* Futuristic ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center">
              <Badge variant="secondary" className="py-1 px-3.5 text-xs font-mono tracking-wide border-white/20">
                <SparklesIcon className="w-3.5 h-3.5 mr-1.5 text-white" />
                1-ON-1 MENTORING • FLEXIBLE SCHEDULE • GEMINI PRO
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Belajar Bikin Website & Aplikasi Sesuai{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                Ide Proyekmu
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Bimbingan privat intensif selama 5 pertemuan praktik langsung. Dari perencanaan alur, antarmuka, hingga database — dipandu 1-on-1 sesuai idemu.
            </p>

            {/* Quick 3 Specs Pills in Glass */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs text-zinc-300 font-medium">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <ClockIcon className="w-3.5 h-3.5 text-white" />
                5x Pertemuan Privat
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <CalendarIcon className="w-3.5 h-3.5 text-white" />
                Jadwal Fleksibel
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white font-semibold backdrop-blur-md">
                <SparklesIcon className="w-3.5 h-3.5 text-white" />
                Bonus Gemini Pro 3 Bulan
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <Link
                href="/#program"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 shadow-lg shadow-white/10 transition-all transform hover:-translate-y-0.5"
              >
                <span>Lihat Pilihan Kelas</span>
                <ArrowRightIcon className="w-4 h-4 text-black" />
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 text-zinc-300" />
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Futuristic Glassmorphism Program Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/15 bg-zinc-900/60 backdrop-blur-2xl p-6 shadow-2xl shadow-black/80 space-y-4 max-w-md mx-auto">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono font-bold text-zinc-200 uppercase tracking-widest">
                  PROGRAM & BIAYA RESMI
                </span>
                <span className="text-[10px] font-mono text-zinc-400 bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                  1-ON-1
                </span>
              </div>

              <div className="space-y-2.5">
                {ALL_PROGRAMS.map((p) => {
                  const isFeatured = p.slug === 'integrasi';
                  return (
                    <Link
                      key={p.slug}
                      href={`/daftar?program=${p.slug}`}
                      className={`block p-3.5 rounded-2xl border transition-all duration-200 ${
                        isFeatured
                          ? 'border-white/30 bg-white/10 hover:bg-white/15 shadow-sm'
                          : 'border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-white">{p.name}</span>
                            {isFeatured && (
                              <span className="text-[9px] font-bold text-black bg-white px-1.5 py-0.2 rounded font-mono uppercase">
                                PRO
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400 line-clamp-1">{p.tagline}</p>
                        </div>
                        <div className="text-right flex-shrink-0 pl-2">
                          <span className="text-sm font-black text-white block font-mono">
                            {formatRupiah(p.price)}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-medium">Daftar →</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1">
                  <CheckIcon className="w-3.5 h-3.5 text-white" />
                  QRIS Dinamis Terkunci
                </span>
                <span className="text-white font-bold">5 Sesi Privat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
