import React from 'react';
import { cn } from './Button';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  bnLabel?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, icon, bnLabel, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-2">
              {icon}
              {label}
              {props.required && <span className="text-rose-500 font-bold">*</span>}
            </span>
            {bnLabel && (
              <span className="text-xs font-medium text-slate-400 font-bengali ml-2">
                {bnLabel}
              </span>
            )}
          </label>
        )}
        <div className="relative group">
          <input
            ref={ref}
            className={cn(
              'input-premium',
              error && 'border-rose-300 focus:ring-rose-100 focus:border-rose-500',
              className
            )}
            {...props}
          />
          {error && (
            <p className="mt-1 text-xs font-semibold text-rose-500 animate-in fade-in slide-in-from-top-1 duration-200">
              {error}
            </p>
          )}
        </div>
        {helperText && !error && (
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic opacity-80 ring-offset-2">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  bnLabel?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, helperText, error, icon, bnLabel, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-2">
              {icon}
              {label}
              {props.required && <span className="text-rose-500 font-bold">*</span>}
            </span>
            {bnLabel && (
              <span className="text-xs font-medium text-slate-400 font-bengali ml-2">
                {bnLabel}
              </span>
            )}
          </label>
        )}
        <div className="relative group">
          <select
            ref={ref}
            className={cn(
              'input-premium appearance-none',
              props.value === '' && 'text-slate-400',
              error && 'border-rose-300 focus:ring-rose-100 focus:border-rose-500',
              className
            )}
            {...props}
          >
            <option value="" disabled>
              Select option / নির্বাচন করুন
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="text-slate-700">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-500 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {error && (
            <p className="mt-1 text-xs font-semibold text-rose-500 animate-in fade-in slide-in-from-top-1 duration-200">
              {error}
            </p>
          )}
        </div>
        {helperText && !error && (
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic opacity-80">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  bnLabel?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, icon, bnLabel, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-semibold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-2">
              {icon}
              {label}
              {props.required && <span className="text-rose-500 font-bold">*</span>}
            </span>
            {bnLabel && (
              <span className="text-xs font-medium text-slate-400 font-bengali ml-2">
                {bnLabel}
              </span>
            )}
          </label>
        )}
        <div className="relative group">
          <textarea
            ref={ref}
            className={cn(
              'input-premium min-h-[100px] resize-y',
              error && 'border-rose-300 focus:ring-rose-100 focus:border-rose-500',
              className
            )}
            {...props}
          />
          {error && (
            <p className="mt-1 text-xs font-semibold text-rose-500 animate-in fade-in slide-in-from-top-1 duration-200">
              {error}
            </p>
          )}
        </div>
        {helperText && !error && (
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed italic opacity-80 ring-offset-2">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
