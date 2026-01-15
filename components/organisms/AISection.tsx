import React, { useState, useEffect } from 'react';
import { 
  MapPin, BookOpen, Scale, ArrowRight, 
  Search, ShieldCheck, FileText, Landmark,
  Gavel, Info
} from 'lucide-react';
import { Container } from '../atoms/Container.tsx';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { governanceService } from '../../services/supabaseService.ts';
import { UnidadeConciliacao, ModeloDocumento } from '../../types.ts';

export const AISection: React.FC = () => {
  const [unidades, setUnidades] = useState<UnidadeConciliacao[]>([]);
  const [modelos, setModelos] = useState<ModeloDocumento[]>([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    governanceService.buscarUnidades().then(setUnidades);
    governanceService.buscarModelos().then(setModelos);
  }, []);

  const unidadesFiltradas = unidades.filter(u => {
    if (!u) return false;
    const nome = (u.nome || "").toLowerCase();
    const estado = (u.estado || "").toLowerCase();
    const query = (filtro || "").toLowerCase();
    return nome.includes(query) || estado.includes(query);
  });

  return (
    <section id="conciliar" className="py-24 relative overflow-hidden bg-brand-accent/30">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* LADO ESQUERDO: INFRAESTRUTURA DE APOIO */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <Typography variant="caption" className="text-brand-secondary mb-4 block tracking-[0.3em] font-black">Utilidade Pública</Typography>
              <Typography variant="h2" font="serif" className="text-brand-primary mb-6">Onde Conciliar?</Typography>
              <Typography variant="body" className="text-slate-500 max-w-2xl leading-relaxed">
                A Hermida Maia Advocacia disponibiliza este hub de orientação educativa para auxiliar você a encontrar as unidades de conciliação oficiais e entender o fluxo do Jus Postulandi.
              </Typography>
            </div>

            {/* BUSCA DE UNIDADES */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center text-brand-secondary shadow-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <Typography variant="h4" font="serif" className="text-brand-primary">Unidades Oficiais</Typography>
                    <Typography variant="caption" className="text-slate-400 normal-case lowercase font-medium">Encontre PROCONs e CEJUSCs próximos.</Typography>
                  </div>
               </div>

               <div className="relative mb-8">
                  <input 
                    type="text" 
                    placeholder="Busque por cidade ou estado (ex: SP, RS)..."
                    className="w-full bg-slate-50 border-none rounded-2xl p-5 pl-14 text-brand-primary focus:ring-4 focus:ring-brand-secondary/10 transition-all outline-none shadow-inner"
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                  />
                  <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
               </div>

               <div className="space-y-4 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar">
                  {unidadesFiltradas.length > 0 ? unidadesFiltradas.map(u => (
                    <div key={u.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-secondary/30 transition-all group">
                       <div className="flex gap-5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] ${u.tipo === 'PROCON' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                             {u.tipo}
                          </div>
                          <div>
                             <Typography variant="small" className="text-brand-primary font-bold block">{u.nome}</Typography>
                             <Typography variant="caption" className="text-slate-400 normal-case lowercase text-[10px]">{u.endereco} - {u.cidade}/{u.estado}</Typography>
                          </div>
                       </div>
                       <a href={u.link_oficial} target="_blank" rel="noreferrer" className="p-3 text-slate-300 hover:text-brand-secondary transition-colors">
                          <ArrowRight size={20} />
                       </a>
                    </div>
                  )) : (
                    <div className="text-center py-10 opacity-30">
                       <Info size={32} className="mx-auto mb-2" />
                       <Typography variant="caption">Nenhuma unidade encontrada para "{filtro}".</Typography>
                    </div>
                  )}
               </div>
            </div>

            {/* JUS POSTULANDI GUIDE */}
            <div className="bg-brand-primary p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl -mr-32 -mt-32" />
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                  <div className="md:col-span-8">
                     <div className="inline-flex items-center gap-2 bg-brand-secondary/20 px-3 py-1 rounded-full mb-4">
                        <Gavel size={14} className="text-brand-secondary" />
                        <Typography variant="caption" className="text-brand-secondary text-[8px] font-black uppercase tracking-widest">Educação Jurídica</Typography>
                     </div>
                     <Typography variant="h3" font="serif" className="text-white mb-4">Guia Jus Postulandi</Typography>
                     <Typography variant="body" className="text-white/60 text-sm leading-relaxed mb-8">
                        Saiba como abrir uma reclamação no Juizado Especial Cível sem a necessidade imediata de um advogado para causas de até 20 salários mínimos.
                     </Typography>
                     <Button variant="secondary" size="sm" className="font-black uppercase tracking-widest text-[10px]">Ver Tutorial Completo</Button>
                  </div>
                  <div className="md:col-span-4 flex justify-center">
                     <div className="w-32 h-32 bg-white/10 rounded-[2.5rem] flex items-center justify-center border border-white/5 shadow-2xl group-hover:rotate-6 transition-transform">
                        <Landmark size={48} className="text-brand-secondary opacity-40" />
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* LADO DIREITO: MODELOS ESSENCIAIS */}
          <div className="lg:col-span-5">
             <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 flex flex-col h-full sticky top-32">
                <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-8">
                   <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-primary shadow-inner">
                      <BookOpen size={32} />
                   </div>
                   <div>
                      <Typography variant="h3" font="serif" className="text-brand-primary">Modelos Essenciais</Typography>
                      <Typography variant="caption" className="text-slate-400 normal-case lowercase font-medium">Kit de defesa para o devedor.</Typography>
                   </div>
                </div>

                <div className="flex-1 space-y-6">
                   {modelos.map(m => (
                      <div key={m.id} className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                         <div className="flex items-start justify-between mb-4">
                            <span className="px-3 py-1 bg-brand-primary text-brand-secondary text-[8px] font-black uppercase tracking-widest rounded-lg">
                               {m.categoria}
                            </span>
                            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                               <ShieldCheck size={16} />
                            </div>
                         </div>
                         <Typography variant="small" className="text-brand-primary font-bold block mb-2 text-base">{m.titulo}</Typography>
                         <Typography variant="caption" className="text-slate-500 normal-case font-normal leading-relaxed mb-6 block">
                            {m.descricao}
                         </Typography>
                         <button className="flex items-center gap-2 text-brand-secondary font-black uppercase text-[10px] tracking-widest hover:translate-x-1 transition-transform">
                            Acessar Modelo <ArrowRight size={14} />
                         </button>
                      </div>
                   ))}
                </div>

                <div className="mt-12 pt-10 border-t border-slate-100">
                   <div className="flex items-center gap-4 p-6 bg-brand-accent rounded-2xl">
                      <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-brand-secondary shadow-lg">
                         <Settings size={18} className="animate-spin-slow" />
                      </div>
                      <div>
                         <Typography variant="caption" className="text-brand-primary font-black uppercase text-[9px]">Gestão Institucional</Typography>
                         <Typography variant="caption" className="text-slate-500 normal-case lowercase text-[9px] font-medium block">Módulo alimentado por nossa governança digital em tempo real.</Typography>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

// HM-V12: Icon Settings for management info
const Settings: React.FC<{ className?: string, size?: number }> = ({ className, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);