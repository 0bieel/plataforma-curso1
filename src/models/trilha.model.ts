import { z } from "zod";
import type { IResource } from "./resource.model";

export interface ITrilha extends IResource {
  titulo: string;
  curso?: string;
  cursos: string[];
  descricao: string;
}

export const trilhaSchema = z.object({
  id: z.string().optional(),
  titulo: z.string().min(1, "O titulo e obrigatorio"),
  curso: z.string().optional().default(""),
  cursos: z.array(z.string()).optional().default([]),
  descricao: z.string().optional().default(""),
});
