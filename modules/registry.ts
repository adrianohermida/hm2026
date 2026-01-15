
import { DashboardSkeleton } from './dashboard/dashboard-skeleton.tsx';
import { WorkspaceSkeleton } from './workspace-v13/workspace-skeleton.tsx';
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
import { VoidSkeleton } from './void/void-skeleton.tsx';
import { BlankCanvasSkeleton } from './blank-canvas/blank-canvas-skeleton.tsx';
import { DataJudSkeleton } from './datajud/datajud-skeleton.tsx';
import { V12BlankSkeleton } from './v12-blank/v12-blank-skeleton.tsx';
import { PaginaVaziaSkeleton } from './pagina-vazia/pagina-vazia-skeleton.tsx';
import { LabSkeleton } from './lab/lab-skeleton.tsx';
import { TrulyBlankSkeleton } from './truly-blank/truly-blank-skeleton.tsx';
import { IModuleSkeleton } from './contracts.ts';

export const ModuleRegistry: IModuleSkeleton[] = [
  TrulyBlankSkeleton as any,
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
  DataJudSkeleton as any,
  WorkspaceSkeleton as any,
  VoidSkeleton as any,
  BlankCanvasSkeleton as any,
  V12BlankSkeleton as any,
  PaginaVaziaSkeleton as any,
  LabSkeleton as any
].sort((a, b) => a.sidebar.order - b.sidebar.order);
