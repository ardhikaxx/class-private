import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { RegistrationWizard } from '@/components/registration/RegistrationWizard';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeftIcon, SparklesIcon } from '@/components/ui/Icons';
import { APP_CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: `Pendaftaran — ${APP_CONFIG.name}`,
  description:
    'Formulir pendaftaran resmi Private Coding Class. Pilih program website, mobile, atau integrasi, dapatkan kode QRIS pembayaran, dan konfirmasi via WhatsApp.'
};

export default function DaftarPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top back link & breadcrumb */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>

            <span className="inline-flex items-center gap-1.5 text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full font-medium">
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>Bimbingan 1-on-1 Praktik</span>
            </span>
          </div>

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pendaftaran Private Coding Class
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Selesaikan 4 langkah mudah untuk mengamankan slot bimbingan proyek idemu dan mendapatkan kode QRIS pembayaran resmi.
            </p>
          </div>

          {/* Client Registration Wizard wrapped in Suspense for useSearchParams */}
          <Suspense
            fallback={
              <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-xs">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-500 font-medium">Memuat formulir pendaftaran...</p>
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
