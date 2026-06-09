import { z } from "zod";
import type { IResource } from "./resource.model";

export interface ICurso extends IResource {
  titulo: string;
  categoria: string;
  descricao: string;
  cargaHoraria: string;
}

export const cursoSchema = z.object({
  id: z.string().optional(),
  titulo: z.string().min(1, "O titulo e obrigatorio"),
  categoria: z.string().optional().default(""),
  descricao: z.string().optional().default(""),
  cargaHoraria: z.string().optional().default(""),
});
