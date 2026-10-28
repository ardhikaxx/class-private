# Private Coding Class — Landing Page & Sistem Pendaftaran Online

Landing page resmi dan sistem pendaftaran bertahap (wizard) untuk **Private Coding Class**. Platform ini dirancang khusus untuk mempromosikan program bimbingan privat 1-on-1 belajar membangun website, aplikasi mobile, maupun integrasi website dan aplikasi mobile sesuai ide dan kebutuhan proyek peserta.

Dibangun dengan **Next.js (App Router)**, **React 19**, **TypeScript**, dan **Tailwind CSS**, dengan arsitektur modular, validasi ketat di sisi server, harga terpusat, integrasi pembayaran QRIS resmi, serta tautan otomatis ke WhatsApp pengajar.

---

## 🌟 Fitur Utama

1. **Landing Page Profesional & Informatif**:
   - **Hero Section**: Headline kuat, badge informasi kunci (3 program, 5 pertemuan, jadwal fleksibel, bonus Gemini Pro 3 bulan), mockup visual kode interaktif, dan dual CTA (Pilih Kelas & Konsultasi WhatsApp).
   - **Tantangan vs Solusi**: Membedah kenapa belajar mandiri sering buntu dan bagaimana pendampingan 1-on-1 menjembatani kesulitan tersebut secara realistis tanpa janji palsu.
   - **3 Pilihan Program Terpusat**:
     - **Class Website** (`Rp250.000`): Pembuatan website dari antarmuka responsif hingga database.
     - **Class Aplikasi Mobile** (`Rp300.000`): Pembuatan aplikasi mobile Android/iOS, navigasi layar, state management, & API.
     - **Class Integrasi Website & Mobile** (`Rp450.000`): Solusi ekosistem terlengkap dengan shared backend, database bersama, & sinkronisasi data. Penekanan visual premium tanpa diskon palsu.
   - **Apa yang Kamu Dapatkan (Fasilitas)**: 5 sesi privat 1-on-1, bimbingan praktik langsung, penyesuaian tempo belajar, jadwal fleksibel, akses Gemini Pro 3 bulan, serta transparansi ruang lingkup edukasi vs joki.
   - **Alur Pendaftaran Sederhana**: 4 tahapan jelas dari memilih kelas hingga menyepakati jadwal.
   - **FAQ Interaktif**: Jawaban transparan mengenai kemampuan awal, teknologi, ide proyek, pembayaran, dan ketentuan Gemini Pro.
   - **Footer & Navbar Responsif**: Navigasi anchor mulus, tautan konsultasi WhatsApp resmi, dan drawer menu untuk perangkat seluler.

2. **Wizard Pendaftaran 4 Langkah (`/daftar`)**:
   - **Tahap 1 (Nama Lengkap)**: Validasi nama peserta (minimal 3 karakter, sanitasi spasi, tanpa meminta data sensitif yang tidak relevan).
   - **Tahap 2 (Pilih Program)**: Pemilihan kartu interaktif dengan radio checkmark. Otomatis terpilih jika datang dari tombol beranda via query parameter (`/daftar?program=website`), dengan fleksibilitas untuk berganti program sebelum pembayaran.
   - **Tahap 3 (Ringkasan & Pembayaran QRIS)**:
     - Tampilan kode QRIS resmi (`/qris.jpeg`) dari user.
     - Nominal tagihan pasti dari server (Rp 250.000 / Rp 300.000 / Rp 450.000) dengan tombol salin angka.
     - Kode referensi transaksi unik yang digenerate oleh server (`PCC-YYYYMMDD-XXXX`).
     - Instruksi verifikasi nominal manual dan waktu berlaku referensi (24 jam).
   - **Tahap 4 (Konfirmasi WhatsApp & Bukti Transfer)**:
     - Tombol aksi utama **"Konfirmasi Pendaftaran via WhatsApp"** menuju nomor pengajar `6285933648537`.
     - Pesan WhatsApp terformat otomatis sesuai standar resmi dengan data peserta, nama program, biaya, referensi transaksi, dan status verifikasi.
     - Panduan 3 langkah "Setelah Membayar": simpan screenshot bukti bayar, buka chat WhatsApp, dan kirimkan screenshot bukti transfer untuk diverifikasi pengajar.
     - Pengingat keamanan penting untuk tidak pernah memberikan PIN, kata sandi, atau OTP.

