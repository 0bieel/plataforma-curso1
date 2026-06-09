import { z } from "zod";
import type { IResource } from "./resource.model";

export interface IPlano extends IResource {
  nome: string;
  valor: string;
  periodicidade: string;
  descricao: string;
}

export const planoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "O plano e obrigatorio"),
  valor: z.string().optional().default(""),
  periodicidade: z.string().optional().default(""),
  descricao: z.string().optional().default(""),
});
