import type { ICurso } from "../models/curso.model";
import { ApiService } from "./api.service";

export class CursosService extends ApiService<ICurso> {
  constructor() {
    super("cursos");
  }
}

export const cursosService = new CursosService();
