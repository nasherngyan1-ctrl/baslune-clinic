import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Maximize2, Sparkles, UserCheck } from 'lucide-react';
import { CASE_STUDIES, DOCTORS } from '../data/clinicData';
import { PrimaryActionButton } from './ActionButtons';
import type { Language, LightboxItem, ResultsCategory } from '../types/clinic';
import type { TranslationBundle } from '../data/translations';

interface ResultsShowcaseSectionProps {
  language: Language;
  t: TranslationBundle;
  onOpenLightbox: (items: LightboxItem[], startIndex: number) => void;
  onBookCaseStudy: (serviceId: string, doctorId: string) => void;
}

export const ResultsShowcaseSection: React.FC<ResultsShowcaseSectionProps> = ({
  language,
  t,
  onOpenLightbox,
  onBookCaseStudy,
}) => {
  const [activeCategory, setActiveCategory] = useState<ResultsCategory>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories: { id: ResultsCategory; label: string }[] = [
    { id: 'all', label: t.results.tabs.all },
    { id: 'dental', label: t.results.tabs.dental },
    { id: 'dermatology', label: t.results.tabs.dermatology },
  ];

  const filteredCases =
    activeCategory === 'all'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === activeCategory);

  const getDoctorName = (doctorId: string) => {
    const doc = DOCTORS.find((d) => d.id === doctorId);
    return doc ? doc.name[language] : '';
  };

  const lightboxItems: LightboxItem[] = filteredCases.map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    title: item.title[language],
    subtitle: `${item.sessionMeta[language]} · ${getDoctorName(item.doctorId)}`,
    tag: t.results.tabs[item.category],
  }));

  return (
    <section
      id="results"
      className="scroll-mt-24 bg-[#F4F8FB] py-16 lg:py-24 border-t border-[#E2ECF2]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-10"
        >
          <p className="text-sm font-semibold text-[#0D9488] mb-2">
            {t.results.kicker}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[#0F172A] tracking-tight text-balance mb-3">
            {t.results.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            {t.results.subheading}
          </p>
        </motion.div>

        {/* Spring-Animated Filter Tabs */}
        <div
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-[#E2ECF2] shadow-xs mb-10"
          role="tablist"
          aria-label={t.results.heading}
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
                    layoutId="results-category-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-[#0B2545]"
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Before & After Case Study Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCases.map((item, idx) => {
              const hasFailed = failedImages[item.id];
              const doctorName = getDoctorName(item.doctorId);

              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{
                    duration: 0.28,
                    delay: Math.min(idx * 0.05, 0.2),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col justify-between rounded-2xl border border-[#E2ECF2] bg-white overflow-hidden transition-all duration-200 hover:border-[#0D9488]/60 hover:shadow-[0_18px_38px_-14px_rgba(13,148,136,0.2)]"
                >
                  {/* Clickable 16:9 Before & After Image Frame */}
                  <div>
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(lightboxItems, idx)}
                      aria-label={`${item.title[language]} — ${t.results.viewCase}`}
                      className="relative w-full aspect-video block overflow-hidden bg-[#F4F8FB] cursor-pointer focus-visible:outline-none"
                    >
                      {!hasFailed ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title[language]}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedImages((prev) => ({ ...prev, [item.id]: true }))
                          }
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                        />
                      ) : (
                        /* Styled Clinical Split Fallback Frame (zero broken boxes or layout shift) */
                        <div className="w-full h-full grid grid-cols-2 divide-x divide-[#CBD9E6] bg-gradient-to-br from-[#F4F8FB] via-white to-[#CCFBF1]/45">
                          <div className="flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-[11px] font-bold tracking-wide text-[#0B2545]/70 mb-2">
                              {t.results.beforeLabel}
                            </span>
                            <Sparkles className="w-6 h-6 text-[#0B2545]/35" />
                          </div>
                          <div className="flex flex-col items-center justify-center p-4 text-center bg-[#CCFBF1]/20">
                            <span className="text-[11px] font-bold tracking-wide text-[#0D9488] mb-2">
                              {t.results.afterLabel}
                            </span>
                            <Sparkles className="w-6 h-6 text-[#0D9488]" />
                          </div>
                        </div>
                      )}

                      {/* Subtle Fullscreen Affordance on Hover */}
                      <span className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 rounded-lg bg-[#0B2545]/82 backdrop-blur-md text-white px-2.5 py-1.5 text-[11px] font-semibold opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                        <Maximize2 className="w-3.5 h-3.5 text-[#2DD4BF]" aria-hidden="true" />
                        <span>{t.results.viewCase}</span>
                      </span>
                    </button>

                    {/* Case Details */}
                    <div className="p-6 pb-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                        <span className="text-xs font-semibold text-[#0284C7]">
                          {t.results.tabs[item.category]}
                        </span>
                        <span className="inline-flex items-center rounded-lg border border-[#E2ECF2] bg-[#F4F8FB] px-2.5 py-1 text-[11px] font-semibold text-[#0B2545] tabular-nums">
                          {item.sessionMeta[language]}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-[#0F172A] leading-snug mb-2">
                        {item.title[language]}
                      </h3>

                      <p className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569]">
                        <UserCheck className="w-3.5 h-3.5 text-[#0D9488]" aria-hidden="true" />
                        <span>{doctorName}</span>
                      </p>
                    </div>
                  </div>

                  {/* Book This Treatment Action */}
                  <div className="px-6 pb-6 pt-3 border-t border-[#E2ECF2] mt-2">
                    <PrimaryActionButton
                      language={language}
                      size="sm"
                      variant="navy"
                      onClick={() => onBookCaseStudy(item.serviceId, item.doctorId)}
                      className="w-full"
                    >
                      {t.results.bookTreatment}
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
