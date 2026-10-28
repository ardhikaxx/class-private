import { ProgramSlug } from './programs';
import { createTransactionRecord, getTransactionByReference } from './transactions';
import { TransactionRecord, PaymentStatus } from '@/types/registration';

export interface PaymentGatewayConfig {
  provider: 'static_qris' | 'midtrans' | 'xendit' | 'tripay' | 'simulator';
  isConfigured: boolean;
  environment: 'development' | 'production';
}

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
 * Standard implementation using the verified local Static QRIS image provided by the user
 * Supported with strict server-side reference generation and exact price verification
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
 * Dynamic Gateway Adapter (Interface template for Midtrans / Xendit / Tripay)
 * Can be activated by providing environment credentials in .env.local
 */
export class DynamicGatewayPaymentService implements PaymentService {
  public providerName: string;
  private apiKey?: string;

  constructor(providerName: string = 'Dynamic Gateway') {
    this.providerName = providerName;
    this.apiKey = process.env.PAYMENT_GATEWAY_API_KEY;
  }

  async createInvoice(params: {
    participantName: string;
    programSlug: ProgramSlug;
  }): Promise<{ success: boolean; transaction?: TransactionRecord; error?: string }> {
    // If external credentials are not set, fall back gracefully to the validated Static QRIS
    if (!this.apiKey) {
      const fallback = new StaticQrisPaymentService();
      return fallback.createInvoice(params);
    }

    // In a fully configured provider, this invokes their official REST API with secret keys
    // Always enforcing the server-side price
    const result = createTransactionRecord({
      participantName: params.participantName,
      programSlug: params.programSlug
    });

    return result;
  }

  async checkPaymentStatus(reference: string): Promise<{
    reference: string;
    status: PaymentStatus;
  }> {
    const tx = getTransactionByReference(reference);
    return {
      reference,
      status: tx ? tx.paymentStatus : 'pending'
    };
  }
}

/**
 * Factory helper to get active payment service
 */
export function getPaymentService(): PaymentService {
  const provider = process.env.PAYMENT_PROVIDER;

  if (provider === 'dynamic' && process.env.PAYMENT_GATEWAY_API_KEY) {
    return new DynamicGatewayPaymentService('External Dynamic Gateway');
  }

  // Default to static QRIS using the supplied public/qris.jpeg
  return new StaticQrisPaymentService();
}
