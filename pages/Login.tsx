
import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { Typography } from '../components/Typography.tsx';
import { Button } from '../components/Button.tsx';
import { Container } from '../components/Container.tsx';

export const LoginPage: React.FC<{ onLogin: (role: string) => void; onBack: () => void }> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const role = email.includes('admin') ? 'admin' : 'cliente';
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 text-white/40 hover:text-brand-secondary transition-colors mb-8 text-xs font-black uppercase tracking-widest">
          <ArrowLeft size={14} /> Voltar ao Início
        </button>

        <div className="bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-brand-primary text-brand-secondary rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl">
              <ShieldCheck size={32} />
            </div>
            <Typography variant="h3" font="serif" className="text-brand-primary mb-2">Acesso Restrito</Typography>
            <Typography variant="caption" className="text-brand-secondary">Ambiente Seguro HM-V12</Typography>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">E-mail</label>
              <div className="relative">
                <input 
                  type="email" 
                  required 
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-brand-secondary/20"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Senha</label>
              <div className="relative">
                <input 
                  type="password" 
                  required 
                  className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 outline-none focus:ring-2 focus:ring-brand-secondary/20"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              </div>
            </div>

            <Button variant="secondary" fullWidth size="lg" className="h-16" icon={<ArrowRight size={20}/>}>
              Entrar no Portal
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
