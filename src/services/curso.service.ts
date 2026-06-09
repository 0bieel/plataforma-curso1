import type { ICurso } from "../models/curso.model";
import { LocalStorageService } from "./local-storage.service";

export class CursosService extends LocalStorageService<ICurso> {
  constructor() {
    super("cursos");
  }
}

export const cursosService = new CursosService();
