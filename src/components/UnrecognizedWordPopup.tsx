import React, { useState } from 'react';
import { Sparkles, Check, X, HelpCircle, BookOpen, Volume2, ArrowRight } from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../services/languageRegistry';
import { customVocabularyService } from '../services/customVocabularyService';
import { audioEngine } from '../services/audioEngine';
import { useTheme } from '../context/ThemeContext';

export interface UnrecognizedWordData {
  word: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  suggestedMeaning?: string;
  suggestedPhonetic?: string;
  sentenceContext?: string;
}

interface UnrecognizedWordPopupProps {
  isOpen: boolean;
  data: UnrecognizedWordData | null;
  onClose: () => void;
  onWordAdded?: (word: string, translation: string) => void;
}

export const UnrecognizedWordPopup: React.FC<UnrecognizedWordPopupProps> = ({
  isOpen,
  data,
  onClose,
  onWordAdded,
}) => {
  const { isDark } = useTheme();

  // Expansion mode when user clicks "हाँ" (Yes)
  const [isEditing, setIsEditing] = useState(false);
  const [meaning, setMeaning] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen || !data) return null;

  const sourceLangName =
    SUPPORTED_LANGUAGES.find((l) => l.code === data.sourceLang)?.name || data.sourceLang;
  const targetLangName =
    SUPPORTED_LANGUAGES.find((l) => l.code === data.targetLang)?.name || data.targetLang;

  // Handle "हाँ" (Yes, Add Word)
  const handleYes = () => {
    setMeaning(data.suggestedMeaning || '');
    setPhonetic(data.suggestedPhonetic || data.word);
    setIsEditing(true);
  };

  // Handle "ना" (No, Ignore)
  const handleNo = () => {
    setIsEditing(false);
    onClose();
  };

  // Handle "ठीक-ठाक" (Maybe / Later)
  const handleMaybe = () => {
    setIsEditing(false);
    onClose();
  };

  // Confirm and Save to Custom Vocabulary Service
  const handleConfirmSave = () => {
    if (!meaning.trim()) {
      setFeedback('कृपया इस शब्द का अर्थ दर्ज करें।');
      return;
    }

    customVocabularyService.addLearnedWord({
      sourceWord: data.word,
      targetTranslation: meaning.trim(),
      phonetic: phonetic.trim() || undefined,
      sourceLang: data.sourceLang,
      targetLang: data.targetLang,
      notes: notes.trim() || `Added via dialect learning prompt in ${sourceLangName}`,
      category: 'User Dialect Word',
    });

    audioEngine.triggerHaptic(50);
    setFeedback(`✓ '${data.word}' को ${sourceLangName} शब्दकोश में जोड़ दिया गया!`);

    if (onWordAdded) {
      onWordAdded(data.word, meaning.trim());
    }

    setTimeout(() => {
      setIsEditing(false);
      setFeedback(null);
      onClose();
    }, 1000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-150 ${
        isDark ? 'bg-black/75' : 'bg-slate-900/35'
      }`}
      onClick={onClose}
    >
      <div
        className={
          isDark
            ? 'w-full max-w-md bg-zinc-900 border border-purple-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-zinc-100'
            : 'w-full max-w-md neo-glass-panel border border-purple-300 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-slate-800'
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isDark
              ? 'bg-gradient-to-r from-purple-950/80 to-zinc-950 border-zinc-800'
              : 'bg-gradient-to-r from-purple-100/90 to-pink-100/70 border-purple-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-1.5 font-mono">
                नया बोली शब्द पाया गया
              </h3>
              <p className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                {sourceLangName} Dialect Word Recognition
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            data-testid="close-word-popup-btn"
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              isDark
                ? 'bg-zinc-800 text-zinc-400 hover:text-zinc-100'
                : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-200'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Detected Word Spotlight */}
          <div
            className={`p-3.5 rounded-2xl border text-center space-y-1 ${
              isDark
                ? 'bg-purple-950/30 border-purple-800/40 text-purple-200'
                : 'bg-purple-50 border-purple-200 text-purple-900'
            }`}
          >
            <span className={`text-[10px] uppercase font-mono tracking-wider font-semibold block ${isDark ? 'text-purple-400' : 'text-purple-700'}`}>
              अपरिचित / क्षेत्रीय शब्द (Detected Term)
            </span>
            <div className="text-2xl font-bold font-mono tracking-wide py-1 text-purple-400">
              "{data.word}"
            </div>
            {data.sentenceContext && (
              <p className={`text-xs italic truncate ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                वाक्य: "{data.sentenceContext}"
              </p>
            )}
          </div>

          {!isEditing ? (
            <>
              {/* Question to the User */}
              <div className="text-center space-y-1">
                <p className={`text-sm font-semibold ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                  क्या हम इस शब्द को <span className="text-purple-400 font-bold">{sourceLangName}</span> भाषा में जोड़ें?
                </p>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                  यह शब्द आपके कस्टम शब्दकोश में सुरक्षित रहेगा ताकि अगली बार सटीक अनुवाद और उच्चारण हो सके।
                </p>
              </div>

              {/* 3 Explicit Choices: हाँ, ना, ठीक-ठाक */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {/* 1. हाँ (Yes) */}
                <button
                  type="button"
                  data-testid="word-popup-yes-btn"
                  onClick={handleYes}
                  className="py-2.5 px-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex flex-col items-center justify-center gap-1 active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>हाँ (Yes)</span>
                </button>

                {/* 2. ना (No) */}
                <button
                  type="button"
                  data-testid="word-popup-no-btn"
                  onClick={handleNo}
                  className={`py-2.5 px-3 rounded-2xl border font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 active:scale-95 ${
                    isDark
                      ? 'bg-zinc-850 hover:bg-zinc-800 border-zinc-750 text-red-400'
                      : 'bg-white hover:bg-slate-50 border-slate-300 text-red-600 shadow-xs'
                  }`}
                >
                  <X className="w-4 h-4" />
                  <span>ना (No)</span>
                </button>

                {/* 3. ठीक-ठाक (Maybe / Later) */}
                <button
                  type="button"
                  data-testid="word-popup-maybe-btn"
                  onClick={handleMaybe}
                  className={`py-2.5 px-3 rounded-2xl border font-bold text-xs transition-all flex flex-col items-center justify-center gap-1 active:scale-95 ${
                    isDark
                      ? 'bg-zinc-850 hover:bg-zinc-800 border-zinc-750 text-amber-300'
                      : 'bg-white hover:bg-slate-50 border-slate-300 text-amber-700 shadow-xs'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>ठीक-ठाक (Okay)</span>
                </button>
              </div>
            </>
          ) : (
            /* Step 2: Meaning confirmation when user selected 'हाँ' */
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom duration-200">
              {feedback && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold text-center">
                  {feedback}
                </div>
              )}

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                  इस शब्द का मानक अर्थ (Meaning / Translation in {targetLangName}):
                </label>
                <input
                  type="text"
                  data-testid="word-meaning-input"
                  value={meaning}
                  onChange={(e) => setMeaning(e.target.value)}
                  placeholder="e.g. ऐसा / इस तरह (Like this)"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs transition-colors outline-hidden ${
                    isDark
                      ? 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-purple-500'
                      : 'bg-white border-slate-300 text-slate-800 focus:border-purple-600'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                  ध्वन्यात्मक उच्चारण (Phonetic / Hinglish):
                </label>
                <input
                  type="text"
                  data-testid="word-phonetic-input"
                  value={phonetic}
                  onChange={(e) => setPhonetic(e.target.value)}
                  placeholder="e.g. Ainsa / Khadda"
                  className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-xs transition-colors outline-hidden ${
                    isDark
                      ? 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-purple-500'
                      : 'bg-white border-slate-300 text-slate-800 focus:border-purple-600'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  data-testid="save-learned-word-btn"
                  onClick={handleConfirmSave}
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  शब्दकोश में सेव करें (Save to Dictionary)
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-colors ${
                    isDark
                      ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  पीछे
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
