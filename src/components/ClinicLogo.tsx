import React from 'react';

interface ClinicLogoProps {
  className?: string;
  inverted?: boolean;
}

export const ClinicLogo: React.FC<ClinicLogoProps> = ({ className = '', inverted = false }) => {
  return (
    <div className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          fill={inverted ? '#0D9488' : '#0B2545'}
        />
        {/* Precision medical cross geometry */}
        <path
          d="M16 7.5V24.5M7.5 16H24.5"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Clinical pulse line integrated along the horizontal axis */}
        <path
          d="M9.5 16H12.8L14.3 12.6L16.4 19.6L18.1 16H22.5"
          stroke={inverted ? '#CCFBF1' : '#2DD4BF'}
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`text-[18px] font-bold tracking-tight whitespace-nowrap shrink-0 ${
          inverted ? 'text-white' : 'text-[#0B2545]'
        }`}
      >
        BASLUNE Clinic
      </span>
    </div>
  );
};
