import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Clock,
  Droplets,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sun,
  Zap,
} from 'lucide-react';
import { MEDICAL_SERVICES } from '../data/clinicData';
import { PrimaryActionButton } from './ActionButtons';
import type { Language, ServiceCategory, ServiceIconKey } from '../types/clinic';
import type { TranslationBundle } from '../data/translations';

interface ServicesSectionProps {
  language: Language;
  t: TranslationBundle;
  onBookService: (serviceId: string) => void;
}

const SERVICE_ICONS: Record<ServiceIconKey, React.ComponentType<{ className?: string }>> = {
  sparkles: Sparkles,
  shieldCheck: ShieldCheck,
  sun: Sun,
  zap: Zap,
  droplets: Droplets,
  activity: Activity,
  heartPulse: HeartPulse,
  stethoscope: Stethoscope,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  t,
  onBookService,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: t.services.tabs.all },
    { id: 'dental', label: t.services.tabs.dental },
    { id: 'dermatology', label: t.services.tabs.dermatology },
    { id: 'preventive', label: t.services.tabs.preventive },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? MEDICAL_SERVICES
      : MEDICAL_SERVICES.filter((service) => service.category === activeCategory);

  return (
    <section id="services" className="scroll-mt-24 bg-[#F4F8FB] py-16 lg:py-24 border-y border-[#E2ECF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-10"
        >
          <p className="text-sm font-semibold text-[#0D9488] mb-2">{t.services.kicker}</p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[#0F172A] tracking-tight text-balance mb-3">
            {t.services.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            {t.services.subheading}
          </p>
        </motion.div>

        {/* Spring-Animated Category Filter Tabs */}
        <div
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E2ECF2] shadow-xs mb-10"
          role="tablist"
          aria-label={t.services.heading}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 ${
                  isActive ? 'text-white' : 'text-[#475569] hover:text-[#0B2545]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="service-category-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-[#0B2545]"
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Service Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
              const Icon = SERVICE_ICONS[service.icon];
              const categoryLabel = t.services.tabs[service.category];

              return (
                <motion.article
                  layout
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.28,
                    delay: Math.min(index * 0.04, 0.2),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E2ECF2] bg-white p-6 transition-all duration-200 hover:border-[#0D9488]/60 hover:shadow-[0_18px_38px_-14px_rgba(13,148,136,0.18)]"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-11 h-11 rounded-xl bg-[#CCFBF1]/70 text-[#0D9488] flex items-center justify-center shrink-0 transition-colors duration-200 group-hover:bg-[#0D9488] group-hover:text-white">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-medium text-[#475569] tabular-nums">
                        <Clock className="w-3.5 h-3.5 text-[#0284C7]" aria-hidden="true" />
                        <span>
                          {service.durationMinutes} {t.services.minutesUnit}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-medium text-[#0284C7] mb-1.5">{categoryLabel}</p>

                    <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-snug">
                      {service.title[language]}
                    </h3>

                    <p className="text-sm text-[#475569] leading-relaxed">
                      {service.description[language]}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#E2ECF2] flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-medium text-[#475569]">
                        {t.services.startingFrom}
                      </p>
                      <div className="flex items-baseline gap-2 tabular-nums">
                        <span className="text-xl font-bold text-[#0B2545]">
                          ${service.priceUsd}
                        </span>
                        <span className="text-xs font-medium text-[#475569]">
                          · {service.priceIqd} IQD
                        </span>
                      </div>
                    </div>

                    <PrimaryActionButton
                      language={language}
                      size="sm"
                      variant="navy"
                      onClick={() => onBookService(service.id)}
                    >
                      {t.services.bookService}
                    </PrimaryActionButton>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
