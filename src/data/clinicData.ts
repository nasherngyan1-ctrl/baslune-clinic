import type {
  CaseStudy,
  Doctor,
  FacilityImage,
  MedicalService,
} from '../types/clinic';

export const HERO_CLINIC_IMAGE = '/images/clinic-reception.jpg';

export const CLINIC_PHONE_RAW = '9647504901200';
export const CLINIC_PHONE_DISPLAY = '+964 750 490 1200';

export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: 'smile-veneers',
    category: 'dental',
    icon: 'sparkles',
    title: {
      ku: 'دیزاینی زەردەخەنەی دیجیتاڵی و ڤینیەر',
      ar: 'تصميم الابتسامة الرقمي والفينير',
      en: 'Digital Smile Design & Veneers',
    },
    description: {
      ku: 'نەخشەسازی سێڕەهەندیی زەردەخەنە بە پۆرسەلینی ئەڵمانی بێ هەڵکۆڵینی زیادەی ددان.',
      ar: 'تخطيط ثلاثي الأبعاد للابتسامة باستخدام عدسات البورسلين الألمانية بدقة متناهية.',
      en: '3D facial-harmony smile mapping with ultra-thin German porcelain veneers.',
    },
    durationMinutes: 60,
    priceUsd: 280,
    priceIqd: '365,000',
  },
  {
    id: 'dental-implants',
    category: 'dental',
    icon: 'shieldCheck',
    title: {
      ku: 'چاندنی ددانی بێ ئازار (سویسری)',
      ar: 'زراعة الأسنان السويسرية بدون ألم',
      en: 'Painless Swiss Dental Implants',
    },
    description: {
      ku: 'چاندنی ددان بە تەکنەلۆژیای ڕێنمایی دیجیتاڵی و سڕکردنی بێ ئازار بە گەرەنتی درێژخایەن.',
      ar: 'زراعة الأسنان الموجهة رقمياً بتخدير مريح ودقة عالية لضمان ثبات دائم.',
      en: '3D-guided implant placement under gentle anesthesia with lifetime warranty.',
    },
    durationMinutes: 75,
    priceUsd: 650,
    priceIqd: '850,000',
  },
  {
    id: 'laser-whitening',
    category: 'dental',
    icon: 'sun',
    title: {
      ku: 'سپیکردنەوەی ددان بە لەیزەر',
      ar: 'تبييض الأسنان بالليزر الطبي',
      en: 'Laser Teeth Whitening',
    },
    description: {
      ku: 'سپیکردنەوەی خێرای ددان لە یەک دانیشتندا بە پاراستنی تەواوی مینا و بێ هەستیاری.',
      ar: 'تفتيح فوري للأسنان خلال جلسة واحدة مع حماية كاملة لمينا الأسنان ومنع التحسس.',
      en: 'Single-session cold-laser brightening up to 6 shades with enamel desensitizer.',
    },
    durationMinutes: 45,
    priceUsd: 140,
    priceIqd: '185,000',
  },
  {
    id: 'clear-aligners',
    category: 'dental',
    icon: 'sparkles',
    title: {
      ku: 'ڕێککردنەوەی ددان بە قاڵبی شەفاف (Aligners)',
      ar: 'تقويم الأسنان الشفاف',
      en: 'Clear Aligner Orthodontics',
    },
    description: {
      ku: 'ڕێککردنەوەی ددان بێ تەل و براکێت بە قاڵبی شەفافی سێڕەهەندی و بەدواداچوونی دیجیتاڵی.',
      ar: 'تصحيح اصطفاف الأسنان بقوالب شفافة مريحة ومصممة رقمياً خلال ٦ أشهر.',
      en: 'Discreet 3D-mapped clear aligner therapy for balanced bite alignment in 6 months.',
    },
    durationMinutes: 45,
    priceUsd: 950,
    priceIqd: '1,240,000',
  },
  {
    id: 'laser-rejuvenation',
    category: 'dermatology',
    icon: 'zap',
    title: {
      ku: 'لەیزەری پزیشکی و نوێکردنەوەی پێست',
      ar: 'الليزر الطبي وتجديد نضارة البشرة',
      en: 'Medical Laser & Skin Rejuvenation',
    },
    description: {
      ku: 'چارەسەری پەڵە و تێکچوونی ڕەنگی پێست و لابردنی موو بە ئامێری لەیزەری دوو شەپۆلی.',
      ar: 'علاج التصبغات وتوحيد لون البشرة وإزالة الشعر بأحدث أجهزة الليزر المزدوجة.',
      en: 'Dual-wavelength medical laser for pigmentation, tone clarity, and hair removal.',
    },
    durationMinutes: 40,
    priceUsd: 95,
    priceIqd: '125,000',
  },
  {
    id: 'acne-scar-protocol',
    category: 'dermatology',
    icon: 'activity',
    title: {
      ku: 'پرۆتۆکۆڵی پزیشکی زیپکە و شوێنەوار',
      ar: 'بروتوكول علاج حب الشباب والندبات',
      en: 'Clinical Acne & Scar Protocol',
    },
    description: {
      ku: 'چارەسەری تێکەڵەی پزیشکی بۆ زیپکەی چالاک و چاککردنەوەی چاڵی پێست بە مایکرۆنیدڵی RF.',
      ar: 'علاج متكامل لحب الشباب النشط وتحسين الندبات بتقنية التردد الحراري الدقيق.',
      en: 'Targeted dermatology care combining medical peels and fractional RF microneedling.',
    },
    durationMinutes: 45,
    priceUsd: 110,
    priceIqd: '145,000',
  },
  {
    id: 'hydrafacial-barrier',
    category: 'dermatology',
    icon: 'droplets',
    title: {
      ku: 'هایدرافەیشاڵ و ڕووناککردنەوەی ژێر چاو',
      ar: 'الهيدرافيشل وتفتيح محيط العين',
      en: 'Hydrafacial & Under-Eye Brightening',
    },
    description: {
      ku: 'خاوێنکردنەوەی قووڵی کونیلەکان و گێڕانەوەی تەندروستی پێست بە سیرەمی پزیشکی.',
      ar: 'تنظيف عميق للمسام وتغذية البشرة وتفتيح الهالات بسيرومات طبية مخصصة.',
      en: 'Medical-grade vortex cleansing and antioxidant infusion for luminous skin.',
    },
    durationMinutes: 50,
    priceUsd: 85,
    priceIqd: '110,000',
  },
  {
    id: 'executive-checkup',
    category: 'preventive',
    icon: 'stethoscope',
    title: {
      ku: 'پشکنینی گشتیی پێشکەوتووی تەندروستی',
      ar: 'الفحص الطبي الشامل المتقدم',
      en: 'Executive Comprehensive Checkup',
    },
    description: {
      ku: 'شیکاری تەواوی خوێن، هۆرمۆنەکان، ڤیتامینەکان و پشکنینی دڵ لەگەڵ ڕاپۆرتی پزیشکی.',
      ar: 'فحص شامل للدم والهرمونات والفيتامينات وتقييم صحة القلب مع تقرير طبي مفصل.',
      en: 'Full metabolic, hormone, vitamin, and cardiac screening with specialist review.',
    },
    durationMinutes: 60,
    priceUsd: 120,
    priceIqd: '155,000',
  },
  {
    id: 'preventive-iv-longevity',
    category: 'preventive',
    icon: 'heartPulse',
    title: {
      ku: 'چارەسەری ڤیتامین و بەهێزکردنی بەرگری',
      ar: 'محاليل الفيتامينات والطب الوقائي',
      en: 'Preventive IV Drip & Longevity',
    },
    description: {
      ku: 'پڕکردنەوەی خێرای ڤیتامینەکان و دژەئۆکسانەکان بەپێی پشکنینی خوێن و پێویستیی جەستە.',
      ar: 'تعويض سريع للفيتامينات ومضادات الأكسدة بناءً على تحاليلك المخبرية الدقيقة.',
      en: 'Custom physician-formulated micronutrient infusion tailored to lab biomarkers.',
    },
    durationMinutes: 45,
    priceUsd: 90,
    priceIqd: '118,000',
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-sara',
    name: {
      ku: 'د. سارا هەورامی',
      ar: 'د. سارة هورامي',
      en: 'Dr. Sara Hawrami',
    },
    specialty: {
      ku: 'پسپۆڕی جوانکاری و چاککردنەوەی ددان',
      ar: 'أخصائية طب وتجميل الأسنان الترميمي',
      en: 'Cosmetic & Restorative Dentistry',
    },
    department: 'dental',
    credentials: 'DDS · MSc Aesthetic Dentistry',
    experienceYears: 11,
    languages: {
      ku: 'کوردی · عەرەبی · ئینگلیزی',
      ar: 'الكردية · العربية · الإنجليزية',
      en: 'Kurdish · Arabic · English',
    },
    nextAvailable: {
      ku: 'ئەمڕۆ ٤:٣٠ ئێوارە',
      ar: 'اليوم ٤:٣٠ مساءً',
      en: 'Today 4:30 PM',
    },
    imageUrl: '/src/assets/images/doctor_sara_hawrami_1795370033608.jpg',
  },
  {
    id: 'dr-karwan',
    name: {
      ku: 'د. کاروان بارزانی',
      ar: 'د. كاروان بارزاني',
      en: 'Dr. Karwan Barzani',
    },
    specialty: {
      ku: 'پسپۆڕی نەخۆشییەکانی پێست و لەیزەر',
      ar: 'استشاري الأمراض الجلدية والليزر الطبي',
      en: 'Dermatology & Laser Specialist',
    },
    department: 'dermatology',
    credentials: 'MD · Board-Certified Dermatologist',
    experienceYears: 13,
    languages: {
      ku: 'کوردی · عەرەبی · ئینگلیزی',
      ar: 'الكردية · العربية · الإنجليزية',
      en: 'Kurdish · Arabic · English',
    },
    nextAvailable: {
      ku: 'ئەمڕۆ ٥:١٥ ئێوارە',
      ar: 'اليوم ٥:١٥ مساءً',
      en: 'Today 5:15 PM',
    },
    imageUrl: '/src/assets/images/doctor_karwan_barzani_1795370033233.jpg',
  },
  {
    id: 'dr-rezan',
    name: {
      ku: 'د. ڕێزان مستەفا',
      ar: 'د. ريزان مصطفى',
      en: 'Dr. Rezan Mustafa',
    },
    specialty: {
      ku: 'پسپۆڕی پزیشکی جوانکاری و خۆپارێزی',
      ar: 'أخصائية الطب الوقائي والتجميلي',
      en: 'Aesthetic & Preventive Medicine',
    },
    department: 'preventive',
    credentials: 'MD · MSc Preventive & Longevity Medicine',
    experienceYears: 9,
    languages: {
      ku: 'کوردی · عەرەبی · ئینگلیزی',
      ar: 'الكردية · العربية · الإنجليزية',
      en: 'Kurdish · Arabic · English',
    },
    nextAvailable: {
      ku: 'سبەی ١٠:٣٠ بەیانی',
      ar: 'غداً ١٠:٣٠ صباحاً',
      en: 'Tomorrow 10:30 AM',
    },
    imageUrl: '/src/assets/images/doctor_rezan_mustafa_1795370054628.jpg',
  },
];

