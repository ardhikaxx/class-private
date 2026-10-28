import { APP_CONFIG } from './config';
import { ALL_PROGRAMS } from './programs';

export function getStructuredData() {
  const baseUrl = APP_CONFIG.metadata.siteUrl;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${baseUrl}/#organization`,
        name: APP_CONFIG.name,
        url: baseUrl,
        description: APP_CONFIG.description,
        telephone: `+${APP_CONFIG.whatsapp.intlNumber}`,
        sameAs: [
          `https://wa.me/${APP_CONFIG.whatsapp.intlNumber}`
        ]
      },
      ...ALL_PROGRAMS.map((program) => ({
        '@type': 'Course',
        '@id': `${baseUrl}/#course-${program.slug}`,
        name: `${program.name} — ${APP_CONFIG.name}`,
        description: program.description,
        provider: {
          '@type': 'EducationalOrganization',
          '@id': `${baseUrl}/#organization`,
          name: APP_CONFIG.name
        },
        offers: {
          '@type': 'Offer',
          price: program.price,
          priceCurrency: 'IDR',
          availability: 'https://schema.org/InStock',
          url: `${baseUrl}/daftar?program=${program.slug}`
        }
      })),
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Apakah pemula tanpa dasar coding bisa ikut?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Bisa. Kelas bersifat privat 1-on-1, sehingga materi dimulai dari dasar dan tempo disesuaikan dengan kemampuan awalmu.'
            }
          },
          {
            '@type': 'Question',
            name: 'Bolehkah membawa ide proyek sendiri?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sangat boleh. Kelas ini difokuskan langsung untuk mewujudkan ide proyek pribadimu.'
            }
          },
          {
            '@type': 'Question',
            name: 'Bagaimana penentuan jadwal pertemuan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Jadwal 5 sesi pertemuan disepakati bersama antara kamu dan pengajar setelah pendaftaran selesai.'
            }
          },
          {
            '@type': 'Question',
            name: 'Bagaimana cara pembayaran?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pindai QRIS di halaman pendaftaran dengan aplikasi m-Banking atau e-Wallet, lalu kirim bukti transfer ke WhatsApp pengajar.'
            }
          },
          {
            '@type': 'Question',
            name: 'Kapan akses Gemini Pro 3 bulan diberikan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Fasilitas Gemini Pro selama ${APP_CONFIG.geminiProDurationMonths} bulan akan diberikan oleh pengajar setelah pembayaran diverifikasi.`
            }
          }
        ]
      }
    ]
  };
}
