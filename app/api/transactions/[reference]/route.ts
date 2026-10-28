import { NextRequest, NextResponse } from 'next/server';
import { getTransactionByReference } from '@/lib/transactions';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await context.params;

    if (!reference) {
      return NextResponse.json(
        { success: false, error: 'Reference transaksi wajib disertakan.' },
        { status: 400 }
      );
    }

    const tx = getTransactionByReference(reference);

    if (!tx) {
      return NextResponse.json(
        { success: false, error: 'Transaksi tidak ditemukan.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      transaction: tx
    });
  } catch (err: unknown) {
    console.error('Error fetching transaction:', err);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  }
}
