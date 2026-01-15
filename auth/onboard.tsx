
import React, { useState } from 'react';
import { User, Clipboard, CheckCircle2, ArrowRight } from 'lucide-react';
import { Typography } from '../components/atoms/Typography.tsx';
import { Button } from '../components/atoms/Button.tsx';

export const OnboardingPage: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  
  return (
    <div className="min-h-screen bg-brand-accent flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-[4rem] p-16 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
           <div className={`h-full bg-brand-secondary transition-all duration-500`} style={{ width: step === 1 ? '50%' : '100%' }} />
        </div>

        {step === 1 ? (
          <div className="animate-in fade-in slide-in-from-right-5">
            <Typography variant="caption" className="text-brand-secondary font-black mb-4 block uppercase tracking-widest">Passo 01/02</Typography>
            <Typography variant="h2" font="serif" className="text-brand-primary mb-6">Configure seu Perfil</Typography>
            <Typography variant="body" className="text-slate-400 mb-10">Para garantir a melhor defesa estratégica, precisamos de alguns dados iniciais.</Typography>
            
            <div className="space-y-6">
               <input type="text" placeholder="Qual sua profissão atual?" className="w-full bg-slate-50 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10" />
               <input type="tel" placeholder="Confirmar WhatsApp principal" className="w-full bg-slate-50 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10" />
            </div>
            <Button variant="secondary" className="mt-10 h-16 w-full rounded-2xl" onClick={() => setStep(2)}>Próxima Etapa <ArrowRight size={18} className="ml-2" /></Button>
          </div>
        ) : (
          <div className="text-center animate-in zoom-in-95">
             <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner"><CheckCircle2 size={48} /></div>
             <Typography variant="h2" font="serif" className="text-brand-primary mb-4">Tudo Pronto!</Typography>
             <Typography variant="body" className="text-slate-400 mb-12">Sua identidade foi auditada e seu portal jurídico está configurado.</Typography>
             <Button variant="primary" size="lg" fullWidth className="h-16 rounded-2xl font-black uppercase text-[11px]" onClick={onComplete}>Acessar Meu Painel</Button>
          </div>
        )}
      </div>
    </div>
  );
};
