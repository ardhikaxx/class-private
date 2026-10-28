import { ProgramSlug } from './programs';
import { createTransactionRecord, getTransactionByReference } from './transactions';
import { TransactionRecord, PaymentStatus } from '@/types/registration';

export interface PaymentService {
  providerName: string;
  createInvoice(params: {
    participantName: string;
    programSlug: ProgramSlug;
  }): Promise<{ success: boolean; transaction?: TransactionRecord; error?: string }>;
  checkPaymentStatus(reference: string): Promise<{
    reference: string;
    status: PaymentStatus;
    paidAt?: string;
  }>;
}

/**
 * Static QRIS Payment Service using local public/qris.jpeg
 * Hardcoded directly in code as requested
 */
export class StaticQrisPaymentService implements PaymentService {
  public providerName = 'Static QRIS (User Provided Image)';

  async createInvoice(params: {
    participantName: string;
    programSlug: ProgramSlug;
  }): Promise<{ success: boolean; transaction?: TransactionRecord; error?: string }> {
    const result = createTransactionRecord({
      participantName: params.participantName,
      programSlug: params.programSlug
    });

    if (!result.success) {
      return { success: false, error: result.error };
    }

    return {
      success: true,
      transaction: result.transaction
    };
  }

  async checkPaymentStatus(reference: string): Promise<{
    reference: string;
    status: PaymentStatus;
  }> {
    const tx = getTransactionByReference(reference);
    if (!tx) {
      return { reference, status: 'pending' };
    }
    return {
      reference,
      status: tx.paymentStatus
    };
  }
}

/**
 * Returns the active payment service directly
 */
export function getPaymentService(): PaymentService {
  return new StaticQrisPaymentService();
}
