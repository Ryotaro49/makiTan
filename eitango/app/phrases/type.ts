import { z } from 'zod';

export const zTango = z.object({
  tango_id: z.number().int(),
  user_id: z.number().int(),
  phrase: z.string(),
  meaning: z.string(),
  category: z.string(),
  registration_date: z.string().datetime(),
  updated_at: z.string().datetime(),
  is_passed: z.number().int(),
});

export const zTangos = z.array(zTango);

export const zUpsertTango = z.object({
  user_id: z.number().int(),
  phrase: z.string(),
  meaning: z.string(),
  category: z.string(),
});

export type Tango = z.infer<typeof zTango>;
export type Tangos = z.infer<typeof zTangos>;