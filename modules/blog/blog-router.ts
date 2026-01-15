
import { supabase } from '../../services/supabase.ts';

const SCHEMA = 'cms';
const TABLE = 'artigos';

export const BlogRouter = {
  async fetchPosts() {
    return supabase.schema(SCHEMA).from(TABLE).select('*').order('data', { ascending: false });
  },
  async savePost(post: any) {
    return supabase.schema(SCHEMA).from(TABLE).upsert(post);
  }
};
