import { ProgramSlug } from '@/lib/programs';

export type StepNumber = 1 | 2 | 3 | 4;

export type PaymentStatus =
  | 'pending'
  | 'awaiting_verification'
  | 'paid'
  | 'expired'
  | 'failed';

export type RegistrationStatus =
  | 'pending_confirmation'
  | 'awaiting_verification'
  | 'confirmed'
  | 'cancelled';

export interface TransactionRecord {
  id: string;
  reference: string;
  participantName: string;
  programSlug: ProgramSlug;
  programName: string;
  amount: number;
  paymentStatus: PaymentStatus;
  registrationStatus: RegistrationStatus;
  qrisUrl: string;
  qrisPayload: string;
  qrisDataUrl: string;
  qrisType: 'static' | 'dynamic';
  createdAt: string;
  expiresAt: string;
  notes?: string;
}

export interface RegistrationState {
  step: StepNumber;
  participantName: string;
  selectedSlug: ProgramSlug | null;
  transaction: TransactionRecord | null;
  isLoading: boolean;
  error: string | null;
}

export interface CreateTransactionRequest {
  participantName: string;
  programSlug: string;
}

export interface CreateTransactionResponse {
  success: boolean;
  transaction?: TransactionRecord;
  message?: string;
}
