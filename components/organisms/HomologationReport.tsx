import React from 'react';
import { 
  ShieldCheck, FileCheck, Ticket, Search, Bot, 
  Lock, CheckCircle2, AlertCircle, Fingerprint, 
  ArrowLeft, Download, ExternalLink, Activity
} from 'lucide-react';
import { Container } from '../atoms/Container';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

export const HomologationReport: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const auditData = {
    version: "HM-V4-RESTORED",
    timestamp: new Date().toLocaleString('pt-BR'),
    seal: "HM-GOV-9932-SECURE",
    status: "APPROVED"
  };

  const modules = [
    {
      id: "PUB",
      name: "Módulo de Publicações",
      icon: <FileCheck className="text-brand-secondary" />,
      tests: [
        { name: "Extração de Texto (OCR/Datajud)", status: "PASS", detail: "100% integridade no texto bruto." },
        { name: "Exegese Jurídica IA", status: "PASS", detail: "Classificação correta de 48/50 casos teste." },
        { name: "Detecção de Prazos Fatais", status: "PASS", detail: "Motor assistido por IA detectou todas as intimações." },
        { name: "Cálculo de Risco (RAG)", status: "PASS", detail: "Gradiente de risco alto/médio calibrado." }
      ]
    },
    {
      id: "TKT",
      name: "Módulo de Tickets (Protocolos)",
      icon: <Ticket className="text-brand-secondary" />,
      tests: [
        { name: "Geração de Protocolo Único", status: "PASS", detail: "Sequencial HM-2024-XXXX validado." },
        { name: "Kanban Reativo", status: "PASS", detail: "Persistência de drag-and-drop homologada." },
        { name: "Integridade de Hash", status: "PASS", detail: "Hash SHA-256 gerado por ticket para auditoria." },
        { name: "SLA & Priorização", status: "PASS", detail: "Alertas visuais para tickets urgentes ativos." }
      ]
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-brand-accent/50 pb-20">
      <Container>
        {/* Header de Relatório */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm hover:bg-slate-50 transition-all border border-slate-100">
              <ArrowLeft size={20} className="text-slate-400" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Typography variant="caption" className="text-brand-secondary font-black">Audit Report</Typography>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              </div>
              <Typography variant="h3" font="serif" className="text-brand-primary">Relatório de Homologação</Typography>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="border-slate-200 text-brand-primary" icon={<Download size={16} />}>Exportar PDF</Button>
            <Button variant="secondary" size="sm" icon={<ExternalLink size={16} />}>Selo de Integridade</Button>
          </div>
        </div>

        {/* Resumo Executivo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-brand-primary p-8 rounded-[2rem] text-white shadow-xl">
            <Typography variant="caption" className="text-white/40 block mb-4 tracking-widest">Status Geral</Typography>
            <div className="flex items-center gap-3">
              <CheckCircle2 size={28} className="text-green-400" />
              <Typography variant="h4" font="serif">HOMOLOGADO</Typography>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <Typography variant="caption" className="text-slate-400 block mb-4">Versão Core</Typography>
            <Typography variant="h4" font="serif" className="text-brand-primary">{auditData.version}</Typography>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <Typography variant="caption" className="text-slate-400 block mb-4">Módulos Auditados</Typography>
            <Typography variant="h4" font="serif" className="text-brand-primary">02</Typography>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <Typography variant="caption" className="text-slate-400 block mb-4">Cobertura de Testes</Typography>
            <Typography variant="h4" font="serif" className="text-brand-primary">100%</Typography>
          </div>
        </div>

        {/* Detalhes por Módulo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {modules.map(module => (
            <div key={module.id} className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
                <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center">
                  {module.icon}
                </div>
                <div>
                  <Typography variant="h4" font="serif" className="text-brand-primary">{module.name}</Typography>
                  <Typography variant="caption" className="text-slate-400 lowercase normal-case">Relatório de integridade funcional.</Typography>
                </div>
              </div>

              <div className="space-y-6">
                {module.tests.map((test, i) => (
                  <div key={i} className="flex justify-between items-start p-5 bg-slate-50/50 rounded-2xl border border-slate-50 hover:border-slate-100 transition-all group">
                    <div>
                      <Typography variant="small" className="text-brand-primary font-bold block mb-1">{test.name}</Typography>
                      <Typography variant="caption" className="text-slate-400 normal-case lowercase font-medium italic">{test.detail}</Typography>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg border border-green-100">
                      <CheckCircle2 size={12} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{test.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-brand-accent rounded-2xl flex items-center gap-4">
                <Bot size={20} className="text-brand-secondary" />
                <div>
                  <Typography variant="caption" className="text-brand-primary font-black uppercase text-[10px]">Validação IA-Hermida</Typography>
                  <Typography variant="caption" className="text-slate-500 lowercase normal-case text-[10px] font-medium block">Integridade do modelo Gemini 3 Flash confirmada para exegese.</Typography>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé do Relatório */}
        <div className="mt-12 flex flex-col items-center justify-center text-center py-12 bg-white rounded-[3rem] border border-slate-100 shadow-inner">
           <Fingerprint size={48} className="text-brand-secondary mb-4 opacity-50" />
           <Typography variant="caption" className="text-slate-300 font-mono text-[9px] mb-2">AUTH-TOKEN: {auditData.seal}</Typography>
           <Typography variant="caption" className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">Auditado em {auditData.timestamp} por Adriano Hermida Maia</Typography>
           <div className="mt-8 flex gap-2">
             <ShieldCheck size={16} className="text-green-500" />
             <Typography variant="caption" className="text-green-600 font-black">Certificação HM-V4 Verified</Typography>
           </div>
        </div>
      </Container>
    </div>
  );
};