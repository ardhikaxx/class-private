'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  LaptopIcon,
  SparklesIcon,
  HelpCircleIcon,
  CreditCardIcon
} from '@/components/ui/Icons';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function FloatingNavBottom() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>('beranda');

  // Derive active id: if on /daftar, 'daftar' is active; otherwise follow current section
  const activeId = pathname === '/daftar' ? 'daftar' : activeSection;

  const navItems: NavItem[] = [
    {
      id: 'beranda',
      label: 'Beranda',
      href: '/#top',
      icon: HomeIcon
    },
    {
      id: 'program',
      label: 'Program',
      href: '/#program',
      icon: LaptopIcon
    },
    {
      id: 'fasilitas',
      label: 'Fasilitas',
      href: '/#fasilitas',
      icon: SparklesIcon
    },
    {
      id: 'faq',
      label: 'FAQ',
      href: '/#faq',
      icon: HelpCircleIcon
    },
    {
      id: 'daftar',
      label: 'Daftar',
      href: '/daftar',
      icon: CreditCardIcon
    }
  ];

  // Detect active section on home page based on scroll position and intersection
  useEffect(() => {
    if (pathname !== '/') return;

    const sectionIds = ['faq', 'fasilitas', 'program'];
    const observers: IntersectionObserver[] = [];

    const handleScroll = () => {
      // If user scrolls near top of home page
      if (window.scrollY < 200) {
        setActiveSection('beranda');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-30% 0px -50% 0px',
          threshold: 0.1
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  const handleItemClick = (item: NavItem) => {
    setActiveSection(item.id);

    // If on homepage and clicking home, scroll smoothly to top
    if (item.id === 'beranda' && pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Navigasi Bawah Ponsel"
      className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div className="flex items-center gap-1 p-1.5 rounded-full bg-slate-900/95 text-white backdrop-blur-xl border border-slate-700/80 shadow-2xl shadow-black/50 ring-1 ring-white/10 transition-all duration-300">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => handleItemClick(item)}
              className={`relative flex items-center justify-center transition-all duration-300 select-none ${
                isActive
                  ? 'bg-indigo-600 text-white px-3.5 py-2 rounded-full font-bold shadow-md shadow-indigo-600/30'
                  : 'p-2 text-slate-400 hover:text-slate-200 active:scale-95 rounded-full hover:bg-slate-800/60'
              }`}
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.label}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />

              {/* Only show menu label text when ACTIVE */}
              {isActive && (
                <span className="text-xs font-bold whitespace-nowrap pl-1.5 leading-none transition-all duration-300">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
