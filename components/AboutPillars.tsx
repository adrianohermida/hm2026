
import React from 'react';
import { Container } from './Container.tsx';
import { Typography } from './Typography.tsx';

const PILLARS = [
  { title: "Ética", desc: "Transparência absoluta em cada etapa processual." },
  { title: "Inovação", desc: "IA e dados para acelerar resoluções complexas." },
  { title: "Dignidade", desc: "O direito focado na preservação da família." }
];

export const AboutPillars: React.FC = () => (
  <section className="py-24 bg-slate-50">
    <Container className="text-center max-w-3xl">
      <Typography variant="h3" font="serif" className="text-brand-primary mb-12">Nossos Pilares Fundamentais</Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {PILLARS.map((p, i) => (
          <div key={i} className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
             <Typography variant="small" className="font-black uppercase tracking-widest text-brand-primary mb-3 block">{p.title}</Typography>
             <Typography variant="caption" className="text-slate-400 normal-case">{p.desc}</Typography>
          </div>
        ))}
      </div>
    </Container>
  </section>
);
