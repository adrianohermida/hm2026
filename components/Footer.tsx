
import React from 'react';
import { Scale, MapPin, Phone, Mail } from 'lucide-react';
import { Container } from './Container.tsx';
import { Typography } from './Typography.tsx';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-slate-50 pt-20 pb-10 border-t border-slate-100">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-primary flex items-center justify-center rounded-xl">
                <span className="text-brand-secondary font-serif font-black italic text-lg">HM</span>
              </div>
              <Typography variant="h4" font="serif" className="text-brand-primary">Adriano Hermida Maia</Typography>
            </div>
            <Typography variant="body" className="text-slate-500 italic">Advocacia Digital Estratégica</Typography>
          </div>
          <div className="space-y-4">
             <div className="flex items-center gap-3 text-slate-500 text-sm"><MapPin size={16}/> Av. Paulista, 1000 - SP</div>
             <div className="flex items-center gap-3 text-slate-500 text-sm"><Phone size={16}/> (11) 9999-9999</div>
             <div className="flex items-center gap-3 text-slate-500 text-sm"><Mail size={16}/> contato@hermidamaia.adv.br</div>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 text-center">
           <Typography variant="caption" className="text-slate-400">© 2024 Hermida Maia | OAB/SP 435.545</Typography>
        </div>
      </Container>
    </footer>
  );
};
