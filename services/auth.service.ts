
import { supabase } from './supabase.ts';

export const authService = {
  async signInWithPassword(email: string, pass: string) {
    return { data: { user: { id: 'dev-user', email } }, error: null };
  },
  async signUp(email: string, pass: string, name: string) {
    return { data: { user: { id: 'new-user', email } }, error: null };
  },
  async resetPassword(email: string) {
    return { error: null };
  },
  async signInWithOtp(email: string) {
    return { error: null };
  },
  async verifyOtp(email: string, token: string) {
    return { data: { user: { id: 'dev-user', email } }, error: null };
  }
};
