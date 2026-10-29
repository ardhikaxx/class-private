import { APP_CONFIG } from './config';
import { ALL_PROGRAMS } from './programs';
import { FAQS } from './faqs';

export function getStructuredData() {
  const baseUrl = APP_CONFIG.metadata.siteUrl;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // 1. WebSite Schema
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: APP_CONFIG.name,
        description: APP_CONFIG.metadata.description,
        inLanguage: 'id-ID',
        publisher: {
          '@id': `${baseUrl}/#organization`
        }
      },

      // 2. Organization & ProfessionalService Schema
      {
        '@type': ['EducationalOrganization', 'ProfessionalService'],
        '@id': `${baseUrl}/#organization`,
        name: APP_CONFIG.name,
        url: baseUrl,
        logo: `${baseUrl}/opengraph-image`,
        image: `${baseUrl}/opengraph-image`,
        description: APP_CONFIG.description,
        telephone: `+${APP_CONFIG.whatsapp.intlNumber}`,
        priceRange: 'Rp 250.000 - Rp 450.000',
        currenciesAccepted: 'IDR',
        paymentAccepted: 'QRIS, Bank Transfer, GoPay, OVO, Dana, ShopeePay',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'ID'
        },
        areaServed: {
          '@type': 'Country',
          name: 'Indonesia'
        },
        availableLanguage: ['Indonesian', 'English'],
        knowsAbout: [
          'Web Development',
          'Mobile App Development',
          'Next.js',
          'React',
          'Flutter',
          'Tailwind CSS',
          'TypeScript',
          'REST API',
          'PostgreSQL',
          'Fullstack Development',
          'Artificial Intelligence Prompting'
        ],
        sameAs: [
          `https://wa.me/${APP_CONFIG.whatsapp.intlNumber}`
        ]
      },

      // 3. Courses Schema
      ...ALL_PROGRAMS.map((program) => ({
        '@type': 'Course',
        '@id': `${baseUrl}/#course-${program.slug}`,
        name: `${program.name} — Bimbingan Privat 1-on-1`,
        description: program.description,
        provider: {
          '@type': 'EducationalOrganization',
          '@id': `${baseUrl}/#organization`,
          name: APP_CONFIG.name
        },
        courseMode: 'online',
        inLanguage: 'id-ID',
        educationalCredentialAwarded: 'Portofolio Aplikasi & Full Source Code Proyek',
        offers: {
          '@type': 'Offer',
          price: program.price,
          priceCurrency: 'IDR',
          category: 'Paid',
          availability: 'https://schema.org/InStock',
          url: `${baseUrl}/daftar?program=${program.slug}`
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT10H'
        }
      })),

      // 4. Breadcrumb Schema
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: baseUrl
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Pilihan Kelas',
            item: `${baseUrl}/#program`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Pendaftaran',
            item: `${baseUrl}/daftar`
          }
        ]
      },

      // 5. FAQPage Schema
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}/#faq`,
        mainEntity: FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  };
}
