
import React, { useEffect } from 'react';
// HM-V12 Fix: Added MessageSquare to lucide-react imports to resolve the error on line 268
import { 
  ShieldCheck, Target, Eye, Heart, Award, Users, Globe, MessageCircle, MessageSquare,
  ArrowRight, CheckCircle2, History, Mic, BookOpen, Youtube, ExternalLink, Linkedin
} from 'lucide-react';
import { Container } from '../atoms/Container.tsx';
import { Typography } from '../atoms/Typography.tsx';
import { Button } from '../atoms/Button.tsx';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#05080F] text-white font-sans selection:bg-brand-secondary selection:text-brand-primary">
      
      {/* 1. HERO INSTITUCIONAL */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.08)_0%,transparent_70%)]" />
        <Container className="relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-brand-secondary/10 border border-brand-secondary/20 px-6 py-2 rounded-full mb-8">
            <span className="text-brand-secondary text-[10px] font-black uppercase tracking-[0.4em]">Nossa Identidade</span>
          </div>
          <Typography variant="h1" font="serif" className="text-4xl md:text-7xl lg:text-8xl leading-none mb-10">
            Compromisso com a sua <br />
            <span className="text-brand-secondary italic">Dignidade Financeira.</span>
          </Typography>
          <Typography variant="body" className="text-white/50 max-w-4xl mx-auto leading-relaxed text-lg md:text-2xl font-light">
            Liderado pelo Dr. Adriano Hermida Maia, nosso escritório é referência nacional na aplicação da Lei do Superendividamento, devolvendo a paz e a autonomia a milhares de famílias brasileiras.
          </Typography>
        </Container>
      </section>

      {/* 2. PROFILE SECTION */}
      <section className="py-32 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative animate-in fade-in slide-in-from-left-8 duration-1000">
              <div className="relative aspect-[4/5] rounded-[3.5rem] md:rounded-[5rem] overflow-hidden shadow-2xl border-[12px] md:border-[20px] border-slate-50 ring-1 ring-slate-100">
                <img 
                  src="https://hermidamaia.adv.br/styles/assets/images/perfil_1.jpg" 
                  className="w-full h-full object-cover object-center" 
                  alt="Dr. Adriano Hermida Maia" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 to-transparent" />
              </div>
              <div className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-8 bg-brand-primary p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-brand-secondary/30 max-w-[280px] md:max-w-xs transition-transform hover:scale-105 duration-500">
                <Typography variant="h4" font="serif" className="text-brand-secondary text-2xl md:text-3xl mb-1">Dr. Adriano</Typography>
                <Typography variant="caption" className="text-white/60 tracking-[0.3em] mb-6 block uppercase font-black text-[10px]">Hermida Maia</Typography>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <Linkedin size={20} className="text-brand-secondary" />
                  <div className="w-[1px] h-6 bg-white/10" />
                  <Typography variant="caption" className="text-white font-bold text-[10px]">OAB/RS 10748</Typography>
                </div>
              </div>
            </div>
            <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-1000">
              <div className="space-y-4">
                <Typography variant="caption" className="text-brand-secondary font-black uppercase tracking-widest">Especialista em Dívidas</Typography>
                <Typography variant="h2" font="serif" className="text-brand-primary text-4xl md:text-6xl leading-tight">Trajetória e <span className="text-brand-secondary italic">Expertise</span>.</Typography>
              </div>
              <div className="space-y-8 text-slate-500 text-lg md:text-xl leading-relaxed font-light">
                <p>O Dr. Adriano Hermida Maia é advogado com sólida formação acadêmica e vasta experiência prática no Direito Bancário e do Consumidor. Sua atuação é pautada pela defesa intransigente do "mínimo existencial", princípio fundamental da Lei 14.181/2021.</p>
                <p>Com passagens por importantes instituições e uma carreira dedicada a equilibrar a relação entre grandes bancos e o cidadão comum, ele se tornou uma das vozes mais influentes na aplicação da nova Lei do Superendividamento no Brasil.</p>
                <p>Nosso escritório não apenas resolve processos; nós restauramos a dignidade de quem foi sufocado por juros abusivos e práticas comerciais agressivas. Acreditamos que ninguém deve ser escravo de uma dívida impagável.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-6 pt-6">
                {[
                  "Expertise em Direito Bancário",
                  "Referência em Lei 14.181/21",
                  "Atuação em todo o Brasil",
                  "Foco em Resultados Humanizados"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-brand-primary font-bold text-sm md:text-base">
                    <CheckCircle2 className="text-brand-secondary" size={24} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. TIMELINE */}
      <section className="py-32 bg-[#05080F] relative overflow-hidden">
        <Container>
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-brand-secondary/10 border border-brand-secondary/20 px-6 py-2 rounded-full mb-6">
              <History size={16} className="text-brand-secondary" />
              <span className="text-brand-secondary text-[10px] font-black uppercase tracking-widest">Nossa Jornada</span>
            </div>
            <Typography variant="h2" font="serif" className="text-4xl md:text-7xl mb-6">Linha do <span className="text-brand-secondary italic">Tempo</span></Typography>
            <Typography variant="body" className="text-white/40 max-w-2xl mx-auto">Uma trajetória dedicada à justiça e à proteção do consumidor brasileiro.</Typography>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/10 hidden md:block" />
            <div className="space-y-16">
              {[
                { year: "2012", title: "Início da Trajetória", desc: "Graduação e primeiros passos na advocacia focada em direitos fundamentais." },
                { year: "2015", title: "Especialização Bancária", desc: "Foco total em Direito Bancário e combate a práticas abusivas de instituições financeiras." },
                { year: "2018", title: "Fundação do Escritório", desc: "Inauguração da Hermida Maia Advocacia com foco em atendimento humanizado e digital." },
                { year: "2021", title: "Lei do Superendividamento", desc: "Liderança nacional na aplicação da Lei 14.181/2021, restaurando a dignidade de milhares." },
                { year: "2024", title: "Referência Nacional", desc: "Mais de R$ 35 milhões renegociados e presença consolidada em todo o Brasil." }
              ].map((item, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-center gap-12 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full animate-in fade-in duration-700">
                    <div className={`p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-brand-secondary/30 transition-all ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-brand-secondary font-black text-3xl md:text-5xl mb-4 block leading-none">{item.year}</span>
                      <Typography variant="h4" font="serif" className="text-white text-xl md:text-2xl mb-4">{item.title}</Typography>
                      <Typography variant="body" className="text-white/40 text-sm md:text-base leading-relaxed">{item.desc}</Typography>
                    </div>
                  </div>
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="w-5 h-5 bg-brand-secondary rounded-full border-4 border-[#05080F] shadow-[0_0_20px_rgba(197,160,89,0.6)]" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 4. MISSION VISION VALUES */}
      <section className="py-32 bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: Target, title: "Missão", desc: "Proporcionar soluções jurídicas inovadoras para libertar consumidores do superendividamento, garantindo dignidade e paz financeira." },
              { icon: Eye, title: "Visão", desc: "Ser o escritório líder e mais confiável do Brasil na defesa do consumidor endividado, reconhecido pela excelência técnica e ética." },
              { icon: Heart, title: "Valores", desc: "Ética inabalável, transparência total, empatia com a dor do cliente e compromisso absoluto com a justiça social e o mínimo existencial." }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all group">
                <div className="bg-brand-primary w-20 h-20 rounded-[1.8rem] flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform">
                  <item.icon className="text-brand-secondary" size={36} />
                </div>
                <Typography variant="h3" font="serif" className="text-brand-primary text-3xl mb-6">{item.title}</Typography>
                <Typography variant="body" className="text-slate-500 leading-relaxed text-lg font-light">{item.desc}</Typography>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. STATS SECTION */}
      <section className="py-32 bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
        <Container className="relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            {[
              { label: "Clientes Atendidos", value: "+2.500" },
              { label: "Dívidas Renegociadas", value: "R$ 35M+" },
              { label: "Anos de Experiência", value: "12+" },
              { label: "Estados Atendidos", value: "26 + DF" }
            ].map((stat, i) => (
              <div key={i} className="space-y-4 animate-in zoom-in duration-700">
                <Typography variant="h2" font="serif" className="text-4xl md:text-6xl font-black text-white leading-none">{stat.value}</Typography>
                <Typography variant="caption" className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">{stat.label}</Typography>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. PODCAST SECTION */}
      <section className="py-32 bg-white overflow-hidden">
        <Container>
          <div className="bg-[#0A1120] rounded-[4rem] md:rounded-[6rem] p-12 md:p-24 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,rgba(197,160,89,0.1)_0%,transparent_70%)]" />
            <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-10">
                <div className="inline-flex items-center gap-3 bg-brand-secondary/10 border border-brand-secondary/20 px-6 py-2 rounded-full">
                  <Mic size={16} className="text-brand-secondary" />
                  <span className="text-brand-secondary text-[10px] font-black uppercase tracking-widest">Conteúdo Educativo</span>
                </div>
                <Typography variant="h2" font="serif" className="text-4xl md:text-7xl text-white leading-none">
                  Hermida Maia <span className="text-brand-secondary italic">Podcast</span>
                </Typography>
                <Typography variant="body" className="text-white/50 text-xl leading-relaxed font-light">
                  Acompanhe discussões profundas sobre direitos do consumidor, estratégias contra juros abusivos e educação financeira diretamente com o Dr. Adriano e convidados.
                </Typography>
                <div className="flex flex-wrap gap-6">
                  <Button variant="secondary" size="lg" className="h-20 px-12 shadow-2xl shadow-brand-secondary/20" icon={<Youtube size={24} />} onClick={() => window.open('https://youtube.com/@hermidamaia', '_blank')}>Assistir no YouTube</Button>
                  <Button variant="outline" size="lg" className="h-20 px-12 border-white/10 text-white" icon={<Mic size={24} />}>Ouvir no Spotify</Button>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-10 bg-brand-secondary/20 rounded-full blur-[100px] opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
                <div className="relative aspect-square max-w-lg mx-auto bg-black rounded-[4rem] border border-white/10 p-4 shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69457177ae7e61f63fb38329/3b78c0579__TLM961311.jpg" 
                    alt="Podcast Hermida Maia" 
                    className="w-full h-full object-cover rounded-[3rem] grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-brand-secondary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(197,160,89,0.5)] animate-pulse">
                      <Mic size={40} className="text-brand-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. WORKS SECTION */}
      <section className="py-32 bg-[#05080F]">
        <Container>
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-3 bg-brand-secondary/10 border border-brand-secondary/20 px-6 py-2 rounded-full mb-6">
              <BookOpen size={16} className="text-brand-secondary" />
              <span className="text-brand-secondary text-[10px] font-black uppercase tracking-widest">Autoridade Acadêmica</span>
            </div>
            <Typography variant="h2" font="serif" className="text-4xl md:text-7xl mb-6">Obras e <span className="text-brand-secondary italic">Publicações</span></Typography>
            <Typography variant="body" className="text-white/40 max-w-2xl mx-auto">Conhecimento técnico compartilhado para fortalecer a defesa do consumidor.</Typography>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Lei do Superendividamento", type: "Ebook Comentado", desc: "Análises práticas e jurisprudência atualizada sobre a Lei 14.181/2021.", image: "https://heyboss.heeyo.ai/gemini-image-c5df3e56df0a49fdb468a4708ef7c8a8.png" },
              { title: "Mínimo Existencial", type: "Artigo Técnico", desc: "Análise profunda sobre o princípio da dignidade humana aplicado às dívidas.", image: "https://heyboss.heeyo.ai/gemini-image-805a2be1c3c8401c828287f865b36b4c.png" },
              { title: "Manual do Superendividado", type: "Ebook Guia", desc: "Estratégias essenciais para lidar com cobranças abusivas e juros bancários.", image: "https://heyboss.heeyo.ai/user-assets/5d67058a6_manual-superendividado_0FQQG9Ox.jpg" }
            ].map((work, idx) => (
              <div key={idx} className="group bg-white/5 rounded-[3rem] overflow-hidden border border-white/5 hover:border-brand-secondary/30 transition-all shadow-2xl flex flex-col h-full">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img src={work.image} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05080F] to-transparent opacity-80" />
                  <div className="absolute bottom-10 left-10 right-10">
                    <span className="bg-brand-secondary text-brand-primary text-[9px] font-black uppercase px-4 py-2 rounded-xl mb-4 inline-block tracking-widest shadow-xl">
                      {work.type}
                    </span>
                    <Typography variant="h3" font="serif" className="text-2xl md:text-3xl text-white leading-tight">{work.title}</Typography>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-1">
                  <Typography variant="body" className="text-white/40 text-sm leading-relaxed mb-10 flex-1">{work.desc}</Typography>
                  <button className="text-brand-secondary font-black uppercase text-[10px] tracking-widest flex items-center gap-3 group-hover:gap-5 transition-all">
                    Saber Mais <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-32 bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,89,0.15)_0%,transparent_70%)]" />
        <Container className="relative z-10 text-center max-w-4xl">
          <Typography variant="h2" font="serif" className="text-4xl md:text-7xl mb-10 leading-tight">
            Pronto para recomeçar <br />
            <span className="text-brand-secondary italic">a sua história?</span>
          </Typography>
          <Typography variant="body" className="text-white/60 text-xl md:text-2xl mb-16 font-light leading-relaxed">
            Não deixe que as dívidas definam quem você é. Nossa equipe está pronta para aplicar a lei a seu favor e devolver sua liberdade.
          </Typography>
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <Button 
              variant="secondary" 
              size="lg" 
              className="h-24 px-16 text-xl md:text-2xl shadow-2xl shadow-brand-secondary/30 rounded-[2rem]" 
              icon={<MessageSquare size={28} />}
              onClick={() => window.open('https://wa.me/5551996032004', '_blank')}
            >
              Falar com Especialista
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-24 px-16 text-xl md:text-2xl border-white/20 text-white rounded-[2rem]" 
              icon={<ArrowRight size={28} />}
            >
              Agendar Consulta
            </Button>
          </div>
        </Container>
      </section>

    </div>
  );
};
