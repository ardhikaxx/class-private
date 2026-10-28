import React from 'react';
import { StepNumber } from '@/types/registration';
import { CheckIcon } from '@/components/ui/Icons';

interface RegistrationProgressProps {
  currentStep: StepNumber;
}

export function RegistrationProgress({ currentStep }: RegistrationProgressProps) {
  const steps = [
    { number: 1, label: 'Nama' },
    { number: 2, label: 'Program' },
    { number: 3, label: 'Pembayaran' },
    { number: 4, label: 'Konfirmasi' }
  ];

  return (
    <div className="w-full max-w-xl mx-auto mb-8 sm:mb-10">
      {/* Visual Steps Track */}
      <div className="relative flex items-center justify-between">
        {/* Horizontal line background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 -z-0" />
        
        {/* Active progress bar */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-white transition-all duration-300 -z-0"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div key={step.number} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-200 border ${
                  isCompleted
                    ? 'bg-white border-white text-black'
                    : isCurrent
                    ? 'bg-zinc-950 border-white text-white ring-2 ring-white/20'
                    : 'bg-zinc-900 border-white/15 text-zinc-500'
                }`}
              >
                {isCompleted ? <CheckIcon className="w-3.5 h-3.5 text-black" /> : step.number}
              </div>

              <span
                className={`mt-1.5 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap hidden sm:block ${
                  isCurrent ? 'text-white font-bold' : isCompleted ? 'text-zinc-300' : 'text-zinc-600'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile step label below track */}
      <div className="sm:hidden text-center mt-2.5 text-xs font-mono text-zinc-400">
        Langkah {currentStep}/4: {steps[currentStep - 1].label}
      </div>
    </div>
  );
}
