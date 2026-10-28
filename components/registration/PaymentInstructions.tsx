import React from 'react';
import {
  CreditCardIcon,
  WhatsAppIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  AlertCircleIcon
} from '@/components/ui/Icons';
import { APP_CONFIG } from '@/lib/config';

export function PaymentInstructions() {
  const steps = [
    {
      num: 1,
      title: 'Simpan Screenshot Bukti Pembayaran',
      desc: 'Setelah pembayaran selesai pada m-Banking atau e-Wallet, ambil tangkapan layar (screenshot) bukti transfer yang menampilkan status Berhasil, nominal, dan waktu transaksi.',
      icon: CreditCardIcon
    },
    {
      num: 2,
      title: 'Buka Chat WhatsApp Pengajar',
      desc: `Tekan tombol "Konfirmasi Pendaftaran via WhatsApp". Sistem otomatis membuka chat resmi pengajar (${APP_CONFIG.whatsapp.displayNumber}) dengan format pesan pendaftaran siap kirim.`,
      icon: WhatsAppIcon
    },
    {
      num: 3,
      title: 'Kirimkan Screenshot Bukti Pembayaran',
      desc: 'Kirimkan pesan otomatis tersebut, lalu lampirkan gambar bukti pembayaran pada ruang chat WhatsApp untuk diverifikasi langsung oleh pengajar.',
      icon: CheckCircleIcon
    }
  ];

  return (
    <div className="bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-bold text-sm">
          ✓
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
            Setelah Pembayaran Selesai
          </h3>
          <p className="text-xs text-zinc-400">
            Ikuti 3 tahapan singkat ini untuk verifikasi dan penjadwalan kelas 1-on-1.
          </p>
        </div>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 gap-3">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex items-start gap-3.5"
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center flex-shrink-0 mt-0.5 border border-white/10">
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-white">
                  Langkah {st.num}: {st.title}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{st.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Warning Notice */}
      <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 space-y-1 text-xs">
        <div className="flex items-center gap-2 font-bold text-rose-300">
          <AlertCircleIcon className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>Keamanan Transaksi</span>
        </div>
        <p className="text-[11px] leading-relaxed text-rose-200/80">
          Pastikan bukti transfer hanya menampilkan status berhasil, nominal, dan tanggal. <strong>JANGAN PERNAH</strong> membagikan PIN, password, kode OTP, atau informasi perbankan rahasia kepada siapa pun.
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-zinc-400">
        <ShieldCheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>Pengajar memverifikasi pembayaran dan langsung mendiskusikan silabus & jadwal belajar.</span>
      </div>
    </div>
  );
}
