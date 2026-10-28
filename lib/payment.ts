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
 * Dynamic QRIS Payment Service
 * Transforms base QRIS from public/qris.jpeg into dynamic QRIS with exact amount embedded
 */
export class DynamicQrisPaymentService implements PaymentService {
  public providerName = 'Dynamic QRIS (Auto Amount Locked)';

  async createInvoice(params: {
    participantName: string;
    programSlug: ProgramSlug;
  }): Promise<{ success: boolean; transaction?: TransactionRecord; error?: string }> {
    const result = await createTransactionRecord({
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
  return new DynamicQrisPaymentService();
}
