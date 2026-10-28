import { APP_CONFIG } from './config';
import { formatRupiah } from './programs';

export interface WhatsAppMessagePayload {
  participantName: string;
  programName: string;
  amount: number;
  meetingsCount?: number;
  bonusFacility?: string;
  transactionReference?: string;
  paymentStatusLabel?: string;
}

/**
 * Builds the exact official WhatsApp confirmation message template
 */
export function buildWhatsAppConfirmationText(payload: WhatsAppMessagePayload): string {
  const {
    participantName,
    programName,
    amount,
    meetingsCount = APP_CONFIG.meetingsCount,
    bonusFacility = `Gemini Pro selama ${APP_CONFIG.geminiProDurationMonths} bulan`,
    transactionReference,
    paymentStatusLabel = 'Menunggu Pembayaran / Verifikasi Bukti Transfer'
  } = payload;

  const lines: string[] = [
    'Halo, saya ingin melakukan konfirmasi pendaftaran Private Coding Class.',
    '',
    `Nama peserta: ${participantName}`,
    `Program: ${programName}`,
    `Biaya program: ${formatRupiah(amount)}`,
    `Jumlah pertemuan: ${meetingsCount} kali pertemuan`,
    `Fasilitas: ${bonusFacility}`
  ];

  if (transactionReference && transactionReference.trim() !== '') {
    lines.push(`Reference transaksi: ${transactionReference}`);
  }

  lines.push(`Status pembayaran: ${paymentStatusLabel}`);
  lines.push('');
  lines.push(
    'Saya sudah mendapatkan informasi pembayaran dan akan mengirimkan screenshot bukti pembayaran melalui chat WhatsApp ini setelah melakukan pembayaran.'
  );
  lines.push('');
  lines.push(
    'Mohon informasi untuk proses verifikasi pembayaran dan langkah selanjutnya. Terima kasih.'
  );

  return lines.join('\n');
}

/**
 * Generates the official direct wa.me link for order confirmation
 */
export function buildWhatsAppConfirmationUrl(payload: WhatsAppMessagePayload): string {
  const text = buildWhatsAppConfirmationText(payload);
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${APP_CONFIG.whatsapp.intlNumber}?text=${encodedText}`;
}

/**
 * Generates a consultation wa.me link for questions/advice
 */
export function buildWhatsAppConsultationUrl(context?: string): string {
  let message =
    'Halo, saya ingin konsultasi mengenai Private Coding Class. Saya punya ide proyek yang ingin saya buat dan ingin tahu program mana yang paling sesuai.';

  if (context) {
    message = `Halo, saya ingin konsultasi mengenai Private Coding Class (topik: ${context}). Boleh minta informasi lebih lanjut terkait pembelajaran dan jadwal? Terima kasih.`;
  }

  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${APP_CONFIG.whatsapp.intlNumber}?text=${encodedText}`;
}
