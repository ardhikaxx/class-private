import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'featured' | 'success' | 'warning';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantStyles = {
    default: 'bg-white/10 text-zinc-300 border-white/15 backdrop-blur-md',
    primary: 'bg-white text-black border-transparent font-bold shadow-xs',
    secondary: 'bg-zinc-900/80 text-zinc-300 border-white/10 backdrop-blur-md',
    featured: 'bg-white text-black border-white shadow-xs font-bold',
    success: 'bg-white/15 text-white border-white/30 backdrop-blur-md font-semibold',
    warning: 'bg-zinc-800/90 text-zinc-200 border-white/20 backdrop-blur-md'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
