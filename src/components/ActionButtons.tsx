import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Language } from '../types/clinic';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  language: Language;
  variant?: 'navy' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showArrow?: boolean;
  disabled?: boolean;
}

export const PrimaryActionButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  type = 'button',
  language,
  variant = 'navy',
  size = 'md',
  className = '',
  showArrow = true,
  disabled = false,
}) => {
  const isRtl = language === 'ku' || language === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const sizeClasses =
    size === 'sm'
      ? 'px-4 py-2 text-xs min-h-[38px]'
      : size === 'lg'
      ? 'px-6 py-3.5 text-sm sm:text-base min-h-[48px]'
      : 'px-5 py-2.5 text-sm min-h-[42px]';

  const colorClasses =
    variant === 'teal'
      ? 'bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-[0_8px_20px_-6px_rgba(13,148,136,0.45)] hover:shadow-[0_12px_26px_-6px_rgba(13,148,136,0.55)]'
      : 'bg-[#0B2545] hover:bg-[#10335E] text-white shadow-[0_8px_20px_-6px_rgba(11,37,69,0.4)] hover:shadow-[0_14px_28px_-6px_rgba(11,37,69,0.5)]';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className={`group btn-sheen inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${colorClasses} ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowIcon
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ease-out ${
            isRtl
              ? 'group-hover:-translate-x-1'
              : 'group-hover:translate-x-1'
          }`}
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
};

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
}

export const SecondaryActionButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  type = 'button',
  size = 'md',
  className = '',
  icon,
}) => {
  const sizeClasses =
    size === 'sm'
      ? 'px-4 py-2 text-xs min-h-[38px]'
      : size === 'lg'
      ? 'px-6 py-3.5 text-sm sm:text-base min-h-[48px]'
      : 'px-5 py-2.5 text-sm min-h-[42px]';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border border-[#CBD9E6] bg-white text-[#0B2545] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-all duration-200 hover:border-[#0D9488] hover:bg-[#F4F8FB] hover:text-[#0D9488] ${sizeClasses} ${className}`}
    >
      {icon}
      <span>{children}</span>
    </motion.button>
  );
};
