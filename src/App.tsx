/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  AppViewMode,
  ChannelNumber,
  ConversationMessage,
  LanguageCode,
  MeshNode,
} from './types';
import { HeaderBar } from './components/HeaderBar';
import { BottomNavigation } from './components/BottomNavigation';
import { WalkieTalkieView } from './components/WalkieTalkieView';
import { DualTranslatorView } from './components/DualTranslatorView';
import { TacticalMeshMap } from './components/TacticalMeshMap';
import { PhrasebookView } from './components/PhrasebookView';
import { ConversationHistoryView } from './components/ConversationHistoryView';
import { LanguagePackManagerModal } from './components/LanguagePackManagerModal';
import { WordLearningModal } from './components/WordLearningModal';
import { FrontPageAuthModal } from './components/FrontPageAuthModal';
import { UnrecognizedWordPopup, UnrecognizedWordData } from './components/UnrecognizedWordPopup';
import { SelfHealingHUD } from './components/SelfHealingHUD';
import { audioEngine } from './services/audioEngine';
import { translatorService } from './services/translatorService';
import { meshNetwork } from './services/meshNetwork';
import { authService, UserProfile } from './services/authService';
import { customVocabularyService } from './services/customVocabularyService';
import { ThemeProvider, useTheme } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDark } = useTheme();
  const [currentMode, setCurrentMode] = useState<AppViewMode>('walkie_talkie');
  const [currentChannel, setCurrentChannel] = useState<ChannelNumber>(3); // Channel 3: Public Intercom
  const [sourceLang, setSourceLang] = useState<LanguageCode>('hi');
  const [targetLang, setTargetLang] = useState<LanguageCode>('mjl'); // Mandali / Mandyali Pahadi default
  const [isMuted, setIsMuted] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasGeminiKey, setHasGeminiKey] = useState(true);
  const [showLanguagePacks, setShowLanguagePacks] = useState(false);
  const [showWordLearning, setShowWordLearning] = useState(false);
  const [wordLearningInitial, setWordLearningInitial] = useState<{ word?: string; translation?: string }>({});

  // Front Page / Auth Portal state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const [showAuthModal, setShowAuthModal] = useState<boolean>(() => authService.isFirstVisit() && !authService.getCurrentUser());
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  // Dialect / Missing Word Learning Popup state (हाँ / ना / ठीक-ठाक)
  const [showUnrecognizedPopup, setShowUnrecognizedPopup] = useState(false);
  const [unrecognizedWordData, setUnrecognizedWordData] = useState<UnrecognizedWordData | null>(null);

  // Conversation history initialized clean without fake seed bloat
  const [messages, setMessages] = useState<ConversationMessage[]>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('bhashasetu_messages') : null;
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [];
  });

  // Check network & server status on mount
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check network & server status on mount and sync stored API key
    const storedKey = translatorService.getApiKey();
    if (storedKey) {
      setHasGeminiKey(true);
      translatorService.setApiKey(storedKey).then((hasKey) => {
        setHasGeminiKey(hasKey);
      });
    } else {
      translatorService.fetchKeyFromServer().then(() => {
        translatorService.checkServerHealth().then((hasKey) => {
          setHasGeminiKey(hasKey);
        });
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen to Auth State
  useEffect(() => {
    const unsub = authService.subscribe((user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('bhashasetu_messages', JSON.stringify(messages.slice(0, 50)));
      } catch {
        // ignore
      }
    }
  }, [messages]);

  // Handle new message from PTT, Dual Translator, or Mesh Packet
  const handleNewMessage = (msg: ConversationMessage) => {
    setMessages((prev) => [msg, ...prev]);

    // Check for potential unfamiliar/dialect words in spoken/typed text
    if (msg.originalText) {
      const candidates = customVocabularyService.detectPotentialNewWords(msg.originalText, msg.sourceLang);
      if (candidates.length > 0) {
        const detectedTerm = candidates[0];
        // Trigger non-intrusive dialect learning prompt after 1.5s
        setTimeout(() => {
          setUnrecognizedWordData({
            word: detectedTerm,
            sourceLang: msg.sourceLang,
            targetLang: msg.targetLang,
            sentenceContext: msg.originalText,
            suggestedMeaning: msg.translatedText ? msg.translatedText.slice(0, 50) : undefined,
            suggestedPhonetic: msg.phoneticText ? msg.phoneticText.slice(0, 50) : undefined,
          });
          setShowUnrecognizedPopup(true);
        }, 1500);
      }
    }
  };

  // Manual Trigger for Dialect Word Learning Popup (हाँ / ना / ठीक-ठाक)
  const handleTriggerWordPrompt = (wordOverride?: string) => {
    const word = wordOverride || (targetLang === 'mjl' ? 'ऐन्सा' : targetLang === 'or' ? 'ଖାସ୍‌କରି' : 'खाड्डा');
    const meaning =
      targetLang === 'mjl'
        ? 'ऐसा / इस तरह (Like this - Mandali Pahadi)'
        : targetLang === 'or'
        ? 'विशेष रूप से (Specifically - Odia)'
        : 'गड्ढा या खांचा (Ditch / Cavity)';

    setUnrecognizedWordData({
      word,
      sourceLang: targetLang,
      targetLang: sourceLang,
      suggestedMeaning: meaning,
      suggestedPhonetic: word === 'ऐन्सा' ? 'Ainsa' : word === 'ଖାସ୍‌କରି' ? 'Khaskari' : 'Khadda',
      sentenceContext: 'यह शब्द भाषा/बोली में नया पाया गया (Regional term detected)',
    });
    setShowUnrecognizedPopup(true);
  };

  // Change Channel
  const handleSelectChannel = (ch: ChannelNumber) => {
    audioEngine.triggerHaptic(40);
    audioEngine.playSquelchStatic(90);
    setCurrentChannel(ch);
    meshNetwork.setChannel(ch);
  };

  // Swap Source and Target Languages
  const handleSwapLanguages = () => {
    audioEngine.triggerHaptic(35);
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  // When user clicks "Hail Unit" from Radar
  const handleSelectPeerToTalk = (peer: MeshNode) => {
    setTargetLang(peer.activeLanguage);
    if (peer.channel !== currentChannel) {
      handleSelectChannel(peer.channel);
    }
    setCurrentMode('walkie_talkie');
  };

  return (
    <div
      className={
        isDark
          ? 'flex flex-col h-screen w-full bg-zinc-950 text-zinc-100 overflow-hidden font-sans select-none antialiased relative'
          : 'flex flex-col h-screen w-full bg-[#f4f6fb] text-slate-800 overflow-hidden font-sans select-none antialiased relative'
      }
    >
      {/* Autonomous Self-Healing Floating HUD */}
      <SelfHealingHUD onOpenDiagnostics={() => setShowDiagnostics(true)} />

      {/* Top Header Bar with Theme Toggle */}
      <HeaderBar
        currentChannel={currentChannel}
        onSelectChannel={handleSelectChannel}
        isOnline={isOnline}
        hasGeminiKey={hasGeminiKey}
        isMuted={isMuted}
        onToggleMute={() => {
          audioEngine.triggerHaptic(30);
          setIsMuted(!isMuted);
          if (!isMuted) audioEngine.stopSpeaking();
        }}
        onOpenRadar={() => setCurrentMode('mesh_radar')}
        onOpenSettings={() => setShowLanguagePacks(true)}
        onOpenWordLearning={() => {
          setWordLearningInitial({});
          setShowWordLearning(true);
        }}
        onOpenAuth={() => setShowAuthModal(true)}
        user={currentUser}
        onTriggerWordPopup={() => handleTriggerWordPrompt()}
        showDiagnostics={showDiagnostics}
        onOpenDiagnostics={() => setShowDiagnostics(true)}
        onCloseDiagnostics={() => setShowDiagnostics(false)}
      />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
        {currentMode === 'walkie_talkie' && (
          <WalkieTalkieView
            currentChannel={currentChannel}
            onSelectChannel={handleSelectChannel}
            sourceLang={sourceLang}
            targetLang={targetLang}
            onChangeSourceLang={setSourceLang}
            onChangeTargetLang={setTargetLang}
            onSwapLanguages={handleSwapLanguages}
            onNewMessage={handleNewMessage}
            isMuted={isMuted}
            onOpenPackManager={() => setShowLanguagePacks(true)}
            onOpenWordLearning={(word, translation) => {
              setWordLearningInitial({ word, translation });
              setShowWordLearning(true);
            }}
            onOpenWordPrompt={(text) => handleTriggerWordPrompt(text)}
          />
        )}

        {currentMode === 'dual_translator' && (
          <DualTranslatorView
            sourceLang={sourceLang}
            targetLang={targetLang}
            onChangeSourceLang={setSourceLang}
            onChangeTargetLang={setTargetLang}
            onNewMessage={handleNewMessage}
            isMuted={isMuted}
            onOpenPackManager={() => setShowLanguagePacks(true)}
            onOpenWordLearning={(word, translation) => {
              setWordLearningInitial({ word, translation });
              setShowWordLearning(true);
            }}
            onOpenWordPrompt={(text) => handleTriggerWordPrompt(text)}
          />
        )}

        {currentMode === 'mesh_radar' && (
          <TacticalMeshMap
            onSelectPeerToTalk={handleSelectPeerToTalk}
          />
        )}

        {currentMode === 'phrasebook' && (
          <PhrasebookView
            currentChannel={currentChannel}
            activeLanguage={sourceLang}
            onNewMessage={handleNewMessage}
            isMuted={isMuted}
            onOpenPackManager={() => setShowLanguagePacks(true)}
          />
        )}

        {currentMode === 'history' && (
          <ConversationHistoryView
            messages={messages}
            onClearHistory={() => setMessages([])}
            onToggleStar={(id) => {
              setMessages((prev) =>
                prev.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m))
              );
            }}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNavigation
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        unreadCount={0}
      />

      {/* Language Pack Manager (Offline TTS & Dialect Speech) Modal */}
      <LanguagePackManagerModal
        isOpen={showLanguagePacks}
        onClose={() => setShowLanguagePacks(false)}
      />

      {/* Interactive Voice Learning Modal */}
      <WordLearningModal
        isOpen={showWordLearning}
        onClose={() => setShowWordLearning(false)}
        initialSourceWord={wordLearningInitial.word}
        initialTranslation={wordLearningInitial.translation}
        sourceLang={sourceLang}
        targetLang={targetLang}
      />

      {/* Front Page / Account Linking & Verification Portal */}
      <FrontPageAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        currentUser={currentUser}
        onUserChanged={(user) => setCurrentUser(user)}
      />

      {/* Dialect / Missing Word Learning Popup (हाँ / ना / ठीक-ठाक) */}
      <UnrecognizedWordPopup
        isOpen={showUnrecognizedPopup}
        data={unrecognizedWordData}
        onClose={() => setShowUnrecognizedPopup(false)}
        onWordAdded={(word, meaning) => {
          console.log(`[LearnedWord Added] "${word}" -> "${meaning}"`);
        }}
      />
    </div>
  );
}
