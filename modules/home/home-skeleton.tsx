import React from 'react';
import { Home as HomeIcon, Sparkles } from 'lucide-react';

/**
 * HM-V12 HOME SKELETON (SSOT)
 */
export const HomeSkeleton = {
  moduleId: "home",
  title: "Página Inicial",
  hero: {
    badge: "Expertise em Superendividamento",
    title: "A elite jurídica na defesa do devedor.",
    subtitle: "Protegendo sua dignidade financeira com rigor técnico e inteligência digital estratégica.",
    cta: "Consultoria Estratégica"
  },
  services: {
    title: "Soluções Estratégicas.",
    subtitle: "Áreas de Atuação",
    description: "Atuação de alta performance focada em reestabelecer o equilíbrio financeiro e a governança de ativos.",
    items: [
      {
        tag: "Especialidade",
        title: "Superendividamento",
        description: "Reestruturação técnica de passivos via Lei 14.181/21 para garantir o mínimo existencial e a dignidade familiar."
      },
      {
        tag: "Defesa Ativa",
        title: "Direito Bancário",
        description: "Defesa estratégica contra abusos, revisão de juros abusivos, cláusulas leoninas e proteção integral do patrimônio."
      },
      {
        tag: "Estratégia",
        title: "Empresarial",
        description: "Expertise em Recuperação Judicial, Falência, Acordos Sindicais e Parcelamentos Judiciais de alta complexidade."
      }
    ]
  },
  utility: {
    title: "Onde Conciliar?",
    badge: "Utilidade Pública",
    description: "Localize unidades de defesa do consumidor e canais de conciliação oficiais em todo o Brasil.",
    guide: {
      title: "Guia Jus Postulandi",
      description: "Aprenda a acessar a justiça sem advogado para causas de baixa complexidade. Orientação gratuita e estratégica.",
      cta: "Baixar Guia"
    }
  },
  blog: {
    title: "Conhecimento que liberta.",
    badge: "Conteúdo Jurídico",
    cta: "Ver todo o acervo"
  }
};