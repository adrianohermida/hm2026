import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Linkedin, Instagram, ArrowUp, Globe } from 'lucide-react';
import { Container } from '../ui/Container.tsx';
import { Typography } from '../ui/Typography.tsx';
import { Logo } from '../ui/Logo.tsx';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-[#05080F] pt-64 pb-16 text-white border-t border-white/5 relative overflow-hidden">
      {/* Glow Atmosphere */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-brand-secondary/5 blur-[200px] rounded-full -mr-96 -mb-96 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-32 mb-48">
          
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-16">
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-white flex items-center justify-center rounded-lg shadow-2xl p-3 border-2 border-brand-secondary/30">
                <Logo className="w-full h-full" variant="dark" />
              </div>
              <div className="flex flex-col">
                <Typography variant="h3" font="serif" className="text-white text-4xl leading-none mb-2">Adriano Hermida Maia</Typography>
                <Typography variant="caption" className="text-brand-secondary font-black text-[11px] uppercase tracking-[0.6em] block">Direito Estratégico</Typography>
              </div>
            </div>
            <Typography variant="body" className="text-white/40 max-w-lg italic font-light leading-relaxed text-2xl">
              "Transformando a tecnologia em justiça para proteger o patrimônio familiar e a dignidade do cidadão brasileiro."
            </Typography>
            <div className="flex gap-6">
              {[Linkedin, Instagram, Globe].map((Icon, i) => (
                <button key={i} className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center hover:bg-brand-secondary hover:text-brand-primary transition-all duration-500 border border-white/10">
                  <Icon size={28}/>
                </button>
              ))}
            </div>
          </div>
          
          {/* Quick Connect */}
          <div className="md:col-span-4 space-y-16">
            <Typography variant="caption" className="text-brand-secondary block font-black uppercase tracking-[0.6em] text-xs">Canais de Atendimento</Typography>
            <ul className="space-y-12">
              <li className="flex items-start gap-8 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-brand-secondary/40 transition-all">
                  <MapPin className="text-brand-secondary" size={24} /> 
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white text-lg font-bold">Unidade São Paulo</span>
                  <span className="text-white/40 group-hover:text-white/60 transition-colors leading-relaxed">Av. Paulista, 1000 - Bela Vista</span>
                </div>
              </li>
              <li className="flex items-center gap-8 group cursor-pointer" onClick={() => window.open('https://wa.me/5551996032004')}>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-brand-secondary/40 transition-all">
                  <Phone className="text-brand-secondary" size={24} /> 
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white text-lg font-bold">WhatsApp Direto</span>
                  <span className="text-white/40 group-hover:text-white/60 transition-colors">(51) 99603-2004</span>
                </div>
              </li>
              <li className="flex items-center gap-8 group cursor-pointer" onClick={() => window.location.href = 'mailto:contato@hermidamaia.adv.br'}>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-brand-secondary/40 transition-all">
                  <Mail className="text-brand-secondary" size={24} /> 
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white text-lg font-bold">E-mail Corporativo</span>
                  <span className="text-white/40 group-hover:text-white/60 transition-colors">contato@hermidamaia.adv.br</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Compliance & OAB */}
          <div className="md:col-span-3">
             <div className="bg-white/5 p-16 rounded-[4rem] border border-white/10 text-center shadow-inner group hover:bg-white/[0.08] transition-all relative">
                <ShieldCheck size={80} className="mx-auto text-brand-secondary mb-10 group-hover:scale-110 transition-transform" />
                <Typography variant="caption" className="text-white font-black block mb-4 text-sm tracking-widest">OAB/SP 435.545</Typography>
                <Typography variant="caption" className="text-white/20 normal-case text-xs leading-relaxed max-w-[200px] mx-auto block font-medium">Sociedade Individual de Advocacia • Protocolo Kernel V12.16 Auditado</Typography>
             </div>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12">
          <Typography variant="caption" className="text-white/10 uppercase tracking-tighter text-[10px]">
            © 2024 Dr. Adriano Hermida Maia | Todos os direitos reservados.
          </Typography>
          <div className="flex gap-12 items-center">
             <div className="flex gap-8">
               {['Termos', 'Privacidade', 'Cookies'].map(t => (
                 <button key={t} className="text-[10px] font-bold text-white/20 hover:text-brand-secondary transition-all uppercase tracking-widest">{t}</button>
               ))}
             </div>
             <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
             <Typography variant="caption" className="text-brand-secondary font-black text-[11px] tracking-[0.5em]">HM-V12-CORE</Typography>
             <button 
                onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
                className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:bg-brand-secondary hover:text-brand-primary transition-all p-3"
             >
               <Logo className="w-full h-full" variant="light" />
             </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};