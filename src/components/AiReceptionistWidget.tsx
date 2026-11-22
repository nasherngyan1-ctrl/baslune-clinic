import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bot, CalendarPlus, Send, X } from 'lucide-react';
import { generateLocalAiReply } from '../utils/localAiFallback';
import type { ChatMessage, Language } from '../types/clinic';
import type { TranslationBundle } from '../data/translations';

interface AiReceptionistWidgetProps {
  language: Language;
  t: TranslationBundle;
  isOpen: boolean;
  onToggle: (open: boolean) => void;
  onBookFromChat: (preselectedServiceId?: string) => void;
}

export const AiReceptionistWidget: React.FC<AiReceptionistWidgetProps> = ({
  language,
  t,
  isOpen,
  onToggle,
  onBookFromChat,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: t.ai.welcomeMessage,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update welcome greeting cleanly when user hasn't started chatting yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ id: 'welcome', role: 'assistant', content: t.ai.welcomeMessage }];
      }
      return prev;
    });
  }, [t.ai.welcomeMessage]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const sendMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          messages: nextHistory.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          reply?: string;
          useFallback?: boolean;
          suggestBooking?: boolean;
        };

        if (data.reply && !data.useFallback) {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              role: 'assistant',
              content: data.reply!,
              suggestBooking: data.suggestBooking,
            },
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Network or static host unavailable: fall back cleanly to built-in engine
    }

    // Built-in intelligent trilingual local fallback engine
    await new Promise((resolve) => setTimeout(resolve, 420));
    const localReply = generateLocalAiReply(trimmed, language);

    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: localReply.reply,
        suggestBooking: localReply.suggestBooking,
        preselectedServiceId: localReply.preselectedServiceId,
      },
    ]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col items-end">
      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="mb-3 w-[calc(100vw-2.5rem)] sm:w-[390px] h-[510px] max-h-[75vh] flex flex-col rounded-2xl border border-[#E2ECF2] bg-white shadow-[0_24px_60px_-15px_rgba(11,37,69,0.28)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0B2545] text-white px-5 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#0D9488] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">{t.ai.drawerTitle}</p>
                  <p className="text-[11px] text-slate-300 truncate">{t.ai.drawerSubtitle}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggle(false)}
                aria-label={t.ai.closeLabel}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F4F8FB]">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed whitespace-pre-line ${
                        isUser
                          ? 'bg-[#0B2545] text-white rounded-be-sm'
                          : 'bg-white border border-[#E2ECF2] text-[#0F172A] rounded-bs-sm shadow-xs'
                      }`}
                    >
                      {msg.content}
                    </div>

                    {!isUser && msg.suggestBooking && (
                      <button
                        type="button"
                        onClick={() => onBookFromChat(msg.preselectedServiceId)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white px-3.5 py-2 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <CalendarPlus className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{t.ai.bookNowInChat}</span>
                      </button>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-start">
                  <div className="rounded-2xl border border-[#E2ECF2] bg-white px-4 py-2.5 text-xs text-[#475569]">
                    {t.ai.typingLabel}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* One-Click Quick Questions */}
            <div className="px-3.5 py-2.5 border-t border-[#E2ECF2] bg-white">
              <p className="text-[11px] font-semibold text-[#475569] mb-1.5">
                {t.ai.quickQuestionsLabel}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {t.ai.quickQuestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    disabled={isTyping}
                    onClick={() => sendMessage(q)}
                    className="text-start rounded-lg border border-[#E2ECF2] bg-[#F4F8FB] hover:border-[#0D9488] hover:bg-[#CCFBF1]/40 px-2.5 py-1.5 text-[11px] font-medium text-[#0B2545] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(inputValue);
              }}
              className="p-3 border-t border-[#E2ECF2] bg-white flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.ai.inputPlaceholder}
                className="flex-1 rounded-xl border border-[#CBD9E6] bg-[#F4F8FB] px-3.5 py-2 text-xs sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:bg-white focus:border-[#0D9488] focus:outline-none"
              />
              <motion.button
                type="submit"
                whileTap={{ scale: 0.94 }}
                disabled={!inputValue.trim() || isTyping}
                aria-label={t.ai.sendLabel}
                className="w-10 h-10 rounded-xl bg-[#0B2545] hover:bg-[#0D9488] text-white flex items-center justify-center transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4 rtl:-scale-x-100" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher Button with Subtle Concentric Pulse Ring */}
      <div className="relative">
        {!isOpen && (
          <motion.span
            aria-hidden="true"
            animate={{ scale: [1, 1.35], opacity: [0.45, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[#0D9488]"
          />
        )}
        <motion.button
          type="button"
          onClick={() => onToggle(!isOpen)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-expanded={isOpen}
          aria-label={t.ai.launcherLabel}
          className="relative inline-flex items-center gap-2.5 rounded-2xl bg-[#0B2545] hover:bg-[#0D9488] text-white px-4 py-3.5 shadow-[0_14px_32px_-8px_rgba(11,37,69,0.45)] transition-colors duration-200 cursor-pointer"
        >
          {isOpen ? (
            <X className="w-5 h-5 shrink-0" />
          ) : (
            <Bot className="w-5 h-5 text-[#2DD4BF] shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
            {t.ai.launcherLabel}
          </span>
        </motion.button>
      </div>
    </div>
  );
};
