'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProgramSlug, PROGRAMS, isValidProgramSlug } from '@/lib/programs';
import { StepNumber, TransactionRecord } from '@/types/registration';
import { RegistrationProgress } from './RegistrationProgress';
import { NameStep } from './NameStep';
import { ProgramSelectionStep } from './ProgramSelectionStep';
import { OrderSummary } from './OrderSummary';
import { QRISPaymentPanel } from './QRISPaymentPanel';
import { PaymentInstructions } from './PaymentInstructions';
import { WhatsAppConfirmation } from './WhatsAppConfirmation';
import { AlertCircleIcon } from '@/components/ui/Icons';

const SESSION_STORAGE_KEY = '__pcc_reg_session__';

function getInitialSessionData() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function RegistrationWizard() {
  const searchParams = useSearchParams();

  // Initialize state lazily to avoid setState cascading in useEffect
  const [step, setStep] = useState<StepNumber>(() => {
    const session = getInitialSessionData();
    if (session?.step && [1, 2, 3, 4].includes(session.step)) {
      return session.step as StepNumber;
    }
    return 1;
  });

  const [participantName, setParticipantName] = useState<string>(() => {
    const session = getInitialSessionData();
    return session?.participantName || '';
  });

  const [selectedSlug, setSelectedSlug] = useState<ProgramSlug | null>(() => {
    const urlProgram = searchParams.get('program');
    if (urlProgram && isValidProgramSlug(urlProgram)) {
      return urlProgram;
    }
    const session = getInitialSessionData();
    if (session?.selectedSlug && isValidProgramSlug(session.selectedSlug)) {
      return session.selectedSlug;
    }
    return null;
  });

  const [transaction, setTransaction] = useState<TransactionRecord | null>(() => {
    const session = getInitialSessionData();
    return session?.transaction || null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Sync state changes out to sessionStorage
  useEffect(() => {
    try {
      const dataToSave = {
        step,
        participantName,
        selectedSlug,
        transaction
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // Ignore sessionStorage errors
    }
  }, [step, participantName, selectedSlug, transaction]);

  // Handler for Step 1 -> Step 2
  const handleNameComplete = (name: string) => {
    setParticipantName(name);
    setStep(2);
  };

  // Handler for Step 2 -> Step 3 (Call API to create transaction)
  const handleProgramSelected = async (slug: ProgramSlug) => {
    setSelectedSlug(slug);
    setApiError(null);

    // If an existing transaction is already created for the exact same participant & program, reuse it
    if (
      transaction &&
      transaction.programSlug === slug &&
      transaction.participantName === participantName
    ) {
      setStep(3);
      return;
    }

    // Otherwise create a new transaction with fresh unique reference from server
    setIsLoading(true);
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantName,
          programSlug: slug
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setApiError(data.error || 'Gagal menyiapkan data pembayaran. Silakan coba lagi.');
        setIsLoading(false);
        return;
      }

      setTransaction(data.transaction);
      setStep(3);
    } catch {
      setApiError('Koneksi terputus saat menghubungi server. Periksa jaringan Anda dan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for Step 3 -> Step 4
  const handleProceedToWhatsApp = () => {
    setStep(4);
  };

  // Step 4 back to Step 3
  const handleBackToPayment = () => {
    setStep(3);
  };

  // Step 3 back to Step 2
  const handleBackToProgramSelection = () => {
    setStep(2);
  };

  // Step 2 back to Step 1
  const handleBackToName = () => {
    setStep(1);
  };

  const selectedProgram = selectedSlug ? PROGRAMS[selectedSlug] : null;

  return (
    <div className="w-full">
      {/* Step Indicator Progress Bar */}
      <RegistrationProgress currentStep={step} />

      {/* Global Error Banner if API call fails */}
      {apiError && (
        <div className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
          <AlertCircleIcon className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-bold block">Pemberitahuan Sistem:</span>
            <p>{apiError}</p>
          </div>
        </div>
      )}

      {/* Loading Overlay when generating transaction */}
      {isLoading && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">
              Menyiapkan Tagihan & QRIS Resmi...
            </h3>
            <p className="text-xs text-slate-500">
              Menghitung nominal pasti dari server dan membuat kode referensi unik pendaftaranmu.
            </p>
          </div>
        </div>
      )}

      {/* STEP 1: Full Name */}
      {step === 1 && (
        <NameStep initialName={participantName} onNext={handleNameComplete} />
      )}

      {/* STEP 2: Program Selection */}
      {step === 2 && (
        <ProgramSelectionStep
          participantName={participantName}
          initialSlug={selectedSlug}
          onNext={handleProgramSelected}
          onBack={handleBackToName}
        />
      )}

      {/* STEP 3: Order Summary & QRIS Payment */}
      {step === 3 && selectedProgram && transaction && (
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* On mobile: Order Summary comes first so user knows exact amount */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <OrderSummary
                participantName={participantName}
                program={selectedProgram}
                transaction={transaction}
                onEditProgram={handleBackToProgramSelection}
                onEditName={handleBackToName}
              />
              <PaymentInstructions />
            </div>

            {/* QRIS Display Panel */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <QRISPaymentPanel
                program={selectedProgram}
                transaction={transaction}
                onProceedToWhatsApp={handleProceedToWhatsApp}
                onBack={handleBackToProgramSelection}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: WhatsApp Confirmation & Screenshot Proof Instructions */}
      {step === 4 && selectedProgram && transaction && (
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Order Summary & Instructions */}
            <div className="lg:col-span-5 space-y-6">
              <OrderSummary
                participantName={participantName}
                program={selectedProgram}
                transaction={transaction}
                compact
              />
              <PaymentInstructions />
            </div>

            {/* WhatsApp Confirmation Interactive Panel */}
            <div className="lg:col-span-7">
              <WhatsAppConfirmation
                participantName={participantName}
                program={selectedProgram}
                transaction={transaction}
                onBackToPayment={handleBackToPayment}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
