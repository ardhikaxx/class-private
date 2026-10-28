import React from 'react';
import { CreditCardIcon, WhatsAppIcon, CheckCircleIcon } from '@/components/ui/Icons';
import { APP_CONFIG } from '@/lib/config';

export function PaymentInstructions() {
  const steps = [
    {
      num: 1,
      title: 'Simpan Bukti Pembayaran',
      desc: 'Ambil screenshot bukti transfer setelah transaksi selesai.',
      icon: CreditCardIcon
    },
    {
      num: 2,
      title: 'Buka WhatsApp Pengajar',
      desc: `Buka chat WhatsApp ke ${APP_CONFIG.whatsapp.displayNumber}.`,
      icon: WhatsAppIcon
    },
    {
      num: 3,
      title: 'Kirim Bukti Pembayaran',
      desc: 'Kirim pesan dan lampirkan screenshot untuk verifikasi jadwal.',
      icon: CheckCircleIcon
    }
  ];

  return (
    <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xl">
      <h3 className="text-sm font-bold text-white tracking-tight">
        Langkah Konfirmasi
      </h3>

      <div className="grid grid-cols-1 gap-2.5">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center flex-shrink-0 border border-white/10">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-white">
                  {st.num}. {st.title}
                </div>
                <p className="text-[11px] text-zinc-400">{st.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
