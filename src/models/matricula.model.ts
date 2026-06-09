import { z } from "zod";
import type { IResource } from "./resource.model";

export interface IMatricula extends IResource {
  usuario: string;
  curso: string;
  data: string;
  status: string;
}

export const matriculaSchema = z.object({
  id: z.string().optional(),
  usuario: z.string().min(1, "O usuario e obrigatorio"),
  curso: z.string().min(1, "O curso e obrigatorio"),
  data: z.string().optional().default(""),
  status: z.string().optional().default(""),
});
