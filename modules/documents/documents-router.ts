import { supabase } from '../../services/supabase.ts';
import { IModuleRouter } from '../contracts.ts';
import { GoogleGenAI } from "@google/genai";

const SCHEMA = 'ged';
const GOOGLE_CLIENT_ID = "1042763577765-pq4sj8pmgl4sckk5qbc5srl43iub0kmr.apps.googleusercontent.com";

export const DocumentsRouter: IModuleRouter = {
  SCHEMA,

  // --- GOOGLE WORKSPACE BRIDGE ---
  async startGoogleAuth() {
    const redirectUri = encodeURIComponent(window.location.origin + '/admin/documents');
    const scope = encodeURIComponent("https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&include_granted_scopes=true&prompt=consent`;
    
    window.location.href = authUrl;
  },

  async handleGoogleCallback(token: string) {
    try {
      const { data: { user } } = await (supabase.auth as any).getUser();
      if (!user) throw new Error("Usuário não autenticado no Kernel.");
      
      const resp = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const info = await resp.json();

      const { error } = await supabase.schema(SCHEMA).from('google_accounts').upsert({
        escritorio_id: user?.user_metadata?.escritorio_id,
        email: info.email,
        access_token: token,
        status: 'active',
        metadata: { ...info, last_sync: new Date().toISOString() }
      }, { onConflict: 'escritorio_id, email' });

      if (error) throw error;
      return info;
    } catch (e: any) {
      console.error("HM-GOOGLE-AUTH-ERROR", e);
      throw e;
    }
  },

  async createGoogleDocument(type: 'doc' | 'sheet', nome: string, accountEmail: string) {
    const { data: { user } } = await (supabase.auth as any).getUser();
    const escritorioId = user?.user_metadata?.escritorio_id;

    const mockId = `google_file_${Date.now()}`;
    const url = type === 'doc' 
      ? `https://docs.google.com/document/d/${mockId}/edit` 
      : `https://docs.google.com/spreadsheets/d/${mockId}/edit`;

    const { data, error } = await supabase.schema(SCHEMA).from('documentos').insert([{
      nome: `${nome}${type === 'doc' ? '' : ' (Planilha)'}`,
      path: url,
      mime_type: type === 'doc' ? 'application/vnd.google-apps.document' : 'application/vnd.google-apps.spreadsheet',
      external_provider: 'google_drive',
      external_id: mockId,
      escritorio_id: escritorioId,
      criado_por: user?.id
    }]).select().single();

    if (error) throw error;
    return data;
  },

  // --- CORE GED OPS ---
  async fetchTree() {
    try {
      const { data: { user } } = await (supabase.auth as any).getUser();
      if (!user) return [];
      
      const { data, error } = await supabase.schema(SCHEMA).from('folders')
        .select('*').eq('escritorio_id', user?.user_metadata?.escritorio_id);
        
      if (error) {
        console.warn("GED-TREE-WARN: Schema ged.folders não localizado.");
        return [];
      }
      return data || [];
    } catch {
      return [];
    }
  },

  async fetchDocuments(params: { folderId?: string | null, busca?: string, provider?: 'supabase' | 'google_drive' }) {
    try {
      const { data: { user } } = await (supabase.auth as any).getUser();
      if (!user) return [];
      
      let query = supabase.schema(SCHEMA).from('documentos').select('*').eq('escritorio_id', user?.user_metadata?.escritorio_id);
      
      if (params.provider) query = query.eq('external_provider', params.provider);
      if (params.busca) query = query.ilike('nome', `%${params.busca}%`);
      
      const { data, error } = await query.order('criado_em', { ascending: false });
      
      if (error) {
        console.warn("GED-DOCS-WARN: Schema ged.documentos não localizado.");
        return [];
      }
      return data || [];
    } catch {
      return [];
    }
  },

  async getHealth() {
    const checks = [
      { t: 'folders', cols: ['id', 'nome'] },
      { t: 'documentos', cols: ['id', 'nome', 'external_provider'] },
      { t: 'google_accounts', cols: ['id', 'email', 'access_token'] }
    ];
    const results = [];
    for (const check of checks) {
      try {
        const { error } = await supabase.schema(SCHEMA).from(check.t).select(check.cols.join(',')).limit(1);
        results.push({ 
          table: `${SCHEMA}.${check.t}`, 
          pass: !error, 
          msg: error ? (error.code === '42P01' ? 'TABELA_AUSENTE' : error.message) : 'NOMINAL' 
        });
      } catch (e: any) { 
        results.push({ table: `${SCHEMA}.${check.t}`, pass: false, msg: String(e.message || "ERRO_CONEXAO") }); 
      }
    }
    return results;
  }
};