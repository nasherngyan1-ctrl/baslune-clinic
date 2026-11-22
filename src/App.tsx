import { useEffect, useState } from 'react';
import { TRANSLATIONS } from './data/translations';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { ClinicGallerySection } from './components/ClinicGallerySection';
import { ResultsShowcaseSection } from './components/ResultsShowcaseSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ContactFooter } from './components/ContactFooter';
import { BookingModal } from './components/BookingModal';
import { AiReceptionistWidget } from './components/AiReceptionistWidget';
import { LightboxModal } from './components/LightboxModal';
import type { Doctor, Language, LightboxItem } from './types/clinic';

export default function App() {
  const [language, setLanguage] = useState<Language>('ku');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | null>(null);
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  const [lightboxItems, setLightboxItems] = useState<LightboxItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const t = TRANSLATIONS[language];

  // Automatically synchronize HTML dir (rtl/ltr) and lang attribute
  useEffect(() => {
    const dir = language === 'en' ? 'ltr' : 'rtl';
    const htmlLang = language === 'ku' ? 'ckb' : language;
    document.documentElement.dir = dir;
    document.documentElement.lang = htmlLang;
  }, [language]);

  const openGeneralBooking = () => {
    setPreselectedServiceId(null);
    setPreselectedDoctorId(null);
    setBookingOpen(true);
  };

  const openServiceBooking = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedDoctorId(null);
    setBookingOpen(true);
  };

  const openDoctorBooking = (doctor: Doctor) => {
    setPreselectedServiceId(null);
    setPreselectedDoctorId(doctor.id);
    setBookingOpen(true);
  };

  const openCaseStudyBooking = (serviceId: string, doctorId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedDoctorId(doctorId);
    setBookingOpen(true);
  };

  const openBookingFromChat = (serviceId?: string) => {
    setAiDrawerOpen(false);
    setPreselectedServiceId(serviceId ?? null);
    setPreselectedDoctorId(null);
    setBookingOpen(true);
  };

  const handleOpenLightbox = (items: LightboxItem[], startIndex: number) => {
    setLightboxItems(items);
    setLightboxIndex(startIndex);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0F172A] overflow-x-clip">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        t={t}
        onOpenBooking={openGeneralBooking}
      />

      <main className="flex-1 overflow-x-clip">
        <HeroSection
          language={language}
          t={t}
          onOpenBooking={openGeneralBooking}
          onOpenAiChat={() => setAiDrawerOpen(true)}
        />

        <ServicesSection
          language={language}
          t={t}
          onBookService={openServiceBooking}
        />

        <ClinicGallerySection
          language={language}
          t={t}
          onOpenLightbox={handleOpenLightbox}
        />

        <ResultsShowcaseSection
          language={language}
          t={t}
          onOpenLightbox={handleOpenLightbox}
          onBookCaseStudy={openCaseStudyBooking}
        />

        <DoctorsSection
          language={language}
          t={t}
          onBookDoctor={openDoctorBooking}
        />

        <ContactFooter
          language={language}
          t={t}
          onOpenBooking={openGeneralBooking}
        />
      </main>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        language={language}
        t={t}
        initialServiceId={preselectedServiceId}
        initialDoctorId={preselectedDoctorId}
      />

      <LightboxModal
        items={lightboxItems}
        activeIndex={lightboxIndex}
        onClose={handleCloseLightbox}
        onChangeIndex={setLightboxIndex}
        language={language}
        t={t}
      />

      <AiReceptionistWidget
        language={language}
        t={t}
        isOpen={aiDrawerOpen}
        onToggle={setAiDrawerOpen}
        onBookFromChat={openBookingFromChat}
      />
    </div>
  );
}
