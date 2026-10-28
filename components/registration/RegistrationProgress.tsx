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
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/15 -z-0" />
        
        {/* Active progress bar */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-white transition-all duration-300 -z-0 shadow-sm shadow-white"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all duration-200 border ${
                  isCompleted
                    ? 'bg-white border-white text-black shadow-md shadow-white/20'
                    : isCurrent
                    ? 'bg-zinc-950 border-white text-white shadow-lg shadow-white/10 ring-4 ring-white/20'
                    : 'bg-zinc-900 border-white/20 text-zinc-500'
                }`}
              >
                {isCompleted ? <CheckIcon className="w-4 h-4 text-black" /> : step.number}
              </div>

              <span
                className={`mt-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider whitespace-nowrap hidden sm:block ${
                  isCurrent ? 'text-white' : isCompleted ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile step label below track */}
      <div className="sm:hidden text-center mt-3 text-xs font-mono font-bold text-white uppercase tracking-wider">
        LANGKAH {currentStep}/4: {steps[currentStep - 1].label}
      </div>
    </div>
  );
}
