
import React from 'react';
import { Layout, Sparkles, Wand2, ArrowLeft } from 'lucide-react';
import { Container } from '../components/Container.tsx';
import { Typography } from '../components/Typography.tsx';
import { Button } from '../components/Button.tsx';
import { Footer } from '../components/Footer.tsx';

export const BlankPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-20 bg-brand-accent/30 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -ml-48 -mb-48" />
        
        <Container className="relative z-10 text-center py-20">
          <div className="animate-in fade-in zoom-in duration-1000">
            <div className="relative inline-block mb-12">
              <div className="w-24 h-24 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center mx-auto border border-slate-50">
                <Layout size={40} className="text-brand-secondary opacity-40" />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                <Sparkles size={16} className="text-brand-secondary" />
              </div>
            </div>

            <Typography variant="h1" font="serif" className="text-brand-primary mb-6">
              Novo Espaço <span className="text-brand-secondary italic">Institucional</span>
            </Typography>
            
            <Typography variant="body" className="text-slate-500 max-w-xl mx-auto mb-12 leading-relaxed">
              Esta página está configurada no Kernel V12 e pronta para receber novos fluxos jurídicos, 
              dashboards ou módulos de conversão.
            </Typography>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                variant="outline" 
                onClick={onBack}
                className="h-14 px-8 rounded-2xl border-slate-200 text-brand-primary hover:bg-white"
                icon={<ArrowLeft size={18} />}
              >
                Voltar
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                className="h-14 px-10 rounded-2xl shadow-xl shadow-brand-secondary/20"
                icon={<Wand2 size={20} />}
              >
                Sintetizar Módulo
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <section className="py-24 border-t border-slate-100">
        <Container>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 opacity-30">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-40 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex items-center justify-center">
                   <Typography variant="caption" className="font-black tracking-widest text-[10px]">Aguardando Definição</Typography>
                </div>
              ))}
           </div>
        </Container>
      </section>

      <Footer />
    </div>
  );
};
