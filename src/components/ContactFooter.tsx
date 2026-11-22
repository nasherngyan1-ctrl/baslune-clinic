import React from 'react';
import { motion } from 'motion/react';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ClinicLogo } from './ClinicLogo';
import { PrimaryActionButton, SecondaryActionButton } from './ActionButtons';
import { CLINIC_PHONE_RAW } from '../data/clinicData';
import type { Language } from '../types/clinic';
import type { TranslationBundle } from '../data/translations';

interface ContactFooterProps {
  language: Language;
  t: TranslationBundle;
  onOpenBooking: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  language,
  t,
  onOpenBooking,
}) => {
  const whatsappGreeting = encodeURIComponent(
    language === 'ku'
      ? 'سڵاو کلینیکی باسلون، دەمەوێت پرسیار بکەم دەربارەی کاتی سەردان.'
      : language === 'ar'
      ? 'مرحباً عيادة باسلون، أود الاستفسار عن المواعيد والخدمات.'
      : 'Hello BASLUNE Clinic, I would like to inquire about an appointment in Erbil.',
  );

  const whatsappUrl = `https://wa.me/${CLINIC_PHONE_RAW}?text=${whatsappGreeting}`;

  return (
    <>
      <section
        id="contact"
        className="scroll-mt-24 bg-[#F4F8FB] py-16 lg:py-24 border-t border-[#E2ECF2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Contact Information Column */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-[#0D9488] mb-2">
                  {t.contact.kicker}
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[#0F172A] tracking-tight text-balance mb-3">
                  {t.contact.heading}
                </h2>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed mb-8">
                  {t.contact.subheading}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-2xl border border-[#E2ECF2] bg-white p-5">
                    <div className="w-10 h-10 rounded-xl bg-[#CCFBF1]/70 text-[#0D9488] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#475569] mb-0.5">
                        {t.contact.addressTitle}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-[#0F172A]">
                        {t.contact.addressValue}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-[#E2ECF2] bg-white p-5">
                    <div className="w-10 h-10 rounded-xl bg-[#CCFBF1]/70 text-[#0D9488] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#475569] mb-0.5">
                        {t.contact.hoursTitle}
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-[#0F172A] tabular-nums">
                        {t.contact.hoursValue}
                      </p>
                      <p className="text-xs text-[#475569] mt-0.5">{t.contact.hoursClosed}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-2xl border border-[#E2ECF2] bg-white p-5">
                    <div className="w-10 h-10 rounded-xl bg-[#CCFBF1]/70 text-[#0D9488] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#475569] mb-0.5">
                        {t.contact.phoneTitle}
                      </p>
                      <a
                        href={`tel:+${CLINIC_PHONE_RAW}`}
                        dir="ltr"
                        className="inline-block text-sm sm:text-base font-bold text-[#0B2545] hover:text-[#0D9488] transition-colors tabular-nums"
                      >
                        {t.contact.phoneValue}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <PrimaryActionButton
                    language={language}
                    size="md"
                    variant="teal"
                    showArrow={false}
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>{t.contact.whatsappCta}</span>
                  </PrimaryActionButton>
                </a>

                <SecondaryActionButton size="md" onClick={onOpenBooking}>
                  {t.contact.bookOnlineCta}
                </SecondaryActionButton>
              </div>
            </motion.div>

            {/* Architectural Erbil Empire World Map Visual */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex"
            >
              <div className="relative w-full min-h-[340px] lg:h-full rounded-2xl border border-[#E2ECF2] bg-white p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_14px_38px_-16px_rgba(11,37,69,0.1)]">
                {/* Clean Architectural Vector Grid of Erbil 100m & Empire World */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-60 pointer-events-none"
                >
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 600 480"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <rect width="600" height="480" fill="#F8FBFE" />
                    {/* Subtle Grid */}
                    <path
                      d="M0 96H600M0 192H600M0 288H600M0 384H600M120 0V480M240 0V480M360 0V480M480 0V480"
                      stroke="#E2ECF2"
                      strokeWidth="1"
                    />
                    {/* 100m Street Ring */}
                    <path
                      d="M-40 310C120 265 260 220 640 165"
                      stroke="#0B2545"
                      strokeOpacity="0.14"
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                    <path
                      d="M-40 310C120 265 260 220 640 165"
                      stroke="#0284C7"
                      strokeOpacity="0.28"
                      strokeWidth="2"
                      strokeDasharray="6 6"
                    />
                    {/* Gulan / Airport Road */}
                    <path
                      d="M210 -20L325 500"
                      stroke="#0B2545"
                      strokeOpacity="0.09"
                      strokeWidth="12"
                    />
                    {/* Empire World Architectural Blocks */}
                    <rect
                      x="255"
                      y="175"
                      width="95"
                      height="62"
                      rx="10"
                      fill="#CCFBF1"
                      fillOpacity="0.55"
                      stroke="#0D9488"
                      strokeOpacity="0.35"
                    />
                    <rect x="372" y="138" width="60" height="46" rx="8" fill="#E2ECF2" fillOpacity="0.7" />
                    <rect x="165" y="140" width="64" height="52" rx="8" fill="#E2ECF2" fillOpacity="0.7" />
                    <circle cx="302" cy="206" r="34" stroke="#0D9488" strokeOpacity="0.25" strokeWidth="1.5" />
                    <circle cx="302" cy="206" r="10" fill="#0B2545" />
                    <circle cx="302" cy="206" r="4.5" fill="#2DD4BF" />
                  </svg>
                </div>

                {/* Top Label */}
                <div className="relative z-10 inline-flex items-center gap-2 self-start rounded-xl border border-[#E2ECF2] bg-white/95 backdrop-blur-sm px-3.5 py-2 shadow-xs">
                  <MapPin className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
                  <span className="text-xs font-bold text-[#0B2545]">
                    {t.contact.erbilMapBadge}
                  </span>
                </div>

                {/* Bottom Card Details */}
                <div className="relative z-10 rounded-xl border border-[#E2ECF2] bg-white/95 backdrop-blur-sm p-4 shadow-xs">
                  <p className="text-sm font-bold text-[#0B2545] mb-1">
                    {t.contact.mapCardTitle}
                  </p>
                  <p className="text-xs text-[#475569] leading-relaxed">
                    {t.contact.erbilDistrictNote}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Footer */}
      <footer className="bg-[#0B2545] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/12">
            <div>
              <ClinicLogo inverted />
              <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-md leading-relaxed">
                {t.footer.clinicSummary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-xs sm:text-sm text-slate-200">
              <a href="#services" className="hover:text-[#2DD4BF] transition-colors">
                {t.nav.services}
              </a>
              <a href="#clinic" className="hover:text-[#2DD4BF] transition-colors">
                {t.nav.clinic}
              </a>
              <a href="#results" className="hover:text-[#2DD4BF] transition-colors">
                {t.nav.results}
              </a>
              <a href="#doctors" className="hover:text-[#2DD4BF] transition-colors">
                {t.nav.doctors}
              </a>
              <button
                type="button"
                onClick={onOpenBooking}
                className="hover:text-[#2DD4BF] transition-colors cursor-pointer"
              >
                {t.nav.book}
              </button>
              <a href="#contact" className="hover:text-[#2DD4BF] transition-colors">
                {t.nav.contact}
              </a>
            </div>
          </div>

          <div className="pt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-300">
            <p>{t.footer.rights}</p>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium text-white">{t.footer.craftedBy}</span>
              <span aria-hidden="true" className="text-slate-500">·</span>
              <a
                href={`mailto:${t.footer.studioEmail}`}
                className="inline-flex items-center gap-1.5 text-[#2DD4BF] hover:underline"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.footer.studioEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
