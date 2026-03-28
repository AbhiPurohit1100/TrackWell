import { supabase } from './supabaseClient';
import { UsageEvent } from '../types/inference';

const TABLE = 'usage_events';

export const upsertEvent = async (event: UsageEvent) => {
  const { error } = await supabase.from(TABLE).upsert(event);
  if (error) throw error;
};

export const fetchEvents = async (userId: string) => {
  const { data, error } = await supabase
    .from<UsageEvent>(TABLE)
    .select('*')
    .eq('request->>clientId', userId)
    .order('createdAt', { ascending: false });
  if (error) throw error;
  return data || [];
};
