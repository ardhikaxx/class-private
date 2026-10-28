import { ImageResponse } from 'next/og';
import { APP_CONFIG } from '@/lib/config';

export const alt = APP_CONFIG.metadata.title;
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 900,
              color: '#000000'
            }}
          >
            P
          </div>
          <span style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', marginLeft: '16px' }}>
            {APP_CONFIG.name}
          </span>
          <span style={{ fontSize: '18px', color: '#a1a1aa', marginLeft: '16px', fontFamily: 'monospace' }}>
            • 1-on-1 Mentoring
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1000px' }}>
          <h1
            style={{
              fontSize: '54px',
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0
            }}
          >
            Belajar Bikin Website & Aplikasi Sesuai Ide Proyekmu
          </h1>
          <p style={{ fontSize: '22px', color: '#a1a1aa', marginTop: '20px', lineHeight: 1.4 }}>
            Bimbingan privat intensif 5 pertemuan praktik langsung • Jadwal fleksibel • Bonus Gemini Pro 3 bulan
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '12px 24px',
              borderRadius: '16px',
              fontSize: '20px',
              color: '#ffffff',
              fontWeight: 700
            }}
          >
            Mulai dari Rp 250.000 / paket
          </div>
          <div style={{ fontSize: '18px', color: '#71717a', fontFamily: 'monospace' }}>
            https://class-private.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
