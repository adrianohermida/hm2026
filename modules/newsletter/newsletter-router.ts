import { supabase } from '../../services/supabase.ts';
import { GoogleGenAI, Type } from "@google/genai";
import { IModuleRouter } from '../contracts.ts';

const SCHEMA = 'marketing';

export const NewsletterRouter: IModuleRouter = {
  SCHEMA,

  async fetchCampaigns() {
    const { data, error } = await supabase.schema(SCHEMA).from('campanhas')
      .select('*, aberturas(count), cliques:cliques_ledger(count)')
      .order('criado_em', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async fetchSubscribers() {
    const { data, error } = await supabase.schema(SCHEMA)
      .from('assinantes')
      .select('*, etiquetas:etiquetas_interesse(nome)')
      .order('criado_em', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  /**
   * MOTOR NEURAL DE ETIQUETAS V14.8
   * Analisa profundamente o histórico de Tickets e CRM via Gemini.
   */
  async runAiInterestAnalysis(assinanteId: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // 1. Coleta histórico cross-module
    const { data: sub } = await supabase.schema(SCHEMA).from('assinantes').select('contato_id, email').eq('id', assinanteId).single();
    if (!sub?.contato_id) return { success: false, error: 'Contato não vinculado ao CRM.' };

    const { data: tickets } = await supabase.schema('tickets').from('tickets').select('assunto, descricao').eq('contato_id', sub.contato_id);
    const context = tickets?.map(t => `${t.assunto}: ${t.descricao}`).join(' | ') || "Sem histórico.";

    // 2. Orquestração Gemini 3 Flash
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise o histórico jurídico deste cliente e retorne APENAS um array JSON de etiquetas de interesse (máximo 3 etiquetas curtas): "${context}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });

    const tags: string[] = JSON.parse(response.text || '[]');

    // 3. Persistência no Ledger
    if (tags.length > 0) {
      await supabase.schema(SCHEMA).from('etiquetas_interesse').delete().eq('assinante_id', assinanteId);
      await supabase.schema(SCHEMA).from('etiquetas_interesse').insert(
        tags.map(t => ({ assinante_id: assinanteId, nome: t }))
      );
    }

    return { success: true, tags };
  },

  async fetchWebhookLogs() {
    const { data } = await supabase.schema(SCHEMA).from('webhook_logs').select('*').order('criado_em', { ascending: false }).limit(20);
    return data || [];
  },

  async syncAudienceFromCRM() {
    const { data: contacts } = await supabase.schema('crm').from('clientes').select('id, nome_completo, email');
    if (!contacts) return 0;

    const { error } = await supabase.schema(SCHEMA).from('assinantes').upsert(
      contacts.map(c => ({
        contato_id: c.id,
        email: c.email,
        nome: c.nome_completo,
        status: 'ativo',
        origem: 'Sincronização CRM V14'
      })), 
      { onConflict: 'email' }
    );
    if (error) throw error;
    return contacts.length;
  },

  async upsertCampaign(campaign: any) {
    const { data, error } = await supabase.schema(SCHEMA).from('campanhas').upsert(campaign).select().single();
    if (error) throw error;
    return data;
  },

  async getShieldStatus() {
    const entities = [
      { t: 'campanhas', cols: ['id', 'titulo'] },
      { t: 'assinantes', cols: ['id', 'email'] },
      { t: 'etiquetas_interesse', cols: ['id', 'nome'] },
      { t: 'webhook_logs', cols: ['id', 'provider', 'status'] }
    ];
    const results = [];
    for (const ent of entities) {
      try {
        const { error } = await supabase.schema(SCHEMA).from(ent.t).select(ent.cols.join(',')).limit(1);
        results.push({
          table: `${SCHEMA}.${ent.t}`,
          pass: !error,
          msg: error ? error.message : 'Nominal'
        });
      } catch (e: any) {
        results.push({ table: ent.t, pass: false, msg: 'ERRO_CONEXAO' });
      }
    }
    return results;
  }
};