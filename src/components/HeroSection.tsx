import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarCheck, Clock, MessageSquareText, ShieldCheck, Star } from 'lucide-react';
import { PrimaryActionButton, SecondaryActionButton } from './ActionButtons';
import { HERO_CLINIC_IMAGE } from '../data/clinicData';
import type { Language } from '../types/clinic';
import type { TranslationBundle } from '../data/translations';

interface HeroSectionProps {
  language: Language;
  t: TranslationBundle;
  onOpenBooking: () => void;
  onOpenAiChat: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  t,
  onOpenBooking,
  onOpenAiChat,
}) => {
  const [imageError, setImageError] = useState(false);

  const stats = [
    { value: t.hero.stats.patientsValue, label: t.hero.stats.patientsLabel },
    { value: t.hero.stats.ratingValue, label: t.hero.stats.ratingLabel },
    { value: t.hero.stats.specialistsValue, label: t.hero.stats.specialistsLabel },
    { value: t.hero.stats.aiValue, label: t.hero.stats.aiLabel },
  ];

  return (
    <section className="relative bg-white pt-8 pb-14 lg:pt-14 lg:pb-20 overflow-hidden">
      {/* Subtle soft architectural tint backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-gradient-to-b from-[#F4F8FB] via-[#F4F8FB]/60 to-white"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Primary Value Proposition Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Clean live operating hours indicator */}
            <div className="inline-flex items-center gap-2 self-start rounded-xl border border-[#E2ECF2] bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-[#0B2545] shadow-xs mb-6">
              <Clock className="w-4 h-4 text-[#0D9488] shrink-0" aria-hidden="true" />
              <span>{t.hero.statusHours}</span>
            </div>

            <h1 className="text-[2rem] sm:text-[2.65rem] lg:text-[3.15rem] font-bold leading-[1.2] tracking-tight text-[#0F172A] text-balance mb-5">
              {t.hero.headline}
            </h1>

            <p className="text-base sm:text-[17px] leading-[1.7] text-[#475569] max-w-xl mb-8">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <PrimaryActionButton
                language={language}
                size="lg"
                variant="navy"
                onClick={onOpenBooking}
              >
                {t.hero.primaryCta}
              </PrimaryActionButton>

              <SecondaryActionButton
                size="lg"
                onClick={onOpenAiChat}
                icon={
                  <MessageSquareText
                    className="w-4 h-4 text-[#0D9488] shrink-0"
                    aria-hidden="true"
                  />
                }
              >
                {t.hero.secondaryCta}
              </SecondaryActionButton>
            </div>
          </motion.div>

          {/* Architectural Clinic Reception Visual Card (rounded-3xl + eager load + scale 1.03 hover) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex"
          >
            <div className="group relative w-full min-h-[340px] sm:min-h-[430px] lg:h-full rounded-3xl border border-[#E2ECF2] bg-[#F4F8FB] overflow-hidden shadow-[0_24px_56px_-15px_rgba(11,37,69,0.14)]">
              {!imageError ? (
                <img
                  src={HERO_CLINIC_IMAGE}
                  alt={t.hero.imageAlt}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F4F8FB] to-[#CCFBF1]/40 p-8 text-center">
                  <ShieldCheck className="w-12 h-12 text-[#0D9488] mb-3" />
                  <p className="text-sm font-semibold text-[#0B2545]">{t.brandName}</p>
                </div>
              )}

              {/* Subtle bottom scrim for glassmorphic badge contrast */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B2545]/50 via-[#0B2545]/12 to-transparent"
              />

              {/* Top-corner Glassmorphic Badge: 4.9★ Erbil Top Rated */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-4 start-4 rounded-2xl border border-white/65 bg-white/90 backdrop-blur-md px-3.5 py-2.5 shadow-[0_10px_28px_rgba(11,37,69,0.12)] max-w-[260px]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 fill-[#0D9488]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#0B2545] truncate tabular-nums">
                      {t.hero.ratingBadgeLabel}
                    </p>
                    <p className="text-[11px] text-[#475569] truncate">
                      {t.hero.ratingBadgeSub}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-corner Glassmorphic Badge: Next Slot: Today 4:30 PM */}
              <motion.button
                type="button"
                onClick={onOpenBooking}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="absolute bottom-4 end-4 rounded-2xl border border-white/65 bg-white/92 backdrop-blur-md px-4 py-3 shadow-[0_12px_32px_rgba(11,37,69,0.16)] cursor-pointer text-start transition-shadow hover:shadow-[0_16px_38px_rgba(13,148,136,0.22)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B2545] text-white flex items-center justify-center shrink-0">
                    <CalendarCheck className="w-4 h-4 text-[#2DD4BF]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium text-[#475569]">{t.hero.nextSlotLabel}</p>
                    <p className="text-sm font-bold text-[#0B2545] tabular-nums">
                      {t.hero.nextSlotValue}
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Full-width 4-Column Trust Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-[#E2ECF2] bg-white shadow-[0_6px_24px_-8px_rgba(11,37,69,0.06)] divide-y lg:divide-y-0 lg:divide-x lg:rtl:divide-x-reverse divide-[#E2ECF2]"
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`px-6 py-5 flex flex-col justify-center ${
                idx % 2 === 1 ? 'border-s lg:border-s-0 border-[#E2ECF2]' : ''
              }`}
            >
              <span className="text-2xl sm:text-3xl font-bold text-[#0B2545] tabular-nums tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#475569] mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
