
import { z } from 'zod';

// HM-V12 Governance Schemas
export const ModuleCategorySchema = z.enum(['registry', 'core', 'public'] as const);
export const ModuleStatusSchema = z.enum(['ACTIVE', 'INACTIVE', 'PENDING', 'HOMOLOGATED'] as const);
export const TaskStatusSchema = z.enum(['BACKLOG', 'TODO', 'DOING', 'DONE'] as const);
export const TaskPrioritySchema = z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const);

export const GovModuleSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(2, "Slug é obrigatório"),
  name: z.string().min(2, "Nome é obrigatório"),
  category: ModuleCategorySchema,
  status: ModuleStatusSchema.default('PENDING'),
  metadata: z.record(z.string(), z.any()).default({}),
  escritorio_id: z.string().uuid(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const SprintTaskSchema = z.object({
  id: z.string().uuid().optional(),
  module_id: z.string().uuid(),
  // // Added technical_id and generated_prompt to align with DevModule Roadmap tasks and UI requirements
  technical_id: z.string().optional(),
  generated_prompt: z.string().optional(),
  title: z.string().min(3),
  description: z.string().optional(),
  status: TaskStatusSchema.default('BACKLOG'),
  priority: TaskPrioritySchema.default('MEDIUM'),
  escritorio_id: z.string().uuid(),
  created_at: z.string().optional(),
});

export const GovAccessControlSchema = z.object({
  id: z.string().uuid().optional(),
  module_id: z.string().uuid(),
  user_id: z.string().uuid(),
  escritorio_id: z.string().uuid(),
  role_id: z.string(),
  client_id: z.string().uuid().optional().nullable(),
  permissions: z.object({
    read: z.boolean().default(true),
    write: z.boolean().default(false),
    admin: z.boolean().default(false),
  }).default({ read: true, write: false, admin: false }),
});

export const GovContractSchema = z.object({
  id: z.string().uuid().optional(),
  module_id: z.string().uuid(),
  technical_specs: z.object({
    input_schema: z.string().optional(),
    output_schema: z.string().optional(),
    api_version: z.string().default('v1'),
  }),
  roadmap: z.array(z.object({
    sprint_name: z.string(),
    tasks: z.array(z.string()),
    status: z.enum(['planned', 'in_progress', 'completed'] as const).default('planned'),
  })).default([]),
});

export type GovModule = z.infer<typeof GovModuleSchema>;
export type GovAccessControl = z.infer<typeof GovAccessControlSchema>;
export type GovContract = z.infer<typeof GovContractSchema>;
export type GovSprintTask = z.infer<typeof SprintTaskSchema>;
