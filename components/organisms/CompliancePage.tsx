import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, History, Database, UserCheck, 
  Search, Filter, Download, FileJson, 
  Trash2, AlertTriangle, Fingerprint, Lock,
  Globe, Clock, Terminal, CheckCircle2, Shield
} from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { servicoCompliance } from '../../services/supabaseService.ts';
import { LogAuditoriaDetalhada } from '../../types.ts';

export const CompliancePage: React.FC = () => {
  const [logs, setLogs] = useState<LogAuditoriaDetalhada[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    carregarLogs();
  }, []);

  const carregarLogs = async () => {
    setCarregando(true);
    const data = await servicoCompliance.buscarLogs();
    setLogs(data || []);
    setCarregando(false);
  };

  const filteredLogs = logs.filter(l => {
    if (!l) return false;
    const acao = (l.acao || "").toLowerCase();
    const tabela = (l.tabela || "").toLowerCase();
    const usuario = (l.usuario_nome || "").toLowerCase();
    const query = (filtro || "").toLowerCase();
    
    return acao.includes(query) || tabela.includes(query) || usuario.includes(query);
  });

  return (
    <div className="p-16 lg:p-24 max-w-7xl mx-auto space-y-16 animate-in fade-in duration-700">
      <header className="flex justify-between items-end border-b border-slate-200 pb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
             <div className="w-12 h-12 bg-brand-primary text-brand-secondary rounded-2xl flex items-center justify-center shadow-lg"><Shield size={24}/></div>
             <Typography variant="caption" className="text-brand-secondary font-black tracking-widest uppercase">Módulo de Segurança</Typography>
          </div>
          <Typography variant="h1" font="serif" className="text-brand-primary mb-3">Auditoria Forense</Typography>
          <Typography variant="body" className="text-slate-400 max-w-2xl leading-relaxed">
            Rastreamento imutável de todas as ações sensíveis no sistema Hermida Maia V12. Conformidade total com a Lei Geral de Proteção de Dados.
          </Typography>
        </div>
        <Button variant="secondary" icon={<Download size={18}/>}>Relatório Consolidado</Button>
      </header>

      {/* Estatísticas de Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: <History className="text-brand-primary"/>, label: "Ações Auditadas", value: "1,240", sub: "Últimos 30 dias" },
          { icon: <UserCheck className="text-emerald-500"/>, label: "Titulares LGPD", value: "482", sub: "Consentimentos ativos" },
          { icon: <Fingerprint className="text-brand-secondary"/>, label: "Assinaturas Digitais", value: "100%", sub: "Verificadas" },
          { icon: <Clock className="text-blue-500"/>, label: "Retenção Legal", value: "5 Anos", sub: "Padrão Tributário/Cível" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4">{stat.icon}</div>
            <Typography variant="h3" font="serif" className="text-brand-primary mb-1">{stat.value}</Typography>
            <Typography variant="caption" className="text-slate-400 font-black text-[9px] uppercase block mb-1">{stat.label}</Typography>
            <Typography variant="caption" className="text-[8px] opacity-40 lowercase normal-case block">{stat.sub}</Typography>
          </div>
        ))}
      </div>

      {/* Ledger de Auditoria */}
      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-10 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <Terminal size={24} className="text-brand-primary" />
             <Typography variant="h4" font="serif" className="text-brand-primary">Audit Ledger</Typography>
          </div>
          <div className="flex gap-4">
             <div className="relative">
                <input 
                  type="text" 
                  placeholder="Filtrar por ação ou usuário..."
                  className="bg-white border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:ring-2 focus:ring-brand-secondary/20 transition-all"
                  value={filtro}
                  onChange={e => setFiltro(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
             </div>
             <Button variant="outline" size="sm" icon={<Filter size={14}/>}>Filtros</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Data/Hora</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Usuário</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Ação</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Objeto</th>
                <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Identidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {carregando ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={5} className="p-10"><div className="h-4 bg-slate-50 rounded w-full"/></td>
                  </tr>
                ))
              ) : filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-brand-accent/30 transition-colors group">
                  <td className="p-6">
                    <Typography variant="small" className="text-slate-400 font-mono text-[11px]">{new Date(log.criado_em).toLocaleString()}</Typography>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-brand-secondary text-[10px] font-black">
                        {log.usuario_nome?.charAt(0)}
                      </div>
                      <Typography variant="small" className="font-bold text-brand-primary">{log.usuario_nome}</Typography>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${(log.acao || "").includes('DELETE') ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {log.acao}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <Typography variant="small" className="font-bold text-brand-primary lowercase">{log.tabela}</Typography>
                      <Typography variant="caption" className="text-[9px] text-slate-400 font-mono">{(log.registro_id || "").slice(0, 13)}...</Typography>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="p-3 text-slate-300 hover:text-brand-primary hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-100">
                      <Fingerprint size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seção LGPD de Exportação */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-brand-primary p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10">
               <div className="w-16 h-16 bg-brand-secondary rounded-[2rem] flex items-center justify-center mb-8 text-brand-primary shadow-2xl group-hover:rotate-12 transition-transform">
                  <FileJson size={32} />
               </div>
               <Typography variant="h3" font="serif" className="mb-4">Requisição de Portabilidade</Typography>
               <Typography variant="body" className="text-white/60 mb-10 leading-relaxed text-sm">
                  Exporte o conjunto completo de dados de um titular em formato JSON estruturado, pronto for portabilidade ou auditoria técnica.
               </Typography>
               <div className="flex gap-4">
                  <input type="text" placeholder="UUID do Titular" className="flex-1 bg-white/10 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-brand-secondary/50"/>
                  <Button variant="secondary" className="px-10 h-16 shadow-2xl">Gerar JSON</Button>
               </div>
            </div>
         </div>

         <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-xl flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center"><Trash2 size={24}/></div>
               <div>
                  <Typography variant="small" className="text-brand-primary font-black uppercase text-[10px] tracking-widest block mb-1">Políticas de Expurgo</Typography>
                  <Typography variant="h4" font="serif" className="text-rose-600">Soft Delete Ativado</Typography>
               </div>
            </div>
            <Typography variant="body" className="text-slate-500 mb-8 leading-relaxed text-sm">
               Por questões de conformidade tributária e cível, dados marcados para exclusão permanecem em quarentena por <span className="font-bold text-brand-primary">5 anos</span> antes da remoção física definitiva.
            </Typography>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <Lock size={16} className="text-slate-400" />
               <Typography variant="caption" className="text-[10px] font-medium text-slate-500">Criptografia em repouso: AES-256-GCM Ativa.</Typography>
            </div>
         </div>
      </section>
    </div>
  );
};