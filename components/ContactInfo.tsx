
import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { Typography } from './Typography.tsx';

export const ContactInfo: React.FC = () => (
  <div className="space-y-12">
    <div className="flex gap-6 group">
      <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-secondary"><Phone /></div>
      <div>
        <Typography variant="small" className="font-bold block mb-1">WhatsApp</Typography>
        <Typography variant="body" className="text-slate-500">(51) 99603-2004</Typography>
      </div>
    </div>
    <div className="flex gap-6 group">
      <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-secondary"><Mail /></div>
      <div>
        <Typography variant="small" className="font-bold block mb-1">E-mail</Typography>
        <Typography variant="body" className="text-slate-500">contato@hermidamaia.adv.br</Typography>
      </div>
    </div>
    <div className="flex gap-6 group">
      <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center text-brand-secondary"><Globe /></div>
      <div>
        <Typography variant="small" className="font-bold block mb-1">Abrangência</Typography>
        <Typography variant="caption" className="text-slate-400 normal-case">Sede Digital em Porto Alegre com atuação nacional.</Typography>
      </div>
    </div>
  </div>
);
