
import React from 'react';
import { Calendar, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { IModuleSkeleton } from '../contracts.ts';

export const AppointmentsSkeleton: IModuleSkeleton = {
  moduleId: "appointments",
  moduleName: "Agendamentos",
  title: "Sistema de Consultas",
  description: "Orquestrador de agendamentos online para novos clientes e consultas recorrentes.",
  icon: <Calendar size={40} className="text-brand-secondary/40" />,
  
  compliance: {
    atomization: true,
    ssotAlignment: true,
    isolationLevel: 'STRICT',
    lgpdByDesign: true,
    hookDriven: true
  },

  integrations: {
    supabase: true,
    googleWorkspace: true,
    govBr: false,
    blockchain: false,
    cloudflare: true
  },

  permissions: {
    allowedRoles: ["guest", "admin", "cliente"]
  },

  sidebar: {
    label: "Agendamentos",
    icon: <Calendar size={18} />,
    route: "agendamento",
    order: 1,
    badge: "Public"
  },

  breadcrumbs: [
    { label: "Início", route: "home", isClickable: true },
    { label: "Agendamento", route: "agendamento", isClickable: false }
  ],

  metadata: {
    version: "12.0.0",
    type: 'PUBLIC_FLOW',
    arch: 'HM-V12-KERN',
    mcp_sync: true
  }
};

export const AppointmentsLabels = {
  hero: {
    badge: "Agendamento Online",
    title: "Reserve sua Consulta com um Especialista",
    subtitle: "Dê o primeiro passo para recuperar sua tranquilidade financeira. Escolha o melhor horário para conversarmos sobre seu caso."
  },
  benefits: [
    { icon: <Clock size={24}/>, title: "Rápido e Prático", desc: "Agende em menos de 2 minutos sem precisar ligar." },
    { icon: <ShieldCheck size={24}/>, title: "Sigilo Absoluto", desc: "Seus dados estão protegidos pela LGPD e pelo sigilo profissional." },
    { icon: <CheckCircle2 size={24}/>, title: "Atendimento Nacional", desc: "Consultas realizadas via videoconferência para todo o Brasil." }
  ],
  steps: {
    one: "Escolha o Horário",
    two: "Seus Dados"
  },
  form: {
    submit: "Confirmar Agendamento",
    loading: "Processando...",
    disclaimer: "* Ao clicar em solicitar, você concorda com nossos termos de uso e política de privacidade. Seus dados estão protegidos pela LGPD."
  },
  success: {
    title: "Solicitação Recebida!",
    body: "Obrigado por confiar na Hermida Maia Advocacia. Sua consulta foi pré-agendada e nossa equipe entrará em contato em breve para confirmação final."
  }
};
