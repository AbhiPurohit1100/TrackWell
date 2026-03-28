import { supabase } from './supabaseClient';
import { AuthUser } from '../types/user';

export const signUp = async (email: string, password: string): Promise<AuthUser> => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error || !data.user) throw error || new Error('Signup failed');
  return { id: data.user.id, email: data.user.email ?? email };
};

export const signIn = async (email: string, password: string): Promise<AuthUser> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) throw error || new Error('Login failed');
  return { id: data.user.id, email: data.user.email ?? email };
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
