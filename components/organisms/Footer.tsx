
import React, { useState } from 'react';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Youtube, 
  Phone, 
  Mail, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  ShieldAlert, 
  MapPin, 
  Globe, 
  ShieldCheck,
  Zap,
  Send,
  HelpCircle,
  Calendar,
  Headset,
  Ticket
} from 'lucide-react';
import { Container } from '../atoms/Container.tsx';
import { Typography } from '../atoms/Typography.tsx';
import { Logo } from '../ui/Logo.tsx';

export const Footer: React.FC = () => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const socialLinks = [
    { icon: <Instagram size={18} />, href: "http://instagram.com/dr.adrianohermidamaia" },
    { icon: <Facebook size={18} />, href: "https://facebook.com/hermidamaia" },
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/company/dradrianohermidamaia" },
    { icon: <Youtube size={18} />, href: "https://youtube.com/@hermidamaia" }
  ];

  const handleManualNavigation = (route: string) => {
    // HM-V12: Hack temporário para disparar navegação em componentes sem acesso ao hook, 
    // ou simplesmente usar o window.location/scroll em links internos.
    // Em produção, o Footer deve receber onNavigate via props para consistência.
    window.location.hash = `#/${route}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a2b4a] pt-24 pb-12 border-t border-white/10 relative overflow-hidden text-white font-sans">
      {/* Atmosfera Visual */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-secondary/5 blur-[150px] rounded-full pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* COLUNA 1: IDENTIDADE */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center p-2 shadow-xl transition-transform group-hover:scale-105 bg-brand-primary border border-brand-primary">
                <Logo variant="light" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-sm md:text-lg leading-tight uppercase tracking-tighter transition-colors">Dr. Adriano Hermida Maia</span>
                <span className="text-brand-secondary text-[8px] font-black uppercase tracking-[0.3em]">Defesa do Superendividamento</span>
              </div>
            </div>
            
            <Typography variant="body" className="text-white/40 text-sm leading-relaxed font-light">
              Liderança nacional na defesa estratégica do consumidor superendividado. Tecnologia aplicada para restaurar a dignidade financeira de milhares de famílias brasileiras.
            </Typography>

            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white/30 hover:text-brand-secondary hover:bg-brand-secondary/10 hover:border-brand-secondary/40 transition-all duration-500"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUNA 2: ATUAÇÃO */}
          <div>
            <Typography variant="caption" className="text-brand-secondary font-black tracking-[0.2em] uppercase mb-8 block">Atuação</Typography>
            <ul className="space-y-4">
              {[
                "Defesa do Superendividado",
                "Revisão de Juros Bancários",
                "Renegociação de Dívidas",
                "Fraudes e Golpes Digitais",
                "Recuperação Judicial e Falência"
              ].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-white/40 hover:text-brand-secondary transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-white/10 rounded-full group-hover:bg-brand-secondary transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 3: LINKS ÚTEIS */}
          <div>
            <Typography variant="caption" className="text-brand-secondary font-black tracking-[0.2em] uppercase mb-8 block">Links úteis</Typography>
            <ul className="space-y-4">
              {[
                { label: "Central de Ajuda", route: "ajuda", icon: <HelpCircle size={10} /> },
                { label: "Agendamento", route: "agendamento", icon: <Calendar size={10} /> },
                { label: "Balcão Virtual", route: "balcao-virtual", icon: <Headset size={10} /> },
                { label: "Abrir chamado", route: "contato", icon: <Ticket size={10} /> }
              ].map((link, i) => (
                <li key={i}>
                  <button 
                    onClick={() => handleManualNavigation(link.route)}
                    className="text-white/40 hover:text-brand-secondary transition-colors text-sm flex items-center gap-2 group text-left"
                  >
                    <span className="text-white/10 group-hover:text-brand-secondary transition-colors">
                      {link.icon}
                    </span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUNA 4: CONEXÃO & NEWSLETTER */}
          <div className="space-y-8">
            <Typography variant="caption" className="text-brand-secondary font-black tracking-[0.2em] uppercase mb-2 block">Conexão Imediata</Typography>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-brand-secondary border border-white/10 group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all">
                  <Phone size={18} />
                </div>
                <span className="text-sm font-bold text-white/60">(51) 99603-2004</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-brand-secondary border border-white/10 group-hover:bg-brand-secondary group-hover:text-brand-primary transition-all">
                  <Mail size={18} />
                </div>
                <span className="text-sm font-bold text-white/60">contato@hermidamaia.adv.br</span>
              </div>
            </div>

            <div className="pt-4">
              <Typography variant="caption" className="text-white/20 uppercase text-[9px] mb-4 block tracking-widest font-black">Boletim Informativo</Typography>
              <form className="relative group">
                <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white outline-none focus:border-brand-secondary/40 focus:ring-4 focus:ring-brand-secondary/5 transition-all placeholder:text-white/10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-secondary text-brand-primary p-2.5 rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ÁREA LEGAL E OAB */}
        <div className="pt-12 border-t border-white/5">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
            
            {/* Disclaimer Colapsável */}
            <div className="flex-1 max-w-2xl">
              <button 
                onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
                className="flex items-center justify-between gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all w-full text-left group"
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert size={16} className="text-brand-secondary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Aviso Legal e Transparência</span>
                </div>
                {isDisclaimerOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {isDisclaimerOpen && (
                <div className="mt-4 p-6 bg-white/[0.02] rounded-2xl border border-white/5 animate-in slide-in-from-top-2 duration-300">
                  <Typography variant="caption" className="text-white/30 normal-case leading-relaxed text-[11px] font-medium block">
                    As informações disponibilizadas neste portal têm caráter exclusivamente informativo e educacional, não constituindo consultoria jurídica gratuita ou promessa de resultado. Atendimentos personalizados exigem contratação formal. A Hermida Maia Advocacia (OAB/RS 10748) atua em estrita conformidade com o Código de Ética e Disciplina da OAB. Este site é independente e não possui vínculo com órgãos governamentais ou redes sociais. Todos os direitos reservados.
                  </Typography>
                </div>
              )}
            </div>

            {/* Selo OAB e Copyright */}
            <div className="flex flex-col items-end gap-4 text-right">
              <div className="flex items-center gap-3 px-6 py-3 bg-brand-secondary/10 rounded-xl border border-brand-secondary/20">
                <ShieldCheck size={20} className="text-brand-secondary" />
                <div>
                   <Typography variant="caption" className="text-white font-black block leading-none">OAB/RS 10748</Typography>
                   <Typography variant="caption" className="text-brand-secondary/60 text-[8px] uppercase font-bold tracking-widest">Selo de Integridade</Typography>
                </div>
              </div>
              <div className="space-y-1">
                <Typography variant="caption" className="text-white/20 normal-case text-[10px] block">
                  © 2026. Hermida Maia Advocacia. <br />
                  Todos os direitos reservados.
                </Typography>
              </div>
            </div>

          </div>

          <div className="mt-12 pt-8 border-t border-white/[0.02] flex flex-wrap justify-center lg:justify-start gap-8 opacity-20 hover:opacity-50 transition-opacity">
            {['Privacidade', 'Termos de Uso', 'LGPD Compliance', 'Portal da Transparência'].map(t => (
              <a key={t} href="#" className="text-[9px] font-black uppercase tracking-widest hover:text-brand-secondary transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
