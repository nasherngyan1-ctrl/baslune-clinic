import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';
import type { Language, LightboxItem } from '../types/clinic';
import type { TranslationBundle } from '../data/translations';

interface LightboxModalProps {
  items: LightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
  language: Language;
  t: TranslationBundle;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
  language,
  t,
}) => {
  const isOpen = activeIndex !== null && items.length > 0 && activeIndex >= 0 && activeIndex < items.length;
  const isRtl = language === 'ku' || language === 'ar';
  const [failedIds, setFailedIds] = useState<Record<string, boolean>>({});

  const currentItem = isOpen ? items[activeIndex!] : null;

  const goPrev = useCallback(() => {
    if (!isOpen || activeIndex === null) return;
    const prevIdx = (activeIndex - 1 + items.length) % items.length;
    onChangeIndex(prevIdx);
  }, [isOpen, activeIndex, items.length, onChangeIndex]);

  const goNext = useCallback(() => {
    if (!isOpen || activeIndex === null) return;
    const nextIdx = (activeIndex + 1) % items.length;
    onChangeIndex(nextIdx);
  }, [isOpen, activeIndex, items.length, onChangeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (isRtl) goPrev();
        else goNext();
      } else if (e.key === 'ArrowLeft') {
        if (isRtl) goNext();
        else goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isRtl, goPrev, goNext, onClose]);

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B2545]/88 backdrop-blur-md"
          />

          {/* Lightbox Content Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
            className="relative z-10 w-full max-w-5xl flex flex-col rounded-3xl border border-white/15 bg-[#0B2545] shadow-[0_32px_90px_-15px_rgba(0,0,0,0.65)] overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-white/10">
              <div className="min-w-0">
                {currentItem.tag && (
                  <p className="text-xs font-semibold text-[#2DD4BF] truncate mb-0.5">
                    {currentItem.tag}
                  </p>
                )}
                <h3 className="text-base sm:text-lg font-bold text-white truncate">
                  {currentItem.title}
                </h3>
                {currentItem.subtitle && (
                  <p className="text-xs text-slate-300 truncate mt-0.5">
                    {currentItem.subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {items.length > 1 && (
                  <span
                    dir="ltr"
                    className="text-xs font-semibold text-slate-200 tabular-nums px-2.5 py-1 rounded-lg bg-white/10"
                  >
                    {activeIndex! + 1} / {items.length}
                  </span>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t.lightbox.close}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#0D9488] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Stage */}
            <div className="relative bg-[#07182E] flex items-center justify-center min-h-[260px] sm:min-h-[440px] max-h-[72vh] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {!failedIds[currentItem.id] ? (
                    <img
                      src={currentItem.imageUrl}
                      alt={currentItem.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedIds((prev) => ({ ...prev, [currentItem.id]: true }))
                      }
                      className="max-h-[70vh] w-full object-contain select-none"
                    />
                  ) : (
                    <div className="w-full aspect-video max-h-[65vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#0B2545] to-[#0D9488]/30 p-8 text-center">
                      <Sparkles className="w-12 h-12 text-[#2DD4BF] mb-3" />
                      <p className="text-base font-bold text-white">{currentItem.title}</p>
                      {currentItem.subtitle && (
                        <p className="text-xs text-slate-300 mt-1">{currentItem.subtitle}</p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Navigation Buttons */}
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={t.lightbox.previous}
                    className="absolute start-3 sm:start-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#0B2545]/80 hover:bg-[#0D9488] border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer shadow-lg"
                  >
                    <PrevIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={t.lightbox.next}
                    className="absolute end-3 sm:end-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-[#0B2545]/80 hover:bg-[#0D9488] border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer shadow-lg"
                  >
                    <NextIcon className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
