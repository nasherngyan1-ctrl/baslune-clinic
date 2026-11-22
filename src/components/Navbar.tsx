import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { ClinicLogo } from './ClinicLogo';
import { PrimaryActionButton } from './ActionButtons';
import type { Language } from '../types/clinic';
import type { TranslationBundle } from '../data/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationBundle;
  onOpenBooking: () => void;
}

const LANGUAGE_OPTIONS: { code: Language; label: string }[] = [
  { code: 'ku', label: 'کوردی' },
  { code: 'ar', label: 'العربية' },
  { code: 'en', label: 'EN' },
];

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  t,
  onOpenBooking,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#clinic', label: t.nav.clinic },
    { href: '#results', label: t.nav.results },
    { href: '#doctors', label: t.nav.doctors },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#E2ECF2] shadow-[0_8px_30px_rgba(11,37,69,0.06)] py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand Mark */}
        <a
          href="#"
          className="focus-visible:rounded-lg shrink-0"
          aria-label={t.brandName}
        >
          <ClinicLogo />
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="Primary Navigation">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="relative py-1 text-sm font-medium text-[#475569] hover:text-[#0B2545] transition-colors whitespace-nowrap shrink-0 group"
            >
              <span>{item.label}</span>
              <span className="absolute inset-x-0 bottom-0 h-[1.5px] bg-[#0D9488] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Switcher + Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Spring-Animated Language Switcher */}
          <div
            className="inline-flex items-center p-1 rounded-xl bg-[#F4F8FB] border border-[#E2ECF2]"
            role="group"
            aria-label="Language Switcher"
          >
            {LANGUAGE_OPTIONS.map((opt) => {
              const active = language === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => onLanguageChange(opt.code)}
                  className={`relative px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 ${
                    active ? 'text-white' : 'text-[#475569] hover:text-[#0B2545]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-language-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-lg bg-[#0B2545] shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{opt.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:block">
            <PrimaryActionButton
              language={language}
              size="sm"
              variant="teal"
              onClick={onOpenBooking}
            >
              {t.nav.bookCta}
            </PrimaryActionButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#E2ECF2] bg-white text-[#0B2545] hover:border-[#0D9488] transition-colors cursor-pointer"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="lg:hidden border-t border-[#E2ECF2] bg-white px-4 py-4 shadow-lg"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#0F172A] hover:bg-[#F4F8FB] hover:text-[#0D9488] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 sm:hidden">
                <PrimaryActionButton
                  language={language}
                  size="md"
                  variant="teal"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full"
                >
                  {t.nav.bookCta}
                </PrimaryActionButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
