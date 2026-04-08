import React from 'react';
import { cn } from './Button';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  bnTitle?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  status?: 'completed' | 'in-progress' | 'not-started';
  children?: React.ReactNode;
}

export const Card = ({
  className,
  title,
  bnTitle,
  icon,
  subtitle,
  headerAction,
  footer,
  status,
  children,
  ...props
}: CardProps) => {
  const statusColors = {
    completed: 'bg-emerald/10 text-emerald border-emerald/20',
    'in-progress': 'bg-amber/10 text-amber-700 border-amber-200',
    'not-started': 'bg-slate-50 text-slate-400 border-slate-200',
  };

  const statusLabels = {
    completed: '✓ Completed',
    'in-progress': '⏳ In Progress',
    'not-started': '○ Not Started',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-3xl border border-slate-100 shadow-premium overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]',
        className
      )}
      {...props}
    >
      {(title || icon) && (
        <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-gradient-to-r from-white to-ivory-light">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-emerald/5 text-emerald">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-lg font-serif font-semibold text-emerald leading-tight">
                {title}
                {bnTitle && (
                  <span className="block text-xs font-medium text-slate-400 font-bengali mt-0.5">
                    {bnTitle}
                  </span>
                )}
              </h3>
              {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {status && (
              <span
                className={cn(
                  'px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full border',
                  statusColors[status]
                )}
              >
                {statusLabels[status]}
              </span>
            )}
            {headerAction}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50">{footer}</div>}
    </div>
  );
};

export const Badge = ({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
  className?: string;
}) => {
  const styles = {
    default: 'bg-slate-100 text-slate-600',
    success: 'bg-emerald/10 text-emerald',
    warning: 'bg-amber/10 text-amber-700',
    error: 'bg-rose-50 text-rose-600',
    outline: 'border border-slate-200 text-slate-500',
  };

  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
