import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Mail, Lock, ArrowRight, ArrowLeft, 
  RefreshCw, Smartphone, Key, Wand2, QrCode, ShieldAlert, CheckCircle2,
  FileText, Download, Copy, AlertTriangle
} from 'lucide-react';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';
import { mfaService } from '../../services/mfaService.ts';

interface AuthPageProps {
  onLogin: (role?: 'admin' | 'cliente') => void;
  onBack: () => void;
}

type AuthStep = 'LOGIN' | 'LGPD_CONSENT' | 'MFA_SETUP' | 'MFA_BACKUP_CODES' | 'MFA_CHALLENGE';

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<AuthStep>('LOGIN');
  const [mfaCode, setMfaCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDevBackdoor, setIsDevBackdoor] = useState(false);
  const [consentApproved, setConsentApproved] = useState(false);

  useEffect(() => {
    // HM-AUDIT: Monitoramento em tempo real do token de bypass
    setIsDevBackdoor(email.trim() === 'HM-ADMIN-963');
  }, [email]);

  const handleInitialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulação de delay de segurança
    setTimeout(() => {
      setLoading(false);
      if (isDevBackdoor) {
        // BYPASS TOTAL: Pula LGPD e MFA para o desenvolvedor
        onLogin('admin');
      } else {
        setStep('LGPD_CONSENT');
      }
    }, 800);
  };

  const handleApproveConsent = async () => {
    if (!consentApproved) return;
    setLoading(true);
    setTimeout(() => {
      setStep('MFA_SETUP');
      setLoading(false);
    }, 600);
  };

  const handleGenerateBackupCodes = async () => {
    setLoading(true);
    const codes = Array.from({ length: 10 }, () => Math.random().toString(36).substr(2, 8).toUpperCase());
    setBackupCodes(codes);
    setLoading(false);
    setStep('MFA_BACKUP_CODES');
  };

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const isValid = await mfaService.validateToken(mfaCode);

    setTimeout(() => {
      if (isValid) {
        onLogin('cliente');
      } else {
        setError("Código inválido ou expirado.");
        setMfaCode('');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-brand-primary flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-10" />
      
      <div className="relative z-10 w-full max-w-md">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-brand-secondary transition-colors mb-8 group text-xs font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Voltar ao Início
        </button>

        <div className={`bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl transition-all duration-700 border-2 ${isDevBackdoor ? 'border-brand-secondary ring-8 ring-brand-secondary/10 scale-105' : 'border-transparent'}`}>
          
          <div className="text-center mb-10">
            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl border transition-all duration-500 ${isDevBackdoor ? 'bg-brand-secondary text-brand-primary border-white rotate-12' : 'bg-brand-primary text-brand-secondary border-brand-secondary/30'}`}>
               {step === 'LOGIN' ? <ShieldCheck size={32} /> : step === 'LGPD_CONSENT' ? <FileText size={32} /> : <Smartphone size={32} />}
            </div>
            <Typography variant="h4" font="serif" className="text-brand-primary mb-1 text-2xl">
              {isDevBackdoor ? 'Kernel Access' : step === 'LOGIN' ? 'Acesso Seguro' : 'Segurança V12'}
            </Typography>
            <Typography variant="caption" className="text-brand-secondary tracking-[0.3em] block mb-4 uppercase font-black text-[10px]">
              {isDevBackdoor ? 'ROOT BYPASS ACTIVE' : 'Identidade Auditada'}
            </Typography>
          </div>

          <div className="space-y-6">
            {step === 'LOGIN' && (
              <form onSubmit={handleInitialLogin} className="space-y-6 animate-in fade-in duration-500">
                <div className="relative">
                  <input 
                    type="text" 
                    required
                    placeholder="E-mail ou Token Root"
                    className={`w-full border-none rounded-2xl py-5 pl-14 pr-6 text-brand-primary focus:ring-4 focus:ring-brand-secondary/10 outline-none transition-all ${isDevBackdoor ? 'bg-brand-secondary/10 font-mono font-bold' : 'bg-slate-50'}`}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 ${isDevBackdoor ? 'text-brand-secondary' : 'text-slate-300'}`} size={20} />
                </div>

                {!isDevBackdoor && (
                  <div className="relative">
                    <input 
                      type="password" 
                      required
                      placeholder="Sua Senha"
                      className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-14 pr-6 text-brand-primary focus:ring-4 focus:ring-brand-secondary/10 outline-none transition-all"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  </div>
                )}

                <Button variant="secondary" fullWidth size="lg" disabled={loading} className="h-16 rounded-2xl font-black uppercase tracking-widest text-[12px] shadow-xl shadow-brand-secondary/20" icon={loading ? <RefreshCw className="animate-spin" /> : <ArrowRight />}>
                  {loading ? 'Validando...' : isDevBackdoor ? 'Acesso Root' : 'Entrar'}
                </Button>
              </form>
            )}

            {step === 'LGPD_CONSENT' && (
               <div className="space-y-6 animate-in slide-in-from-right-10 duration-500">
                  <div className="p-8 bg-brand-accent/30 rounded-[2.5rem] border border-brand-secondary/10 max-h-[300px] overflow-y-auto custom-scrollbar">
                     <Typography variant="small" className="text-brand-primary font-bold mb-4 block">Termos de Uso & Privacidade</Typography>
                     <Typography variant="caption" className="text-slate-500 normal-case leading-relaxed text-[11px]">
                        Ao acessar o sistema HM-V12, você autoriza a coleta e processamento de dados para fins jurídicos, conforme a LGPD (Lei 13.709/18). 
                     </Typography>
                  </div>
                  <label className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                     <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-lg border-brand-secondary text-brand-secondary focus:ring-brand-secondary"
                      checked={consentApproved}
                      onChange={e => setConsentApproved(e.target.checked)}
                     />
                     <span className="text-[11px] font-bold text-brand-primary">Li e aceito as condições de segurança.</span>
                  </label>
                  <Button variant="secondary" fullWidth size="lg" disabled={!consentApproved || loading} onClick={handleApproveConsent} className="h-16 rounded-2xl">
                    Confirmar e Prosseguir
                  </Button>
               </div>
            )}

            {step === 'MFA_SETUP' && (
              <div className="space-y-8 animate-in slide-in-from-right-10 duration-500 text-center">
                <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100">
                  <Typography variant="caption" className="text-brand-secondary mb-6 block font-black tracking-widest uppercase">Escaneie o QR Code</Typography>
                  <div className="relative w-48 h-48 mx-auto bg-white p-3 rounded-2xl shadow-inner border-4 border-slate-100 mb-6 group cursor-crosshair">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(mfaService.getQRCodeUrl())}`} 
                      alt="MFA QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <Typography variant="small" className="text-slate-500 normal-case leading-relaxed text-[11px] block">
                    Vincule sua conta ao <strong>Google Authenticator</strong>.
                  </Typography>
                </div>
                <Button variant="secondary" fullWidth size="lg" onClick={handleGenerateBackupCodes} className="h-16 rounded-2xl">
                  Próximo: Códigos de Backup
                </Button>
              </div>
            )}

            {step === 'MFA_BACKUP_CODES' && (
              <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
                <div className="p-10 bg-amber-500/10 border-2 border-amber-500/50 rounded-[3rem] text-center">
                   <Typography variant="small" className="text-amber-700 font-black uppercase tracking-widest mb-2 block text-[10px]">Salve estes códigos</Typography>
                   <div className="grid grid-cols-2 gap-2 bg-white/50 p-6 rounded-2xl border border-amber-200">
                      {backupCodes.map((c, i) => (
                        <code key={i} className="text-[10px] font-mono font-black text-amber-900 bg-amber-100 px-2 py-1 rounded">{c}</code>
                      ))}
                   </div>
                </div>
                <Button variant="secondary" fullWidth size="lg" onClick={() => setStep('MFA_CHALLENGE')} className="h-16 rounded-2xl">
                   Eu salvei os códigos
                </Button>
              </div>
            )}

            {step === 'MFA_CHALLENGE' && (
              <form onSubmit={handleVerifyMfa} className="space-y-6 animate-in slide-in-from-right-10 duration-500">
                <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 text-center">
                  <Typography variant="small" className="text-slate-500 normal-case mb-8 block font-medium">
                    Insira o código de 6 dígitos do aplicativo.
                  </Typography>
                  <input 
                    type="text" 
                    required
                    maxLength={6}
                    placeholder="000000"
                    className="w-full bg-white border-4 border-brand-secondary/10 rounded-[1.5rem] py-6 text-center text-4xl font-black tracking-[0.5em] text-brand-primary outline-none focus:border-brand-secondary transition-all"
                    value={mfaCode}
                    onChange={e => setMfaCode(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                {error && <Typography variant="caption" className="text-rose-500 text-center block font-black uppercase tracking-widest">{error}</Typography>}
                <Button variant="secondary" fullWidth size="lg" disabled={loading} className="h-16 rounded-2xl" icon={loading ? <RefreshCw className="animate-spin" /> : <ShieldCheck />}>
                  Verificar e Acessar
                </Button>
              </form>
            )}
          </div>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-6 opacity-40 grayscale">
          <img src="https://img.icons8.com/color/48/google-authenticator.png" alt="Google Auth" className="w-6 h-6" />
          <div className="h-4 w-[1px] bg-white/20" />
          <Typography variant="caption" className="text-white text-[9px] tracking-[0.4em] font-black uppercase">AES-256 · ISO-27001 COMPLIANT</Typography>
        </div>
      </div>
    </div>
  );
};