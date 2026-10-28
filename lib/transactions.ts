import { ALL_PROGRAM_SLUGS, PROGRAMS, ProgramSlug } from './programs';
import { APP_CONFIG } from './config';
import { TransactionRecord, PaymentStatus, RegistrationStatus } from '@/types/registration';

// In-memory store on globalThis for development persistence
declare global {
  var __pcc_transactions_store__: Map<string, TransactionRecord> | undefined;
}

if (!globalThis.__pcc_transactions_store__) {
  globalThis.__pcc_transactions_store__ = new Map<string, TransactionRecord>();
}

const store = globalThis.__pcc_transactions_store__;

/**
 * Generates a unique transaction reference formatted as PCC-YYYYMMDD-XXXX
 */
export function generateReference(): string {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;

  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `PCC-${dateStr}-${rand}`;
}

/**
 * Validates participant name
 */
export function validateParticipantName(name: unknown): { isValid: boolean; error?: string; cleanName: string } {
  if (typeof name !== 'string') {
    return { isValid: false, error: 'Nama peserta harus berupa teks.', cleanName: '' };
  }

  const clean = name.trim().replace(/\s+/g, ' ');

  if (clean.length === 0) {
    return { isValid: false, error: 'Nama lengkap wajib diisi.', cleanName: '' };
  }

  if (clean.length < 3) {
    return { isValid: false, error: 'Nama peserta minimal 3 karakter.', cleanName: clean };
  }

  if (clean.length > 60) {
    return { isValid: false, error: 'Nama peserta maksimal 60 karakter.', cleanName: clean };
  }

  // Prevent simple script/HTML injections
  if (/[<>{}]/.test(clean)) {
    return { isValid: false, error: 'Nama peserta tidak boleh mengandung karakter khusus berbahaya.', cleanName: clean };
  }

  return { isValid: true, cleanName: clean };
}

/**
 * Server-side creation of a transaction
 * Enforces price from the server config — never client request
 */
export function createTransactionRecord(params: {
  participantName: string;
  programSlug: string;
}): { success: true; transaction: TransactionRecord } | { success: false; error: string } {
  const nameValidation = validateParticipantName(params.participantName);
  if (!nameValidation.isValid) {
    return { success: false, error: nameValidation.error || 'Nama peserta tidak valid.' };
  }

  if (!ALL_PROGRAM_SLUGS.includes(params.programSlug as ProgramSlug)) {
    return { success: false, error: 'Program yang dipilih tidak valid.' };
  }

  const slug = params.programSlug as ProgramSlug;
  const program = PROGRAMS[slug];

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours expiry
  const reference = generateReference();
  const id = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const transaction: TransactionRecord = {
    id,
    reference,
    participantName: nameValidation.cleanName,
    programSlug: slug,
    programName: program.name,
    amount: program.price, // STRICTLY from server configuration!
    paymentStatus: 'pending',
    registrationStatus: 'pending_confirmation',
    qrisUrl: APP_CONFIG.qris.staticImageUrl,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    notes: 'Tagihan resmi Private Coding Class. Pembayaran melalui QRIS dan konfirmasi via WhatsApp.'
  };

  store.set(reference, transaction);
  return { success: true, transaction };
}

/**
 * Retrieve transaction by reference
 */
export function getTransactionByReference(reference: string): TransactionRecord | undefined {
  if (!reference) return undefined;
  return store.get(reference);
}

/**
 * Update transaction payment status
 */
export function updateTransactionStatus(
  reference: string,
  updates: {
    paymentStatus?: PaymentStatus;
    registrationStatus?: RegistrationStatus;
  }
): TransactionRecord | undefined {
  const existing = store.get(reference);
  if (!existing) return undefined;

  const updated: TransactionRecord = {
    ...existing,
    ...(updates.paymentStatus && { paymentStatus: updates.paymentStatus }),
    ...(updates.registrationStatus && { registrationStatus: updates.registrationStatus })
  };

  store.set(reference, updated);
  return updated;
}
