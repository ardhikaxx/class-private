'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { APP_CONFIG } from '@/lib/config';
import { buildWhatsAppConsultationUrl } from '@/lib/whatsapp';
import { MenuIcon, XIcon, WhatsAppIcon, LaptopIcon } from '@/components/ui/Icons';

interface NavbarProps {
  hideOnMobile?: boolean;
  className?: string;
}

export function Navbar({ hideOnMobile = true, className = '' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waConsultUrl = buildWhatsAppConsultationUrl();

  const mobileVisibilityClass = hideOnMobile ? 'hidden md:block' : '';

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/10 bg-zinc-950/70 backdrop-blur-2xl transition-all ${mobileVisibilityClass} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-black shadow-md shadow-white/10 group-hover:scale-105 transition-transform shrink-0">
              <LaptopIcon className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight block leading-tight">
                {APP_CONFIG.name}
              </span>
              <span className="text-xs text-zinc-400 font-mono block">
                Mentoring 1-on-1 Praktik
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <Link href="/#solusi" className="hover:text-white transition-colors">
              Kenapa Privat?
            </Link>
            <Link href="/#program" className="hover:text-white transition-colors">
              Program
            </Link>
            <Link href="/#fasilitas" className="hover:text-white transition-colors">
              Fasilitas
            </Link>
            <Link href="/#alur" className="hover:text-white transition-colors">
              Alur
            </Link>
            <Link href="/#faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/15 backdrop-blur-md transition-all"
              aria-label="Konsultasi via WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 text-zinc-200" />
              <span>Tanya Pengajar</span>
            </a>

            <Link
              href="/daftar"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-black bg-white hover:bg-zinc-200 shadow-sm shadow-white/20 transition-all"
            >
              Daftar Sekarang
            </Link>
          </div>

          {/* Mobile Menu Button (rendered only when not hidden on mobile) */}
          {!hideOnMobile && (
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/daftar"
                className="inline-flex sm:hidden items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold text-black bg-white hover:bg-zinc-200 transition-all"
              >
                Daftar
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Buka menu navigasi"
              >
                {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Menu (rendered only when not hidden on mobile) */}
      {!hideOnMobile && mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-zinc-950/95 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-3">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-zinc-200">
            <Link
              href="/#solusi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              Kenapa Privat?
            </Link>
            <Link
              href="/#program"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              Program
            </Link>
            <Link
              href="/#fasilitas"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              Fasilitas
            </Link>
            <Link
              href="/#alur"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              Alur
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-white/5 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href={waConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 border border-white/20"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Konsultasi via WhatsApp</span>
            </a>
            <Link
              href="/daftar"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-black bg-white hover:bg-zinc-200 shadow-sm"
            >
              Daftar Kelas Sekarang
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
