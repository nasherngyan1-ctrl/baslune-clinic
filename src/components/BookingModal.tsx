import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CalendarDays,
  Check,
  CheckCircle2,
  Clock,
  MessageCircle,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react';
import {
  CLINIC_PHONE_RAW,
  DOCTORS,
  MEDICAL_SERVICES,
  TIME_SLOTS,
} from '../data/clinicData';
import { PrimaryActionButton, SecondaryActionButton } from './ActionButtons';
import type { Language } from '../types/clinic';
import type { TranslationBundle } from '../data/translations';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  t: TranslationBundle;
  initialServiceId?: string | null;
  initialDoctorId?: string | null;
}

interface DayOption {
  iso: string;
  weekdayLabel: string;
  dayNum: string;
  monthLabel: string;
  isFriday: boolean;
  displayFull: string;
}

function buildNextSevenDays(language: Language, t: TranslationBundle): DayOption[] {
  const locale = language === 'ku' ? 'ckb-IQ' : language === 'ar' ? 'ar-IQ' : 'en-US';
  const list: DayOption[] = [];
  const base = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const isFriday = d.getDay() === 5;
    const iso = d.toISOString().split('T')[0];

    let weekdayLabel = new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d);
    if (i === 0) weekdayLabel = t.booking.todayLabel;
    if (i === 1) weekdayLabel = t.booking.tomorrowLabel;

    const dayNum = new Intl.DateTimeFormat(locale, { day: 'numeric' }).format(d);
    const monthLabel = new Intl.DateTimeFormat(locale, { month: 'short' }).format(d);
    const displayFull = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(d);

    list.push({
      iso,
      weekdayLabel,
      dayNum,
      monthLabel,
      isFriday,
      displayFull,
    });
  }
  return list;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  language,
  t,
  initialServiceId,
  initialDoctorId,
}) => {
  const isRtl = language === 'ku' || language === 'ar';
  const days = useMemo(() => buildNextSevenDays(language, t), [language, t]);
  const firstOpenDay = useMemo(
    () => days.find((d) => !d.isFriday)?.iso ?? days[0].iso,
    [days],
  );

  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    MEDICAL_SERVICES[0].id,
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('first-available');
  const [selectedDateIso, setSelectedDateIso] = useState<string>(firstOpenDay);
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[5]); // 4:30 PM
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [bookingCode, setBookingCode] = useState<string>('');

  // Sync pre-selected service or doctor when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const targetService =
      initialServiceId && MEDICAL_SERVICES.some((s) => s.id === initialServiceId)
        ? initialServiceId
        : initialDoctorId
        ? MEDICAL_SERVICES.find(
            (s) =>
              s.category ===
              DOCTORS.find((doc) => doc.id === initialDoctorId)?.department,
          )?.id ?? MEDICAL_SERVICES[0].id
        : MEDICAL_SERVICES[0].id;

    setSelectedServiceId(targetService);
    setSelectedDoctorId(initialDoctorId ?? 'first-available');
    setSelectedDateIso(firstOpenDay);
    setSelectedTime(TIME_SLOTS[5]);
    setPatientNotes('');
    setErrors({});
    setBookingCode('');

    if (initialDoctorId && !initialServiceId) {
      setStep(1);
    } else if (initialServiceId) {
      setStep(2);
    } else {
      setStep(1);
    }
    setDirection(1);
  }, [isOpen, initialServiceId, initialDoctorId, firstOpenDay]);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const selectedService =
    MEDICAL_SERVICES.find((s) => s.id === selectedServiceId) ?? MEDICAL_SERVICES[0];

  const orderedDoctors = useMemo(() => {
    const matching = DOCTORS.filter((d) => d.department === selectedService.category);
    const others = DOCTORS.filter((d) => d.department !== selectedService.category);
    return [...matching, ...others];
  }, [selectedService.category]);

  const selectedDoctor =
    selectedDoctorId === 'first-available'
      ? null
      : DOCTORS.find((d) => d.id === selectedDoctorId) ?? null;

  const selectedDayObj = days.find((d) => d.iso === selectedDateIso) ?? days[0];

  const goToStep = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = patientName.trim();
    const asciiPhone = patientPhone
      .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
      .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
    const cleanedPhone = asciiPhone.replace(/[\s()-]/g, '');

    const nextErrors: { name?: string; phone?: string } = {};
    if (trimmedName.length < 3) {
      nextErrors.name = t.booking.nameError;
    }
    if (!/^(?:\+?964|0)?7\d{9}$/.test(cleanedPhone) && cleanedPhone.length < 9) {
      nextErrors.phone = t.booking.phoneError;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    setBookingCode(`BSL-2026-${randomSuffix}`);
    setDirection(1);
    setStep(5);
  };

  const doctorDisplayName = selectedDoctor
    ? selectedDoctor.name[language]
    : t.booking.firstAvailableTitle;

  const whatsAppUrl = useMemo(() => {
    if (!bookingCode) return '#';
    const text =
      language === 'ku'
        ? `سڵاو کلینیکی باسلون، حجزەکەم تۆمارکرا:\nکۆد: ${bookingCode}\nخزمەتگوزاری: ${selectedService.title.ku}\nپزیشک: ${doctorDisplayName}\nڕۆژ و کات: ${selectedDayObj.displayFull} · ${selectedTime}\nناو: ${patientName}\nمۆبایل: +964 ${patientPhone}`
        : language === 'ar'
        ? `مرحباً عيادة باسلون، تأكيد حجزي:\nالرمز: ${bookingCode}\nالخدمة: ${selectedService.title.ar}\nالطبيب: ${doctorDisplayName}\nالموعد: ${selectedDayObj.displayFull} · ${selectedTime}\nالاسم: ${patientName}\nالهاتف: +964 ${patientPhone}`
        : `Hello BASLUNE Clinic, here is my booking confirmation:\nCode: ${bookingCode}\nService: ${selectedService.title.en}\nDoctor: ${doctorDisplayName}\nDate & Time: ${selectedDayObj.displayFull} · ${selectedTime}\nPatient: ${patientName}\nPhone: +964 ${patientPhone}`;

    return `https://wa.me/${CLINIC_PHONE_RAW}?text=${encodeURIComponent(text)}`;
  }, [
    bookingCode,
    language,
    selectedService,
    doctorDisplayName,
    selectedDayObj,
    selectedTime,
    patientName,
    patientPhone,
  ]);

  const stepLabels = [
    t.booking.steps.service,
    t.booking.steps.doctor,
    t.booking.steps.schedule,
    t.booking.steps.details,
  ];

  const slideOffset = isRtl ? -28 * direction : 28 * direction;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B2545]/55 backdrop-blur-xs"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="relative z-10 w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl border border-[#E2ECF2] bg-white shadow-[0_30px_70px_-15px_rgba(11,37,69,0.3)] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-7 py-4 sm:py-5 border-b border-[#E2ECF2] flex items-center justify-between gap-4 bg-white">
              <div>
                <h2
                  id="booking-modal-title"
                  className="text-lg sm:text-xl font-bold text-[#0F172A]"
                >
                  {t.booking.modalTitle}
                </h2>
                {step <= 4 && (
                  <p className="text-xs font-medium text-[#475569] mt-0.5 tabular-nums">
                    {t.booking.stepLabel} {step} {t.booking.ofLabel} 4 · {stepLabels[step - 1]}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label={t.ai.closeLabel}
                className="w-9 h-9 rounded-xl border border-[#E2ECF2] bg-[#F4F8FB] text-[#475569] hover:text-[#0B2545] hover:border-[#0D9488] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Animated Step Progress Bar */}
            {step <= 4 && (
              <div className="px-5 sm:px-7 pt-4 pb-2 bg-[#F4F8FB]/70 border-b border-[#E2ECF2]">
                <div className="grid grid-cols-4 gap-2">
                  {stepLabels.map((label, idx) => {
                    const stepIndex = idx + 1;
                    const completed = step > stepIndex;
                    const current = step === stepIndex;
                    return (
                      <div key={label} className="space-y-1.5">
                        <div className="h-1.5 rounded-full bg-[#E2ECF2] overflow-hidden">
                          <motion.div
                            initial={false}
                            animate={{
                              scaleX: completed || current ? 1 : 0,
                            }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{ originX: isRtl ? 1 : 0 }}
                            className={`h-full w-full rounded-full ${
                              completed ? 'bg-[#0D9488]' : 'bg-[#0B2545]'
                            }`}
                          />
                        </div>
                        <p
                          className={`text-[11px] font-semibold truncate ${
                            current
                              ? 'text-[#0B2545]'
                              : completed
                              ? 'text-[#0D9488]'
                              : 'text-[#475569]'
                          }`}
                        >
                          {label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Scrollable Step Body */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-6">
              <AnimatePresence mode="wait" initial={false}>
                {/* STEP 1: Choose Service */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: slideOffset }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -slideOffset }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-3"
                  >
                    <h3 className="text-base font-bold text-[#0F172A] mb-3">
                      {t.booking.step1Title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {MEDICAL_SERVICES.map((srv) => {
                        const active = srv.id === selectedServiceId;
                        return (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => setSelectedServiceId(srv.id)}
                            className={`text-start rounded-xl border p-4 transition-all duration-150 cursor-pointer ${
                              active
                                ? 'border-[#0D9488] bg-[#CCFBF1]/25 shadow-[0_0_0_1px_#0D9488]'
                                : 'border-[#E2ECF2] bg-white hover:border-[#0B2545]/30 hover:bg-[#F4F8FB]/60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <span className="text-xs font-semibold text-[#0284C7]">
                                {t.services.tabs[srv.category]}
                              </span>
                              <span className="text-xs font-bold text-[#0B2545] tabular-nums">
                                ${srv.priceUsd}
                              </span>
                            </div>
                            <p className="text-sm font-bold text-[#0F172A] leading-snug mb-1">
                              {srv.title[language]}
                            </p>
                            <p className="text-xs text-[#475569] tabular-nums">
                              {srv.durationMinutes} {t.services.minutesUnit} · {srv.priceIqd} IQD
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Choose Doctor */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: slideOffset }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -slideOffset }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-3"
                  >
                    <h3 className="text-base font-bold text-[#0F172A] mb-3">
                      {t.booking.step2Title}
                    </h3>

                    {/* First Available Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedDoctorId('first-available')}
                      className={`w-full text-start rounded-xl border p-4 flex items-center justify-between gap-4 transition-all cursor-pointer ${
                        selectedDoctorId === 'first-available'
                          ? 'border-[#0D9488] bg-[#CCFBF1]/25 shadow-[0_0_0_1px_#0D9488]'
                          : 'border-[#E2ECF2] bg-white hover:border-[#0B2545]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-[#0B2545] text-[#2DD4BF] flex items-center justify-center shrink-0">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#0F172A]">
                            {t.booking.firstAvailableTitle}
                          </p>
                          <p className="text-xs text-[#475569] mt-0.5">
                            {t.booking.firstAvailableDesc}
                          </p>
                        </div>
                      </div>
                      {selectedDoctorId === 'first-available' && (
                        <Check className="w-5 h-5 text-[#0D9488] shrink-0" />
                      )}
                    </button>

                    {/* Specialist Doctors */}
                    <div className="space-y-2.5 pt-1">
                      {orderedDoctors.map((doc) => {
                        const active = selectedDoctorId === doc.id;
                        return (
                          <button
                            key={doc.id}
                            type="button"
                            onClick={() => setSelectedDoctorId(doc.id)}
                            className={`w-full text-start rounded-xl border p-3.5 flex items-center justify-between gap-4 transition-all cursor-pointer ${
                              active
                                ? 'border-[#0D9488] bg-[#CCFBF1]/25 shadow-[0_0_0_1px_#0D9488]'
                                : 'border-[#E2ECF2] bg-white hover:border-[#0B2545]/30'
                            }`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <img
                                src={doc.imageUrl}
                                alt={doc.name[language]}
                                referrerPolicy="no-referrer"
                                className="w-12 h-12 rounded-xl object-cover object-top shrink-0 bg-[#F4F8FB]"
                              />
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-[#0F172A] truncate">
                                  {doc.name[language]}
                                </p>
                                <p className="text-xs font-medium text-[#0D9488] truncate">
                                  {doc.specialty[language]}
                                </p>
                                <p className="text-[11px] text-[#475569] mt-0.5 tabular-nums">
                                  {t.doctors.nextAvailableLabel}: {doc.nextAvailable[language]}
                                </p>
                              </div>
                            </div>
                            {active && <Check className="w-5 h-5 text-[#0D9488] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Date Picker & Time Slot Grid */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: slideOffset }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -slideOffset }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {t.booking.step3Title}
                    </h3>

                    {/* 7-Day Interactive Date Strip */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-[#475569] mb-2.5">
                        <CalendarDays className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
                        <span>{t.booking.selectDateLabel}</span>
                      </label>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {days.map((day) => {
                          const active = selectedDateIso === day.iso;
                          return (
                            <button
                              key={day.iso}
                              type="button"
                              disabled={day.isFriday}
                              onClick={() => setSelectedDateIso(day.iso)}
                              className={`rounded-xl border p-2.5 text-center transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                                active
                                  ? 'border-[#0B2545] bg-[#0B2545] text-white shadow-sm'
                                  : 'border-[#E2ECF2] bg-white text-[#0F172A] hover:border-[#0D9488]'
                              }`}
                            >
                              <p
                                className={`text-[11px] font-medium truncate ${
                                  active ? 'text-[#2DD4BF]' : 'text-[#475569]'
                                }`}
                              >
                                {day.weekdayLabel}
                              </p>
                              <p className="text-lg font-bold tabular-nums my-0.5">
                                {day.dayNum}
                              </p>
                              <p
                                className={`text-[11px] ${
                                  active ? 'text-slate-200' : 'text-[#475569]'
                                }`}
                              >
                                {day.monthLabel}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[11px] text-[#475569] mt-2">
                        {t.booking.closedFridayNote}
                      </p>
                    </div>

                    {/* Time Slot Grid */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-semibold text-[#475569] mb-2.5">
                        <Clock className="w-4 h-4 text-[#0284C7]" aria-hidden="true" />
                        <span>{t.booking.selectTimeLabel}</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {TIME_SLOTS.map((slot) => {
                          const active = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              dir="ltr"
                              onClick={() => setSelectedTime(slot)}
                              className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-semibold tabular-nums transition-all cursor-pointer ${
                                active
                                  ? 'border-[#0D9488] bg-[#0D9488] text-white shadow-xs'
                                  : 'border-[#E2ECF2] bg-white text-[#0B2545] hover:border-[#0D9488] hover:bg-[#F4F8FB]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Patient Name & Phone (+964) */}
                {step === 4 && (
                  <motion.form
                    id="booking-details-form"
                    onSubmit={handleConfirm}
                    key="step-4"
                    initial={{ opacity: 0, x: slideOffset }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -slideOffset }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <h3 className="text-base font-bold text-[#0F172A]">
                      {t.booking.step4Title}
                    </h3>

                    {/* Summary Strip */}
                    <div className="rounded-xl border border-[#E2ECF2] bg-[#F4F8FB] p-3.5 text-xs text-[#475569] space-y-1">
                      <p className="font-bold text-[#0B2545]">
                        {selectedService.title[language]} · ${selectedService.priceUsd}
                      </p>
                      <p className="tabular-nums">
                        {doctorDisplayName} · {selectedDayObj.displayFull} ·{' '}
                        <span dir="ltr">{selectedTime}</span>
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="patient-name"
                        className="block text-xs font-semibold text-[#0B2545] mb-1.5"
                      >
                        {t.booking.fullNameLabel}
                      </label>
                      <input
                        id="patient-name"
                        type="text"
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                          if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                        }}
                        placeholder={t.booking.fullNamePlaceholder}
                        className="w-full rounded-xl border border-[#CBD9E6] bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#0D9488] focus:outline-none"
                      />
                      {errors.name && (
                        <p className="text-xs text-rose-600 mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="patient-phone"
                        className="block text-xs font-semibold text-[#0B2545] mb-1.5"
                      >
                        {t.booking.phoneLabel}
                      </label>
                      <div
                        dir="ltr"
                        className="flex items-center rounded-xl border border-[#CBD9E6] bg-white overflow-hidden focus-within:border-[#0D9488]"
                      >
                        <span className="px-3.5 py-2.5 bg-[#F4F8FB] border-r border-[#E2ECF2] text-sm font-semibold text-[#0B2545] tabular-nums select-none">
                          +964
                        </span>
                        <input
                          id="patient-phone"
                          type="tel"
                          value={patientPhone}
                          onChange={(e) => {
                            setPatientPhone(e.target.value);
                            if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                          }}
                          placeholder={t.booking.phonePlaceholder}
                          className="flex-1 px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none tabular-nums"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="patient-notes"
                        className="block text-xs font-semibold text-[#0B2545] mb-1.5"
                      >
                        {t.booking.notesLabel}
                      </label>
                      <textarea
                        id="patient-notes"
                        rows={2}
                        value={patientNotes}
                        onChange={(e) => setPatientNotes(e.target.value)}
                        placeholder={t.booking.notesPlaceholder}
                        className="w-full rounded-xl border border-[#CBD9E6] bg-white px-4 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#0D9488] focus:outline-none resize-none"
                      />
                    </div>
                  </motion.form>
                )}

                {/* STEP 5: Animated Confirmation Screen */}
                {step === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                    className="py-2 text-center space-y-5"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 20, delay: 0.08 }}
                      className="w-16 h-16 rounded-full bg-[#CCFBF1] text-[#0D9488] flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 className="w-9 h-9" />
                    </motion.div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
                        {t.booking.confirmedTitle}
                      </h3>
                      <p className="text-sm text-[#475569] mt-1.5 max-w-md mx-auto">
                        {t.booking.confirmedSubtitle}
                      </p>
                    </div>

                    <div className="inline-flex flex-col items-center rounded-xl border border-[#0D9488]/40 bg-[#F4F8FB] px-6 py-3">
                      <span className="text-[11px] font-semibold text-[#475569]">
                        {t.booking.bookingCodeLabel}
                      </span>
                      <span
                        dir="ltr"
                        className="text-lg font-bold tracking-wider text-[#0B2545] tabular-nums mt-0.5"
                      >
                        {bookingCode}
                      </span>
                    </div>

                    <div className="text-start rounded-2xl border border-[#E2ECF2] bg-white p-5 space-y-3 text-sm">
                      <div className="flex items-center justify-between gap-4 border-b border-[#E2ECF2] pb-2.5">
                        <span className="text-xs text-[#475569]">
                          {t.booking.summaryService}
                        </span>
                        <span className="font-semibold text-[#0F172A]">
                          {selectedService.title[language]}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-b border-[#E2ECF2] pb-2.5">
                        <span className="text-xs text-[#475569]">
                          {t.booking.summaryDoctor}
                        </span>
                        <span className="font-semibold text-[#0F172A] inline-flex items-center gap-1.5">
                          <UserCheck className="w-4 h-4 text-[#0D9488]" aria-hidden="true" />
                          <span>{doctorDisplayName}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-b border-[#E2ECF2] pb-2.5">
                        <span className="text-xs text-[#475569]">
                          {t.booking.summaryDateTime}
                        </span>
                        <span className="font-semibold text-[#0F172A] tabular-nums">
                          {selectedDayObj.displayFull} ·{' '}
                          <span dir="ltr">{selectedTime}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs text-[#475569]">
                          {t.booking.summaryPatient}
                        </span>
                        <span className="font-semibold text-[#0F172A] tabular-nums">
                          {patientName} · <span dir="ltr">+964 {patientPhone}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                        <PrimaryActionButton
                          language={language}
                          size="md"
                          variant="teal"
                          showArrow={false}
                        >
                          <MessageCircle className="w-4 h-4" aria-hidden="true" />
                          <span>{t.booking.sendWhatsAppBtn}</span>
                        </PrimaryActionButton>
                      </a>
                      <SecondaryActionButton size="md" onClick={onClose}>
                        {t.booking.doneBtn}
                      </SecondaryActionButton>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Modal Footer Controls (Steps 1–4) */}
            {step <= 4 && (
              <div className="px-5 sm:px-7 py-4 border-t border-[#E2ECF2] bg-white flex items-center justify-between gap-3">
                {step > 1 ? (
                  <SecondaryActionButton size="md" onClick={() => goToStep(step - 1)}>
                    {t.booking.backBtn}
                  </SecondaryActionButton>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <PrimaryActionButton
                    language={language}
                    size="md"
                    variant="navy"
                    onClick={() => goToStep(step + 1)}
                  >
                    {t.booking.nextBtn}
                  </PrimaryActionButton>
                ) : (
                  <PrimaryActionButton
                    type="button"
                    language={language}
                    size="md"
                    variant="teal"
                    onClick={() => {
                      const form = document.getElementById(
                        'booking-details-form',
                      ) as HTMLFormElement | null;
                      form?.requestSubmit();
                    }}
                  >
                    {t.booking.confirmBtn}
                  </PrimaryActionButton>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
