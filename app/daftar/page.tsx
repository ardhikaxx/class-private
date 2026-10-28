import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RegistrationWizard } from '@/components/registration/RegistrationWizard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeftIcon } from '@/components/ui/Icons';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: `Pendaftaran — ${APP_CONFIG.name}`,
  description:
    'Formulir pendaftaran resmi Private Coding Class. Pilih program website, mobile, atau integrasi, dapatkan kode QRIS pembayaran, dan konfirmasi via WhatsApp.',
  alternates: {
    canonical: '/daftar'
  }
};

export default function DaftarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white selection:bg-white selection:text-black">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          {/* Top back link */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Kembali</span>
            </Link>
          </div>

          {/* Heading - Minimalist */}
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Pendaftaran Kelas Privat
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Pilih program, dapatkan kode QRIS, dan konfirmasi via WhatsApp.
            </p>
          </div>

          {/* Client Registration Wizard wrapped in Suspense for useSearchParams */}
          <Suspense
            fallback={
              <div className="max-w-xl mx-auto bg-zinc-900/60 border border-white/10 backdrop-blur-2xl rounded-3xl p-12 text-center space-y-4 shadow-xl">
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-zinc-400 font-mono tracking-widest uppercase">
                  Memuat Sistem Pendaftaran...
                </p>
              </div>
            }
          >
            <RegistrationWizard />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
