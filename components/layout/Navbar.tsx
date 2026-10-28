'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/lib/config';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import { MenuIcon, XIcon, WhatsAppIcon, LaptopIcon } from '@/components/ui/Icons';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waConsultUrl = buildWhatsAppConsultationUrl();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <LaptopIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight block leading-tight">
                {APP_CONFIG.name}
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                Mentoring 1-on-1 Praktik Nyata
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <Link href="/#solusi" className="hover:text-indigo-600 transition-colors">
              Kenapa Privat?
            </Link>
            <Link href="/#program" className="hover:text-indigo-600 transition-colors">
              Pilihan Kelas
            </Link>
            <Link href="/#fasilitas" className="hover:text-indigo-600 transition-colors">
              Fasilitas & Gemini Pro
            </Link>
            <Link href="/#alur" className="hover:text-indigo-600 transition-colors">
              Alur Pendaftaran
            </Link>
            <Link href="/#faq" className="hover:text-indigo-600 transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Konsultasi via WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
              <span>Tanya Pengajar</span>
            </a>

            <Link
              href="/daftar"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/daftar"
              className="inline-flex sm:hidden items-center justify-center px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
            >
              Daftar
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-base font-medium text-slate-700">
            <Link
              href="/#solusi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-slate-50 hover:text-indigo-600 transition-colors"
            >
              Kenapa Privat?
            </Link>
            <Link
              href="/#program"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-slate-50 hover:text-indigo-600 transition-colors"
            >
              Pilihan Kelas
            </Link>
            <Link
              href="/#fasilitas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-slate-50 hover:text-indigo-600 transition-colors"
            >
              Fasilitas & Gemini Pro
            </Link>
            <Link
              href="/#alur"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-slate-50 hover:text-indigo-600 transition-colors"
            >
              Alur Pendaftaran
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-slate-50 hover:text-indigo-600 transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
              <span>Konsultasi via WhatsApp</span>
            </a>
            <Link
              href="/daftar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
            >
              Daftar Kelas Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
