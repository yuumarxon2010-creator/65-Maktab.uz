import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser with higher limit for image uploads (base64)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// ----------------------------------------------------------------------------
// 65-MAKTABAI: MULTIMODAL CHAT API ROUTE (Text + Vision Analysis)
// ----------------------------------------------------------------------------
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history, image } = req.body;
    if (!message && !image) {
      return res.status(400).json({ error: "Xabar yoki rasm kiritilmadi" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY server muhitida topilmadi. Iltimos, Secrets orqali o'rnating." 
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `Siz Samarqand viloyati, Pastdarg'om tumani 65-sonli umumta'lim maktabining "65-MaktabAI" intellektual o'qituvchi va murabbiy yordamchisisiz.
Vazifalaringiz:
1. O'quvchilarga maktab fanlari (Matematika, Fizika, Kimyo, Biologiya, Ona tili va adabiyot, Ingliz tili, Tarix, Informatika, Dasturlash) bo'yicha saboq berish, savollarga tushunarli, pedagogik va rag'batlantiruvchi tarzda javob qaytarish.
2. Agar o'quvchi masala, darslik yoki daftar suratini yuborsa (Vision tahlili): masalani sinchiklab o'qib, formulalar va bosqichma-bosqich yechimini o'zbek tilida batafsil tushuntirib bering.
3. Maktab ma'lumotlari:
   - To'liq nomi: Samarqand viloyati, Pastdarg'om tumani 65-sonli umumta'lim maktabi.
   - Rasmiy pochta: 65maktab.uz@gmail.com (bog'lanish uchun: y.u.umarxon2010@gmail.com).
   - Telefon: +998 77 293 64 88.
   - Telegram bot: @pastdargom_65maktab_uzbot.
   - To'garaklar: IT va Dasturlash, Ingliz tili (IELTS/CEFR), Shaxmat, Voleybol, Yosh kimyogarlar, Robototexnika.
4. Foydalanuvchi "Menga rasmini chizib ber: ..." yoki rasm yaratishni so'rasa, tasvir yaratish bo'yicha batafsil g'oya va ko'rsatma bering hamda rasm generatsiya tugmasidan foydalanishni taklif qiling.
5. Har doim samimiy, do'stona, hurmat bilan ("Siz" deb) va toza o'zbek adabiy tilida so'zlang.`;

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const item of history) {
        if (item.text) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }
    }

    // Build current user parts (multimodal: image + text)
    const userParts: any[] = [];
    if (image && image.data) {
      userParts.push({
        inlineData: {
          data: image.data,
          mimeType: image.mimeType || 'image/jpeg',
        },
      });
    }

    userParts.push({
      text: message || (image ? "Iltimos, ushbu rasm / masalani tahlil qilib, to'liq yechimini tushuntirib bering." : ""),
    });

    contents.push({
      role: 'user',
      parts: userParts,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.json({ reply: response.text });
  } catch (error: any) {
    console.error("65-MaktabAI API error:", error);
    return res.status(500).json({ 
      error: error?.message || "65-MaktabAI bilan bog'lanishda xatolik yuz berdi" 
    });
  }
});

// ----------------------------------------------------------------------------
// 65-MAKTABAI: IMAGE GENERATION ROUTE (Gemini Imagen / Flash Lite Image)
// ----------------------------------------------------------------------------
app.post('/api/gemini/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: "Rasm uchun tavsif (prompt) kiritilmadi" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY topilmadi." 
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Try generating image using gemini-3.1-flash-lite-image
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [
          {
            text: `High quality educational illustration for school: ${prompt}`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    let imageUrl: string | null = null;
    let descriptionText = "";

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          imageUrl = `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          break;
        } else if (part.text) {
          descriptionText += part.text;
        }
      }
    }

    if (imageUrl) {
      return res.json({ imageUrl, prompt, description: descriptionText });
    }

    // If image part was not directly returned, return descriptive prompt
    return res.json({
      imageUrl: null,
      prompt,
      description: descriptionText || "Rasm generatsiyasi yakunlandi.",
    });
  } catch (error: any) {
    console.error("Image generation error:", error);
    return res.status(500).json({ 
      error: error?.message || "Rasm yaratishda xatolik yuz berdi." 
    });
  }
});

// ----------------------------------------------------------------------------
// VITE MIDDLEWARES FOR SPA DEV SERVER
// ----------------------------------------------------------------------------
async function startServer() {
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pastdarg'om tumani 65-Maktab veb-serveri ishga tushdi: http://localhost:${PORT}`);
  });
}

startServer();
