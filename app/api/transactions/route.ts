import { NextRequest, NextResponse } from 'next/server';
import { getPaymentService } from '@/lib/payment';
import { ProgramSlug, isValidProgramSlug } from '@/lib/programs';
import { validateParticipantName } from '@/lib/transactions';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { participantName, programSlug } = body;

    // Validate participant name
    const nameValidation = validateParticipantName(participantName);
    if (!nameValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: nameValidation.error || 'Nama peserta tidak valid.'
        },
        { status: 400 }
      );
    }

    // Validate program slug
    if (!isValidProgramSlug(programSlug)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Program yang dipilih tidak valid. Pilihan tersedia: website, mobile, atau integrasi.'
        },
        { status: 400 }
      );
    }

    const paymentService = getPaymentService();
    const result = await paymentService.createInvoice({
      participantName: nameValidation.cleanName,
      programSlug: programSlug as ProgramSlug
    });

    if (!result.success || !result.transaction) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Gagal membuat transaksi pembayaran.'
        },
        { status: 500 }
      );
    }

    // Return safe data only
    return NextResponse.json(
      {
        success: true,
        transaction: result.transaction
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('Error handling transaction creation:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'Terjadi kesalahan saat memproses data pendaftaran. Silakan coba lagi.'
      },
      { status: 500 }
    );
  }
}
