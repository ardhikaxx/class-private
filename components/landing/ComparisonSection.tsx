import React from 'react';
import { CheckIcon, XIcon } from '@/components/ui/Icons';

export function ComparisonSection() {
  const comparisonRows = [
    {
      feature: 'Format Bimbingan',
      selfLearning: 'Sendirian tanpa mentor',
      bootcamp: 'Kelas massal (30-50 murid)',
      privateClass: '100% Privat 1-on-1 Eksklusif'
    },
    {
      feature: 'Realisasi Ide Proyek',
      selfLearning: 'Hanya tutorial template umum',
      bootcamp: 'Kurikulum kaku, topik ditentukan',
      privateClass: 'Bebas sesuai ide proyek impianmu'
    },
    {
      feature: 'Bantuan Error / Debugging',
      selfLearning: 'Stuck berhari-hari cari di forum',
      bootcamp: 'Antri tanya asisten/forum grup',
      privateClass: 'Live debugging langsung saat sesi'
    },
    {
      feature: 'Fleksibilitas Waktu',
      selfLearning: 'Bebas tapi sering putus di tengah',
      bootcamp: 'Jadwal kaku, absen = tertinggal',
      privateClass: 'Jadwal fleksibel disepakati berdua'
    },
    {
      feature: 'Dukungan AI Terpadu',
      selfLearning: 'AI gratis terbatas',
      bootcamp: 'Jarang diajarkan prompting AI',
      privateClass: 'Bonus Gemini Pro 3 Bulan Penuh'
    },
    {
      feature: 'Biaya Investasi',
      selfLearning: 'Gratis tapi boros waktu & buntu',
      bootcamp: 'Mahal (Rp 5.000.000 - 20.000.000+)',
      privateClass: 'Super Terjangkau (Rp 250rb - 450rb)'
    }
  ];

  return (
    <section id="perbandingan" className="py-14 lg:py-20 bg-zinc-950 text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-10">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
            NILAI LEBIH
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kenapa Memilih Private Coding Class?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Bandingkan efektivitas waktu, biaya, dan hasil belajar kami dengan metode lainnya.
          </p>
        </div>

        {/* Comparison Table for Large Screens */}
        <div className="hidden md:block overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="p-4 sm:p-5 font-mono text-zinc-400 uppercase tracking-wider text-xs">
                  Kriteria
                </th>
                <th className="p-4 sm:p-5 text-zinc-400 font-medium">
                  Belajar Otodidak (YouTube)
                </th>
                <th className="p-4 sm:p-5 text-zinc-400 font-medium">
                  Bootcamp Massal
                </th>
                <th className="p-4 sm:p-5 text-white font-bold bg-white/[0.06] border-l border-r border-white/10">
                  Private Coding Class ✨
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white whitespace-nowrap">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <XIcon className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span>{row.selfLearning}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-400">
                    <div className="flex items-center gap-2">
                      <XIcon className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span>{row.bootcamp}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-white font-semibold bg-white/[0.04] border-l border-r border-white/10">
                    <div className="flex items-center gap-2">
                      <CheckIcon className="w-4 h-4 text-white shrink-0" />
                      <span>{row.privateClass}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden space-y-4">
          {comparisonRows.map((row, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl space-y-3"
            >
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                {row.feature}
              </span>

              <div className="p-3 rounded-xl bg-white/[0.08] border border-white/15 space-y-1">
                <span className="text-[10px] font-mono uppercase text-white font-bold block">
                  Private Coding Class
                </span>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <CheckIcon className="w-3.5 h-3.5 text-white shrink-0" />
                  {row.privateClass}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400 pt-1">
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 space-y-0.5">
                  <span className="text-[9px] uppercase font-mono block text-zinc-500">Otodidak</span>
                  <p>{row.selfLearning}</p>
                </div>
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5 space-y-0.5">
                  <span className="text-[9px] uppercase font-mono block text-zinc-500">Bootcamp</span>
                  <p>{row.bootcamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
