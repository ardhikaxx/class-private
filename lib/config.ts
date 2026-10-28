export const APP_CONFIG = {
  name: 'Private Coding Class',
  tagline: 'Wujudkan Ide Website dan Aplikasi Kamu Lewat Mentoring Privat',
  description:
    'Program bimbingan privat 1-on-1 belajar membuat website, aplikasi mobile, atau integrasi keduanya sesuai ide proyek peserta. 5 pertemuan dengan jadwal fleksibel dan bonus Gemini Pro 3 bulan.',
  
  // WhatsApp Contact Details
  whatsapp: {
    rawNumber: '085933648537',
    intlNumber: '6285933648537',
    displayNumber: '+62 859-3364-8537'
  },

  // Learning parameters
  meetingsCount: 5,
  geminiProDurationMonths: 3,

  // Payment configuration
  qris: {
    staticImageUrl: '/qris.jpeg',
    merchantName: 'Private Coding Class',
    instructions: [
      'Buka aplikasi m-Banking atau e-Wallet yang mendukung QRIS (BCA Mobile, Livin Mandiri, BRImo, GoPay, OVO, Dana, ShopeePay, dll).',
      'Pindai (scan) kode QRIS di bawah.',
      'Periksa nama merchant dan pastikan nominal pembayaran SESUAI persis dengan tagihan program yang dipilih.',
      'Selesaikan pembayaran dan simpan screenshot bukti transaksi berhasil.'
    ]
  },

  // Social & Meta
  metadata: {
    siteUrl: 'https://class-private.vercel.app',
    title: 'Private Coding Class — Bimbingan Privat Bikin Website & Aplikasi',
    description:
      'Wujudkan ide website dan aplikasi kamu lewat private coding class. Belajar praktik 1-on-1, materi sesuai kebutuhan ide proyek, 5 sesi fleksibel, plus akses Gemini Pro 3 bulan.'
  }
} as const;
