import { CRMRouter } from '../crm/crm-router.ts';
import { HelpDeskRouter } from '../helpdesk/helpdesk-router.ts';
import { AiAgentsRouter } from '../ai-agents/ai-agents-router.ts';
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import { supabase } from '../../services/supabase.ts';

const SCHEMA = 'balcao_virtual';

const isValidUUID = (uuid: any) => {
  if (!uuid || typeof uuid !== 'string' || uuid === 'undefined') return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
};

const carlosTools: FunctionDeclaration[] = [
  {
    name: 'transferir_atendimento',
    parameters: {
      type: Type.OBJECT,
      description: 'Transfere a conversa para um advogado humano da equipe Hermida Maia.',
      properties: {
        motivo: { type: Type.STRING, description: 'Resumo do caso para o advogado.' }
      },
      required: ['motivo']
    }
  },
  {
    name: 'agendar_consulta',
    parameters: {
      type: Type.OBJECT,
      description: 'Agenda uma consulta jurídica diretamente na agenda do escritório.',
      properties: {
        data_hora: { type: Type.STRING, description: 'Data e hora em formato ISO.' },
        assunto: { type: Type.STRING, description: 'Objetivo da consulta.' }
      },
      required: ['data_hora', 'assunto']
    }
  }
];

export const BalcaoVirtualRouter = {
  
  isBusinessHours() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
  },

  async startSession(email: string) {
    try {
      // 1. Tenta identificar se há um usuário logado (Admin ou Cliente)
      const { data: { user } } = await (supabase.auth as any).getUser();
      const escritorioId = user?.user_metadata?.escritorio_id;
      
      const emailLower = email.trim().toLowerCase();
      
      // 2. Busca profunda no CRM para localizar usuário existente
      const { data: contactData } = await supabase.schema('crm').from('clientes')
        .select('*').eq('email', emailLower).maybeSingle();
      
      // 3. DESCOBERTA DE AGENTE RESILIENTE
      let agent = await AiAgentsRouter.fetchAgentByName('Carlos');
      if (!agent) {
        console.warn("HM-BV: Agente 'Carlos' não localizado. Acionando bootstrap...");
        await AiAgentsRouter.bootstrapDefaultAgents();
        agent = await AiAgentsRouter.fetchAgentByName('Carlos');
      }

      const insertPayload: any = {
        usuario_email: emailLower,
        agente_id: agent?.id,
        status: 'IA_TALKING',
        metadata: {
          user_name: contactData?.nome_completo || 'Visitante',
          user_type: contactData ? 'CLIENTE' : 'VISITANTE',
          contact_id: contactData?.id,
          is_anonymous: !user
        }
      };

      // Se o usuário estiver logado, vinculamos ao escritório dele.
      // Se for um visitante, podemos opcionalmente vincular a um escritório padrão ou deixar null para triagem global.
      if (isValidUUID(escritorioId)) {
        insertPayload.escritorio_id = escritorioId;
      }

      const { data: sessionRecord, error } = await supabase.schema(SCHEMA).from('sessoes_ativas').insert([insertPayload]).select().single();

      if (error) throw error;
      return { ...sessionRecord, agent, contact: contactData, escritorio_id: escritorioId };
    } catch (err: any) {
      throw new Error(`Falha ao iniciar sessão: ${err.message}`);
    }
  },

  async fetchInteractions() {
    try {
      const { data: { user } } = await (supabase.auth as any).getUser();
      const escritorioId = user?.user_metadata?.escritorio_id;
      
      // Admin/Equipe vê sessões do seu escritório ou sessões sem escritório (Visitantes)
      let query = supabase.schema(SCHEMA).from('sessoes_ativas').select('*, logs:logs_conversas(*)');

      if (isValidUUID(escritorioId)) {
        // Filtro: Sessões do meu escritório OU sessões de visitantes sem escritório ainda
        query = query.or(`escritorio_id.eq.${escritorioId},escritorio_id.is.null`);
      }

      const { data: sessions, error } = await query.order('atualizado_em', { ascending: false });

      if (error) throw error;
      if (!sessions) return [];

      // HM-V12 CROSS-QUERY: Localiza nomes reais no CRM para os e-mails da fila
      const emails = [...new Set(sessions.map(s => s.usuario_email))];
      const { data: contacts } = await supabase.schema('crm').from('clientes')
        .select('email, nome_completo, id')
        .in('email', emails);

      return sessions.map(s => {
        const contact = contacts?.find(c => c.email === s.usuario_email);
        return {
          ...s,
          metadata: {
            ...s.metadata,
            user_name: contact?.nome_completo || s.metadata?.user_name || 'Visitante',
            user_type: contact ? 'CLIENTE' : 'VISITANTE',
            contact_id: contact?.id
          }
        };
      });
    } catch (e: any) {
      console.warn("BV Fetch Silence:", e.message);
      return [];
    }
  },

  async getTriageResponse(input: string, session: any, history: any[]) {
    try {
      if (!isValidUUID(session?.id)) return "Sessão expirada ou inválida.";

      const { data: currentSession } = await supabase.schema(SCHEMA).from('sessoes_ativas').select('status').eq('id', session.id).maybeSingle();
      if (currentSession?.status === 'HUMAN_ATTENDING') return "[SISTEMA: Um advogado assumiu este atendimento.]";

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const logPayload: any = { sessao_id: session.id, role: 'user', text: input };
      if (isValidUUID(session.escritorio_id)) logPayload.escritorio_id = session.escritorio_id;
      
      await supabase.schema(SCHEMA).from('logs_conversas').insert([logPayload]);

      const systemInstruction = `Você é o Carlos, assistente jurídico da Hermida Maia. O cliente é ${session.metadata?.user_name || 'Visitante'}. Atenda de forma técnica e use ferramentas para agendar ou transferir se necessário.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history.map(h => ({ role: h.role, parts: h.parts })), { role: 'user', parts: [{ text: input }] }],
        config: { systemInstruction, tools: [{ functionDeclarations: carlosTools }] }
      });

      let finalMsg = response.text || "";
      const calls = response.functionCalls;

      if (calls) {
        for (const call of calls) {
          if (call.name === 'agendar_consulta' && isValidUUID(session.escritorio_id)) {
            const { data_hora, assunto } = call.args as any;
            await supabase.schema('agenda').from('eventos').insert([{
              escritorio_id: session.escritorio_id,
              titulo: `CONSULTA: ${session.metadata?.user_name}`,
              descricao: `Pauta: ${assunto}`,
              data_inicio: data_hora,
              tipo: 'REUNIAO',
              status: 'agendado'
            }]);
            finalMsg += `\n\n[SISTEMA: Agendamento realizado para ${new Date(data_hora).toLocaleString()}.]`;
          }
        }
      }

      const modelLog: any = { sessao_id: session.id, role: 'model', text: finalMsg };
      if (isValidUUID(session.escritorio_id)) modelLog.escritorio_id = session.escritorio_id;
      await supabase.schema(SCHEMA).from('logs_conversas').insert([modelLog]);

      return finalMsg;
    } catch (e) { 
      console.error("AI Error:", e);
      return "Estou analisando sua solicitação. Um instante..."; 
    }
  },

  async finalizeAndTicket(data: { email: string, name: string, summary: string, sessionId: string }) {
    const ticket = await HelpDeskRouter.createTicketFromWebForm({
      name: data.name,
      email: data.email,
      subject: "Atendimento via Balcão Virtual",
      message: data.summary
    });
    if (isValidUUID(data.sessionId)) {
      await supabase.schema(SCHEMA).from('sessoes_ativas').update({ status: 'DONE' }).eq('id', data.sessionId);
    }
    return ticket;
  },

  async getShieldStatus() {
    const checks = [
      { s: 'balcao_virtual', t: 'sessoes_ativas', cols: ['id', 'usuario_email'] },
      { s: 'balcao_virtual', t: 'logs_conversas', cols: ['id', 'sessao_id', 'text'] },
      { s: 'ai_agents', t: 'agents', cols: ['id', 'nome', 'tipo'] }
    ];
    const results = [];
    for (const check of checks) {
      try {
        const { error } = await supabase.schema(check.s).from(check.t).select(check.cols.join(',')).limit(1);
        results.push({ table: `${check.s}.${check.t}`, pass: !error, msg: error ? error.message : 'Nominal' });
      } catch (e: any) { 
        results.push({ table: check.t, pass: false, msg: e.message }); 
      }
    }
    return results;
  }
};