import React from 'react';
import { StepNumber } from '@/types/registration';
import { CheckIcon } from '@/components/ui/Icons';

interface RegistrationProgressProps {
  currentStep: StepNumber;
}

export function RegistrationProgress({ currentStep }: RegistrationProgressProps) {
  const steps = [
    { number: 1, label: 'Nama Lengkap' },
    { number: 2, label: 'Pilih Program' },
    { number: 3, label: 'Pembayaran QRIS' },
    { number: 4, label: 'Konfirmasi WhatsApp' }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-12">
      {/* Visual Steps Track */}
      <div className="relative flex items-center justify-between">
        {/* Horizontal line background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 -z-0" />
        
        {/* Active progress bar */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-200 border-2 ${
                  isCompleted
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                    : isCurrent
                    ? 'bg-white border-indigo-600 text-indigo-700 shadow-md ring-4 ring-indigo-500/15'
                    : 'bg-white border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? <CheckIcon className="w-4 h-4 text-white" /> : step.number}
              </div>

              <span
                className={`mt-2 text-[11px] sm:text-xs font-semibold whitespace-nowrap hidden sm:block ${
                  isCurrent ? 'text-indigo-700 font-bold' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile step label below track */}
      <div className="sm:hidden text-center mt-3 text-xs font-bold text-indigo-700">
        Langkah {currentStep} dari 4: {steps[currentStep - 1].label}
      </div>
    </div>
  );
}
