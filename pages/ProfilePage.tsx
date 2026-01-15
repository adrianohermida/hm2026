
import React, { useState, useEffect } from 'react';
// HM-V12 Fix: Added ShieldCheck to lucide-react imports to resolve the error on line 85
import { 
  User, Shield, Phone, Briefcase, Loader2, CheckCircle2, 
  Camera, Mail, Lock, History, Fingerprint, Save, ArrowLeft,
  ShieldCheck
} from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { Container } from '../components/atoms/Container.tsx';

export const ProfilePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Mock de dados do perfil para ambiente estéril
  const [profile, setProfile] = useState({
    name: 'Dr. Adriano Hermida Maia',
    email: 'adriano@hermidamaia.adv.br',
    oab: 'RS 10748',
    specialty: 'Direito Bancário & Superendividamento',
    bio: 'Advogado especialista dedicado à preservação do Mínimo Existencial.',
    phone: '(51) 99603-2004'
  });

  useEffect(() => {
    // Simula carregamento de ledger
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    
    // Simula persistência no Ledger HM-V12
    setTimeout(() => {
      setSaving(false);
      setMessage({ type: 'success', text: 'Perfil sincronizado com sucesso no Ledger.' });
      setTimeout(() => setMessage(null), 3000);
    }, 1200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05080F] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="text-brand-secondary animate-spin" size={48} />
        <Typography variant="caption" className="text-white/20 tracking-[0.4em]">Auditando Identidade...</Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05080F] text-white font-sans selection:bg-brand-secondary/30 pb-20">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary/5 blur-[120px] rounded-full" />
      </div>

      <Container className="pt-32 relative z-10">
        <button onClick={onBack} className="flex items-center gap-3 text-white/30 hover:text-white mb-12 transition-all group text-[10px] font-black uppercase tracking-widest">
           <ArrowLeft size={16} className="group-hover:-translate-x-1" /> Voltar ao Sistema
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* SIDEBAR: AVATAR & STATUS */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[3.5rem] text-center shadow-2xl backdrop-blur-xl">
               <div className="relative inline-block group">
                  <div className="w-32 h-32 rounded-[3rem] bg-brand-primary border-4 border-brand-secondary/30 mx-auto flex items-center justify-center text-brand-secondary text-4xl font-serif shadow-2xl transition-transform group-hover:rotate-6">
                    {profile.name[0]}
                  </div>
                  <button className="absolute bottom-[-10px] right-[-10px] p-3 bg-brand-secondary text-brand-primary rounded-2xl shadow-xl hover:scale-110 transition-all">
                    <Camera size={18} />
                  </button>
               </div>
               <div className="mt-8 space-y-2">
                  <Typography variant="h4" font="serif" className="text-white">{profile.name}</Typography>
                  <Typography variant="caption" className="text-brand-secondary font-bold tracking-widest">{profile.oab}</Typography>
               </div>
               <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                     <span>Acesso</span>
                     <span className="text-emerald-500 flex items-center gap-1.5"><ShieldCheck size={12}/> Verificado</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                     <span>Papel</span>
                     <span className="text-brand-secondary">Sócio Master</span>
                  </div>
               </div>
            </div>

            {/* SECURITY LOG */}
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem]">
               <Typography variant="caption" className="text-white/30 font-black uppercase tracking-[0.2em] mb-6 block">Ledger de Segurança</Typography>
               <div className="space-y-6">
                  {[
                    { action: 'Login Efetuado', time: 'Hoje, 09:12', icon: <Fingerprint size={14}/> },
                    { action: 'Acesso ao CRM', time: 'Hoje, 10:45', icon: <History size={14}/> }
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4">
                       <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-brand-secondary">{log.icon}</div>
                       <div>
                          <p className="text-[11px] font-bold text-white/60">{log.action}</p>
                          <p className="text-[9px] text-white/20 font-medium">{log.time}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* MAIN FORM: PROFISSIONAL DATA */}
          <div className="lg:col-span-8">
             <form onSubmit={handleSave} className="bg-white/[0.03] border border-white/10 p-10 md:p-16 rounded-[4rem] shadow-2xl backdrop-blur-xl space-y-12">
                {message && (
                  <div className={`p-6 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4 duration-500 ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400'}`}>
                    <CheckCircle2 size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">{message.text}</span>
                  </div>
                )}

                <section className="space-y-8">
                   <div className="flex items-center gap-4 text-brand-secondary">
                      <Briefcase size={24}/>
                      <Typography variant="h4" font="serif" className="text-white">Identidade Profissional</Typography>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/30 ml-4 tracking-widest">Nome Completo</label>
                        <input type="text" className="w-full bg-white/5 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-bold text-white" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/30 ml-4 tracking-widest">Inscrição OAB</label>
                        <input type="text" className="w-full bg-white/5 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-bold text-white" value={profile.oab} onChange={e => setProfile({...profile, oab: e.target.value})} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase text-white/30 ml-4 tracking-widest">Área de Atuação Principal</label>
                        <input type="text" className="w-full bg-white/5 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-bold text-white" value={profile.specialty} onChange={e => setProfile({...profile, specialty: e.target.value})} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase text-white/30 ml-4 tracking-widest">Resumo Biográfico Profissional</label>
                        <textarea rows={4} className="w-full bg-white/5 border-none rounded-[2rem] p-8 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-bold text-white resize-none leading-relaxed" value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} />
                      </div>
                   </div>
                </section>

                <section className="space-y-8 pt-8 border-t border-white/5">
                   <div className="flex items-center gap-4 text-brand-secondary">
                      <Phone size={24}/>
                      <Typography variant="h4" font="serif" className="text-white">Contatos Auditados</Typography>
                   </div>
                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/30 ml-4 tracking-widest">E-mail Corporativo</label>
                        <div className="relative">
                          <input type="email" disabled className="w-full bg-white/5 border-none rounded-2xl p-5 pl-14 outline-none opacity-50 font-bold text-white" value={profile.email} />
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/30 ml-4 tracking-widest">WhatsApp de Equipe</label>
                        <div className="relative">
                          <input type="text" className="w-full bg-white/5 border-none rounded-2xl p-5 pl-14 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-bold text-white" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                        </div>
                      </div>
                   </div>
                </section>

                <div className="pt-8 flex justify-end">
                   <Button 
                    variant="secondary" 
                    size="lg" 
                    disabled={saving}
                    className="h-20 px-16 rounded-[2rem] shadow-2xl shadow-brand-secondary/20"
                    icon={saving ? <Loader2 className="animate-spin" /> : <Save size={20}/>}
                   >
                     {saving ? 'Sincronizando...' : 'Confirmar Alterações'}
                   </Button>
                </div>
             </form>
          </div>
        </div>
      </Container>
    </div>
  );
};
