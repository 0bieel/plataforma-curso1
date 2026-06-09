import { z } from "zod";
import type { IResource } from "./resource.model";

export interface IAvaliacao extends IResource {
  curso: string;
  usuario: string;
  nota: string;
  comentario: string;
}

export const avaliacaoSchema = z.object({
  id: z.string().optional(),
  curso: z.string().optional().default(""),
  usuario: z.string().optional().default(""),
  nota: z
    .string()
    .optional()
    .default("")
    .refine((nota) => nota === "" || Number(nota) <= 5, "A nota maxima e 5"),
  comentario: z.string().optional().default(""),
});
