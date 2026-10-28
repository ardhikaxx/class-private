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
      question: 'Apakah pemula tanpa dasar coding bisa ikut?',
      answer:
        'Bisa. Format kelas adalah privat 1-on-1, sehingga materi dimulai dari dasar dan tempo bimbingan disesuaikan dengan kemampuan awalmu.'
    },
    {
      question: 'Bolehkah saya membawa ide proyek sendiri?',
      answer:
        'Sangat boleh. Kelas ini dirancang khusus untuk mendampingimu merealisasikan ide proyekmu sendiri (portofolio, tugas akhir, atau prototipe aplikasi).'
    },
    {
      question: 'Bagaimana penentuan jadwal 5 kali pertemuan?',
      answer:
        'Jadwal bersifat fleksibel dan disepakati bersama antara kamu dan pengajar setelah proses pendaftaran dan verifikasi pembayaran selesai.'
    },
    {
      question: 'Bagaimana cara melakukan pembayaran dan konfirmasi?',
      answer:
        'Pindai QRIS resmi di halaman pendaftaran dengan nominal yang sesuai, simpan screenshot bukti transaksi, lalu kirimkan ke WhatsApp pengajar melalui tombol yang tersedia.'
    },
    {
      question: 'Kapan dan bagaimana akses Gemini Pro 3 bulan diberikan?',
      answer:
        `Fasilitas Gemini Pro selama ${APP_CONFIG.geminiProDurationMonths} bulan akan dipandu dan diberikan oleh pengajar setelah pembayaran diverifikasi, sesuai ketentuan resmi penyedia layanan.`
    },
    {
      question: 'Apakah proyek dijamin 100% selesai dalam 5 pertemuan?',
      answer:
        'Hasil akhir bergantung pada kompleksitas fitur ide dan latihan mandiri peserta. Pengajar akan memandu penyusunan arsitektur utama dan alur terpenting (MVP).'
    }
  ];

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-12 lg:py-16 bg-white border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pertanyaan Umum
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Jawaban ringkas seputar pelaksanaan bimbingan Private Coding Class.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/50 hover:border-indigo-200"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-slate-200/60 bg-white">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
