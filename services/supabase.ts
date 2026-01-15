
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.90.1';

// HM-V12: Supabase Client Infrastructure
// Nota: Em ambiente de desenvolvimento local sem variáveis, 
// o cliente falha graciosamente ou usa valores de fallback.
const supabaseUrl = 'https://placeholder-url.supabase.co';
const supabaseKey = 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper para selecionar schema dinamicamente (Padrão V12)
// O cliente do Supabase JS v2 agora gerencia schemas via .schema()
export default supabase;
