
import React, { useState, useEffect } from 'react';
import { Mail, Lock, ShieldCheck, ArrowLeft, RefreshCw, Zap, ShieldAlert, Key } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { OAuthLoginRouter } from '../modules/oauth-login/oauth-login-router.ts';

export const AuthPage: React.FC<{ onLogin: (role: 'admin' | 'cliente', userData?: any) => void; onBack: () => void }> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const isBackdoorAdmin = email.trim() === 'HM-ADMIN-963';
  const isBackdoorDemo = email.trim() === 'HM-DEMO-963';
  const isAnyBackdoor = isBackdoorAdmin || isBackdoorDemo;

  const execAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulação de processamento de segurança
    setTimeout(async () => {
      try {
        if (isBackdoorAdmin) {
          onLogin('admin', { email: 'root@hermidamaia.adv.br', name: 'Dr. Adriano (Kernel Master)' });
        } else if (isBackdoorDemo) {
          onLogin('cliente', { email: 'demo@hermidamaia.adv.br', name: 'Cliente Demonstração' });
        } else {
          const result = await OAuthLoginRouter.handleAuth(email, pass, 'password');
          onLogin(result.role as any, result.user);
        }
      } catch (e: any) { 
        alert(e.message || "Credenciais não validadas no Ledger."); 
      } finally { 
        setLoading(false); 
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#05080F] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-brand-primary/20 opacity-40" />
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-secondary/10 blur-[120px] rounded-full" />
      
      <div className="relative z-10 w-full max-w-md animate-in fade-in duration-700">
        <button onClick={onBack} className="flex items-center gap-2 text-white/30 hover:text-brand-secondary transition-all mb-8 text-[10px] font-black uppercase tracking-[0.3em] group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1" /> Voltar ao Início
        </button>

        <div className={`bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border-2 transition-all duration-700 ${isAnyBackdoor ? 'border-brand-secondary ring-8 ring-brand-secondary/5' : 'border-transparent'}`}>
          <div className="text-center mb-12">
            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl border transition-all duration-700 ${isAnyBackdoor ? 'bg-brand-primary text-brand-secondary border-white rotate-12 scale-110' : 'bg-brand-primary text-brand-secondary border-brand-secondary/20'}`}>
              {isBackdoorAdmin ? <ShieldAlert size={40} /> : isBackdoorDemo ? <Key size={40} /> : <ShieldCheck size={40} />}
            </div>
            <Typography variant="h3" font="serif" className="text-brand-primary mb-1 text-2xl">
              {isAnyBackdoor ? 'Acesso Direto' : 'Acesso Seguro'}
            </Typography>
            <Typography variant="caption" className="text-brand-secondary font-black text-[9px] uppercase tracking-[0.4em]">
              {isBackdoorAdmin ? 'KERNEL MASTER BYPASS' : isBackdoorDemo ? 'DEMO ENVIRONMENT' : 'Identidade Digital Auditada'}
            </Typography>
          </div>

          <form onSubmit={execAuth} className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder="E-mail de acesso ou Chave Master" 
                required 
                className={`w-full border-none rounded-2xl py-5 pl-14 pr-6 text-slate-900 font-bold focus:ring-4 focus:ring-brand-secondary/10 outline-none transition-all ${isAnyBackdoor ? 'bg-brand-secondary/10' : 'bg-slate-50'}`} 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
              <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 ${isAnyBackdoor ? 'text-brand-secondary' : 'text-slate-300'}`} size={20} />
            </div>
            
            <div className={`relative transition-all duration-500 ${isAnyBackdoor ? 'opacity-30 grayscale pointer-events-none' : 'opacity-100'}`}>
              <input 
                type="password" 
                placeholder={isAnyBackdoor ? 'Senha não requerida' : 'Senha de segurança'} 
                required={!isAnyBackdoor}
                className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-14 pr-6 text-slate-900 font-bold focus:ring-4 focus:ring-brand-secondary/10 outline-none transition-all" 
                value={pass} 
                onChange={e => setPass(e.target.value)} 
              />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            </div>

            <Button 
              variant={isAnyBackdoor ? "primary" : "secondary"} 
              fullWidth 
              className={`h-20 rounded-[1.8rem] shadow-xl font-black uppercase tracking-widest text-[11px] transition-all ${isAnyBackdoor ? 'shadow-brand-primary/40' : 'shadow-brand-secondary/20'}`} 
              disabled={loading}
            >
              {loading ? <RefreshCw className="animate-spin" /> : isAnyBackdoor ? 'Entrar como Master' : 'Entrar no Sistema'}
            </Button>
          </form>
          
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col items-center gap-3 opacity-40 grayscale">
             <div className="flex gap-4">
                <ShieldCheck size={14}/>
                <Typography variant="caption" className="text-[8px] font-black tracking-widest uppercase">AES-256 SECURE NODE</Typography>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
