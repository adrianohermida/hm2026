import React, { useState } from 'react';
import { Save, X, Brain, Shield, Layers, GraduationCap, Check, Plus, Trash2, Calendar } from 'lucide-react';
import { Typography } from '../../../components/atoms/Typography.tsx';
import { Button } from '../../../components/atoms/Button.tsx';
import { AiAgent } from '../../../types.ts';
import { AiAgentsLabels } from '../ai-agents-skeleton.tsx';

interface Props {
  agent: AiAgent;
  onSave: (dna: Partial<AiAgent>) => void;
  onClose: () => void;
}

export const AgentEditor: React.FC<Props> = ({ agent, onSave, onClose }) => {
  // HM-V12 Fix: Updated state type to match the IDs used in the tabs and comparison blocks ('PERMISSIONS' and 'TRAINING')
  const [activeTab, setActiveTab] = useState<'DNA' | 'PERMISSIONS' | 'TRAINING'>('DNA');
  const [dna, setDna] = useState<Partial<AiAgent>>({
    nome: agent.nome,
    persona: agent.persona,
    nivel_autonomia: agent.nivel_autonomia,
    tipo: agent.tipo,
    prompts_treinamento: agent.prompts_treinamento || [],
    matriz_permissoes: agent.matriz_permissoes || {},
    modulos_conectados: agent.modulos_conectados || [],
    // HM-V12 Fix: Added missing calculadora_ativa to the fallback object to satisfy the AiAgent type requirements
    config_ferramentas: agent.config_ferramentas || { agenda_ativa: false, email_ativo: false, calculadora_ativa: false }
  });

  const [newPrompt, setNewPrompt] = useState('');

  const togglePerm = (moduleId: string, perm: 'read' | 'create' | 'update' | 'delete') => {
    const current = dna.matriz_permissoes?.[moduleId] || { read: false, create: false, update: false, delete: false };
    const updated = { ...current, [perm]: !current[perm] };
    
    const hasAny = Object.values(updated).some(v => v);
    const connected = [...(dna.modulos_conectados || [])];
    
    if (hasAny && !connected.includes(moduleId)) connected.push(moduleId);
    else if (!hasAny) {
      const idx = connected.indexOf(moduleId);
      if (idx > -1) connected.splice(idx, 1);
    }

    setDna({
      ...dna,
      matriz_permissoes: { ...dna.matriz_permissoes, [moduleId]: updated },
      modulos_conectados: connected
    });
  };

  const addPrompt = () => {
    if (!newPrompt.trim()) return;
    setDna({ ...dna, prompts_treinamento: [...(dna.prompts_treinamento || []), newPrompt] });
    setNewPrompt('');
  };

  const removePrompt = (idx: number) => {
    const next = [...(dna.prompts_treinamento || [])];
    next.splice(idx, 1);
    setDna({ ...dna, prompts_treinamento: next });
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 space-y-8 animate-in zoom-in-95 duration-300">
      <header className="flex justify-between items-center border-b border-slate-50 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary text-brand-secondary rounded-2xl flex items-center justify-center"><Brain size={24}/></div>
          <div>
            <Typography variant="h4" font="serif" className="text-brand-primary uppercase text-lg">Ajuste de DNA Neural</Typography>
            <Typography variant="caption" className="text-slate-400">Versão Atual: V{agent.versao_atual}.0</Typography>
          </div>
        </div>
        <button onClick={onClose} className="p-3 hover:bg-slate-50 rounded-xl transition-all text-slate-300"><X size={20}/></button>
      </header>

      {/* TABS INTERNAS */}
      <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl w-fit">
        {[
          { id: 'DNA', label: 'DNA Base', icon: <Brain size={14}/> },
          { id: 'PERMISSIONS', label: 'Permissões', icon: <Layers size={14}/> },
          { id: 'TRAINING', label: 'Treinamento', icon: <GraduationCap size={14}/> }
        ].map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === t.id ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400'}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'DNA' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">{AiAgentsLabels.fields.nome.label}</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 mt-2 focus:ring-4 focus:ring-brand-secondary/10 outline-none font-bold text-brand-primary"
                  value={dna.nome}
                  onChange={e => setDna({...dna, nome: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Ferramentas Ativas</label>
                <div className="mt-2">
                  <button 
                    onClick={() => setDna({...dna, config_ferramentas: {...dna.config_ferramentas, agenda_ativa: !dna.config_ferramentas?.agenda_ativa} as any})}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${dna.config_ferramentas?.agenda_ativa ? 'bg-brand-primary text-brand-secondary border-brand-primary' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Calendar size={16} />
                      <span className="text-[10px] font-black uppercase">Agenda & Prazos</span>
                    </div>
                    {dna.config_ferramentas?.agenda_ativa && <Check size={14}/>}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">{AiAgentsLabels.fields.nivel_autonomia.label}</label>
                <div className="flex items-center gap-4 mt-3">
                  {[1,2,3,4,5].map(v => (
                    <button key={v} onClick={() => setDna({...dna, nivel_autonomia: v})} className={`flex-1 py-3 rounded-xl font-black text-xs transition-all border ${dna.nivel_autonomia === v ? 'bg-brand-secondary text-brand-primary border-brand-secondary' : 'bg-slate-50 text-slate-300'}`}>{v}</button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 ml-2">{AiAgentsLabels.fields.persona.label}</label>
              <textarea 
                className="w-full bg-slate-50 border-none rounded-2xl p-6 mt-2 focus:ring-4 focus:ring-brand-secondary/10 outline-none min-h-[220px] text-sm leading-relaxed text-slate-600 font-medium"
                value={dna.persona}
                onChange={e => setDna({...dna, persona: e.target.value})}
              />
            </div>
          </div>
        )}

        {activeTab === 'PERMISSIONS' && (
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden">
               <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="bg-brand-primary text-white font-black uppercase">
                       <th className="p-4">Módulo</th>
                       <th className="p-4 text-center">L</th>
                       <th className="p-4 text-center">G</th>
                       <th className="p-4 text-center">A</th>
                       <th className="p-4 text-center">D</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {AiAgentsLabels.modules_available.map(mod => {
                      const perms = dna.matriz_permissoes?.[mod.id] || { read: false, create: false, update: false, delete: false };
                      return (
                        <tr key={mod.id}>
                           <td className="p-4 font-bold uppercase">{mod.label}</td>
                           {(['read', 'create', 'update', 'delete'] as const).map(p => (
                             <td key={p} className="p-4 text-center">
                                <button 
                                  onClick={() => togglePerm(mod.id, p)}
                                  className={`w-8 h-8 rounded-lg mx-auto flex items-center justify-center transition-all ${perms[p] ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}
                                >
                                  {perms[p] ? <Check size={14}/> : <Plus size={12}/>}
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

        {activeTab === 'TRAINING' && (
          <div className="space-y-6">
            <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="Prompt de melhoria..."
                 className="flex-1 bg-slate-50 border-none rounded-xl p-4 outline-none focus:ring-2 focus:ring-brand-secondary/20 text-xs"
                 value={newPrompt}
                 onChange={e => setNewPrompt(e.target.value)}
               />
               <button onClick={addPrompt} className="px-6 bg-brand-primary text-brand-secondary rounded-xl font-black uppercase text-[9px]">Add</button>
            </div>
            <div className="grid gap-2">
               {dna.prompts_treinamento?.map((p, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl group">
                    <span className="text-xs text-slate-600 italic">"{p}"</span>
                    <button onClick={() => removePrompt(i)} className="text-slate-300 hover:text-rose-500"><Trash2 size={14}/></button>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" onClick={onClose} className="border-slate-200 text-slate-400 px-8">Descartar</Button>
        <Button variant="secondary" onClick={() => onSave(dna)} icon={<Save size={18}/>} className="px-12 shadow-brand-secondary/20">Sintetizar DNA</Button>
      </div>
    </div>
  );
};