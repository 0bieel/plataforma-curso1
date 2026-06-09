import { z } from "zod";
import type { IResource } from "./resource.model";

export interface ICategoria extends IResource {
  nome: string;
  descricao: string;
}

export const categoriaSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "O nome e obrigatorio"),
  descricao: z.string().optional().default(""),
});
