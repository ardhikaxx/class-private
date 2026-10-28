export type ProgramSlug = 'website' | 'mobile' | 'integrasi';

export interface Program {
  slug: ProgramSlug;
  name: string;
  tagline: string;
  price: number; // in IDR (integer)
  popularBadge?: string;
  isFeatured?: boolean;
  description: string;
  targetAudience: string;
  curriculum: string[];
  meetingsCount: number;
  durationLabel: string;
  scheduleLabel: string;
  bonusFacility: string;
  accentColor: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    button: string;
  };
}

export const PROGRAMS: Record<ProgramSlug, Program> = {
  website: {
    slug: 'website',
    name: 'Class Website',
    tagline: 'Wujudkan ide website impian dari antarmuka hingga pengelolaan data',
    price: 250000,
    popularBadge: 'Paling Diminati',
    isFeatured: false,
    description:
      'Program privat intensif untuk kamu yang ingin belajar membuat website fungsional sesuai kebutuhan proyekmu. Cocok untuk website portofolio, landing page produk, blog interaktif, atau sistem informasi web.',
    targetAudience:
      'Mahasiswa, pelajar, calon developer web, atau siapa saja yang memiliki ide website dan butuh arahan teknis dari dasar hingga dapat dijalankan.',
    curriculum: [
      'Perencanaan struktur halaman & alur navigasi pengguna (user flow)',
      'Penyusunan antarmuka responsif modern (HTML/CSS/Tailwind UI)',
      'Pengembangan frontend interaktif & manipulasi data dinamis',
      'Dasar backend, API, & pengelolaan database sesuai ide proyek',
      'Panduan pengujian, debugging, serta cara menjalankan website hingga online'
    ],
    meetingsCount: 5,
    durationLabel: '5 kali pertemuan privat (1-on-1)',
    scheduleLabel: 'Jadwal fleksibel (disepakati bersama pengajar & peserta)',
    bonusFacility: 'Akses Gemini Pro selama 3 bulan',
    accentColor: {
      bg: 'bg-blue-50/70',
      border: 'border-blue-200',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-800 border-blue-300',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  },
  mobile: {
    slug: 'mobile',
    name: 'Class Aplikasi Mobile',
    tagline: 'Bangun aplikasi Android/iOS siap pakai sesuai ide & fitur kebutuhanmu',
    price: 300000,
    popularBadge: 'Pilihan Populer',
    isFeatured: false,
    description:
      'Program privat intensif untuk belajar membangun aplikasi mobile dari konsep hingga dapat dipasang di smartphone. Pembahasan mencakup antarmuka layar sentuh, alur aplikasi, serta penanganan data.',
    targetAudience:
      'Pelajar, mahasiswa, atau kreator yang ingin membuat aplikasi mobile untuk portofolio, tugas akhir, maupun prototipe bisnis.',
    curriculum: [
      'Perancangan alur fitur & layout antarmuka aplikasi mobile yang nyaman',
      'Navigasi antarlayar (stack & tab navigation) dan layout responsif',
      'Manajemen state aplikasi, input form, & interaksi pengguna',
      'Pengolahan data lokal serta integrasi API eksternal bila dibutuhkan',
      'Pengujian aplikasi di emulator/smartphone & panduan build project'
    ],
    meetingsCount: 5,
    durationLabel: '5 kali pertemuan privat (1-on-1)',
    scheduleLabel: 'Jadwal fleksibel (disepakati bersama pengajar & peserta)',
    bonusFacility: 'Akses Gemini Pro selama 3 bulan',
    accentColor: {
      bg: 'bg-violet-50/70',
      border: 'border-violet-200',
      text: 'text-violet-700',
      badge: 'bg-violet-100 text-violet-800 border-violet-300',
      button: 'bg-violet-600 hover:bg-violet-700 text-white'
    }
  },
  integrasi: {
    slug: 'integrasi',
    name: 'Class Integrasi Website dan Aplikasi Mobile',
    tagline: 'Solusi terlengkap: bangun ekosistem website & mobile dengan data terhubung',
    price: 450000,
    popularBadge: 'Paling Komprehensif',
    isFeatured: true,
    description:
      'Program privat terlengkap untuk peserta yang ingin membangun website dan aplikasi mobile yang saling tersinkronisasi. Mempelajari bagaimana web client dan mobile client berbagi data melalui satu backend & database yang sama.',
    targetAudience:
      'Peserta yang ingin membangun sistem lengkap dengan panel web (misal: admin dashboard atau portal) sekaligus aplikasi mobile bagi pengguna akhir.',
    curriculum: [
      'Perancangan arsitektur sistem terintegrasi (Web + Mobile + Shared Backend)',
      'Pembuatan REST API / backend terpadu & perancangan basis data bersama',
      'Komunikasi data real-time, autentikasi pengguna, & sinkronisasi state',
      'Pengelolaan hak akses pengguna antara antarmuka web dan mobile',
      'Pengujian alur menyeluruh (end-to-end testing) dan troubleshooting integrasi'
    ],
    meetingsCount: 5,
    durationLabel: '5 kali pertemuan privat (1-on-1)',
    scheduleLabel: 'Jadwal fleksibel (disepakati bersama pengajar & peserta)',
    bonusFacility: 'Akses Gemini Pro selama 3 bulan',
    accentColor: {
      bg: 'bg-indigo-50/80',
      border: 'border-indigo-300 ring-2 ring-indigo-500/20',
      text: 'text-indigo-700',
      badge: 'bg-indigo-600 text-white border-transparent',
      button: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25'
    }
  }
};

export const ALL_PROGRAM_SLUGS: ProgramSlug[] = ['website', 'mobile', 'integrasi'];

export const ALL_PROGRAMS: Program[] = Object.values(PROGRAMS);

/**
 * Format integer IDR to Indonesian Rupiah representation
 * Example: 250000 -> "Rp 250.000"
 */
export function formatRupiah(amount: number): string {
  const formattedNumber = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
  return `Rp ${formattedNumber}`;
}

/**
 * Safely retrieve a program by slug string
 */
export function getProgramBySlug(slug: string | null | undefined): Program | undefined {
  if (!slug) return undefined;
  if (slug === 'website' || slug === 'mobile' || slug === 'integrasi') {
    return PROGRAMS[slug];
  }
  return undefined;
}

/**
 * Validate whether a string is a valid program slug
 */
export function isValidProgramSlug(slug: string | null | undefined): slug is ProgramSlug {
  return slug === 'website' || slug === 'mobile' || slug === 'integrasi';
}