3. **Keamanan & Konsistensi Data**:
   - Seluruh harga program dikelola dari satu file konfigurasi (`lib/programs.ts`).
   - Nominal tagihan transaksi dihasilkan secara ketat oleh endpoint server (`/api/transactions`) berdasarkan konfigurasi resmi, bukan dari parameter harga di browser yang dapat dimanipulasi.
   - Lapisan abstraksi pembayaran (`lib/payment.ts`) yang memisahkan implementasi QRIS saat ini (Static QRIS) dengan kesiapan integrasi dynamic payment gateway (Midtrans / Xendit / Tripay).

---

## 🛠️ Struktur Direktori Proyek

```text
class-private/
├── app/
│   ├── api/
│   │   └── transactions/
│   │       ├── route.ts                 # Endpoint pembuatan transaksi resmi & validasi server
│   │       └── [reference]/
│   │           └── route.ts             # Endpoint pengecekan status transaksi
│   ├── daftar/
│   │   └── page.tsx                     # Halaman pendaftaran bertahap (Server Component + Suspense)
│   ├── globals.css                      # Tailwind CSS v4 styling & theme tokens
│   ├── layout.tsx                       # Root Layout dengan metadata SEO & bahasa Indonesia (id)
│   └── page.tsx                         # Landing Page utama
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                   # Header navigasi & tombol WhatsApp konsultasi
│   │   └── Footer.tsx                   # Footer & informasi kontak resmi
│   ├── landing/
│   │   ├── HeroSection.tsx              # Hero banner, highlight badges, & code visual preview
│   │   ├── ProblemSection.tsx           # Analisis kendala calon peserta vs solusi mentoring
│   │   ├── ProgramSection.tsx           # Grid 3 kartu program resmi
│   │   ├── ProgramCard.tsx              # Kartu program modular & tombol daftar
│   │   ├── BenefitsSection.tsx          # Fasilitas, durasi 5 sesi, & bonus Gemini Pro
│   │   ├── LearningFlowSection.tsx      # Roadmap tahapan pendaftaran & pembelajaran
│   │   ├── FAQSection.tsx               # Accordion pertanyaan yang sering diajukan
│   │   └── FinalCTASection.tsx          # Banner penutup ajakan mendaftar
│   ├── registration/
│   │   ├── RegistrationWizard.tsx       # State manager pendaftaran & session persistence
│   │   ├── RegistrationProgress.tsx     # Indikator progres 4 langkah visual
│   │   ├── NameStep.tsx                 # Tahap 1: Input nama lengkap
│   │   ├── ProgramSelectionStep.tsx     # Tahap 2: Pemilihan program interaktif
│   │   ├── OrderSummary.tsx             # Ringkasan pesanan & total biaya
│   │   ├── QRISPaymentPanel.tsx         # Tampilan QRIS, salin nominal, & salin referensi
│   │   ├── PaymentInstructions.tsx      # Panduan screenshot bukti bayar & keamanan
│   │   └── WhatsAppConfirmation.tsx     # Tombol WhatsApp & preview pesan otomatis
│   └── ui/
│       ├── Badge.tsx                    # Komponen pill badge serbaguna
│       └── Icons.tsx                    # Kumpulan icon SVG ringan tanpa dependensi eksternal
├── lib/
│   ├── config.ts                        # Konfigurasi umum aplikasi & kontak pengajar
│   ├── payment.ts                       # Abstraksi PaymentService & Adapter
│   ├── programs.ts                      # Sumber kebenaran tunggal data program & harga
│   ├── transactions.ts                  # Server repository & generator referensi transaksi
│   └── whatsapp.ts                      # Generator format pesan & URL WhatsApp resmi
├── public/
│   └── qris.jpeg                        # Gambar kode QRIS resmi penyedia
├── types/
│   └── registration.ts                  # Definisi tipe data TypeScript pendaftaran
├── .env.example                         # Contoh variabel lingkungan
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Panduan Menjalankan Proyek

### Prasyarat
- **Node.js** versi 18.18.0 atau lebih baru (disarankan Node.js 20 LTS).
- **npm** (atau package manager bawaan).

### 1. Instalasi Dependensi
Jalankan perintah berikut di terminal root proyek:
```bash
npm install
```

### 2. Konfigurasi Lingkungan (.env.local)
Salin berkas `.env.example` menjadi `.env.local`:
```bash
cp .env.example .env.local
```

Isi variabel sesuai kebutuhan:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=6285933648537
PAYMENT_PROVIDER=static_qris
```

