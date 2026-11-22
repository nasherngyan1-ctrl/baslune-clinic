import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarClock, UserRound } from 'lucide-react';
import { DOCTORS } from '../data/clinicData';
import { PrimaryActionButton } from './ActionButtons';
import type { Doctor, Language } from '../types/clinic';
import type { TranslationBundle } from '../data/translations';

interface DoctorsSectionProps {
  language: Language;
  t: TranslationBundle;
  onBookDoctor: (doctor: Doctor) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  language,
  t,
  onBookDoctor,
}) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <section id="doctors" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-semibold text-[#0D9488] mb-2">{t.doctors.kicker}</p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[#0F172A] tracking-tight text-balance mb-3">
            {t.doctors.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            {t.doctors.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {DOCTORS.map((doc, idx) => {
            const hasFailed = failedImages[doc.id];

            return (
              <motion.article
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="group flex flex-col rounded-2xl border border-[#E2ECF2] bg-white overflow-hidden transition-all duration-200 hover:border-[#0D9488]/60 hover:shadow-[0_20px_42px_-16px_rgba(11,37,69,0.14)]"
              >
                {/* Doctor Portrait Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F4F8FB]">
                  {!hasFailed ? (
                    <img
                      src={doc.imageUrl}
                      alt={doc.name[language]}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [doc.id]: true }))
                      }
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F4F8FB] to-[#E2ECF2] p-6 text-center">
                      <UserRound className="w-16 h-16 text-[#0B2545]/40 mb-2" />
                      <span className="text-sm font-semibold text-[#0B2545]">
                        {doc.name[language]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Doctor Details */}
                <div className="flex-1 flex flex-col justify-between p-6">
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-1">
                      {doc.name[language]}
                    </h3>
                    <p className="text-sm font-semibold text-[#0D9488] mb-3">
                      {doc.specialty[language]}
                    </p>

                    {/* Clean Unboxed Metadata */}
                    <div className="space-y-1.5 text-xs text-[#475569]">
                      <p className="font-medium text-[#0B2545]">{doc.credentials}</p>
                      <p className="tabular-nums">
                        {doc.experienceYears}+ {t.doctors.yearsExp} · {doc.languages[language]}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E2ECF2] space-y-4">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 text-[#475569]">
                        <CalendarClock className="w-4 h-4 text-[#0284C7]" aria-hidden="true" />
                        <span>{t.doctors.nextAvailableLabel}</span>
                      </span>
                      <span className="font-semibold text-[#0B2545] tabular-nums">
                        {doc.nextAvailable[language]}
                      </span>
                    </div>

                    <PrimaryActionButton
                      language={language}
                      size="md"
                      variant="navy"
                      onClick={() => onBookDoctor(doc)}
                      className="w-full"
                    >
                      {t.doctors.bookDoctor}
                    </PrimaryActionButton>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
