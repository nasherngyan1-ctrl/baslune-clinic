import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Maximize2 } from 'lucide-react';
import { FACILITY_GALLERY } from '../data/clinicData';
import type { Language, LightboxItem } from '../types/clinic';
import type { TranslationBundle } from '../data/translations';

interface ClinicGallerySectionProps {
  language: Language;
  t: TranslationBundle;
  onOpenLightbox: (items: LightboxItem[], startIndex: number) => void;
}

export const ClinicGallerySection: React.FC<ClinicGallerySectionProps> = ({
  language,
  t,
  onOpenLightbox,
}) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const lightboxItems: LightboxItem[] = FACILITY_GALLERY.map((item) => ({
    id: item.id,
    imageUrl: item.imageUrl,
    title: item.title[language],
    tag: item.tag[language],
  }));

  return (
    <section id="clinic" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-10 lg:mb-12"
        >
          <p className="text-sm font-semibold text-[#0D9488] mb-2">
            {t.facility.kicker}
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[#0F172A] tracking-tight text-balance mb-3">
            {t.facility.heading}
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            {t.facility.subheading}
          </p>
        </motion.div>

        {/* Asymmetrical Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">
          {FACILITY_GALLERY.map((item, idx) => {
            const hasFailed = failedImages[item.id];
            const isWide = item.colSpanClass.includes('col-span-7');

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`group relative rounded-2xl border border-[#E2ECF2] bg-[#F4F8FB] overflow-hidden shadow-[0_10px_30px_-14px_rgba(11,37,69,0.12)] ${
                  item.colSpanClass
                } ${isWide ? 'h-[300px] sm:h-[360px]' : 'h-[300px] sm:h-[360px]'}`}
              >
                <button
                  type="button"
                  onClick={() => onOpenLightbox(lightboxItems, idx)}
                  aria-label={`${item.title[language]} — ${t.facility.viewFullscreen}`}
                  className="relative w-full h-full block text-start cursor-pointer focus-visible:outline-none"
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
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F4F8FB] to-[#CCFBF1]/40 p-6 text-center">
                      <Building2 className="w-10 h-10 text-[#0D9488] mb-2" />
                      <p className="text-sm font-bold text-[#0B2545]">
                        {item.title[language]}
                      </p>
                    </div>
                  )}

                  {/* Measured Bottom Gradient Overlay */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2545]/85 via-[#0B2545]/20 to-transparent"
                  />

                  {/* Expand Icon Badge */}
                  <div className="absolute top-4 end-4 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 text-[#0B2545] group-hover:bg-[#0D9488] group-hover:text-white group-hover:border-[#0D9488] flex items-center justify-center shadow-sm transition-all duration-200">
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                  </div>

                  {/* Title & Tag Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="text-xs font-medium text-[#CCFBF1] mb-1">
                      {item.tag[language]}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {item.title[language]}
                    </h3>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
