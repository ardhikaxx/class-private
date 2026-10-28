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
    tagline: 'Wujudkan ide website impian dari antarmuka hingga database',
    price: 250000,
    popularBadge: 'Paling Diminati',
    isFeatured: false,
    description:
      'Belajar merancang dan membuat website fungsional sesuai kebutuhan idemu, dari tampilan responsif hingga pengelolaan data.',
    targetAudience:
      'Mahasiswa, pelajar, atau pemula yang ingin membangun website portofolio, landing page, atau sistem web sederhana.',
    curriculum: [
      'Perencanaan struktur halaman & alur pengguna',
      'Desain antarmuka responsif & modern',
      'Pengembangan frontend & backend dasar',
      'Pengelolaan database & pengujian sistem'
    ],
    meetingsCount: 5,
    durationLabel: '5 sesi pertemuan privat (1-on-1)',
    scheduleLabel: 'Jadwal fleksibel disepakati bersama',
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
    tagline: 'Bangun aplikasi Android/iOS siap pakai sesuai ide kebutuhanmu',
    price: 300000,
    popularBadge: 'Pilihan Populer',
    isFeatured: false,
    description:
      'Belajar membangun aplikasi mobile dari konsep desain layar hingga siap diuji coba dan dipasang di smartphone.',
    targetAudience:
      'Peserta yang ingin membuat aplikasi mobile untuk portofolio, tugas akhir, atau prototipe bisnis.',
    curriculum: [
      'Perancangan alur fitur & layout antarmuka mobile',
      'Navigasi antarlayar & layout responsif',
      'Manajemen state & interaksi pengguna',
      'Pengolahan data & pengujian di device'
    ],
    meetingsCount: 5,
    durationLabel: '5 sesi pertemuan privat (1-on-1)',
    scheduleLabel: 'Jadwal fleksibel disepakati bersama',
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
    tagline: 'Solusi terlengkap: website & mobile terhubung dengan data terpusat',
    price: 450000,
    popularBadge: 'Paling Komprehensif',
    isFeatured: true,
    description:
      'Solusi terlengkap untuk membangun ekosistem digital: website dan aplikasi mobile yang saling terhubung lewat shared backend & database.',
    targetAudience:
      'Peserta dengan ide sistem terpadu (misal: panel web admin dan aplikasi mobile client yang berbagi data yang sama).',
    curriculum: [
      'Perancangan arsitektur terintegrasi (Web + Mobile)',
      'Pembuatan REST API & basis data bersama',
      'Sinkronisasi data real-time & autentikasi pengguna',
      'Pengujian alur menyeluruh (end-to-end)'
    ],
    meetingsCount: 5,
    durationLabel: '5 sesi pertemuan privat (1-on-1)',
    scheduleLabel: 'Jadwal fleksibel disepakati bersama',
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
