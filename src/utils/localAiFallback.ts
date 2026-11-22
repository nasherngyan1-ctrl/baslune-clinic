import { DOCTORS, MEDICAL_SERVICES, CLINIC_PHONE_DISPLAY } from '../data/clinicData';
import type { Language } from '../types/clinic';

export interface LocalAiReply {
  reply: string;
  suggestBooking: boolean;
  preselectedServiceId?: string;
}

export function generateLocalAiReply(userInput: string, language: Language): LocalAiReply {
  const q = userInput.toLowerCase();

  const mentionsAligners =
    /aligner|orthodont|braces|قاڵب|ڕێککردنەوە|شەفاف|تقويم|شفاف/.test(q);
  const mentionsDental =
    mentionsAligners ||
    /dental|tooth|teeth|veneer|implant|whiten|smile|ددان|زەردەخەنە|ڤینیەر|چاندن|سپی|أسنان|اسنان|ابتسامة|فينير|زراعة|تبييض/.test(
      q,
    );
  const mentionsDerm =
    /skin|derm|laser|acne|scar|hydra|facial|پێست|لەیزەر|لایزەر|زیپکە|هایدرا|جلد|بشرة|ليزر|حب الشباب|هيدرافيشل|ندبات/.test(
      q,
    );
  const mentionsPreventive =
    /checkup|blood|vitamin|iv|preventive|general|پشکنین|گشتی|خۆپارێزی|ڤیتامین|فحص|شامل|وقائي|فيتامين/.test(
      q,
    );
  const mentionsPrice =
    /price|cost|fee|usd|iqd|how much|نرخ|چەند|تێچوو|پارە|سعر|أسعار|تكلفة|بكم/.test(q);
  const mentionsLocationHours =
    /where|location|address|erbil|empire|hour|open|time|when|phone|whatsapp|ناونیشان|شوێن|هەولێر|ئێمپایەر|کەی|کات|کراوە|ژمارە|أين|موقع|عنوان|أربيل|امباير|ساعات|مفتوح|دوام|هاتف|واتساب/.test(
      q,
    );
  const mentionsDoctors =
    /doctor|specialist|sara|karwan|rezan|دکتۆر|پزیشک|پسپۆڕ|سارا|کاروان|ڕێزان|دكتور|طبيب|أطباء|سارة|كاروان|ريزان/.test(
      q,
    );
  const mentionsBooking =
    /book|appointment|reserve|schedule|slot|حجز|کات|تۆمار|سەردان|موعد|احجز/.test(q);

  if (mentionsLocationHours) {
    if (language === 'ku') {
      return {
        reply: `کلینیکی باسلون لە هەولێر، شەقامی ١٠٠ مەتری، ناوچەی ئێمپایەر وۆڕڵد هەڵکەوتووە. ڕۆژانی شەممە تا پێنجشەممە لە کاتژمێر ١٠:٠٠ بەیانی تا ٨:٠٠ ئێوارە کراوەیە (هەینی داخراوە). بۆ پەیوەندی ڕاستەوخۆ و واتسئەپ: ${CLINIC_PHONE_DISPLAY}.`,
        suggestBooking: true,
      };
    }
    if (language === 'ar') {
      return {
        reply: `تقع عيادة باسلون في أربيل، شارع ١٠٠ متر، منطقة إمباير وورلد. نعمل من السبت إلى الخميس من ١٠:٠٠ صباحاً حتى ٨:٠٠ مساءً (الجمعة مغلق). للتواصل المباشر أو الواتساب: ${CLINIC_PHONE_DISPLAY}.`,
        suggestBooking: true,
      };
    }
    return {
      reply: `BASLUNE Clinic is located on 100m Street, Empire World Area, Erbil. We are open Saturday through Thursday from 10:00 AM to 8:00 PM (closed Fridays). Direct phone & WhatsApp: ${CLINIC_PHONE_DISPLAY}.`,
      suggestBooking: true,
    };
  }

  if (mentionsDental) {
    const dentalServices = MEDICAL_SERVICES.filter((s) => s.category === 'dental');
    const preselect = mentionsAligners ? 'clear-aligners' : dentalServices[0].id;
    const lines = dentalServices
      .map((s) => `• ${s.title[language]}: $${s.priceUsd} (${s.priceIqd} IQD)`)
      .join('\n');

    if (language === 'ku') {
      return {
        reply: `لە بەشی ددان لەگەڵ د. سارا هەورامی ئەمانە پێشکەش دەکرێن:\n${lines}\nدەتوانیت ڕاستەوخۆ کات حجز بکەیت.`,
        suggestBooking: true,
        preselectedServiceId: preselect,
      };
    }
    if (language === 'ar') {
      return {
        reply: `في قسم طب وتجميل الأسنان مع د. سارة هورامي تتوفر الخدمات التالية:\n${lines}`,
        suggestBooking: true,
        preselectedServiceId: preselect,
      };
    }
    return {
      reply: `In Cosmetic & Restorative Dentistry with Dr. Sara Hawrami, starting rates are:\n${lines}`,
      suggestBooking: true,
      preselectedServiceId: preselect,
    };
  }

  if (mentionsDerm) {
    const dermServices = MEDICAL_SERVICES.filter((s) => s.category === 'dermatology');
    if (language === 'ku') {
      return {
        reply: `لە بەشی پێست و لەیزەر لەگەڵ د. کاروان بارزانی:\n• ${dermServices[0].title.ku}: $${dermServices[0].priceUsd} (${dermServices[0].priceIqd} IQD)\n• ${dermServices[1].title.ku}: $${dermServices[1].priceUsd} (${dermServices[1].priceIqd} IQD)\n• ${dermServices[2].title.ku}: $${dermServices[2].priceUsd} (${dermServices[2].priceIqd} IQD)`,
        suggestBooking: true,
        preselectedServiceId: dermServices[0].id,
      };
    }
    if (language === 'ar') {
      return {
        reply: `في قسم الجلدية والليزر مع د. كاروان بارزاني:\n• ${dermServices[0].title.ar}: $${dermServices[0].priceUsd} (${dermServices[0].priceIqd} IQD)\n• ${dermServices[1].title.ar}: $${dermServices[1].priceUsd} (${dermServices[1].priceIqd} IQD)\n• ${dermServices[2].title.ar}: $${dermServices[2].priceUsd} (${dermServices[2].priceIqd} IQD)`,
        suggestBooking: true,
        preselectedServiceId: dermServices[0].id,
      };
    }
    return {
      reply: `In Dermatology & Laser with Dr. Karwan Barzani, starting rates are:\n• ${dermServices[0].title.en}: $${dermServices[0].priceUsd} (${dermServices[0].priceIqd} IQD)\n• ${dermServices[1].title.en}: $${dermServices[1].priceUsd} (${dermServices[1].priceIqd} IQD)\n• ${dermServices[2].title.en}: $${dermServices[2].priceUsd} (${dermServices[2].priceIqd} IQD)`,
      suggestBooking: true,
      preselectedServiceId: dermServices[0].id,
    };
  }

  if (mentionsPreventive) {
    const prevServices = MEDICAL_SERVICES.filter((s) => s.category === 'preventive');
    if (language === 'ku') {
      return {
        reply: `لە بەشی پزیشکی گشتی و خۆپارێزی لەگەڵ د. ڕێزان مستەفا:\n• ${prevServices[0].title.ku}: $${prevServices[0].priceUsd} (${prevServices[0].priceIqd} IQD)\n• ${prevServices[1].title.ku}: $${prevServices[1].priceUsd} (${prevServices[1].priceIqd} IQD)`,
        suggestBooking: true,
        preselectedServiceId: prevServices[0].id,
      };
    }
    if (language === 'ar') {
      return {
        reply: `في قسم الطب العام والوقائي مع د. ريزان مصطفى:\n• ${prevServices[0].title.ar}: $${prevServices[0].priceUsd} (${prevServices[0].priceIqd} IQD)\n• ${prevServices[1].title.ar}: $${prevServices[1].priceUsd} (${prevServices[1].priceIqd} IQD)`,
        suggestBooking: true,
        preselectedServiceId: prevServices[0].id,
      };
    }
    return {
      reply: `In General & Preventive Medicine with Dr. Rezan Mustafa:\n• ${prevServices[0].title.en}: $${prevServices[0].priceUsd} (${prevServices[0].priceIqd} IQD)\n• ${prevServices[1].title.en}: $${prevServices[1].priceUsd} (${prevServices[1].priceIqd} IQD)`,
      suggestBooking: true,
      preselectedServiceId: prevServices[0].id,
    };
  }

  if (mentionsPrice) {
    if (language === 'ku') {
      return {
        reply:
          'نرخە سەرەتاییەکانمان بەم شێوەیەن:\n• پێست و هایدرافەیشاڵ: لە $85 (110,000 IQD) بۆ $110\n• سپیکردنەوەی ددان بە لەیزەر: $140 (185,000 IQD)\n• ڤینیەری ددان: $280 (365,000 IQD)\n• پشکنینی گشتیی تەندروستی: $120 (155,000 IQD)\nحەز دەکەیت کام خزمەتگوزارییە حجز بکەیت؟',
        suggestBooking: true,
      };
    }
    if (language === 'ar') {
      return {
        reply:
          'تبدأ أسعار خدماتنا من:\n• الهيدرافيشل والليزر الطبي: $85 – $110 (110,000 – 145,000 IQD)\n• تبييض الأسنان بالليزر: $140 (185,000 IQD)\n• الفينير التجميلي: $280 (365,000 IQD)\n• الفحص الطبي الشامل: $120 (155,000 IQD)\nهل ترغب في حجز موعد الآن؟',
        suggestBooking: true,
      };
    }
    return {
      reply:
        'Our transparent starting prices include:\n• HydraFacial & Laser Skin Care: $85 – $110 (110,000 – 145,000 IQD)\n• Laser Teeth Whitening: $140 (185,000 IQD)\n• Porcelain Veneers: $280 (365,000 IQD)\n• Executive Health Checkup: $120 (155,000 IQD)\nWould you like me to open the booking schedule?',
      suggestBooking: true,
    };
  }

  if (mentionsDoctors) {
    if (language === 'ku') {
      return {
        reply: `پزیشکە پسپۆڕەکانمان لە هەولێر:\n• ${DOCTORS[0].name.ku} — ${DOCTORS[0].specialty.ku}\n• ${DOCTORS[1].name.ku} — ${DOCTORS[1].specialty.ku}\n• ${DOCTORS[2].name.ku} — ${DOCTORS[2].specialty.ku}\nهەموویان بە کوردی و عەرەبی و ئینگلیزی قسە دەکەن.`,
        suggestBooking: true,
      };
    }
    if (language === 'ar') {
      return {
        reply: `نخبة أطبائنا في أربيل:\n• ${DOCTORS[0].name.ar} — ${DOCTORS[0].specialty.ar}\n• ${DOCTORS[1].name.ar} — ${DOCTORS[1].specialty.ar}\n• ${DOCTORS[2].name.ar} — ${DOCTORS[2].specialty.ar}\nجميعهم يتحدثون الكردية والعربية والإنجليزية.`,
        suggestBooking: true,
      };
    }
    return {
      reply: `Our Erbil specialists:\n• ${DOCTORS[0].name.en} — ${DOCTORS[0].specialty.en}\n• ${DOCTORS[1].name.en} — ${DOCTORS[1].specialty.en}\n• ${DOCTORS[2].name.en} — ${DOCTORS[2].specialty.en}\nAll speak Kurdish, Arabic, and English.`,
      suggestBooking: true,
    };
  }

  if (mentionsBooking) {
    if (language === 'ku') {
      return {
        reply:
          'بە خۆشحاڵییەوە! دەتوانیت لە کەمتر لە خولەکێکدا خزمەتگوزاری، پزیشک، ڕۆژ و کاتی گونجاوت هەڵبژێریت و کۆدی حجز وەربگریت. کلیک لە دوگمەی خوارەوە بکە بۆ دەستپێکردن.',
        suggestBooking: true,
      };
    }
    if (language === 'ar') {
      return {
        reply:
          'بكل سرور! يمكنك اختيار الخدمة والطبيب والتاريخ والوقت المناسب في أقل من دقيقة والحصول على رمز حجز فوري. اضغط على الزر أدناه للبدء.',
        suggestBooking: true,
      };
    }
    return {
      reply:
        'Certainly! You can select your department, specialist, date, and preferred time slot in under a minute and receive an instant confirmation code. Click below to open the scheduler.',
      suggestBooking: true,
    };
  }

  if (language === 'ku') {
    return {
      reply:
        'سوپاس بۆ پەیوەندیت بە کلینیکی باسلون لە هەولێر. دەتوانم زانیاریت پێبدەم لەسەر نرخەکانی ددان و پێست و پشکنینی گشتی، ناونیشانی ئێمپایەر وۆڕڵد، یان یارمەتیت بدەم لە حجزکردنی کات.',
      suggestBooking: true,
    };
  }
  if (language === 'ar') {
    return {
      reply:
        'شكراً لتواصلك مع عيادة باسلون في أربيل. يسعدني تزويدك بالأسعار، ساعات العمل في إمباير وورلد، معلومات الأطباء، أو مساعدتك في حجز موعدك مباشرة.',
      suggestBooking: true,
    };
  }
  return {
    reply:
      'Thank you for reaching BASLUNE Clinic in Erbil. I can share pricing for dental, laser dermatology, or preventive care, confirm our Empire World hours, or help you book an appointment.',
    suggestBooking: true,
  };
}
