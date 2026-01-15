
import React, { useState } from 'react';
import { Mail, ArrowLeft, RefreshCw, Send } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';
import { authService } from '../services/auth.service.ts';

export const RecoveryPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.resetPassword(email);
      alert("Instruções enviadas para seu e-mail.");
      onBack();
    } catch (e: any) { alert(e.message || "Erro na solicitação."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[3.5rem] p-12 shadow-2xl relative animate-in slide-in-from-bottom-5">
        <button onClick={onBack} className="absolute -top-12 left-0 text-white/50 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase transition-all group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1" /> Retornar
        </button>
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-accent text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner"><RefreshCw size={28}/></div>
          <Typography variant="h3" font="serif" className="text-brand-primary">Recuperar Acesso</Typography>
          <Typography variant="caption" className="text-slate-400 mt-2 block lowercase normal-case">Enviaremos um link de segurança para seu e-mail.</Typography>
        </div>
        <form onSubmit={handleReset} className="space-y-6">
          <input type="email" placeholder="E-mail cadastrado" required className="w-full bg-slate-50 rounded-2xl py-5 px-6 outline-none focus:ring-2 focus:ring-brand-secondary/20" value={email} onChange={e => setEmail(e.target.value)} />
          <Button variant="primary" fullWidth className="h-16 rounded-2xl font-black uppercase text-[11px] shadow-xl" disabled={loading}>
            {loading ? <RefreshCw className="animate-spin" /> : 'Enviar Instruções'}
          </Button>
        </form>
      </div>
    </div>
  );
};
