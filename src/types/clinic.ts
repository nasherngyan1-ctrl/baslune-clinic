export type Language = 'ku' | 'ar' | 'en';

export type ServiceCategory = 'all' | 'dental' | 'dermatology' | 'preventive';

export type ResultsCategory = 'all' | 'dental' | 'dermatology';

export type ServiceIconKey =
  | 'sparkles'
  | 'shieldCheck'
  | 'sun'
  | 'zap'
  | 'droplets'
  | 'activity'
  | 'heartPulse'
  | 'stethoscope';

export interface LocalizedText {
  ku: string;
  ar: string;
  en: string;
}

export interface MedicalService {
  id: string;
  category: Exclude<ServiceCategory, 'all'>;
  icon: ServiceIconKey;
  title: LocalizedText;
  description: LocalizedText;
  durationMinutes: number;
  priceUsd: number;
  priceIqd: string;
}

export interface Doctor {
  id: string;
  name: LocalizedText;
  specialty: LocalizedText;
  department: Exclude<ServiceCategory, 'all'>;
  credentials: string;
  experienceYears: number;
  languages: LocalizedText;
  nextAvailable: LocalizedText;
  imageUrl: string;
}

export interface FacilityImage {
  id: string;
  imageUrl: string;
  title: LocalizedText;
  tag: LocalizedText;
  colSpanClass: string;
}

export interface CaseStudy {
  id: string;
  category: Exclude<ResultsCategory, 'all'>;
  imageUrl: string;
  title: LocalizedText;
  sessionMeta: LocalizedText;
  doctorId: string;
  serviceId: string;
}

export interface LightboxItem {
  id: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  tag?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestBooking?: boolean;
  preselectedServiceId?: string;
}
