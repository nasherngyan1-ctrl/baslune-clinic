import type { Language } from '../types/clinic';

export interface TranslationBundle {
  brandName: string;
  nav: {
    services: string;
    clinic: string;
    results: string;
    doctors: string;
    contact: string;
    book: string;
    bookCta: string;
  };
  hero: {
    statusHours: string;
    headline: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    nextSlotLabel: string;
    nextSlotValue: string;
    ratingBadgeLabel: string;
    ratingBadgeSub: string;
    imageAlt: string;
    stats: {
      patientsValue: string;
      patientsLabel: string;
      ratingValue: string;
      ratingLabel: string;
      specialistsValue: string;
      specialistsLabel: string;
      aiValue: string;
      aiLabel: string;
    };
  };
  facility: {
    kicker: string;
    heading: string;
    subheading: string;
    viewFullscreen: string;
  };
  results: {
    kicker: string;
    heading: string;
    subheading: string;
    tabs: {
      all: string;
      dental: string;
      dermatology: string;
    };
    viewCase: string;
    bookTreatment: string;
    beforeLabel: string;
    afterLabel: string;
  };
  lightbox: {
    close: string;
    previous: string;
    next: string;
  };
  services: {
    kicker: string;
    heading: string;
    subheading: string;
    tabs: {
      all: string;
      dental: string;
      dermatology: string;
      preventive: string;
    };
    startingFrom: string;
    minutesUnit: string;
    bookService: string;
  };
  doctors: {
    kicker: string;
    heading: string;
    subheading: string;
    yearsExp: string;
    speaksLabel: string;
    nextAvailableLabel: string;
    bookDoctor: string;
  };
  booking: {
    modalTitle: string;
    stepLabel: string;
    ofLabel: string;
    steps: {
      service: string;
      doctor: string;
      schedule: string;
      details: string;
    };
    step1Title: string;
    step2Title: string;
    firstAvailableTitle: string;
    firstAvailableDesc: string;
    step3Title: string;
    selectDateLabel: string;
    selectTimeLabel: string;
    step4Title: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    notesLabel: string;
    notesPlaceholder: string;
    nameError: string;
    phoneError: string;
    backBtn: string;
    nextBtn: string;
    confirmBtn: string;
    confirmedTitle: string;
    confirmedSubtitle: string;
    bookingCodeLabel: string;
    summaryService: string;
    summaryDoctor: string;
    summaryDateTime: string;
    summaryPatient: string;
    sendWhatsAppBtn: string;
    doneBtn: string;
    todayLabel: string;
    tomorrowLabel: string;
    closedFridayNote: string;
  };
  ai: {
    launcherLabel: string;
    drawerTitle: string;
    drawerSubtitle: string;
    welcomeMessage: string;
    quickQuestionsLabel: string;
    quickQuestions: string[];
    inputPlaceholder: string;
    sendLabel: string;
    bookNowInChat: string;
    typingLabel: string;
    closeLabel: string;
  };
  contact: {
    kicker: string;
    heading: string;
    subheading: string;
    addressTitle: string;
    addressValue: string;
    hoursTitle: string;
    hoursValue: string;
    hoursClosed: string;
    phoneTitle: string;
    phoneValue: string;
    whatsappCta: string;
    bookOnlineCta: string;
    erbilMapBadge: string;
    erbilDistrictNote: string;
    mapCardTitle: string;
  };
  footer: {
    clinicSummary: string;
    rights: string;
    craftedBy: string;
    studioEmail: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationBundle> = {
  ku: {
    brandName: 'BASLUNE Clinic',
    nav: {
      services: 'خزمەتگوزارییەکان',
      clinic: 'کلینیک',
      results: 'ئەنجامەکان',
      doctors: 'پزیشکەکان',
      contact: 'پەیوەندی',
      book: 'حجزکردنی کات',
      bookCta: 'حجزکردنی کات',
    },
    hero: {
      statusHours: 'ئەمڕۆ کراوەیە لە هەولێر · ١٠:٠٠ بەیانی – ٨:٠٠ ئێوارە',
      headline: 'چاودێریی پزیشکیی پێشکەوتوو بە ستانداردی جیهانی لە هەولێر',
      subtitle:
        'کلینیکی باسلون لە هەولێر پزیشکیی جوانکاریی ددان، پێست و لەیزەر و پشکنینی خۆپارێزی بە نوێترین تەکنەلۆژیای پزیشکی و ستافی پسپۆڕ پێشکەش دەکات.',
      primaryCta: 'حجزکردنی کات',
      secondaryCta: 'قسەکردن لەگەڵ یاریدەدەری زیرەک',
      nextSlotLabel: 'نزیکترین کات',
      nextSlotValue: 'ئەمڕۆ ٤:٣٠ ئێوارە',
      ratingBadgeLabel: '٤.٩★ باشترین کلینیکی هەولێر',
      ratingBadgeSub: 'متمانەی ٢,٥٠٠+ نەخۆش و پاکژکردنەوەی ISO',
      imageAlt: 'پێشوازی مۆدێرن و ئارامی کلینیکی باسلون لە هەولێر',
      stats: {
        patientsValue: '٢,٥٠٠+',
        patientsLabel: 'نەخۆشی دڵخۆش',
        ratingValue: '٤.٩★',
        ratingLabel: 'هەڵسەنگاندنی گشتی',
        specialistsValue: '١٢+',
        specialistsLabel: 'پزیشکی پسپۆڕ',
        aiValue: '٢٤/٧',
        aiLabel: 'پشتیوانی زیرەک',
      },
    },
    facility: {
      kicker: 'گەشتێک لە ناو کلینیکی باسلون',
      heading: 'لە ناوەوەی کلینیکی باسلون',
      subheading:
        'ژینگەیەکی پزیشکیی ئارام و هاوچەرخ لە شەقامی ١٠٠ مەتری هەولێر، دیزاینکراو بۆ تایبەتمەندیی تەواو و ئاسوودەیی نەخۆش.',
      viewFullscreen: 'بینین بە قەبارەی تەواو',
    },
    results: {
      kicker: 'بەڵگەی پزیشکی · پێش و دوای چارەسەر',
      heading: 'ئەنجامە ڕاستەقینەکان — پێش و دوای چارەسەر',
      subheading:
        'وێنەی ڕاستەقینەی چارەسەرە جێبەجێکراوەکان لە بەشەکانی ددان و پێست لە کلینیکی باسلون.',
      tabs: {
        all: 'هەموویان',
        dental: 'ددان',
        dermatology: 'پێست و لەیزەر',
      },
      viewCase: 'بینینی ئەنجام',
      bookTreatment: 'ئەم چارەسەرە حجز بکە',
      beforeLabel: 'پێش چارەسەر',
      afterLabel: 'دوای چارەسەر',
    },
    lightbox: {
      close: 'داخستن',
      previous: 'پێشوو',
      next: 'دواتر',
    },
    services: {
      kicker: 'بەشە پزیشکییەکان و نرخەکان',
      heading: 'خزمەتگوزارییە پزیشکییە پسپۆڕییەکان',
      subheading:
        'هەموو چارەسەرەکان لە ژێر چاودێریی پزیشکیی ورد و بە ئامێری پێشکەوتووی ئەوروپی جێبەجێ دەکرێن بە نرخی ڕوون و شەفاف.',
      tabs: {
        all: 'هەموو بەشەکان',
        dental: 'ددان و جوانکاری ددان',
        dermatology: 'پێست و لەیزەر',
        preventive: 'پزیشکی گشتی و پشکنین',
      },
      startingFrom: 'نرخی دەستپێک',
      minutesUnit: 'خولەک',
      bookService: 'حجزکردنی خزمەتگوزاری',
    },
    doctors: {
      kicker: 'تیمی پزیشکی کلینیک',
      heading: 'پزیشکە پسپۆڕەکانمان',
      subheading:
        'تیمێک لە پزیشکانی خاوەن بڕوانامەی نێودەوڵەتی و ئەزموونی درێژخایەن بۆ پێشکەشکردنی باشترین چاودێری بە زمانی خۆت.',
      yearsExp: 'ساڵ ئەزموون',
      speaksLabel: 'زمانەکان',
      nextAvailableLabel: 'نزیکترین کات',
      bookDoctor: 'حجزکردن لەگەڵ دکتۆر',
    },
    booking: {
      modalTitle: 'حجزکردنی کاتی سەردان',
      stepLabel: 'هەنگاو',
      ofLabel: 'لە',
      steps: {
        service: 'خزمەتگوزاری',
        doctor: 'پزیشک',
        schedule: 'ڕۆژ و کات',
        details: 'زانیاری نەخۆش',
      },
      step1Title: 'بەش یان خزمەتگوزاری هەڵبژێرە',
      step2Title: 'پزیشکی پسپۆڕ هەڵبژێرە',
      firstAvailableTitle: 'یەکەم پزیشکی بەردەست',
      firstAvailableDesc: 'خێراترین کاتی گونجاو لە هەمان ڕۆژ یان سبەی',
      step3Title: 'ڕۆژ و کاتی گونجاو دیاری بکە',
      selectDateLabel: 'ڕۆژی سەردان (٧ ڕۆژی داهاتوو)',
      selectTimeLabel: 'کاتە بەردەستەکان',
      step4Title: 'زانیاری پەیوەندیت بنووسە',
      fullNameLabel: 'ناوی تەواو',
      fullNamePlaceholder: 'نموونە: کارۆ سەردار',
      phoneLabel: 'ژمارەی مۆبایل (+964)',
      phonePlaceholder: '750 123 4567',
      notesLabel: 'تێبینی پزیشکی (ئارەزوومەندانە)',
      notesPlaceholder: 'هەر پرسیار یان داواکارییەکی تایبەت...',
      nameError: 'تکایە ناوی تەواوت بنووسە (لانیکەم ٣ پیت).',
      phoneError: 'تکایە ژمارەی مۆبایلێکی دروستی عێراق بنووسە.',
      backBtn: 'گەڕانەوە',
      nextBtn: 'دواتر',
      confirmBtn: 'دڵنیاکردنەوەی حجز',
      confirmedTitle: 'حجزەکەت بە سەرکەوتوویی تۆمارکرا',
      confirmedSubtitle:
        'تیمی پێشوازی کلینیکی باسلون پێش کاتی سەردانەکەت نامەی دڵنیاکردنەوەت بۆ دەنێرێت.',
      bookingCodeLabel: 'کۆدی حجزکردن',
      summaryService: 'خزمەتگوزاری',
      summaryDoctor: 'پزیشک',
      summaryDateTime: 'ڕۆژ و کات',
      summaryPatient: 'نەخۆش و مۆبایل',
      sendWhatsAppBtn: 'ناردن بە واتسئەپ',
      doneBtn: 'تەواو',
      todayLabel: 'ئەمڕۆ',
      tomorrowLabel: 'سبەی',
      closedFridayNote: 'ڕۆژی هەینی پشووی فەرمی کلینیکە',
    },
    ai: {
      launcherLabel: 'یاریدەدەری زیرەک',
      drawerTitle: 'یاریدەدەری پزیشکی BASLUNE',
      drawerSubtitle: 'وەڵامدانەوەی خێرا بە کوردی، عەرەبی و ئینگلیزی',
      welcomeMessage:
        'سڵاو و بەخێربێیت بۆ کلینیکی باسلون لە هەولێر. چۆن دەتوانم ئەمڕۆ هاوکاریت بکەم لە زانینی نرخەکان، خزمەتگوزارییەکان یان حجزکردنی کات؟',
      quickQuestionsLabel: 'پرسیارە باوەکان',
      quickQuestions: [
        'نرخی خزمەتگوزارییەکانی ددان و پێست چەندە؟',
        'ناونیشان و کاتی کارکردنی کلینیک لە هەولێر چۆنە؟',
        'دەمەوێت کاتێک حجز بکەم لای دکتۆری پسپۆڕ',
      ],
      inputPlaceholder: 'پرسیارەکەت بنووسە...',
      sendLabel: 'ناردن',
      bookNowInChat: 'حجزکردنی کات ئێستا',
      typingLabel: 'یاریدەدەر دەنووسێت...',
      closeLabel: 'داخستن',
    },
    contact: {
      kicker: 'ناونیشان و پەیوەندی لە هەولێر',
      heading: 'سەردانی کلینیکی باسلون بکە لە ئێمپایەر وۆڕڵد',
      subheading:
        'ئاسانترین دەستگەیشتن لەسەر شەقامی ١٠٠ مەتری بە شوێنی تایبەتی پارکینگ و پێشوازی خێرا.',
      addressTitle: 'ناونیشانی کلینیک',
      addressValue: 'شەقامی ١٠٠ مەتری، ناوچەی ئێمپایەر وۆڕڵد، هەولێر، هەرێمی کوردستان',
      hoursTitle: 'کاتی کارکردن',
      hoursValue: 'شەممە – پێنجشەممە · ١٠:٠٠ بەیانی – ٨:٠٠ ئێوارە',
      hoursClosed: 'هەینی: داخراوە',
      phoneTitle: 'پەیوەندی و واتسئەپ',
      phoneValue: '+964 750 490 1200',
      whatsappCta: 'پەیوەندی بە واتسئەپ',
      bookOnlineCta: 'حجزکردنی کات بە ئۆنلاین',
      erbilMapBadge: 'ناوچەی ئێمپایەر وۆڕڵد · شەقامی ١٠٠ مەتری',
      erbilDistrictNote: '٥ خولەک دوور لە فڕۆکەخانەی نێودەوڵەتی هەولێر و پارکی سامی عەبدولڕەحمان',
      mapCardTitle: 'کلینیکی باسلون · هەولێر',
    },
    footer: {
      clinicSummary:
        'ناوەندێکی پزیشکی و جوانکاری مۆدێرن لە هەولێر بۆ ددان، پێست و لەیزەر و پزیشکی خۆپارێزی.',
      rights: '© ٢٠٢٦ BASLUNE Clinic. هەموو مافەکان پارێزراون.',
      craftedBy: 'دروستکراوە لەلایەن BASLUNE Digital Studio',
      studioEmail: 'baslunestudio@gmail.com',
    },
  },

  ar: {
    brandName: 'BASLUNE Clinic',
    nav: {
      services: 'الخدمات',
      clinic: 'العيادة',
      results: 'النتائج',
      doctors: 'الأطباء',
      contact: 'تواصل معنا',
      book: 'حجز موعد',
      bookCta: 'احجز موعداً',
    },
    hero: {
      statusHours: 'مفتوح اليوم في أربيل · ١٠:٠٠ صباحاً – ٨:٠٠ مساءً',
      headline: 'رعاية طبية متقدمة بمعايير عالمية في أربيل',
      subtitle:
        'تقدم عيادة باسلون في أربيل خدمات طب وتجميل الأسنان، الجلدية والليزر، والطب الوقائي باستخدام أحدث الأجهزة الطبية المعتمدة وكوادر استشارية متخصصة.',
      primaryCta: 'احجز موعداً',
      secondaryCta: 'تحدث مع المساعد الذكي',
      nextSlotLabel: 'أقرب موعد متاح',
      nextSlotValue: 'اليوم ٤:٣٠ مساءً',
      ratingBadgeLabel: '4.9★ الأعلى تقييماً في أربيل',
      ratingBadgeSub: 'ثقة +2,500 مريض ومعايير تعقيم ISO',
      imageAlt: 'استقبال عيادة باسلون الحديثة في أربيل',
      stats: {
        patientsValue: '2,500+',
        patientsLabel: 'مريض راضٍ',
        ratingValue: '4.9★',
        ratingLabel: 'تقييم المرضى',
        specialistsValue: '12+',
        specialistsLabel: 'طبيب مختص',
        aiValue: '24/7',
        aiLabel: 'دعم ذكي فوري',
      },
    },
    facility: {
      kicker: 'جولة داخل العيادة',
      heading: 'داخل عيادة باسلون',
      subheading:
        'مساحات علاجية هادئة ومجهزة بأحدث التقنيات الأوروبية في قلب إمباير وورلد بأربيل لراحة المريض وخصوصيته.',
      viewFullscreen: 'عرض بالحجم الكامل',
    },
    results: {
      kicker: 'نتائج سريرية موثقة · قبل وبعد',
      heading: 'نتائج حقيقية — قبل وبعد العلاج',
      subheading:
        'استعرض حالات علاجية حقيقية من قسم طب الأسنان التجميلي والجلدية والليزر في عيادة باسلون.',
      tabs: {
        all: 'الكل',
        dental: 'الأسنان',
        dermatology: 'الجلدية والليزر',
      },
      viewCase: 'معاينة النتيجة',
      bookTreatment: 'احجز هذا العلاج',
      beforeLabel: 'قبل العلاج',
      afterLabel: 'بعد العلاج',
    },
    lightbox: {
      close: 'إغلاق',
      previous: 'السابق',
      next: 'التالي',
    },
    services: {
      kicker: 'الأقسام الطبية والأسعار',
      heading: 'خدمات طبية وتجميلية متخصصة',
      subheading:
        'تُجرى جميع العلاجات بإشراف طبي دقيق وتقنيات تشخيصية متطورة مع وضوح كامل في التكاليف والمدة الزمنية.',
      tabs: {
        all: 'جميع الأقسام',
        dental: 'الأسنان وتجميلها',
        dermatology: 'الجلدية والليزر',
        preventive: 'الطب العام والوقائي',
      },
      startingFrom: 'تبدأ من',
      minutesUnit: 'دقيقة',
      bookService: 'حجز الخدمة',
    },
    doctors: {
      kicker: 'الفريق الطبي الاستشاري',
      heading: 'نخبة الأطباء المختصين',
      subheading:
        'أطباء معتمدون بخبرات إقليمية ودولية لتقديم رعاية طبية مخصصة بلغتك الأم وبأعلى درجات الخصوصية.',
      yearsExp: 'سنوات خبرة',
      speaksLabel: 'اللغات',
      nextAvailableLabel: 'أقرب موعد',
      bookDoctor: 'احجز مع الطبيب',
    },
    booking: {
      modalTitle: 'حجز موعد طبي',
      stepLabel: 'الخطوة',
      ofLabel: 'من',
      steps: {
        service: 'الخدمة',
        doctor: 'الطبيب',
        schedule: 'الموعد',
        details: 'البيانات',
      },
      step1Title: 'اختر القسم أو الخدمة الطبية',
      step2Title: 'اختر الطبيب المختص',
      firstAvailableTitle: 'أول طبيب متاح',
      firstAvailableDesc: 'أقرب موعد متاح اليوم أو غداً حسب التوفر',
      step3Title: 'اختر التاريخ والوقت المناسب',
      selectDateLabel: 'التاريخ (خلال ٧ أيام القادمة)',
      selectTimeLabel: 'الأوقات المتاحة',
      step4Title: 'بيانات المريض للتأكيد',
      fullNameLabel: 'الاسم الكامل',
      fullNamePlaceholder: 'مثال: رواء أحمد',
      phoneLabel: 'رقم الهاتف (+964)',
      phonePlaceholder: '750 123 4567',
      notesLabel: 'ملاحظات طبية (اختياري)',
      notesPlaceholder: 'أي أعراض أو استفسار ترغب في ذكره...',
      nameError: 'يرجى إدخال الاسم الكامل (٣ أحرف على الأقل).',
      phoneError: 'يرجى إدخال رقم هاتف عراقي صحيح.',
      backBtn: 'السابق',
      nextBtn: 'التالي',
      confirmBtn: 'تأكيد الحجز',
      confirmedTitle: 'تم تأكيد حجزك بنجاح',
      confirmedSubtitle:
        'سيتواصل معك فريق الاستقبال في عيادة باسلون قبل موعدك لتأكيد التفاصيل.',
      bookingCodeLabel: 'رمز الحجز',
      summaryService: 'الخدمة المختارة',
      summaryDoctor: 'الطبيب',
      summaryDateTime: 'التاريخ والوقت',
      summaryPatient: 'المريض والهاتف',
      sendWhatsAppBtn: 'إرسال عبر واتساب',
      doneBtn: 'إغلاق',
      todayLabel: 'اليوم',
      tomorrowLabel: 'غداً',
      closedFridayNote: 'العيادة مغلقة يوم الجمعة',
    },
    ai: {
      launcherLabel: 'المساعد الطبي الذكي',
      drawerTitle: 'موظف الاستقبال الذكي BASLUNE',
      drawerSubtitle: 'استشارات فورية بالكردية والعربية والإنجليزية',
      welcomeMessage:
        'أهلاً بك في عيادة باسلون في أربيل. كيف يمكنني مساعدتك اليوم بخصوص الأسعار، الخدمات الطبية، أو حجز موعدك؟',
      quickQuestionsLabel: 'أسئلة سريعة',
      quickQuestions: [
        'ما هي أسعار علاجات الأسنان والجلدية؟',
        'أين موقع العيادة وما هي ساعات العمل في أربيل؟',
        'أرغب في حجز موعد مع طبيب مختص',
      ],
      inputPlaceholder: 'اكتب سؤالك هنا...',
      sendLabel: 'إرسال',
      bookNowInChat: 'احجز موعدك الآن',
      typingLabel: 'جاري كتابة الرد...',
      closeLabel: 'إغلاق',
    },
    contact: {
      kicker: 'الموقع والتواصل في أربيل',
      heading: 'تفضل بزيارة عيادة باسلون في إمباير وورلد',
      subheading:
        'موقع مركزي يسهل الوصول إليه على شارع ١٠٠ متر مع مواقف سيارات خاصة واستقبال سريع.',
      addressTitle: 'عنوان العيادة',
      addressValue: 'شارع ١٠٠ متر، منطقة إمباير وورلد، أربيل، إقليم كردستان',
      hoursTitle: 'ساعات العمل',
      hoursValue: 'السبت – الخميس · ١٠:٠٠ صباحاً – ٨:٠٠ مساءً',
      hoursClosed: 'الجمعة: مغلق',
      phoneTitle: 'الهاتف والواتساب',
      phoneValue: '+964 750 490 1200',
      whatsappCta: 'تواصل عبر واتساب',
      bookOnlineCta: 'احجز موعداً أونلاين',
      erbilMapBadge: 'منطقة إمباير وورلد · شارع ١٠٠ متر',
      erbilDistrictNote: 'على بُعد ٥ دقائق من مطار أربيل الدولي ومنتزه سامي عبد الرحمن',
      mapCardTitle: 'عيادة باسلون · أربيل',
    },
    footer: {
      clinicSummary:
        'مركز طبي وتجميلي حديث في أربيل لطب الأسنان التجميلي، الجلدية والليزر، والطب الوقائي.',
      rights: '© 2026 BASLUNE Clinic. جميع الحقوق محفوظة.',
      craftedBy: 'تصميم وتطوير BASLUNE Digital Studio',
      studioEmail: 'baslunestudio@gmail.com',
    },
  },

  en: {
    brandName: 'BASLUNE Clinic',
    nav: {
      services: 'Services',
      clinic: 'Clinic',
      results: 'Results',
      doctors: 'Doctors',
      contact: 'Contact',
      book: 'Book Appointment',
      bookCta: 'Book Appointment',
    },
    hero: {
      statusHours: 'Open Today in Erbil · 10:00 AM – 8:00 PM',
      headline: 'Advanced Medical & Aesthetic Care in Erbil',
      subtitle:
        'BASLUNE Clinic brings international-standard cosmetic dentistry, laser dermatology, and preventive health diagnostics together in a calm, precision-driven clinical setting.',
      primaryCta: 'Book Appointment',
      secondaryCta: 'Talk to AI Assistant',
      nextSlotLabel: 'Next Slot',
      nextSlotValue: 'Today 4:30 PM',
      ratingBadgeLabel: '4.9★ Erbil Top Rated',
      ratingBadgeSub: '2,500+ patients · ISO sterilization',
      imageAlt: 'Marble reception and patient lounge inside BASLUNE Clinic in Erbil',
      stats: {
        patientsValue: '2,500+',
        patientsLabel: 'Patients Treated',
        ratingValue: '4.9★',
        ratingLabel: 'Patient Rating',
        specialistsValue: '12+',
        specialistsLabel: 'Board Specialists',
        aiValue: '24/7',
        aiLabel: 'AI Support',
      },
    },
    facility: {
      kicker: 'Architectural Tour',
      heading: 'Inside BASLUNE Clinic',
      subheading:
        'Calm, precision-engineered clinical suites on 100m Street in Erbil designed for privacy, comfort, and international sterilization standards.',
      viewFullscreen: 'View Fullscreen',
    },
    results: {
      kicker: 'Verified Clinical Outcomes',
      heading: 'Real Results — Before & After',
      subheading:
        'Documented patient transformations across cosmetic dentistry and medical laser dermatology at BASLUNE Clinic.',
      tabs: {
        all: 'All',
        dental: 'Dental',
        dermatology: 'Dermatology',
      },
      viewCase: 'Inspect Result',
      bookTreatment: 'Book This Treatment',
      beforeLabel: 'Before',
      afterLabel: 'After',
    },
    lightbox: {
      close: 'Close',
      previous: 'Previous',
      next: 'Next',
    },
    services: {
      kicker: 'Clinical Departments & Pricing',
      heading: 'Specialized Medical Services',
      subheading:
        'Every procedure is performed under strict clinical supervision with transparent starting fees in USD and IQD.',
      tabs: {
        all: 'All Services',
        dental: 'Dental Care',
        dermatology: 'Dermatology & Laser',
        preventive: 'General & Preventive',
      },
      startingFrom: 'Starting from',
      minutesUnit: 'min',
      bookService: 'Book Service',
    },
    doctors: {
      kicker: 'Medical Specialists',
      heading: 'Meet Our Clinical Team',
      subheading:
        'Board-certified physicians and aesthetic specialists delivering evidence-based care in Kurdish, Arabic, and English.',
      yearsExp: 'yrs experience',
      speaksLabel: 'Languages',
      nextAvailableLabel: 'Next available',
      bookDoctor: 'Book with Doctor',
    },
    booking: {
      modalTitle: 'Schedule Your Visit',
      stepLabel: 'Step',
      ofLabel: 'of',
      steps: {
        service: 'Service',
        doctor: 'Doctor',
        schedule: 'Date & Time',
        details: 'Patient Info',
      },
      step1Title: 'Choose a Department or Service',
      step2Title: 'Select Your Specialist',
      firstAvailableTitle: 'First Available Specialist',
      firstAvailableDesc: 'Matches you with the earliest opening today or tomorrow',
      step3Title: 'Pick Your Preferred Date & Time',
      selectDateLabel: 'Select Date (Next 7 Days)',
      selectTimeLabel: 'Available Time Slots',
      step4Title: 'Patient Contact Details',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'e.g. Dara Othman',
      phoneLabel: 'Phone Number (+964)',
      phonePlaceholder: '750 123 4567',
      notesLabel: 'Clinical Notes (Optional)',
      notesPlaceholder: 'Share any preferences or questions for the doctor...',
      nameError: 'Please enter your full name (at least 3 characters).',
      phoneError: 'Please enter a valid Iraqi mobile number.',
      backBtn: 'Back',
      nextBtn: 'Continue',
      confirmBtn: 'Confirm Appointment',
      confirmedTitle: 'Appointment Confirmed',
      confirmedSubtitle:
        'Our Erbil reception desk will send you an SMS and WhatsApp reminder prior to your visit.',
      bookingCodeLabel: 'Booking Code',
      summaryService: 'Service',
      summaryDoctor: 'Specialist',
      summaryDateTime: 'Date & Time',
      summaryPatient: 'Patient & Phone',
      sendWhatsAppBtn: 'Send via WhatsApp',
      doneBtn: 'Done',
      todayLabel: 'Today',
      tomorrowLabel: 'Tomorrow',
      closedFridayNote: 'Clinic closed on Fridays',
    },
    ai: {
      launcherLabel: 'AI Receptionist',
      drawerTitle: 'BASLUNE AI Receptionist',
      drawerSubtitle: 'Instant answers in Kurdish, Arabic & English',
      welcomeMessage:
        'Welcome to BASLUNE Clinic in Erbil. How can I assist you today with treatment pricing, working hours, or scheduling your appointment?',
      quickQuestionsLabel: 'Quick questions',
      quickQuestions: [
        'What are the starting prices for dental & laser care?',
        'Where are you located in Erbil and what are your hours?',
        'Help me book an appointment with a specialist',
      ],
      inputPlaceholder: 'Ask about services, prices, or hours...',
      sendLabel: 'Send',
      bookNowInChat: 'Book Appointment Now',
      typingLabel: 'Assistant is typing...',
      closeLabel: 'Close',
    },
    contact: {
      kicker: 'Location & Hours in Erbil',
      heading: 'Visit BASLUNE Clinic at Empire World',
      subheading:
        'Conveniently situated on 100m Street with dedicated patient parking and private consultation suites.',
      addressTitle: 'Clinic Address',
      addressValue: '100m Street, Empire World Area, Erbil, Kurdistan Region',
      hoursTitle: 'Working Hours',
      hoursValue: 'Saturday – Thursday · 10:00 AM – 8:00 PM',
      hoursClosed: 'Friday: Closed',
      phoneTitle: 'Direct Phone & WhatsApp',
      phoneValue: '+964 750 490 1200',
      whatsappCta: 'Message on WhatsApp',
      bookOnlineCta: 'Book Appointment Online',
      erbilMapBadge: 'Empire World Area · 100m Street',
      erbilDistrictNote: '5 minutes from Erbil International Airport & Sami Abdulrahman Park',
      mapCardTitle: 'BASLUNE Clinic · Erbil',
    },
    footer: {
      clinicSummary:
        'Private medical and aesthetic center in Erbil specializing in cosmetic dentistry, laser dermatology, and preventive medicine.',
      rights: '© 2026 BASLUNE Clinic. All rights reserved.',
      craftedBy: 'Crafted by BASLUNE Digital Studio',
      studioEmail: 'baslunestudio@gmail.com',
    },
  },
};
