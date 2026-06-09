import { z } from "zod";
import type { IResource } from "./resource.model";

export interface IProgresso extends IResource {
  usuario: string;
  curso: string;
  aula: string;
  concluida: boolean;
  observacao: string;
}

export const progressoSchema = z.object({
  id: z.string().optional(),
  usuario: z.string().min(1, "O usuario e obrigatorio"),
  curso: z.string().min(1, "O curso e obrigatorio"),
  aula: z.string().min(1, "A aula e obrigatoria"),
  concluida: z.boolean().default(false),
  observacao: z.string().optional().default(""),
});
