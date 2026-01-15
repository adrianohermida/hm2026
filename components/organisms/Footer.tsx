
import React, { useState } from 'react';
import { Scale, MapPin, Phone, Mail, ChevronDown, ChevronUp, ShieldAlert } from 'lucide-react';
import { Container } from '../atoms/Container';
import { Typography } from '../atoms/Typography';

export const Footer: React.FC = () => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  return (
    <footer id="contato" className="bg-slate-50 pt-20 pb-10 border-t border-slate-100 scroll-mt-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-primary flex items-center justify-center rounded-xl shadow-lg border border-brand-secondary/30 transition-transform hover:scale-105">
                <span className="text-brand-secondary font-serif font-black italic text-lg">HM</span>
              </div>
              <div>
                <Typography variant="h4" font="serif" className="text-brand-primary leading-tight">
                  Adriano Hermida Maia
                </Typography>
                <Typography variant="caption" className="text-brand-secondary text-[8px] font-black tracking-[0.2em] uppercase">Advocacia Digital</Typography>
              </div>
            </div>
            <Typography variant="body" className="text-slate-500 max-w-md italic font-medium leading-relaxed">
              "Especialista em Defesa do Devedor e Superendividamento. Mais de 12 anos protegendo consumidores contra abusos bancários."
            </Typography>
          </div>
          
          <div>
            <Typography variant="caption" className="text-brand-primary mb-6 block font-black">Navegação</Typography>
            <ul className="space-y-4">
              <li><a href="#servicos" className="text-slate-500 hover:text-brand-secondary transition-colors text-sm font-medium">Áreas de Atuação</a></li>
              <li><a href="#blog" className="text-slate-500 hover:text-brand-secondary transition-colors text-sm font-medium">Blog Jurídico</a></li>
              <li><a href="#inicio" className="text-slate-500 hover:text-brand-secondary transition-colors text-sm font-medium">Início</a></li>
            </ul>
          </div>

          <div>
            <Typography variant="caption" className="text-brand-primary mb-6 block font-black">Atendimento</Typography>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-secondary flex-shrink-0 mt-0.5" /> 
                Av. Paulista, 1000 - SP
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-secondary flex-shrink-0" /> 
                (51)  99603-2004
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-secondary flex-shrink-0" /> 
                contato@hermidamaia.adv.br
              </li>
            </ul>

            {/* Aviso Legal Colapsável */}
            <div className="mt-8">
              <button 
                onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
                className="flex items-center justify-between w-full p-3 bg-slate-100 rounded-xl border border-slate-200 hover:bg-slate-200 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert size={14} className="text-brand-primary" />
                  <span className="text-[10px] font-black uppercase text-brand-primary">Aviso Legal</span>
                </div>
                {isDisclaimerOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              
              {isDisclaimerOpen && (
                <div className="mt-2 p-4 bg-white rounded-xl border border-slate-100 shadow-sm animate-in slide-in-from-top-2 duration-300">
                  <Typography variant="caption" className="text-slate-400 normal-case leading-relaxed text-[9px]">
                    As informações disponibilizadas neste site têm caráter exclusivamente educacional e não constituem consultoria gratuita. Para atendimento jurídico, é necessário agendar consulta e solicitar proposta de honorários. Este site não possui qualquer vínculo, afiliação ou endosso por parte do Google ou do Facebook. A Hermida Maia Advocacia é uma sociedade unipessoal de advocacia independente, que não presta serviços públicos, de débito ou relacionados a documentos governamentais. Todos os serviços advocatícios são realizados em estrita conformidade com a legislação vigente e com o Código de Ética e Disciplina da OAB.
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <Typography variant="caption" className="text-slate-400 normal-case font-bold text-center uppercase tracking-tighter">
            © 2024 Dr. Adriano Hermida Maia | Sociedade de Advogados
          </Typography>
          <div className="flex items-center gap-4">
             <Typography variant="caption" className="text-brand-secondary font-black">OAB/SP 435.545</Typography>
             <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      </Container>
    </footer>
  );
};
