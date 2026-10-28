'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@/components/ui/Icons';
import { APP_CONFIG } from '@/lib/config';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Apakah pemula tanpa latar belakang coding bisa mengikuti kelas ini?',
      answer:
        'Sangat bisa! Karena format kelas adalah privat 1-on-1, pengajar akan menyesuaikan ritme penjelasan dari dasar, mulai dari pemahaman logika logika dasar, antarmuka, hingga langkah pembuatan proyek secara bertahap.'
    },
    {
      question: 'Teknologi apa saja yang dapat dipelajari?',
      answer:
        'Teknologi disesuaikan dengan ide aplikasi yang ingin kamu bangun. Umumnya mencakup teknologi web modern (HTML, CSS, Tailwind, JavaScript/TypeScript, React/Next.js), antarmuka aplikasi mobile (seperti React Native/Flutter sesuai kesepakatan), serta backend & database (Node.js, PostgreSQL/MySQL/Supabase). Detail pasti didiskusikan bersama pengajar di sesi pertama.'
    },
    {
      question: 'Apakah saya boleh membawa ide proyek sendiri?',
      answer:
        'Tentu! Justru nilai utama dari kelas privat ini adalah membantu kamu merealisasikan ide proyekmu sendiri — baik itu untuk portofolio pribadi, tugas kuliah, tugas akhir, atau prototipe bisnis.'
    },
    {
      question: 'Bagaimana cara menentukan jadwal 5 kali pertemuan?',
      answer:
        'Jadwal pertemuan fleksibel dan disepakati bersama antara kamu dan pengajar setelah proses pendaftaran dan verifikasi pembayaran selesai. Pertemuan dapat disesuaikan pada pagi, siang, atau malam hari sesuai kesiapan kedua belah pihak.'
    },
    {
      question: 'Bagaimana cara melakukan pembayaran dan konfirmasi?',
      answer:
        'Pembayaran dilakukan melalui QRIS yang ditampilkan di halaman pendaftaran. Pindai menggunakan aplikasi m-Banking atau e-Wallet favoritmu dengan nominal sesuai program yang dipilih. Setelah transaksi berhasil, simpan screenshot bukti dan tekan tombol "Konfirmasi Pendaftaran via WhatsApp" untuk mengirimkannya ke nomor pengajar.'
    },
    {
      question: 'Apa saja informasi yang harus terlihat pada bukti pembayaran transfer?',
      answer:
        'Pastikan screenshot menampilkan status transaksi BERHASIL, nominal transfer yang sesuai dengan harga program, tanggal & waktu transaksi, serta reference/nomor seri transaksi jika ada. Jangan pernah mengirimkan kode OTP, PIN, atau kata sandi perbankan kamu.'
    },
    {
      question: 'Bagaimana mekanisme pemberian akses Gemini Pro selama 3 bulan?',
      answer:
        `Akses Gemini Pro selama ${APP_CONFIG.geminiProDurationMonths} bulan akan dipandu dan diberikan mekanismenya secara langsung oleh pengajar setelah pendaftaran terverifikasi, sesuai panduan dan ketentuan resmi dari penyedia layanan AI tersebut.`
    },
    {
      question: 'Apakah proyek dijamin 100% selesai dalam 5 pertemuan?',
      answer:
        'Penyelesaian proyek sangat bergantung pada tingkat kompleksitas fitur yang kamu inginkan, kecepatan belajar, dan latihan mandiri di luar sesi. Pengajar mendampingi penyusunan struktur utama dan alur terpenting. Untuk ide yang sangat kompleks, disarankan berfokus pada Minimum Viable Product (MVP) terlebih dahulu.'
    }
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Tanya Jawab
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Punya pertanyaan lain? Jangan ragu untuk langsung berdiskusi dengan pengajar via WhatsApp.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/40 hover:border-indigo-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      ?
                    </div>
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-200/60 bg-white">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
