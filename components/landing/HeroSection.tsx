import React from 'react';
import Link from 'next/link';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import { ALL_PROGRAMS, formatRupiah, ProgramSlug } from '@/lib/programs';
import { APP_CONFIG } from '@/lib/config';
import {
  WhatsAppIcon,
  ArrowRightIcon,
  WebBrowserIcon,
  MobileDeviceIcon,
  IntegrationIcon
} from '@/components/ui/Icons';

function ProgramHeroIcon({ slug, className = 'w-4 h-4' }: { slug: ProgramSlug; className?: string }) {
  if (slug === 'website') return <WebBrowserIcon className={className} />;
  if (slug === 'mobile') return <MobileDeviceIcon className={className} />;
  return <IntegrationIcon className={className} />;
}

export function HeroSection() {
  const waUrl = buildWhatsAppConsultationUrl();

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-zinc-950 text-white">
      {/* Futuristic ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                {APP_CONFIG.name}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-mono text-zinc-400 tracking-wide">
                1-on-1 Mentoring
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Belajar Bikin Website & Aplikasi Sesuai{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                Ide Proyekmu
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Bimbingan privat intensif praktik langsung bersama pengajar. Fokus pada realisasi ide aplikasimu dengan jadwal fleksibel dan fasilitas Gemini Pro 3 bulan.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/#program"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-black bg-white hover:bg-zinc-200 transition-all cursor-pointer"
              >
                <span>Lihat Pilihan Kelas</span>
                <ArrowRightIcon className="w-4 h-4 text-black" />
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-zinc-300" />
                <span>Konsultasi WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Program Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/60 backdrop-blur-2xl p-6 shadow-2xl space-y-3 max-w-md mx-auto">
              <div className="border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
                  PROGRAM KELAS
                </span>
              </div>

              <div className="space-y-2">
                {ALL_PROGRAMS.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/daftar?program=${p.slug}`}
                    className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold shrink-0">
                        <ProgramHeroIcon slug={p.slug} className="w-4 h-4 text-white" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white group-hover:text-zinc-200 leading-snug">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-zinc-400 font-mono">
                          5 Sesi Privat
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-white font-mono whitespace-nowrap">
                        {formatRupiah(p.price)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
