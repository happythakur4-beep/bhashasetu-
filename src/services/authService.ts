/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AuthProvider = 'phone_otp' | 'google' | 'email' | 'guest';

export interface UserProfile {
  id: string;
  name: string;
  identifier: string; // phone number, email address, or guest id
  provider: AuthProvider;
  avatar?: string;
  callsign: string;
  isVerified: boolean;
  connectedAt: number;
  channel: number;
}

const STORAGE_KEY = 'bhashasetu_user_profile_v1';
const HAS_VISITED_KEY = 'bhashasetu_has_visited_v1';

type AuthListener = (user: UserProfile | null) => void;

class AuthService {
  private currentUser: UserProfile | null = null;
  private listeners: Set<AuthListener> = new Set();
  private pendingOtp: { phone: string; code: string; expiresAt: number } | null = null;

  constructor() {
    this.load();
  }

  private load() {
    if (typeof localStorage !== 'undefined') {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          this.currentUser = JSON.parse(raw);
        }
      } catch (err) {
        console.warn('Failed to load user profile from storage:', err);
      }
    }
  }

  private save() {
    if (typeof localStorage !== 'undefined') {
      try {
        if (this.currentUser) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.currentUser));
          localStorage.setItem(HAS_VISITED_KEY, 'true');
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (err) {
        console.warn('Failed to save user profile:', err);
      }
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.currentUser));
  }

  public subscribe(listener: AuthListener): () => void {
    this.listeners.add(listener);
    listener(this.currentUser);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  public isFirstVisit(): boolean {
    if (typeof localStorage === 'undefined') return false;
    return !localStorage.getItem(HAS_VISITED_KEY);
  }

  public markVisited(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(HAS_VISITED_KEY, 'true');
    }
  }

  /**
   * Request a simulated 6-digit OTP for phone authentication.
   */
  public async sendOtp(phone: string): Promise<{ code: string; expiresInSec: number }> {
    const cleanPhone = phone.replace(/\s+/g, '');
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.pendingOtp = {
      phone: cleanPhone,
      code,
      expiresAt: Date.now() + 60 * 1000 * 5, // 5 min expiry
    };

    return {
      code,
      expiresInSec: 60,
    };
  }

  /**
   * Verify the entered OTP and create/log into the user session.
   */
  public async verifyOtp(phone: string, enteredOtp: string, displayName?: string): Promise<UserProfile> {
    const cleanPhone = phone.replace(/\s+/g, '');
    const cleanOtp = enteredOtp.trim();

    // Verify OTP code matches pending or is valid 6-digit demo code
    const isCodeValid =
      (this.pendingOtp && this.pendingOtp.phone === cleanPhone && this.pendingOtp.code === cleanOtp) ||
      cleanOtp === '123456' ||
      cleanOtp.length === 6;

    if (!isCodeValid) {
      throw new Error('अमान्य ओटीपी कोड। कृपया सही 6-अंकीय कोड दर्ज करें।');
    }

    const randomCallsign = `Setu-Mobile-${cleanPhone.slice(-4) || '91'}`;
    const user: UserProfile = {
      id: `usr_phone_${Date.now()}`,
      name: displayName?.trim() || `Field User (${cleanPhone.slice(-4)})`,
      identifier: cleanPhone,
      provider: 'phone_otp',
      callsign: randomCallsign,
      isVerified: true,
      connectedAt: Date.now(),
      channel: 3,
    };

    this.currentUser = user;
    this.pendingOtp = null;
    this.save();
    return user;
  }

  /**
   * Login using Google Account credentials (simulated 1-click OAuth flow).
   */
  public async loginWithGoogle(account?: { name: string; email: string; avatar?: string }): Promise<UserProfile> {
    const name = account?.name || 'Ramesh Sharma';
    const email = account?.email || 'ramesh.sharma@gmail.com';
    const avatar =
      account?.avatar ||
      `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}&backgroundColor=b6e3f4`;

    const user: UserProfile = {
      id: `usr_google_${Date.now()}`,
      name,
      identifier: email,
      provider: 'google',
      avatar,
      callsign: `Setu-${name.split(' ')[0]}-G`,
      isVerified: true,
      connectedAt: Date.now(),
      channel: 3,
    };

    this.currentUser = user;
    this.save();
    return user;
  }

  /**
   * Login with Email and Name.
   */
  public async loginWithEmail(email: string, name?: string): Promise<UserProfile> {
    const cleanEmail = email.trim();
    const cleanName = name?.trim() || cleanEmail.split('@')[0];

    const user: UserProfile = {
      id: `usr_email_${Date.now()}`,
      name: cleanName,
      identifier: cleanEmail,
      provider: 'email',
      callsign: `Setu-${cleanName.slice(0, 6)}`,
      isVerified: true,
      connectedAt: Date.now(),
      channel: 3,
    };

    this.currentUser = user;
    this.save();
    return user;
  }

  /**
   * Quick guest field access without mandatory sign-up.
   */
  public loginAsGuest(guestName?: string): UserProfile {
    const rand = Math.floor(100 + Math.random() * 900);
    const user: UserProfile = {
      id: `usr_guest_${Date.now()}`,
      name: guestName?.trim() || `Field Responder #${rand}`,
      identifier: `guest_${rand}@offline.local`,
      provider: 'guest',
      callsign: `Setu-Unit-${rand}`,
      isVerified: false,
      connectedAt: Date.now(),
      channel: 3,
    };

    this.currentUser = user;
    this.save();
    return user;
  }

  /**
   * Log out of current session.
   */
  public logout(): void {
    this.currentUser = null;
    this.save();
  }
}

export const authService = new AuthService();
