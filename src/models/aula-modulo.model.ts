import { z } from "zod";
import type { IResource } from "./resource.model";

export interface IAulaModulo extends IResource {
  tipo: string;
  curso: string;
  modulo: string;
  aula: string;
  conteudo: string;
}

export const aulaModuloSchema = z
  .object({
    id: z.string().optional(),
    tipo: z.string().min(1, "O tipo e obrigatorio"),
    curso: z.string().min(1, "O curso e obrigatorio"),
    modulo: z.string().optional().default(""),
    aula: z.string().optional().default(""),
    conteudo: z.string().optional().default(""),
  })
  .superRefine((item, context) => {
    if (item.tipo === "modulo" && !item.modulo.trim()) {
      context.addIssue({
        code: "custom",
        path: ["modulo"],
        message: "O modulo e obrigatorio",
      });
    }

    if (item.tipo === "aula") {
      if (!item.modulo.trim()) {
        context.addIssue({
          code: "custom",
          path: ["modulo"],
          message: "Selecione um modulo cadastrado",
        });
      }

      if (!item.aula.trim()) {
        context.addIssue({
          code: "custom",
          path: ["aula"],
          message: "A aula e obrigatoria",
        });
      }
    }
  });
