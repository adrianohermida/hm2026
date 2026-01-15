import { supabase } from '../../services/supabase.ts';
import { IModuleRouter } from '../contracts.ts';

const SCHEMA = 'solutions';

export const SolutionsRouter: IModuleRouter = {
  SCHEMA,

  async fetchCategories(onlyPublic = false) {
    let query = supabase.schema(SCHEMA).from('categories').select('*');
    if (onlyPublic) query = query.eq('is_public', true);
    const { data, error } = await query.order('name', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async fetchArticles(categoryId?: string, search?: string, limit = 50) {
    let query = supabase.schema(SCHEMA).from('articles').select('*, categories(name, is_public)');
    
    if (categoryId) query = query.eq('category_id', categoryId);
    if (search) query = query.ilike('title', `%${search}%`);
    
    const { data, error } = await query.order('created_at', { ascending: false }).limit(limit);
    if (error) throw error;
    return data || [];
  },

  async fetchRelatedArticles(articleId: string, categoryId: string) {
    const { data, error } = await supabase.schema(SCHEMA)
      .from('articles')
      .select('id, title, created_at')
      .eq('category_id', categoryId)
      .neq('id', articleId)
      .eq('status', 'published')
      .limit(3);
    if (error) throw error;
    return data || [];
  },

  async fetchArticleById(id: string) {
    const { data, error } = await supabase.schema(SCHEMA).from('articles').select('*, categories(*)').eq('id', id).single();
    if (error) throw error;
    
    // Log view increment (Silent)
    supabase.schema(SCHEMA).from('article_views').insert([{ article_id: id }]).then();
    
    return data;
  },

  async registerFeedback(articleId: string, isHelpful: boolean) {
    const { error } = await supabase.schema(SCHEMA)
      .from('article_feedback')
      .insert([{ article_id: articleId, is_helpful: isHelpful }]);
    if (error) throw error;
  },

  async upsertArticle(article: any) {
    const { data, error } = await supabase.schema(SCHEMA).from('articles').upsert(article).select().single();
    if (error) throw error;
    return data;
  },

  async deleteArticle(id: string) {
    const { error } = await supabase.schema(SCHEMA).from('articles').delete().eq('id', id);
    if (error) throw error;
  },

  async getShieldStatus() {
    const checks = [
      { t: 'categories', cols: ['id', 'name'] },
      { t: 'articles', cols: ['id', 'title', 'content', 'status'] },
      { t: 'article_views', cols: ['id', 'article_id'] },
      { t: 'article_feedback', cols: ['id', 'article_id', 'is_helpful'] }
    ];
    const results = [];
    
    for (const check of checks) {
      try {
        const { error } = await supabase.schema(SCHEMA).from(check.t).select(check.cols.join(',')).limit(1);
        const isApiBlocked = error?.status === 406;
        const isMissing = error?.code === '42P01' || error?.code === 'PGRST106';

        results.push({ 
          table: `${SCHEMA}.${check.t}`, 
          pass: !error, 
          msg: isApiBlocked ? 'API_BLOCKED' : (isMissing ? 'TABLE_MISSING' : 'Nominal')
        });
      } catch (e) {
        results.push({ table: `${SCHEMA}.${check.t}`, pass: false, msg: 'CRITICAL_FAILURE' });
      }
    }
    return results;
  }
};