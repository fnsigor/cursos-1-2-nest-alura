import { z } from 'zod';

export const criaUsuarioSchema = z.object({
  nome: z.string(),
  email: z.email(),
  senha: z.string(),
});

export type CriaUsuarioDTO = z.infer<typeof criaUsuarioSchema>;
