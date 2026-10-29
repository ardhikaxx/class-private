import React from 'react';

interface TechItem {
  name: string;
  category: string;
  description: string;
  highlight: string;
}

export function TechStackSection() {
  const techList: TechItem[] = [
    {
      name: 'Next.js & React',
      category: 'Web Frontend & Fullstack',
      description: 'Framework web modern nomor satu dunia untuk membangun website super cepat dan SEO friendly.',
      highlight: 'Production Ready'
    },
    {
      name: 'Flutter & Dart',
      category: 'Mobile Android & iOS',
      description: 'Teknologi dari Google untuk membangun aplikasi mobile native Android dan iOS dengan satu codebase.',
      highlight: 'Cross-Platform'
    },
    {
      name: 'Tailwind CSS',
      category: 'Modern UI Styling',
      description: 'Desain antarmuka responsif dengan utility-first styling yang clean, ringan, dan fleksibel di semua device.',
      highlight: 'Responsive'
    },
    {
      name: 'TypeScript & JS',
      category: 'Core Language',
      description: 'Bahasa pemrograman standar industri software engineering dunia dengan keamanan tipe data.',
      highlight: 'Industry Standard'
    },
    {
      name: 'Node.js & REST API',
      category: 'Backend & Server',
      description: 'Arsitektur komunikasi data antara aplikasi web, mobile, dan server backend terpusat.',
      highlight: 'Fullstack'
    },
    {
      name: 'Supabase & PostgreSQL',
      category: 'Database & Auth',
      description: 'Penyimpanan data cloud berbasis SQL dengan sistem autentikasi login dan real-time subscription.',
      highlight: 'Cloud Database'
    },
    {
      name: 'Git & GitHub',
      category: 'Version Control',
      description: 'Kelola riwayat kode, kolaborasi proyek, dan bangun portofolio profesional yang siap dilirik rekruter.',
      highlight: 'Portfolio Ready'
    },
    {
      name: 'Gemini Pro AI',
      category: 'AI-Assisted Coding',
      description: 'Akselerasi riset algoritma, auto-debugging, dan eksplorasi solusi kode pintar dengan AI terdepan.',
      highlight: 'Bonus 3 Bulan'
    }
  ];

  return (
    <section id="teknologi" className="py-14 lg:py-20 bg-zinc-950 text-white border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-10">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
            TEKNOLOGI & TOOLS MODERN
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Tech Stack Standar Industri yang Dipelajari
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Kuasai ekosistem pemrograman modern yang paling banyak dicari industri teknologi saat ini.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {techList.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                    {item.highlight}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {item.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
