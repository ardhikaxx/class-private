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
      desc: 'Setelah pembayaran selesai pada m-Banking/e-Wallet, ambil tangkapan layar (screenshot) bukti transfer yang menampilkan status Berhasil, nominal transfer, dan waktu transaksi.',
      icon: CreditCardIcon,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      num: 2,
      title: 'Buka Chat WhatsApp Pengajar',
      desc: `Tekan tombol "Konfirmasi Pendaftaran via WhatsApp". Sistem akan membuka chat WhatsApp resmi pengajar (${APP_CONFIG.whatsapp.displayNumber}) dengan pesan pendaftaran yang sudah terisi otomatis.`,
      icon: WhatsAppIcon,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      num: 3,
      title: 'Kirimkan Screenshot Bukti Pembayaran',
      desc: 'Kirimkan pesan otomatis tersebut, lalu lampirkan screenshot bukti pembayaran pada percakapan yang sama untuk diverifikasi oleh pengajar.',
      icon: CheckCircleIcon,
      color: 'bg-indigo-100 text-indigo-700'
    }
  ];

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-7 space-y-6">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
          ✓
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Setelah Membayar
          </h3>
          <p className="text-xs text-slate-500">
            Ikuti 3 langkah mudah ini untuk menyelesaikan proses pendaftaran dan verifikasi.
          </p>
        </div>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 gap-3.5">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start gap-3.5"
            >
              <div className={`w-8 h-8 rounded-xl ${st.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900">
                  Langkah {st.num}: {st.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Warning Notice */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1 text-xs">
        <div className="flex items-center gap-2 font-bold text-rose-800">
          <AlertCircleIcon className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>Pemberitahuan Keamanan Penting</span>
        </div>
        <p className="text-[11px] leading-relaxed text-rose-800/90">
          Pastikan bukti transfer hanya memuat status transaksi, nominal, dan tanggal. <strong>JANGAN PERNAH</strong> membagikan nomor PIN, kata sandi (password), kode OTP, atau informasi rahasia perbankan kamu kepada siapa pun.
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheckIcon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>Pengajar akan memverifikasi bukti transfer dan menghubungi kamu untuk menyepakati jadwal kelas.</span>
      </div>
    </div>
  );
}
