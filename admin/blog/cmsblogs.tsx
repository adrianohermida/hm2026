
import React from 'react';
import { BookOpen, Edit, Plus } from 'lucide-react';
import { Typography } from '../../components/atoms/Typography.tsx';
import { Button } from '../../components/atoms/Button.tsx';

export const CMSBlogs: React.FC = () => {
  return (
    <div className="p-10 space-y-10">
      <header className="flex justify-between items-center">
        <Typography variant="h1" font="serif" className="text-brand-primary text-4xl">Gestão de <span className="text-brand-secondary italic">Conteúdo</span></Typography>
        <Button variant="secondary" icon={<Plus size={18}/>}>Novo Artigo</Button>
      </header>
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl p-20 text-center opacity-30">
        <BookOpen size={64} className="mx-auto mb-4" />
        <Typography variant="small">Carregando Acervo Educativo...</Typography>
      </div>
    </div>
  );
};
