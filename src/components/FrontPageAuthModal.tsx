import React, { useState, useEffect } from 'react';
import {
  Shield,
  Smartphone,
  Mail,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  Radio,
  LogOut,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Lock,
  Globe,
  RefreshCw,
  X,
} from 'lucide-react';
import { authService, UserProfile, AuthProvider } from '../services/authService';
import { useTheme } from '../context/ThemeContext';

interface FrontPageAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onUserChanged?: (user: UserProfile | null) => void;
}

export const FrontPageAuthModal: React.FC<FrontPageAuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUserChanged,
}) => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<AuthProvider>('phone_otp');

  // Phone + OTP State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [phoneUserName, setPhoneUserName] = useState('');

  // Email State
  const [emailAddress, setEmailAddress] = useState('');
  const [emailUserName, setEmailUserName] = useState('');

  // Google State
  const [googleAccountName, setGoogleAccountName] = useState('Ramesh Sharma');
  const [googleEmail, setGoogleEmail] = useState('ramesh.sharma@gmail.com');

  // Common UI State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  // Handle Send OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const clean = phoneNumber.replace(/\D/g, '');
    if (clean.length < 10) {
      setErrorMessage('कृपया मान्य 10-अंकीय मोबाइल नंबर दर्ज करें।');
      return;
    }

    setIsLoading(true);
    try {
      const res = await authService.sendOtp(clean);
      setOtpSent(true);
      setSimulatedOtp(res.code);
      setCountdown(res.expiresInSec);
      setSuccessMessage(`डेमो एसएमएस भेजा गया! आपका 6-अंकीय ओटीपी: ${res.code}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'ओटीपी भेजने में त्रुटि हुई');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Verify OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (!otpCode || otpCode.trim().length !== 6) {
      setErrorMessage('कृपया 6 अंकों का ओटीपी कोड दर्ज करें।');
      return;
    }

    setIsLoading(true);
    try {
      const user = await authService.verifyOtp(phoneNumber, otpCode, phoneUserName);
      setSuccessMessage('सफलतापूर्वक लॉगिन हो गया!');
      if (onUserChanged) onUserChanged(user);
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      setErrorMessage(err.message || 'ओटीपी सत्यापन विफल रहा।');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fill Simulated OTP
  const handleAutofillOtp = () => {
    if (simulatedOtp) {
      setOtpCode(simulatedOtp);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = async (preset?: { name: string; email: string }) => {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const name = preset ? preset.name : googleAccountName;
      const email = preset ? preset.email : googleEmail;
      const user = await authService.loginWithGoogle({ name, email });
      setSuccessMessage('गूगल अकाउंट सफलतापूर्वक कनेक्ट हो गया!');
      if (onUserChanged) onUserChanged(user);
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      setErrorMessage('गूगल लॉगिन में त्रुटि');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Email Login
  const handleEmailLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (!emailAddress || !emailAddress.includes('@')) {
      setErrorMessage('कृपया मान्य ई-मेल पता दर्ज करें।');
      return;
    }

    setIsLoading(true);
    try {
      const user = await authService.loginWithEmail(emailAddress, emailUserName);
      setSuccessMessage('ई-मेल अकाउंट सत्यापित हो गया!');
      if (onUserChanged) onUserChanged(user);
      setTimeout(() => {
        onClose();
      }, 700);
    } catch (err: any) {
      setErrorMessage('ई-मेल लॉगिन में त्रुटि');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Guest Login
  const handleGuestLogin = () => {
    const user = authService.loginAsGuest();
    if (onUserChanged) onUserChanged(user);
    onClose();
  };

  // Handle Logout
  const handleLogout = () => {
    authService.logout();
    if (onUserChanged) onUserChanged(null);
    setOtpSent(false);
    setOtpCode('');
    setSimulatedOtp(null);
    setSuccessMessage('आप सफलतापूर्वक लॉग आउट हो गए हैं।');
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-in fade-in duration-150 ${
        isDark ? 'bg-black/80' : 'bg-slate-900/40'
      }`}
    >
      <div
        className={
          isDark
            ? 'w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 text-zinc-100'
            : 'w-full max-w-lg neo-glass-panel border border-white/95 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 text-slate-800'
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'border-zinc-800 bg-zinc-950/80' : 'border-slate-200/80 bg-white/70'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-md">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-1.5 font-mono">
                BhashaSetu Portal
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-sans border border-emerald-500/30">
                  Secure Access
                </span>
              </h3>
              <p className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                अंतर-राज्यीय भाषा व बोली सेतु (Interstate Voice &amp; Dialect Mesh)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            data-testid="close-frontpage-auth-btn"
            aria-label="Close Portal"
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              isDark
                ? 'bg-zinc-800 text-zinc-400 hover:text-zinc-100'
                : 'bg-white/80 text-slate-500 hover:text-slate-800 border border-slate-200'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Active Logged In User Profile Card */}
          {currentUser ? (
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white/80 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" />
                  सत्यापित अकाउंट (Connected Account)
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-semibold">
                  ● सक्रिय (Active)
                </span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-2xl border-2 border-purple-500/40 object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{currentUser.name}</h4>
                  <p className={`text-xs truncate ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                    {currentUser.identifier}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-cyan-400 border border-zinc-700">
                      Callsign: {currentUser.callsign}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      Provider: {currentUser.provider.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  ऐप में प्रवेश करें (Enter App)
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleLogout}
                  data-testid="logout-user-btn"
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 border transition-colors ${
                    isDark
                      ? 'bg-zinc-800/80 border-zinc-700 text-red-400 hover:bg-red-950/40'
                      : 'bg-slate-100 border-slate-300 text-red-600 hover:bg-red-50'
                  }`}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  लॉग आउट
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Notice Banner */}
              <div
                className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                  isDark
                    ? 'bg-purple-950/30 border-purple-800/40 text-purple-300'
                    : 'bg-purple-50/80 border-purple-200 text-purple-900'
                }`}
              >
                <Shield className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong>सुरक्षित अकाउंट प्रमाणीकरण:</strong> अपना Google, फ़ोन नंबर (OTP) या ई-मेल जोड़ें ताकि आपकी कस्टम डिक्शनरी, सीखी गई बोलियां और ऑफलाइन वॉयस पैक सुरक्षित रहें।
                </div>
              </div>

              {/* Status Notifications */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {successMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Tab Selector */}
              <div
                className={`p-1 rounded-2xl border flex items-center gap-1 text-xs font-semibold font-mono ${
                  isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  type="button"
                  data-testid="auth-tab-phone"
                  onClick={() => {
                    setActiveTab('phone_otp');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'phone_otp'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : isDark
                      ? 'text-zinc-400 hover:text-zinc-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  फ़ोन OTP
                </button>
                <button
                  type="button"
                  data-testid="auth-tab-google"
                  onClick={() => {
                    setActiveTab('google');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'google'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : isDark
                      ? 'text-zinc-400 hover:text-zinc-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  Google
                </button>
                <button
                  type="button"
                  data-testid="auth-tab-email"
                  onClick={() => {
                    setActiveTab('email');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'email'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : isDark
                      ? 'text-zinc-400 hover:text-zinc-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  ई-मेल
                </button>
              </div>

              {/* TAB 1: PHONE + OTP */}
              {activeTab === 'phone_otp' && (
                <div className="space-y-3 pt-1">
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-3">
                      <div>
                        <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                          आपका नाम (वैकल्पिक / Optional Name)
                        </label>
                        <input
                          type="text"
                          value={phoneUserName}
                          onChange={(e) => setPhoneUserName(e.target.value)}
                          placeholder="e.g. राजेश कुमार (Rajesh Kumar)"
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs transition-colors outline-hidden ${
                            isDark
                              ? 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-purple-500'
                              : 'bg-white border-slate-300 text-slate-800 focus:border-purple-600'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                          मोबाइल नंबर (Phone Number)
                        </label>
                        <div className="flex gap-2">
                          <div
                            className={`px-3 py-2.5 rounded-xl border font-mono text-xs flex items-center gap-1 shrink-0 ${
                              isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-400' : 'bg-slate-100 border-slate-300 text-slate-700'
                            }`}
                          >
                            <span>🇮🇳</span>
                            <span>+91</span>
                          </div>
                          <input
                            type="tel"
                            data-testid="phone-number-input"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="98765 43210"
                            maxLength={10}
                            className={`flex-1 px-3.5 py-2.5 rounded-xl border font-mono text-xs transition-colors outline-hidden ${
                              isDark
                                ? 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-purple-500'
                                : 'bg-white border-slate-300 text-slate-800 focus:border-purple-600'
                            }`}
                          />
                        </div>
                        <p className={`text-[11px] mt-1 ${isDark ? 'text-zinc-500' : 'text-slate-500'}`}>
                          आपको 6-अंकीय सत्यापन ओटीपी तुरंत भेजा जाएगा।
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || phoneNumber.length < 10}
                        data-testid="send-otp-btn"
                        className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            ओटीपी भेजा जा रहा है...
                          </>
                        ) : (
                          <>
                            ओटीपी कोड प्राप्त करें (Get OTP)
                            <ChevronRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-3">
                      <div
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                          isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div>
                          <span className={`text-[11px] block ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                            ओटीपी भेजा गया नंबर:
                          </span>
                          <span className="font-mono font-bold text-purple-400">+91 {phoneNumber}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOtpSent(false)}
                          className="text-[11px] text-zinc-400 underline hover:text-purple-400"
                        >
                          बदलें (Change)
                        </button>
                      </div>

                      {/* Demo OTP Helper Pill */}
                      {simulatedOtp && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                          <div className="text-[11px] text-amber-300">
                            <strong>डेमो एसएमएस ओटीपी:</strong> <span className="font-mono font-bold">{simulatedOtp}</span>
                          </div>
                          <button
                            type="button"
                            data-testid="autofill-otp-btn"
                            onClick={handleAutofillOtp}
                            className="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold hover:bg-amber-500/30 transition-colors"
                          >
                            ऑटो-फिल (Auto Fill)
                          </button>
                        </div>
                      )}

                      <div>
                        <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                          6-अंकीय ओटीपी दर्ज करें (Enter 6-digit OTP)
                        </label>
                        <input
                          type="text"
                          data-testid="otp-code-input"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          placeholder="• • • • • •"
                          maxLength={6}
                          className={`w-full tracking-widest text-center px-4 py-2.5 rounded-xl border font-mono text-base font-bold transition-colors outline-hidden ${
                            isDark
                              ? 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-purple-500'
                              : 'bg-white border-slate-300 text-slate-800 focus:border-purple-600'
                          }`}
                        />
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className={isDark ? 'text-zinc-500' : 'text-slate-500'}>
                          {countdown > 0 ? `पुनः भेजें: ${countdown}s` : 'ओटीपी नहीं मिला?'}
                        </span>
                        <button
                          type="button"
                          disabled={countdown > 0}
                          onClick={() => handleSendOtp()}
                          className="text-purple-400 font-semibold disabled:opacity-40 hover:underline"
                        >
                          पुनः ओटीपी भेजें (Resend OTP)
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || otpCode.length !== 6}
                        data-testid="verify-otp-btn"
                        className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            सत्यापित किया जा रहा है...
                          </>
                        ) : (
                          <>
                            सत्यापित करें और प्रवेश करें (Verify &amp; Enter)
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 2: GOOGLE LOGIN */}
              {activeTab === 'google' && (
                <div className="space-y-3 pt-1">
                  <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
                    अपने Google खाते से 1-क्लिक में सुरक्षित लॉगिन करें। आपकी भाषा प्राथमिकताएं और वोकैबुलरी आपके गूगल अकाउंट से सिंक रहेंगी।
                  </p>

                  <div className="space-y-2">
                    <button
                      type="button"
                      data-testid="google-signin-preset-1"
                      onClick={() =>
                        handleGoogleLogin({
                          name: 'Ramesh Sharma',
                          email: 'ramesh.sharma@gmail.com',
                        })
                      }
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all hover:scale-[1.01] ${
                        isDark
                          ? 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center border border-blue-500/30">
                          G
                        </div>
                        <div>
                          <div className="font-bold text-xs">Ramesh Sharma</div>
                          <div className={`text-[11px] font-mono ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                            ramesh.sharma@gmail.com
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </button>

                    <button
                      type="button"
                      data-testid="google-signin-preset-2"
                      onClick={() =>
                        handleGoogleLogin({
                          name: 'Sunita Devi (Mandi HP)',
                          email: 'sunita.devi.hp@gmail.com',
                        })
                      }
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all hover:scale-[1.01] ${
                        isDark
                          ? 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center border border-purple-500/30">
                          G
                        </div>
                        <div>
                          <div className="font-bold text-xs">Sunita Devi (हिमाचल प्रदेश)</div>
                          <div className={`text-[11px] font-mono ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
                            sunita.devi.hp@gmail.com
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-500" />
                    </button>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      data-testid="google-signin-btn"
                      onClick={() => handleGoogleLogin()}
                      disabled={isLoading}
                      className="w-full py-2.5 rounded-xl bg-white text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 border border-slate-300 shadow-sm"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.27 21.43 7.37 24 12 24z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.1z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.27 2.57 1.25 6.58l4.03 3.1c.95-2.83 3.6-4.93 6.72-4.93z"
                        />
                      </svg>
                      Google से कनेक्ट करें (Sign In with Google)
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: EMAIL LOGIN */}
              {activeTab === 'email' && (
                <form onSubmit={handleEmailLogin} className="space-y-3 pt-1">
                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                      आपका नाम (Full Name)
                    </label>
                    <input
                      type="text"
                      value={emailUserName}
                      onChange={(e) => setEmailUserName(e.target.value)}
                      placeholder="e.g. अमित शर्मा"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs transition-colors outline-hidden ${
                        isDark
                          ? 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-purple-500'
                          : 'bg-white border-slate-300 text-slate-800 focus:border-purple-600'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
                      ई-मेल पता (Email Address)
                    </label>
                    <input
                      type="email"
                      data-testid="email-address-input"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="name@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono transition-colors outline-hidden ${
                        isDark
                          ? 'bg-zinc-950 border-zinc-800 text-zinc-100 focus:border-purple-500'
                          : 'bg-white border-slate-300 text-slate-800 focus:border-purple-600'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !emailAddress.includes('@')}
                    data-testid="email-login-btn"
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    ई-मेल से लॉगिन करें (Log in with Email)
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              {/* Guest / Bypass Field Option */}
              <div className="pt-2 border-t border-zinc-800/60">
                <button
                  type="button"
                  data-testid="guest-login-btn"
                  onClick={handleGuestLogin}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                    isDark
                      ? 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-zinc-500" />
                    बिना लॉगिन सीधे फील्ड में जाएं (Continue as Guest)
                  </span>
                  <span className="text-[11px] font-mono text-purple-400 font-bold">स्किप ➔</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
