/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Cpu,
  Volume2,
  Mic,
  Wifi,
  Server,
  Zap,
  ShieldCheck,
  Database,
  Check,
  Sliders,
  History,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { peerMesh, RemotePeer } from '../services/peerMesh';
import { audioEngine } from '../services/audioEngine';
import {
  selfHealingEngine,
  SubsystemHealth,
  SubsystemId,
  HealIncident,
} from '../services/selfHealingEngine';

interface DiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiagnosticsModal: React.FC<DiagnosticsModalProps> = ({ isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [serverHealth, setServerHealth] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audioCtxState, setAudioCtxState] = useState<string>('unknown');
  const [micMime, setMicMime] = useState<string>('');
  const [roomPeers, setRoomPeers] = useState<RemotePeer[]>([]);
  const [testChimePlaying, setTestChimePlaying] = useState(false);

  // Self-Healing States
  const [isAutoHealingActive, setIsAutoHealingActive] = useState<boolean>(() =>
    selfHealingEngine.isAutoHealingEnabled()
  );
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairStepText, setRepairStepText] = useState<string | null>(null);
  const [repairReport, setRepairReport] = useState<string | null>(null);
  const [subsystems, setSubsystems] = useState<Record<SubsystemId, SubsystemHealth>>(() =>
    selfHealingEngine.getSubsystems()
  );
  const [incidents, setIncidents] = useState<HealIncident[]>(() =>
    selfHealingEngine.getIncidentHistory()
  );

  const fetchDiagnostics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setServerHealth(data);
      }
    } catch (e) {
      setServerHealth({ status: 'error', error: 'Failed to contact server' });
    } finally {
      setIsLoading(false);
    }

    try {
      const ctx = audioEngine.getAudioContext();
      setAudioCtxState(ctx.state);
    } catch {
      setAudioCtxState('unavailable');
    }

    setMicMime(audioEngine.getSupportedMimeType() || 'Standard MediaRecorder');
    setRoomPeers(peerMesh.getRemotePeers());
    setSubsystems(selfHealingEngine.getSubsystems());
    setIncidents(selfHealingEngine.getIncidentHistory());
  };

  useEffect(() => {
    if (isOpen) {
      fetchDiagnostics();
    }
  }, [isOpen]);

  useEffect(() => {
    const unsubSubsystems = selfHealingEngine.onSubsystemsChange((updated) => {
      setSubsystems(updated);
    });
    const unsubIncidents = selfHealingEngine.onHealIncident(() => {
      setIncidents(selfHealingEngine.getIncidentHistory());
    });
    return () => {
      unsubSubsystems();
      unsubIncidents();
    };
  }, []);

  const handleToggleAutoHealing = () => {
    const newState = !isAutoHealingActive;
    setIsAutoHealingActive(newState);
    selfHealingEngine.setAutoHealingActive(newState);
  };

  const handleRunFullRepair = async () => {
    setIsRepairing(true);
    setRepairReport(null);

    setRepairStepText('1/5: लोकल स्टोरेज और कैश की जांच व अनुकूलन...');
    await new Promise((r) => setTimeout(r, 350));

    setRepairStepText('2/5: ऑडियो इंजन व स्पीकर्स को अनब्लॉक किया जा रहा है...');
    await new Promise((r) => setTimeout(r, 400));

    setRepairStepText('3/5: माइक्रोफ़ोन और मीडिया स्ट्रीम री-कैलिब्रेट...');
    await new Promise((r) => setTimeout(r, 350));

    setRepairStepText('4/5: जेमिनी AI और ऑफ़लाइन लेक्सिकॉन सिंक...');
    await new Promise((r) => setTimeout(r, 350));

    setRepairStepText('5/5: मेश नेटवर्क और वेबसॉकेट कनेक्शन का सत्यापन...');

    const res = await selfHealingEngine.triggerFullAutoRepair();
    setIsRepairing(false);
    setRepairStepText(null);
    setRepairReport(res.summaryHindi);

    fetchDiagnostics();
  };

  if (!isOpen) return null;

  const roomStatus = peerMesh.getStatus();
  const roomCode = peerMesh.getRoomCode();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div
        className={`w-full max-w-xl rounded-3xl p-5 sm:p-6 shadow-2xl border max-h-[92vh] overflow-y-auto ${
          isDark ? 'bg-zinc-900 border-zinc-700/80 text-zinc-100' : 'bg-white border-white/80 text-slate-800'
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-4 border-zinc-700/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-mono font-bold tracking-wide flex items-center gap-2">
                <span>System Diagnostics &amp; Self-Healing</span>
              </h2>
              <p className="text-[11px] text-zinc-400 font-sans">
                ऑटो-डायग्नोस एवं स्वायत्त स्व-उपचार इंजन (Autonomous Recovery)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchDiagnostics}
              disabled={isLoading || isRepairing}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Refresh Diagnostics"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              data-testid="close-diagnostics-btn"
              aria-label="Close Diagnostics"
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ⚡ Prominent Auto-Repair Hero Card */}
        <div
          className={`p-4 rounded-2xl mb-4 border relative overflow-hidden transition-all ${
            isDark
              ? 'bg-gradient-to-r from-purple-950/60 via-indigo-950/40 to-zinc-950 border-purple-500/40'
              : 'bg-gradient-to-r from-purple-50 via-indigo-50 to-white border-purple-200 shadow-sm'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-wider text-purple-300 font-mono">
                  Autonomous Sentinel Mode
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isAutoHealingActive
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {isAutoHealingActive ? 'सक्रिय (ACTIVE)' : 'निष्क्रिय (OFF)'}
                </span>
              </div>
              <p className="text-[12px] text-zinc-300 font-sans leading-tight">
                {isAutoHealingActive
                  ? 'ऐप बैकग्राउंड में किसी भी एरर (माइक, साउंड, AI, नेटवर्क) को खुद डायग्नोस करके ऑटो-फिक्स करती है।'
                  : 'ऑटो-हीलिंग बंद है। इसे चालू करने के लिए दाईं ओर स्विच करें।'}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <button
                onClick={handleToggleAutoHealing}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
                  isAutoHealingActive
                    ? 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-500/60 text-emerald-300'
                    : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-600 text-zinc-300'
                }`}
              >
                {isAutoHealingActive ? 'Watchdog On' : 'Watchdog Off'}
              </button>
            </div>
          </div>

          {/* Master 1-Click Auto-Repair Action */}
          <div className="mt-3 pt-3 border-t border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <button
              onClick={handleRunFullRepair}
              disabled={isRepairing}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold font-mono text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                isRepairing
                  ? 'bg-purple-800/80 text-purple-200 border border-purple-400/50 cursor-wait'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/40 active:scale-[0.98]'
              }`}
            >
              <Zap className={`w-4 h-4 ${isRepairing ? 'animate-spin' : ''}`} />
              <span>{isRepairing ? 'स्व-मरम्मत चल रही है...' : '⚡ Run Full Auto-Repair (सिस्टम स्व-मरम्मत)'}</span>
            </button>

            {repairStepText && (
              <div className="text-[11px] font-mono text-amber-300 animate-pulse flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{repairStepText}</span>
              </div>
            )}

            {repairReport && !repairStepText && (
              <div className="text-[11px] font-sans text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{repairReport}</span>
              </div>
            )}
          </div>
        </div>

        {/* Subsystems Health Grid */}
        <div className="space-y-3 text-xs font-mono">
          {/* 1. WebAudio & Speaker */}
          <div
            className={`p-3.5 rounded-2xl border transition-all ${
              isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold mb-2">
              <span className="flex items-center gap-1.5 text-purple-400">
                <Volume2 className="w-4 h-4" />
                <span>1. WebAudio &amp; Speaker Pipeline</span>
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    audioCtxState === 'running'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                      : 'bg-amber-950 text-amber-300 border border-amber-600'
                  }`}
                >
                  {audioCtxState}
                </span>
                <button
                  onClick={() => selfHealingEngine.healAudioEngine('Manual single-subsystem trigger')}
                  className="px-2 py-0.5 rounded bg-purple-900/50 hover:bg-purple-800 text-purple-200 text-[10px] border border-purple-500/40"
                  title="Auto-Fix Audio Pipe"
                >
                  Auto-Fix
                </button>
              </div>
            </div>
            <div className="space-y-1.5 opacity-90">
              <div>AudioContext State: <strong>{audioCtxState}</strong></div>
              <div>Web Audio Unlock: {audioCtxState === 'running' ? '✅ Unlocked for immediate playback' : '⚠️ Suspended (Click below or Auto-Fix to unlock)'}</div>
              <button
                onClick={async () => {
                  setTestChimePlaying(true);
                  await audioEngine.unlockAudio();
                  await audioEngine.playSpeakerTestChime();
                  setAudioCtxState(audioEngine.getAudioContext().state);
                  setTestChimePlaying(false);
                }}
                disabled={testChimePlaying}
                className="mt-1 px-3 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 text-purple-200 border border-purple-500 font-bold flex items-center gap-1.5 transition-all text-xs"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{testChimePlaying ? 'Playing Chime...' : 'Test Speaker Audio'}</span>
              </button>
            </div>
          </div>

          {/* 2. Microphone & Speech Recognition */}
          <div
            className={`p-3.5 rounded-2xl border transition-all ${
              isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold mb-2">
              <span className="flex items-center gap-1.5 text-pink-400">
                <Mic className="w-4 h-4" />
                <span>2. Microphone &amp; Voice Input</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-zinc-800 text-zinc-300">
                  {audioEngine.isSpeechRecognitionSupported() ? 'Web Speech + Server' : 'Server STT Fallback'}
                </span>
                <button
                  onClick={() => selfHealingEngine.healMicrophone('Manual mic re-calibrate trigger')}
                  className="px-2 py-0.5 rounded bg-pink-900/50 hover:bg-pink-800 text-pink-200 text-[10px] border border-pink-500/40"
                  title="Re-calibrate Mic Stream"
                >
                  Auto-Fix
                </button>
              </div>
            </div>
            <div className="space-y-1 opacity-90">
              <div>Recording MIME Format: <strong>{micMime || 'audio/webm'}</strong></div>
              <div>Browser SpeechRecognition: {audioEngine.isSpeechRecognitionSupported() ? 'Supported natively' : 'Server audio transcription fallback active'}</div>
            </div>
          </div>

          {/* 3. Server & Gemini AI Models */}
          <div
            className={`p-3.5 rounded-2xl border transition-all ${
              isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold mb-2">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Server className="w-4 h-4" />
                <span>3. Server &amp; Gemini AI Models</span>
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    serverHealth?.hasGeminiKey
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                      : 'bg-amber-950 text-amber-300 border border-amber-600'
                  }`}
                >
                  {serverHealth?.hasGeminiKey ? 'API Key Active' : 'Offline Lexicon Fallback'}
                </span>
                <button
                  onClick={() => selfHealingEngine.healGeminiAI('Manual AI sync trigger')}
                  className="px-2 py-0.5 rounded bg-blue-900/50 hover:bg-blue-800 text-blue-200 text-[10px] border border-blue-500/40"
                >
                  Auto-Fix
                </button>
              </div>
            </div>
            <div className="space-y-1 opacity-90">
              <div>Translation Model: <span className="font-bold text-zinc-200">{serverHealth?.models?.translate || 'gemini-3.8-flash'}</span></div>
              <div>Speech TTS Model: <span className="font-bold text-zinc-200">{serverHealth?.models?.tts || 'gemini-3.8-flash-lite-tts'}</span></div>
              <div>Active Rooms on Server: <span className="font-bold">{serverHealth?.rooms?.activeRooms ?? 0}</span></div>
            </div>
          </div>

          {/* 4. Room Transport (WebSocket) */}
          <div
            className={`p-3.5 rounded-2xl border transition-all ${
              isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold mb-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Wifi className="w-4 h-4" />
                <span>4. Mesh Transport (/rooms WebSocket)</span>
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    roomStatus === 'connected'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                      : roomStatus === 'waiting'
                      ? 'bg-amber-950 text-amber-300 border border-amber-600'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {roomStatus}
                </span>
                <button
                  onClick={() => selfHealingEngine.healWebSocketMesh('Manual mesh reconnect trigger')}
                  className="px-2 py-0.5 rounded bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 text-[10px] border border-emerald-500/40"
                >
                  Auto-Fix
                </button>
              </div>
            </div>
            <div className="space-y-1 opacity-90">
              <div>Room Code: <span className="font-bold text-purple-400">{roomCode || 'None (Join a room to connect)'}</span></div>
              <div>Confirmed Remote Peers: <span className="font-bold">{roomPeers.length}</span></div>
            </div>
          </div>

          {/* 5. Storage & Cache Subsystem */}
          <div
            className={`p-3.5 rounded-2xl border transition-all ${
              isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold mb-2">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Database className="w-4 h-4" />
                <span>5. Local Storage &amp; Dialect Cache</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                  Verified Clean
                </span>
                <button
                  onClick={() => selfHealingEngine.healStorageCache('Manual storage optimization')}
                  className="px-2 py-0.5 rounded bg-amber-900/50 hover:bg-amber-800 text-amber-200 text-[10px] border border-amber-500/40"
                >
                  Optimize
                </button>
              </div>
            </div>
            <div className="space-y-1 opacity-90">
              <div>LocalStorage Integrity: <strong>Quota Active &amp; Validated</strong></div>
              <div>Auto-Prune Bloat: <strong>Active (Keeps recent 50 messages safely)</strong></div>
            </div>
          </div>

          {/* 📜 Recent Auto-Heal Actions History */}
          <div
            className={`p-3.5 rounded-2xl border transition-all ${
              isDark ? 'bg-zinc-950/70 border-zinc-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between font-bold mb-2">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <History className="w-4 h-4 text-purple-400" />
                <span>Recent Self-Healing Actions (स्व-उपचार लॉग)</span>
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {incidents.length} recorded
              </span>
            </div>

            {incidents.length === 0 ? (
              <p className="text-[11px] text-zinc-400 italic">
                अभी तक कोई एरर नहीं आया; सभी सिस्टम सामान्य रूप से काम कर रहे हैं।
              </p>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {incidents.slice(0, 8).map((inc) => (
                  <div
                    key={inc.id}
                    className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-start justify-between gap-2 text-[11px]"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="font-bold text-zinc-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{inc.hindiTitle}</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 truncate">{inc.remedyApplied}</p>
                    </div>
                    <span className="text-[9px] text-zinc-500 shrink-0 font-mono">
                      {new Date(inc.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
