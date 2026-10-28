import React from 'react';
import Link from 'next/link';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import {
  SparklesIcon,
  CalendarIcon,
  LaptopIcon,
  WhatsAppIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CheckIcon
} from '@/components/ui/Icons';
import { Badge } from '@/components/ui/Badge';

export function HeroSection() {
  const waUrl = buildWhatsAppConsultationUrl();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50/50">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f015_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f015_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="featured" className="py-1 px-3.5 text-xs font-semibold">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-300 mr-1" />
                Mentoring 1-on-1 Praktik • Bonus Gemini Pro 3 Bulan
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Wujudkan Ide Website dan Aplikasi Kamu Lewat{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600">
                Private Coding Class
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Belajar coding privat intensif langsung pada proyek idemu. Bukan sekadar menonton teori — kamu mendapatkan bimbingan teknis langkah demi langkah untuk menyusun antarmuka, logika backend, database, hingga aplikasi berjalan optimal.
            </p>

            {/* Four Key Highlights in Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 pt-2 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <LaptopIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">3 Pilihan Program</div>
                  <div className="text-[11px] text-slate-500">Website, Mobile, Integrasi</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">5 Kali Pertemuan</div>
                  <div className="text-[11px] text-slate-500">Sesi privat 1-on-1 intensif</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0">
                  <ShieldCheckIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Jadwal Fleksibel</div>
                  <div className="text-[11px] text-slate-500">Disepakati pengajar & peserta</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <SparklesIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Bonus Gemini Pro</div>
                  <div className="text-[11px] text-slate-500">Akses 3 bulan dukung belajar</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <Link
                href="/#program"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Pilih Kelas Sekarang</span>
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-base font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
                <span>Konsultasi via WhatsApp</span>
              </a>
            </div>

            <p className="text-xs text-slate-500 pt-1">
              *Tatap muka online privat langsung dengan pengajar. Bebas konsultasikan ide proyekmu sebelum mulai.
            </p>
          </div>

          {/* Right Column: Code & Interactive App Mockup Component */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer card styled like a developer workspace window */}
              <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
                {/* Editor Header Bar */}
                <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-400">project-mentoring.tsx</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300">
                    Sesi 1-on-1
                  </span>
                </div>

                {/* Simulated Code Snip */}
                <div className="p-4 bg-slate-950 font-mono text-xs leading-relaxed text-slate-300 border-b border-slate-800">
                  <p className="text-slate-500">{"// Bimbingan arsitektur ide proyek peserta"}</p>
                  <p>
                    <span className="text-violet-400">const</span>{' '}
                    <span className="text-blue-400">myProject</span> = {'{'}
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">idea:</span>{' '}
                    <span className="text-emerald-400">&apos;Aplikasi & Website Sesuai Kebutuhanmu&apos;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">mentoring:</span>{' '}
                    <span className="text-amber-400">&apos;5 Pertemuan Privat Praktik Langsung&apos;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">assistant:</span>{' '}
                    <span className="text-indigo-400">&apos;Gemini Pro 3 Bulan Gratis&apos;</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">status:</span>{' '}
                    <span className="text-cyan-400">&apos;Ready To Build 🚀&apos;</span>
                  </p>
                  <p>{'};'}</p>
                </div>

                {/* Live Preview / Feature Panel */}
                <div className="p-5 bg-slate-50 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Fokus Pendampingan
                    </span>
                    <span className="inline-flex items-center text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ● Aktif Berjalan
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-xs">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckIcon className="w-3 h-3" />
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-slate-800">Bahas alur & desain proyekmu</span>
                        <p className="text-slate-500 text-[11px]">Memastikan pondasi logika sistem rapi sebelum mulai coding.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-xs">
                      <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckIcon className="w-3 h-3" />
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-slate-800">Coding bareng & pendampingan bug</span>
                        <p className="text-slate-500 text-[11px]">Tidak dibiarkan bingung sendirian ketika menghadapi error.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80 shadow-xs">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckIcon className="w-3 h-3" />
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-slate-800">Integrasi AI Gemini Pro</span>
                        <p className="text-slate-500 text-[11px]">Eksplorasi prompt & arsitektur cerdas untuk mempercepat pemahaman.</p>
                      </div>
                    </div>
                  </div>

                  {/* Fast Action inside card */}
                  <div className="pt-2">
                    <Link
                      href="/#program"
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-100/70 hover:bg-indigo-100 transition-colors"
                    >
                      <span>Lihat 3 Pilihan Program Mulai Rp250.000</span>
                      <ArrowRightIcon className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating review/trust pill */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white border border-slate-200 rounded-xl p-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                  1-on-1
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Fokus 100% ke Peserta</div>
                  <div className="text-[11px] text-slate-500">Bukan kelas massal / rekaman video</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
