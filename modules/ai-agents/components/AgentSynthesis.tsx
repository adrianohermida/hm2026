
import React, { useState, useEffect } from 'react';
import { Wand2, X, Shield, Zap, Layers, GraduationCap, Calendar, Check, Plus, Trash2, AlertCircle, AlertTriangle, ShieldCheck, Database, RefreshCw, ShieldAlert, ExternalLink } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { Button } from '../../../components/atoms/Button.tsx';
import { AiAgent } from '../../../types.ts';
import { AiAgentsLabels } from '../ai-agents-skeleton.tsx';
import { AiAgentsRouter } from '../ai-agents-router.ts';

interface Props {
  onSave: (agent: Partial<AiAgent>) => Promise<{ data: any, error: string | null }>;
  onClose: () => void;
}

export const AgentSynthesis: React.FC<Props> = ({ onSave, onClose }) => {
  const [activeTab, setActiveTab] = useState<'BASIC' | 'PERMS' | 'TRAIN'>('BASIC');
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [shieldStatus, setShieldStatus] = useState<'CHECKING' | 'PASS' | 'FAIL' | 'EXPOSURE_ERROR'>('CHECKING');
  
  const [form, setForm] = useState<Partial<AiAgent>>({
    nome: '',
    tipo: 'bot',
    nivel_autonomia: 3,
    persona: '',
    estilo_linguagem: 'formal',
    prompts_treinamento: [],
    matriz_permissoes: {},
    modulos_conectados: [],
    config_ferramentas: { agenda_ativa: false, email_ativo: false, calculadora_ativa: false }
  });

  const [newPrompt, setNewPrompt] = useState('');

  useEffect(() => {
    checkIntegrity();
  }, []);

  const checkIntegrity = async () => {
    setShieldStatus('CHECKING');
    const results = await AiAgentsRouter.runShieldAudit();
    const exposureFail = results.some(r => r.error === 'API_EXPOSURE_ERROR');
    const hasFail = results.some(r => r.status === 'FAIL');
    
    if (exposureFail) setShieldStatus('EXPOSURE_ERROR');
    else setShieldStatus(hasFail ? 'FAIL' : 'PASS');
  };

  const togglePerm = (moduleId: string, perm: 'read' | 'create' | 'update' | 'delete') => {
    const current = form.matriz_permissoes?.[moduleId] || { read: false, create: false, update: false, delete: false };
    const updated = { ...current, [perm]: !current[perm] };
    
    const hasAny = Object.values(updated).some(v => v);
    const connected = [...(form.modulos_conectados || [])];
    
    if (hasAny && !connected.includes(moduleId)) connected.push(moduleId);
    else if (!hasAny) {
      const idx = connected.indexOf(moduleId);
      if (idx > -1) connected.splice(idx, 1);
    }

    setForm({
      ...form,
      matriz_permissoes: { ...form.matriz_permissoes, [moduleId]: updated },
      modulos_conectados: connected
    });
  };

  const addPrompt = () => {
    if (!newPrompt.trim()) return;
    setForm({ ...form, prompts_treinamento: [...(form.prompts_treinamento || []), newPrompt] });
    setNewPrompt('');
  };

  const handleFinalSynthesis = async () => {
    const currentErrors = [];
    if (!form.nome) currentErrors.push("O nome do agente é obrigatório.");
    if (!form.persona || form.persona.length < 20) currentErrors.push("A persona deve ser detalhada (mínimo 20 caracteres).");

    if (currentErrors.length > 0) {
      setErrors(currentErrors);
      setActiveTab('BASIC');
      return;
    }

    setSaving(true);
    setErrors([]);

    try {
      const { error } = await onSave(form);
      if (error) {
        setErrors([error]);
        // Se for erro de infra, forçamos o re-check do shield
        if (error.includes('schema') || error.includes('406')) {
           checkIntegrity();
        }
      }
    } catch (e: any) {
      setErrors(["Ocorreu uma exceção inesperada no Kernel: " + e.message]);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-[4rem] p-10 shadow-2xl border border-slate-100 space-y-10 animate-in zoom-in-95 duration-500 max-w-5xl mx-auto">
      <header className="flex justify-between items-center border-b border-slate-50 pb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-brand-secondary text-brand-primary rounded-[1.8rem] flex items-center justify-center shadow-xl shadow-brand-secondary/20">
            <Zap size={32} />
          </div>
          <div>
            <Typography variant="h3" font="serif" className="text-brand-primary uppercase text-2xl tracking-tight">Orquestrador de Síntese</Typography>
            <div className="flex items-center gap-3 mt-1">
              {shieldStatus === 'CHECKING' ? (
                <div className="flex items-center gap-2 text-slate-400">
                  <RefreshCw size={12} className="animate-spin" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Auditando Ledger...</span>
                </div>
              ) : shieldStatus === 'EXPOSURE_ERROR' ? (
                <div className="flex items-center gap-2 text-rose-500 animate-pulse font-black text-[9px] uppercase tracking-widest">
                  <ShieldAlert size={12} /> Erro de Exposição (406) - Verifique API Settings
                </div>
              ) : shieldStatus === 'PASS' ? (
                <div className="flex items-center gap-2 text-emerald-600">
                  <ShieldCheck size={12} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Infraestrutura Nominal (PASS)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-500">
                  <ShieldAlert size={12} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Falha de Integridade</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-4 hover:bg-slate-50 rounded-2xl transition-all text-slate-300"><X size={24}/></button>
      </header>

      {(errors.length > 0 || shieldStatus === 'EXPOSURE_ERROR' || shieldStatus === 'FAIL') && (
        <div className="bg-rose-50 border-2 border-rose-100 p-8 rounded-[2.5rem] space-y-4 animate-in slide-in-from-top-4">
           <div className="flex items-center gap-4 text-rose-700">
              <AlertCircle size={28} />
              <Typography variant="small" className="font-black uppercase text-[11px]">Erro de Infraestrutura Detectado</Typography>
           </div>
           
           <ul className="space-y-2 ml-10">
              {errors.map((e, i) => (
                <li key={i} className="text-rose-600 text-xs font-medium leading-relaxed">
                   {e}
                </li>
              ))}
              {shieldStatus === 'EXPOSURE_ERROR' && (
                <li className="text-rose-600 text-xs font-medium leading-relaxed">
                   O schema 'ai_agents' não está habilitado na API do Supabase. Vá em <strong>Dashboard > Settings > API</strong> e adicione o schema na lista.
                </li>
              )}
              {shieldStatus === 'FAIL' && errors.length === 0 && (
                <li className="text-rose-600 text-xs font-medium leading-relaxed">
                   O schema 'ai_agents' ou suas tabelas não foram criados no banco de dados.
                </li>
              )}
           </ul>

           <div className="flex gap-4 ml-10 pt-2">
              <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2 bg-rose-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                 <ExternalLink size={12}/> Abrir Supabase
              </a>
           </div>
        </div>
      )}

      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'BASIC', label: 'Identidade', icon: <Zap size={14}/> },
          { id: 'PERMS', label: 'Permissões Supabase', icon: <Layers size={14}/> },
          { id: 'TRAIN', label: 'Refino & Treino', icon: <GraduationCap size={14}/> }
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === t.id ? 'bg-white text-brand-primary shadow-md' : 'text-slate-400 hover:text-brand-primary'}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'BASIC' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-in fade-in duration-300">
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-3 tracking-widest">{AiAgentsLabels.fields.nome.label}</label>
                <input 
                  type="text" 
                  placeholder={AiAgentsLabels.fields.nome.placeholder}
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 mt-2 focus:ring-4 focus:ring-brand-secondary/10 outline-none font-bold text-brand-primary"
                  value={form.nome}
                  onChange={e => { setForm({...form, nome: e.target.value}); setErrors([]); }}
                />
              </div>
              
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-3 tracking-widest">{AiAgentsLabels.fields.tipo.label}</label>
                <select 
                  className="w-full bg-slate-50 border-none rounded-2xl p-5 mt-2 focus:ring-4 focus:ring-brand-secondary/10 outline-none font-bold text-brand-primary"
                  value={form.tipo}
                  onChange={e => setForm({...form, tipo: e.target.value})}
                >
                  {AiAgentsLabels.fields.tipo.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-3 tracking-widest">Capacidades Nativas</label>
                <div className="grid grid-cols-1 gap-3 mt-4">
                  <button 
                    onClick={() => setForm({...form, config_ferramentas: {...form.config_ferramentas, agenda_ativa: !form.config_ferramentas?.agenda_ativa} as any})}
                    className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${form.config_ferramentas?.agenda_ativa ? 'bg-brand-primary text-brand-secondary border-brand-primary' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">Agendamento & Prazos</span>
                    </div>
                    {form.config_ferramentas?.agenda_ativa && <Check size={16}/>}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-3 tracking-widest">{AiAgentsLabels.fields.persona.label}</label>
              <textarea 
                className="w-full bg-slate-50 border-none rounded-[2rem] p-8 mt-2 focus:ring-4 focus:ring-brand-secondary/10 outline-none min-h-[300px] text-sm leading-relaxed text-slate-600 font-medium"
                placeholder={AiAgentsLabels.fields.persona.placeholder}
                value={form.persona}
                onChange={e => { setForm({...form, persona: e.target.value}); setErrors([]); }}
              />
            </div>
          </div>
        )}

        {activeTab === 'PERMS' && (
          <div className="space-y-8 animate-in slide-in-from-right-5">
            <Typography variant="body" className="text-slate-500 text-sm">Matriz de Conexão: Defina o nível de acesso aos Módulos do Sistema.</Typography>
            <div className="bg-slate-50 rounded-[2.5rem] border border-slate-100 overflow-hidden">
               <table className="w-full text-left">
                  <thead>
                    <tr className="bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest">
                       <th className="p-6">Módulo</th>
                       <th className="p-6 text-center">Ler (R)</th>
                       <th className="p-6 text-center">Gravar (C)</th>
                       <th className="p-6 text-center">Atualizar (U)</th>
                       <th className="p-6 text-center">Deletar (D)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {AiAgentsLabels.modules_available.map(mod => {
                      const perms = form.matriz_permissoes?.[mod.id] || { read: false, create: false, update: false, delete: false };
                      return (
                        <tr key={mod.id} className="hover:bg-white transition-colors">
                           <td className="p-6">
                              <Typography variant="small" className="font-bold text-brand-primary uppercase">{mod.label}</Typography>
                              <Typography variant="caption" className="text-slate-400 normal-case lowercase">schema: {mod.id}</Typography>
                           </td>
                           {(['read', 'create', 'update', 'delete'] as const).map(p => (
                             <td key={p} className="p-6 text-center">
                                <button 
                                  onClick={() => togglePerm(mod.id, p)}
                                  className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center transition-all ${perms[p] ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-200 text-slate-400 hover:bg-slate-300'}`}
                                >
                                  {perms[p] ? <Check size={18}/> : <Plus size={16}/>}
                                </button>
                             </td>
                           ))}
                        </tr>
                      )
                    })}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'TRAIN' && (
          <div className="space-y-8 animate-in slide-in-from-right-5">
            <Typography variant="body" className="text-slate-500 text-sm">Refino Neural: Adicione instruções específicas para moldar o comportamento deste agente.</Typography>
            
            <div className="flex gap-4">
               <input 
                 type="text" 
                 placeholder="Instrução de melhoria comportamental..."
                 className="flex-1 bg-slate-50 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10"
                 value={newPrompt}
                 onChange={e => setNewPrompt(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && addPrompt()}
               />
               <button onClick={addPrompt} className="px-8 bg-brand-primary text-brand-secondary rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">Adicionar</button>
            </div>

            <div className="grid gap-4">
               {form.prompts_treinamento?.map((p, i) => (
                 <div key={i} className="flex items-center justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm group">
                    <div className="flex items-start gap-4">
                       <div className="w-8 h-8 bg-brand-accent rounded-lg flex items-center justify-center text-brand-primary shrink-0"><GraduationCap size={16}/></div>
                       <Typography variant="small" className="text-slate-600 italic leading-relaxed">"{p}"</Typography>
                    </div>
                    <button onClick={() => {
                      const next = [...(form.prompts_treinamento || [])];
                      next.splice(i, 1);
                      setForm({...form, prompts_treinamento: next});
                    }} className="p-3 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={18}/></button>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER DE GOVERNANÇA ONIPRESENTE */}
      <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
           <Database size={20} className={shieldStatus === 'PASS' ? 'text-emerald-500' : 'text-rose-500'} />
           <div>
              <Typography variant="caption" className="font-black uppercase text-[8px] text-slate-400 block mb-1 tracking-widest">Ledger Connectivity</Typography>
              <Typography variant="small" className={`font-bold uppercase text-[10px] ${shieldStatus === 'PASS' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {shieldStatus === 'PASS' ? 'Link de Persistência Ativo' : shieldStatus === 'EXPOSURE_ERROR' ? 'Erro de Exposição (406)' : 'Erro de Escrita Detectado'}
              </Typography>
           </div>
        </div>

        <div className="flex gap-5">
          <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-400 px-10 h-16 rounded-2xl font-black uppercase tracking-widest text-[10px]">Abortar</Button>
          <Button 
            variant="secondary" 
            onClick={handleFinalSynthesis} 
            disabled={saving || (shieldStatus !== 'PASS' && shieldStatus !== 'CHECKING' && shieldStatus !== 'EXPOSURE_ERROR')}
            icon={saving ? <RefreshCw className="animate-spin" size={20}/> : <Wand2 size={20}/>} 
            className="px-16 h-16 shadow-brand-secondary/30 rounded-2xl font-black uppercase tracking-widest text-[10px] disabled:opacity-30 disabled:grayscale"
          >
            {saving ? 'Persistindo no Ledger...' : 'Sintetizar Módulo'}
          </Button>
        </div>
      </div>
    </div>
  );
};
