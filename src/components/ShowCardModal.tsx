import React, { useState } from 'react';
import {
  Volume2,
  X,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Check,
  MapPin,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Hand,
  Sparkles,
} from 'lucide-react';
import { LanguageCode } from '../types';
import { SUPPORTED_LANGUAGES } from '../services/languageRegistry';
import { audioEngine } from '../services/audioEngine';
import { useTheme } from '../context/ThemeContext';

export interface ShowCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  translatedText: string;
  phoneticText?: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  onQuickReplyReceived?: (replyText: string, originalOption: string) => void;
}

export const ShowCardModal: React.FC<ShowCardModalProps> = ({
  isOpen,
  onClose,
  originalText,
  translatedText,
  phoneticText,
  sourceLang,
  targetLang,
  onQuickReplyReceived,
}) => {
  const { isDark } = useTheme();
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'huge'>('large');
  const [isFlipped180, setIsFlipped180] = useState(false);
  const [selectedReply, setSelectedReply] = useState<string | null>(null);

  if (!isOpen) return null;

  const targetLangConfig =
    SUPPORTED_LANGUAGES.find((l) => l.code === targetLang) || SUPPORTED_LANGUAGES[0];
  const sourceLangConfig =
    SUPPORTED_LANGUAGES.find((l) => l.code === sourceLang) || SUPPORTED_LANGUAGES[0];

  const handleSpeakTarget = () => {
    audioEngine.triggerHaptic(40);
    audioEngine.speak(translatedText, targetLang);
  };

  // Quick reply options tailored to the target language (for the local shopkeeper/villager to tap)
  const quickReplies = [
    {
      id: 'yes',
      icon: '👍',
      targetText:
        targetLang === 'or' ? 'ହଁ (Yes)' : targetLang === 'mjl' ? 'हाँ / होय (Yes)' : 'हाँ (Yes)',
      sourceText: 'हाँ (Yes)',
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50',
    },
    {
      id: 'no',
      icon: '👎',
      targetText:
        targetLang === 'or' ? 'ନାହିଁ (No)' : targetLang === 'mjl' ? 'नी (No)' : 'नहीं (No)',
      sourceText: 'नहीं (No)',
      color: 'bg-rose-500/20 text-rose-400 border-rose-500/50',
    },
    {
      id: 'straight',
      icon: '⬆️',
      targetText:
        targetLang === 'or'
          ? 'ସିଧା ଆଗକୁ'
          : targetLang === 'mjl'
          ? 'सिद्धा अग्गे'
          : 'सीधे आगे',
      sourceText: 'सीधे आगे (Straight Ahead)',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    },
    {
      id: 'left',
      icon: '⬅️',
      targetText:
        targetLang === 'or' ? 'ବାମ ପାଖ' : targetLang === 'mjl' ? 'खब्बे पासे' : 'बाईं तरफ',
      sourceText: 'बाईं तरफ (Turn Left)',
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    },
    {
      id: 'right',
      icon: '➡️',
      targetText:
        targetLang === 'or' ? 'ଡାହାଣ ପାଖ' : targetLang === 'mjl' ? 'सज्जे पासे' : 'दाईं तरफ',
      sourceText: 'दाईं तरफ (Turn Right)',
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    },
    {
      id: 'wait',
      icon: '✋',
      targetText:
        targetLang === 'or'
          ? 'ଟିକେ ଅପେକ୍ଷା କର'
          : targetLang === 'mjl'
          ? 'थोड़ा खड़ो'
          : 'थोड़ा रुकिए',
      sourceText: 'थोड़ा रुकिए (Wait a moment)',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    },
  ];

  const handleSelectReply = (reply: (typeof quickReplies)[0]) => {
    audioEngine.triggerHaptic([40, 60]);
    setSelectedReply(reply.targetText);

    // Speak response back in traveler's source language so traveler immediately hears the answer
    audioEngine.speak(reply.sourceText, sourceLang);

    if (onQuickReplyReceived) {
      onQuickReplyReceived(reply.sourceText, reply.targetText);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'huge':
        return 'text-3xl sm:text-4xl md:text-5xl leading-tight';
      case 'large':
        return 'text-2xl sm:text-3xl md:text-4xl leading-snug';
      case 'normal':
      default:
        return 'text-xl sm:text-2xl md:text-3xl leading-normal';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className={`w-full max-w-2xl h-[92vh] max-h-[850px] rounded-3xl flex flex-col overflow-hidden shadow-2xl border transition-all ${
          isDark
            ? 'bg-zinc-950 border-zinc-700 text-zinc-100 shadow-[0_0_50px_rgba(0,0,0,0.8)]'
            : 'bg-white border-slate-300 text-slate-900 shadow-2xl'
        } ${isFlipped180 ? 'rotate-180' : ''}`}
      >
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 dark:border-zinc-800 bg-zinc-900/60 dark:bg-zinc-900/60 shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{targetLangConfig.flagEmoji}</span>
            <div>
              <div className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                Show Card • {targetLangConfig.name} ({targetLangConfig.nativeName})
              </div>
              <div className="text-[10px] font-mono text-zinc-400">
                Hold phone to show local speaker / shopkeeper
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Flip 180 button (Turn to face opposite person without twisting wrists) */}
            <button
              onClick={() => {
                audioEngine.triggerHaptic(25);
                setIsFlipped180(!isFlipped180);
              }}
              className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1 transition-colors ${
                isFlipped180
                  ? 'bg-purple-600 text-white border-purple-500'
                  : isDark
                  ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-750'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
              title="Flip 180° for opposite person"
            >
              <RotateCw className="w-4 h-4" />
              <span className="hidden sm:inline">Flip 180°</span>
            </button>

            {/* Font Size Zoom Toggle */}
            <button
              onClick={() => {
                audioEngine.triggerHaptic(20);
                setFontSizeLevel((prev) => (prev === 'normal' ? 'large' : prev === 'large' ? 'huge' : 'normal'));
              }}
              className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1 ${
                isDark
                  ? 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-750'
                  : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
              }`}
              title="Change Text Size"
            >
              <ZoomIn className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">{fontSizeLevel}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-zinc-800 text-zinc-400 hover:text-white border-zinc-700 hover:bg-zinc-700'
                  : 'bg-slate-100 text-slate-500 hover:text-slate-900 border-slate-300 hover:bg-slate-200'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Card Main Stage */}
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 overflow-y-auto no-scrollbar space-y-4">
          {/* Original User Context (Smaller at top) */}
          <div className="p-3 rounded-2xl bg-zinc-900/50 dark:bg-zinc-900/50 border border-zinc-800/80">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1">
              <span>Your Phrase ({sourceLangConfig.name})</span>
            </div>
            <div className="text-sm sm:text-base font-semibold text-zinc-300 font-sans">
              &quot;{originalText}&quot;
            </div>
          </div>

          {/* Giant Translated Text for the Local Person to Read */}
          <div className="my-auto py-2 text-center">
            <div
              className={`font-black tracking-tight select-text ${getFontSizeClass()} ${
                isDark ? 'text-zinc-50' : 'text-slate-950'
              }`}
            >
              {translatedText}
            </div>

            {/* Romanized Phonetic pronunciation */}
            {phoneticText && (
              <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-mono italic bg-amber-400/10 text-amber-500 dark:text-amber-300 border border-amber-400/20">
                🔊 &quot;{phoneticText}&quot;
              </div>
            )}
          </div>

          {/* Large Speak Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSpeakTarget}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition-all active:scale-95"
            >
              <Volume2 className="w-5 h-5 animate-pulse" />
              <span>आवाज़ में सुनाएं (Tap to Speak)</span>
            </button>
          </div>

          {/* Quick Tap Answers for the Other Person */}
          <div className="pt-3 border-t border-zinc-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <Hand className="w-3.5 h-3.5 text-purple-400" />
                सामने वाले के लिए उत्तर (Tap an Answer for Traveler):
              </span>
              {selectedReply && (
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" /> Selected: {selectedReply}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => handleSelectReply(reply)}
                  className={`p-2.5 rounded-xl border font-mono font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                    reply.color
                  } ${
                    selectedReply === reply.targetText ? 'ring-2 ring-emerald-400 font-black' : ''
                  }`}
                >
                  <span className="text-lg">{reply.icon}</span>
                  <span className="truncate max-w-full text-center">{reply.targetText}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
