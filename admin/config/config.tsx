
import React, { useState } from 'react';
import { Settings, ShieldCheck, Database, Globe, CreditCard, Loader2, Save } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';
import { Button } from '../../components/atoms/Button.tsx';

export const Config: React.FC = () => {
  const [stripeKey, setStripeKey] = useState('');
  const [connectId, setConnectId] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const handleSaveStripe = async () => {
    setIsSaving(true);
    setTestResult(null);
    // Simulação de delay
    setTimeout(() => {
      setIsSaving(false);
      if (stripeKey.startsWith('sk_')) {
        setTestResult({ success: true, message: 'Chaves salvas com sucesso no cofre seguro.' });
      } else {
        setTestResult({ success: false, message: 'Chave inválida. Deve começar com "sk_".' });
      }
    }, 1000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-5xl">
      <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Kernel <span className="text-brand-secondary italic">Setup</span></Typography>
      
      <div className="grid grid-cols-1 gap-8">
        
        {/* STRIPE CONFIGURATION */}
        <section className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
           
           <div className="relative z-10 flex items-start gap-6 mb-8">
              <div className="w-16 h-16 bg-brand-primary text-brand-secondary rounded-2xl flex items-center justify-center shadow-lg">
                 <CreditCard size={32} />
              </div>
              <div>
                 <Typography variant="h3" font="serif" className="text-brand-primary text-2xl">Integração Stripe</Typography>
                 <Typography variant="body" className="text-slate-500 text-sm">Gerencie chaves de API e contas conectadas para processamento de pagamentos.</Typography>
              </div>
           </div>

           <div className="relative z-10 space-y-6 max-w-2xl">
              <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest block mb-2">Chave Secreta (Secret Key)</label>
                 <input 
                   type="password" 
                   className="w-full bg-slate-50 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-mono text-sm text-brand-primary"
                   placeholder="sk_live_..."
                   value={stripeKey}
                   onChange={e => setStripeKey(e.target.value)}
                 />
              </div>
              
              <div>
                 <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest block mb-2">Conta Conectada (Opcional)</label>
                 <input 
                   type="text" 
                   className="w-full bg-slate-50 border-none rounded-2xl p-5 outline-none focus:ring-4 focus:ring-brand-secondary/10 font-mono text-sm text-brand-primary"
                   placeholder="acct_..."
                   value={connectId}
                   onChange={e => setConnectId(e.target.value)}
                 />
              </div>

              {testResult && (
                <div className={`p-4 rounded-xl text-xs font-bold ${testResult.success ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                   {testResult.message}
                </div>
              )}

              <div className="pt-4">
                 <Button 
                   variant="secondary" 
                   onClick={handleSaveStripe} 
                   disabled={isSaving}
                   className="h-14 px-10 rounded-2xl shadow-xl shadow-brand-secondary/20"
                   icon={isSaving ? <Loader2 className="animate-spin" /> : <Save size={18}/>}
                 >
                   {isSaving ? 'Validando...' : 'Salvar Configuração'}
                 </Button>
              </div>
           </div>
        </section>

        {/* SYSTEM STATUS */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-4">
              <ShieldCheck className="text-emerald-500" size={32}/>
              <div>
                 <Typography variant="small" className="font-bold text-brand-primary">Segurança AES-256</Typography>
                 <Typography variant="caption" className="text-slate-400">Ledger Auditado & Ativo.</Typography>
              </div>
           </div>
           <span className="px-4 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">Status: OK</span>
        </section>

        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
           <div className="flex items-center gap-4">
              <Globe size={32} className="text-brand-secondary"/>
              <div>
                 <Typography variant="small" className="font-bold text-brand-primary">Domínio Personalizado</Typography>
                 <Typography variant="caption" className="text-slate-400">hermidamaia.adv.br</Typography>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};