| Variabel | Wajib / Opsional | Keterangan |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Opsional di dev, Wajib di prod | Domain publik aplikasi web |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Opsional (default ada di config) | Nomor WhatsApp tujuan konfirmasi |
| `PAYMENT_PROVIDER` | Opsional (default `static_qris`) | Mode pembayaran: `static_qris` atau `dynamic` |
| `PAYMENT_GATEWAY_API_KEY` | Opsional | Secret key jika beralih ke dynamic gateway |

### 3. Menjalankan Server Development
```bash
npm run dev
```
Buka peramban di `http://localhost:3000`.

### 4. Menjalankan Pemeriksaan Kode (Type Check & Lint)
```bash
npm run lint
```

### 5. Membangun Versi Produksi (Production Build)
```bash
npm run build
npm run start
```

---

## 💳 Panduan Sistem Pembayaran QRIS

Sistem saat ini menggunakan mode **Static QRIS** dengan berkas gambar resmi `public/qris.jpeg`.

### Alur Transaksi:
1. Peserta memilih program (Website `Rp250.000`, Mobile `Rp300.000`, atau Integrasi `Rp450.000`).
2. Client mengirimkan request pembuatan transaksi ke server via `POST /api/transactions`.
3. Server memvalidasi program slug, menetapkan harga dari konfigurasi resmi (`PROGRAMS[slug].price`), dan membuat nomor referensi unik format `PCC-YYYYMMDD-XXXX`.
4. Halaman menampilkan kode QRIS dan nominal tagihan.
5. Karena menggunakan QRIS statis, peserta memindai QRIS dan menginput/memastikan nominal di aplikasi m-Banking/e-Wallet sesuai angka tagihan.
6. Peserta menyimpan screenshot bukti transfer berhasil, kemudian mengklik tombol WhatsApp untuk mengirimkan teks konfirmasi beserta bukti transfer ke pengajar.
7. Pengajar memverifikasi mutasi dan bukti pembayaran, lalu menghubungi peserta untuk menyepakati jadwal kelas.

### Langkah Aktivasi Dynamic Payment Gateway (Opsional untuk Masa Depan):
Jika di kemudian hari ingin beralih ke dynamic gateway (seperti Midtrans Snap/Core API, Xendit Invoices, atau Tripay Closed Payment):
1. Daftarkan akun merchant pada penyedia pilihan.
2. Tambahkan secret key pada `.env.local`:
   ```env
   PAYMENT_PROVIDER=dynamic
   PAYMENT_GATEWAY_API_KEY=your_secret_key_here
   PAYMENT_GATEWAY_MERCHANT_ID=your_merchant_id
   ```
3. Implementasikan pemanggilan API resmi pada kelas `DynamicGatewayPaymentService` di `lib/payment.ts`.
4. Atur webhook callback URL pada dashboard provider ke endpoint `/api/webhooks/payment` dengan validasi signature HMAC.

---

## 📱 Format Pesan Konfirmasi WhatsApp Resmi

Tautan WhatsApp menggunakan skema resmi `https://wa.me/6285933648537?text=...` dengan teks yang di-encode secara aman menggunakan `encodeURIComponent`.

Format pesan yang dihasilkan secara otomatis:
```text
Halo, saya ingin melakukan konfirmasi pendaftaran Private Coding Class.

Nama peserta: [NAMA LENGKAP]
Program: [NAMA PROGRAM]
Biaya program: [NOMINAL]
Jumlah pertemuan: 5 kali pertemuan
Fasilitas: Gemini Pro selama 3 bulan
Reference transaksi: [REFERENCE TRANSAKSI]
Status pembayaran: Menunggu Verifikasi Bukti Pembayaran

Saya sudah mendapatkan informasi pembayaran dan akan mengirimkan screenshot bukti pembayaran melalui chat WhatsApp ini setelah melakukan pembayaran.

Mohon informasi untuk proses verifikasi pembayaran dan langkah selanjutnya. Terima kasih.
```

---

## 🔒 Prinsip Transparansi & Keamanan
- Tidak ada klaim bahwa pembayaran otomatis lunas hanya karena tombol ditekan.
- Status pembayaran ditampilkan secara jujur sebagai `Menunggu Pembayaran` / `Menunggu Verifikasi Bukti Pembayaran`.
- Tidak ada pembagian nomor PIN, kata sandi, atau kode OTP pada instruksi apa pun.
- Jadwal 5 pertemuan bersifat fleksibel dan disepakati setelah verifikasi pembayaran.
