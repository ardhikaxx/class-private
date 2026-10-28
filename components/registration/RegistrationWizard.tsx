'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProgramSlug, PROGRAMS, isValidProgramSlug } from '@/lib/programs';
import { StepNumber, TransactionRecord } from '@/types/registration';
import { generateDynamicQrisPayload, generateQrisDataUrl } from '@/lib/qris';
import { RegistrationProgress } from './RegistrationProgress';
import { NameStep } from './NameStep';
import { ProgramSelectionStep } from './ProgramSelectionStep';
import { OrderSummary } from './OrderSummary';
import { QRISPaymentPanel } from './QRISPaymentPanel';
import { PaymentInstructions } from './PaymentInstructions';
import { WhatsAppConfirmation } from './WhatsAppConfirmation';
import { AlertCircleIcon } from '@/components/ui/Icons';

const SESSION_STORAGE_KEY = '__pcc_reg_session__';

interface WizardState {
  isMounted: boolean;
  step: StepNumber;
  participantName: string;
  selectedSlug: ProgramSlug | null;
  transaction: TransactionRecord | null;
}

export function RegistrationWizard() {
  const searchParams = useSearchParams();

  const [state, setState] = useState<WizardState>({
    isMounted: false,
    step: 1,
    participantName: '',
    selectedSlug: null,
    transaction: null
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Restore session data asynchronously after client mount to eliminate SSR hydration mismatch
  useEffect(() => {
    let isSubscribed = true;

    const frameId = requestAnimationFrame(() => {
      if (!isSubscribed) return;

      try {
        const urlProgram = searchParams.get('program');
        const validUrlSlug = urlProgram && isValidProgramSlug(urlProgram) ? urlProgram : null;
        const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);

        if (saved) {
          const parsed = JSON.parse(saved);
          const restoredName = typeof parsed.participantName === 'string' ? parsed.participantName : '';
          const restoredSlug = validUrlSlug || (parsed.selectedSlug && isValidProgramSlug(parsed.selectedSlug) ? parsed.selectedSlug : null);
          const restoredStep = parsed.step && [1, 2, 3, 4].includes(parsed.step) ? (parsed.step as StepNumber) : 1;
          const restoredTx: TransactionRecord | null = parsed.transaction && parsed.transaction.amount ? parsed.transaction : null;

          if (restoredTx && !restoredTx.qrisDataUrl) {
            const payload = restoredTx.qrisPayload || generateDynamicQrisPayload(restoredTx.amount);
            generateQrisDataUrl(payload)
              .then((dataUrl) => {
                if (!isSubscribed) return;
                setState({
                  isMounted: true,
                  step: restoredStep,
                  participantName: restoredName,
                  selectedSlug: restoredSlug,
                  transaction: {
                    ...restoredTx,
                    qrisPayload: payload,
                    qrisDataUrl: dataUrl,
                    qrisType: 'dynamic'
                  }
                });
              })
              .catch(() => {
                if (!isSubscribed) return;
                setState({
                  isMounted: true,
                  step: restoredStep,
                  participantName: restoredName,
                  selectedSlug: restoredSlug,
                  transaction: restoredTx
                });
              });
            return;
          }

          setState({
            isMounted: true,
            step: restoredStep,
            participantName: restoredName,
            selectedSlug: restoredSlug,
            transaction: restoredTx
          });
          return;
        }

        setState((prev) => ({
          ...prev,
          isMounted: true,
          selectedSlug: validUrlSlug || prev.selectedSlug
        }));
      } catch {
        setState((prev) => ({ ...prev, isMounted: true }));
      }
    });

    return () => {
      isSubscribed = false;
      cancelAnimationFrame(frameId);
    };
  }, [searchParams]);

  // Sync state to sessionStorage whenever it changes after initial mount
  useEffect(() => {
    if (!state.isMounted) return;
    try {
      const dataToSave = {
        step: state.step,
        participantName: state.participantName,
        selectedSlug: state.selectedSlug,
        transaction: state.transaction
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch {
      // Ignore sessionStorage write errors
    }
  }, [state.isMounted, state.step, state.participantName, state.selectedSlug, state.transaction]);

  // Handler for Step 1 -> Step 2
  const handleNameComplete = (name: string) => {
    setState((prev) => ({
      ...prev,
      participantName: name,
      step: 2
    }));
  };

  // Handler for Step 2 -> Step 3 (Call API to create transaction)
  const handleProgramSelected = async (slug: ProgramSlug) => {
    setState((prev) => ({ ...prev, selectedSlug: slug }));
    setApiError(null);

    // If an existing transaction is already created for the exact same participant & program, reuse it
    if (
      state.transaction &&
      state.transaction.programSlug === slug &&
      state.transaction.participantName === state.participantName &&
      state.transaction.qrisDataUrl
    ) {
      setState((prev) => ({ ...prev, step: 3 }));
      return;
    }

    // Otherwise create a new transaction with fresh unique reference from server
    setIsLoading(true);
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantName: state.participantName,
          programSlug: slug
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setApiError(data.error || 'Gagal menyiapkan data pembayaran. Silakan coba lagi.');
        setIsLoading(false);
        return;
      }

      // If dataUrl wasn't generated by server, generate on client
      let txRecord: TransactionRecord = data.transaction;
      if (!txRecord.qrisDataUrl) {
        try {
          const payload = txRecord.qrisPayload || generateDynamicQrisPayload(txRecord.amount);
          const dataUrl = await generateQrisDataUrl(payload);
          txRecord = {
            ...txRecord,
            qrisPayload: payload,
            qrisDataUrl: dataUrl,
            qrisType: 'dynamic'
          };
        } catch {
          // Keep server record
        }
      }

      setState((prev) => ({
        ...prev,
        transaction: txRecord,
        step: 3
      }));
    } catch {
      setApiError('Koneksi terputus saat menghubungi server. Periksa jaringan Anda dan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for Step 3 -> Step 4
  const handleProceedToWhatsApp = () => {
    setState((prev) => ({ ...prev, step: 4 }));
  };

  // Step 4 back to Step 3
  const handleBackToPayment = () => {
    setState((prev) => ({ ...prev, step: 3 }));
  };

  // Step 3 back to Step 2
  const handleBackToProgramSelection = () => {
    setState((prev) => ({ ...prev, step: 2 }));
  };

  // Step 2 back to Step 1
  const handleBackToName = () => {
    setState((prev) => ({ ...prev, step: 1 }));
  };

  // If not yet mounted on client, render deterministic futuristic loading skeleton
  if (!state.isMounted) {
    return (
      <div className="w-full space-y-8 animate-pulse">
        {/* Skeleton Progress */}
        <div className="w-full max-w-2xl mx-auto px-4">
          <div className="h-1 bg-white/10 rounded-full w-full" />
          <div className="flex justify-between mt-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/10" />
                <div className="h-3 w-14 bg-white/10 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton Form Card */}
        <div className="max-w-xl mx-auto bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="space-y-3 text-center">
            <div className="h-6 w-32 bg-white/10 rounded-full mx-auto" />
            <div className="h-8 w-64 bg-white/15 rounded-xl mx-auto" />
            <div className="h-4 w-72 bg-white/10 rounded-lg mx-auto" />
          </div>
          <div className="space-y-4 pt-4">
            <div className="h-14 bg-white/5 border border-white/10 rounded-2xl" />
            <div className="h-12 bg-white/20 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const selectedProgram = state.selectedSlug ? PROGRAMS[state.selectedSlug] : null;

  return (
    <div className="w-full">
      {/* Step Indicator Progress Bar */}
      <RegistrationProgress currentStep={state.step} />

      {/* Global Error Banner if API call fails */}
      {apiError && (
        <div className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-rose-950/50 border border-rose-500/30 text-rose-200 backdrop-blur-xl flex items-start gap-3">
          <AlertCircleIcon className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-bold block text-rose-300">Pemberitahuan Sistem:</span>
            <p>{apiError}</p>
          </div>
        </div>
      )}

      {/* Loading Overlay when generating transaction */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900/90 border border-white/15 rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl backdrop-blur-2xl">
            <div className="w-12 h-12 border-3 border-white border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="font-bold text-white text-base tracking-tight">
              Menyiapkan Tagihan & QRIS Dinamis...
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Mengunci nominal tagihan resmi dan mengonversi QRIS dengan checksum EMVCo.
            </p>
          </div>
        </div>
      )}

      {/* STEP 1: Full Name */}
      {state.step === 1 && (
        <NameStep initialName={state.participantName} onNext={handleNameComplete} />
      )}

      {/* STEP 2: Program Selection */}
      {state.step === 2 && (
        <ProgramSelectionStep
          participantName={state.participantName}
          initialSlug={state.selectedSlug}
          onNext={handleProgramSelected}
          onBack={handleBackToName}
        />
      )}

      {/* STEP 3: Order Summary & QRIS Payment */}
      {state.step === 3 && selectedProgram && state.transaction && (
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* On mobile: Order Summary comes first so user knows exact amount */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
              <OrderSummary
                participantName={state.participantName}
                program={selectedProgram}
                transaction={state.transaction}
                onEditProgram={handleBackToProgramSelection}
                onEditName={handleBackToName}
              />
              <PaymentInstructions />
            </div>

            {/* QRIS Display Panel */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <QRISPaymentPanel
                program={selectedProgram}
                transaction={state.transaction}
                onProceedToWhatsApp={handleProceedToWhatsApp}
                onBack={handleBackToProgramSelection}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: WhatsApp Confirmation & Screenshot Proof Instructions */}
      {state.step === 4 && selectedProgram && state.transaction && (
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Order Summary & Instructions */}
            <div className="lg:col-span-5 space-y-6">
              <OrderSummary
                participantName={state.participantName}
                program={selectedProgram}
                transaction={state.transaction}
                compact
              />
              <PaymentInstructions />
            </div>

            {/* WhatsApp Confirmation Interactive Panel */}
            <div className="lg:col-span-7">
              <WhatsAppConfirmation
                participantName={state.participantName}
                program={selectedProgram}
                transaction={state.transaction}
                onBackToPayment={handleBackToPayment}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
