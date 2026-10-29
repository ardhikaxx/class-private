export const APP_CONFIG = {
  name: 'Private Coding Class',
  tagline: 'Kursus Coding Privat 1-on-1: Terbuka untuk Background IT & Non-IT',
  description:
    'Program bimbingan privat coding 1-on-1 untuk siapa saja yang membutuhkan. Terbuka bagi orang awam (Non-IT) dari nol tanpa pengalaman, maupun mahasiswa & praktisi IT yang butuh bimbingan proyek nyata atau skripsi. 5 sesi intensif dengan jadwal fleksibel dan bonus Gemini Pro 3 bulan.',
  
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
    title: 'Kursus Coding Privat 1-on-1 (IT & Non-IT) | Bimbingan Bikin Website & Aplikasi — Private Coding Class',
    description:
      'Pendaftaran kelas privat ngoding 1-on-1 untuk siapa saja yang membutuhkan. Terbuka untuk orang awam (Non-IT) mulai dari nol maupun mahasiswa/praktisi IT (bimbingan skripsi & proyek). 5 sesi fleksibel + bonus Gemini Pro 3 bulan.',
    googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ''
  }
} as const;
