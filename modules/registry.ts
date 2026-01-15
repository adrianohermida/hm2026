
import { DashboardSkeleton } from './dashboard/dashboard-skeleton.tsx';
import { CRMSkeleton } from './crm/crm-skeleton.tsx';
import { HelpDeskSkeleton } from './helpdesk/helpdesk-skeleton.tsx';
import { ProcessSkeleton } from './processos/processos-skeleton.tsx'; 
import { PublicationSkeleton } from './publication/publication-skeleton.tsx';
import { AgendaSkeleton } from './agenda/agenda-skeleton.tsx';
import { DocumentsSkeleton } from './documents/documents-skeleton.tsx';
import { ContractSkeleton } from './contract/contract-skeleton.tsx';
import { BlogSkeleton } from './blog/blog-skeleton.tsx';
import { ConfigSkeleton } from './config/config-skeleton.tsx';
import { AiAgentsSkeleton } from './ai-agents/ai-agents-skeleton.tsx';
import { BalcaoVirtualSkeleton } from './balcao-virtual/balcao-virtual-skeleton.tsx';
import { AppointmentsSkeleton } from './appointments/appointments-skeleton.tsx';
import { IModuleSkeleton } from './contracts.ts';

export const ModuleRegistry: IModuleSkeleton[] = [
  DashboardSkeleton as any,
  BalcaoVirtualSkeleton as any,
  CRMSkeleton as any,
  HelpDeskSkeleton as any,
  AgendaSkeleton as any,
  ProcessSkeleton as any,
  PublicationSkeleton as any,
  ContractSkeleton as any,
  DocumentsSkeleton as any,
  BlogSkeleton as any,
  AiAgentsSkeleton as any,
  ConfigSkeleton as any,
  AppointmentsSkeleton as any
].sort((a, b) => a.sidebar.order - b.sidebar.order);