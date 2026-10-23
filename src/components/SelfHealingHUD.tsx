/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, AlertTriangle, X, ChevronRight } from 'lucide-react';
import { selfHealingEngine, HealIncident } from '../services/selfHealingEngine';

interface SelfHealingHUDProps {
  onOpenDiagnostics: () => void;
}

export const SelfHealingHUD: React.FC<SelfHealingHUDProps> = ({ onOpenDiagnostics }) => {
  const [currentIncident, setCurrentIncident] = useState<HealIncident | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsub = selfHealingEngine.onHealIncident((incident) => {
      setCurrentIncident(incident);
      setIsVisible(true);

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    });

    return unsub;
  }, []);

  if (!isVisible || !currentIncident) return null;

  const isHealed = currentIncident.status === 'healed';
  const isDiagnosing = currentIncident.status === 'diagnosing';

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto animate-in fade-in slide-in-from-top-3 duration-200">
      <div
        className={`px-3.5 py-2.5 rounded-2xl shadow-xl border backdrop-blur-md flex items-center justify-between gap-3 text-xs ${
          isHealed
            ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-100 shadow-emerald-950/50'
            : isDiagnosing
            ? 'bg-amber-950/90 border-amber-500/60 text-amber-100 shadow-amber-950/50'
            : 'bg-blue-950/90 border-blue-500/60 text-blue-100 shadow-blue-950/50'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
              isHealed
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-amber-500/20 text-amber-400 animate-pulse'
            }`}
          >
            {isHealed ? <CheckCircle2 className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-[11px] sm:text-xs">
              <span className="truncate">{currentIncident.hindiTitle}</span>
              <span
                className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-mono font-bold tracking-wider shrink-0 ${
                  isHealed
                    ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/30 text-amber-300 border border-amber-500/40 animate-pulse'
                }`}
              >
                {isHealed ? 'AUTO-HEALED' : 'DIAGNOSING'}
              </span>
            </div>
            <p className="text-[10px] text-zinc-300/90 truncate max-w-[240px] sm:max-w-[320px]">
              {currentIncident.remedyApplied}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              setIsVisible(false);
              onOpenDiagnostics();
            }}
            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-semibold flex items-center gap-0.5 transition-colors"
          >
            <span>विवरण</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