export const FACILITY_GALLERY: FacilityImage[] = [
  {
    id: 'facility-lounge',
    imageUrl: '/images/clinic-lounge.jpg',
    title: {
      ku: 'هۆڵی چاوەڕوانیی تایبەت (VIP)',
      ar: 'صالة انتظار المرضى الخاصة (VIP)',
      en: 'VIP Patient Waiting Lounge',
    },
    tag: {
      ku: 'ژینگەی ئارام · تیشکی سروشتی',
      ar: 'أجواء هادئة · إضاءة طبيعية',
      en: 'Architectural Serenity · Natural Light',
    },
    colSpanClass: 'lg:col-span-7',
  },
  {
    id: 'facility-dental',
    imageUrl: '/images/clinic-dental.jpg',
    title: {
      ku: 'بەشی پزیشکی و جوانکاریی ددان',
      ar: 'جناح طب وتجميل الأسنان الحديث',
      en: 'Modern Cosmetic Dentistry Suite',
    },
    tag: {
      ku: 'تیشکی پانۆراما · سکانەری سێڕەهەندی',
      ar: 'أشعة رقمية · مسح ثلاثي الأبعاد',
      en: 'Digital Panoramic X-Ray · 3D Scan',
    },
    colSpanClass: 'lg:col-span-5',
  },
  {
    id: 'facility-laser',
    imageUrl: '/images/clinic-laser.jpg',
    title: {
      ku: 'ژووری پێست و لەیزەری پزیشکی',
      ar: 'جناح الجلدية والليزر الطبي',
      en: 'Dermatology & Laser Treatment Suite',
    },
    tag: {
      ku: 'ئامێری لەیزەری ئەوروپی FDA',
      ar: 'أجهزة ليزر معتمدة من FDA',
      en: 'FDA-Cleared Medical Laser Systems',
    },
    colSpanClass: 'lg:col-span-5',
  },
  {
    id: 'facility-office',
    imageUrl: '/images/clinic-office.jpg',
    title: {
      ku: 'ژووری ڕاوێژکاریی تایبەتی دکتۆر',
      ar: 'مكتب الاستشارة الطبية الخاص',
      en: 'Private Doctor Consultation Office',
    },
    tag: {
      ku: 'تایبەتمەندیی تەواو · پلاندانانی چارەسەر',
      ar: 'خصوصية تامة · تخطيط علاجي دقيق',
      en: 'One-on-One Diagnostic Review',
    },
    colSpanClass: 'lg:col-span-7',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-whitening',
    category: 'dental',
    imageUrl: '/images/case-whitening.jpg',
    title: {
      ku: 'سپیکردنەوەی ددان بە لەیزەر',
      ar: 'تبييض الأسنان بالليزر',
      en: 'Laser Teeth Whitening',
    },
    sessionMeta: {
      ku: '١ دانیشتن · ٤٥ خولەک',
      ar: 'جلسة واحدة · ٤٥ دقيقة',
      en: '1 Session · 45 min',
    },
    doctorId: 'dr-sara',
    serviceId: 'laser-whitening',
  },
  {
    id: 'case-veneers',
    category: 'dental',
    imageUrl: '/images/case-veneers.jpg',
    title: {
      ku: 'پۆرسەلینی ڤینیەر / زەردەخەنەی هۆلیوود',
      ar: 'عدسات الفينير / ابتسامة هوليوود',
      en: 'Porcelain Veneers / Hollywood Smile',
    },
    sessionMeta: {
      ku: '٢ سەردان · پۆرسەلینی ئەڵمانی',
      ar: 'زيارتان · بورسلين ألماني',
      en: '2 Visits · German Porcelain',
    },
    doctorId: 'dr-sara',
    serviceId: 'smile-veneers',
  },
  {
    id: 'case-acne',
    category: 'dermatology',
    imageUrl: '/images/case-acne.jpg',
    title: {
      ku: 'چارەسەری زیپکە و نوێکردنەوەی پێست بە لەیزەر',
      ar: 'علاج حب الشباب وتجديد البشرة بالليزر',
      en: 'Acne & Laser Skin Rejuvenation',
    },
    sessionMeta: {
      ku: '٤ دانیشتن · پرۆتۆکۆڵی پزیشکی',
      ar: '٤ جلسات · بروتوكول طبي',
      en: '4 Sessions · Clinical Protocol',
    },
    doctorId: 'dr-karwan',
    serviceId: 'acne-scar-protocol',
  },
  {
    id: 'case-hydrafacial',
    category: 'dermatology',
    imageUrl: '/images/case-hydrafacial.jpg',
    title: {
      ku: 'هایدرافەیشاڵ و ڕووناککردنەوەی ژێر چاو',
      ar: 'الهيدرافيشل وتفتيح محيط العين',
      en: 'Hydrafacial & Under-Eye Brightening',
    },
    sessionMeta: {
      ku: '١ دانیشتن · ٥٠ خولەک',
      ar: 'جلسة واحدة · ٥٠ دقيقة',
      en: '1 Session · 50 min',
    },
    doctorId: 'dr-karwan',
    serviceId: 'hydrafacial-barrier',
  },
  {
    id: 'case-aligners',
    category: 'dental',
    imageUrl: '/images/case-aligners.jpg',
    title: {
      ku: 'ڕێککردنەوەی ددان بە قاڵبی شەفاف',
      ar: 'تقويم الأسنان الشفاف',
      en: 'Clear Aligner Orthodontics',
    },
    sessionMeta: {
      ku: '٦ مانگ · نەخشەسازی سێڕەهەندی',
      ar: '٦ أشهر · تصميم ثلاثي الأبعاد',
      en: '6 Months · 3D Digital Mapping',
    },
    doctorId: 'dr-sara',
    serviceId: 'clear-aligners',
  },
];

export const TIME_SLOTS = [
  '10:00 AM',
  '11:15 AM',
  '12:30 PM',
  '2:00 PM',
  '3:15 PM',
  '4:30 PM',
  '5:45 PM',
  '7:00 PM',
];
