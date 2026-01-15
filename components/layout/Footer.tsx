
import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Linkedin, Instagram, Youtube, Music2 } from 'lucide-react';
import { Container } from '../ui/Container.tsx';
import { Typography } from '../ui/Typography.tsx';
import { Logo } from '../ui/Logo.tsx';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-[#1a2b4a] pt-32 md:pt-48 pb-16 text-white border-t border-white/5 relative overflow-hidden">
      {/* Glow Atmosphere */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-brand-secondary/5 blur-[200px] rounded-full -mr-96 -mb-96 pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-32 mb-24 md:mb-32">
          
          {/* Brand Identity - Alinhado com Navbar */}
          <div className="md:col-span-5 space-y-10 md:space-y-12">
            <div className="flex items-center gap-6 md:gap-8">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-primary rounded-xl flex items-center justify-center p-3 border-2 border-brand-primary shadow-xl">
                <Logo className="w-full h-full" variant="light" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-white font-black text-xl md:text-2xl leading-tight uppercase tracking-tighter">Dr. Adriano Hermida Maia</span>
                <span className="text-brand-secondary text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Defesa do Superendividamento</span>
              </div>
            </div>
            <Typography variant="body" className="text-white/40 max-w-lg italic font-light leading-relaxed text-xl md:text-2xl">
              "Transformando a tecnologia em justiça para proteger o patrimônio familiar e a dignidade do cidadão brasileiro."
            </Typography>
            <div className="flex gap-4 md:gap-6">
              {[
                { icon: <Linkedin size={24}/>, href: "https://www.linkedin.com/company/dradrianohermidamaia" },
                { icon: <Instagram size={24}/>, href: "http://instagram.com/dr.adrianohermidamaia" },
                { icon: <Youtube size={24}/>, href: "https://www.youtube.com/c/AdrianoHermidaMaia" },
                { icon: <Music2 size={24}/>, href: "https://www.tiktok.com/@dr.adrianohermidamaia" }
              ].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-brand-secondary hover:text-brand-primary transition-all duration-500 border border-white/10">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Connect */}
          <div className="md:col-span-4 space-y-10 md:space-y-12">
            <Typography variant="caption" className="text-brand-secondary block font-black uppercase tracking-[0.6em] text-xs">Atendimento</Typography>
            <ul className="space-y-10 md:space-y-12">
              <li className="flex items-start gap-6 md:gap-8 group cursor-pointer" onClick={() => window.location.hash = '#/contato'}>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-brand-secondary/40 transition-all">
                  <MapPin className="text-brand-secondary" size={20} /> 
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white text-base md:text-lg font-bold">Unidades</span>
                  <span className="text-white/40 group-hover:text-white/60 transition-colors text-sm md:text-base leading-relaxed underline">Encontre nossas unidades</span>
                </div>
              </li>
              <li className="flex items-center gap-6 md:gap-8 group cursor-pointer" onClick={() => window.open('https://wa.me/5551996032004')}>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-brand-secondary/40 transition-all">
                  <Phone className="text-brand-secondary" size={20} /> 
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white text-base md:text-lg font-bold">WhatsApp Direto</span>
                  <span className="text-white/40 group-hover:text-white/60 transition-colors text-sm md:text-base">(51) 99603-2004</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Compliance & OAB */}
          <div className="md:col-span-3">
             <div className="bg-white/5 p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] border border-white/5 text-center shadow-inner group hover:bg-white/[0.08] transition-all relative">
                <ShieldCheck size={64} className="mx-auto text-brand-secondary mb-8 md:mb-10 group-hover:scale-110 transition-transform md:size-20" />
                <Typography variant="caption" className="text-white font-black block mb-4 text-sm tracking-widest uppercase">OAB/RS 10748</Typography>
                <Typography variant="caption" className="text-white/20 normal-case text-[10px] md:text-xs leading-relaxed max-w-[200px] mx-auto block font-medium">
                  Profissional Regulamentado. Consulte o <a href="http://cna.oab.org.br/" target="_blank" rel="noopener noreferrer" className="underline text-brand-secondary/60 hover:text-brand-secondary transition-colors">Cadastro Nacional de Advogados</a>
                </Typography>
             </div>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="pt-12 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <Typography variant="caption" className="text-white/20 uppercase tracking-tighter text-[9px] md:text-[10px] text-center md:text-left">
            © 2026. Hermida Maia Advocacia. Todos os direitos reservados.
          </Typography>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
             <div className="flex gap-6 md:gap-8">
               {['Termos', 'Privacidade', 'Cookies'].map(t => (
                 <button key={t} className="text-[9px] md:text-[10px] font-bold text-white/20 hover:text-brand-secondary transition-all uppercase tracking-widest">{t}</button>
               ))}
             </div>
             <div className="h-10 w-[1px] bg-white/10 hidden md:block" />
             <button 
                onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
                className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:bg-brand-secondary hover:text-brand-primary transition-all p-2.5 md:p-3"
             >
               <Logo className="w-full h-full" variant="light" />
             </button>
          </div>
        </div>
      </Container>
    </footer>
  );
};
