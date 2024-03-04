import { z } from "zod";

export const zPhrase = z.object({
  tango_id: z.number().int(),
  user_id: z.number().int(),
  phrase: z.string(),
  meaning: z.string(),
  category: z.string(),
  registration_date: z.string().datetime(),
  updated_at: z.string().datetime(),
  is_passed: z.boolean(),
});

export const zPhrases = z.array(zPhrase);

export const zUpsertPhrase = z.object({
  user_id: z.number().int(),
  phrase: z.string(),
  meaning: z.string(),
  category: z.string(),
});

export type zPhrase = z.infer<typeof zPhrase>;
export type zPhrases = z.infer<typeof zPhrases>;
