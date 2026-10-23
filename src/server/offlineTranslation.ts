import {
  findInOfflinePhrasebook,
  transliterateDevanagariToPhonetic,
  transliterateOdiaToPhonetic,
  detectLanguage,
} from '../services/languageRegistry';

export const langNames: Record<string, string> = {
  auto: 'Auto-Detect (Identify input language automatically among Hindi, Mandyali/Mandali Pahadi, Odia for Urmila, Punjabi, Bengali, English, etc.)',
  hi: 'Hindi (हिन्दी - Devanagari script)',
  en: 'Indian English',
  or: 'Odia for Urmila (ओडिया फॉर उर्मिला / ଓଡ଼ିଆ - Odia script)',
  mjl: 'Mandyali / Mandali (माण्डली - Western Pahadi of Mandi, Himachal Pradesh; write in Devanagari script. NOTE: Experimental dialect model, requires native speaker validation)',
  pa: 'Punjabi (ਪੰਜਾਬੀ - Gurmukhi script)',
  bn: 'Bengali (বাংলা - Bengali script)',
  mr: 'Marathi (मराठी - Devanagari script)',
  ta: 'Tamil (தமிழ் - Tamil script)',
  te: 'Telugu (తెలుగు - Telugu script)',
};

// Honest offline translation: ONLY allow exact curated phrasebook matches or same-language passthrough.
// No arbitrary simulated approximations or made-up confidence numbers!
export function getHonestOfflineTranslation(
  text: string,
  sourceLang: string,
  targetLang: string
): { success: boolean; data?: any; error?: string; code?: string } {
  const trimmed = text.trim();
  const effectiveSource = sourceLang === 'auto' ? detectLanguage(trimmed) : sourceLang;

  // 1. Same-language passthrough
  if (effectiveSource === targetLang) {
    let phonetic = trimmed;
    if (effectiveSource === 'hi' || effectiveSource === 'mjl') {
      phonetic = transliterateDevanagariToPhonetic(trimmed);
    } else if (effectiveSource === 'or') {
      phonetic = transliterateOdiaToPhonetic(trimmed);
    }
    return {
      success: true,
      data: {
        translatedText: trimmed,
        phoneticText: phonetic,
        detectedSource: effectiveSource,
        confidence: 1.0,
        isOffline: true,
        engine: 'offline-lexicon',
      },
    };
  }

  // 2. Exact curated phrasebook match
  const phraseMatch = findInOfflinePhrasebook(
    trimmed,
    effectiveSource as any,
    targetLang as any
  );
  if (phraseMatch) {
    return {
      success: true,
      data: {
        translatedText: phraseMatch.text,
        phoneticText: phraseMatch.phonetic,
        detectedSource: effectiveSource,
        confidence: 1.0,
        dialectNotes: phraseMatch.notes || 'Matched from curated offline phrasebook lexicon',
        isOffline: true,
        engine: 'offline-lexicon',
      },
    };
  }

  // 3. Arbitrary uncurated text: FAIL EXPLICITLY.
  // Never simulate or echo text with fabricated success.
  return {
    success: false,
    error: `Offline translation only supports exact phrasebook expressions. Dynamic translation into ${langNames[targetLang] || targetLang} requires an active Gemini API key.`,
    code: 'OFFLINE_PHRASEBOOK_MISS',
  };
}
