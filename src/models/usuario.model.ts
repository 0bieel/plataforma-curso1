import { z } from "zod";
import type { IResource } from "./resource.model";

export interface IUsuario extends IResource {
  nome: string;
  email: string;
  perfil: string;
}

export const usuarioSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "O nome e obrigatorio"),
  email: z.string().min(1, "O email e obrigatorio").email("Digite um email valido"),
  perfil: z.string().optional().default(""),
});
