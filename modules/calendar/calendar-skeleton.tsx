
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const CalendarSkeleton = {
  moduleId: 'agenda',
  moduleName: 'Agenda',
  title: 'Agenda Técnica',
  description: 'Gestão de audiências, reuniões e prazos fatais integrados ao Google Calendar.',
  icon: <Calendar size={40} className="text-brand-secondary/40" />,
  
  permissions: { allowedRoles: ['admin', 'gestor', 'advogado'] },

  sidebar: {
    label: 'Agenda',
    icon: <Calendar size={18} />,
    route: 'agenda',
    order: 6,
    requiredRoles: ['admin', 'gestor', 'advogado']
  },

  breadcrumbs: [
    { label: 'Início', route: 'dashboard', isClickable: true },
    { label: 'Calendário', route: 'agenda', isClickable: false }
  ]
} as const;
