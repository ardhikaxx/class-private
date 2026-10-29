import { APP_CONFIG } from './config';

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: 'Saya orang awam (Non-IT) tanpa dasar coding sama sekali, apakah bisa ikut?',
    answer:
      'Sangat bisa! Justru kelas privat 1-on-1 ini dirancang ramah untuk orang Non-IT. Anda tidak perlu latar belakang komputer atau matematika rumit. Pengajar akan membimbing dari instalasi software, logika dasar coding dengan analogi sederhana, hingga pembuatan aplikasi jadi secara sabar dan terarah.'
  },
  {
    question: 'Jika saya mahasiswa atau orang IT yang butuh bimbingan skripsi / proyek lanjutan, apakah cocok?',
    answer:
      'Sangat cocok! Untuk peserta berlatar belakang IT, kita bisa langsung melompati materi pengenalan dan fokus pada bimbingan skripsi/tugas akhir, arsitektur database, clean code, integrasi REST API, maupun live debugging kendala kode yang sedang dihadapi.'
  },
  {
    question: 'Bolehkah membawa ide proyek sendiri atau topik tugas akhir/skripsi?',
    answer:
      'Sangat boleh! Kelas ini difokuskan langsung untuk mewujudkan ide proyek pribadimu, portofolio kerja, sistem prototipe bisnis, maupun tugas akhir/skripsi informatika.'
  },
  {
    question: 'Bagaimana media dan metode belajarnya?',
    answer:
      'Bimbingan dilakukan secara online tatap muka 1-on-1 melalui Google Meet atau Zoom dengan fitur screen-sharing interaktif, live debugging, dan pendampingan baris demi baris kode secara intensif.'
  },
  {
    question: 'Bagaimana penentuan jadwal pertemuan?',
    answer:
      'Jadwal 5 sesi pertemuan disepakati bersama secara fleksibel antara kamu dan mentor setelah pendaftaran selesai. Jika kamu berhalangan hadir, jadwal dapat di-reschedule dengan konfirmasi sebelumnya.'
  },
  {
    question: 'Bagaimana jika saya mengalami error atau kendala di luar sesi bimbingan?',
    answer:
      'Kamu tetap bisa bertanya dan berkonsultasi seputar kendala kode melalui chat WhatsApp pengajar selama masa program bimbingan berlangsung.'
  },
  {
    question: 'Bagaimana cara pembayaran kelas privat?',
    answer:
      'Pembayaran dilakukan dengan memindai kode QRIS di halaman pendaftaran menggunakan aplikasi m-Banking (BCA, Mandiri, BRI, BNI, dll.) atau e-Wallet (GoPay, OVO, Dana, ShopeePay), lalu kirimkan screenshot bukti transfer ke WhatsApp pengajar.'
  },
  {
    question: 'Kapan fasilitas Gemini Pro 3 bulan diberikan?',
    answer:
      `Fasilitas akses akun Gemini Pro selama ${APP_CONFIG.geminiProDurationMonths} bulan akan langsung diberikan oleh pengajar setelah pembayaran kelasmu berhasil diverifikasi.`
  },
  {
    question: 'Apakah source code hasil bimbingan sepenuhnya menjadi milik saya?',
    answer:
      'Ya, 100% source code dan hak cipta proyek yang dibuat selama kelas menjadi milik kamu sepenuhnya. Mentor juga akan memandu cara upload ke GitHub dan deploy online (misal ke Vercel).'
  }
];
