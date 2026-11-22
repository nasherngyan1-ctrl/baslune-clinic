import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface IncomingMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  messages?: IncomingMessage[];
  language?: 'ku' | 'ar' | 'en';
}

const CLINIC_KNOWLEDGE_BASE = `
You are the official trilingual AI Medical Receptionist for BASLUNE Clinic, a premier private medical and aesthetic clinic located on 100m Street, Empire World Area, Erbil, Kurdistan Region of Iraq.

CRITICAL RULES:
1. Reply strictly in the user's active language unless they explicitly ask in another language:
   - 'ku': Central Kurdish (Sorani) in Arabic script (کوردی ناوەڕاست), warm, natural, polite medical phrasing.
   - 'ar': Modern Standard Arabic (العربية الفصحى الراقية), warm, concise, clinical tone.
   - 'en': Clear, reassuring, executive English.
2. Keep replies concise (2 to 4 short sentences or neat short bullet points), practical, and accurate.
3. Never provide definitive medical diagnoses or prescribe medications; advise an in-clinic specialist consultation for clinical diagnosis.
4. Encourage booking an appointment directly through the clinic's online booking portal when relevant.

CLINIC DETAILS:
- Name: BASLUNE Clinic (Erbil)
- Address: 100m Street, Empire World Area, Erbil, Kurdistan Region
- Hours: Saturday – Thursday, 10:00 AM – 8:00 PM (Closed Friday)
- Phone / WhatsApp: +964 750 490 1200
- Sterilization Standard: ISO 9001 & European Class-B Autoclave Sterilization

DOCTORS:
1. Dr. Sara Hawrami — Cosmetic & Restorative Dentistry (DDS, MSc Aesthetic Dentistry, 11+ years exp, speaks Kurdish, Arabic, English). Next available: Today 4:30 PM.
2. Dr. Karwan Barzani — Dermatology & Laser Specialist (MD, Board-Certified Dermatologist, 13+ years exp, speaks Kurdish, Arabic, English). Next available: Today 5:15 PM.
3. Dr. Rezan Mustafa — Aesthetic & Preventive Medicine (MD, MSc Preventive & Longevity Medicine, 9+ years exp, speaks Kurdish, Arabic, English). Next available: Tomorrow 10:30 AM.

SERVICES & STARTING PRICES (USD & IQD):
Dental Care:
- Digital Smile Design & Porcelain Veneers: $280 / 365,000 IQD (60 min)
- Painless Dental Implants: $650 / 850,000 IQD (75 min)
- Laser Teeth Whitening: $140 / 185,000 IQD (45 min)
- Clear Aligner Orthodontics: $950 / 1,240,000 IQD (6 months program)

Dermatology & Laser:
- Medical Laser Hair Removal & Rejuvenation: $95 / 125,000 IQD (40 min)
- Clinical Acne & Scar Protocol: $110 / 145,000 IQD (45 min)
- HydraFacial & Skin Barrier Therapy: $85 / 110,000 IQD (50 min)

General & Preventive Medicine:
- Executive Comprehensive Health Checkup: $120 / 155,000 IQD (60 min)
- Preventive IV Drip & Vitamin Longevity: $90 / 118,000 IQD (45 min)
`;

function getValidApiKey(): string | null {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key || key === 'MY_GEMINI_API_KEY' || key.length < 10) {
    return null;
  }
  return key;
}

async function createServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/chat', async (req: Request, res: Response) => {
    const body = (req.body ?? {}) as ChatRequestBody;
    const language = body.language === 'ar' || body.language === 'en' ? body.language : 'ku';
    const messages = Array.isArray(body.messages) ? body.messages : [];

    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content?.trim();
    if (!lastUserMessage) {
      res.status(400).json({ error: 'Missing user message' });
      return;
    }

    const apiKey = getValidApiKey();
    if (!apiKey) {
      res.json({ useFallback: true, source: 'local-fallback' });
      return;
    }

    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const languageLabel =
        language === 'ku'
          ? 'Central Kurdish (Sorani)'
          : language === 'ar'
          ? 'Arabic'
          : 'English';

      const conversationTranscript = messages
        .slice(-8)
        .map((m) => `${m.role === 'user' ? 'Patient' : 'Receptionist'}: ${m.content}`)
        .join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: `Active UI Language: ${languageLabel}\n\nRecent conversation:\n${conversationTranscript}\n\nRespond to the patient's latest message in ${languageLabel}.`,
        config: {
          systemInstruction: CLINIC_KNOWLEDGE_BASE,
        },
      });

      const replyText = response.text?.trim();
      if (!replyText) {
        res.json({ useFallback: true, source: 'local-fallback' });
        return;
      }

      const lowerMsg = lastUserMessage.toLowerCase();
      const lowerReply = replyText.toLowerCase();
      const suggestBooking =
        /book|appointment|reserve|slot|schedule|حجز|موعد|کات|تۆمار|دکتۆر|طبيب|doctor/.test(
          `${lowerMsg} ${lowerReply}`,
        );

      res.json({
        reply: replyText,
        source: 'gemini',
        suggestBooking,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Gemini request failed';
      res.status(502).json({
        error: message,
        useFallback: true,
        source: 'local-fallback',
      });
    }
  });

  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`BASLUNE Clinic server listening on http://0.0.0.0:${port}`);
  });
}

createServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
