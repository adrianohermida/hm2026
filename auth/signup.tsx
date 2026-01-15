
import React, { useState } from 'react';
import { User, Mail, Lock, ArrowLeft, RefreshCw } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { authService } from '../services/auth.service.ts';

export const SignupPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [form, setForm] = useState({ name: '', email: '', pass: '' });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.signUp(form.email, form.pass, form.name);
      alert("Cadastro realizado! Verifique seu e-mail para confirmar.");
      onBack();
    } catch (e: any) { alert(e.message || "Erro no cadastro."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10" />
      <div className="relative z-10 w-full max-w-md animate-in zoom-in-95 duration-500">
        <button onClick={onBack} className="text-white/40 hover:text-brand-secondary mb-8 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group transition-all">
          <ArrowLeft size={14} className="group-hover:-translate-x-1" /> Voltar ao Login
        </button>

        <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl">
          <div className="text-center mb-10">
            <Typography variant="h3" font="serif" className="text-brand-primary">Criar Conta</Typography>
            <Typography variant="caption" className="text-brand-secondary font-black text-[9px] uppercase tracking-widest mt-2 block">Advocacia Digital V12</Typography>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-5">
            <input type="text" placeholder="Nome Completo" required className="w-full bg-slate-50 rounded-2xl py-5 px-6 outline-none focus:ring-4 focus:ring-brand-secondary/10" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input type="email" placeholder="Seu melhor e-mail" required className="w-full bg-slate-50 rounded-2xl py-5 px-6 outline-none focus:ring-4 focus:ring-brand-secondary/10" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <input type="password" placeholder="Crie uma senha forte" required className="w-full bg-slate-50 rounded-2xl py-5 px-6 outline-none focus:ring-4 focus:ring-brand-secondary/10" value={form.pass} onChange={e => setForm({...form, pass: e.target.value})} />
            <Button variant="secondary" fullWidth className="h-16 rounded-2xl font-black uppercase text-[11px] shadow-xl shadow-brand-secondary/20" disabled={loading}>
              {loading ? <RefreshCw className="animate-spin" /> : 'Solicitar Acesso'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
