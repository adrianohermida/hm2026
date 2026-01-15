import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, ArrowLeft, RefreshCw, Zap, UserCheck } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { OAuthLoginRouter } from '../modules/oauth-login/oauth-login-router.ts';

export const AuthPage: React.FC<{ onLogin: (role: any) => void; onBack: () => void }> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const isRoot = email.trim() === 'HM-ADMIN-963';
  const isDemoClient = email.trim() === 'HM-DEMO-963';

  const execAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRoot) {
        onLogin('admin');
      } else if (isDemoClient) {
        onLogin('cliente');
      } else {
        const { role } = await OAuthLoginRouter.handleAuth(email, pass, 'password');
        onLogin(role);
      }
    } catch (e: any) { 
      alert(e.message || "Falha na validação do Ledger."); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full max-w-md animate-in fade-in duration-700">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-brand-secondary transition-all mb-8 text-[10px] font-black uppercase tracking-[0.2em] group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1" /> Voltar ao Início
        </button>

        <div className={`bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border-2 transition-all duration-500 ${isRoot || isDemoClient ? 'border-brand-secondary ring-8 ring-brand-secondary/10 scale-[1.02]' : 'border-transparent'}`}>
          <div className="text-center mb-10">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border transition-all duration-500 ${isRoot || isDemoClient ? 'bg-brand-secondary text-brand-primary border-white rotate-12' : 'bg-brand-primary text-brand-secondary border-brand-secondary/20'}`}>
              {isDemoClient ? <UserCheck size={32} /> : <ShieldCheck size={32} />}
            </div>
            <Typography variant="h3" font="serif" className="text-slate-900 mb-1">
              {isRoot ? 'Kernel Access' : isDemoClient ? 'Portal Demo' : 'Acesso Seguro'}
            </Typography>
            <Typography variant="caption" className="text-brand-secondary font-black text-[9px] uppercase tracking-widest">
              {isRoot ? 'ROOT BYPASS DETECTED' : isDemoClient ? 'ACESSO CLIENTE DEMO' : 'Identidade Auditada'}
            </Typography>
          </div>

          <form onSubmit={execAuth} className="space-y-6">
            <div className="relative">
              <input 
                type="text" 
                placeholder={isRoot || isDemoClient ? "Token Ativo" : "Seu e-mail"} 
                required 
                className={`w-full bg-slate-50 border-none rounded-2xl py-5 pl-14 pr-6 text-slate-900 font-bold focus:ring-4 focus:ring-brand-secondary/10 outline-none transition-all ${isRoot || isDemoClient ? 'font-mono text-brand-secondary bg-brand-secondary/5' : ''}`} 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
              />
              <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 ${isRoot || isDemoClient ? 'text-brand-secondary' : 'text-slate-300'}`} size={18} />
            </div>
            
            {(!isRoot && !isDemoClient) && (
              <div className="relative animate-in fade-in slide-in-from-top-1">
                <input 
                  type="password" 
                  placeholder="Sua senha" 
                  required 
                  className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-14 pr-6 text-slate-900 font-bold focus:ring-4 focus:ring-brand-secondary/10 outline-none transition-all" 
                  value={pass} 
                  onChange={e => setPass(e.target.value)} 
                />
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
            )}

            <Button 
              variant={isRoot || isDemoClient ? "primary" : "secondary"} 
              fullWidth 
              className={`h-16 rounded-2xl shadow-xl font-black uppercase tracking-widest text-[11px] transition-all ${isRoot || isDemoClient ? 'bg-brand-primary text-brand-secondary border border-brand-secondary/30' : 'shadow-brand-secondary/20'}`} 
              disabled={loading}
            >
              {loading ? <RefreshCw className="animate-spin" /> : isRoot || isDemoClient ? <span className="flex items-center gap-2"><Zap size={14}/> Acesso Direto</span> : 'Entrar no Portal'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};